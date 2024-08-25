import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname === '/';
      console.log('Is logged in:', isLoggedIn, 'Is on dashboard:', isOnDashboard);
      
      if (isOnDashboard) return isLoggedIn; // Redirect unauthenticated users to login page
      if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;