import { useState } from 'react'
/* 1. Import the Remix `Link` component. */
import { Link } from '@remix-run/react'

export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {}
}

export default function Demo() {
  const [listItems, setListItems] = useState<string[]>([])

  const addListItem = () => {
    const newListItems = [...listItems, 'list item']
    setListItems(newListItems)
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl">Client-side Routing (demo)</h1>
      <div className="my-4">
        <a className="text-xl text-blue-500 hover:underline" href="/demo">
          Navigate to /demo (server-side routing)
        </a>
      </div>
      <div className="my-4 max-w-[900px]">
        {/* 3. Add the `Link` component to the TSX return value where the link will appear. */}
        <Link className="text-xl text-blue-500 hover:underline" to="/demo">
          Navigate to /demo (client-side routing)
        </Link>
      </div>
      <div className="mt-6 mb-4">
        <button
          className="text-lg py-1 px-2 bg-violet-400 rounded-lg"
          onClick={addListItem}
        >
          Add List Item
        </button>
      </div>
      <ol className="my-4 px-8 list-decimal">
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </main>
  )
}
