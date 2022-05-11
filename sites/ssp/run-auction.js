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

const sendMeasurements = (sspUrl) => {
  const performanceMarks = performance.getEntriesByType('mark');
  const performanceMeasures = performance.getEntriesByType('measure');

  console.log('Marks', performanceMarks);
  console.log('Measures', performanceMeasures);

  navigator.sendBeacon(`${sspUrl}/performance/fledge-marks`, JSON.stringify(performanceMarks));
  navigator.sendBeacon(`${sspUrl}/performance/fledge-measures`, JSON.stringify(performanceMeasures));
};

const runAuction = async (sspUrl, dspUrl) => {
  const auctionConfig = {
    seller: `${sspUrl}`,
    decisionLogicUrl: `${sspUrl}/decision-logic.js`,
    interestGroupBuyers: [dspUrl],
    auctionSignals: { isControversial: true },
    sellerSignals: { key: 'value' },
    sellerTimeout: 100,
    perBuyerSignals: {
      [dspUrl]: { windowInnerHeight: window.innerHeight },
    },
    perBuyerTimeouts: {
      '*': 50,
    },
  };

  console.log('auctionConfig = ', JSON.stringify(auctionConfig));

  // Run ad auction
  performance.mark('adAuctionStart');
  const opaqueUrl = await navigator.runAdAuction(auctionConfig);
  console.log('opaqueUrl = ', opaqueUrl);
  performance.mark('adAuctionEnd');
  performance.measure('adAuctionDuration', 'adAuctionStart', 'adAuctionEnd');

  // Render ad
  performance.mark('adRenderStart');
  const iframeEl = document.getElementById('fledge-ad');
  iframeEl.src = opaqueUrl;
  iframeEl.onload = () => {
    performance.mark('adRenderEnd');
    performance.measure('adRenderDuration', 'adRenderStart', 'adRenderEnd');
    performance.measure('adAuctionAndRenderDuration', 'adAuctionStart', 'adRenderEnd');

    sendMeasurements(sspUrl);
  };
};

// runAuction();
