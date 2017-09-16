
const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const path = require('path');

const idl = fs.readFileSync(path.join(__dirname, 'idl.graphql'), 'utf8');
const resolvers = require('./resolvers');

module.exports = makeExecutableSchema({
  typeDefs: idl,
  resolvers,
});
