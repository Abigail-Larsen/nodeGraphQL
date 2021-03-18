var express = require('express');
var router = express.Router();
var fs = require('fs')
var request = require('request-promise'); 
var sql = require('mssql')

// router.get('/health', function (req, res) {
//     console.log("HEY THERE")
//     res.send('HEALTHY')
// });

router.post('/createNewVote', function (req, res) {
    // send to db
    console.log('createNewVote', req.body.newForm)
    res.send('the router is healthy')
});

router.post("/postResponseToVote", (req, res) => {
    console.log('createNewVote', req.body.vote)
    // send to db
    res.send('app is healthy')
});


module.exports = router;