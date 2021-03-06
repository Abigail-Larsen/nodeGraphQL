var express = require('express');
var path = require('path');
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var cors = require('cors')

var router = require('./router')
var schema = require('./schema')
var root = require('./root')

var app = express();

const PORT = process.env.PORT || 9000;

app.use(
  express.urlencoded({
    extended: true
  })
);
  
app.use(express.json());
app.use(cors())
app.use(router)

app.get('/', async (req, res) => {
  res.send('app is healthy')
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));

app.use(express.static(path.join(__dirname, 'build')));
app.listen(PORT);
