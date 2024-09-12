import type { LoaderFunctionArgs } from '@remix-run/node'
/* 1. Import the Remix `json` utility function, `<Form />` component, `useLoaderData` hook, and the React `useEffect` hook. */
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
/* 2. Import a server function to get the search results from a database or website API. */
import { getSearchResults } from '~/services/mock-data.server'

/* 3. Export a `loader` function that extracts the search term from the request and calls the server function to get the search results, then exposes the search term and results to the client. */
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

export default function Demo() {
  /* 4. In the React function component, assign the data exposed by the `loader` functions to variables by destructuring from the return value of the `useLoaderData()` function. */
  const { q, startsWithWords, includesWords } = useLoaderData<typeof loader>()

  /* 5. Add a React effect to check when the search term changes and assign it to the value of the search input, in order to keep the search input element value and the URL in sync, even when navigating with back/forward or when copying a URL with a search term into the browser address bar to navigate. */
  useEffect(() => {
    const searchField = document.getElementById('q')
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || ''
    }
  }, [q])

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">URLSearchParams and GET Submissions (demo)</h1>
      <h2 className="my-6 text-2xl text-center px-2 py-1 border-2 border-solid border-yellow-500 rounded-lg">
        Mister Diction
      </h2>
      {/* 6. Add a `<Form>` to the TSX return value with an input field and submit button that can be used to change the search term and cause client-side navigation to the URL with the new search term. The input `id` attribute value should match the one used in the effect to reference the search input element, and the `name` attribute value should match the variable name extracted from the URL search params in the `loader` function. */}
      <Form role="search" className="my-4 flex gap-2 items-center">
        <input
          id="q"
          type="search"
          name="q"
          placeholder={`Search for words containing...`}
          className="grow border-2 border-solid border-teal-500 rounded-lg py-1 px-2"
          autoFocus
        />
        <button
          type="submit"
          className="text-lg py-1 px-2 bg-violet-400 rounded-lg"
        >
          SEARCH
        </button>
      </Form>
      <h3 className="my-4 text-xl">Search Results</h3>
      {!!startsWithWords?.length && (
        <>
          <h4 className="my-4 text-lg">Words that start with "{q}":</h4>
          <div className="my-4 flex flex-wrap">
            {startsWithWords.map((word, index) => (
              <p key={index} className="w-1/3">
                {word}
              </p>
            ))}
          </div>
        </>
      )}
      {!!includesWords?.length && (
        <>
          <h4 className="my-4 text-lg">Words that contain "{q}":</h4>
          <div className="my-4 flex flex-wrap">
            {includesWords.map((word, index) => (
              <p key={index} className="w-1/3">
                {word}
              </p>
            ))}
          </div>
        </>
      )}
      {!!q && !startsWithWords?.length && !includesWords?.length && (
        <h4 className="my-4 text-lg">No results found for "{q}"</h4>
      )}
    </main>
  )
}
