var express = require('express');
var router = express.Router();
var fs = require('fs')
var request = require('request-promise'); 

router.get('/', function (req, res) {
    console.log("HEY THERE")
    res.send('Hello World')
});

router.post('/createNewVote', function (req, res) {
    console.log(req.body.newForm)
    res.send('the router is healthy')
});

router.get("/vote/:id", (req, res) => {
    let db = app.get("db");
    db.getVoteFromId([req.body.id]).then(form => {
        console.log("FORMMMM", form)
      res.status(200).send(form);
    });
});


module.exports = router;