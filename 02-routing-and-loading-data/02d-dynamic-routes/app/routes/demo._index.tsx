/* 1. Create the `app/routes/demo._index.tsx` file. */

/* 2. Export, as the default, a React function component that will be rendered in place of the `<Outlet />` component when navigating to the `/demo` route. */
export default function Index() {
  return (
    <>
      <h3 className="text-xl">Welcome to the Nested Static Routes demo</h3>
      <p className="mt-4">
        This is the index (default) nested route. Click on a button in the
        "Navigation" left sidebar to view a different nested route.
      </p>
    </>
  )
}
