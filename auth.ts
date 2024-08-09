import NextAuth from "next-auth"
import google from "next-auth/providers/google"
import facebook from "next-auth/providers/facebook"
import instagram from "next-auth/providers/instagram"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [google, facebook, instagram],
})