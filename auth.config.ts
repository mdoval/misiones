import { User } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { passCompare } from "./lib/security";
import prisma from "@/db/prisma"
import { IoReturnDownForwardSharp } from "react-icons/io5";
import { redirect } from "next/navigation";

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
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if(isOnDashboard && !isLoggedIn) return false     
      return true
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
