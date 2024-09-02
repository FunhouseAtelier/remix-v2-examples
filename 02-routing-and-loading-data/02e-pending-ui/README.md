# 02e. Pending UI

### Starting Point

1. Replicate the result from **02d. Dynamic Routes**.

## Process

### `app/routes/demo.tsx`

1. Import the Remix `useNavigation` hook.

```tsx
import { useNavigation } from '@remix-run/react'
```

2. In the React function component assign the return value of the Remix `useNavigation` hook to a variable.

```tsx
const navigation = useNavigation()
```

3. Wrap the `<Outlet />` component in a `<div>` element and use the `className` prop to conditionally apply the pending UI style classes when the navigation state is "loading".

```tsx
<div
  className={
    navigation.state === 'loading'
      ? 'opacity-25 transition-opacity duration-200 delay-200'
      : ''
  }
>
  <Outlet />
</div>
```

## Notes

- The value of `navigation.state` can be "idle", "loading" or "submitting".

- The `services/mock-data.server.ts` has a one-second delay to simulate a moderately slow connection speed.

- The pending UI classes used in this example are all Tailwind CSS utility classes that cause the same delayed fading effect as is used in the Remix Tutorial. The delay of 200ms before the fading begins is used to prevent unpleasant UI flickering when the loading time is short.

- A graceful fade-out is one simple option to indicate that new data is being loaded, but tracking the navigation state can be used for other visual effects such as displaying a loading spinner or, if the data is being streamed to the client, a loading progress bar. It can also be used to disable part or all of the UI during loading or submitting.

- The inclusion of the `useState` React hook to track the state of the `isPendingUiOn` variable is only for the purpose of demonstration, to allow you to toggle the pending UI effect on and off for comparison.

## Expected Behavior

- When pending UI is on, clicking any link in the left sidebar will cause the "Message History" content to gracefully fade out while the new data is loaded.

- When pending UI is off, clicking any link in the left sidebar will have no immediate effect until the one-second delay elaspes, causing the UI to feel sluggish and giving no indication that new data is being loaded.

## Remix Docs References

[Remix Tutorial: Global Pending UI](https://remix.run/docs/en/main/start/tutorial#global-pending-ui)
