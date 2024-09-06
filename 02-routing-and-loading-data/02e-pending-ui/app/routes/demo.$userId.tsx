import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getUser } from '~/services/mock-data.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params
  if (!userId) {
    throw json(null, {
      status: 400,
      statusText: 'Missing userId param',
    })
  }
  const user = await getUser(userId)
  if (!user) {
    throw json(null, {
      status: 404,
      statusText: 'User not found',
    })
  }
  return json({ user })
}

export default function MessageHistory() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <>
      <h3 className="text-xl">Message History</h3>
      <h4 className="my-2 text-lg flex items-center">
        <img
          src={user.imageUrl}
          alt={`profile pic for ${user.name}`}
          height={50}
          width={50}
          className="mr-2 rounded-full"
        />
        {user.name}
      </h4>
      {user.messages.map((message, index) => (
        <p
          key={index}
          className={`my-2 py-2 px-2 rounded w-4/5 ${
            index % 2 === 0 ? 'bg-emerald-500' : 'bg-teal-500 ml-auto'
          }`}
        >
          {message}
        </p>
      ))}
    </>
  )
}
