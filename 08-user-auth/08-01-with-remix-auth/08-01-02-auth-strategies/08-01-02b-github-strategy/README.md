# 08-01-02b. Remix Auth Github Strategy

## Starting Point

1. Create a new GitHub App.

2. Replicate the result from **08-01-01a. Installing and Configuring Remix Auth**.

## Process

### In the project root folder

1. Enter the terminal command to install the Remix Auth GitHub Strategy package.

```bash
npm i remix-auth-github
```

### Edit `.env`

1. Add environment variables for your new GitHub App's client ID and client secret.

```bash
GITHUB_CLIENT_ID="<YOUR_CLIENT_ID>"
GITHUB_CLIENT_SECRET="<YOUR_CLIENT_SECRET>"
```

### Edit `app/services/auth.server.ts`

1. Import the GitHub strategy class.

```ts
import { GitHubStrategy } from 'remix-auth-github'
```

2. Instantiate the GitHub strategy with the required options and a function that returns the user data to be stored in the session object.

```ts
const gitHubStrategy = new GitHubStrategy(
  {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    redirectURI: 'http://localhost:5173/auth/github/callback',
  },
  async ({ profile, tokens, request, context }) => {
    return { email: profile.emails[0].value }
  }
)
```

3. Configure the authenticator instance to use the GitHub strategy.

```ts
auth.use(gitHubStrategy, 'github')
```

### Create `app/routes/auth/github/login`

1. Import the Remix Auth authenticator instance.

```ts
import { auth } from '~/services/auth.server'
```

2. Export an `action` function that calls the `.authenticate()` method of the authenticator instance.

```ts
export async function action({ request }: ActionFunctionArgs) {
  return auth.authenticate('github', request)
}
```

### Create `app/routes/auth/github/callback`

1. Import the Remix Auth authenticator instance.

```ts
import { auth } from '~/services/auth.server'
```

2. Export a `loader` function that calls the `.authenticate()` method of the authenticator instance.

```ts
export async function loader({ request }: LoaderFunctionArgs) {
  return auth.authenticate('github', request, {
    successRedirect: '/',
    failureRedirect: '/',
  })
}
```

### Edit `app/routes/_index.tsx`

1. Import the Remix `<Form />` component.

```tsx
import { Form } from '@remix-run/react'
```

2. Modify the "logged in" view to include a form that will navigate to the `/auth/logout` route to end the session.

```tsx
<Form method="post" action="/auth/logout">
  <button type="submit">Log Out</button>
</Form>
```

3. Modify the "not logged in" view to include a form that will navigate to the `/auth/github/login` route. If there is a session error message that indicates why the last authentication attempt failed, display it below the submit button.

```tsx
<Form method="post" action="/auth/github/login">
  <button type="submit">Log In With GitHub</button>
  <div>{sessionError?.message ?? null}</div>
</Form>
```

## Notes

- Use the relative route `/auth/github/callback` as the callback URL in the settings for the GitHub App and change "Permissions & events" to allow sharing a user's email addresses.

## Expected Behavior

- When attempting to log in with GitHub for the first time, GitHub will ask for confirmation to allow the GitHub account and email information to be shared with the app, then redirect the to callback URL which will complete the authentication process and update the session storage.

- Clicking the "Log Out" button will end the session and switch the view to the log in form.

## Docs References

[GitHub: sergiodxa/remix-auth-github](https://github.com/sergiodxa/remix-auth-github)
