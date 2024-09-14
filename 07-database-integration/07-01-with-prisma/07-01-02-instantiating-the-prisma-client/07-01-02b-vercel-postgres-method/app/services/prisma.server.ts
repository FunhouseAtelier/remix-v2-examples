/* 1. Import the Prisma Client class, the Prisma Neon adapter, and the Neon serverless connection pool manager. */
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'

/* 2. Instantiate the Neon serverless connection pool manager and the Prisma Neon adapter. */
const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)

/* 3. If an instance of `PrismaClient` is already attached to the `global` object, export it, otherwise export a new instance, passing the Prisma Neon adapter as the `adapter` option. */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

/* 4. If not running in a production environment, attach the exported instance to the `global` object. */
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
