import CreateProvinciaForm from "@/app/ui/dashboard/provincias/form-create";

export default async function CreateProvincia() {
  return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Nueva Provincia</h1>
      <hr />
      <CreateProvinciaForm />
    </div>
  );
}
