import type { ActionFunctionArgs } from '@remix-run/node'

import { auth } from '~/services/auth.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  /* 1. Change the redirect locations after authentication to the login page, to reflect standard web app behavior. */
  await auth.logout(request, { redirectTo: '/login' })
}
