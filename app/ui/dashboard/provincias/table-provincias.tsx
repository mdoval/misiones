import { fetchProvinciasFiltradas } from "@/lib/data";
import {
  DeleteButton,
  EditButton,
} from "@/app/ui/dashboard/provincias/buttons";

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
                <td>{provincia.descripcion}</td>
                <td className="space-x-2">
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
