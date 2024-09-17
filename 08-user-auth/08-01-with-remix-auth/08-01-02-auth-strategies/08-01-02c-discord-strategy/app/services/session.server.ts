/* 1. Import the Remix `createCookieSessionStorage` utility function. */
import { createCookieSessionStorage } from '@remix-run/node'

/* 2. Export a session storage object that is the return value of `createCookieSessionStorage()`, with the cookie options passed as an argument. */
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'remix_auth_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET as string],
    secure: process.env.NODE_ENV === 'production',
  },
})

/* 3. Export the session functions destructured from the session storage object. */
export const { getSession, commitSession, destroySession } = sessionStorage
