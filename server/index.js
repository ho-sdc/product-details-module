require('newrelic');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const myEnv = dotenv.config();
dotenvExpand(myEnv);

const { app, initializeApp } = require('./app');

initializeApp().then(() =>
  app.listen(process.env.PORT, () =>
    console.log('Listening on PORT', process.env.PORT)
  )
);
