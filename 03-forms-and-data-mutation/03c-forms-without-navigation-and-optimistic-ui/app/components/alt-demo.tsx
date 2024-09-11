import type { ListItem } from '~/services/mock-data.server'
import { Form, Outlet } from '@remix-run/react'
import AltCheckbox from './alt-checkbox'

export default function AltDemo({
  isWithoutNavigationOn,
  isOptimisticUiOn,
  setIsWithoutNavigationOn,
  setIsOptimisticUiOn,
  allListItems,
  checkIfCompleted,
}: {
  isWithoutNavigationOn: boolean
  isOptimisticUiOn: boolean
  setIsWithoutNavigationOn: Function
  setIsOptimisticUiOn: Function
  allListItems: ListItem[]
  checkIfCompleted: Function
}) {
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
            <AltCheckbox
              item={item}
              isWithoutNavigationOn={isWithoutNavigationOn}
              isOptimisticUiOn={isOptimisticUiOn}
            />
            <div
              className={`border-2 border-solid border-lime-500 rounded-lg px-2 py-1 bg-emerald-500 grow ${
                (isOptimisticUiOn ? checkIfCompleted(item) : item.isCompleted)
                  ? 'bg-neutral-500'
                  : 'bg-emerald-500'
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
}
