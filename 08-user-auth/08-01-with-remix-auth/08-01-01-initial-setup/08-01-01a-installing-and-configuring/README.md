# 08-01-01a. Installing and Configuring Remix Auth

## Starting Point

1. Replicate the result from **01a. Installing and Running Remix v2 With `npx`**.

## Process

### In the project root folder

1. Enter the terminal command to install the Remix Auth package.

```bash
npm i remix-auth
```

### Create `.env`

1. Add an entry for the `SESSION_SECRET` environment variable and assign it a random value.

```bash
SESSION_SECRET="9ecb5b17b6ba82aaa6d80f798f7b1efdbf1dbddd53b5d15ec7732e70e5f6bb07"
```

### Create `app/services/session.server.ts`

1. Import the Remix `createCookieSessionStorage` utility function.

```ts
import { createCookieSessionStorage } from '@remix-run/node'
```

2. Export a session storage object that is the return value of `createCookieSessionStorage()`, with the cookie options passed as an argument.

```ts
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
```

3. Export the session functions destructured from the session storage object.

```ts
export const { getSession, commitSession, destroySession } = sessionStorage
```

### Create `app/services/auth.server.ts`

1. Import the Remix Auth authenticator class, the session storage object, the `getSession` method, and the Remix `redirect` utility function.

```ts
import { Authenticator } from 'remix-auth'
import { sessionStorage, getSession } from '~/services/session.server'
```

2. Export an instance of the Remix Auth authenticator class constructed with the session storage object.

```ts
export const auth = new Authenticator<SessionUser>(sessionStorage)
```

3. Export a function to get the session data from the session storage object.

```ts
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
```

4. Export a function to log the user in, according to the specified strategy, then if successful redirect to the specified route, otherwise redirect to a publicly accessible route.

```ts
export const login = async ({
  strategy,
  request,
  redirectTo,
}: {
  strategy: string
  request: ActionFunctionArgs['request']
  redirectTo: string
}) => {
  await auth.authenticate(strategy, request)
  throw redirect(redirectTo)
}
```

5. Export a function to log the user out and redirect to a publicly accessible route.

```ts
export const logout = async ({
  request,
  redirectTo,
}: {
  request: ActionFunctionArgs['request']
  redirectTo: string
}) => {
  await auth.logout(request, { redirectTo })
}
```

### Create `app/routes/auth.login.ts`

1. Import the server function that handles authentication and the Remix `json` utility function.

```ts
import { login } from '~/services/auth.server'
import { json } from '@remix-run/node'
```

2. Export an `action` function that extracts from the URL search params the specified strategy and route to redirect to if authentication is successful, then calls the server function to handle authentication. If either of the search params are invalid, throw a "400 Bad Request" response.

```ts
export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const { strategy, successRedirect } = Object.fromEntries(url.searchParams)

  if (!strategy || typeof strategy !== 'string') {
    throw json(null, {
      status: 400,
      statusText: `Missing strategy.`,
    })
  }
  if (!successRedirect || typeof successRedirect !== 'string') {
    throw json(null, {
      status: 400,
      statusText: `Missing successRedirect.`,
    })
  }

  await login({ strategy, request, successRedirect })
}
```

### Create `app/routes/auth.logout.ts`

1. Import the server function that handles ending the session.

```ts
import { logout } from '~/services/auth.server'
```

2. Export an `action` function that calls the server function to end the session.

```ts
export const action = async ({ request }: ActionFunctionArgs) => {
  await logout({ request })
}
```

### Edit `app/routes/_index.tsx`

1. Import the server function that will get the session data, the Remix `json` utility function and `useLoaderData` hook.

```tsx
import { getSessionData } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
```

2. Export a `loader` function that calls the server function to get the session data and exposes that data to the client.

```tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionUser, sessionError } = await getSessionData({ request })
  return json({ sessionUser, sessionError })
}
```

3. In the React function component assign the session data to variables, using the return value of `useLoaderData()`.

```tsx
const { sessionUser, sessionError } = useLoaderData<typeof loader>()
```

4. Create a view that will be rendered if the user is logged in.

```tsx
const loggedInView = sessionUser && (
  <>
    <h2>You are logged in</h2>
    <div>
      <h3>Your Email Address:</h3>
      <p>{sessionUser.email}</p>
    </div>
  </>
)
```

5. Create a view that will be rendered if the user is not logged in.

```tsx
const notLoggedInView = !sessionUser && (
  <>
    <h2>You are not logged in</h2>
  </>
)
```

6. Conditionally render the appropriate view, based on whether session data exists for the user.

```tsx
{
  sessionUser ? loggedInView : notLoggedInView
}
```

## Notes

- To generate a random number comparable to the one used in the `.env.example` file, use the bash terminal command `openssl rand -hex 32`. Remember to create your own `.env` file to store your secret in; do not store it in the `.env.example` file.

- In the cookie options passed to `createCookieSessionStorage`, the `name` can be whatever you want, and you can change the name of the environment variable if you want, but it is recommended to leave all other settings as they are.

- The `<SessionUser>` generic type used for the authenticator instance should match the shape of the user data that will be stored in the session object.

- Conditional rendering is used in this example and those for the auth strategies for simple demonstration purposes, but it may be preferable to prohibit access to entire routes based on auth status. Many frameworks handle this with middleware, but the Remix convention is to handle it in a loader function, and that technique is covered in **08-01-03. Conditional Routing**.

## Expected Behavior

- Remix Auth will be installed and enabled to store session data in a cookie for each user agent that makes a request to your app, and that session can be controlled by importing the `auth` authenticator instance exported from `app/services/auth.server.ts`, however this cannot be done until adding at least one authentication strategy, covered in the following examples.

## Docs References

[GitHub: sergiodxa/remix-auth](https://github.com/sergiodxa/remix-auth)
