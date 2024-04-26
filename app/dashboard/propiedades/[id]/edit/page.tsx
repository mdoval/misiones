import EditPropiedadForm from "@/app/ui/dashboard/propiedades/edit-form";
import { fetchPropiedadById, fetchServicios, fetchTipos } from "@/lib/data";

export default async function EditPropiedad({params}: {params: { id: string };}) {
  const propiedad = await fetchPropiedadById(params.id);
  const tipos = await fetchTipos();
  const servicios = await fetchServicios();
    
  return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Editar Propiedad</h1>
      <hr />
      <EditPropiedadForm propiedad={propiedad} tipos={tipos} servicios={servicios} />
    </div>
  );
}
