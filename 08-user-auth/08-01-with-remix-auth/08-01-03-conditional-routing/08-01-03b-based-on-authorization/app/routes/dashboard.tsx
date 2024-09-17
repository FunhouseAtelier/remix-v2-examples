import type { LoaderFunctionArgs } from '@remix-run/node'

import { requireAuthentication } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Form } from '@remix-run/react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionUser } = await requireAuthentication({ request })
  return json({ sessionUser })
}

export default function Dashboard() {
  const { sessionUser } = useLoaderData<typeof loader>()

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authorization
      </h1>
      <h2 className="my-4 text-2xl">Dashboard</h2>
      <div className="my-6">
        <h3 className="my-2 text-xl">Your Email Address:</h3>
        <p className="my-2 text-lg">{sessionUser?.email}</p>
      </div>
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
