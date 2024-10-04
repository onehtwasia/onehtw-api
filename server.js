require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enables CORS on the server
app.use(cors());

// Enables JSON body payloads
app.use(bodyParser.json());

// Sets a default language to ENG
app.use(function(req,res,next){
  req.language = req.query.language || req.headers['accept-language'] || 'ENG';
  next();
});

// User APIs
app.use('/languages', require('./api/languages'));
app.use('/churches', require('./api/churches'));
app.use('/partners', require('./api/partners'));
app.use('/news', require('./api/news'));
app.use('/testimonies', require('./api/testimonies'));
app.use('/campaigns', require('./api/campaigns'));
app.use('/devotionals', require('./api/devotionals'));
app.use('/readings', require('./api/bible'));
app.use('/labels', require('./api/labels'));
app.use('/users', require('./api/users'));
app.use('/analytics', require('./api/analytics'));

// Admin APIs
app.use('/admin', require('./adminapi/index'));

// Monitoring APIs
app.get('/version', (req, res) => {
  res.json('V12');
});

app.use(function(err, req, res, next) {
  console.error('ERROR', err);
  res.status(500).json('An unknown error occurred');
});

// Waits for database to connect before enabling server
app.listen(process.env.PORT || 8888);
console.log('Listening on port 8888');

process.on('uncaughtException', err => {
  console.error('UNCAUGHT ERROR', err);
})
