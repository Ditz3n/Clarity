import NextAuth, { NextAuthOptions, Session as NextAuthSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

interface Session extends NextAuthSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string | null;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { type: "text" }, password: { type: "password" } },
      async authorize(credentials) {
        const prisma = new PrismaClient();
        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials");
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("User not found");
          throw new Error("User not found");
        }

        console.log("User found:", user);

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          console.log("Invalid password");
          throw new Error("Invalid credentials");
        }

        console.log("Authentication successful");
        return { id: user.id, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: { id: string } }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.id) {
        if (session.user) {
          session.user.id = token.id as string;
        }
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);