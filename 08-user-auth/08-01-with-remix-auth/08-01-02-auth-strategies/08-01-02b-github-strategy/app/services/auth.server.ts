import type { LoaderFunctionArgs } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { sessionStorage, getSession } from '~/services/session.server'

/* 1. Import the GitHub strategy class. */
import { GitHubStrategy } from 'remix-auth-github'

export const auth = new Authenticator<SessionUser>(sessionStorage)

/* 2. Instantiate the GitHub strategy with the required options and a function that returns the user data to be stored in the session object. */
const gitHubStrategy = new GitHubStrategy(
  {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    redirectURI: 'http://localhost:5173/auth/github/callback',
  },
  async ({ profile, tokens, request, context }) => {
    return { email: profile.emails[0].value }
  }
)

/* 3. Configure the authenticator instance to use the GitHub strategy. */
auth.use(gitHubStrategy, 'github')

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
