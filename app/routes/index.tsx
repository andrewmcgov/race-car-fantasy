import {useLoaderData} from 'remix';
import cheerio from 'cheerio';

const erinDrivers = [
  'Verstappen',
  'Sainz',
  'Russell',
  'Norris',
  'Gasly',
  'Alonso',
  'Magnussen',
  'Albon',
  'Bottas',
  'Zhou',
];
const andrewDrivers = [
  'Leclerc',
  'Hamilton',
  'Perez',
  'Ricciardo',
  'Ocon',
  'Schumacher',
  'Tsunoda',
  'Vettel',
  'Hulkenberg',
  'Stroll',
  'Latifi',
];

interface DriverData {
  name: string;
  points: number;
}

interface TeamData {
  drivers: DriverData[];
  total: number;
}

interface LoaderResponse {
  erin: TeamData;
  andrew: TeamData;
}

export async function loader() {
  const res = await fetch(
    'https://www.formula1.com/en/results.html/2022/drivers.html'
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

export default function Index() {
  const data = useLoaderData<LoaderResponse>();

  return (
    <div>
      <h1>Fantasy Race Cars</h1>
      <main>
        <div className="contestant">
          <h2>Erin - {data.erin.total}</h2>
          <ul>
            {data.erin.drivers.map((driver) => {
              return (
                <li key={driver.name}>
                  <span>{driver.name}</span>
                  <span>{driver.points}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="contestant">
          <h2>Andrew - {data.andrew.total}</h2>
          <ul>
            {data.andrew.drivers.map((driver) => {
              return (
                <li key={driver.name}>
                  <span>{driver.name}</span>
                  <span>{driver.points}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
