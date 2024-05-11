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
import path from "path";
import { writeFile, unlink } from "fs/promises";

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
    nombre: formData.get("nombre"),
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
  // Id de Propiedad
  const idPropiedad = Number(id)    

  //Variable de datos para ser actualizados
  let data = {}
  
  //Verificacion de servicios
  const servicios = formData.getAll('checkboxServicios')
  if(servicios.length > 0) {
    const serviciosRelacionados: any = []
    servicios.map((servicio) => {
      serviciosRelacionados.push({id: Number(servicio)}
      )
    })
    data = {...data, servicios:{ connect: serviciosRelacionados} }
  }

  const tipoId = Number(formData.get('tipo'))
  if(tipoId) data = {...data, tipoId: tipoId}
  const descripcion = formData.get('descripcion') as string
  if(descripcion) data ={...data, descripcion: descripcion}

  try {
    //Elimina los servicios
    await prisma.$executeRaw`DELETE FROM _PropiedadesToServicios WHERE A = ${idPropiedad}`
    //Vuelve a cargar las propiedades
    const propiedadActualizada = await prisma.propiedades.update({ 
      where: {
        id: idPropiedad
      },
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

export async function subirFotoDePropiedad(formData: FormData) {
  const idPropiedad: string | undefined = formData.get('id')?.toString()
  const file: File | null = formData.get('file') as unknown as File
  if(!file) console.log("El archivo no subio")
  const fechaHoraActual: string = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
  const nombre = idPropiedad+fechaHoraActual+".jpg"
  //console.log(nombre)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  //const filePath = path.join(process.cwd(), "public/images/propiedades", file.name);
  const filePath = path.join(process.cwd(), "public/images/propiedades", nombre);
  //console.log(filePath)
  try {
    let idp: number = 0
    if(idPropiedad != undefined) idp = parseInt(idPropiedad)
    await writeFile(filePath, buffer);
    await prisma.propiedades.update({
      where:{ id : idp }, 
      data: {
        imagenes: {
          create: {url: nombre}
        }
      }
    })
    //console.log('Archivo Subido')
  } catch(error) {
    console.log(error)
  }
  revalidatePath(`/dashboard/propiedades/${idPropiedad}/edit`);
  redirect(`/dashboard/propiedades/${idPropiedad}/edit`);
}

export async function eliminarFotoDePropiedad(propiedadid: number,imagenid: number) {

  try {
    const imagenParaBorrar = await prisma.imagenes.findUnique({where: {id: imagenid}})
    if(imagenParaBorrar?.url) {
      const filePath = path.join(process.cwd(), "public/images/propiedades", imagenParaBorrar.url);
      await unlink(filePath);
      //console.log(`Deleted ${filePath}`);
    }    
    await prisma.imagenes.delete({where: {id: imagenid}})
    console.log('Imagen Eliminada')
  } catch(error) {
    console.log(error)
  }
  revalidatePath(`/dashboard/propiedades/${propiedadid}/edit`);
  redirect(`/dashboard/propiedades/${propiedadid}/edit`);
}

export async function updateUbicacion(
  id: string | undefined, 
  prevState:FormState, 
  formData: FormData
) {
  // Id de Propiedad
  const idPropiedad = Number(id)    

  //Variable de datos para ser actualizados
  let data = {}
  
  const address = formData.get('address') as string
  if(address) data ={...data, address: address}

  const latitud = parseFloat(formData.get('lat') as string)
  //console.log("latitud" + latitud)
  if(latitud) data ={...data, latitud: latitud}

  const longitud = parseFloat(formData.get('lng') as string)
  //console.log("longitud" + longitud)
  if(longitud) data ={...data, longitud: longitud}

  try {
    //Vuelve a cargar las propiedades
    const propiedadActualizada = await prisma.propiedades.update({ 
      where: {
        id: idPropiedad
      },
      data: data
    })
  } catch(error) {
    console.log(error)
    return prevState
  }
  revalidatePath(`/dashboard/propiedades/${idPropiedad}/edit`);
  redirect(`/dashboard/propiedades/${idPropiedad}/edit`);
//  return prevState
}