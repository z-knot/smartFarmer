import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages without token
        if (req.nextUrl.pathname.startsWith('/auth/')) {
          return true;
        }
        
        // Allow access to public pages
        const publicPaths = ['/about', '/features', '/pricing', '/contact', '/blog', '/faq', '/terms', '/privacy', '/security'];
        if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
          return true;
        }

        // Admin routes require admin role
        if (req.nextUrl.pathname.startsWith('/admin/')) {
          return token?.role === 'admin';
        }

        // ML training routes require admin or agronomist role
        if (req.nextUrl.pathname.startsWith('/ml/training') || req.nextUrl.pathname.startsWith('/ml/models')) {
          return token?.role === 'admin' || token?.role === 'agronomist';
        }

        // All other protected routes require authentication
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};