const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
const { quotes, authors } = require("./data.json");

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - 1 - min)) + min;

const resolveAuthor = (_, { authorId }) =>
  authors.filter(({ id }) => id === authorId).map(({ id, name }) => ({
    id: () => id,
    name: () => name
  }))[0];

const resolveRandomQuote = (_, {}) => {
  const { text, authorId } = quotes[getRandomInt(0, quotes.length)];
  return {
    text: () => text,
    author: resolveAuthor(_, { authorId })
  };
};

module.exports = makeExecutableSchema({
  typeDefs: `
    type Author{
      id: String
      name: String
    }

    type Quote {
      text: String
      author: Author
    }

    type Query {
      randomQuote: Quote
      author(authorId: String!): Author
    }
  `,
  resolvers: {
    Query: {
      randomQuote: resolveRandomQuote,
      author: resolveAuthor
    }
  }
});
