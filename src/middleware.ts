import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdmin = token?.role === "admin"
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

    // If accessing admin route without admin role, redirect to login
    if (isAdminRoute && !isAdmin) {
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === "/login") {
          return true
        }

        // Protect admin routes - require admin role
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin"
        }

        return true
      },
    },
  }
)

export const config = {
  // Only protect admin routes, exclude login page and API routes
  matcher: ["/admin/:path*"],
}

