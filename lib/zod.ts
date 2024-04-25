import { z } from "zod";

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