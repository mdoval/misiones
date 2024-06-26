import EditPropiedadForm from "@/app/ui/dashboard/propiedades/edit-form";
import { fetchPropiedadById, fetchServicios, fetchTipos } from "@/lib/data";

export default async function EditPropiedad({params}: {params: { id: string };}) {
  const propiedad = await fetchPropiedadById(params.id);
  const tipos = await fetchTipos();
  const servicios = await fetchServicios();
  const serviciosSeleccionados = getServiciosSeleccionados(servicios, propiedad?.servicios)  
  
  //Combina los servicios existentes, con los seleccionados en una propiedad
  function getServiciosSeleccionados(
     servicios: {id:number, descripcion:string}[] | undefined, 
     serviciosSeleccionados: {id:number, descripcion:string}[] | undefined 
    )
    {    
    const res = new Array(servicios?.length).fill(false)
    serviciosSeleccionados?.map((servicio: {id:number, descripcion:string}) => {
      res[servicio.id - 1] = true
    })    
    return res
  }

  return (
    <div className="w-full space-y-4 p-10">
      <h1 className="text-3xl">Editar Propiedad</h1>
      <hr />
      <EditPropiedadForm 
        propiedad={propiedad} 
        tipos={tipos} 
        servicios={servicios} 
        serviciosSeleccionados={serviciosSeleccionados} 
        imagenes={propiedad?.imagenes}
      />
    </div>
  );
}
