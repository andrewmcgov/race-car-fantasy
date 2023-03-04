import {LoaderFunction, useLoaderData} from 'remix';
import {Link} from 'remix';
import {defaultSeason} from '~/data';
import {LoaderResponse} from '~/types';
import {getSeason, get2022Data} from '~/utilities/season.server';

export const loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url);
  const season = url.searchParams.get('season') || defaultSeason;

  if (season === '2022') {
    return get2022Data();
  }

  return await getSeason();
};

export default function Index() {
  const data = useLoaderData<LoaderResponse>();

  return (
    <div>
      <h1>Fantasy Race Cars</h1>
      <nav>
        <Link to="/?season=2022">2022</Link>
        <Link to="/?season=2023">2023</Link>
      </nav>
      <h2 className="season-header">Season: 2022</h2>
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
