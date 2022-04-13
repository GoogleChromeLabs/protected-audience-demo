const runAuction = async () => {
  const auctionConfig = {
    seller: 'https://localhost:3004',
    decisionLogicUrl: 'https://localhost:3004/decision-logic.js',
    interestGroupBuyers: ['https://localhost:3003'],
    auctionSignals: { key: 'value' },
    sellerSignals: { key: 'value' },
    sellerTimeout: 100,
    perBuyerSignals: {
      'https://localhost:3003': { key: 'value' },
    },
    perBuyerTimeouts: {
      'https://localhost:3003': 50,
      '*': 150,
    },
  };

  performance.mark('adAuctionStart');
  const opaqueUrl = await navigator.runAdAuction(auctionConfig);
  performance.mark('adAuctionEnd');
  performance.measure('adAuctionDuration', 'adAuctionStart', 'adAuctionEnd');

  performance.mark('adRenderStart');
  const iframeEl = document.getElementById('fledge-ad');
  iframeEl.src = opaqueUrl;
  iframeEl.onload = () => {
    performance.mark('adRenderEnd');
    performance.measure('adRenderDuration', 'adRenderStart', 'adRenderEnd');
  };
};

runAuction();
