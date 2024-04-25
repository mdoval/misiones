import EditPropiedadForm from "@/app/ui/dashboard/propiedades/edit-form";
import { fetchPropiedadById } from "@/lib/data";

export default async function EditPropiedad({params}: {params: { id: string };}) {
  const propiedad = await fetchPropiedadById(params.id);

  return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Editar Propiedad</h1>
      <hr />
      <EditPropiedadForm propiedad={propiedad} />
    </div>
  );
}
