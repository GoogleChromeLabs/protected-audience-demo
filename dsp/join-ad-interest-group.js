console.log("dsp.js!!!");
const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

const interestGroup = {
  owner: "https://dsp.localhost:3003",
  name: "camping-tents",
  biddingLogicUrl: "https://dsp.localhost:3003/bid.js",
  dailyUpdateUrl: "https://dsp.localhost:3003/update.json",
  // trustedBiddingSignalsUrl: "https://dsp.localhost:3003/signal.json",
  trustedBiddingSignalsUrl: "https://dsp.localhost:3003/signal.json",
  trustedBiddingSignalsKeys: ["key"],
  // userBiddingSignals: {...},
  ads: [
    {
      renderUrl: "https://dsp.localhost:3003/300x250.png",
    },
  ],
};
console.log({ interestGroup });
navigator.joinAdInterestGroup(interestGroup, ONE_WEEK_IN_SECONDS);
