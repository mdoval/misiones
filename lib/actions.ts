"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import prisma from '@/db/prisma'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { passHash } from "./security";

export async function authenticate(  
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {        
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Credenciales Invalidas.';
          default:
            return 'Algo salio mal.';
        }
      }
      throw error;
    }
  }

  const UserFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  export async function userRegister(prevState: String, formData: FormData) {
    const validatedFields = UserFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return "No paso la validacion"
    }

    validatedFields.data.password = await passHash(validatedFields.data.password)

    try {
      const newUser = await prisma.user.create({data: validatedFields.data})
    } catch(error) {
      console.log(error)
      return "Error"
    }

    revalidatePath('/login');
    redirect('/login');
}