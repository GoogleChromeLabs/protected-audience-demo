function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  console.log(
    JSON.stringify({
      adMetadata,
      bid,
      auctionConfig,
      trustedScoringSignals,
      browserSignals,
    })
  );
  return bid;
}

function reportResult(auctionConfig, browserSignals) {
  sendReportTo(auctionConfig.seller + '/reporting?report=result');

  return {
    success: true,
    signalsForWinner: { signalForWinner: 1 },
    reportUrl: auctionConfig.seller + '/report_seller',
  };
}
