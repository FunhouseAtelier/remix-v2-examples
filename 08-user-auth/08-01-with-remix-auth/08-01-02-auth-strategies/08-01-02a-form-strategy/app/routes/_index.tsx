import type { LoaderFunctionArgs } from '@remix-run/node'
import { getSessionData } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

/*  */
import { Form } from '@remix-run/react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionUser, sessionError } = await getSessionData({ request })
  return json({ sessionUser, sessionError })
}

export default function Index() {
  const { sessionUser, sessionError } = useLoaderData<typeof loader>()

  const loggedInView = sessionUser && (
    <>
      <h2 className="my-4 text-2xl">You are logged in</h2>
      <div className="my-6">
        <h3 className="my-2 text-xl">Your Email Address:</h3>
        <p className="my-2 text-lg">{sessionUser.email}</p>
      </div>
      {/* 2. Modify the logged in view to include a form that will navigate to the `/auth/logout` route to end the session. */}
      <Form method="post" action="/auth/logout" className="my-6">
        <button
          type="submit"
          className="text-lg py-1 px-2 bg-violet-400 rounded-lg"
        >
          Log Out
        </button>
      </Form>
    </>
  )

  /*  */
  const notLoggedInView = !sessionUser && (
    <>
      <h2 className="my-4 text-2xl">Log In Form</h2>
      {/* 3. Modify the "not logged in" view to include a form that will submit the provided credentials to the `/auth/login` route, along with URL search parameters to indicate that the form strategy is being used and if authentication is successful then redirect to the `/` root route. If there is a session error message that indicates why the last authentication attempt failed, display it below the submit button. */}
      <Form
        method="post"
        action="auth/login?strategy=form&successRedirect=/"
        className="my-6 block"
      >
        <div className="my-4">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="my-2 block w-1/2 border-2 border-solid border-teal-500 rounded-lg py-1 px-2"
          />
        </div>
        <div className="my-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="my-2 block w-1/2 border-2 border-solid border-teal-500 rounded-lg py-1 px-2"
          />
        </div>
        <button
          type="submit"
          className="my-4 text-lg py-1 px-2 bg-violet-400 rounded-lg"
        >
          Log In
        </button>
        <div className="h-6">{sessionError?.message ?? null}</div>
      </Form>
    </>
  )

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">Remix Auth Form Strategy</h1>
      {sessionUser ? loggedInView : notLoggedInView}
    </main>
  )
}
