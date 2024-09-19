import type { LoaderFunction, MetaFunction } from '@remix-run/node'

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'

/* 1. Import the Clerk `rootAuthLoader` function and `ClerkApp` wrapper. */
import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { ClerkApp } from '@clerk/remix'

export const meta: MetaFunction = () => {
  return [{ title: 'New Project Title' }]
}

/* 2. Export a `loader` function that passes its arguments to the `rootAuthLoader` function. */
export const loader: LoaderFunction = (args) => rootAuthLoader(args)

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

/* 3. Instead of exporting the `App` function as the default, use the `ClerkApp` wrapper, which is passed the `App` function as an argument. */
function App() {
  return <Outlet />
}

export default ClerkApp(App)
