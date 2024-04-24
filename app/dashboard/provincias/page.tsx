import { CreateProvincia } from "@/app/ui/dashboard/provincias/buttons";
import TableProvincias from "@/app/ui/dashboard/provincias/table-provincias";
import Search from "@/app/ui/site/search";

export default function ProvinciasPage({ searchParams, }: { searchParams?: { query?: string; page?: string };}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Provincias</h1>
      <hr />
      <div className="w-full flex space-x-4">
        <Search placeHolder="Buscar..." />
        <CreateProvincia />
        </div>
      <TableProvincias query={query} currentPage={currentPage} />
    </div>
  );
}
