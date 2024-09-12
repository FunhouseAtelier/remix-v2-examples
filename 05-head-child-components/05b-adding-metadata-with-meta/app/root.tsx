/* 1. Note that the Remix `<Meta />` component was imported. */
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import './tailwind.css'
import type { MetaFunction } from '@remix-run/node'

/* 2. Note that a `meta` function was exported, with a return value that is an array of objects where each object represents a `<meta>` element to add as a child of the `<head>` element, wherever the `<Meta />` component is placed. The object's key-value pairs represent the attribute-value pairs of the HTML element. */
export const meta: MetaFunction = () => {
  return [{ title: 'Adding Metadata with meta' }]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* 3. Note that some `<meta>` tags were added as children of the `<head>` element without using the Remix `meta` function. */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 4. Note that the Remix `<Meta />` component was added as a child of the `<head>` element. */}
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
