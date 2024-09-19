# 08-02-01a. Installing and Configuring Clerk

## Starting Point

1. Create a Clerk App and configure it to use the auth strategies of your choice.

2. Replicate the result from **01a. Installing and Running Remix v2 With `npx`**.

## Process

### In the Project Root Folder

1. Install the Clerk SDK for Remix package.

```bash
npm i @clerk/remix
```

### Create `.env`

1. Add environment variables for Clerk.

```bash
CLERK_PUBLISHABLE_KEY="<CLERK_PUBLISHABLE_KEY>"
CLERK_SECRET_KEY="<CLERK_SECRET_KEY>"
```

### Edit `app/root.tsx`

1. Import the Clerk `rootAuthLoader` function and `ClerkApp` wrapper.

```tsx
import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { ClerkApp } from '@clerk/remix'
```

2. Export a `loader` function that passes its arguments to the `rootAuthLoader` function.

```tsx
export const loader: LoaderFunction = (args) => rootAuthLoader(args)
```

3. Instead of exporting the `App` function as the default, use the `ClerkApp` wrapper, which is passed the `App` function as an argument.

```tsx
function App() {
  return <Outlet />
}

export default ClerkApp(App)
```

## Notes

- Make sure to place your environment variables in a `.env` file. Do not put them in the `.env.example` file.

- If there is other logic you want to run in the root loader function, or other data you want that loader function to return, it can be passed in a function that is the second argument when calling `rootAuthLoader`. See the **Clerk Docs: Remix Quickstart: Configure rootAuthLoader** reference below for the official example of how to do it.

## Expected Behavior

- There is no demonstration for this example, as it only prepared Clerk to be used in your app.

## Docs References

[Clerk Docs: Remix Quickstart](https://clerk.com/docs/quickstarts/remix)

[Clerk Docs: Remix Quickstart: Configure rootAuthLoader](https://clerk.com/docs/quickstarts/remix#configure-root-auth-loader)
