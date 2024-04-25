"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { passHash } from "./security";
import { provinciaCreateSchema } from "./zod";
import { userFormSchema } from "./zod";
import { ProvinciaState } from "./definitions";


export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales Invalidas.";
        default:
          return "Algo salio mal.";
      }
    }
    throw error;
  }
}

export async function userRegister(prevState: String, formData: FormData) {
  const validatedFields = userFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return "No paso la validacion";
  }

  validatedFields.data.password = await passHash(validatedFields.data.password);

  try {
    const newUser = await prisma.user.create({ data: validatedFields.data });
  } catch (error) {
    console.log(error);
    return "Error";
  }

  revalidatePath("/login");
  redirect("/login");
}

export async function createProvincia(prevState: ProvinciaState, formData: FormData) {
  const objetoParaValidar = {
    descripcion: formData.get('descripcion'),
  }
  const validacion = provinciaCreateSchema.safeParse(objetoParaValidar)
  if(!validacion.success) {
    return {
      errors: validacion.error.flatten().fieldErrors,
      message: 'Error en los campos, Fallo la creacion de Provincia'
    }
  }  

  const { descripcion } = validacion.data
  const provincia = {descripcion: descripcion, paisId: 1}
  try {
    await prisma.provincias.create({data: provincia})
  } catch( error ) {
    return { message: 'Error en la base de Datos al crear Provincia'}
  }
  revalidatePath('/dashboard/provincias');
  redirect('/dashboard/provincias');
}

export async function updateProvincia(id: string | undefined, prevState: ProvinciaState, formData: FormData) {
  const objetoParaValidar = {
    descripcion: formData.get('descripcion'),
  }

  const validacion = provinciaCreateSchema.safeParse(objetoParaValidar)
  if(!validacion.success) {
    return {
      errors: validacion.error.flatten().fieldErrors,
      message: 'Error en los campos, Fallo la creacion de Provincia'
    }
  }    

  try {
    await prisma.provincias.update({where: {id: Number(id)}, data: { descripcion: validacion.data.descripcion }})
  } catch( error ) {
    return { message: 'Error en la base de Datos al actualizar Provincia'}
  }
  revalidatePath('/dashboard/provincias');
  redirect('/dashboard/provincias');
}

export async function deleteProvincia(id: number, prevState: string) {
  
  try {
    await prisma.provincias.delete({where: { id }})
  } catch( error ) {
    console.log(error)
    return 'Error en la base de Datos al eliminar Provincia'
  }
  revalidatePath('/dashboard/provincias');
  redirect('/dashboard/provincias');
}
