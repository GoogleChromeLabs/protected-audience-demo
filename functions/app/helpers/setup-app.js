const path = require('path');
const hbs = require('express-handlebars');

// Read the dev or prod URLs to be used
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = (app, viewName) => {
  // Setup view with Handlebars
  // Doc: https://handlebarsjs.com/guide/#block-helpers
  app.engine(
    'hbs',
    hbs.engine({
      extname: '.hbs',
      layoutsDir: path.join(__dirname + '/../../view'),
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname + `/../../view/${viewName}`));

  // Setup root route
  app.get('/', (req, res) => {
    const { DEMO_HOME_URL, ADVERTISER_URL, PUBLISHER_URL, DSP_URL, SSP_URL } = process.env;

    res.render('index', {
      demoHomeUrl: DEMO_HOME_URL,
      advertiserUrl: ADVERTISER_URL,
      publisherUrl: PUBLISHER_URL,
      dspUrl: DSP_URL,
      sspUrl: SSP_URL,
    });
  });

  return app;
};
