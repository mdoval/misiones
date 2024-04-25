"use client";

import { useFormState } from "react-dom";
import { createProvincia } from "@/lib/actions";
import { ProvinciaState } from "@/lib/definitions";
import Alert from "../../site/alert";
import Link from "next/link";

export default function CreateProvinciaForm() {
  const initialState: ProvinciaState = { message: null, errors: {} };
  const [erroresDevueltos, dispatch] = useFormState(
    createProvincia,
    initialState
  );

  return (
    <form action={dispatch} className="w-full flex flex-col space-y-4">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Nombre de Provincia?</span>
        </div>
        <input
          type="text"
          placeholder="Ingrese aqui.."
          className="input input-bordered w-1/2"
          name="descripcion"
        />
        <div className="label">
          {erroresDevueltos.errors?.descripcion &&
            erroresDevueltos.errors.descripcion.map((error: string) => (
              <span key={error} className="label-text-alt text-red-800">{error}</span>
            ))}
        </div>
      </label>
      <div className="w-full flex space-x-4 justify-end">
        <button className="btn btn-primary w-1/6">Guardar</button>
        <Link className="btn btn-error w-1/6" href={"/dashboard/provincias"} >Cancelar</Link>
      </div>
      {erroresDevueltos.message? <Alert descripcion={erroresDevueltos.message as string} hidden={false} />: "" }
    </form>
  );
}
