import Link from "next/link";
import { IoMdAdd, IoMdCreate } from "react-icons/io";

export function EditButton({ id }: { id: number }) {
  return (
    <Link
      href={`/dashboard/propiedades/${id}/edit`}
      className="btn btn-primary text-white"
    >
      <IoMdCreate /> Editar
    </Link>
  );
}

export function CreatePropiedad() {
  return (
    <Link
      href={`/dashboard/propiedades/create`}
      className="btn btn-primary w-1/5 text-white"
    >
      <IoMdAdd /> Nueva Propiedad
    </Link>
  );
}
