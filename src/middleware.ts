import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function middleware(req: NextApiRequest, res: NextApiResponse) {
  NextAuth(authConfig).auth(req, res);
}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};