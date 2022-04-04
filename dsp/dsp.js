console.log('dsp.js!!!')
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7

const interestGroup = {
  owner: "https://dsp.localhost:3003",
  name: "camping-tents",
  biddingLogicUrl: "https://dsp.localhost:3003/bid.js",
  dailyUpdateUrl: "https://dsp.localhost:3003/update.json",
  trustedBiddingSignalsUrl: "https://trusted-server.localhost:3000",
  trustedBiddingSignalsKeys: ["key1", "key2"],
  // userBiddingSignals: {...},
  ads: [{
    renderUrl: 'https://localhost:3000'
  }],
};

navigator.joinAdInterestGroup(interestGroup, ONE_WEEK_IN_SECONDS);
