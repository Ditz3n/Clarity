import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "./sendVerificationEmail";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // First, delete any expired verification token for this email
    await prisma.verificationToken.deleteMany({
      where: {
        email,
        expiresAt: { lt: new Date() },
      },
    });

    // Check if there's already a pending, valid verification token
    const existingToken = await prisma.verificationToken.findFirst({
      where: { 
        email, 
        expiresAt: { gt: new Date() },
      },
    });

    if (existingToken) {
      return res.status(400).json({ error: "A verification email has already been sent" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    // Save token and hashed password in verification token
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        hashedPassword, // Store the hashed password
        expiresAt: new Date(Date.now() + 3600000),
      },
    });

    // Send verification email
    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;
    await sendVerificationEmail(email, verificationUrl);

    res.status(200).json({ message: "Please check your email to verify your account" });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ error: "Error creating account" });
  }
}