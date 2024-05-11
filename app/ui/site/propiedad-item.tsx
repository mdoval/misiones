import { Propiedades } from "@prisma/client";

export function PropiedadItem({propiedad}: {propiedad: any}) {
    console.log(propiedad)
    return <div className="p-8 border space-y-2 flex flex-col">
        <h1><b>{propiedad.nombre}</b></h1>
        <span>{propiedad.tipo.descripcion}</span>
        <span className="font-extralight">" {propiedad.descripcion} "</span>                
    </div>
}