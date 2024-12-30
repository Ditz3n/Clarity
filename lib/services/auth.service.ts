import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export class AuthService {
  /**
   * Validates user credentials and returns user data if valid
   */
  static async validateCredentials(email: string, password: string) {
    if (!email || !password) {
      throw new Error("MISSING_CREDENTIALS");
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified
    };
  }
}