const GQL_APP = process.env.GQL_APP || "_mutation_socialNetwork";
const PORT = process.env.PORT || 3000;
const { isEqual } = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const graphqlExpress = require("apollo-server-express").graphqlExpress;
const graphiqlExpress = require("apollo-server-express").graphiqlExpress;
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors(), bodyParser.json(), bodyParser.urlencoded({ extended: false }));

[
  "_mutation_socialNetwork",
  "inventorySystem",
  "randomQuotes",
  "randomQuotes_normalizedData",
  "socialNetwork"
].forEach(projectId => {
  const schema = require(`./graphql_demos/${projectId}/gqlApp`);
  const targetData = require(`./graphql_demos/${projectId}/targetData.json`);
  app.use(`/${projectId}/graphql`, graphqlExpress({ schema, context: {} }));
  app.use(
    `/${projectId}/graphiql`,
    graphiqlExpress({ endpointURL: `/${projectId}/graphql_game` })
  );
  app.use(`/${projectId}/graphql_game`, (req, res) => {
    const userName = req.headers["user-name"];
    const { query, variables } = req.body;
    fetch(`http://localhost:${PORT}/${projectId}/graphql`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query, variables })
    })
      .then(res => res.json())
      .then(data => {
        if (isEqual(targetData, data)) {
          console.log("=======================");
          console.log("CORRECT!!!!: ", userName);
          console.log("=======================");
        }
        res.send(data);
      });
  });
  app.use(
    `/${projectId}/graphiql_game`,
    graphiqlExpress({ endpointURL: `/${projectId}/graphql_game` })
  );
});

app.listen(PORT, () => {
  console.log("===============================================");
  console.log(`| graphql:  http://localhost:${PORT}/graphql`);
  console.log(`| graphiql: http://localhost:${PORT}/graphiql`);
  console.log("-----------------------------------------------");
  console.log(`| game:     http://localhost:${PORT}/graphiql_game`);
  console.log("===============================================");
});
