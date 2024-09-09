import type { ListItem } from '~/services/mock-data.server'
import { json } from '@remix-run/node'
/* 1. Remove the import for the Remix `useActionData` hook. */
// import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { Form, useLoaderData } from '@remix-run/react'
/* 2. Remove the import for the server function that creates a new list item. */
// import { getAllListItems, createListItem } from '~/services/mock-data.server'
import { getAllListItems } from '~/services/mock-data.server'
/* 3. Import the Remix `<Output />` component. */
import { Outlet } from '@remix-run/react'

export const loader = async () => {
  const allListItems = await getAllListItems()
  return json({ allListItems })
}

/* 4. Remove the `action` function. */
// export const action = async () => {
//   const newListItemId = await createListItem()
//   return json({ newListItemId })
// }

export default function Demo() {
  const { allListItems } = useLoaderData<typeof loader>()
  /* 5. Remove the assignment of data exposed by the `action` function. */
  // const { newListItemId } = useActionData<typeof action>() ?? {}

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Relative Actions and Form Data (demo)</h1>
      <h2 className="my-6 text-2xl text-center px-2 py-1 border-2 border-solid border-yellow-500 rounded-lg">
        CartPartner: Your Little Shopping Buddy
      </h2>
      {/* 6. Replace the form used to create a new list item with the `<Outlet />` component. */}
      {/* <Form method="post">
        <button type="submit">ADD NEW ITEM</button>
      </Form> */}
      <Outlet />
      <h3 className="my-4 text-xl">Shopping List:</h3>
      <ol className="my-4">
        {allListItems.map((item: ListItem) => (
          <li key={item.id} className="my-2 flex gap-2">
            <div className="border-2 border-solid border-lime-500 rounded-lg px-2 py-1 bg-emerald-500 grow">
              {item.description}
            </div>
            {/* 7. Add a `<Form>` component to each list item, with an edit button of `type="submit"`,and set the `<Form>` prop `action` to match the relative edit item route. */}
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
