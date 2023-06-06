/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const express = require('express');
const functions = require('firebase-functions');
const setupApp = require('../helpers/setup-app');

const app = setupApp(express(), 'adtech');

app.get('/permissions-test', (req, res) => {
  const { DEMO_HOME_URL, ADVERTISER_URL, PUBLISHER_URL, DSP_URL, SSP_URL, ADTECH_URL } = process.env;

  res.render('permissions-test', {
    demoHomeUrl: DEMO_HOME_URL,
    advertiserUrl: ADVERTISER_URL,
    publisherUrl: PUBLISHER_URL,
    dspUrl: DSP_URL,
    sspUrl: SSP_URL,
    adtechUrl: ADTECH_URL,
  });
});

exports.adtech = functions.https.onRequest(app);
