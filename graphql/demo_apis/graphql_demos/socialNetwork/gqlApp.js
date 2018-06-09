const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
const { users } = require("./data.json");

const resolveUser = (_, { name: queryName }) =>
  users
    .filter(({ name }) => name === queryName)
    .map(({ name, favoriteColor, friends }) => ({
      name: () => name,
      favoriteColor: () => favoriteColor,
      friends: () =>
        friends.map(friendName => resolveUser(_, { name: friendName }))
    }))[0];

module.exports = makeExecutableSchema({
  typeDefs: `
    type User {
      name: String
      favoriteColor: String
      friends: [User]
    }

    type Query {
      user(name:String): User
    }
  `,
  resolvers: {
    Query: {
      user: resolveUser
    }
  }
});
