import type { ActionFunctionArgs } from '@remix-run/node'

import { auth } from '~/services/auth.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  await auth.authenticate('form', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
