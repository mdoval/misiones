"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { passHash } from "./security";
import { propiedadSchema, provinciaCreateSchema } from "./zod";
import { userFormSchema } from "./zod";
import { FormState, ProvinciaState } from "./definitions";

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

export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getUserLogueado() {
  let user = null;
  const session = await auth();
  if (!session) return user

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user?.email as string } });
    return user;
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function createProvincia(
  prevState: ProvinciaState,
  formData: FormData
) {
  const objetoParaValidar = {
    descripcion: formData.get("descripcion"),
  };
  const validacion = provinciaCreateSchema.safeParse(objetoParaValidar);
  if (!validacion.success) {
    return {
      errors: validacion.error.flatten().fieldErrors,
      message: "Error en los campos, Fallo la creacion de Provincia",
    };
  }

  const { descripcion } = validacion.data;
  const provincia = { descripcion: descripcion, paisId: 1 };
  try {
    await prisma.provincias.create({ data: provincia });
  } catch (error) {
    return { message: "Error en la base de Datos al crear Provincia" };
  }
  revalidatePath("/dashboard/provincias");
  redirect("/dashboard/provincias");
}

export async function updateProvincia(
  id: string | undefined,
  prevState: ProvinciaState,
  formData: FormData
) {
  const objetoParaValidar = {
    descripcion: formData.get("descripcion"),
  };

  const validacion = provinciaCreateSchema.safeParse(objetoParaValidar);
  if (!validacion.success) {
    return {
      errors: validacion.error.flatten().fieldErrors,
      message: "Error en los campos, Fallo la creacion de Provincia",
    };
  }

  try {
    await prisma.provincias.update({
      where: { id: Number(id) },
      data: { descripcion: validacion.data.descripcion },
    });
  } catch (error) {
    return { message: "Error en la base de Datos al actualizar Provincia" };
  }
  revalidatePath("/dashboard/provincias");
  redirect("/dashboard/provincias");
}

export async function deleteProvincia(id: number, prevState: string) {
  try {
    await prisma.provincias.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    return "Error en la base de Datos al eliminar Provincia";
  }
  revalidatePath("/dashboard/provincias");
  redirect("/dashboard/provincias");
}

export async function createPropiedad(prevState: FormState,formData: FormData) {
  let user = await getUserLogueado()
  let propiedadNueva = null

  if(!user) return {message: "Usuario fuera de Session", errors: {}}

  const tipoId = Number(formData.get('tipo'))
  console.log(typeof tipoId)

  const propiedad = {
    descripcion: formData.get("descripcion"),
    userId: user?.id,
    tipoId: Number(formData.get('tipo'))
  };

  const validacion = propiedadSchema.safeParse(propiedad);
  if (!validacion.success) {
    return {
      errors: validacion.error.flatten().fieldErrors,
      message: "Error en los campos, Fallo la creacion de Propiedad",
    };
  }
  try {
    propiedadNueva = await prisma.propiedades.create({ data: validacion.data });
  } catch (error) {
    return { message: "Error en la base de Datos al crear Propiedad" };
  }
  if(propiedadNueva) {
    redirect(`/dashboard/propiedades/${propiedadNueva.id}/edit`);
  } else {
    revalidatePath("/dashboard/propiedades");
    redirect(`/dashboard/propiedades`);
  }
}

export async function updatePropiedad(
  id: string | undefined, 
  prevState:FormState, 
  formData: FormData
) {
  let data = {}
  const servicios = formData.getAll('checkboxServicios')
  if(servicios.length>0) {
    const serviciosRelacionados: any = []
    servicios.map((servicio) => {
      serviciosRelacionados.push({id: Number(servicio)}
      )
    })
    data = {...data, servicios:{ connect: serviciosRelacionados} }
  }
  const idPropiedad = Number(id)    
  const tipoId = Number(formData.get('tipo'))
  if(tipoId) data = {...data, tipoId: tipoId}
  const descripcion = formData.get('descripcion') as string
  if(descripcion) data ={...data, descripcion: descripcion}

  try {
    const propiedadActualizada = await prisma.propiedades.update({ 
      where: {
        id: idPropiedad
      },
/*      data: {
        tipoId: tipoId, 
        descripcion: descripcion,
        servicios: {
          connect: [{id: 1}, {id: 3}]
        }
      }*/
      data: data
    })
  } catch(error) {
    console.log(error)
    return prevState
  }
  revalidatePath("/dashboard/propiedades");
  redirect("/dashboard/propiedades");
//  return prevState
}