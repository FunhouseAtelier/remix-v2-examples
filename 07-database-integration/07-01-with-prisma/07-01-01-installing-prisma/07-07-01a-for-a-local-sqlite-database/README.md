# 07-01-01a. Installing Prisma For a Local SQLite Database

## Starting Point

1. Replicate the result from **01a. Installing and Running Remix v2 With `npx`**.

## Process

### In the Project Root Folder

1. Enter the terminal command to install the Prisma CLI as a development dependency.

```bash
npm i -D prisma
```

2. Enter the terminal command to install the Prisma client.

```bash
npm i @prisma/client
```

3. Enter the terminal command to initialize the Prisma ORM for an SQLite database.

```bash
npx prisma init --datasource-provider sqlite
```

### Edit `prisma/schema.prisma`

1. Add `User` and `Post` data models, where `User` has a one-to-many relation with `Post` as the `author`.

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

1. Enter the terminal command to create a new local SQLite database with the schema defined above.

```bash
npx prisma migrate dev --name init
```

## Notes

- Using an SQLite database is generally not recommended for the production environment, but it is useful for quick prototyping of an app.

- The `--name init` part of the database migration terminal command is used to give a descriptive name to the migration, much like you would name a git commit. Prisma tracks all migration operations in the `prisma/migrations` folder to make it clear what changes were made to the database each time.

- The `npx prisma migrate` terminal command is followed by `dev` to indicate the name of the SQLite database file to migrate, and the command automatically generates a new Prisma client, which will be used as a database adapter in your app code, based on the schema defined in `prisma/schema.prisma`.

- Prisma standardizes the syntax used to transact with different kinds of databases, so most of the following examples will work the same way regardless of which type of database is used, but where there are differences in the syntax between database types they will be noted in the step-by-step instructions, but otherwise they are the same.

## Expected Behavior

- Installing the Prisma CLI will allow you to run the `npx prisma` terminal commands.

- Installing the Prisma client will allow you to import it into your app code.

- Initializing Prisma will create a boilerplate `prisma/schema.prisma` file, configured for the kind of database specified by the `--datasource-provider` flag. If the flag is omitted, the default `postgresql` will be used. Initializing will also create or merge a `DATABASE_URL` environment variable in the `.env` file, and by default it refers to the file path `prisma/dev.db`.

- Running the `npx prisma migrate` terminal command will generate the database file `primsa/dev.db` and an associated journal file `prisma/dev.db-journal` if they do not already exist, then set the database schema to match what is definied in `prisma/schema.prisma`, and finally regenerate the Prisma client to match the database schema.

## Prisma Docs References

[Get Started: Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
