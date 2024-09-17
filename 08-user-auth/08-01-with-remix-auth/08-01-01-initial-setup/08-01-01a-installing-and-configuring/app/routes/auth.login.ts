import type { ActionFunctionArgs } from '@remix-run/node'

/* 1. Import the server function that handles authentication and the Remix `json` utility function. */
import { login } from '~/services/auth.server'
import { json } from '@remix-run/node'

/* 2. Export an `action` function that extracts from the URL search params the specified strategy and route to redirect to if authentication is successful, then calls the server function to handle authentication. If either of the search params are invalid, throw a "400 Bad Request" response. */
export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const { strategy, successRedirect } = Object.fromEntries(url.searchParams)

  if (!strategy || typeof strategy !== 'string') {
    throw json(null, {
      status: 400,
      statusText: `Missing strategy.`,
    })
  }
  if (!successRedirect || typeof successRedirect !== 'string') {
    throw json(null, {
      status: 400,
      statusText: `Missing successRedirect.`,
    })
  }

  await login({ strategy, request, successRedirect })
}
