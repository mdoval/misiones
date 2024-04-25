"use client";

import { useFormState } from "react-dom";
import { updateProvincia } from "@/lib/actions";
import { ProvinciaForm, ProvinciaState } from "@/lib/definitions";
import Alert from "../../site/alert";

export default function EditProvinciaForm({
  provincia,
}: {
  provincia: ProvinciaForm | undefined | null;
}) {
  const id = provincia?.id.toString()
  const updateProvinciaWithId = updateProvincia.bind(null, id);
  const initialState: ProvinciaState = { message: null, errors: {} };
  const [erroresDevueltos, dispatch] = useFormState(updateProvinciaWithId,initialState);

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
          defaultValue={provincia?.descripcion}
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
        <button className="btn btn-error w-1/6">Cancelar</button>
      </div>
      {erroresDevueltos.message ? (
        <Alert
          descripcion={erroresDevueltos.message as string}
          hidden={false}
        />
      ) : (
        ""
      )}
    </form>
  );
}
