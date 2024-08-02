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
const runAuction = async (sspUrl, dspUrl) => {
  const resolveToConfig = typeof window.FencedFrameConfig !== 'undefined';

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
    resolveToConfig,
  };

  console.log('auctionConfig = ', JSON.stringify(auctionConfig));

  // Run ad auction
  const selectedAd = await navigator.runAdAuction(auctionConfig);

  // Render ad
  const frame = document.getElementById('protected-audience-ad');

  if (resolveToConfig && selectedAd instanceof FencedFrameConfig) {
    frame.config = selectedAd;
  } else {
    frame.src = selectedAd;
  }
};
