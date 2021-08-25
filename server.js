const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const routes = require('./src/routes');

const app = express();

// Allow for larger payload
app.use(bodyParser.json({
  limit: '20mb',
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all domains
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// for parsing application/json
app.use(express.json());

// HEALTH CHECK
app.get('/', (req, res) => {
  res.send(
    {
      messageToYOU: 'Hi!',
    },
  );
});

// Add multiple routes
app.use('/', routes);

module.exports = app;
