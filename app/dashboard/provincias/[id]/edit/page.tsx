//import CreateProvinciaForm from "@/app/ui/dashboard/provincias/form-create";

import EditProvinciaForm from "@/app/ui/dashboard/provincias/edit-form";
import { fetchProvinciaById } from "@/lib/data";

export default async function EditarProvincia({params}: {params: { id: string }}) {
    const id = params.id
    const provincia = await fetchProvinciaById(id)

    return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Nueva Provincia</h1>
      <hr />
        <EditProvinciaForm provincia={provincia} />
    </div>
  );
}
