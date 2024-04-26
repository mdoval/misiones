"use client";

import { createPropiedad } from "@/lib/actions";
import { FormState } from "@/lib/definitions";
import Link from "next/link";
import { useFormState } from "react-dom";
import Alert from "../../site/alert";
import { Tipos } from "@prisma/client";
import { useState } from "react";

export default function CreatePropiedadForm({
  tipos,
}: {
  tipos: Tipos[] | undefined;
}) {
  const initialState: FormState = { message: null, errors: {} };
  const [errors, dispatch] = useFormState(createPropiedad, initialState);

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
              <span key={error} className="label-text-alt text-red-800">
                {error}
              </span>
            ))}
        </div>
      </label>
      <SeleccionTipoPropiedad tipos={tipos} />
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

function SeleccionTipoPropiedad({ tipos }: { tipos: Tipos[] | undefined }) {
  /*const initialTipo = tipos && tipos.length > 0 ? tipos[0] : null;
  const [tipo, setTipo] = useState(initialTipo);*/

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">Describa la propiedad</span>
      </div>
      <select
        className="select w-full max-w-xs"
        name="tipo"
        defaultValue={1}
      >
        {tipos?.map((tipo) => {
          return (
            <option key={tipo.id} value={tipo.id}>
              {tipo.descripcion}
            </option>
          );
        })}
      </select>
    </label>
  );
}
