import { Link } from '@remix-run/react'

export default function Demo() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="text-3xl">Adding Stylesheets with links (demo)</h1>
      <div className="my-4">
        <Link className="text-xl text-blue-800 hover:underline" to="/home">
          Navigate to /home
        </Link>
      </div>
    </main>
  )
}
