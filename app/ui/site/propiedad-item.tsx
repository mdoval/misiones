import Image from "next/image";
import Link from "next/link";

export function PropiedadItem({ propiedad }: { propiedad: any }) {
  return (
    <div className="border space-y-2 flex p-2 mb-2">
      <div className="w-1/5 flex items-center justify-center">
        <PropiedadImagen imagen={propiedad.imagenes[0].url} />
      </div>
      <div className="w-1/2 flex flex-col">
        <h1>
          <Link href={`/propiedades/${propiedad.id}`} className="hover:text-blue-600">{propiedad.nombre}</Link>
        </h1>
        <span>{propiedad.tipo.descripcion}</span>
        <span className="font-extralight">" {propiedad.descripcion} "</span>
      </div>
    </div>
  );
}

export function PropiedadImagen({ imagen }: { imagen: string }) {
  return <Image src={`/images/propiedades/${imagen}`} alt={imagen} width={100} height={100} />;
}
