console.log('bid.js!!!')
function generateBid(interestGroup, auctionSignals, perBuyerSignals,
    trustedBiddingSignals, browserSignals) {
    console.log('gen bid.js!!!')
  return {
    ad: {
      'key': 'value'
    },
    bid: auctionSignals.is_above_the_fold ? perBuyerSignals.atf_value : perBuyerSignals.btf_value,
    render: interestGroup.ads[0].renderUrl
  }
}
