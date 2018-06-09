const { uniq } = require("lodash");
const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
const { users } = require("./data.json");
const fs = require("fs");

const writeToDisk = () =>
  fs.writeFileSync(
    "graphql_demos/_mutation_socialNetwork/data.json",
    JSON.stringify({ users }, null, 2)
  );

const resolveUser = (_, { id: queryId }) =>
  users
    .filter(({ id }) => id === queryId)
    .map(({ id, name, favoriteColor, friends }) => ({
      id: id,
      name: () => name,
      favoriteColor: () => favoriteColor,
      friends: ({ id: queryFriendId }) =>
        queryFriendId
          ? friends
              .filter(friendId => friendId === queryFriendId)
              .map(friendId => resolveUser(_, { id: friendId }))
          : friends.map(friendId => resolveUser(_, { id: friendId }))
    }))[0];

const newUser = (_, { userData: { name, favoriteColor } }) => {
  const id = users.length + 1;
  const newUser = {
    id,
    name,
    favoriteColor,
    friends: []
  };
  users.push(newUser);
  writeToDisk();
  return resolveUser(_, {
    id: newUser.id
  });
};

const newFriendship = (
  _,
  { friendship: { from: fromUserId, to: toUserId } }
) => {
  const fromUser = users.find(({ id }) => id === fromUserId);
  const toUser = users.find(({ id }) => id === toUserId);
  if (fromUser && toUser) {
    fromUser.friends = uniq([...fromUser.friends, toUserId]);
    toUser.friends = uniq([...toUser.friends, fromUserId]);
  }
  writeToDisk();
  return {
    from: () => resolveUser(_, { id: fromUserId }),
    to: () => resolveUser(_, { id: toUserId })
  };
};

module.exports = makeExecutableSchema({
  typeDefs: `
    type User{
      id: Int!
      name: String
      favoriteColor: String
      friends(id: Int): [User]
    }

    type Friendship {
      from: User
      to: User
    }

    type Query {
      user(id: Int!): User
    }

    input UserInput {
      name: String!
      favoriteColor: String!
    }

    input FriendshipInput {
      from: Int!
      to: Int!
    }

    type Mutation {
      newUser(userData: UserInput!): User
      newFriendship(friendship: FriendshipInput!): Friendship
    }
  `,
  resolvers: {
    Query: {
      user: resolveUser
    },
    Mutation: {
      newUser: newUser,
      newFriendship: newFriendship
    }
  }
});
