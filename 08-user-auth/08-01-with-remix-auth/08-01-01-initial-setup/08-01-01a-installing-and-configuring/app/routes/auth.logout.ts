import type { ActionFunctionArgs } from '@remix-run/node'

/* 1. Import the Remix Auth authenticator function. */
import { auth } from '~/services/auth.server'

/* 2. Export an `action` function that calls the authenticator `.logout()` method to end the session. */
export const action = async ({ request }: ActionFunctionArgs) => {
  await auth.logout(request, { redirectTo: '/' })
}
