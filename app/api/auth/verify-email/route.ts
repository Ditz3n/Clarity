import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: "Verification token is missing" },
      { status: 400 }
    );
  }

  try {
    // Verify the JWT token first
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & { email: string, type: string };

    // Validate token type
    if (decoded.type !== 'email_verification') {
      return NextResponse.json(
        { error: "Invalid token type" },
        { status: 400 }
      );
    }

    // Use a transaction to prevent race conditions
    return await prisma.$transaction(async (tx) => {
      // Find the verification token
      const verificationToken = await tx.verificationToken.findFirst({
        where: { 
          token,
          email: decoded.email,
          expiresAt: { gt: new Date() }
        },
      });

      if (!verificationToken) {
        return NextResponse.json(
          { error: "Invalid or expired verification link" },
          { status: 400 }
        );
      }

      // Check for existing user
      const existingUser = await tx.user.findUnique({
        where: { email: verificationToken.email }
      });

      if (existingUser) {
        // Clean up the token
        await tx.verificationToken.delete({
          where: { id: verificationToken.id }
        });
        
        return NextResponse.json(
          { error: "Email already verified" },
          { status: 400 }
        );
      }

      // Create the verified user
      await tx.user.create({
        data: {
          email: verificationToken.email,
          password: verificationToken.hashedPassword,
          isVerified: true,
        },
      });

      // Delete the verification token
      await tx.verificationToken.delete({
        where: { id: verificationToken.id }
      });

      return NextResponse.json(
        { success: true },
        { status: 200 }
      );
    });

  } catch (error) {
    console.error("Error verifying email:", error);
    
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        { error: "Verification link has expired" },
        { status: 400 }
      );
    }
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: "Invalid verification link" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Error verifying email" },
      { status: 500 }
    );
  }
}