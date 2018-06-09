const makeExecutableSchema = require("graphql-tools").makeExecutableSchema;
const { products, manufacturers, customers } = require("./data.json");

const resolveProduct = (_, { id: queryId }) =>
  products
    .filter(({ id }) => id === queryId)
    .map(({ id, name, inStock, manufacturer }) => ({
      id: () => id,
      name: () => name,
      inStock: () => inStock,
      manufacturer: () => resolveManufacturer(_, { id: manufacturer })
    }))[0];

const resolveManufacturer = (_, { id: queryId }) =>
  manufacturers
    .filter(({ id }) => id === queryId)
    .map(({ id, name, products }) => ({
      id: () => id,
      name: () => name,
      products: ({ id: queryProductId }) =>
        queryProductId
          ? [resolveProduct(_, { id: queryProductId })]
          : products.map(prodId => resolveProduct(_, { id: prodId }))
    }))[0];

const resolveCustomer = (_, { id: queryId }) =>
  customers
    .filter(({ id }) => id === queryId)
    .map(({ id, name, purchases }) => ({
      id: () => id,
      name: () => name,
      purchases: ({ id: queryProductId }) =>
        queryProductId
          ? [resolveProduct(_, { id: queryProductId })]
          : purchases.map(prodId => resolveProduct(_, { id: prodId }))
    }))[0];

module.exports = makeExecutableSchema({
  typeDefs: `
    type Product {
      id: String
      name: String
      inStock: Int
      manufacturer: Manufacturer
    }

    type Manufacturer {
      id: String
      name: String
      products(id: String): [Product]
    }

    type Customer {
      id: String
      name: String
      purchases(id: String): [Product]
    }

    type Query {
      product(id: String): Product
      manufacturer(id: String): Manufacturer
      customer(id: String): Customer
    }
  `,
  resolvers: {
    Query: {
      product: resolveProduct,
      manufacturer: resolveManufacturer,
      customer: resolveCustomer
    }
  }
});
