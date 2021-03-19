var express = require('express');
var router = express.Router();
var fs = require('fs')
var request = require('request-promise'); 
var sql = require('mssql')
var { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
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

router.post('/createNewVote', async (req, res) => {
    try {
        const client = await pool.connect();
        const {id, title, keyword, description, question} = req.body.newForm;
        console.log('HEY THERE HEHEHEHE', id)
        const queryString = `INSERT INTO voteToSendDB(id, keyword, name, description, question)VALUES('${id}', '${keyword}', '${title}', '${description}', '${question}');`

        pool.query(queryString, (err, res) => {
            if (err !== undefined) {
              // log the error to console
              console.log("Postgres INSERT error:", err);
          
              // get the keys for the error
              var keys = Object.keys(err);
              console.log("\nkeys for Postgres error:", keys);
          
              // get the error position of SQL string
              console.log("Postgres error position:", err.position);
            }
          
            // check if the response is not 'undefined'
            if (res !== undefined) {
              // log the response to console
              console.log("Postgres response:", res);
          
              // get the keys for the response object
              var keys = Object.keys(res);
          
              // log the response keys to console
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

router.post("/postResponseToVote", (req, res) => {
    console.log('createNewVote', req.body.vote)
    // send to db
    res.send('app is healthy')
});


module.exports = router;