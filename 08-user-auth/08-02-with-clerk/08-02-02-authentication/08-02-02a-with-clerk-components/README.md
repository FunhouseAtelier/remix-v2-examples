# 08-02-02a. Authentication With Clerk Components

## Starting Point

1. Replicate the result from **08-02-01a. Installing and Configuring Clerk**.

## Process

### Edit `app/routes/_index.tsx`

1. Import the Clerk components for signing in, signing out, signing up, conditional rendering and showing the user profile.

```tsx
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/remix'
```

2. Add the `<SignedIn>` component to wrap content that will be rendered only if the user is authenticated.

```tsx
<SignedIn>
  <h2>You are signed in</h2>
  {/* other content */}
</SignedIn>
```

3. Add the `<UserButton>` component to render or wrap a button that will show the Clerk user profile when clicked.

```tsx
<UserButton />
```

4. Add the `<SignOutButton>` component to render or wrap a button that will end the user's session when clicked.

```tsx
<SignOutButton>
  <button>LOG OUT</button>
</SignOutButton>
```

5. Add the `<SignedOut>` component to wrap content that will be rendered only if the user is not authenticated.

```tsx
<SignedIn>
  <h2>You are not signed in</h2>
  {/* other content */}
</SignedIn>
```

6. Add the `<SignInButton>` component to render or wrap a button that will display the Clerk sign in form when clicked.

```tsx
<SignInButton>
  <button>LOG IN</button>
</SignInButton>
```

7. Add the `<SignedUpButton>` component to render or wrap a button that will display the Clerk sign up form when clicked.

```tsx
<SignUpButton />
```

## Notes

- The instructions above show the button components as stand-alone or with an embedded `<button>` element to change the default text to "LOG IN" or "LOG OUT". The example code uses embedded `<button>` elements in all cases except `<UserButton />` to style the demonstration.

- In the example code for the `<UserButton />` the Clerk `appearance` prop is used to apply Tailwind classes to enlarge the thumbnail icon. For more information about how to use this prop, see the **Clerk Docs: Customization: Appearance Prop: Overview** reference below.

## Expected Behavior

- When not authenticated, the content wrapped inside the `<SignedOut>` component will be rendered. Use the "SIGN UP" or "LOG IN" button to navigate to the deafult Clerk form page and use whichever auth strategy you configured in the Clerk App. These pages have links to each other at the bottom of the form to switch between logging in and signing up.

- When authenticated, the content wrapped inside the `<SignedIn>` component will be rendered. A user avatar image will be displayed, which is a button that can be used to view your Clerk user profile for this app. There is also a button to "LOG OUT", which will end the session and change back to the not authenticated view of the page.

## Docs References

[Clerk Docs: Remix Quickstart: Protect Your Pages: Client Side](https://clerk.com/docs/quickstarts/remix#client-side)

[Clerk Docs: Customization: Appearance Prop: Overview](https://clerk.com/docs/customization/overview)
