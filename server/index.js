require('newrelic');
const { app, initializeApp } = require('./app');

initializeApp().then(() =>
  app.listen(process.env.PORT, () =>
    console.log('Listening on PORT', process.env.PORT)
  )
);
