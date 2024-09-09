/* 1. Import the Remix `redirect` utility function and `<Form>` component. */
import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
/* 2. Import the server function to create a new list item. */
import { createListItem } from '~/services/mock-data.server'
/* 3. Export a `loader` function that gets the ID of a new item and uses it to redirect to the edit item route. */
export const action = async () => {
  const newListItemId = await createListItem()
  throw redirect(`/demo/${newListItemId}/edit`)
}
/* 4. Export, as the default, a React function component containing the `<Form>` component used to create a new list item. */
export default function Index() {
  return (
    <Form method="post" className="my-4 block">
      <button
        type="submit"
        className="text-lg py-1 px-2 bg-violet-400 rounded-lg"
      >
        ADD NEW ITEM
      </button>
    </Form>
  )
}
