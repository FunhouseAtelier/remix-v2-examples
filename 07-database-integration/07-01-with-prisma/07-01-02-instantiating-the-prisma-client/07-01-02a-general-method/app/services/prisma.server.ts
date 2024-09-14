/* 1. Import the `PrismaClient` class. */
import { PrismaClient } from '@prisma/client'

/* 2. If an instance of `PrismaClient` is already attached to the `global` object, export it, otherwise export a new instance. */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()

/* 3. If not running in a production environment, attach the exported instance to the `global` object. */
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
