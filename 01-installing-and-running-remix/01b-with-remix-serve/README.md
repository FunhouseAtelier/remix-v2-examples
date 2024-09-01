# 01b. Installing and Running Remix v2 With `remix-serve`

## Installing

1. Open a terminal in the location where you want the project root folder to be created.

2. Enter the terminal commands to create the project folder, navigate into the folder, and initialize NPM.

```bash
mkdir <PROJECT_FOLDER_NAME>
cd <PROJECT_FOLDER_NAME>
npm init -y
```

3. Enter the terminal command to install all runtime dependencies.

```bash
npm i @remix-run/node @remix-run/react @remix-run/serve isbot@4 react react-dom
```

4. Enter the terminal command to install all development dependencies.

```bash
npm i -D @remix-run/dev vite
```

5. Create a `vite.config.js` file and add the boilerplate code.

```js
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [remix()],
})
```

6. Create an `app` folder.

7. Create an `app/root.jsx` file and add the boilerplate code.

```jsx
import { Links, Meta, Outlet, Scripts } from '@remix-run/react'

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  )
}
```

8. In the `package.json` file merge the entry to specify that the app treats JavaScript files as modules.

```json
{
  "type": "module"
}
```

9. (OPTIONAL) Enter the terminal command to reveal the server and browser entry point files.

```bash
npx remix reveal
```

10. (OPTIONAL) If you will create a git repository for this project, create a `.gitignore` file and add the boilerplate code.

```
node_modules

/.cache
/build
.env
```

## Running

### Development Environment

1. In the `package.json` file merge the entry to run the app in development mode.

```json
{
  "scripts": {
    "dev": "remix vite:dev"
  }
}
```

2. Open a terminal in the project root folder.

3. Enter the terminal command to run the app in a development environment.

```bash
npm run dev
```

### Production Environment

1. In the `package.json` file merge the entries to build and run the app in production mode.

```json
{
  "scripts": {
    "build": "remix vite:build",
    "start": "remix-serve ./build/server/index.js"
  }
}
```

2. Open a terminal in the project root folder.

3. Enter the terminal command to build the app for production.

```bash
npm run build
```

4. Enter the terminal command to run the production app.

```bash
npm run start
```

## Notes

- This method will generate the project from scratch, allowing you to manually customize any aspect of the installation or configuration, and relies on the default `remix-serve` to serve the project in a production environment with no configuration necessary on your part.

## Remix Docs References

[Quick Start: Installation](https://remix.run/docs/en/main/start/quickstart#installation)
