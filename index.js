const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { port, dbURI } = require('./config/environment.js');
const router = require('./config/router');
const logger = require('./lib/logger');
// const errorHandler = require('./lib/errorHandler');

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('mongo is connected')
);

app.use(bodyParser.json());

app.use(logger); // has to be before router!!! Because router return sresults so if after it never gets ti rub,

app.use('/api', router); // all middleware is now in the router it always has to be bellow body parser

// app.use(errorHandler);

app.get('/*', (req, res) =>
  res.status(404).json({ message: 'Not found index.js' })
); // catch all non match stuff

app.listen(port, () => console.log(`running on port ${port}`));
