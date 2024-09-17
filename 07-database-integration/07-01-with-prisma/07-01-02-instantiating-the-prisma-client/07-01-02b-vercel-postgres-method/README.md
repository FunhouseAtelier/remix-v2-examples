# 07-01-02b. Instantiating the Prisma Client: Vercel Postgres Method

## Starting Point

1. Replicate the result from **07-01-02b. Installing Prisma For a Vercel Postgres Database**.

## Process

### Create `app/services/prisma.server.ts`

1. Import the Prisma Client class, the Prisma Neon adapter, and the Neon serverless connection pool manager.

```ts
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'
```

2. Instantiate the Neon serverless connection pool manager and the Prisma Neon adapter.

```ts
const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)
```

3. If an instance of `PrismaClient` is already attached to the `global` object export it, otherwise export a new instance, passing the Prisma Neon adapter as the `adapter` option.

```ts
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })
```

4. If not running in a production environment, attach the exported instance to the `global` object.

```ts
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Notes

- The `PrismaClient` instance is attached to the `global` object to prevent multiple instances from being created in a development environment where hot reloading of resources occurs due to Vite functionality. Because each instance has its own database connection pool, an unbounded number of multiple instances is unnecessary and could exhaust the simulatenous connection limit of the database.

## Expected Behavior

- The server should have only one `PrismaClient` instance at a time, and it can be imported in files with an edge runtime under the variable name `prisma`.

## Prisma Docs References

[Edge functions: Vercel Postgres](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-vercel#vercel-postgres)
