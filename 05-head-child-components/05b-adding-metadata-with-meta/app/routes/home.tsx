import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

/* 1. Export a `meta` function including data to create a new meta element with only a description. */
export const meta: MetaFunction = () => {
  return [{ title: 'Home' }, { description: 'This is a stubbed-out home page' }]
}

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-3xl">Welcome to the home page</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-800 hover:underline" to="/demo">
          Navigate to /demo
        </Link>
      </div>
    </main>
  )
}
