import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Instagram from "next-auth/providers/instagram"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook, Instagram],
})