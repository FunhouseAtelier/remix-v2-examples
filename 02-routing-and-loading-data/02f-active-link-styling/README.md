# 02f. Active Link Styling

## Starting Point

1. Replicate the result from **02e. Pending UI**.

## Process

### Edit `app/routes/demo.tsx`

1. Import the Remix `NavLink` component.

```tsx
import { NavLink } from '@remix-run/react'
```

2. Add a function to conditionally generate the classes for the `<NavLink>` components.

```tsx
const makeNavLinkClasses = ({
  isActive,
  isPending,
}: {
  isActive: boolean
  isPending: boolean
}) => {
  return isPending
    ? 'bg-purple-500 transition-colors duration-200 delay-200'
    : isActive
    ? 'bg-fuchsia-500'
    : 'bg-violet-500'
}
```

3. Pass the `makeNavLinkClasses` function to the `<NavLink>` components through the `className` prop.

```tsx
<NavLink to="/demo/1" className={makeNavLinkClasses}>
  Bluebie B.
</NavLink>
<NavLink to="/demo/2" className={makeNavLinkClasses}>
  Carrot McCaw
</NavLink>
<NavLink to="/demo/3" className={makeNavLinkClasses}>
  Hoot Spotter
</NavLink>
```

## Notes

- If the Remix `<NavLink>` component is passed a function through the `className` prop it will run that function to generate the string of classes, passing it an object with `isPending` and `isActive` properties as an argument. When the route referenced by the `to` prop is being loaded, `isPending` will have a boolean value of true, and when that route has finished loading and is currently being viewed `isActive` will have a boolean value of true.

- The transition for the `isPending` conditional classes matches the transition for the "Message History" pending UI fade effect for consistency. Again the 200ms delay is used to avoid unpleasant UI flickering in the case of a fast load of the dynamic route.

- The example code shows how to use a template literal to combine the conditional classes with other static classes.

## Expected Behavior

- Clicking any link in the left sidebar will cause the background color of the link to transition to a different color than the other links, and once the route has finished loading it will change to another different color, indicating which link is associated with the route currently being viewed.

- If a different route was previously being viewed it will remain the active color until the new route has finished loading.

- Without active link styling there is no indication on the left sidebar of which link is currently loading or being viewed.

## Remix Docs References

[Remix Tutorial: Active Link Styling](https://remix.run/docs/en/main/start/tutorial#active-link-styling)
