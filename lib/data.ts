import prisma from '@/db/prisma'

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