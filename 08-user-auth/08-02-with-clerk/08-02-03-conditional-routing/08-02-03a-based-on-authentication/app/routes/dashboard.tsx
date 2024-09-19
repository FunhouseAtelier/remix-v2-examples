import type { LoaderFunction } from '@remix-run/node'
import { UserButton } from '@clerk/remix'

/* 1. Import the Clerk `getAuth` utility function and the Remix `redirect` utility function. */
import { getAuth } from '@clerk/remix/ssr.server'
import { redirect } from '@remix-run/node'

/* 2. Export a `loader` function that checks the session for a userId to determine if the user is authenticated, and if not then redirects to the sign in route. */
export const loader: LoaderFunction = async (args) => {
  const { isSignedIn } = await getAuth(args)
  if (!isSignedIn) {
    throw redirect('/sign-in')
  }
  return {}
}

export default function SignInPage() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authentication
      </h1>
      <h2 className="my-4 text-2xl">Dashboard Page</h2>
      <UserButton
        appearance={{
          elements: {
            avatarBox: 'h-12 w-12',
          },
        }}
      />
    </main>
  )
}
