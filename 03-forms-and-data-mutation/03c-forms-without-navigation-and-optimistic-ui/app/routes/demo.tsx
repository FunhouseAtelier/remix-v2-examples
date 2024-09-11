import type { ListItem } from '~/services/mock-data.server'
import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Outlet, useLoaderData } from '@remix-run/react'
import { getAllListItems } from '~/services/mock-data.server'
import { useState } from 'react'
import AltDemo from '~/components/alt-demo'
/* 1. Import the Remix `useFetchers` hook, a server function to toggle the completion status of an item in the data store, and the custom `<Checkbox />` component created above. */
import { useFetchers } from '@remix-run/react'
import { toggleCompletedOnListItem } from '~/services/mock-data.server'
import Checkbox from '~/components/checkbox'

export const loader = async () => {
  const allListItems = await getAllListItems()
  return json({ allListItems })
}

/* 2. Export an action function that will receive all requests from `<Checkbox />` components, call the server function with the list item ID found in the form data, then return a success response. If there is no item ID in the form data, throw a "400 Bad Request" response. */
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const listItemId = formData.get('item-id')
  if (!listItemId || typeof listItemId !== 'string') {
    throw json(null, {
      status: 400,
      statusText: 'Missing listItemId param',
    })
  }
  await toggleCompletedOnListItem(listItemId)
  return json({ success: true })
}

export default function Demo() {
  const [isWithoutNavigationOn, setIsWithoutNavigationOn] =
    useState<boolean>(true)
  const [isOptimisticUiOn, setIsOptimisticUiOn] = useState<boolean>(true)
  const { allListItems } = useLoaderData<typeof loader>()
  /* 3. Assign the return value of `useFetchers()` to a variable to track all "in-flight" `<fetcher.Form>` submissions. */
  const fetchers = useFetchers()
  /* 4. Add a function that will check if a list item should be marked completed according to the optimistic UI strategy by iterating over all `<fetcher.Form>` submissions in flight and checking if there is a `formData` property with a matching item ID. */
  const checkIfCompleted = (item: ListItem) => {
    for (let fetcher of fetchers) {
      if (fetcher.formData && fetcher.formData.get('item-id') === item.id) {
        return fetcher.formData.get('is-completed') === 'yes'
      }
    }
    return item.isCompleted
  }

  if (isWithoutNavigationOn && isOptimisticUiOn)
    return (
      <main className="p-4 max-w-[900px]">
        <h1 className="text-3xl">
          Forms Without Navigation and Optimistic UI (demo)
        </h1>
        <h2 className="my-6 text-2xl text-center px-2 py-1 border-2 border-solid border-yellow-500 rounded-lg">
          CartPartner: Your Little Shopping Buddy
        </h2>
        <div className="my-4">
          <button
            className="mr-4 py-1 px-2 bg-violet-400 rounded-lg"
            onClick={() => setIsWithoutNavigationOn(!isWithoutNavigationOn)}
          >
            Toggle
          </button>
          <span className="text-xl">
            Forms (checkboxes) Without Navigation is{' '}
            <span className="font-bold">
              {isWithoutNavigationOn ? 'ON' : 'OFF'}
            </span>
          </span>
        </div>
        <div className="my-4">
          <button
            className="mr-4 py-1 px-2 bg-violet-400 rounded-lg"
            onClick={() => setIsOptimisticUiOn(!isOptimisticUiOn)}
          >
            Toggle
          </button>
          <span className="text-xl">
            Optimistic UI is{' '}
            <span className="font-bold">{isOptimisticUiOn ? 'ON' : 'OFF'}</span>
          </span>
        </div>
        <Outlet />
        <h3 className="my-4 text-xl">Shopping List:</h3>
        <ol className="my-4">
          {allListItems.map((item: ListItem) => (
            <li key={item.id} className="my-2 flex gap-2">
              {/* 5. Add a `<Checkbox />` component for each list item. */}
              <Checkbox item={item} />
              {/* 6. Call the `checkIfCompleted()` function to handle conditional styling of each item description element according to the optimistic UI strategy. */}
              <div
                className={`border-2 border-solid border-lime-500 rounded-lg px-2 py-1 bg-emerald-500 grow ${
                  checkIfCompleted(item) ? 'bg-neutral-500' : 'bg-emerald-500'
                }`}
              >
                {item.description}
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

  return (
    <AltDemo
      isWithoutNavigationOn={isWithoutNavigationOn}
      isOptimisticUiOn={isOptimisticUiOn}
      setIsWithoutNavigationOn={setIsWithoutNavigationOn}
      setIsOptimisticUiOn={setIsOptimisticUiOn}
      allListItems={allListItems}
      checkIfCompleted={checkIfCompleted}
    />
  )
}
