const express = require('express');
const path = require('path');
const parser = require('body-parser');

const { dbInitialize } = require('../postgresdb/index');

const router = require('./routes');

const app = express();

module.exports.initializeApp = async () => {
  await dbInitialize();
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  if (process.env.SERVE_STATIC) {
    app.use(express.static(path.resolve(__dirname, '../client/dist')));
  }
  app.use('/abibas', router);
};

module.exports.app = app;
