/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function setupDspTwoServer(app) {
  // Set an example ad budget. Every time an ad is rendered, the budget will be lowered by 1.
  const adBudget = {
    'default-ad': Number.MAX_SAFE_INTEGER,
    'summer-backpack': 3,
    'winter-backpack': 3,
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

module.exports = setupDspTwoServer;
