import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { useLanguage } from "@/context/LanguageContext";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { language } = useLanguage();
  if (req.method !== "POST") return res.status(405).end();

  const prisma = new PrismaClient();
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: language === "en" ? "User already exists" : "Brugeren findes allerede" });
  }

  const hashedPassword = await hash(password, 10);
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: language === "en" ? "Account created!" : "Konto oprettet!" });
}