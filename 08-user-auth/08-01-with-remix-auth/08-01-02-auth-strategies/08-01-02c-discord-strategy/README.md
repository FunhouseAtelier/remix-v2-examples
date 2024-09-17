# 08-01-02c. Remix Auth Discord Strategy

## Starting Point

1. Create a new Discord App.

2. Replicate the result from **08-01-01a. Installing and Configuring Remix Auth**.

===

## Process

### In the project root folder

1. Enter the terminal command to install the Remix Auth Discord Strategy package.

```bash
npm i remix-auth-discord
```

### Edit `.env`

1. Add environment variables for your new Discord App's client ID and client secret.

```bash
DISCORD_CLIENT_ID="<YOUR_CLIENT_ID>"
DISCORD_CLIENT_SECRET="<YOUR_CLIENT_SECRET>"
```

### Edit `app/services/auth.server.ts`

1. Import the Discord strategy class.

```ts
import { DiscordStrategy } from 'remix-auth-discord'
```

2. Instantiate the Discord strategy with the required options and a function that returns the user data to be stored in the session object.

```ts
const discordStrategy = new DiscordStrategy(
  {
    clientID: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    callbackURL: 'http://localhost:5173/auth/discord/callback',
    scope: ['identify', 'email', 'guilds'],
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    return { email: profile.__json.email as string }
  }
)
```

3. Configure the authenticator instance to use the Discord strategy.

```ts
auth.use(discordStrategy, 'discord')
```

### Create `app/routes/auth/discord/login`

1. Import the Remix Auth authenticator instance.

```ts
import { auth } from '~/services/auth.server'
```

2. Export an `action` function that calls the `.authenticate()` method of the authenticator instance.

```ts
export async function action({ request }: ActionFunctionArgs) {
  return auth.authenticate('discord', request)
}
```

### Create `app/routes/auth/discord/callback`

1. Import the Remix Auth authenticator instance.

```ts
import { auth } from '~/services/auth.server'
```

2. Export a `loader` function that calls the `.authenticate()` method of the authenticator instance.

```ts
export async function loader({ request }: LoaderFunctionArgs) {
  return auth.authenticate('discord', request, {
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

3. Modify the "not logged in" view to include a form that will navigate to the `/auth/discord/login` route. If there is a session error message that indicates why the last authentication attempt failed, display it below the submit button.

```tsx
<Form method="post" action="/auth/discord/login">
  <button type="submit">Log In With Discord</button>
  <div>{sessionError?.message ?? null}</div>
</Form>
```

## Notes

- Use the relative route `/auth/discord/callback` as the callback URL in the settings for the Discord OAuth2 App.

## Expected Behavior

- When attempting to log in with Discord for the first time, Discord will ask for confirmation to allow the Discord account and scoped information to be shared with the app, then redirect the to callback URL which will complete the authentication process and update the session storage.

- Clicking the "Log Out" button will end the session and switch the view to the log in form.

## Docs References

[GitHub: JonnyBnator/remix-auth-discord](https://github.com/JonnyBnator/remix-auth-discord)
