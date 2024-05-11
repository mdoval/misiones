"use client";

import { obtenerCoordenadas } from "@/lib/map-actions";
import { useState } from "react";
import { ChangeEvent } from "react";

interface ISitio {
    title: string, 
    position: {
        lat: number, 
        lng: number
    }
}

interface Props {
  latitud: number,
  longitud: number,
  setLatitud: (lat: number) => void,
  setLongitud: (lat: number) => void,
}

export function SearchInput({latitud, longitud, setLatitud, setLongitud}: Props) {
  const [sitios, setSitios] = useState<ISitio[] | undefined>(undefined);
  const [direccion, setDireccion] = useState("")

  async function cargarCoordenadas(e: ChangeEvent<HTMLInputElement>) {
    let address = e.target.value
    setDireccion(address)
    const datos = await obtenerCoordenadas(address) 
    setSitios(datos.items)
  }

  function selectAddress(sitio: ISitio) {
    setDireccion(sitio.title)
    setLatitud(sitio.position.lat)
    setLongitud(sitio.position.lng)
    setSitios(undefined) 
  }

  return (
    <label className="form-control w-full">
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
        onChange={cargarCoordenadas}
        value={direccion}
      />
      <div className="w-full border shadow-lg">
        {sitios?.map((sitio: ISitio, index) => {
            return <div key={index} className="w-full p-1 hover:cursor-pointer hover:bg-gray-100" onClick={() => selectAddress(sitio)}>{sitio.title}</div>
        })}        
      </div>
    </label>
  );
}
