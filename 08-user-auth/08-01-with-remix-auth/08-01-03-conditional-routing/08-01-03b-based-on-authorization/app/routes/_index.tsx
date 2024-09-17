import { Link } from '@remix-run/react'

export default function Index() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authorization
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
      <Link
        className="my-4 block text-xl text-blue-500 hover:underline"
        to="/god-mode"
      >
        Navigate to /god-mode
      </Link>
    </main>
  )
}
