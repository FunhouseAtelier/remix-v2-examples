import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'

/* 1. Import the Remix Auth authenticator class, the session storage object, the `getSession` method, and the Remix `redirect` utility function. */
import { Authenticator } from 'remix-auth'
import { sessionStorage, getSession } from '~/services/session.server'

/* 2. Export an instance of the Remix Auth authenticator class constructed with the session storage object. */
export const auth = new Authenticator<SessionUser>(sessionStorage)

/* 3. Export a function to get the session data from the session storage object. */
export const getSessionData = async ({
  request,
}: {
  request: LoaderFunctionArgs['request']
}) => {
  const sessionUser = await auth.isAuthenticated(request)
  const session = await getSession(request.headers.get('Cookie'))
  const sessionError = session.get(auth.sessionErrorKey)
  return { sessionUser, sessionError }
}

export interface SessionUser {
  email: string
}
