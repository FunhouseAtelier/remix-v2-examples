import type { LoaderFunctionArgs } from '@remix-run/node'

/* 1. Import the server function to require authorized status and the Remix `json` utility function. */
import { requireAuthorization } from '~/services/auth.server'
import { json } from '@remix-run/node'

/* 2. Export a `loader` function that checks the authorization status. */
export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuthorization({ request, role: 'admin' })
  return json({})
}

/* 3. Export, as the default, a React function component that indicates it is a page viewable only by an admin. */
export default function AdminOnly() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authorization
      </h1>
      <h2 className="my-4 text-2xl">Admin Only Page</h2>
    </main>
  )
}
