export { auth as middleware } from '@/auth'
/* import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server' */

/* export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req })
        const isAuthenticated = !!token

        const authRoutes = ["/register", "/login"]

        if (!authRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (authRoutes.includes(req.nextUrl.pathname) && isAuthenticated) {
            return NextResponse.redirect(new URL("/dashboard/profile", req.url));
        }
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
)

export const config = {
    matcher: ["/register", "/login", "/dashboard/:path*"],
} */