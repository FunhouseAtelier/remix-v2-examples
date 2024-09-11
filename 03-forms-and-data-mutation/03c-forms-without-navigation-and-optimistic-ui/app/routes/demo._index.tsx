import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { createListItem } from '~/services/mock-data.server'

export const action = async () => {
  const newListItemId = await createListItem()
  throw redirect(`/demo/${newListItemId}/edit`)
}

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
