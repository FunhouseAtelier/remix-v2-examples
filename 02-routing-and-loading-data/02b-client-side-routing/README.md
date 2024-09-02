# 02b. Client-side Routing

## Process

## Starting Point

1. Replicate the result from **02a. Loader and Redirect Functions**.

### `app/routes/demo.tsx`

1. Import the Remix `Link` component.

```tsx
import { Link } from '@remix-run/react'
```

2. Add an `<a>` element to the TSX return value where the server-side routing link will appear.

```tsx
<a href="/demo">Navigate to /demo (server-side routing)</a>
```

3. Add the `Link` component to the TSX return value where the client-side routing link will appear.

```tsx
<Link to="/demo">Navigate to /demo (client-side routing)</Link>
```

## Notes

- The `<Link>` component uses a `to` prop instead of `href`. It accepts any value that could be used for the `href` attribute of an `<a>` element. It also accepts a `Partial<Path>` object, which will be covered in a future example dedicated to the `<Link>` component.

- The `loader` function for the `/demo` route has a one-second delay to make the navigation dynamics easier to notice.

- When linking to an external resource, such as a page on a web site other than the web site for your app, by default Remix will make it open in a new broswer tab. If you want it to load in the same tab instead, include the attribute-value pair `target="_self"` in the `<a>` element or `<Link>` component.

## Expected Behavior

- Clicking the "Add List Item" button will add a new `<li>` element to the ordered list with the text of "list item".

- Clicking the "Navigate to /demo (server-side routing)" link will reload the `/demo` route server-side. This will clear the React state, causing any list items to disappear, because the `Demo` function component did not merely re-render, it was destroyed and replaced with a new `Demo` function component.

- Clicking the "Navigate to /demo (client-side routing)" link will reload the `/demo` route client-side. The page display will not change, but the navigation can be seen in the Network tab of the broswer devtools. This will preserve the React state and merely re-render the `Demo` function component after the `loader` function delay of 1 second. Although this preservation of state would not be useful when navigating away from the `/demo` route, thus destorying the `Demo` function component, it is useful when navigating to a child route nested in the `/demo` route. It can also useful for performance, if a `prefetch` prop is passed to the `<Link>` component, which will be covered in a future example dedicated to the `<Link>` component.

## Remix Docs References

[Remix Tutorial: Client Side Routing](https://remix.run/docs/en/main/start/tutorial#client-side-routing)
