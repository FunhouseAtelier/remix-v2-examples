/* 1. Import the Clerk `SignIn` component. */
import { SignIn } from '@clerk/remix'

export default function SignInPage() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">Authentication With Custom Pages</h1>
      <h2 className="my-4 text-2xl">Sign In Page</h2>
      <div className="my-6 flex justify-center">
        {/* 2. Add the `SignIn` component where the sign in form will appear. */}
        <SignIn />
      </div>
    </main>
  )
}
