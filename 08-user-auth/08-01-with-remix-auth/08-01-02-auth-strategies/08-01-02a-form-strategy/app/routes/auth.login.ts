import type { ActionFunctionArgs } from '@remix-run/node'

import { login } from '~/services/auth.server'
import { json } from '@remix-run/node'

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
