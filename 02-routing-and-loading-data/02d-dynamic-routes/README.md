# 02d. Dynamic Routes

## Starting Point

1. Replicate the result from **02a. `loader` and `redirect` Functions**.

## Process

### Create `app/routes/demo._index.tsx`

1. Export, as the default, a React function component that will be rendered in place of the `<Outlet />` component when navigating to the `/demo` route.

```tsx
export default function Index() {
  return (
    <>
      <h3 className="text-xl">Welcome to the Dynamic Routes demo</h3>
      {/* additional content */}
    </>
  )
}
```

### Create `app/routes/demo.$userId.tsx`

1. Import the type declaration for the `loader` function arguments.

```tsx
import type { LoaderFunctionArgs } from '@remix-run/node'
```

2. Import the Remix `json` utility function.

```tsx
import { json } from '@remix-run/node'
```

3. Import the Remix `useLoaderData` hook.

```tsx
import { useLoaderData } from '@remix-run/react'
```

4. Import a server function that will get the data.

```tsx
import { getUser } from '~/services/mock-data.server'
```

5. Export a `loader` asynchronous function that will fetch the data from the server, based on the `userId` in the URL, then expose that data to the client.

```tsx
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params
  /* If no userId was found in the URL params, send a "400 Bad Request" response to the client. */
  if (!userId) {
    throw json(null, {
      status: 400,
      statusText: 'Missing userId param',
    })
  }
  const user = await getUser(userId)
  /* If no user data is returned by `getUser()`, send a "404 Not Found" response to the client. */
  if (!user) {
    throw json(null, {
      status: 404,
      statusText: 'User not found',
    })
  }
  /* Otherwise, expose the user data to the client. */
  return json({ user })
}
```

6. Export, as the default, a React function component that will be rendered in place of the `<Outlet />` component when navigating to the `/demo/<ANY_VALID_STRING>` route.

```tsx
export default function MessageHistory() {
  return (
    <>
      <h3 className="text-xl">Message History</h3>
      {/* additional content */}
    </>
  )
}
```

5. In the React function component assign the data exposed by the `loader` function to a varible with the `useLoaderData` hook.

```tsx
const { user } = useLoaderData<typeof loader>()
```

### Edit `app/routes/demo.tsx`

1. Import the Remix `<Link>` and `<Outlet />` components.

2. Use the `<Link>` component to perform client-side routing to the nested dynamic routes.

```tsx
<Link to="/demo/1">Bluebie B.</Link>
<Link to="/demo/2">Carrot McCaw</Link>
<Link to="/demo/3">Hoot Spotter</Link>
```

3. Add the `<Outlet />` component to the TSX return value where the nested routes will appear.

```tsx
<Outlet />
```

## Notes

- If the name of a route segment starts with `$` (dollar sign), that route segment is dynamically addressed, meaning any valid (for a URL) text in that place will match the route.

- The `getUser` function simulates the behavior of the web server querying an external database to get the data, using the hard-coded mock data in `app/services/mock-data.ts` for demonstration.

- The `json` utility function abbreviates the syntax required to send a response to the client with some data, or `null` if there is no relevant data to send, as the first argment passed, and this value will be automatically serialized. Optionally a second argument may be passed with some status information and/or headers defined in an object.

- The `loader` function is expected to redirect to another route, throw a response, or return a response with some data. If the `loader` function returns `undefined` or some other value that cannot be parsed as an HTTP response, an error will be thrown.

- In this example the `json()` responses for "400 Bad Request" and "404 Not Found" are thrown to prevent the React function component from rendering, which would cause a TypeError because `user` cannot be destructured from the `null` data response. Using `throw` when an error occurs in a `loader` function also has the advantage of breaking out of any call stack, such as when being executed inside of a nested function.

## Expected Behavior

- When navigating to the `/demo/4` route the browser's address bar should show `<BASE_URL>/demo/4` and a "404 Not Found" error message will be displayed because there is no user with an id of "4". By design it should normally not be possible to reach that route via the UI controls, only by typing it into the browser address bar.

- Clicking any link in the left sidebar will navigate the browser to `<BASE_URL>/demo/<USER_ID>` and the "Message History" should show an example matching the record for that user.

- If the request was sent in a hacky way, such that the dynamic `$userId` segment of the URL is missing or is not a string, a "400 Bad Request" error page will be shown.

## Remix Docs References

[Remix Tutorial: The Contact Route UI](https://remix.run/docs/en/main/start/tutorial#the-contact-route-ui)

[Remix Tutorial: Loading Data](https://remix.run/docs/en/main/start/tutorial#loading-data)

[Remix Tutorial: URL Params in Loaders](https://remix.run/docs/en/main/start/tutorial#url-params-in-loaders)

[Remix Tutorial: Validating Params and Throwing Responses](https://remix.run/docs/en/main/start/tutorial#validating-params-and-throwing-responses)
