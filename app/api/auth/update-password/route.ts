// /app/api/auth/update-password/route.ts | An API route for handling password update requests
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { authConfig } from "@/lib/auth.config";
import { compare, hash } from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session?.user?.email) {
    return NextResponse.json({ messageCode: "NOT_AUTHENTICATED" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    // Get user with their current password
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json({ messageCode: "USER_NOT_FOUND" }, { status: 404 });
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ messageCode : "WRONG_CURRENT_PASSWORD" }, { status: 400 });
    }

    // Hash and update new password
    const hashedPassword = await hash(newPassword, 12);
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ messageCode: 'PASSWORD_UPDATED' }, { status: 200 });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ messageCode: 'SERVER_ERROR' }, { status: 500 });
  }
}