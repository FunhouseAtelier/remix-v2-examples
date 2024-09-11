import type { ListItem } from '~/services/mock-data.server'
import { useFetcher } from '@remix-run/react'
import { Form } from '@remix-run/react'

export default function AltCheckbox({
  item,
  isWithoutNavigationOn,
  isOptimisticUiOn,
}: {
  item: ListItem
  isWithoutNavigationOn: boolean
  isOptimisticUiOn: boolean
}) {
  const fetcher = useFetcher()
  /* If `fetcher.formData` exists, the form is either being submitted or the page is waiting for the new data to be loaded, thus use the expected ("optimistic") boolean, otherwise use the loaded data boolean that reflects the state of the database. */
  const isCompleted = fetcher.formData
    ? fetcher.formData.get('is-completed') === 'yes'
    : item.isCompleted

  const FormComponent = isOptimisticUiOn ? fetcher.Form : Form

  return (
    <FormComponent
      method="post"
      action={isWithoutNavigationOn ? '' : `${item.id}/alt-complete`}
    >
      {/* A hidden input is used to include `item.id` in the form data, so that `fetcher` hooks and the target `action` function know for which item to change the completion status. */}
      <input type="hidden" name="item-id" value={item.id} />
      {/* A `<button>` element can have `name` and `value` attributes, just like an `<input>` element, and that will be a part of the form data passed to the appropriate `action` function. Here the optimistic UI boolean value is used to conditionally style the button. Note that the value submitted in the form data is the opposite of the current state; it represents the state to change to. */}
      <button
        name="is-completed"
        value={
          (isOptimisticUiOn ? isCompleted : item.isCompleted) ? 'no' : 'yes'
        }
        className={`flex justify-center items-center border-2 border-solid border-violet-400 rounded-lg px-2 py-0.5 text-2xl ${
          (isOptimisticUiOn ? isCompleted : item.isCompleted)
            ? 'bg-neutral-500 text-neutral-300'
            : 'text-neutral-600'
        }`}
      >
        ✓
      </button>
    </FormComponent>
  )
}
