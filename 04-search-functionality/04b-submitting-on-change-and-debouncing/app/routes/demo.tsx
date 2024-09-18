import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getSearchResults } from '~/services/mock-data.server'
import { useEffect } from 'react'
/* 1. Import the Remix `useSubmit` and React `useRef` hooks. */
import { useSubmit } from '@remix-run/react'
import { useRef } from 'react'

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
  const { q, startsWithWords, includesWords } = useLoaderData<typeof loader>()
  /* 2. Assign an instance of `useSubmit()` to a variable. */
  const submit = useSubmit()
  /* 3. Assign and instance of `useRef()` to a variable, which will be used to track the ID of the current debouncing timeout. */
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const searchField = document.getElementById('q')
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || ''
    }
  }, [q])
  /* 4. Add a function to handle submission of the form any time the form data changes and perform debouncing so that the submissions only happen if there has been no change in the last half-second, indicating that the user has finished typing. */
  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(submit.bind(null, event.currentTarget), 500)
  }
  /* 5. Add a React effect that watches for changes to the debouncing timeout ID tracker and returns a clean-up function to clear the current timeout, in order to prevent memory leaks. */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [timeoutRef])

  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Submitting On Change and Debouncing (demo)</h1>
      <h2 className="my-6 text-2xl text-center px-2 py-1 border-2 border-solid border-yellow-500 rounded-lg">
        Mister Diction
      </h2>
      {/*  */}
      <Form
        role="search"
        className="my-4 flex gap-2 items-center"
        onChange={handleChange}
      >
        <input
          id="q"
          type="search"
          name="q"
          placeholder={`Search for words containing...`}
          className="grow border-2 border-solid border-teal-500 rounded-lg py-1 px-2"
          autoFocus
        />
        {/* 7. Remove the submit button, as it is no longer necessary and if used would add duplicate entires to the history stack. */}
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
