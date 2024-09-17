import type { LoaderFunctionArgs } from '@remix-run/node'

/* 1. Import the Remix Auth authenticator instance. */
import { auth } from '~/services/auth.server'

/* 2. Export a `loader` function that calls the `.authenticate()` method of the authenticator instance. */
export async function loader({ request }: LoaderFunctionArgs) {
  return auth.authenticate('discord', request, {
    successRedirect: '/',
    failureRedirect: '/',
  })
}
