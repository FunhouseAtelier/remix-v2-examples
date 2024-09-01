import { Link } from '@remix-run/react'

export default function Demo() {
  return (
    <main className="p-4">
      <h1 className="text-3xl">Client-side Routing (demo)</h1>
      <div className="my-4">
        <a className="text-xl text-blue-500 hover:underline" href="/dashboard">
          /demo
        </a>
      </div>
      <div className="my-4">
        {/* 2. Add the `Link` component to the TSX return value where the link will appear. */}
        <Link className="text-xl text-blue-500 hover:underline" to="/dashboard">
          /dashboard (client-side routing)
        </Link>
      </div>
    </main>
  )
}
