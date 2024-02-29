import cheerio from 'cheerio';
import fs from 'fs';
import {DriverData} from '~/types';
import {drivers2023} from '../app/data/drivers';

const {erinDrivers, andrewDrivers} = drivers2023;

// run this script from the project root with `npm run save-season`
// update values to pull data from the correct season
// only need to run once per season once the season is over
(async function () {
  const res = await fetch(
    'https://www.formula1.com/en/results.html/2023/drivers.html'
  );

  const html = await res.text();
  const $ = cheerio.load(html);
  const driverRows = $('.resultsarchive-table tr');

  const erinDriverData: DriverData[] = [];
  const andrewDriverData: DriverData[] = [];

  driverRows.map((_, node) => {
    const name = $(node).find('.hide-for-mobile').text();
    const points = $(node).find('td.dark.bold').text();

    if (isNaN(Number(points))) {
      return;
    }

    const driver = {name, points: Number(points)};

    if (erinDrivers.includes(name)) {
      erinDriverData.push(driver);
    } else if (andrewDrivers.includes(driver.name)) {
      andrewDriverData.push(driver);
    }
  });

  const data = {
    erin: {
      drivers: erinDriverData,
      total: erinDriverData.reduce((acc, current) => {
        return acc + current.points;
      }, 0),
    },
    andrew: {
      drivers: andrewDriverData,
      total: andrewDriverData.reduce((acc, current) => {
        return acc + current.points;
      }, 0),
    },
  };

  const dataAsString = JSON.stringify(data, null, 2);

  fs.writeFileSync('./app/data/2023.json', dataAsString);
})();
