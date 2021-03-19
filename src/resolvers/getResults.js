var { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

const getResults = async (req, res) => {
    const client = await pool.connect();
    const queryString = `SELECT * FROM votesDB WHERE id='${res.body.variables.id}'`;
    const result = await client.query(queryString);
    client.release();
    return result.rows
}

module.exports = getResults;