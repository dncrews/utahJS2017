const express = require('express');
const graphqlHTTP = require('express-graphql');
const PORT = process.env.PORT || 80;

const Schema = require('./GraphQL');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
  formatError(error) {
    console.info('error', error);

    return error;
  },
}));

app.listen(PORT, () => {
  console.info('go web');
});
