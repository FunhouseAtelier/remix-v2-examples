import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

/* 1. Export a `meta` function including data to create a new meta element with only a description. */
export const meta: MetaFunction = () => {
  return [{ description: 'This is a demonstration page' }]
}

export default function Demo() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Adding Metadata with meta (demo)</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-800 hover:underline" to="/home">
          Navigate to /home
        </Link>
      </div>
    </main>
  )
}
