var { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
});

const getKeyword = async (req, res) => {
    console.log("HIT THE VOTE", res.body.variables)
    const client = await pool.connect();
    const queryString = `SELECT * FROM voteToSendDB WHERE id='${res.body.variables.id}'`;
    console.log("queryString", queryString)
    const result = await client.query(queryString);
    client.release();
    console.log("RESULTS", result.rows)
    return result.rows[0].keyword
}

module.exports = getKeyword;