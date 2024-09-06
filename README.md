# Remix v2 Examples

## Introduction

These examples were created by Funhouse Atelier to demonstrate how to implement various techniques of the [Remix.run](https://remix.run/) version 2 framework and integrate other web technologies with it. They are available in a public repository on GitHub:

[https://github.com/FunhouseAtelier/remix-v2-examples](https://github.com/FunhouseAtelier/remix-v2-examples)

The examples in **01. Installing and Running Remix** are based on [the official Quick Start guide](https://remix.run/docs/en/main/start/quickstart), and the examples in sections 02-04 are based on the techniques demonstrated in [the official Remix Tutorial](https://remix.run/docs/en/main/start/tutorial). Those examples are not meant to be a replacement for the Quick Start guide or Remix Tutorial, which explain in greater depth how the techniques work, especially behind the scenes, and tie them all together into one example app. The Funhouse Atelier examples mentioned above are meant to simplify the demonstration of the same techniques, for ease of atomic reference and replication.

## Usage

The examples in this repository all follow a common pattern, with the following principles in mind:

- Document a step-by-step process to implement each technique of Remix or optional web technology integration that (except for **01. Installing and Running Remix**) assumes you are starting with a new Remix v2 project, created by using the **01a. With `npx`** method and default settings. The step-by-step instructions are found in the `README.md` file inside each example project root folder, and they are generally organized by the pathname of the file to be created or edited.

- Show the complete result of following all steps in the example project code, and include comments in the files to call out where each step can be found in the code, to make it clear how to replicate each technique in another Remix project.

- Include additional code for basic demonstration of the techniques, including hyperlinks, buttons, dynamic displays, and mock data sets. These are not an essential part of the step-by-step replication process.

- After the step-by-step instructions in the `README.md` files, include some notes of information that is good to know about the techniques and a description of the expected behavior of the basic demonstrations. For a more thorough explanation of the techniques and their options, there will be references to [the official Remix Docs](https://remix.run/docs/en/main).

Each example project folder has its own `package.json` file and NPM dependencies, but all `node_modules` folders are ignored by git, so to make the example code functional and remove any TypeScript warnings about unknown imports you must first open a terminal in the example project root folder and run the command `npm i` to install all NPM package dependencies.

## Outline

### 01. Installing and Running Remix

#### 01a. With `npx`

This method will generate the project in TypeScript, create `app/root.tsx` and `app/routes/_index.tsx` files with boilerplate code, install and import Tailwind CSS, initialize all configuration files with boilerplate code, and expose the server and client entry point files. All examples found in other sections (folders) of this repository start with this method of generating a new Remix project as a baseline.

#### 01b. With `remix-serve`

This method will generate the project from scratch, allowing you to manually customize any aspect of the installation or configuration, and relies on the default `remix-serve` to serve the project in a production environment with no configuration necessary on your part.

#### 01c. With Express

This method will generate the project from scratch, allowing you to manually customize any aspect of the installation or configuration, but it does not rely on the default `remix-serve` to serve the project in a production environment. Instead this example shows how to manually configure your own Express server.

### 02. Routing and Loading Data

#### 02a. `loader` and `redirect` Functions

How to use the Remix utility function `loader` to intercept a request at a route and the Remix utility function `redirect` to automatically forward the request to another route.

#### 02b. Client-side Routing

How to use the Remix `<Link>` component to perform client-side routing.

The demo shows the difference between client-side and server-side routing in terms of preserving or destroying React state.

#### 02c. Nested Routes

How to use the Remix `<Outlet />` component to display nested routes inside the layout of a parent route.

The demo shows how the nested route view changes when navigating to a nested route, while preserving the layout of the parent route, and how the parent route defaults to showing `_index` as the nested route. It also shows how to avoid the default behavior of route nesting.

#### 02d. Dynamic Routes

How to use dynamic routes to load and display data based on the dynamic route segment of the URL.

The demo shows how the nested dynamic route changes when changing the text in the dynamic route segment of the URL, using hard-coded mock data to simulate various users' information that would normally be stored in a database. It also shows how to handle cases when the text from the dynamic route segment of the URL is missing or there is no record in the mock data that matches it.

#### 02e. Pending UI

How to use the Remix `useNavigation` hook to track the navigation state (i.e., idle, loading data, or submitting a form) in order to visibly convey that state to the user.

The demo shows the same delayed fading effect used in the Remix Tutorial, and it allows you to toggle the pending UI effect on and off for comparison.

#### 02f. Active Link Styling

How to use the Remix `<NavLink>` component to conditionally style a navigation link when the route it links to is loading or currently being viewed.

The demo shows how to combine the conditional style classes with static classes, and it uses a similar delayed transition as the pending UI effect. The Remix Tutorial uses a fancier animation for a pending navigation link that was beyond the scope of this example repository, which uses only Tailwind CSS utility classes, no custom CSS.

### 03. Forms and Data Mutation

#### 03a. `<Form>` Component and `action` Function

#### 03b. Updating Data and Form Error Handling

#### 03c. Relative Form Actions and Destroy

#### 03d. Forms Without Navigation and Optimistic UI

Mock-up: CartPartner

### 04. Search Functionality

- `URLSearchParams` and `GET` Submissions
- Synchronizing URLs to Form State
- Submitting `Form`'s `onChange`
- Adding Search Spinner
- Managing the History Stack

Mock-up: Giggle Search

### 05. `<head>` Child Components

- adding meta tags with `Meta`
- adding stylesheets with `Links`

### 06. Deployment

#### With Vercel

### 07. Database Integration

#### With Prisma

##### With MongoDB

### 08. User Auth

#### With Remix Auth

#### With Clerk
