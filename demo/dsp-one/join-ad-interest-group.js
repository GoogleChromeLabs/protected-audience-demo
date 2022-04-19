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
