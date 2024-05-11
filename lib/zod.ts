import { object, z } from "zod";

export const userFormSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

export const provinciaSchema = z.object({
  id: z.number({invalid_type_error: 'Id debe recibir un Numero' }),  
  descripcion: z.string({invalid_type_error: 'Descripcion debe recibir un string'}).min(1,{message: 'La descripcion debe tener al menos 1 caracter'}),
  paisId: z.number({invalid_type_error: 'Id debe recibir un Numero' })
})

export const provinciaCreateSchema = provinciaSchema.omit({id: true, paisId:true})

export const propiedadSchema = z.object({
  userId: z.string({invalid_type_error: "El Id de usuario debe ser un string"}),
  nombre: z.string({invalid_type_error: "El Nombre debe ser una cadena de caracteres"}).min(1,{message: "El Nombre debe tener al menos 1 caracter"}),
  descripcion: z.string({invalid_type_error: "La descripcion debe ser una cadena de caracteres"}).min(1,{message: "La descripcion debe tener al menos 1 caracter"}),
  tipoId: z.number({invalid_type_error: "El tipo debe ser un numero"})
})

