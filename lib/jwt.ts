// lib/jwt.ts | A utility for generating and verifying JWT tokens
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

// Interface for the token payload
interface TokenPayload {
  email: string
  type: 'email_verification' | 'password_reset'
  exp?: number
  iat?: number
}

export async function verifyJWT(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err)
      } else {
        resolve(decoded as TokenPayload)
      }
    })
  })
}

export function generateJWT(payload: Omit<TokenPayload, 'iat' | 'exp'>, expiresIn: string = '1h'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}