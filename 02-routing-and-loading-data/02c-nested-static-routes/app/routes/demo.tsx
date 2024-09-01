import { Link, Outlet } from '@remix-run/react'

export default function Demo() {
  return (
    <main className="p-4">
      <h1 className="text-3xl">Nested Static Routes (demo)</h1>
      <div className="my-4 flex">
        <div className="w-1/4 p-1">
          <h2 className="mb-2 text-2xl">Navigation</h2>
          <div className="border-4 border-solid border-lime-500 p-4">
            <Link
              to="/demo/introduction"
              className="block text-lg text-center py-1 bg-violet-500 rounded-lg"
            >
              Introduction
            </Link>
            <Link
              to="/demo/section1"
              className="mt-4 block text-lg text-center py-1 bg-violet-500 rounded-lg"
            >
              Section 1
            </Link>
          </div>
        </div>
        <div className="w-3/4 p-1">
          <h2 className="mb-2 text-2xl">Nested Route View</h2>
          <div className="border-4 border-solid border-green-500 p-4">
            <Outlet />
          </div>
        </div>
      </div>
      <Link className="text-xl text-blue-500 hover:underline" to="/demo">
        Navigate to /demo
      </Link>
    </main>
  )
}
