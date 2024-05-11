import { fetchPropiedadesFiltradas } from "@/lib/data";
import { EditButton } from "@/app/ui/dashboard/propiedades/buttons";
//import { DeleteButton } from '@/app/ui/dashboard/provincias/delete-button'

export default async function TablePropiedades({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const propiedades = await fetchPropiedadesFiltradas(query, currentPage);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>PROPIEDADES</th>
            <th>DIRECCION</th>
            <th>TIPO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {propiedades?.map((propiedad) => {
            return (
              <tr className="hover:bg-base-200" key={propiedad.id}>
                <th>{propiedad.id}</th>
                <td className="w-3/4">{propiedad.descripcion}</td>
                <td className="w-3/4">{propiedad.address}</td>
                <td className="w-3/4">{propiedad.tipo.descripcion}</td>
                <td className="space-x-1">
                  <EditButton id={propiedad.id} />
                  {/*<DeleteButton id={propiedad.id} />*/}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}