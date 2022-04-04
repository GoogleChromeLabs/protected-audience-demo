console.log('run-auction.js')
const runAuction = async () => {
  const auctionConfig = {
    seller: "https://ssp.localhost:3004",
    decisionLogicUrl: "https://ssp.localhost:3004/decision-logic.js",
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

  const opaqueUrl = await navigator.runAdAuction(auctionConfig)
  console.log({ opaqueUrl })
  document.getElementById('fledge-ad').src = opaqueUrl
}

runAuction()

