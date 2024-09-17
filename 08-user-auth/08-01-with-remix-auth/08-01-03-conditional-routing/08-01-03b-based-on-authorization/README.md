# 08-01-03b. Conditional Routing Based on Authorization

## Starting Point

1. Replicate the result from **08-01-02a. Remix Auth Form Strategy**.

## Process

### Edit `app/services/auth.server.ts`

1. Import the Remix `json` utility function.

```ts
import { json } from '@remix-run/node'
```

2. Export a function that checks the user's roles and throws a "403 Forbidden" response is the user does not have the necessary role.

```ts
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
```

### Create `app/routes/admin-only.tsx`

1. Import the server function to require authorized status and the Remix `json` utility function.

```tsx
import { requireAuthorization } from '~/services/auth.server'
import { json } from '@remix-run/node'
```

2. Export a `loader` function that checks the authorization status.

```tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireAuthorization({ request, role: 'admin' })
  return json({})
}
```

3. Export, as the default, a React function component that indicates it is a page viewable only by an admin.

```tsx
export default function AdminOnly() {
  return (
    <main>
      <h1>Conditional Routing Based on Authorization</h1>
      <h2>Admin Only Page</h2>
    </main>
  )
}
```

## Notes

- In practice a better user experience would be redirecting to another route or showing a friendlier message than the "403 Forbidden" response in this example.

- In this example there is only one role, `'admin'`, and it is hard-coded. In real applications there are multiple roles, and each user's roles would be ideally be stored in the session data.

- A similar method could be used to check whether a user has completed an onboarding flow yet, and if not redirect to an onboarding route. That can also be done automatically after sign in, using the Remix Auth authenticator's `.authentice()` method option for `successRedirect` or the `/auth/*/callback` route when using a 3rd party identity provider.

## Expected Behavior

- The credentials needed to successfully log in are the same as in **08-01-02a. Remix Auth Form Strategy**

- Attempting to visit the `/admin-only` route will result in a "$03 Forbidden" response unless the email used to authenticate is "admin@example.com".

## Docs References

[GitHub: sergiodxa/remix-auth](https://github.com/sergiodxa/remix-auth)
