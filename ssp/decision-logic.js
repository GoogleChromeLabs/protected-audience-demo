console.log("decision-logic.js!!!");

function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  console.log({ adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals });
  console.log('scoreAd()')
  return bid;
}

function reportResult(auctionConfig, browserSignals) {
  console.log("report results");
  // log("reportResult", { auctionConfig, browserSignals });
  // sendReportTo(auctionConfig.seller + "/reporting?report=result");
  return {
    success: true,
    signalsForWinner: { signalForWinner: 1 },
    reportUrl: auctionConfig.seller + "/report_seller",
  };
}
