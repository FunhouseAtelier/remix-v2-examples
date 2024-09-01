# 01c. Installing And Running Remix v2 With Express

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
npm i @remix-run/node @remix-run/react isbot@4 react react-dom express @remix-run/express cross-env
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

11. Create a `server.js` file and add the boilerplate code.

```js
import { createRequestHandler } from '@remix-run/express'
import express from 'express'

const viteDevServer =
  process.env.NODE_ENV === 'production'
    ? null
    : await import('vite').then((vite) =>
        vite.createServer({
          server: { middlewareMode: true },
        })
      )

const app = express()
app.use(
  viteDevServer ? viteDevServer.middlewares : express.static('build/client')
)

const build = viteDevServer
  ? () => viteDevServer.ssrLoadModule('virtual:remix/server-build')
  : await import('./build/server/index.js')

app.all('*', createRequestHandler({ build }))

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000')
})
```

## Running

### Development Environment

1. In the `package.json` file merge the entry to run the app in development mode.

```json
{
  "scripts": {
    "dev": "node ./server.js"
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
    "start": "cross-env NODE_ENV=production node ./server.js"
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

- This method will generate the project from scratch, allowing you to manually customize any aspect of the installation or configuration, but it does not rely on the default `remix-serve` to serve the project in a production environment. Instead this example shows how to manually configure your own Express server.

- The steps are almost the same as those for **Installing and Running Remix v2 With `remix-serve`**, with the following exceptions:

  - **Installing, step 3:** the runtime dependencies are different.
  - **Installing, step 11:** this step is unique to manually configuring your own Express server.
  - **Running, Development Environment, step 1:** the terminal command to run the development app is different.
  - **Running, Production Environment, step 1:** the terminal command to run the production app is different.

- The boilerplate code for `server.js` includes configuring Vite to perform hot reloads during development. If you want to run the Express server without the Vite hot reload functionality, refer to the **Quick Start: Bring Your Own Server** link below and use the boilerplate code from the first code snippet for `server.js`.

## Remix Docs References

[Quick Start: Installation](https://remix.run/docs/en/main/start/quickstart#installation)

[Quick Start: Bring Your Own Server](https://remix.run/docs/en/main/start/quickstart#bring-your-own-server)
