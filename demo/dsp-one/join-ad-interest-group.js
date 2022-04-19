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

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;
const getFavoriteColor = () => 'blue';

const joinInterestGroup = async () => {
  const interestGroup = {
    owner: 'https://localhost:3003',
    name: 'camping-tents',
    biddingLogicUrl: 'https://localhost:3003/bid.js',
    dailyUpdateUrl: 'https://localhost:3003/update.json',
    trustedBiddingSignalsUrl: 'https://localhost:3003/bidding-signal',
    trustedBiddingSignalsKeys: ['remainingAdBudget'],
    userBiddingSignals: {
      favoriteColor: getFavoriteColor(),
    },
    ads: [
      {
        renderUrl: 'https://localhost:3003/ads/default-ad.html',
        metadata: {
          adName: 'default-ad',
          allowControversial: true,
          productColor: null,
        },
      },
      {
        renderUrl: 'https://localhost:3003/ads/summer-tent.html',
        metadata: {
          adName: 'summer-tent',
          allowControversial: false,
          productColor: 'blue',
        },
      },
      {
        renderUrl: 'https://localhost:3003/ads/another-summer-tent.html',
        metadata: {
          adName: 'another-summer-tent',
          allowControversial: true,
          productColor: 'blue',
        },
      },
      {
        renderUrl: 'https://localhost:3003/ads/winter-tent.html',
        metadata: {
          adName: 'winter-tent',
          allowControversial: false,
          productColor: 'red',
        },
      },
      {
        renderUrl: 'https://localhost:3003/ads/winter-tent.html',
        metadata: {
          adName: 'another-winter-tent',
          allowControversial: true,
          productColor: 'red',
        },
      },
    ],
  };

  navigator.joinAdInterestGroup(interestGroup, ONE_WEEK_IN_SECONDS);
};

joinInterestGroup();
