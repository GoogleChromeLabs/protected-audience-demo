console.log('run-auction.js')
const auctionConfig = {
  seller: "https://ssp.localhost:3004",
  decisionLogicUrl: "",
  // trustedScoringSignalsUrl: "",
  interestGroupBuyers: ["https://dsp.localhost:3003"],
  auctionSignals: { key: "value" },
  sellerSignals: { key: "value" },
  sellerTimeout: 100,
  perBuyerSignals: {
    "https://dsp.localhost:3003": { key: "value" },
  },
  perBuyerTimeouts: {
    "https://dsp.localhost:3003": 50,
    // 'https://another-buyer.example': 200,
    "*": 150,
  },
};

const auctionResultPromise = navigator.runAdAuction(auctionConfig)
  .then(data => {
    console.log({ data })
    // debugger
  });
