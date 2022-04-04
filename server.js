const fs = require('fs')
const https = require('https')
const express = require('express');
const vhost = require('vhost');
const morgan = require('morgan');

// Setup HTTPS certificates
const certPath = process.argv.slice(2)

const mainServerOptions = {
  key: fs.readFileSync(`${certPath}/localhost-key.pem`),
  cert: fs.readFileSync(`${certPath}/localhost.pem`),
};
const advertiserServerOptions = {
  key: fs.readFileSync(`${certPath}/advertiser.localhost-key.pem`),
  cert: fs.readFileSync(`${certPath}/advertiser.localhost.pem`),
};
const publisherServerOptions = {
  key: fs.readFileSync(`${certPath}/publisher.localhost-key.pem`),
  cert: fs.readFileSync(`${certPath}/publisher.localhost.pem`),
};
const dspServerOptions = {
  key: fs.readFileSync(`${certPath}/dsp.localhost-key.pem`),
  cert: fs.readFileSync(`${certPath}/dsp.localhost.pem`),
};
const sspServerOptions = {
  key: fs.readFileSync(`${certPath}/ssp.localhost-key.pem`),
  cert: fs.readFileSync(`${certPath}/ssp.localhost.pem`),
};
const trustedServerOptions = {
  key: fs.readFileSync(`${certPath}/trusted-server.localhost-key.pem`),
  cert: fs.readFileSync(`${certPath}/trusted-server.localhost.pem`),
};

// Setup Express apps
const mainApp = express();
const advertiserApp = express();
const publisherApp = express();
const dspApp = express();
const sspApp = express();
const trusetedServerApp = express();

// Add logging
mainApp.use(morgan('tiny'));

// Set FLEDGE header for DSP and SSP
const setFledgeHeader = (req, res, next) => {
  res.setHeader("X-Allow-FLEDGE", true);
  next()
}

dspApp.use(setFledgeHeader)
sspApp.use(setFledgeHeader)

// Serve static files from a folder for each app
advertiserApp.use(express.static('advertiser'));
publisherApp.use(express.static('publisher'));
dspApp.use(express.static('dsp'));
sspApp.use(express.static('ssp'));
trusetedServerApp.use(express.static('trusted-server'));

// Setup HTTPS server for each app
https.createServer(mainServerOptions, mainApp).listen(3000);
https.createServer(advertiserServerOptions, advertiserApp).listen(3001);
https.createServer(publisherServerOptions, publisherApp).listen(3002);
https.createServer(dspServerOptions, dspApp).listen(3003);
https.createServer(sspServerOptions, sspApp).listen(3004);
https.createServer(trustedServerOptions, trusetedServerApp).listen(3005);

// Setup virtual host routing for each app
mainApp.use(vhost('advertiser.localhost', advertiserApp));
mainApp.use(vhost('publisher.localhost', publisherApp));
mainApp.use(vhost('dsp.localhost', dspApp));
mainApp.use(vhost('ssp.localhost', sspApp));
mainApp.use(vhost('trusted-server.localhost', trusetedServerApp));
