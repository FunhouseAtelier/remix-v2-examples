#### 05a. Adding Stylesheets with `links`

## Starting Point

1. Replicate the result from **02a. `loader` and `redirect` Functions**.

## Process

### Create `app/styles/app.css`

1. Add styles that will be applied everywhere in the app.

```css
body {
  background-color: grey;
}
```

### Create `app/styles/home.css`

1. Add styles that will be applied only on the home page. (Can you get the background in cornflower blue? Absolutely.)

```css
body {
  background-color: cornflowerblue;
}
```

### Edit `app/root.tsx`

1. Import the `href` value of the app-wide stylesheet from the CSS file with `?url` appended at the end.

```tsx
import appStylesHref from '~/styles/app.css?url'
```

2. Export a `links` function that returns and array of objects where each object represents a `<link>` element to add as a child of the `<head>` element of every route in the app. The object's key-value pairs represent the attribute-value pairs of the HTML element.

```tsx
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: appStylesHref },
]
```

### Create `app/routes/home.tsx`

1. Import the `href` value of the home page stylesheet from the CSS file with `?url` appended at the end.

```tsx
import homeStylesHref from '~/styles/home.css?url'
```

2. Export a `links` function that returns and array containing an object that represents the `<link>` element for the home page stylesheet.

```tsx
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: homeStylesHref },
]
```

3. Export, as the default, a React function component to render the home page.

```tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to the home page</h1>
    </main>
  )
}
```

## Notes

- The `?url` appended to the stylesheet filenames is technically unnecessary, as the styles will be applied even if it is omitted, but it prevents error messages in the browser console about the file having no default export.

- All exported `links` functions in a route's segments will be used to create `<link>` elements, so they are all merged together, and the ones created by parent segments will be injected into the `<head>` element before any of their child segments inject theirs.

## Expected Behavior

- Navigating to the `/demo` route will show a page with a grey background. Although the `/app/routes/demo.tsx` file does not import any stylesheets or export any `links` function, the global stylesheet used in `/app/root.tsx` is applied to all routes.

- Navigating to the `/home` route will show a page with a cornflower blue background. This overrides the app-wide styles because as a child segment of the `/` (root) route, the `<link>` element created by the `links` function will appear after the one created by the `links` function in `/app/root.tsx`.

## Remix Docs References

[Quick Start: Adding Stylesheets with links](https://remix.run/docs/en/main/start/tutorial#adding-stylesheets-with-links)
