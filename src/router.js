var express = require('express');
var router = express.Router();
var { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? true : false
});

router.get('/votesThatHaveBeenCreated', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM voteToSendDB');
        const results = { 'results for voteToSendDB': (result) ? result.rows : null};
        res.send(results)
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
});

router.get('/voted', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM votesDB');
        const results = { 'results for voteToSendDB': (result) ? result.rows : null};
        res.send(results)
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
});

router.post('/createNewVote', async (req, res) => {
    try {
        const client = await pool.connect();
        const {id, title, keyword, description, question} = req.body.newForm;
        const queryString = `INSERT INTO voteToSendDB(id, keyword, name, description, question)VALUES('${id}', '${keyword}', '${title}', '${description}', '${question}');`

        pool.query(queryString, (err, res) => {
            if (err !== undefined) {
              console.log("Postgres INSERT error:", err);
              var keys = Object.keys(err);
              console.log("\nkeys for Postgres error:", keys);
              console.log("Postgres error position:", err.position);
            }
            if (res !== undefined) {
              console.log("Postgres response:", res);
              var keys = Object.keys(res);
              console.log("\nkeys type:", typeof keys);
              console.log("keys for Postgres response:", keys);
          
              if (res.rowCount > 0) {
                console.log("# of records inserted:", res.rowCount);
              } else {
                console.log("No records were inserted.");
              }
            }
          });
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
});

router.post("/postResponseToVote", async (req, res) => {
    try {
        const client = await pool.connect();
        const {id, answer, keyword} = req.body;
        const queryString = `INSERT INTO votesDB(id, answer, keyword)VALUES('${id}', '${answer}', '${keyword}');`

        pool.query(queryString, (err, res) => {
            if (err !== undefined) {
              console.log("Postgres INSERT error:", err);
              var keys = Object.keys(err);
              console.log("\nkeys for Postgres error:", keys);
              console.log("Postgres error position:", err.position);
            }
            if (res !== undefined) {
              console.log("Postgres response:", res);
              var keys = Object.keys(res);
              console.log("\nkeys type:", typeof keys);
              console.log("keys for Postgres response:", keys);
          
              if (res.rowCount > 0) {
                console.log("# of records inserted:", res.rowCount);
              } else {
                console.log("No records were inserted.");
              }
            }
          });
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }

    res.send('app is healthy')
});


module.exports = router;