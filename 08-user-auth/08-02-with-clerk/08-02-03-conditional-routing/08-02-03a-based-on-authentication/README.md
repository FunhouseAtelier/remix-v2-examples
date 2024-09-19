# 08-02-03a. Conditional Routing Based on Authentication

## Starting Point

1. Replicate the result from **08-02-02b. Authentication With Custom Pages**.

## Process

### Create `app/routes/dashboard.tsx`

1. Import the Clerk `getAuth` utility function and the Remix `redirect` utility function.

```tsx
import { getAuth } from '@clerk/remix/ssr.server'
import { redirect } from '@remix-run/node'
```

2. Export a `loader` function that checks the session to determine if the user is authenticated, and if not then redirects to the sign in route.

```tsx
export const loader: LoaderFunction = async (args) => {
  const { isSignedIn } = await getAuth(args)
  if (!isSignedIn) {
    throw redirect('/sign-in')
  }
  return {}
}
```

## Notes

## Expected Behavior

- When not authenticated, navigating to the `/dashboard` route will redirect to the `/sign-up` route.

- When authenticated, navigating to the `/dashbaord` route will display the dashboard page, including a user thumbnail button that will show the user's Clerk profile when clicked.

## Docs References

[Clerk Docs: Remix Quickstart: Server side](https://clerk.com/docs/quickstarts/remix#server-side)
