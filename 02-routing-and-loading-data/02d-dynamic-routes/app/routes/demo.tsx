/* 1. Import the Remix `<Link>` and `<Outlet />` components. */
import { Link, Outlet } from '@remix-run/react'

export default function Demo() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Dynamic Routes (demo)</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-500 hover:underline" to="/demo">
          Navigate to /demo
        </Link>
      </div>
      <div className="my-4">
        <Link className="text-xl text-blue-500 hover:underline" to="/demo/4">
          Navigate to /demo/4 (not a userId on record)
        </Link>
      </div>
      <div className="my-6">
        <h2 className="mb-2 text-2xl text-center px-2 py-1 mx-1 border-2 border-solid border-yellow-500 rounded-lg">
          Facebird Messenger
        </h2>
        <div className="flex">
          <div className="w-1/3 p-1">
            <div className="border-4 border-solid border-lime-500 p-4">
              {/* 2. Use the `<Link>` component to perform client-side routing to the nested dynamic routes. */}
              <Link
                to="/demo/1"
                className="block text-lg text-center py-1 bg-violet-400 rounded-lg"
              >
                Bluebie B.
              </Link>
              <Link
                to="/demo/2"
                className="mt-4 block text-lg text-center py-1 bg-violet-400 rounded-lg"
              >
                Carrot McCaw
              </Link>
              <Link
                to="/demo/3"
                className="mt-4 block text-lg text-center py-1 bg-violet-400 rounded-lg"
              >
                Hoot Spotter
              </Link>
            </div>
          </div>
          <div className="w-2/3 p-1">
            <div className="border-4 border-solid border-green-500 p-4">
              {/* 3. Add the `<Outlet />` component to the TSX return value where the nested routes will appear. */}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
