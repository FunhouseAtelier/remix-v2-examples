/* 1. Import the Clerk components for signing in, signing out, signing up, conditional rendering and showing the user profile. */
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/remix'

export default function Index() {
  return (
    <main className="p-4 max-w-[900px]">
      <h1 className="my-4 text-3xl">Authentication With Clerk Components</h1>
      {/* 2. Add the `<SignedIn>` component to wrap content that will be rendered only if the user is authenticated. */}
      <SignedIn>
        <h2 className="my-4 text-2xl">You are signed in</h2>
        {/* 3. Add the `<UserButton />` component to render a button that will show the Clerk user profile when clicked. */}
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-12 w-12',
            },
          }}
        />
        {/* 4. Add the `<SignOutButton />` component to render a button that will end the user's session when clicked. */}
        <SignOutButton>
          <button className="my-4 block text-lg py-1 px-2 bg-violet-400 rounded-lg">
            LOG OUT
          </button>
        </SignOutButton>
      </SignedIn>
      {/* 5. Add the `<SignedOut>` component to wrap content that will be rendered only if the user is not authenticated. */}
      <SignedOut>
        <h2 className="my-4 text-2xl">You are not signed in</h2>
        {/* 6. Add the `<SignInButton />` component to render a button that will display the Clerk sign in form when clicked. */}
        <SignInButton>
          <button className="my-4 block text-lg py-1 px-2 bg-violet-400 rounded-lg">
            LOG IN
          </button>
        </SignInButton>
        {/* 7. Add the `<SignedUpButton />` component to render a button that will display the Clerk sign up form when clicked. */}
        <SignUpButton>
          <button className="my-4 block text-lg py-1 px-2 bg-violet-400 rounded-lg">
            SIGN UP
          </button>
        </SignUpButton>
      </SignedOut>
    </main>
  )
}
