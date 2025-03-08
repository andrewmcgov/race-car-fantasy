import cheerio from 'cheerio';
import {drivers2024} from '../data/drivers';
import {DriverData, LoaderResponse} from '../types';
const {erinDrivers, andrewDrivers} = drivers2024;

export function get2022Data() {
  return require('~/data/2022.json') as LoaderResponse;
}

export function get2023Data() {
  return require('~/data/2023.json') as LoaderResponse;
}

export function get2024Data() {
  return require('~/data/2024.json') as LoaderResponse;
}

export async function getSeason() {
  const res = await fetch(
    'https://www.formula1.com/en/results.html/2024/drivers.html'
  );

  const html = await res.text();
  const $ = cheerio.load(html);
  const driverRows = $('.f1-table tr');

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
    const name = $(node).find('a[href*="drivers"]').first().text();
    const points = $(node).find('p').last().text();

    if (isNaN(Number(points))) {
      return;
    }

    const erinMatch = erinDrivers.find((driver) => name.includes(driver));
    const andrewMatch = andrewDrivers.find((driver) => name.includes(driver));
    const match = erinMatch || andrewMatch;

    if (!match) {
      console.log('No match found for:', name, points);
      return;
    }

    const driver = {name: match, points: Number(points)};

    if (erinMatch) {
      erinDriverData.push(driver);
    } else if (andrewMatch) {
      andrewDriverData.push(driver);
    }
  });

  return {
    season: '2024',
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
