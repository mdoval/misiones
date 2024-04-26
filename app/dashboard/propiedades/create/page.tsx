import CreatePropiedadForm from "@/app/ui/dashboard/propiedades/form-create";
import { fetchTipos } from "@/lib/data";

export default async function CreatePropiedad() {
  const tipos = await fetchTipos()
  return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Nueva Propiedad</h1>
      <hr />
      <CreatePropiedadForm tipos={tipos} />
    </div>
  );
}
