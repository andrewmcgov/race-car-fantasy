import cheerio from 'cheerio';
import {drivers2023} from '~/data/drivers';
import {DriverData, LoaderResponse} from '~/types';
const {erinDrivers, andrewDrivers} = drivers2023;

export function get2022Data() {
  return require('~/data/2022.json') as LoaderResponse;
}

export async function getSeason() {
  const res = await fetch(
    'https://www.formula1.com/en/results.html/2023/drivers.html'
  );

  const html = await res.text();
  const $ = cheerio.load(html);
  const driverRows = $('.resultsarchive-table tr');

  const erinDriverData: DriverData[] = [];
  const andrewDriverData: DriverData[] = [];

  if (driverRows.length === 0) {
    erinDrivers.forEach((driver) => {
      erinDriverData.push({name: driver, points: 0});
    });
    andrewDrivers.forEach((driver) => {
      andrewDriverData.push({name: driver, points: 0});
    });
  }

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

  return {
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
}
