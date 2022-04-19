const sendMeasurements = () => {
  const performanceMarks = performance.getEntriesByType('mark');
  const performanceMeasures = performance.getEntriesByType('measure');

  console.log('Marks', performanceMarks);
  console.log('Measures', performanceMeasures);

  navigator.sendBeacon('https://localhost:3005/performance/fledge-marks', JSON.stringify(performanceMarks));
  navigator.sendBeacon('https://localhost:3005/performance/fledge-measures', JSON.stringify(performanceMeasures));
};

const runAuction = async () => {
  const auctionConfig = {
    seller: 'https://localhost:3005',
    decisionLogicUrl: 'https://localhost:3005/decision-logic.js',
    interestGroupBuyers: ['https://localhost:3003', 'https://localhost:3004'],
    auctionSignals: { isControversial: true },
    sellerSignals: { key: 'value' },
    sellerTimeout: 100,
    perBuyerSignals: {
      'https://localhost:3003': { windowInnerHeight: window.innerHeight },
    },
    perBuyerTimeouts: {
      '*': 50,
    },
  };

  // Run ad auction
  performance.mark('adAuctionStart');
  const opaqueUrl = await navigator.runAdAuction(auctionConfig);
  performance.mark('adAuctionEnd');
  performance.measure('adAuctionDuration', 'adAuctionStart', 'adAuctionEnd');

  // Render ad
  performance.mark('adRenderStart');
  const iframeEl = document.getElementById('fledge-ad');
  iframeEl.src = opaqueUrl;
  iframeEl.onload = () => {
    performance.mark('adRenderEnd');
    performance.measure('adRenderDuration', 'adRenderStart', 'adRenderEnd');
    performance.measure('adAuctionAndRenderDuration', 'adAuctionStart', 'adRenderEnd');

    sendMeasurements();
  };
};

runAuction();
