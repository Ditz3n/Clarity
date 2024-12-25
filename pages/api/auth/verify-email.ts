import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Verification token is missing" });
  }

  try {
    // Verify the JWT token first
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;

    // Find the verification token in the database
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { 
        token: token as string,
        email: decoded.email
      },
    });

    if (!verificationToken) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    if (verificationToken.expiresAt < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      return res.status(400).json({ error: "Verification token has expired" });
    }

    // Create the verified user with the hashed password
    await prisma.user.create({
      data: {
        email: verificationToken.email,
        password: verificationToken.hashedPassword, // Use the stored hashed password
        isVerified: true,
      },
    });

    // Delete the verification token after successful use
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    // Redirect to success page
    res.redirect('/success');
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ error: "Error verifying email" });
  }
}