/* 1. Create the `app/routes/demo.$userId.tsx` file. */

/* 2. Import the type declaration for the `loader` function arguments. */
import type { LoaderFunctionArgs } from '@remix-run/node'
/* 3. Import the Remix `json` utility function. */
import { json } from '@remix-run/node'
/* 4. Import the Remix `useLoaderData` hook. */
import { useLoaderData } from '@remix-run/react'
/* 5. Import a server function that will get the data. */
import { getUser } from '~/services/mock-data.server'

/* 6. Export a `loader` asynchronous function that will fetch the data from the server, based on the `userId` in the URL. */
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { userId } = params
  /* If no userId was found in the URL params, send a "400 Bad Request" response to the client. */
  if (!userId) {
    throw new Response(null, {
      status: 400,
      statusText: 'Missing userId param',
    })
  }
  const user = await getUser(userId)
  /* If no user data is returned by `getUser()`, send a "404 Not Found" response to the client. */
  if (!user) {
    throw new Response(null, {
      status: 404,
      statusText: 'User not found',
    })
  }
  /* Otherwise, expose the user data to the client. */
  return json({ user })
}

/* 7. Export, as the default, a React function component that will be rendered in place of the `<Outlet />` component when navigating to the `/demo/<ANY_VALID_STRING>` route. */
export default function MessageHistory() {
  /* 8. In the React function component assign the exposed data to a variable with the `useLoaderData` hook. */
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
          className={`my-2 py-1 px-2 rounded w-4/5 ${
            index % 2 === 0 ? 'bg-emerald-500' : 'bg-teal-500 ml-auto'
          }`}
        >
          {message}
        </p>
      ))}
    </>
  )
}
