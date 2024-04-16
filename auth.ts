import NextAuth, { NextAuthConfig } from "next-auth";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth(authConfig)