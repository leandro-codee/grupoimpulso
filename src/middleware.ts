import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === "/login") {
          return true
        }

        // Protect admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin"
        }

        return true
      },
    },
  }
)

export const config = {
  // Only protect admin routes, exclude login page
  matcher: ["/admin/:path*"],
}

