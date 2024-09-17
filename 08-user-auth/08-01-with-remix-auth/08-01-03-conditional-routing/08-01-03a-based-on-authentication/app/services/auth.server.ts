import type { LoaderFunctionArgs } from '@remix-run/node'
import { Authenticator, AuthorizationError } from 'remix-auth'
import { sessionStorage, getSession } from '~/services/session.server'
import { FormStrategy } from 'remix-auth-form'

/*  */
import { redirect } from 'react-router'

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

/* 1. Export a function that checks authentication status and redirects to a route if that status does not meet the requirement, otherwise it returns the session data. */
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

export interface SessionUser {
  email: string
}
