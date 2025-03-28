import type {Route} from './+types/home';
import {
  getSeason,
  get2022Data,
  get2023Data,
  get2024Data,
} from '~/utilities/season.server';
import {defaultSeason} from '../data';
import {useLoaderData, Link} from 'react-router';
import type {LoaderResponse} from '~/types';

export function meta({}: Route.MetaArgs) {
  return [
    {title: 'Fantasy race cars'},
    {name: 'description', content: 'Just for fun.'},
  ];
}

export async function loader({request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const season = url.searchParams.get('season') || defaultSeason;

  if (season === '2022') {
    return get2022Data();
  } else if (season === '2023') {
    return get2023Data();
  } else if (season === '2024') {
    return get2024Data();
  }

  return await getSeason();
}

export default function Home() {
  const data = useLoaderData<LoaderResponse>();

  return (
    <div>
      <h1>Fantasy Race Cars</h1>
      <nav>
        <Link to="/?season=2022">2022</Link>
        <Link to="/?season=2023">2023</Link>
        <Link to="/?season=2024">2024</Link>
        <Link to="/?season=2025">2025</Link>
      </nav>
      <h2 className="season-header">Season: {data.season}</h2>
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
