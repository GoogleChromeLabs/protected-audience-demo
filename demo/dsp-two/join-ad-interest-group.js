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
    owner: 'https://localhost:3004',
    name: 'hiking-backpacks',
    biddingLogicUrl: 'https://localhost:3004/bid.js',
    dailyUpdateUrl: 'https://localhost:3004/update.json',
    trustedBiddingSignalsUrl: 'https://localhost:3004/bidding-signal',
    trustedBiddingSignalsKeys: ['remainingAdBudget'],
    userBiddingSignals: {
      favoriteColor: getFavoriteColor(),
    },
    ads: [
      {
        renderUrl: 'https://localhost:3004/ads/default-ad.html',
        metadata: {
          adName: 'default-ad',
          allowControversial: true,
          productColor: null,
        },
      },
      {
        renderUrl: 'https://localhost:3004/ads/summer-backpack.html',
        metadata: {
          adName: 'summer-backpack',
          allowControversial: false,
          productColor: 'blue',
        },
      },
      {
        renderUrl: 'https://localhost:3004/ads/another-summer-backpack.html',
        metadata: {
          adName: 'another-summer-backpack',
          allowControversial: true,
          productColor: 'blue',
        },
      },
      {
        renderUrl: 'https://localhost:3004/ads/winter-backpack.html',
        metadata: {
          adName: 'winter-backpack',
          allowControversial: false,
          productColor: 'red',
        },
      },
      {
        renderUrl: 'https://localhost:3004/ads/winter-backpack.html',
        metadata: {
          adName: 'another-winter-backpack',
          allowControversial: true,
          productColor: 'red',
        },
      },
    ],
  };

  navigator.joinAdInterestGroup(interestGroup, ONE_WEEK_IN_SECONDS);
};

joinInterestGroup();
