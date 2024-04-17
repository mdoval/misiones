import { Usuario } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/db/prisma";

async function getUser(email: string): Promise<Usuario | null> {
  try {
    const user = await prisma.usuario.findUnique({ where: { email: email } });
    return user;
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    throw new Error("Error al buscar usuario.");
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
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
          let usuario = await getUser(email)          
          console.log(usuario)
          const passwordMatch = password === usuario?.password
          if(passwordMatch) {
            user = {email: "Juan", password: "pepe"}
            console.log(user)
          } else {
            return null
          }
        }
        return user
      },
    }),
  ],
} satisfies NextAuthConfig;
