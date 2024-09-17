/* 1. Remove all imports except for the Remix `<Link>` component. */
import { Link } from '@remix-run/react'

/* 2. Remove all of the returned TSX except the main element and first heading, then add links to the `/login` and `/dashboard` routes for testing. */
export default function Index() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authentication
      </h1>
      <Link
        className="my-4 block text-xl text-blue-500 hover:underline"
        to="/login"
      >
        Navigate to /login
      </Link>
      <Link
        className="my-4 block text-xl text-blue-500 hover:underline"
        to="/dashboard"
      >
        Navigate to /dashboard
      </Link>
    </main>
  )
}
