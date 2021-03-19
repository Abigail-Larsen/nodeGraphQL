const getVote = require('./resolvers/getVote');
const getKeyword = require('./resolvers/getKeyword');
const getId = require('./resolvers/getId');
const getResults = require('./resolvers/getResults');

const root = {
    getVote,
    getKeyword,
    getId,
    getResults
};

module.exports = root;