/* 1. Import the Clerk `SignUp` component. */
import { SignUp } from '@clerk/remix'

export default function SignUpPage() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">Authentication With Custom Pages</h1>
      <h2 className="my-4 text-2xl">Sign Up Page</h2>
      <div className="my-6 flex justify-center">
        {/* 2. Add the `SignUp` component where the sign up form will appear. */}
        <SignUp />
      </div>
    </main>
  )
}
