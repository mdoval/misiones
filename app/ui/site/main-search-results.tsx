import { fetchPropiedadesFiltradas } from "@/lib/data";
import { PropiedadItem } from "./propiedad-item";

export async function MainResults({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const propiedades = await fetchPropiedadesFiltradas(query, currentPage);

  return (
    <div className="w-1/2 bg-white border shadow-xl p-4">
      <h1 className="text-3xl">Propiedades</h1>
      <hr />
      {propiedades?.map((propiedad, index) => {
        return <PropiedadItem key={index} propiedad={propiedad} />;
      })}
    </div>
  );
}
