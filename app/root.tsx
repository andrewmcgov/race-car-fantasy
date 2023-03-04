import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type {MetaFunction} from 'remix';

import styles from '~/styles/global.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Fantasy Race Cars',
  viewport: 'width=device-width,initial-scale=1',
});

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
