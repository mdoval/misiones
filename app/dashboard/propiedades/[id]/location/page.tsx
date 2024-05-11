"use client";

import { SearchInput } from "@/app/ui/site/search-input";
import { useState } from "react";
import dynamic from "next/dynamic";
import MapMarker from "@/app/ui/map/map-marker";
import Link from "next/link";
import { updateUbicacion } from "@/lib/actions";
import { FormState } from "@/lib/definitions";
import { useFormState } from "react-dom";

const DynamicMap = dynamic(() => import("@/app/ui/map/map"), {
  ssr: false,
});

export default function EditPropiedad({ params }: { params: { id: string } }) {
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);  
  const id = params.id
  const updateUbicacionWithId = updateUbicacion.bind(null, id);
  const initialState: FormState = { message: null, errors: {} };
  const [errors, dispatch] = useFormState(updateUbicacionWithId, initialState); 

  return (
    <form action={dispatch}>
      <div className="w-full space-y-4 p-10">
        <h1 className="text-3xl">Propiedad / Ubicacion</h1>
        <hr />

        <div className="flex flex-row w-full">
          <div className="w-1/2 p-4">
            <SearchInput
              latitud={lat}
              longitud={lng}
              setLatitud={setLat}
              setLongitud={setLng}
            />

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Latitud</span>
              </div>
              <input
                type="number"
                placeholder="Latitud"
                className="input input-bordered w-full"
                name="lat"
                value={lat}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Longitud</span>
              </div>
              <input
                type="number"
                placeholder="Longitud"
                className="input input-bordered w-full"
                name="lng"
                value={lng}
              />
            </label>
          </div>
          <div className="w-1/2">
            <DynamicMap h={30} w={30}>
              <MapMarker
                position={[lat, lng]}
                text="Su Propiedad Aparecera Aqui!"
              />
            </DynamicMap>
          </div>
        </div>
        <div>
          <button className="btn bg-blue-700 text-white">Guardar</button>
          <Link
            href={`/dashboard/propiedades/${params.id}/edit`}
            className="btn bg-red-800 text-white"
          >
            Volver
          </Link>
        </div>
      </div>
    </form>
  );
}
