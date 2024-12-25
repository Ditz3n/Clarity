import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sendPasswordResetEmail } from "../../../utils/sendPasswordResetEmail";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, token, newPassword, language } = await req.json();
    console.log("Incoming Request:", { email, token, newPassword, language });

    if (email) {
      console.log("Processing password reset request for email:", email);

      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log("User found:", user);

      if (!user) {
        console.log("No user found with this email address.");
        return NextResponse.json(
          { error: "No account found with this email address." },
          { status: 404 }
        );
      }

      // Generate a reset token
      const resetToken = jwt.sign(
        { email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      console.log("Generated reset token:", resetToken);

      // Store the token in the database
      await prisma.passwordResetToken.create({
        data: {
          email,
          token: resetToken,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiration
        },
      });
      console.log("Reset token saved to database.");

      // Create the reset URL
      const resetUrl = `${process.env.BASE_URL}/resetpassword?token=${resetToken}`;
      console.log("Generated reset URL:", resetUrl);

      // Send the email
      await sendPasswordResetEmail(email, resetUrl, language || "en");
      console.log("Password reset email sent.");

      return NextResponse.json(
        { message: "Password reset email sent successfully." },
        { status: 200 }
      );
    } else if (token && newPassword) {
      console.log("Processing password reset with token.");

      // Verify token
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log("Decoded token:", decoded);

      // Check if token exists and hasn't expired
      const resetToken = await prisma.passwordResetToken.findFirst({
        where: {
          token,
          email: decoded.email,
          expiresAt: { gt: new Date() },
        },
      });
      console.log("Found reset token in database:", resetToken);

      if (!resetToken) {
        console.log("Invalid or expired reset token.");
        return NextResponse.json(
          { error: "Invalid or expired reset token" },
          { status: 400 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("New password hashed.");

      // Update user's password
      await prisma.user.update({
        where: { email: resetToken.email },
        data: { password: hashedPassword },
      });
      console.log("User's password updated.");

      // Delete the used reset token
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      });
      console.log("Reset token deleted.");

      return NextResponse.json(
        { message: "Password successfully reset" },
        { status: 200 }
      );
    } else {
      console.log("Invalid request: Missing required fields.");
      return NextResponse.json(
        { error: "Invalid request. Provide either email or token and newPassword." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing password reset:", error);
    return NextResponse.json(
      { error: "Error processing password reset." },
      { status: 500 }
    );
  }
}