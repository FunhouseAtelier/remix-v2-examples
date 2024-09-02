import { Link, Outlet, useNavigation } from '@remix-run/react'

/* 1. Import the Remix `NavLink` component. */
import { NavLink } from '@remix-run/react'
/* 2. Add a function to conditionally generate the classes for the `NavLink` components. */
const makeNavLinkClasses = ({
  isActive,
  isPending,
}: {
  isActive: boolean
  isPending: boolean
}) => {
  return `mt-4 block text-lg text-center py-1 rounded-lg ${
    isPending
      ? 'bg-purple-500 transition-colors duration-200 delay-200'
      : isActive
      ? 'bg-fuchsia-500'
      : 'bg-violet-500'
  }`
}

export default function Demo() {
  const navigation = useNavigation()

  return (
    <main className="p-4">
      <h1 className="text-3xl">Active Link Styling (demo)</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-500 hover:underline" to="/demo">
          Navigate to /demo
        </Link>
      </div>
      <div className="my-6 max-w-[900px]">
        <h2 className="mb-2 text-2xl text-center px-2 py-1 mx-1 border-2 border-solid border-yellow-500 rounded-lg">
          Facebird Messenger
        </h2>
        <div className="flex">
          <div className="w-1/3 p-1">
            <div className="border-4 border-solid border-lime-500 p-4">
              {/* 3. Pass the `makeNavLinkClasses` function to the `NavLink` components through the `className` prop. */}
              <NavLink to="/demo/1" className={makeNavLinkClasses}>
                Bluebie B.
              </NavLink>
              <NavLink to="/demo/2" className={makeNavLinkClasses}>
                Carrot McCaw
              </NavLink>
              <NavLink to="/demo/3" className={makeNavLinkClasses}>
                Hoot Spotter
              </NavLink>
            </div>
          </div>
          <div className="w-2/3 p-1">
            <div className="border-4 border-solid border-green-500 p-4">
              <div
                className={
                  navigation.state === 'loading'
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
