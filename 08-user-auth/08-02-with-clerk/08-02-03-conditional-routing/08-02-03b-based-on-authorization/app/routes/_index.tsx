import { Link } from '@remix-run/react'
import { SignOutButton } from '@clerk/remix'

export default function Index() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authorization
      </h1>
      <Link
        className="my-4 block text-xl text-blue-500 hover:underline"
        to="/sign-up"
      >
        Navigate to /sign-up
      </Link>
      <Link
        className="my-4 block text-xl text-blue-500 hover:underline"
        to="/sign-in"
      >
        Navigate to /sign-in
      </Link>
      <Link
        className="my-4 block text-xl text-blue-500 hover:underline"
        to="/admin-only"
      >
        Navigate to /admin-only
      </Link>
      <SignOutButton>
        <button className="my-4 block text-lg py-1 px-2 bg-violet-400 rounded-lg">
          LOG OUT
        </button>
      </SignOutButton>
    </main>
  )
}
