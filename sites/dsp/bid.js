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

function getAdBids(ads, properties) {
  const { isControversial, windowInnerHeight, remainingAdBudget, favoriteColor } = properties;

  return ads.map((ad) => {
    const {
      renderUrl,
      metadata: { adName, allowControversial, productColor },
    } = ad;

    // Initial bid
    let bid = 0;

    if (productColor === favoriteColor) {
      bid += 1;
    }

    if (isControversial && !allowControversial) {
      bid = 0;
    }

    if (remainingAdBudget[adName] <= 0) {
      bid = 0;
    }

    return {
      adName,
      bid,
      renderUrl,
    };
  });
}

function generateBid(interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals) {
  const { isControversial } = auctionSignals;
  const { windowInnerHeight } = perBuyerSignals;
  // const { remainingAdBudget } = trustedBiddingSignals;
  const {
    ads,
    userBiddingSignals: { favoriteColor },
  } = interestGroup;

  const adBids = getAdBids(ads, {
    isControversial,
    windowInnerHeight,
    remainingAdBudget: 10,
    favoriteColor,
  });

  const [{ adName, bid, renderUrl }] = adBids.sort((a, b) => b.bid - a.bid);

  return {
    ad: {
      adName,
    },
    bid,
    render: renderUrl,
  };
}

function reportWin() {
  console.log('report win');
}
