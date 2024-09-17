import type { LoaderFunctionArgs } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { sessionStorage, getSession } from '~/services/session.server'

/* 1. Import the Remix Auth authentication error class and the form strategy class. */
import { AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'

export const auth = new Authenticator<SessionUser>(sessionStorage)

/* 2. Instantiate the form strategy with logic that determines if the credentials are valid, then returns the user data to be stored in the session object. */
const formStrategy = new FormStrategy(async ({ form }) => {
  const { email, password } = Object.fromEntries(form)

  if (!email || typeof email !== 'string') {
    throw new AuthorizationError('Please enter an email address.')
  }
  if (!password || typeof password !== 'string') {
    throw new AuthorizationError('Please enter a password.')
  }
  if (!email.includes('@example.com') || password !== 'abc123') {
    throw new AuthorizationError(
      'That email and password combination is invalid.'
    )
  }
  return { email }
})

/* 3. Configure the authenticator instance to use the form strategy. */
auth.use(formStrategy, 'form')

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
