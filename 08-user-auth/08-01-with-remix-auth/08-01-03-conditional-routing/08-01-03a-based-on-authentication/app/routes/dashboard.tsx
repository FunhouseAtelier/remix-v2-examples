import type { LoaderFunctionArgs } from '@remix-run/node'

/* 1. Import the server function to require authenticated status, the Remix `json` utility function, `useLoaderData` hook, and `<Form>` component. */
import { requireAuthentication } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Form } from '@remix-run/react'

/* 2. Export a `loader` function that checks the authentication status (redirects if the user is _not_ authenticated) and if not redirected expose the session user to the client. */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionUser } = await requireAuthentication({ request })
  return json({ sessionUser })
}

export default function Dashboard() {
  /* 3. Assign the session user to a variable by destructuring the return value of `useLoaderData()`. */
  const { sessionUser } = useLoaderData<typeof loader>()

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authentication
      </h1>
      <h2 className="my-4 text-2xl">Dashboard</h2>
      <div className="my-6">
        <h3 className="my-2 text-xl">Your Email Address:</h3>
        <p className="my-2 text-lg">{sessionUser?.email}</p>
      </div>
      {/* 4. Copy the "Log Out" form from `app/routes/_index.tsx` into the TSX return value to be rendered. */}
      <Form method="post" action="/auth/logout" className="my-6">
        <button
          type="submit"
          className="text-lg py-1 px-2 bg-violet-400 rounded-lg"
        >
          Log Out
        </button>
      </Form>
    </main>
  )
}
