/* 1. Import the Remix `<Link>` and `<Outlet />` components. */
import { Link, Outlet } from '@remix-run/react'

export default function Demo() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Nested Routes (demo)</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-500 hover:underline" to="/demo">
          Navigate to /demo
        </Link>
      </div>
      <div className="my-4">
        {/* 2. Use the `<Link>` component to perform client-side routing to the not-nested route. */}
        <Link
          className="text-xl text-blue-500 hover:underline"
          to="/demo/not-nested"
        >
          Navigate to /demo/not-nested
        </Link>
      </div>
      <div className="my-4 flex">
        <div className="w-1/3 p-1">
          <h2 className="mb-2 text-2xl">Navigation</h2>
          <div className="border-4 border-solid border-lime-500 p-4">
            {/* 3. Use the `<Link>` component to perform client-side routing to the nested routes. */}
            <Link
              to="/demo/introduction"
              className="block text-lg text-center py-1 bg-violet-400 rounded-lg"
            >
              Introduction
            </Link>
            <Link
              to="/demo/section1"
              className="mt-4 block text-lg text-center py-1 bg-violet-400 rounded-lg"
            >
              Section 1
            </Link>
          </div>
        </div>
        <div className="w-2/3 p-1">
          <h2 className="mb-2 text-2xl">Nested Route View</h2>
          <div className="border-4 border-solid border-green-500 p-4">
            {/* 4. Add the `<Outlet />` component to the TSX return value where the nested routes will appear. */}
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}
