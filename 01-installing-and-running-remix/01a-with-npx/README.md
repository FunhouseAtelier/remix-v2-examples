# 01a. Installing and Running Remix v2 With `npx`

## Installing

1. Open a terminal in the location where you want the project root folder to be created.

2. Enter the terminal command to create a new Remix v2 project.

```bash
npx create-remix@2
```

3. (If `create-remix` has not yet been installed) Enter `y` to proceed.

4. Enter the folder name for the new project.

5. Choose whether to initialize a new git repository.

6. Choose whether to install dependencies with npm.

## Running

### Development Environment

1. Open a terminal in the project root folder.

2. Enter the terminal command to run the app in a development environment.

```bash
npm run dev
```

### Production Environment

1. Open a terminal in the project root folder.

2. Enter the terminal command to build the production app.

```bash
npm run build
```

3. Enter the terminal command to run the app in a production environment.

```bash
npm run start
```

## Notes

- This method will generate the project in TypeScript, create `app/root.tsx` and `app/routes/_index.tsx` files with boilerplate code, install and import Tailwind CSS, initialize all configuration files with boilerplate code, and expose the server and client entry point files. All examples found in other sections (folders) of this repository start with this method of generating a new Remix project as a baseline.

## Remix Docs References

[Quick Start: Installation](https://remix.run/docs/en/main/start/quickstart#installation)
