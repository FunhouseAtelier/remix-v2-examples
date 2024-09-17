import type { LoaderFunctionArgs } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { sessionStorage, getSession } from '~/services/session.server'

/* 1. Import the Discord strategy class. */
import { DiscordStrategy } from 'remix-auth-discord'

export const auth = new Authenticator<SessionUser>(sessionStorage)

/* 2. Instantiate the Discord strategy with the required options and a function that returns the user data to be stored in the session object. */
const discordStrategy = new DiscordStrategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    callbackURL: 'http://localhost:5173/auth/discord/callback',
    scope: ['identify', 'email', 'guilds'],
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return { email: profile.__json.email as string }
  }
)

/* 3. Configure the authenticator instance to use the Discord strategy. */
auth.use(discordStrategy, 'discord')

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
