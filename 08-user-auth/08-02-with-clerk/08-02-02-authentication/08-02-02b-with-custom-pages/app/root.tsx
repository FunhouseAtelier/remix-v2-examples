import type { LoaderFunction, MetaFunction } from '@remix-run/node'

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'

import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { ClerkApp } from '@clerk/remix'

export const meta: MetaFunction = () => {
  return [{ title: 'Authentication With Custom Pages' }]
}

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

function App() {
  return <Outlet />
}

export default ClerkApp(App)
