var { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
});

const getVote = async (req, res) => {
    const client = await pool.connect();
    const queryString = `SELECT * FROM voteToSendDB WHERE id='${res.body.variables.id}'`;
    const result = await client.query(queryString);
    client.release();
    return result.rows[0]
}

module.exports = getVote;