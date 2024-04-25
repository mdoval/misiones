"use client";

import { createPropiedad } from "@/lib/actions";
import { FormState } from "@/lib/definitions";
import Link from "next/link";
import { useFormState } from "react-dom";
import Alert from "../../site/alert";

export default function EditPropiedadForm({
  propiedad,
}: {
  propiedad:
    | { id: number; descripcion: string; userId: string }
    | null
    | undefined;
}) {
  const initialState: FormState = { message: null, errors: {} };
  const [errors, dispatch] = useFormState(createPropiedad, initialState);

  return (
    <form action={dispatch} className="w-full flex flex-col space-y-4">
      <div className="bg-red-200">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Describa la propiedad</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
            name="descripcion"
            defaultValue={propiedad?.descripcion}
          />
          <div className="label">
            {errors.errors?.descripcion &&
              errors.errors.descripcion.map((error: string) => (
                <span key={error} className="label-text-alt text-red-800">
                  {error}
                </span>
              ))}
          </div>
        </label>
      </div>
      <div className="flex w-full">
        <div className="bg-pink-200 w-1/2" >
          <SeleccionTipoPropiedad />
        </div>
        <div className="bg-blue-200 w-1/2">
          <UbicacionPropiedad />
        </div>
      </div>
      <div className="bg-green-200">Servicios Disponibles</div>
      <div className="bg-yellow-200">Imagenes</div>
      <div className="w-full flex space-x-4 justify-end">
        <button className="btn btn-primary w-1/6">Guardar</button>
        <Link className="btn btn-error w-1/6" href={"/dashboard/propiedades"}>
          Cancelar
        </Link>
      </div>
      {errors.message ? (
        <Alert descripcion={errors.message as string} hidden={false} />
      ) : (
        ""
      )}
    </form>
  );
}

function SeleccionTipoPropiedad() {
  return (
    <div className="card w-3/4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Seleccione el tipo de Propiedad</h2>
        <select className="select w-full max-w-xs">
          <option disabled selected>
            Que tipo de alojamiento es?
          </option>
          <option>Cabaña</option>
          <option>Apartamento</option>
          <option>Hotel</option>
        </select>
      </div>
    </div>
  );
}

function UbicacionPropiedad() {
  return (
    <div className="card w-3/4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Ubicacion de la propiedad</h2>
      </div>
    </div>
  );
}
