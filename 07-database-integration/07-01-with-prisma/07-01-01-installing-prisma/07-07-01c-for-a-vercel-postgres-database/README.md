# 07-01-01c. Installing Prisma For a Vercel Postgres Database

## Starting Point

1. Create a new Postgres database on Vercel.

2. Replicate the result from **01a. Installing and Running Remix v2 With `npx`**.

## Process

### In the Project Root Folder

1. Enter the terminal command to install the Prisma CLI as a development dependency.

```bash
npm i -D prisma
```

2. Enter the terminal command to install the Prisma client and Neon adapter packages.

```bash
npm i @prisma/client @prisma/adapter-neon @neondatabase/serverless
```

3. Enter the terminal command to initialize the Prisma ORM for a PostgrSQL database.

```bash
npx prisma init
```

### Edit `.env`

1. Remove the `DATABASE_URL` environment variable.

2. Add environment variables for `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`.

```bash
POSTGRES_PRISMA_URL="postgres://user:password@host-pooler.region.postgres.vercel-storage.com:5432/name?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://user:password@host.region.postgres.vercel-storage.com:5432/name"
```

### Edit `package.json`

1. Merge an entry to automatically regenerate the Prisma client at build time.

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Edit `prisma/schema.prisma`

1. Change the `generator client` definition to include the `previewFeatures` setting.

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}
```

2. Change the `datasource db` definition to include the `url` and `directUrl` settings.

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("POSTGRES_PRISMA_URL")
  directUrl = env("POSTGRES_URL_NON_POOLING")
}
```

3. Add `User` and `Post` data models, where `User` has a one-to-many relation with `Post` as the `author`.

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### In the Project Root Folder

1. Enter the terminal command to migrate the Vercel Postgres database with the schema defined above.

```bash
npx prisma migrate dev --name init
```

## Notes

- Using a Vercel Postgres database is useful to leverage the platform's Edge Runtime features when performing database transactions, and to have the convenience of both your web server code and your database on the same hosting platform.

- The `--name init` part of the database migration terminal command is used to give a descriptive name to the migration, much like you would name a git commit. Prisma tracks all migration operations in the `prisma/migrations` folder to make it clear what changes were made to the database each time. These changes will also be stored in a `_primsa_migrations` table of the database

- The `npm prisma migrate` terminal command is followed by `dev` to indicate the name of the development database to migrate, and the command automatically generates a new Prisma client, which will be used as a database adapter in your app code, based on the schema defined in `prisma/schema.prisma`.

- Using a Vercel Postgres database with Prisma requires additional configuration in the app code, beyond the scope of this example, and they will be noted in the step-by-step instructions, but otherwise the code will be the same as when using other database types, because Prisma standardizes the syntax used to transact with different kinds of databases.

## Expected Behavior

- Installing the Prisma CLI will allow you to run the `npx prisma` terminal commands.

- Installing the Prisma client will allow you to import it into your app code.

- Initializing Prisma will create a boilerplate `prisma/schema.prisma` file, configured for the kind of database specified by the `--datasource-provider` flag. In this example the flag is omitted, so the default `postgresql` will be used. Initializing will also create or merge a `DATABASE_URL` environment variable in the `.env` file, but this is not used for a Vercel Postgres database.

- Running the `npx prisma migrate` terminal command will set the database schema to match what is definied in `prisma/schema.prisma`, and finally regenerate the Prisma client to match the database schema.

## Prisma Docs References

[Deploy to Vercel](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-vercel#vercel-postgres)
