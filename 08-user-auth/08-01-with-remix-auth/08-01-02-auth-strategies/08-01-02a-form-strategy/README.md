# 08-01-02a. Remix Auth Form Strategy

## Starting Point

1. Replicate the result from **08-01-01a. Installing and Configuring Remix Auth**.

## Process

### In the project root folder

1. Enter the terminal command to install the Remix Auth Form Strategy package.

```bash
npm i remix-auth-form
```

### Edit `app/services/auth.server.ts`

1. Import the Remix Auth authentication error class and the form strategy class.

```ts
import { AuthorizationError } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
```

2. Instantiate the form strategy with logic that determines if the credentials are valid, then returns the user data to be stored in the session object.

```ts
const formStrategy = new FormStrategy(async ({ form }) => {
  const { email, password } = Object.fromEntries(form)

  if (!email || typeof email !== 'string') {
    throw new AuthorizationError('Please enter an email address.')
  }
  if (!password || typeof password !== 'string') {
    throw new AuthorizationError('Please enter a password.')
  }
  if (!email.includes('@example.com') || password !== 'abc123') {
    throw new AuthorizationError(
      'That email and password combination is invalid.'
    )
  }
  return { email }
})
```

3. Configure the authenticator instance to use the form strategy.

```ts
auth.use(formStrategy, 'form')
```

### Create `app/routes/auth.form.login.ts`

1. Import the Remix Auth authenticator instance.

```ts
import { auth } from '~/services/auth.server'
```

2. Export an `action` function that calls the `.authenticate()` method of the authenticator instance.

```ts
export const action = async ({ request }: ActionFunctionArgs) => {
  await auth.authenticate('form', request, {
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

3. Modify the "not logged in" view to include a form that will submit the provided credentials to the `/auth/form/login` route. If there is a session error message that indicates why the last authentication attempt failed, display it below the submit button.

```tsx
<Form method="post" action="/auth/form/login">
  <div>
    <label htmlFor="email">Email Address</label>
    <input type="email" name="email" id="email" />
  </div>
  <div>
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" />
  </div>
  <button type="submit">Log In</button>
  <div className="h-6">{sessionError?.message ?? null}</div>
</Form>
```

## Notes

- Multiple different form strategies can be used in the same Remix app if you give them all unique names in place of `'form'`.

## Expected Behavior

- If attempting to log in with an email address that contains "@example.com" with the password "abc123", the authentication will succeed and the view will change to show the user is logged in and what email address is in the session storage.

- If attempting to log in with an email address that does not contain "@example.com" or with a password other than "abc123", a message will appear to say that the credentials are invalid.

- If attempting to log in without entering an email address or without entering a password a message will appear to ask for the missing credential.

- Clicking the "Log Out" button will end the session and switch the view to the log in form.

## Docs References

[GitHub: sergiodxa/remix-auth-form](https://github.com/sergiodxa/remix-auth-form)
