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
        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials");
          throw new Error("Missing credentials");
        }
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
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
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) { token.id = user.id; }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (token?.id) { session.user.id = token.id; }
      return session;
    },
  },
};

export default NextAuth(authOptions);
