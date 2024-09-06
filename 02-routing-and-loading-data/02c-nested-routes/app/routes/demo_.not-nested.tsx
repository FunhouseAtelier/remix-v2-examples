import { Link } from '@remix-run/react'

/* 1. Export, as the default, a React function component that will be rendered in its own layout when navigating to the `/demo/not-nested` route. */
export default function NotNested() {
  return (
    <main className="p-4">
      <h1 className="text-3xl">Nested Static Routes (demo)</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-500 hover:underline" to="/demo">
          Navigate to /demo
        </Link>
      </div>
      <div className="my-4">
        <h3 className="text-xl">Not Nested</h3>
        <p className="my-4 max-w-[600px]">
          This route was excluded from being nested inside the `/demo` route by
          adding an `_` (underscore) immediately after the parent route name in
          the filename for this route.
        </p>
      </div>
    </main>
  )
}
