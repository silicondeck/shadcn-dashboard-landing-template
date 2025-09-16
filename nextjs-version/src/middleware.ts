import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Add custom middleware logic here
  // For example: authentication, redirects, etc.
  
  // Example: Redirect /login to /auth/sign-in
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }
  
  // Example: Redirect /register to /auth/sign-up
  if (request.nextUrl.pathname === '/register') {
    return NextResponse.redirect(new URL('/auth/sign-up', request.url))
  }
  
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
