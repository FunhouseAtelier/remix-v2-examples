#### 05b. Adding Metadata with `meta`

## Starting Point

1. Replicate the result from **02a. `loader` and `redirect` Functions**.

## Process

### View `app/root.tsx`

1. Note that the Remix `<Meta />` component was imported.

```tsx
import { Meta } from '@remix-run/react'
```

2. Note that a `meta` function was exported, with a return value that is an array of objects where each object represents a `<meta>` or `<title>` element to add as a child of the `<head>` element, wherever the `<Meta />` component is placed. The objects key-value pairs represent the attribute-value pairs of the HTML element.

```tsx
export const meta: MetaFunction = () => {
  return [{ title: 'Adding Metadata with meta' }]
}
```

3. Note that some `<meta>` tags were added as children of the `<head>` element without using the Remix `meta` function.

```tsx
<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

4. Note that the Remix `<Meta />` component was added as a child of the `<head>` element.

```tsx
<Meta />
```

### Edit `app/routes/demo.tsx`

1. Export a `meta` function including data to create a new meta element with only a description.

```tsx
export const meta: MetaFunction = () => {
  return [{ description: 'This is a demonstration page' }]
}
```

### Create `app/routes/home.tsx`

1. Export a `meta` function including data to create a new meta element with a title and a description.

```tsx
export const meta: MetaFunction = () => {
  return [{ title: 'Home' }, { description: 'This is a stubbed-out home page' }]
}
```

## Notes

- Unlike `links` functions, the elements created by `meta` functions entirely override any created by parent rout segments, they do not merge together. This is why some `<meta>` elements are manually added to the `<head>` element in `app/root.tsx`, to ensure that they will be applied app-wide and never overridden.

## Expected Behavior

- Navigating to the `/demo` route will show a page with no title. Even though a title is exported from the `meta` function in `app/root.tsx`, it is overriden by the export from the `meta` function in `app/routes/demo.tsx`, which only exports a description.

- Navigating to the `/home` route will show a page with the title of "Home", according to the `meta` function exported from `app/routes/home.tsx`.

## Remix Docs References

[Route Module: meta](https://remix.run/docs/en/main/route/meta)
