#### 03c. Forms Without Navigation and Optimistic UI

## Process

### Starting Point

1. Replicate the result from **03b. Relative Actions and Form Data**.

### Create `app/routes/components/checkbox.tsx`

1. Import the Remix `useFetcher` hook, which will be used to submit the form without navigation and track the status of the submission "in-flight".

```tsx
import { useFetcher } from '@remix-run/react'
```

2. Export, as the default, a React function component that will render each checkbox that controls and indicates completion status, submits the form without navigating to a route, and displays the expected result optimistically, but reverts to the loaded data if it is different than the expected result after the submission flow is complete and revalidated data has loaded.

```tsx
export default function Checkbox({ item }: { item: ListItem }) {
  const fetcher = useFetcher()
  /* If `fetcher.formData` exists, the form is either being submitted or the page is waiting for the new data to be loaded, thus use the expected ("optimistic") boolean, otherwise use the loaded data boolean that reflects the state of the database. */
  const isCompleted = fetcher.formData
    ? fetcher.formData.get('is-completed') === 'yes'
    : item.isCompleted

  return (
    <fetcher.Form method="post">
      {/* A hidden input is used to include `item.id` in the form data, so that `fetcher` hooks and the target `action` function know for which item to change the completion status. */}
      <input type="hidden" name="item-id" value={item.id} />
      {/* A `<button>` element can have `name` and `value` attributes, just like an `<input>` element, and that will be a part of the form data passed to the appropriate `action` function. Here the optimistic UI boolean value is used to conditionally style the button. Note that the value submitted in the form data is the opposite of the current state; it represents the state to change to. */}
      <button
        name="is-completed"
        value={isCompleted ? 'no' : 'yes'}
        className={`<STATIC_STYLES> ${
          isCompleted ? '<COMPLETED_STYLES>' : '<UNCOMPLETED_STYLES>'
        }`}
      >
        ✓
      </button>
    </fetcher.Form>
  )
}
```

### Edit `app/routes/demo.tsx`

1. Import the Remix `useFetchers` hook, a server function to toggle the completion status of an item in the data store, and the custom `<Checkbox />` component created above.

```tsx
import { useFetchers } from '@remix-run/react'
import { toggleCompletedOnListItem } from '~/services/mock-data.server'
import Checkbox from '~/components/checkbox'
```

2. Export an action function that will receive all requests from `<Checkbox />` components, call the server function with the list item ID found in the form data, then return a success response. If there is no item ID in the form data, throw a "400 Bad Request" response.

```tsx
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const listItemId = formData.get('item-id')
  if (!listItemId || typeof listItemId !== 'string') {
    throw json(null, {
      status: 400,
      statusText: 'Missing listItemId param',
    })
  }
  await toggleCompletedOnListItem(listItemId)
  return json({ success: true })
}
```

3. Assign the return value of `useFetchers()` to a variable to track all "in-flight" `<fetcher.Form>` submissions.

```tsx
const fetchers = useFetchers()
```

4. Add a function that will check if a list item should be marked completed according to the optimistic UI strategy by iterating over all `<fetcher.Form>` submissions in flight and checking if there is a `formData` property with a matching item ID.

```tsx
const checkIfCompleted = (item: ListItem) => {
  for (let fetcher of fetchers) {
    if (fetcher.formData && fetcher.formData.get('item-id') === item.id) {
      return fetcher.formData.get('is-completed') === 'yes'
    }
  }
  return item.isCompleted
}
```

5. Add a `<Checkbox />` component for each list item.

```tsx
<Checkbox item={item} />
```

6. Call the `checkIfCompleted()` function to handle conditional styling of each item description element according to the optimistic UI strategy.

```tsx
<div
  className={`border-2 border-solid border-lime-500 rounded-lg px-2 py-1 bg-emerald-500 grow ${
    checkIfCompleted(item) ? 'bg-neutral-500' : 'bg-emerald-500'
  }`}
>
  {item.description}
</div>
```

## Notes

- The `<Checkbox />` component imports `useFetcher`, which is used to submit a single form in each instance of the component and track that form's submission. The form component is then named `<fetcher.Form>` but it functions the same way as a regular Remix `<Form>` component except that it will not navigate anywhere when submitting.

- The `/demo` route instead imports `useFetchers` (plural!) which returns an array of `fetcher` instances that can be used to track all in-flight `<fetcher.Form>` submissions with `fetcher.formData` or `fetcher.state`. They cannot be used to do all of the things a `fetcher` instance returned by `useFetcher()` (singular!) can, such as render a `<fetcher.Form>` component or manually load/submit data. They are mainly used, as in this example, to apply conditional rendering or styling to components that do not have access to the `fetcher` instance used for the `<fetcher.Form>` component.

- Forms without navigation, using `<fetcher.Form>`, are not meant to work in combination with the `action` prop, like the example of relative routing in **03b. Relative Actions and Form Data**. The `action` function they submit to should be in the same route.

- Forms without navigation are ideal for situations where there are multiple forms on the page that may have submissions in-flight simultanously, like this example of toggling completion buttons where there is an artifical delay of one second on the response to simulate a slow connection speed.

## Expected Behavior

### When Forms Without Navigation and Optimistic UI are ON

- Clicking a real item checkbox will immediately change the color to indicate it has been toggled, although the mock datastore has a one second delay before responding with the updated list.

- Clicking the FREE BIRD item checkbox will immediately change the color to indicate it has been toggled, but the mock datastore simulates an error when attempting to update that item, so after one second it revers back to a non-completed display.

### When Forms Without Navigation is OFF, but Optimistic UI is ON

- Clicking various real item checkboxes with a delay between each click will be the same behavior as when "Forms Without Navigation" was ON.

- Clicking various real item checkboxes in rapid succession will immediately change the color to indicate they've been toggled, but then some may revert back to their previous state. Reloading the page will show the correct display, one that matches the current state of the datastore, based on the results of all clicks. This is happening because some navigations are being requested before others have completed the re-loading of data, resulting in a display of stale data. That is why optimistic UI only works as expected when the forms do not navigate when submitted. To see what's happening in greater detail, check the Network tab of your browser devtools.

### When Optimistic UI is OFF, regardless of Forms WIthout Navigation

- Clicking the real item checkboxes feel unresponsive, as there is a one second delay between clicking and seeing a change in color. Optimistic UI is a better user experience in cases of slow connection speed, which can happen to any user at times.

- Clicking the FREE BIRD item checkbox will have no effect, so the user would not even know if their click was heard by the app.

## Remix Docs References

[Remix Tutorial: Forms Without Navigation](https://remix.run/docs/en/main/start/tutorial#forms-without-navigation)

[Remix Tutorial: Optimistic UI](https://remix.run/docs/en/main/start/tutorial#optimistic-ui)
