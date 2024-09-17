# 08-01-03a. Conditional Routing Based on Authentication

## Starting Point

1. Replicate the result from **08-01-02a. Remix Auth Form Strategy**.

## Process

### Edit `app/services/auth.server.ts`

1. Export a function that checks authentication status and redirects to a route if that status does not meet the requirement, otherwise it returns the session data.

```ts
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
```

### Create `app/routes/login.tsx`

1. Import the server function to require authenticated status, the Remix `json` utility function, `useLoaderData` hook, and `<Form>` component.

```tsx
import { requireAuthentication } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Form } from '@remix-run/react'
```

2. Export a `loader` function that checks the authentication status with reverse logic (redirects if the user _is_ authenticated) and if not redirected expose the session error, if any, to the client.

```tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionError } = await requireAuthentication({
    request,
    isReverseLogic: true,
  })
  return json({ sessionError })
}
```

3. Assign the session error to a variable by destructuring the return value of `useLoaderData()`.

```tsx
const { sessionError } = useLoaderData<typeof loader>()
```

4. Copy the "Log In" form from `app/routes/_index.tsx` into the TSX return value to be rendered.

### Create `app/routes/dashboard.tsx`

1. Import the server function to require authenticated status, the Remix `json` utility function, `useLoaderData` hook, and `<Form>` component.

```tsx
import { requireAuthentication } from '~/services/auth.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Form } from '@remix-run/react'
```

2. Export a `loader` function that checks the authentication status (redirects if the user is _not_ authenticated) and if not redirected expose the session user to the client.

```tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { sessionUser } = await requireAuthentication({ request })
  return json({ sessionUser })
}
```

3. Assign the session user to a variable by destructuring the return value of `useLoaderData()`.

```tsx
const { sessionUser } = useLoaderData<typeof loader>()
```

4. Copy the "Log Out" form from `app/routes/_index.tsx` into the TSX return value to be rendered.

### Edit `app/routes/auth.logout.tsx`

1. Change the redirect location after logout to the login page, to reflect standard web app behavior.

```ts
await auth.logout(request, { redirectTo: '/login' })
```

### Edit `app/routes/auth.form.login.tsx`

1. Change the redirect locations after authentication to the login page, to reflect standard web app behavior.

```ts
export const action = async ({ request }: ActionFunctionArgs) => {
  await auth.authenticate('form', request, {
    /*  */
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
```

### Edit `app/routes/_index.tsx`

1. Remove all imports except for the Remix `<Link>` component.

2. Remove all of the returned TSX except the main element and first heading, then add links to the `/login` and `/dashboard` routes for testing.

```tsx
<Link to="/login">
  Navigate to /login
</Link>
<Link to="/dashboard">
  Navigate to /dashboard
</Link>
```

## Notes

- The Remix Auth Form Strategy is used in this example, but any strategy could be used in a similar way.

- The current Remix convention is to apply authentication checks to each route that might cause a redirect depending on authentication status. The Remix development team is currently working on implementing middleware functionality so that auth checks can be done in one place for all routes.

## Expected Behavior

- The credentials needed to successfully log in are the same as in **08-01-02a. Remix Auth Form Strategy**

- When you are authenticated (i.e., logged in) navigating to the `/login` route will redirect to the `/dashboard` route.

- When you are not authenticated navigating to the `/dashboard` route will redirect to the `/login` route.

- After logging out you will be redirected to the `/login` page.

## Docs References

[GitHub: sergiodxa/remix-auth](https://github.com/sergiodxa/remix-auth)
