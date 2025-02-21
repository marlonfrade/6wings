import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose' // You'll need to install jose package

// Define protected routes and their allowed user types
const PROTECTED_ROUTES = {
  '/dashboard': ['user', 'admin'],
  '/admin': ['admin'],
  '/profile': ['user', 'admin'],
  '/orders': ['user', 'admin']
  // Add more routes as needed
}

async function verifyToken(token: string) {
  if (!token) return null

  try {
    // Replace with your actual JWT secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Get auth token from cookies
  const authToken = request.cookies.get('auth_token')?.value
  const userRole = request.cookies.get('userRole')?.value

  // Check if the current path is protected
  const isProtectedRoute = Object.keys(PROTECTED_ROUTES).some((route) =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // If no token exists, redirect to login
    if (!authToken) {
      return NextResponse.redirect(new URL('/user/sign-in', request.url))
    }

    // Verify token
    const payload = await verifyToken(authToken)

    if (!payload) {
      // Clear invalid token
      const response = NextResponse.redirect(
        new URL('/user/sign-in', request.url)
      )
      response.cookies.delete('auth_token')
      response.cookies.delete('userRole')
      return response
    }

    // Check user type permission for the route
    const currentRoute = Object.entries(PROTECTED_ROUTES).find(([route]) =>
      pathname.startsWith(route)
    )

    if (currentRoute && !currentRoute[1].includes(userRole as string)) {
      // Redirect to appropriate page based on user role
      const redirectPath = userRole === 'admin' ? '/admin' : '/dashboard'
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  // Add any custom headers you need
  const headers = new Headers(request.headers)

  // Continue with the request
  return NextResponse.next({ headers })
}

export const config = {
  matcher: [
    // Add your protected routes here
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/orders/:path*'
    // Add more routes as needed
  ]
}
