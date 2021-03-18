var { buildSchema } = require('graphql');

var foo = buildSchema(`
  type Query {
    getVote: Vote,
    getKeyword: String,
  },
  type Vote {
    id: Int
    name: String
    description: String
    question: String
  }
`);

module.exports = foo;

