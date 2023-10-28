import { withAuth } from 'next-auth/middleware';
import { JWT } from 'next-auth/jwt';

const publicPaths = ['/signin', '/signup', '/api/auth'];
export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      return isTokenValid(token) || isPublicPath(req.nextUrl.pathname);
    },
  },
});

function isPublicPath(path: string) {
  return publicPaths.find((publicPath) => path.startsWith(publicPath)) !== undefined;
}

function isTokenValid(token: JWT | null) {
  return token !== null;
}
