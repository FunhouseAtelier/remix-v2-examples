import type { LoaderFunctionArgs } from '@remix-run/node'
import { getSessionData } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

/* 1. Import the Remix `<Form />` component. */
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
      {/* 2. Modify the "logged in" view to include a form that will navigate to the `/auth/logout` route to end the session. */}
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

  const notLoggedInView = !sessionUser && (
    <>
      <h2 className="my-4 text-2xl">Log In Form</h2>
      {/* 3. Modify the "not logged in" view to include a form that will navigate to the `/auth/github/login` route. If there is a session error message that indicates why the last authentication attempt failed, display it below the submit button. */}
      <Form method="post" action="/auth/github/login" className="my-6 block">
        <button
          type="submit"
          className="my-4 text-lg py-1 px-2 bg-violet-400 rounded-lg"
        >
          Log In With GitHub
        </button>
        <div className="h-6">{sessionError?.message ?? null}</div>
      </Form>
    </>
  )

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">Remix Auth GitHub Strategy</h1>
      {sessionUser ? loggedInView : notLoggedInView}
    </main>
  )
}
