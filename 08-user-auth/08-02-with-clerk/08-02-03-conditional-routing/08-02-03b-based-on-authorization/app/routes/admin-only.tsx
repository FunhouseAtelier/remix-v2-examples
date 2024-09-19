import type { LoaderFunctionArgs } from '@remix-run/node'

import { json } from '@remix-run/node'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({})
}

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
