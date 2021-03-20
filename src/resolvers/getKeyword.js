var { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://hwdxxryjhbvtnu:2ac3c5d28c091491dd1db9a8987e6e446a2256e9666f7e58b06ac98f6ecab7e8@ec2-54-161-239-198.compute-1.amazonaws.com:5432/d6avc8mgr7q011',
    ssl: {
      rejectUnauthorized: false
    }
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