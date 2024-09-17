import type { LoaderFunctionArgs } from '@remix-run/node'

import { requireAuthentication } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Form } from '@remix-run/react'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionError } = await requireAuthentication({
    request,
    isReverseLogic: true,
  })
  return json({ sessionError })
}

export default function Login() {
  const { sessionError } = useLoaderData<typeof loader>()

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authorization
      </h1>
      <h2 className="my-4 text-2xl">Log In</h2>
      <Form method="post" action="/auth/form/login" className="my-6 block">
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
    </main>
  )
}
