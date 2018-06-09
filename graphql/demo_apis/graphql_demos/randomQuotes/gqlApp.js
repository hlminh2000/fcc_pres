const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
const { quotes } = require("./data.json");

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - 1 - min)) + min;

const resolveRandomQuote = (_, {}) => quotes[getRandomInt(0, quotes.length)];

module.exports = makeExecutableSchema({
  typeDefs: `
    type Author{
      name: String
    }

    type Quote {
      text: String
      author: Author
    }

    type Query {
      randomQuote: Quote
    }
  `,
  resolvers: {
    Query: {
      randomQuote: resolveRandomQuote
    }
  }
});
