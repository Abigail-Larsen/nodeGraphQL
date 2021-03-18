const getVote = require('./resolvers/getVote');
const getKeyword = require('./resolvers/getKeyword');

const root = {
    getVote,
    getKeyword
};

module.exports = root;