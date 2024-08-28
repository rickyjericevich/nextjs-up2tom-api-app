'use server'

import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from '@/auth.config';
import { z } from 'zod';
import User, { UserDocument } from '@/schema/mongoose/User';
import { queryDocumentsFromDb } from '@/lib/db';

async function getUser(email: string): Promise<UserDocument> {
  try {
    const users = await queryDocumentsFromDb(User, { email });
    return users[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.debug("Looking for user with email", email);
          const user = await getUser(email);
          console.debug("Found user with email", email, ":", user);
          if (!user) return null;
          if (user.password === password) return user; // TODO: Hash passwords in DB and use bcrypt to compare passwords
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});

export async function authenticate(formData: FormData) {
  console.debug("Authenticating with credentials:", formData);
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
