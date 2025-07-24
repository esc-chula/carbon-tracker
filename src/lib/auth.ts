import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email;
      const domain = email?.split("@")[1];
      if (domain === "student.chula.ac.th") {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
