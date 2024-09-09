import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { getAllListItems, createListItem } from '~/services/mock-data.server'
/* 1.  */
import { Outlet } from '@remix-run/react'

export const loader = async () => {
  const allListItems = await getAllListItems()
  return json({ allListItems })
}

export const action = async () => {
  const newListItem = await createListItem()
  return json({ newListItemId: newListItem.id })
}

export default function Demo() {
  const { allListItems } = useLoaderData<typeof loader>()
  const { newListItemId } = useActionData<typeof action>() ?? {}

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Relative Actions and Form Data (demo)</h1>
      <h2 className="my-6 text-2xl text-center px-2 py-1 border-2 border-solid border-yellow-500 rounded-lg">
        CartPartner: Your Little Shopping Buddy
      </h2>
      <div className="my-4 p-2 border-4 border-solid border-lime-500 rounded-lg">
        <Outlet />
      </div>
      <div className="my-4">
        <Form method="post">
          <button
            type="submit"
            className="text-lg py-1 px-2 bg-violet-400 rounded-lg"
          >
            ADD NEW ITEM
          </button>
        </Form>
      </div>
      <h3 className="my-4 text-xl">Shopping List:</h3>
      <ol className="my-4">
        {allListItems.map((item) => (
          <li key={item.id} className="my-2 flex gap-2">
            <div className="border-2 border-solid border-emerald-500 rounded-lg px-2 py-1 bg-teal-500 grow">
              item #{item.id} created at {item.createdAt}
            </div>
            <Form action={`${item.id}/edit`}>
              <button
                type="submit"
                className="rounded-lg px-3 py-2 flex justify-center items-center bg-orange-400"
              >
                EDIT
              </button>
            </Form>
          </li>
        ))}
      </ol>
    </main>
  )
}
