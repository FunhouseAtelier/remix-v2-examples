import { SignUp } from '@clerk/remix'

export default function SignUpPage() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">
        Conditional Routing Based on Authentication
      </h1>
      <h2 className="my-4 text-2xl">Sign Up Page</h2>
      <div className="my-6 flex justify-center">
        <SignUp />
      </div>
    </main>
  )
}
