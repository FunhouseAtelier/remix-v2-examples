# Remix v2 Examples

## Introduction

These examples were created by Funhouse Atelier to demonstrate how to implement various techniques of the [Remix](https://remix.run/) version 2 framework and integrate other web technologies with it. They are available in a public repository on GitHub:

[https://github.com/FunhouseAtelier/remix-v2-examples](https://github.com/FunhouseAtelier/remix-v2-examples)

The examples in **01. Installing and Running Remix** are based on [the official Quick Start guide](https://remix.run/docs/en/main/start/quickstart), and the examples in sections 2-4 are based on the techniques demonstrated in [the official Remix Tutorial](https://remix.run/docs/en/main/start/tutorial). Those examples are not meant to be a replacement for the Quick Start guide or Remix Tutorial, which explain in greater depth how the techniques work, especially behind the scenes, and tie them all together into one example app. The Funhouse Atelier examples mentioned above are meant to simplify the demonstration of the same techniques, for ease of atomic reference and replication.

## Usage

The examples in this repository all follow a common pattern, with the following principles in mind:

- Document a step-by-step process to implement each technique of Remix or optional web technology integration that (except for **01. Installing and Running Remix**) assumes you are starting with a new Remix v2 project, created by using the **With `npx`** method and default settings. The step-by-step instructions are found in the `README.md` file for each example.

- Show the complete result of following all steps in the example project code, and include comments in the files to call out where each step can be found in the code, to make it clear how to replicate each technique in another project.

- Include additional code for basic demonstration of the techniques, including hyperlinks, buttons, dynamic displays, and mock data sets. These are not a part of the step-by-step replication process, and in order to make them functional for each example project you will first need to install the package dependencies by opening a terminal in the example project root folder and running the command `npm i`. This will also remove any TypeScript warnings about unknown imports.

- After the step-by-step instructions in the `README.md` files, include some notes of information that is good to know about the techniques and a description of the expected behavior of the basic demonstrations. For a more thorough explanation of the techniques and their options, there will be references to [the official Remix Docs](https://remix.run/docs/en/main).

## Outline

### 01. Installing and Running Remix

#### With `npx`

This method will generate the project in TypeScript, create `app/root.tsx` and `app/routes/_index.tsx` files with boilerplate code, install and import Tailwind CSS, initialize all configuration files with boilerplate code, and expose the server and client entry point files. All examples found in other sections (folders) of this repository start with this method of generating a new Remix project as a baseline.

#### With `remix-serve`

This method will generate the project from scratch, allowing you to manually customize any aspect of the installation or configuration, and relies on the default `remix-serve` server to serve the project in a production environment with no configuration necessary on your part.

#### With Express

This method will generate the project from scratch, allowing you to manually customize any aspect of the installation or configuration, but it does not rely on the default `remix-serve` to serve the project in a production environment. Instead this example shows how to manually configure your own Express server.

### 02. Routing and Loading Data

#### 02a. Loader and Redirect

#### 02b. Client-side Routing

#### 02c. Nested Static Routes

#### 02d. Nested Dynamic Routes

#### 02e. Loading Data With URL Params

#### 02f. Active Link Styling

#### 02z. Facebird Messenger

### 03. Forms and Data Manipulation

CartPartner

- data manipulation
- deleting records
- pending/optimistic UI
- `Form`s Without Navigation (checkbox)

### 04. Search Functionality

Giggle Search

- `URLSearchParams` and `GET` Submissions
- Synchronizing URLs to Form State
- Submitting `Form`'s `onChange`
- Adding Search Spinner
- Managing the History Stack

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
