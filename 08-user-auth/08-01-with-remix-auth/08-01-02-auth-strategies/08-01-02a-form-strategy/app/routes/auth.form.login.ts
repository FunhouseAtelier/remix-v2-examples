import type { ActionFunctionArgs } from '@remix-run/node'

/* 1. Import the Remix Auth authenticator instance. */
import { auth } from '~/services/auth.server'

/* 2. Export an `action` function that calls the `.authenticate()` method of the authenticator instance. */
export const action = async ({ request }: ActionFunctionArgs) => {
  await auth.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/',
  })
}
