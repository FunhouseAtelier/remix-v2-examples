import type { ActionFunctionArgs } from '@remix-run/node'

import { logout } from '~/services/auth.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  await logout({ request })
}
