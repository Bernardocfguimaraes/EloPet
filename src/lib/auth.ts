import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import type { Adapter } from "next-auth/adapters"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [GitHub],
})
