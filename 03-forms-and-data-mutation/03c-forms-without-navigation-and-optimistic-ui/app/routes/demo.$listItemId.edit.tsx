import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getListItem, updateListItem } from '~/services/mock-data.server'

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
        autoFocus
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
