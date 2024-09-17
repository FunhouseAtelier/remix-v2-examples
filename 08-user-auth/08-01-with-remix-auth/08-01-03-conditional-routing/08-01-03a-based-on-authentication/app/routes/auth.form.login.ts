import type { ActionFunctionArgs } from '@remix-run/node'

import { auth } from '~/services/auth.server'

/* 1. Change the redirect locations after authentication to the login page, to reflect standard web app behavior. */
export const action = async ({ request }: ActionFunctionArgs) => {
  await auth.authenticate('form', request, {
    /*  */
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
