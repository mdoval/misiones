import CreatePropiedadForm from "@/app/ui/dashboard/propiedades/form-create";

export default async function CreatePropiedad() {
  return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Nueva Propiedad</h1>
      <hr />
      <CreatePropiedadForm />
    </div>
  );
}
