import NextAuth, { DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Instagram from "next-auth/providers/instagram"

import { db } from "@/lib/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { accounts, sessions, users, verificationTokens } from "./lib/schema"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook, Instagram],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }),
  callbacks: {
    async session({session, user}) {
      session.user.id = user.id
      return session
    }
  }
})
