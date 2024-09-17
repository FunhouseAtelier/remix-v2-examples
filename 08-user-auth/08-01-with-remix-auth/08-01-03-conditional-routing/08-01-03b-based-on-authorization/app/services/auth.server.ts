import type { LoaderFunctionArgs } from '@remix-run/node'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { sessionStorage, getSession } from '~/services/session.server'
import { FormStrategy } from 'remix-auth-form'
import { redirect } from '@remix-run/node'

/* 1. Import the Remix `json` utility function. */
import { json } from '@remix-run/node'

export const auth = new Authenticator<SessionUser>(sessionStorage)

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

export const requireAuthentication = async ({
  request,
  isReverseLogic,
}: {
  request: LoaderFunctionArgs['request']
  isReverseLogic?: boolean
}) => {
  const { sessionUser, sessionError } = await getSessionData({ request })
  if (!sessionUser && !isReverseLogic) {
    throw redirect('/login')
  }
  if (sessionUser && isReverseLogic) {
    throw redirect('/dashboard')
  }
  return { sessionUser, sessionError }
}

/* 2. Export a function that checks the user's roles and throws a "403 Forbidden" response is the user does not have the necessary role. */
export const requireAuthorization = async ({
  request,
  role,
}: {
  request: LoaderFunctionArgs['request']
  role: string
}) => {
  const { sessionUser, sessionError } = await getSessionData({ request })
  const roles = []
  if (sessionUser?.email === 'admin@example.com') {
    roles.push('admin')
  }
  if (!roles.includes(role)) {
    throw json(null, {
      status: 403,
      statusText: 'You are not permitted to view this content',
    })
  }
  return { sessionUser, sessionError }
}

export interface SessionUser {
  email: string
}
