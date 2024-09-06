/* 1. Import the Remix `json` utility function, `<Form>` component, and `useLoaderData` hook. */
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
/* 2. Import the server functions to load all list items and create a new list item. */
import { getAllListItems, createListItem } from '~/services/mock-data.server'

/* 3. Export a `loader` function that gets all of the list items and exposes that data to the client. */
export const loader = async () => {
  const allListItems = await getAllListItems()
  return json({ allListItems })
}

/* 4. Export an `action` function that creates a new list item. */
export const action = async () => {
  await createListItem()
  return json(null)
}

export default function Demo() {
  /* 5. In the React function component assign the data exposed by the `loader` function to a varible with the `useLoaderData` hook. */
  const { allListItems } = useLoaderData<typeof loader>()

  return (
    <main className="p-4">
      <h1 className="text-3xl">Form Component and Action Function (demo)</h1>
      <div className="my-4">
        {/* 6. In the TSX return value of the React function component include a Remix `<Form>` component with a `method` prop value of `post`, and inside the `<Form>` component add a `<button>` element with a `type` attribute value of `submit`. */}
        <Form method="post">
          <button
            type="submit"
            className="text-lg py-1 px-2 bg-violet-500 rounded-lg"
          >
            ADD NEW ITEM
          </button>
        </Form>
      </div>
      <ol className="my-4 px-8 max-w-[900px] list-disc">
        {allListItems.map((item) => (
          <li key={item.id}>list item created at {item.createdAt}</li>
        ))}
      </ol>
    </main>
  )
}
