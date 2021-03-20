var { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
});

const getId = async (req, res) => {
    console.log("getId", res.body.variables)
    const client = await pool.connect();
    const queryString = `SELECT * FROM voteToSendDB WHERE keyword='${res.body.variables.keyword}'`;
    const result = await client.query(queryString);
    client.release();
    return result.rows[0].id
}

module.exports = getId;