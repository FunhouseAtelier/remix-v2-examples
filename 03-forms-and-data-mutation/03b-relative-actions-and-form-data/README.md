# 03b. Relative Actions and Form Data

## Process

### Starting Point

1. Replicate the result from **03a. `<Form>` Component and `action` Function**.

### Create `app/routes/demo._index.tsx`

1. Import the Remix `redirect` utility function and `<Form>` component.

```tsx
import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
```

2. Import the server function to create a new list item.

```tsx
import { createListItem } from '~/services/mock-data.server'
```

3. Export a `loader` function that gets the ID of a new list item and uses it to redirect to the dynamic edit item route.

```tsx
export const action = async () => {
  const newListItemId = await createListItem()
  throw redirect(`/demo/${newListItemId}/edit`)
}
```

4. Export, as the default, a React function component that returns the `<Form>` component used to create a new list item.

```tsx
export default function Index() {
  return (
    <Form method="post">
      <button type="submit">ADD NEW ITEM</button>
    </Form>
  )
}
```

### Create `app/routes/demo.$listItemId.edit.tsx`

1. Import the type declarations for the `loader` and `action` function arguments.

```tsx
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
```

2. Import the Remix `json` and `redirect` utility functions, `<Form>` component, and `useLoaderData` hook.

```tsx
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
```

3. Import the server functions to get and update list item.

```tsx
import { getListItem, updateListItem } from '~/services/mock-data.server'
```

4. Export a `loader` function that uses the ID found in the dynamic route segment of the URL to get the data for that list item and expose it to the client. If no ID was found in the URL or no list item was returned by `getListItem()` throw an error response.

```tsx
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { listItemId } = params
  if (!listItemId) {
    throw json(null, {
      status: 400,
      statusText: 'Missing listItemId param',
    })
  }
  const listItem = await getListItem(listItemId)
  if (!listItem) {
    throw json(null, {
      status: 404,
      statusText: 'List item not found',
    })
  }
  return json({ listItem })
}
```

5. Export an `action` function that uses the form data to update the item with an ID that matches the dynamic segment in the URL then redirect to the `/demo` route to see the update and display the "ADD NEW ITEM" button again. If no ID was found in the URL throw an error response.

```tsx
export const action = async ({ params, request }: ActionFunctionArgs) => {
  const { listItemId } = params
  if (!listItemId) {
    throw json(null, {
      status: 400,
      statusText: 'Missing listItemId param',
    })
  }
  const formData = await request.formData()
  const listItemUpdate = Object.fromEntries(formData)
  await updateListItem(listItemId, listItemUpdate)
  throw redirect('/demo')
```

6. Export, as the default, a React function component that returns the `<Form>` component used to update a list item, and assigns the current list item data to the form at first render with the `useLoaderData` hook and the `defaultValue` prop.

```tsx
export default function Index() {
  const { listItem } = useLoaderData<typeof loader>()

  return (
    <Form method="post" className="my-4 flex gap-2 items-center">
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        name="description"
        defaultValue={listItem.description}
        placeholder="What is it called?"
        className="grow border-2 border-solid border-teal-500 rounded-lg py-1 px-2"
      />
      <button
        type="submit"
        className="text-lg py-1 px-2 bg-violet-400 rounded-lg"
      >
        SAVE
      </button>
    </Form>
  )
}
```

### Edit `app/routes/demo.tsx`

1. Remove the import for the Remix `useActionData` hook.

2. Remove the import for the server function that creates a new list item.

3. Import the Remix `<Output />` component.

4. Remove the `action` function.

5. Remove the assignment of data exposed by the `action` function.

6. Replace the form used to create a new list item, with the `<Outlet />` component.

7. Add a `<Form>` component to each list item, with an edit button of `type="submit"`,and set the `<Form>` prop `action` to match the relative edit item route.

```tsx
<Form action={`${item.id}/edit`}>
  <button type="submit">EDIT</button>
</Form>
```

## Notes

- Nested routes can be used to handle the flow of creating and updating data with a single-page app look and feel.

- Relative actions allow a Remix `<Form>` component to make a POST request to any other route, where the request will be handled by the `action` function at the other route.

- The route in the `action` attribute of the `<Form>` component should contain the route path relative to the route where the `<Form>` component is rendered, unlike when using the `redirect` utility function, where the path is always relative to the base URL of the app.

## Expected Behavior

- After navigating to the `/demo` route the current list of items on record in the mock data will be displayed along with the "ADD NEW ITEM" button.

- Clicking the "ADD NEW ITEM" button will create a new item and navigate to the nested route used to edit an item's description. This edit route takes the place of the default nested route that shows the "ADD NEW ITEM" button.

- Clicking the "SAVE" button on the edit item form will update the list item description and redirect back to the `/demo` route.

- Clicking the "EDIT" button next to any list item will navigate to the edit item route for that item.

## Remix Docs References

[Remix Tutorial: Updating Data](https://remix.run/docs/en/main/start/tutorial#updating-data)

[Remix Tutorial: Updating Contacts with FormData](https://remix.run/docs/en/main/start/tutorial#updating-contacts-with-formdata)

[Remix Tutorial: Mutation Discussion](https://remix.run/docs/en/main/start/tutorial#mutation-discussion)

[Remix Tutorial: Redirecting new records to the edit page](https://remix.run/docs/en/main/start/tutorial#redirecting-new-records-to-the-edit-page)
