var express = require('express');
var path = require('path');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var cors = require('cors')
// var { Pool } = require('pg');

var router = require('./router')
var schema = require('./schema')
var root = require('./root')

var app = express();

var port = process.env.PORT || 9000
app.use(
  express.urlencoded({
    extended: true
  })
);
  
app.use(express.json());
app.use(router)
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: false
// });
router.get('/', async (req, res) => {   
  res.send('app is healthy')
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));

app.set('port', port)
app.listen(9000, () => console.log('Browse to localhost:9000/'));
