// /app/api/auth/signup/route.ts | An API route for handling user signup requests
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email/sendVerificationEmail";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, language } = body;

    // Input validation
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { errorCode: 'MISSING_CREDENTIALS' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { errorCode: 'INVALID_EMAIL_FORMAT' },
        { status: 400 }
      );
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json(
        { errorCode: 'SERVER_CONFIGURATION_ERROR' },
        { status: 500 }
      );
    }

    // Delete expired tokens
    await prisma.verificationToken.deleteMany({
      where: {
        email,
        expiresAt: { lt: new Date() },
      },
    });

    // Check for existing valid token
    const existingToken = await prisma.verificationToken.findFirst({
      where: { 
        email, 
        expiresAt: { gt: new Date() },
      },
    });

    if (existingToken) {
      return NextResponse.json(
        { errorCode: 'VERIFICATION_EMAIL_ALREADY_SENT' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate token
    const token = jwt.sign(
      { email, type: 'email_verification' },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Create verification token
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        hashedPassword,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
      },
    });

    // Generate verification URL
    const baseUrl = process.env.BASE_URL || process.env.NEXTAUTH_URL;
    if (!baseUrl) {
      throw new Error('BASE_URL or NEXTAUTH_URL must be set');
    }

    const verificationUrl = `${baseUrl}/success?token=${token}`;
    
    // Send email
    await sendVerificationEmail(email, verificationUrl, language as 'en' | 'da');

    return NextResponse.json(
      { success: true, messageCode: 'VERIFICATION_EMAIL_SENT' },
      { status: 200 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    
    // Ensure we always return a proper JSON response
    return NextResponse.json(
      { 
        errorCode: 'ACCOUNT_CREATION_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}