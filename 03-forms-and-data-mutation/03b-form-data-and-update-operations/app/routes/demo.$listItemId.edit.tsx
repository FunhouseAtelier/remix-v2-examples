import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'

import { getListItem } from '~/services/mock-data.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, 'Missing contactId param')
  const contact = await getContact(params.contactId)
  if (!contact) {
    throw new Response('Not Found', { status: 404 })
  }
  return json({ contact })
}

export default function EditListItem() {
  const { contact } = useLoaderData<typeof loader>()

  return (
    <Form key={contact.id} id="contact-form" method="post">
      <input
        defaultValue={contact.first}
        aria-label="First name"
        name="first"
        type="text"
        placeholder="First"
      />
    </Form>
  )
}
