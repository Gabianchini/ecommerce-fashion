import type { NextAuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/prismadb";
import bcrypt from "bcrypt";

interface CustomUser extends User {
  profileImage?: string | null;
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: 'email',
          type: 'text',
          placeholder: 'your email',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'your password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        const isCorrectedPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isCorrectedPassword) {
          throw new Error('Invalid credentials');
        }

        return {
          ...user,
        };
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const customUser = user as CustomUser;
        return {
          ...(token as unknown as CustomUser),
          uid: customUser.id,
          email: customUser.email,
          profileImage: customUser.profileImage || null,
        } as JWT;
      }
      return token as JWT;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = {
          ...(token as unknown as CustomUser),
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};