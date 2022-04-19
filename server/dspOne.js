function setupDspOneServer(app) {
  // Set an example ad budget. Every time an ad is rendered, the budget will be lowered by 1.
  const adBudget = {
    'default-ad': Number.MAX_SAFE_INTEGER,
    'summer-tent': 3,
    'winter-tent': 3,
  };

  app.get('/report', (req, res) => {
    const { adName } = req.query;
    adBudget[adName] -= 1;
    res.sendStatus(200);
  });

  // The ad budget
  app.get('/bidding-signal', (req, res) => {
    const { keys } = req.query;

    if (!keys) {
      res.send({});
      return;
    }

    keys.split(',').forEach((key) => {
      console.log({ key });
      if (key === 'remainingAdBudget') {
        res.send({ remainingAdBudget: adBudget });
      }
    });
  });
}

module.exports = setupDspOneServer;
