# Loader and Redirect

## Process

### `app/routes/demo.tsx`

1. Create an `app/routes/demo.tsx` file.

2. Export, as the default, a React function component that returns some boilerplate TSX code to indicate the route being viewed.

```tsx
export default function Demo() {
  return (
    <main className="p-4">
      <h1 className="text-3xl">Loader and Redirect (demo)</h1>
    </main>
  )
}
```

### `app/routes/_index.tsx`

1. Remove all of the boilerplate code.

2. Import the Remix `redirect` utility function.

```tsx
import { redirect } from '@remix-run/node'
```

3. Export a `loader` asynchronous function that returns the `redirect` function with a string argument that matches the relative URL of the route handled by `app/routes/demo.tsx`.

```tsx
export const loader = async () => {
  return redirect('/demo')
}
```

4. Rename the file as `app/routes/_index.ts`

## Notes

- This redirect to a `/demo` route is included in all of the examples in this repository, because in some cases the demonstration includes nested routing, which is not possible in an `_index.tsx` file, and for the sake of showing examples it is best not to clutter the `app/root.tsx` file with the demonstration code, but rather to put that code in its own route.

- The export of a `meta` function was removed from `app/routes/_index.tsx` because the route now only redirects to another route, thus the `meta` code was moved into the `app/root.tsx` file. This technique is covered in the **05. `<head>` Child Components** section.

- The `app/routes/_index.tsx` file is renamed to `app/routes/_index.ts` because a `*.tsx` file is expected to export, as the default, a React function component. Now that it only exports a `loader` function that redirects to another route it is considered a utility route, and the appropriate filename extension is `*.ts`. In practice it would still work flawlessly as a `*.tsx` file, but renaming it is the correct procedure.

- When requesting to view the base URL of the web app, first the `app/root.tsx` file is loaded as the global layout for the entire app, then it attempts to render `app/routes/_index.ts` in an `<Outlet />` component. That calls the `loader` function exported by `app/routes/_index.ts`, which always runs on the server, before any more data is sent to the client, and the result is to redirect to another route. This repeats the loading process, starting with `app/root.tsx`, but this time the `<Outlet />` component attempts to render `app/routes/demo.tsx` and this succeeds because it is not interrupted by a `loader` function and there is a default export in `app/routes/demo.tsx` that is a React function component.

## Expected Behavior

- When navigating the the base URL of the web app (usually `http://localhost:5173` in development) you should be immediately redirected to the `/demo` route. There is no page or React component to be seen at the base URL.

## Remix Docs References

[Quick Start: Mutation Discussion](https://remix.run/docs/en/main/start/tutorial#mutation-discussion) (Scroll down to the paragraph that begins with "`action` and `loader` functions can both...")
