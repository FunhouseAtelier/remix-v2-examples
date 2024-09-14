# 07-01-01b. Installing Prisma For a MongoDB Atlas Database

## Starting Point

1. Create a new MongoDB Atlas database in a sharded cluster.

2. Replicate the result from **01a. Installing and Running Remix v2 With `npx`**.

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

3. Enter the terminal command to initialize the Prisma ORM for a MongoDB database.

```bash
npx prisma init --datasource-provider mongodb
```

### Edit `.env`

1. Change the value of the `DATABASE_URL` environment variable to the connection URL for your MongoDB database by substituting your own information in place of variables like `<USERNAME>` and `<PASSWORD>`.

```bash
DATABASE_URL="mongodb+srv://<USERNAME>:<PASSWORD>@<HOST[:PORT]>/<DATABASE>"
```

### Edit `prisma/schema.prisma`

1. Add `User` and `Post` data models, where `User` has a one-to-many relation with `Post` as the `author`.

```prisma
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        String  @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  String  @db.ObjectId
}
```

### In the Project Root Folder

1. Enter the terminal command to apply the schema defined above to the MongoDB database.

```bash
npx prisma db push
```

## Notes

- This example shows how to install Prisma for a new MongoDB Atlas database, but it can also be done for an existing MongoDB database. In that case you should skip the \*\*Edit `prisma/schema.prisma` section, and instead of the `npx prisma db push` terminal command, use `npx prisma db pull` command to do the inverse: force the prisma schema to match the schema infered by the structure of the existing database. This will also generate a new Prisma client.

- A new database must be created for the purpose of following these Funhouse Atelier examples of database integration in Remix, and except for the "Installing" examples they will all follow a similar pattern, because Prisma standardizes the syntax used to transact with different kinds of databases. Where there are differences in the syntax between database types in the following examples, they will be noted in the step-by-step instructions, but otherwise they are the same.

- The `npx prisma db push` terminal command automatically generates a new Prisma client, which will be used as a database adapter in your app code, based on the schema defined in `prisma/schema.prisma`.

- The `.env.example` included matches the one generated when Prisma is initialized. Make sure that your secret `DATABASE_URL` environment variable is actually in a `.env` file instead. The replacement data to use in the `DATABASE_URL` can be found by visiting the web page for your Atlas cluster and clicking the "Connect" button, then choose the "Compass" option and append the name of your database to that URL.

## Expected Behavior

- Installing the Prisma CLI will allow you to run the `npx prisma` terminal commands.

- Installing the Prisma client will allow you to import it into your app code.

- Initializing Prisma will create a boilerplate `prisma/schema.prisma` file, configured for the kind of database specified by the `--datasource-provider` flag. If the flag is omitted, the default `postgres` will be used. Initializing will also create or merge a `DATABASE_URL` environment variable in the `.env` file, and by default it refers to a sample MongoDB connection URL.

- Running the `npx prisma db push` terminal command will create the `User` and `Post` collections in the MongoDB database, if they do not already exist, then set the database schema to match what is definied in `prisma/schema.prisma`, and finally regenerate the Prisma client to match the database schema.

## Prisma Docs References

[Get Started: Set up Prisma ORM: Add to existing project: MongoDB](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb-typescript-mongodb)
