import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const prisma = new PrismaClient();
  const { email, password } = req.body; // Removed 'language'

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "Account created!" });
}
