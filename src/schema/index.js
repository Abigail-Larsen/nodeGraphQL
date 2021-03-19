var { buildSchema } = require('graphql');

var foo = buildSchema(`
  type Query {
    getVote(
      id: String
    ): Vote,

    getId(
      keyword: String
    ): String,

    getKeyword(
      id: String
    ): String,

    getResults(
      id: String
    ): [Result],
  },
  
  type Vote {
    id: String
    name: String
    description: String
    question: String
  },
  type Result {
    answer: String
  }
`);

module.exports = foo;

