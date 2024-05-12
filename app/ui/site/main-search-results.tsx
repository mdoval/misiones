import { fetchPropiedadesFiltradas } from "@/lib/data";
import { PropiedadItem } from "./propiedad-item";

export async function MainResults({propiedades}: {propiedades: any}) {
  
  return (
    <div className="w-1/2 bg-white border shadow-xl p-4">
      <h1 className="text-3xl">Propiedades</h1>
      <hr />
      {propiedades?.map((propiedad:any) => {
        return <PropiedadItem key={propiedad.id} propiedad={propiedad} />;
      })}
    </div>
  );
}
