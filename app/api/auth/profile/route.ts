// route.ts file for the profile API route | This file is responsible for collecting the user's profile information to be shown on the profile page
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { authConfig } from "@/lib/auth.config";

export async function GET() {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        password: true,
        isVerified: true,
        createdAt: true,
        hideCompletionModal: true,     // Added this field
        completionPreference: true,    // Added this field
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}