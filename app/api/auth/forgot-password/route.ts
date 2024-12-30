// route.ts file for the forgot-password API route | This file is responsible for handling password reset requests
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { sendPasswordResetEmail } from '@/lib/email/sendPasswordResetEmail';

const prisma = new PrismaClient();

interface RateLimitCheck {
  isAllowed: boolean;
  remainingAttempts: number;
}

async function checkRateLimit(email: string): Promise<RateLimitCheck> {
  const MAX_ATTEMPTS = 3;
  const WINDOW_HOURS = 1;

  // Find or create rate limit record
  const rateLimitRecord = await prisma.passwordResetAttempt.findFirst({
    where: {
      email,
      createdAt: {
        gte: new Date(Date.now() - WINDOW_HOURS * 60 * 60 * 1000)
      }
    }
  });

  if (!rateLimitRecord) {
    await prisma.passwordResetAttempt.create({
      data: {
        email,
        attempts: 1
      }
    });
    return { isAllowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
  }

  if (rateLimitRecord.attempts >= MAX_ATTEMPTS) {
    return { isAllowed: false, remainingAttempts: 0 };
  }

  // Increment attempt count
  await prisma.passwordResetAttempt.update({
    where: { id: rateLimitRecord.id },
    data: { attempts: rateLimitRecord.attempts + 1 }
  });

  return {
    isAllowed: true,
    remainingAttempts: MAX_ATTEMPTS - (rateLimitRecord.attempts + 1)
  };
}

export async function POST(req: Request) {
  try {
    const { email, language } = await req.json();
    console.log("Received password reset request:", { email, language });

    // Check rate limit before proceeding
    const rateLimit = await checkRateLimit(email);
    
    if (!rateLimit.isAllowed) {
      console.log("Rate limit exceeded for:", email);
      return NextResponse.json(
        { error: "Too many reset attempts. Please try again later." },
        { status: 429 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address. Please check the email or create a new account." },
        { status: 404 }
      );
    }

    // Generate reset token
    const token = jwt.sign(
      { email, type: 'passwordReset' },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    // Store reset token in database
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
      },
    });

    // Send password reset email
    const resetUrl = `${process.env.BASE_URL}/resetpassword?token=${token}`;
    console.log("Sending password reset email with language:", language);
    await sendPasswordResetEmail(email, resetUrl, language as 'en' | 'da');
    console.log("Password reset email sent successfully");

    return NextResponse.json(
      { message: "Password reset link has been sent to your email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Error processing password reset request" },
      { status: 500 }
    );
  }
}