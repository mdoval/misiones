import { CreatePropiedad } from "@/app/ui/dashboard/propiedades/buttons";
import TablePropiedades from "@/app/ui/dashboard/propiedades/table-propiedades";
import Search from "@/app/ui/site/search";

export default function PropiedadesPage({ searchParams, }: { searchParams?: { query?: string; page?: string };}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Propiedades</h1>
      <hr />
      <div className="w-full flex space-x-4">
        <Search placeHolder="Buscar..." />
        <CreatePropiedad />
        </div>
        <TablePropiedades query={query} currentPage={currentPage} />
    </div>
  );
}