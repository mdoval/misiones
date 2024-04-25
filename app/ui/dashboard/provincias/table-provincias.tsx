import { fetchProvinciasFiltradas } from "@/lib/data";
import { EditButton } from "@/app/ui/dashboard/provincias/buttons";
import { DeleteButton } from '@/app/ui/dashboard/provincias/delete-button'

export default async function TableProvincias({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const provincias = await fetchProvinciasFiltradas(query, currentPage);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>PROVINCIA</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {provincias?.map((provincia) => {
            return (
              <tr className="hover:bg-base-200" key={provincia.id}>
                <th>{provincia.id}</th>
                <td className="w-3/4">{provincia.descripcion}</td>
                <td className="space-x-1">
                  <EditButton id={provincia.id} />
                  <DeleteButton id={provincia.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
