"use client";

import { createPropiedad } from "@/lib/actions";
import { FormState } from "@/lib/definitions";
import Link from "next/link";
import { useFormState } from "react-dom";
import Alert from "../../site/alert";

export default function CreatePropiedadForm() {
  const initialState: FormState = { message: null, errors: {} };
  const [errors, dispatch] = useFormState(createPropiedad, initialState)

  return (
    <form action={dispatch} className="w-full flex flex-col space-y-4">
      <label className="form-control">
        <div className="label">
          <span className="label-text">Describa la propiedad</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Bio"
          name="descripcion"
        />
        <div className="label">
          {errors.errors?.descripcion &&
            errors.errors.descripcion.map((error: string) => (
              <span key={error} className="label-text-alt text-red-800">{error}</span>
            ))}
        </div>
      </label>
      <div className="w-full flex space-x-4 justify-end">
        <button className="btn btn-primary w-1/6">Guardar</button>
        <Link className="btn btn-error w-1/6" href={"/dashboard/propiedades"}>
          Cancelar
        </Link>
      </div>
      {errors.message? <Alert descripcion={errors.message as string} hidden={false} />: "" }
    </form>
  );
}
