# 02c. Nested Routes

### Starting Point

1. Replicate the result from **02a. Loader and Redirect**.

## Process

### `app/routes/demo_.not-nested.tsx`

1. Create the `app/routes/demo_.not-nested.tsx` file.

2. Export, as the default, a React function component that will be rendered in its own layout when navigating to the `/demo/not-nested` route.

### `app/routes/demo._index.tsx`

1. Create the `app/routes/demo._index.tsx` file.

2. Export, as the default, a React function component that will be rendered in place of the `<Outlet />` component when navigating to the `/demo` route.

### `app/routes/demo.introduction.tsx`

1. Create the `app/routes/demo.introduction.tsx` file.

2. Export, as the default, a React function component that will be rendered in place of the `<Outlet />` component when navigating to the `/demo/introduction` route.

### `app/routes/demo.chapter1.tsx`

1. Create the `app/routes/demo.chapter1.tsx` file.

2. Export, as the default, a React function component that will be rendered in place of the `<Outlet />` component when navigating to the `/demo/chapter1` route.

### `app/routes/demo.tsx`

1. Import the Remix `<Link>` and `<Outlet />` components.

2. Export, as the default, a React function component.

3. Use the `<Link>` component to perform client-side routing to the not-nested route.

```tsx
<Link to="/demo/not-nested">Navigate to /demo/not-nested</Link>
```

4. Use the `<Link>` component to perform client-side routing to the nested routes.

```tsx
<Link to="/demo/introduction">Introduction</Link>
<Link to="/demo/chapter1">Chapter 1</Link>
```

5. Add the `<Outlet />` component to the TSX return value where the nested routes will appear.

```tsx
<Outlet />
```

## Notes

- An `<Outlet />` component can also be used in any nested route file except for an `_index` route, which allows for multiple levels of route nesting, and when combined with client-side routing this easily emulates the behavior of SPAs (single-page apps).

## Expected Behavior

- When navigating to the `/demo` route the browser's address bar should show `<BASE_URL>/demo` and the "Nested Route View" should contain the React function component exported, as the default, from `app/routes/demo._index.tsx`.

- When navigating to the `/demo/not-nested` route the browser's address bar should show `<BASE_URL>/demo/not-nested` and the route will be rendered in its own layout, independent of the `/demo` route layout.

- Clicking the "Introduction" link will navigate the browser to `<BASE_URL>/demo/introduction` and the "Nested Route View" should contain the React function component exported, as the default, from `app/routes/demo.introduction.tsx`.

- Clicking the "Chapter 1" link will navigate the browser to `<BASE_URL>/demo/chapter1` and the "Nested Route View" should contain the React function component exported, as the default, from `app/routes/demo.chapter1.tsx`.

## Remix Docs References

[Remix Tutorial: Nested Routes and Outlets](https://remix.run/docs/en/main/start/tutorial#nested-routes-and-outlets)
