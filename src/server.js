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
router.get('/health', async (req, res) => {   
  // try {
  //   const client = await pool.connect();
  //   const result = await client.query('SELECT * FROM test_table');
  //   // const results = { 'results': (result) ? result.rows : null};
  //   // res.render('pages/db', results );
  //   // client.release();
  // } catch (err) {
  //   console.error(err);
  //   res.send("Error " + err);
  // }
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));

app.set('port', port)
app.listen(9000, () => console.log('Browse to localhost:9000/'));
