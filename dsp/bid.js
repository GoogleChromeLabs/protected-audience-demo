console.log('bid.js!!!')
function generateBid(interestGroup, auctionSignals, perBuyerSignals,
    trustedBiddingSignals, browserSignals) {
    console.log('gen bid!!!')
  return {
    ad: "blah",
    // ad: {
    //   'key': 'value'
    // },
    // bid: auctionSignals.is_above_the_fold ? perBuyerSignals.atf_value : perBuyerSignals.btf_value,
    bid: 1,
    render: interestGroup.ads[0].renderUrl
  }
}

function reportWin() {
  console.log("report win");
}
