/*  */
import type { ActionFunctionArgs } from '@remix-run/node'
/*  */
import { json, redirect } from '@remix-run/node'
import { toggleCompletedOnListItem } from '~/services/mock-data.server'

/*  */
export const action = async ({ params }: ActionFunctionArgs) => {
  const { listItemId } = params
  if (!listItemId) {
    throw json(null, {
      status: 400,
      statusText: 'Missing listItemId param',
    })
  }
  await toggleCompletedOnListItem(listItemId)
  throw redirect('/demo')
}
