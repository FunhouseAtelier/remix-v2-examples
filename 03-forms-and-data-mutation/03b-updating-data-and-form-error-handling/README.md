# 03b. Updating Data and Form Error Handling

## Process

### Starting Point

1. Replicate the result from **02a. `loader` and `redirect` Functions**.

===

### Edit `app/routes/demo.tsx`

1. Import the Remix `json` utility function, `<Form>` component, and `useLoaderData` hook.

```tsx
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
```

2. Import the server functions to load all list items and create a new list item.

```tsx
import { getAllListItems, createListItem } from '~/services/mock-data.server'
```

3. Export a `loader` function that gets all of the list items and exposes that data to the client.

```tsx
export const loader = async () => {
  const allListItems = await getAllListItems()
  return json({ allListItems })
}
```

4. Export an `action` function that creates a new list item and exposes the data for that new item to the client.

```tsx
export const action = async () => {
  const newListItem = await createListItem()
  return json({ newListItem })
}
```

5. In the React function component assign the data exposed by the `loader` function to a varible with the `useLoaderData` hook.

```tsx
const { allListItems } = useLoaderData<typeof loader>()
```

6. In the TSX return value of the React function component include a Remix `<Form>` component with a `method` prop value of `post`, and inside the `<Form>` component add a `<button>` element with a `type` attribute value of `submit`.

```tsx
<Form method="post">
  <button type="submit">ADD NEW ITEM</button>
</Form>
```

## Notes

- The `getAllListItems` and `createListItem` functions simulate the behavior of the web server transacting with an external database, using the hard-coded mock data in `app/services/mock-data.ts` for demonstration.

- The `json` utility function abbreviates the syntax required to send a "200 Success" response to the client with the data, but that can also be done from scratch.

- Just like the `loader` function, the `action` function runs only on the server. The `loader` function is called whenever a GET request is made to the route, whereas the `action` function is called whenever a POST request is made to the route. In this example the POST request is made whenever the `<Form>` component has a submit event, because the `method` prop value is `"post"` and the `action` prop is not used, so it defaults to the current route.

- With JavaScript enabled, the `<Form>` component makes the POST request via AJAX, so the behavior is similar to client-side routing, rather than the native HTML `<form>` element behavior that is similar to server-side routing.

- After the `action` function finishes, the `loader` function will automatically run again to update the list with the newly created item, so no additional code is needed to revalidate the data that is exposed to the client after making a POST request.

## Expected Behavior

- Clicking the "ADD NEW ITEM" button will add a new generic item to the list, both in the server-side data set and in the data exposed to the client.

- Because the database transaction is being simulated by `app/services/mock-data.server.ts` the list will be cleared when stopping the web server.

## Remix Docs References

[Remix Tutorial: Creating Contacts](https://remix.run/docs/en/main/start/tutorial#creating-contacts)
