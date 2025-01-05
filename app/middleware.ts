// app/middleware.ts | A middleware for handling authentication and verification routes
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

// Define public routes that don't need authentication
const publicRoutes = ['/login', '/register', '/forgot-password']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Special handling for verification routes
  if (path === '/success' || path === '/resetpassword') {
    const token = request.nextUrl.searchParams.get('token')
    
    if (!token) {
      return NextResponse.redirect(new URL('/login?error=missing_token', request.url))
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET as string)
      return NextResponse.next()
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.redirect(new URL('/login?error=expired', request.url))
      }
      return NextResponse.redirect(new URL('/login?error=invalid', request.url))
    }
  }

  // Check for authentication on protected routes
  if (!publicRoutes.includes(path)) {
    const token = request.cookies.get('next-auth.session-token')
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Protected routes
    '/home',
    '/profile',
    // Verification routes
    '/success',
    '/resetpassword',
    // Exclude public routes and api routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}