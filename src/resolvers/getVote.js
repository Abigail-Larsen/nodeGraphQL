const getVote = async () => {
    console.log("HIT THE VOTE")
     
    return {
        id: 123456,
        keyword: 'dog',
        name: 'Vote 1',
        description: 'this is the description',
        question: 'what is my question'
    }
}

module.exports = getVote;