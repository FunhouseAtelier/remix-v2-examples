/* 1. Remove all of the boilerplate code. */

/* 2. Import the Remix `redirect` utility function. */
import { redirect } from '@remix-run/node'

/* 3. Export a `loader` asynchronous function that returns the `redirect` function with a string argument that matches the relative URL of the route handled by `app/routes/demo.tsx`. */
export const loader = async () => {
  return redirect('/demo')
}
