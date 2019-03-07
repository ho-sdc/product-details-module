const express = require('express');
const path = require('path');
const parser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const { dbInitialize } = require('../postgresdb/index');
const seed = require('../postgresdb/seed');

const router = require('./routes');

const app = express();

module.exports.initializeApp = async () => {
  await dbInitialize();
  await seed();
  // app.use(morgan('dev'));
  app.use(cors());
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));

  app.use(express.static(path.resolve(__dirname, '../client/dist')));
  app.use('/abibas', router);
  return app;
};

module.exports.app = app;
