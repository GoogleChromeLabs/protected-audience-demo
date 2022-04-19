function getAdBids(ads, properties) {
  const { isControversial, windowInnerHeight, remainingAdBudget, favoriteColor } = properties;

  return ads.map((ad) => {
    const {
      renderUrl,
      metadata: { adName, allowControversial, productColor },
    } = ad;

    // Initial bid
    let bid = 0;

    if (productColor === favoriteColor) {
      bid += 1;
    }

    if (isControversial && !allowControversial) {
      bid = 0;
    }

    if (remainingAdBudget[adName] <= 0) {
      bid = 0;
    }

    return {
      adName,
      bid,
      renderUrl,
    };
  });
}

function generateBid(interestGroup, auctionSignals, perBuyerSignals, trustedBiddingSignals, browserSignals) {
  const { isControversial } = auctionSignals;
  const { windowInnerHeight } = perBuyerSignals;
  const { remainingAdBudget } = trustedBiddingSignals;
  const {
    ads,
    userBiddingSignals: { favoriteColor },
  } = interestGroup;

  const adBids = getAdBids(ads, {
    isControversial,
    windowInnerHeight,
    remainingAdBudget,
    favoriteColor,
  });

  const [{ adName, bid, renderUrl }] = adBids.sort((a, b) => b.bid - a.bid);

  return {
    ad: {
      adName,
    },
    bid,
    render: renderUrl,
  };
}

function reportWin() {
  console.log('report win');
}
