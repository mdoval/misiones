"use client";

import dynamic from "next/dynamic";
import MapMarker from "@/app/ui/map/map-marker";

const DynamicMap = dynamic(() => import("@/app/ui/map/map"), {
  ssr: false,
});

export default function MainMap() {
  return (
    <DynamicMap h={40} w={40}>
      <MapMarker position={[-27.37, -55.92]} text="Icono 1" />
      <MapMarker position={[-27.4, -55.92]} text="Icono 2" />
    </DynamicMap>
  );
}
