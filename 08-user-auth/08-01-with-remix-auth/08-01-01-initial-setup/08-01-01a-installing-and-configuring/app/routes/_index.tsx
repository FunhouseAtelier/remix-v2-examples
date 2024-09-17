import type { LoaderFunctionArgs } from '@remix-run/node'

/* 1. Import the server function that will get the session data, the Remix `json` utility function and `useLoaderData` hook. */
import { getSessionData } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

/* 2. Export a `loader` function that calls the server function to get the session data and exposes that data to the client. */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionUser, sessionError } = await getSessionData({ request })
  return json({ sessionUser, sessionError })
}

export default function Index() {
  /* 3. In the React function component assign the session data to variables, using the return value of `useLoaderData()`. */
  const { sessionUser, sessionError } = useLoaderData<typeof loader>()

  /* 4. Create a view that will be rendered if the user is logged in. */
  const loggedInView = sessionUser && (
    <>
      <h2 className="my-4 text-2xl">You are logged in</h2>
      <div className="my-6">
        <h3 className="my-2 text-xl">Your Email Address:</h3>
        <p className="my-2 text-lg">{sessionUser.email}</p>
      </div>
    </>
  )

  /* 5. Create a view that will be rendered if the user is not logged in. */
  const notLoggedInView = !sessionUser && (
    <>
      <h2 className="my-4 text-2xl">You are not logged in</h2>
    </>
  )

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">Installing and Configuring Remix Auth</h1>
      {/* 6. Conditionally render the appropriate view, based on whether session data exists for the user. */}
      {sessionUser ? loggedInView : notLoggedInView}
    </main>
  )
}
