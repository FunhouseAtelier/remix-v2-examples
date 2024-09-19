# 08-02-02b. Authentication With Custom Pages

## Starting Point

1. Replicate the result from **08-02-01a. Installing and Configuring Clerk**.

## Process

### Create `app/routes/sign-up.$.tsx`

1. Import the Clerk `SignUp` component.

```tsx
import { SignUp } from '@clerk/remix'
```

2. Add the `SignUp` component where the sign up form will appear.

```tsx
<SignUp />
```

### Create `app/routes/sign-in.$.tsx`

1. Import the Clerk `SignIn` component.

```tsx
import { SignIn } from '@clerk/remix'
```

2. Add the `SignIn` component where the sign in form will appear.

```tsx
<SignIn />
```

### Edit `.env`

1. Add environment variables for the sign up and sign in URLs, and their fallback URLs.

```bash
CLERK_SIGN_IN_URL="/sign-in"
CLERK_SIGN_UP_URL="/sign-up"
CLERK_SIGN_IN_FALLBACK_URL="/"
CLERK_SIGN_UP_FALLBACK_URL="/"
```

## Notes

- Make sure to place your environment variables in a `.env` file. Do not put them in the `.env.example` file.

## Expected Behavior

- When not authenticated, navigating to the `/sign-up` or `/sign-in` routes will show the corresponding Clerk form.

- When authenticated, navigating to the `/sign-up` or `/sign-in` routes will redirect back to the `/` root route.

- Clicking the "LOG OUT" button will end the session.

## Docs References

[Clerk Docs: SDK References: Remix: Custom Sign Up and Sing In Pages](https://clerk.com/docs/references/remix/custom-signup-signin-pages)
