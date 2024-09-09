/* 1. Import the type declarations for the `loader` and `action` function arguments. */
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
/* 2. Import the Remix `json` and `redirect` utility functions, `<Form>` component, and `useLoaderData` hook. */
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
/* 3. Import the server functions to get and update list item. */
import { getListItem, updateListItem } from '~/services/mock-data.server'

/* 4. Export a `loader` function that uses the ID found in the dynamic route segment of the URL to get the data for that list item and expose it to the client. If no ID was found in the URL or no list item was returned by `getListItem()` then throw an error response. */
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

/* 5. Export an `action` function that uses the form data to update the item with an ID that matches the dynamic segment in the URL then redirect to the `/demo` route to see the update and display the "ADD NEW ITEM" button again. If no ID was found in the URL throw an error response. */
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
}

/* 6. Export, as the default, a React function component that returns the `<Form>` component used to update a list item, and assigns the current list item data to the form at first render with the `useLoaderData` hook and the `defaultValue` prop. */
export default function EditListItem() {
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
