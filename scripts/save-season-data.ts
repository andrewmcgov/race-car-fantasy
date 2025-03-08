import fs from 'fs';
import {getSeason} from '../app/utilities/season.server';

// run this script from the project root with `npm run save-season`
// update values to pull data from the correct season
// only need to run once per season once the season is over
(async function () {
  const data = await getSeason();

  const dataAsString = JSON.stringify(data, null, 2);

  fs.writeFileSync('./app/data/2024.json', dataAsString);
})();
