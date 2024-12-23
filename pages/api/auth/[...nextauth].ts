import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: { type: "text" }, password: { type: "password" } },
      async authorize(credentials) {
        const prisma = new PrismaClient();
        if (!credentials?.email || !credentials.password) throw new Error("Missing credentials");
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) throw new Error("User not found");
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");
        return { id: user.id, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) { token.id = user.id; }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) { session.user.id = token.id; }
      return session;
    },
  },
};

export default NextAuth(authOptions);