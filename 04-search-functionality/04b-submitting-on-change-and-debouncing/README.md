# 04b. Submitting On Change and Debouncing

## Starting Point

1. Replicate the result from **04a. `URLSearchParams` and `GET` Submissions**.

## Process

### Edit `app/routes/demo.tsx`

1. Import the Remix `useSubmit` and React `useRef` hooks.

```tsx
import { useSubmit } from '@remix-run/react'
import { useRef } from 'react'
```

2. Assign an instance of `useSubmit()` to a variable.

```tsx
const submit = useSubmit()
```

3. Assign and instance of `useRef()` to a variable, which will be used to track the ID of the current debouncing timeout.

```tsx
const timeoutRef = useRef<NodeJS.Timeout>()
```

4. Add a function to handle submission of the form any time the form data changes and perform debouncing so that the submissions only happen if there has been no change in the last half-second, indicating that the user has finished typing.

```tsx
const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
  clearTimeout(timeoutRef.current)
  timeoutRef.current = setTimeout(submit.bind(null, event.currentTarget), 500)
}
```

5. Add a React effect that watches for changes to the debouncing timeout ID tracker and returns a clean-up function to clear the current timeout, in order to prevent memory leaks.

```tsx
useEffect(() => {
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }
}, [timeoutRef])
```

6. Add an `onChange` prop to the `<Form>` component that refers to the handler function.

```tsx
<Form role="search" onChange={handleChange}>
  {/* form content */}
</Form>
```

7. Remove the submit button, as it is no longer necessary and if used would add duplicate entires to the browser history stack.

## Notes

- Debouncing is not covered in the Remix Docs, but this technique is recommended when submitting forms on change where the value(s) can change very quickly, in order to minimize the load on the web server. It also serves to manage the history stack, as covered in the second link to the Remix Tutorial below, but without the need for a `isFirstSearch` variable or the `replace` option passed to the `submit` function.

## Expected Behavior

- When typing a search term into the input field and then stopping for at least a half second the form will automatically submit and any results will be displayed.

- Each time the form submits it will add an entry to the browser history stack, but not for each keypress because debouncing is applied to the `submit` function.

- The `submit.bind()` syntax is necessary to define a function for `setTimeout` to run after the half-second delay and pass it the `event` captured within the handler function. A simple `() => submit(event.currentTarget)` would not preserve the `event` at the time `setTimeout` calls the function.

## Remix Docs References

[Remix Tutorial: Submitting Form's onChange](https://remix.run/docs/en/main/start/tutorial#submitting-forms-onchange)

[Remix Tutorial: Managing the History Stack](https://remix.run/docs/en/main/start/tutorial#managing-the-history-stack)
