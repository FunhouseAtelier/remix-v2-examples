import type { ActionFunctionArgs } from '@remix-run/node'

/* 1. Import the server function that handles ending the session. */
import { logout } from '~/services/auth.server'

/* 2. Export an `action` function that calls the server function to end the session. */
export const action = async ({ request }: ActionFunctionArgs) => {
  await logout({ request })
}
