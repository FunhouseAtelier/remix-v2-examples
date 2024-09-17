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

/* 4. Export a function to log the user in, according to the specified strategy, then if successful redirect to the specified route, otherwise redirect to a publicly accessible route. */
export const login = async ({
  strategy,
  request,
  successRedirect,
}: {
  strategy: string
  request: ActionFunctionArgs['request']
  successRedirect: string
}) => {
  await auth.authenticate(strategy, request, {
    successRedirect,
    failureRedirect: '/',
  })
}

/* 5. Export a function to log the user out and redirect to a publicly accessible route. */
export const logout = async ({
  request,
}: {
  request: ActionFunctionArgs['request']
}) => {
  await auth.logout(request, { redirectTo: '/' })
}

export interface SessionUser {
  email: string
}
