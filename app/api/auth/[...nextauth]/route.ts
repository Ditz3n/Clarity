// app/api/auth/[...nextauth]/route.ts | An API route for handling authentication (using NextAuth.js)
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// This is the API route for handling authentication requests (refer to lib/auth.config.ts for configuration options)
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };