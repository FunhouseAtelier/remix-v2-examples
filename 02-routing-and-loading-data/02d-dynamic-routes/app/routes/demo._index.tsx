/* 1. Export, as the default, a React function component that will be rendered in place of the `<Outlet />` component when navigating to the `/demo` route. */
export default function Index() {
  return (
    <>
      <h3 className="text-xl">Welcome to the Dynamic Routes demo</h3>
      <p className="mt-4">
        This example simulates the behavior of a messaging app/route. Click on
        the name of one of your feathered friends in the left sidebar to view
        your message history. I bet you didn't know birds speak Latin! 😏
      </p>
    </>
  )
}
