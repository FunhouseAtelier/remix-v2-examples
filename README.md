# Remix v2 Examples

## Introduction

These examples were created by Funhouse Atelier to demonstrate how to implement various features of the [Remix](https://remix.run/) version 2 framework and integrate other web technologies with it. They are available in a public repository on GitHub:

[https://github.com/FunhouseAtelier/remix-v2-examples](https://github.com/FunhouseAtelier/remix-v2-examples)

The examples in **1. Installing and Running Remix** are based on [the official Quick Start guide](https://remix.run/docs/en/main/start/quickstart), and the examples in sections 2-4 are based on the techniques demonstrated in [the official Remix Tutorial](https://remix.run/docs/en/main/start/tutorial). Those examples are not meant to be a replacement for the Quick Start guide or Remix Tutorial, which explain in greater depth how the features work, especially behind the scenes, and tie them all together into one example app. The Funhouse Atelier examples mentioned above are meant to simplify the demonstration of the same features, for ease of atomic reference and replication.

## Usage

The examples in this repo all follow a common pattern, with the following principles in mind:

- Document a step-by-step process to implement each feature of Remix or optional web technology integration that (except for **1. Installing and Running Remix**) assumes you are starting with a new Remix v2 project, created by using the **With `npx`** method and default settings. The step-by-step instructions are found in the `README.md` file for each example.

- Show the complete result of following all steps in the example project code, and include comments in the files to call out where each step can be found in the code, to make it clear how to replicate each feature in another project.

- Include additional code for basic demonstration of the features, including hyperlinks, buttons, dynamic displays, and mock data sets. These are not a part of the step-by-step replication process, and in order to make them functional for each example project you will first need to install the package dependencies by opening a terminal in the example project root folder and running the command `npm i`. This will also remove any TypeScript warnings about unknown imports.

- After the step-by-step instructions in the `README.md` files, include some notes of information that is good to know about the features and a description of the expected behavior of the basic demonstrations. For a more thorough explanation of the features and their options, there will be references to [the official Remix Docs](https://remix.run/docs/en/main).

## Outline

### 1. Installing and Running Remix

#### With `npx`

#### With `remix-serve`

#### With Express

### 2. Routing, Navigation, and Layout

Facebird Messenger

- active link styling
- client-side routing
- dynamic route segments
- nested routes and outlets
- index routes

### 3. Forms and CRUD Operations

Shopping List App

- data manipulation
- deleting records
- pending/optimistic UI
- loading data
- URL params in loaders
- `Form`s Without Navigation

### 4. Search Functionality

Giggle Search

- `URLSearchParams` and `GET` Submissions
- Synchronizing URLs to Form State
- Submitting `Form`'s `onChange`
- Adding Search Spinner
- Managing the History Stack

### 5. `<head>` Child Components

- adding meta tags with `Meta`
- adding stylesheets with `Links`

### 6. Deployment

#### With Vercel

### 7. Database Integration

#### With Prisma

##### With MongoDB

### 8. User Auth

#### With Remix Auth

#### With Clerk
