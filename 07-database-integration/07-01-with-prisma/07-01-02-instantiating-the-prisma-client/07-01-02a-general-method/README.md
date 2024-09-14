# 07-01-02a. Instantiating the Prisma Client: General Method

## Starting Point

1. Replicate the result from any of the following:

   - **07-01-01a. Installing Prisma For a Local SQLite Database**
   - **07-01-01b. Installing Prisma For a MongoDB Atlas Database**

_This example uses **07-01-01a.**_

## Process

### Create `app/services/prisma.server.ts`

1. Import the Prisma Client class.

```ts
import { PrismaClient } from '@prisma/client'
```

2. If an instance of `PrismaClient` is already attached to the `global` object, export it, otherwise export a new instance.

```ts
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
```

3. If not running in a production environment, attach the exported instance to the `global` object.

```ts
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Notes

- The `PrismaClient` instance is attached to the `global` object to prevent multiple instances from being created in a development environment where hot reloading of resources occurs due to Vite functionality. Because each instance has its own database connection pool, an unbounded number of multiple instances is unnecessary and could exhaust the simulatenous connection limit of the database.

## Expected Behavior

- The server should have only one Prisma Client instance at a time, and it can be imported in other server-only files under the variable name `prisma`.

## Prisma Docs References

[Database connections: Prevent hot reloading from creating new instances of PrismaClient](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient)
