import type { LinksFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

/* 1. Import the `href` value of the home page stylesheet from the CSS file with `?url` appended at the end. */
import homeStylesHref from '~/styles/home.css?url'

/* 2. Export a `links` function that returns and array containing an object that represents the `<link>` element for the home page stylesheet. */
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: homeStylesHref },
]

/* 3. Export, as the default, a React function component to render the home page. */
export default function Home() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Welcome to the home page</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-800 hover:underline" to="/demo">
          Navigate to /demo
        </Link>
      </div>
    </main>
  )
}
