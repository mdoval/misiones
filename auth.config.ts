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
          user = {email: "Juan", password: "pepe"}
          console.log(user)
        }
        return user
      },
    }),
  ],
} satisfies NextAuthConfig;
