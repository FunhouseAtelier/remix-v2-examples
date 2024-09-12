import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'
import type { MetaFunction } from '@remix-run/node'
import type { LinksFunction } from '@remix-run/node'

/* 1. Import the `href` value of the app-wide stylesheet. */
import appStylesHref from '~/styles/app.css?url'

/* 2. Export a `links` function that returns and array of objects where each object represents a `<link>` element to add as a child of the `<head>` element of every route in the app. The object's key-value pairs represent the attribute-value pairs of the HTML element. */
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
]

export const meta: MetaFunction = () => {
  return [{ title: 'Adding Stylesheets with links' }]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
