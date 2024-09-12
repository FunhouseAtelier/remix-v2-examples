# 04a. `URLSearchParams` and `GET` Submissions

## Starting Point

1. Replicate the result from **02a. `loader` and `redirect` Functions**.

## Process

### Edit `app/routes/demo.tsx`

1. Import the Remix `json` utility function, `<Form />` component, `useLoaderData` hook, and the React `useEffect` hook.

```tsx
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
```

2. Import a server function to get the search results from a database or website API.

```tsx
import { getSearchResults } from '~/services/mock-data.server'
```

3. Export a `loader` function that extracts the search term from the request and calls the server function to get the search results, then exposes the search term and results to the client.

```tsx
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  let startsWithWords, includesWords
  if (q) {
    const searchResults = await getSearchResults(q)
    startsWithWords = searchResults.startsWithWords
    includesWords = searchResults.includesWords
  }
  return json({ q, startsWithWords, includesWords })
}
```

4. In the React function component, assign the data exposed by the `loader` functions to variables by destructuring from the return value of the `useLoaderData()` function.

```tsx
const { q, startsWithWords, includesWords } = useLoaderData<typeof loader>()
```

5. Add a React effect to check when the search term changes and assign it to the value of the search input, in order to keep the search input element value and the URL in sync, even when navigating with back/forward or when copying a URL with a search term into the browser address bar to navigate.

```tsx
useEffect(() => {
  const searchField = document.getElementById('q')
  if (searchField instanceof HTMLInputElement) {
    searchField.value = q || ''
  }
}, [q])
```

6. Add a `<Form>` to the TSX return value with an input field and submit button that can be used to change the search term and cause client-side navigation to the URL with the new search term. The input `id` attribute value should match the one used in the effect to reference the search input element, and the `name` attribute value should match the variable name extracted from the URL search params in the `loader` function.

```tsx
<Form role="search">
  <input
    id="q"
    type="search"
    name="q"
    placeholder={`Search for words containing...`}
    autoFocus
  />
  <button type="submit">SEARCH</button>
</Form>
```

## Notes

- This example uses the NPM package [word-list](https://www.npmjs.com/package/word-list) to generate a list of over 250,000 English words to search, excluding single letter words and many words that are considered generally offensive.

- The technique covered in **02e. Pending UI** could be used with search forms where slow connection speed may delay the server from responding quickly, such as complex searches of a database or searching via an external website API.

## Expected Behavior

- Typing any search term in the input and submitting the form will cause the URL to change to `<APP_BASE_URL>/demo?q=<SEARCH_TERM>` and display a list of search results, if any, or else a message saying no results were found. Using an empty string as a search term will change the URL but will display nothing for search results.

- Using the broswer back/forward button will navigate between the search history.

## Remix Docs References

[Remix Tutorial: URLSearchParams and GET Submissions](https://remix.run/docs/en/main/start/tutorial#urlsearchparams-and-get-submissions)

[Remix Tutorial: Synchronizing URLs to Form State](https://remix.run/docs/en/main/start/tutorial#synchronizing-urls-to-form-state)
