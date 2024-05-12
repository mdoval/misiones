"use client";

import dynamic from "next/dynamic";
import MapMarker from "@/app/ui/map/map-marker";

const DynamicMap = dynamic(() => import("@/app/ui/map/map"), {
  ssr: false,
});

export default function MainMap({propiedades}: {propiedades: any}) {

  return (
    <DynamicMap h={40} w={40}>
      {propiedades?.map((propiedad: any) => {
        return <MapMarker position={[propiedad.latitud as number, propiedad.longitud as number]} text={propiedad.nombre} />
      })}      
    </DynamicMap>
  );
}
