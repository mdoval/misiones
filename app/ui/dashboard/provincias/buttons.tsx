import Link from "next/link";
import { IoMdTrash, IoMdAdd, IoMdCreate } from "react-icons/io";

export function DeleteButton({id}: {id: number}) {
  return (
    <Link href={`/dashboard/provincias/${id}/delete`} className="btn btn-error text-white">
      <IoMdTrash /> Eliminar
    </Link>
  );
}

export function EditButton({id}: {id: number}) {
  return (
    <Link href={`/dashboard/provincias/${id}/edit`} className="btn btn-primary text-white">
      <IoMdCreate /> Editar
    </Link>
  );
}

export function CreateProvincia() {
    return (
        <Link href={`/dashboard/provincias/create`} className="btn btn-primary w-1/5 text-white">
          <IoMdAdd /> Nueva Provincia
        </Link>
      );
    
}