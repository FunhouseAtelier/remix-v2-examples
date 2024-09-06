import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getAllListItems, createListItem } from '~/services/mock-data.server'

export const loader = async () => {
  const allListItems = await getAllListItems()
  return json({ allListItems })
}

export const action = async () => {
  const newListItem = await createListItem()
  return json({ newListItem })
}

export default function Demo() {
  const { allListItems } = useLoaderData<typeof loader>()

  return (
    <main className="p-4">
      <h1 className="text-3xl">Form Component and Action Function (demo)</h1>
      <div className="my-4">
        <a className="text-xl text-blue-500 hover:underline" href="/demo">
          Navigate to /demo (server-side routing)
        </a>
      </div>
      <div className="my-4">
        <Form method="post">
          <button
            type="submit"
            className="text-lg py-1 px-2 bg-violet-500 rounded-lg"
          >
            ADD AN ITEM
          </button>
        </Form>
      </div>
      <ol className="my-4 px-8 max-w-[900px]">
        {allListItems.map((item) => (
          <li
            key={item.id}
            className="my-2 py-1 px-2 rounded-md border-2 border-solid border-lime-500"
          >
            list item created at {item.createdAt}
          </li>
        ))}
      </ol>
    </main>
  )
}
