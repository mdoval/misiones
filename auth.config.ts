import { User } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { passCompare } from "./lib/security";
import prisma from "@/db/prisma"
//import MySQLPrismaAdapter from '@/db/MySQLPrismaAdapter'
//import { PrismaAdapter } from "@auth/prisma-adapter";


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { email: email },
    });
    if (user) return user;
    else return undefined;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    throw new Error("Error al buscar usuario.");
  }
}

export const authConfig = {
  //adapter: MySQLPrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        let user = null;

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          let user = await getUser(email);          
          if(!user) return null;
          let passMatch = await passCompare(password, user.password)
          if(passMatch) return user
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
