// app/api/profile/update-password/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../utils/prisma";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { compare, hash } from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword, language } = await req.json();

    // Get user with their current password
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error:"User not found" }, { status: 404 });
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    // Hash and update new password
    const hashedPassword = await hash(newPassword, 12);
    await prisma.user.update({
      where: { email: session.user.email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: language === "en" ? "Password has been updated!" : "Adgangskoden er blevet opdateret!" });
  } catch (error) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}