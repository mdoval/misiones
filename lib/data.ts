import prisma from '@/db/prisma'
import { Propiedades } from '@prisma/client';

export async function fetchProvinciasFiltradas(query: string, currentPage: number) {
    const ITEMS_PER_PAGE = 8;
    const SKIP = (currentPage - 1) * ITEMS_PER_PAGE
    console.log(query)
    try{
        const provincias =  await prisma.provincias.findMany({
            where: {
                descripcion: {
                    contains: query
                }
            },
            take: ITEMS_PER_PAGE,
            skip: SKIP
        })
        return provincias
    } catch(error) {
        console.log(error)
    }
}

export async function fetchProvinciaById(id:string) {
    try {
        const provincia = prisma.provincias.findUnique({where: {id: Number(id)}})
        return provincia
    } catch( error ) { 
        console.log(error)
    }
}

export async function fetchPropiedadesFiltradas(query: string, currentPage: number) {
    const ITEMS_PER_PAGE = 8;
    const SKIP = (currentPage - 1) * ITEMS_PER_PAGE
    console.log(query)
    try{
        const propiedades =  await prisma.propiedades.findMany({
            where: {
                descripcion: {
                    contains: query
                }
            },
            take: ITEMS_PER_PAGE,
            skip: SKIP
        })
        return propiedades
    } catch(error) {
        console.log(error)
    }
}

export async function fetchPropiedadById(id:string) {
    try {
        const propiedad = prisma.propiedades.findUnique(
            {
                where: {
                    id: Number(id)
                }, include: {
                    servicios: true
                }
            }
        )
        return propiedad
    } catch( error ) { 
        console.log(error)
    }
}

export async function fetchTipos() {
    try {
        const tipos = await prisma.tipos.findMany()
        return tipos
    } catch( error ) {
        console.log(error)
    }
}

export async function fetchServicios() {
    try {
        const servicios = await prisma.servicios.findMany()
        return servicios
    } catch( error ) {
        console.log(error)
    }
}