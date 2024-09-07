/* 1. Import the Remix `json` utility function, `<Form>` component, `useActionData` and `useLoaderData` hooks. */
import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
/* 2. Import the server functions to load all list items and create a new list item. */
import { getAllListItems, createListItem } from '~/services/mock-data.server'

/* 3. Export a `loader` function that gets all of the list items and exposes that data to the client. */
export const loader = async () => {
  const allListItems = await getAllListItems()
  return json({ allListItems })
}

/* 4. Export an `action` function that creates a new list item and exposes the ID of the new item to the client. */
export const action = async () => {
  const newListItem = await createListItem()
  return json({ newListItemId: newListItem.id })
}

export default function Demo() {
  /* 5. In the React function component assign the data exposed by the `loader` function to a varible with the `useLoaderData` hook. */
  const { allListItems } = useLoaderData<typeof loader>()
  /* 6. In the React function component assign the data exposed by the `action` function to a varible with the `useActionData` hook, or if that value is nullish then destructure from an empty object to leave the variable undefined. */
  const { newListItemId } = useActionData<typeof action>() ?? {}

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Form Component and Action Function (demo)</h1>
      <h2 className="my-6 text-2xl text-center px-2 py-1 mx-1 border-2 border-solid border-yellow-500 rounded-lg">
        CartPartner: Your Little Shopping Buddy
      </h2>
      <div className="my-4">
        {/* 7. In the TSX return value of the React function component include a Remix `<Form>` component with a `method` prop value of `post`, and inside the `<Form>` component add a `<button>` element with a `type` attribute value of `submit`. */}
        <Form method="post">
          <button
            type="submit"
            className="text-lg py-1 px-2 bg-violet-400 rounded-lg"
          >
            ADD NEW ITEM
          </button>
        </Form>
      </div>
      <div className="my-4 h-6">
        {newListItemId && (
          <p className="text-neutral-700">
            Successfully created list item #{newListItemId}
          </p>
        )}
      </div>
      <h3 className="my-4 text-xl">Shopping List:</h3>
      <ol className="my-4 px-8">
        {allListItems.map((item) => (
          <li
            key={item.id}
            className="my-2 border-2 border-solid border-lime-500 rounded-lg px-2 py-1 text-lg bg-emerald-500"
          >
            item #{item.id} created at {item.createdAt}
          </li>
        ))}
      </ol>
    </main>
  )
}
