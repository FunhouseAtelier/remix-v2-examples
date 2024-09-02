import { Link, Outlet } from '@remix-run/react'
import { useState } from 'react'

/* 1. Import the Remix `useNavigation` hook. */
import { useNavigation } from '@remix-run/react'

export default function Demo() {
  const [isPendingUiOn, setIsPendingUiOn] = useState<boolean>(true)

  /* 2. In the React function component assign the return value of the Remix `useNavigation` hook to a variable. */
  const navigation = useNavigation()

  return (
    <main className="p-4">
      <h1 className="text-3xl">Pending UI (demo)</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-500 hover:underline" to="/demo">
          Navigate to /demo
        </Link>
      </div>
      <div className="my-4">
        <button
          className="mr-4 py-1 px-2 bg-violet-500 rounded-lg"
          onClick={() => setIsPendingUiOn(!isPendingUiOn)}
        >
          Toggle
        </button>
        <span className="text-xl">
          Pending UI is{' '}
          <span className="font-bold">{isPendingUiOn ? 'ON' : 'OFF'}</span>
        </span>
      </div>
      <div className="my-6 max-w-[900px]">
        <h2 className="mb-2 text-2xl text-center px-2 py-1 bg-yellow-500 rounded-lg">
          Facebird Messenger
        </h2>
        <div className="flex">
          <div className="w-1/3 p-1">
            <div className="border-4 border-solid border-lime-500 p-4">
              <Link
                to="/demo/1"
                className="block text-lg text-center py-1 bg-violet-500 rounded-lg"
              >
                Bluebie B.
              </Link>
              <Link
                to="/demo/2"
                className="mt-4 block text-lg text-center py-1 bg-violet-500 rounded-lg"
              >
                Carrot McCaw
              </Link>
              <Link
                to="/demo/3"
                className="mt-4 block text-lg text-center py-1 bg-violet-500 rounded-lg"
              >
                Hoot Spotter
              </Link>
            </div>
          </div>
          <div className="w-2/3 p-1">
            <div className="border-4 border-solid border-green-500 p-4">
              {/* 3. Wrap the `<Outlet />` component in a `<div>` element and use the `className` prop to conditionally apply the pending UI style classes when the navigation state is "loading". */}
              <div
                className={
                  navigation.state === 'loading' && isPendingUiOn
                    ? 'opacity-25 transition-opacity duration-200 delay-200'
                    : ''
                }
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
