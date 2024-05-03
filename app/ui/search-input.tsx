"use client";

import { obtenerCoordenadas } from "@/lib/map-actions";
import { ADDRCONFIG } from "dns";
import { useState } from "react";
import { ChangeEvent } from "react";

interface ISitio {
    title: string, 
    position: {
        lat: number, 
        lng: number
    }
}

export function SearchInput() {
  const [sitios, setSitios] = useState<ISitio[] | undefined>(undefined);
  const [direccion, setDireccion] = useState("")
  const [lat, setLat] = useState<number | undefined>(undefined)
  const [lng, setLng] = useState<number | undefined>(undefined)

  async function cargarCordenadas(e: ChangeEvent<HTMLInputElement>) {
    let address = e.target.value
    setDireccion(address)
    const datos = await obtenerCoordenadas(address) 
    setSitios(datos.items)
  }

  function selectAddress(sitio: ISitio) {
    setDireccion(sitio.title)
    setLat(sitio.position.lat)
    setLng(sitio.position.lng)
    setSitios(undefined) 
  }

  return (
    <label className="form-control w-1/2">
      <div className="label">
        <span className="label-text">
          Cual es la direccion del Alojamiento?
        </span>
      </div>
      <input
        type="text"
        placeholder="Ingrese direccion"
        className="input input-bordered w-full"
        name="address"
        onChange={cargarCordenadas}
        value={direccion}
      />
      <input type="hidden" name="lat" value={lat} />
      <input type="hidden" name="lat" value={lng} />

      <div className="w-full border shadow-lg">
        {sitios?.map((sitio: ISitio, index) => {
            return <div key={index} className="w-full p-1 hover:cursor-pointer hover:bg-gray-100" onClick={() => selectAddress(sitio)}>{sitio.title}</div>
        })}        
      </div>
    </label>
  );
}
