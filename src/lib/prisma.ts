import { PrismaClient } from "@/generated/prisma/client"
import { PrismaNeon } from '@prisma/adapter-neon'

// Pega a URL do seu .env
const connectionString = `${process.env.DATABASE_URL}`

// O Next.js já possui WebSocket nativo, então o adaptador se vira sozinho
const adapter = new PrismaNeon({ connectionString })

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma