# 08-02-03b. Conditional Routing Based on Authorization

## Starting Point

1. Replicate the result from **08-02-02b. Authentication With Custom Pages**.

## Process

### Create `app/routes/admin-only.tsx`

## Notes

## Expected Behavior

- When not authenticated, navigating to the `/sign-up` or `/sign-in` routes will show the corresponding Clerk form.

- When authenticated, navigating to the `/sign-up` or `/sign-in` routes will redirect back to the `/` root route.

## Docs References

[Clerk Docs: SDK References: Remix: Read Session Data](https://clerk.com/docs/references/remix/read-session-data)
