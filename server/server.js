const fs = require('fs');
const https = require('https');
const express = require('express');
const morgan = require('morgan');
const setupDspOneServer = require('./dspOne');
const setupDspTwoServer = require('./dspTwo');

// Setup Express apps
const mainApp = express();
const advertiserApp = express();
const publisherApp = express();
const dspOneApp = express();
const dspTwoApp = express();
const sspApp = express();

// Add logging
mainApp.use(morgan('tiny'));

// Set FLEDGE header for DSP and SSP
const setFledgeHeader = (req, res, next) => {
  res.setHeader('X-Allow-FLEDGE', true);
  next();
};

dspOneApp.use(setFledgeHeader);
dspTwoApp.use(setFledgeHeader);
sspApp.use(setFledgeHeader);

// Serve static files from a folder for each app
mainApp.use(express.static('public'));
advertiserApp.use(express.static('demo/advertiser'));
publisherApp.use(express.static('demo/publisher'));
dspOneApp.use(express.static('demo/dsp-one'));
dspTwoApp.use(express.static('demo/dsp-two'));
sspApp.use(express.static('demo/ssp'));

// Setup DSP servers
setupDspOneServer(dspOneApp);
setupDspTwoServer(dspTwoApp);

// Setup SSP server
sspApp.post('/performance/:metricName', (req, res) => {
  res.sendStatus(200);
});

// Setup server options for HTTPS certificates
const certPath = process.argv.slice(2);

const serverOptions = {
  key: fs.readFileSync(`${certPath}/localhost-key.pem`),
  cert: fs.readFileSync(`${certPath}/localhost.pem`),
};

// Setup HTTPS server for each app
https.createServer(serverOptions, mainApp).listen(3000);
https.createServer(serverOptions, advertiserApp).listen(3001);
https.createServer(serverOptions, publisherApp).listen(3002);
https.createServer(serverOptions, dspOneApp).listen(3003);
https.createServer(serverOptions, dspTwoApp).listen(3004);
https.createServer(serverOptions, sspApp).listen(3005);
