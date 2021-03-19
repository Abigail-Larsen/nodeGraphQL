var { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
});

const getResults = async (req, res) => {
    console.log("heyyy", res.body.variables)
    const client = await pool.connect();
    const queryString = `SELECT * FROM votesDB WHERE id='${res.body.variables.id}'`;
    const result = await client.query(queryString);
    client.release();
    console.log('result', result.rows)
    return result.rows
}

module.exports = getResults;