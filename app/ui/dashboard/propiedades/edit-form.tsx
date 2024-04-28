"use client";

import { updatePropiedad, subirFotoDePropiedad } from "@/lib/actions";
import { FormState } from "@/lib/definitions";
import Link from "next/link";
import { useFormState } from "react-dom";
import Alert from "../../site/alert";
import { Servicios, Tipos } from "@prisma/client";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { ModalSmall } from "../../site/modal";
import { GrGallery } from "react-icons/gr";
import { GoUpload } from "react-icons/go";

export default function EditPropiedadForm({
  propiedad,
  tipos,
  servicios,
  serviciosSeleccionados,
}: {
  propiedad:
    | { id: number; descripcion: string; userId: string; tipoId: number }
    | null
    | undefined;
  tipos: Tipos[] | undefined;
  servicios: Servicios[] | undefined;
  serviciosSeleccionados: boolean[];
}) {
  const id = propiedad?.id.toString();
  const updatePropiedadWithId = updatePropiedad.bind(null, id);
  const initialState: FormState = { message: null, errors: {} };
  const [errors, dispatch] = useFormState(updatePropiedadWithId, initialState);

  return (
    <div>
      <form action={dispatch} className="w-full flex flex-col space-y-4">
        <div>
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
          <div className="w-1/2">
            <SeleccionTipoPropiedad tipos={tipos} value={propiedad?.tipoId} />
          </div>
          <div className="w-1/2">
            <UbicacionPropiedad />
          </div>
        </div>
        <div className="flex w-full space-x-4">
          <div className="w-1/2">
            <ServiciosDisponibles
              servicios={servicios}
              serviciosSeleccionados={serviciosSeleccionados}
            />
          </div>
        </div>
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
      <div className="w-1/2">
        <GaleriaDeImagenes id={propiedad?.id} />
      </div>
    </div>
  );
}

function SeleccionTipoPropiedad({
  tipos,
  value,
}: {
  tipos: Tipos[] | undefined;
  value: number | undefined;
}) {
  return (
    <div className="card w-3/4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Seleccione el tipo de Propiedad</h2>
        <select
          className="select w-full max-w-xs"
          name="tipo"
          defaultValue={value}
        >
          {tipos?.map((tipo) => {
            return (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descripcion}
              </option>
            );
          })}
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

function ServiciosDisponibles({
  servicios,
  serviciosSeleccionados,
}: {
  servicios: Servicios[] | undefined;
  serviciosSeleccionados: boolean[];
}) {
  //console.log(serviciosSeleccionados)
  const [seleccionados, setSeleccionados] = useState<boolean[]>(
    serviciosSeleccionados
  );
  //console.log(seleccionados)

  const manejarCambioCheckbox = (index: number) => {
    const nuevosSeleccionados = [...seleccionados];
    nuevosSeleccionados[index] = !nuevosSeleccionados[index];
    setSeleccionados(nuevosSeleccionados);
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title ">Servicios Disponibles</h2>
        <div className="flex flex-wrap">
          {servicios?.map((servicio, index) => {
            return (
              <div className="w-1/4 flex align-middle" key={servicio.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${servicio.id}`}
                  checked={seleccionados[index]}
                  name={`checkboxServicios`}
                  //defaultChecked
                  value={servicio.id}
                  className="checkbox m-2"
                  onChange={() => manejarCambioCheckbox(index)}
                />
                <span className="label-text m-2">{servicio.descripcion}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GaleriaDeImagenes({id}: {id: number | undefined}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="card w-3/4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Galeria de Imagenes</h2>
        <button
          className="btn bg-green-400 w-1/3"
          onClick={() => setShow(!show)}
        >
          <GrGallery />
          Subir Imagen
        </button>
      </div>
      <ModalSmall title="Subir Imagenes" show={show}>
        <form action={subirFotoDePropiedad} className="flex flex-col">
          <input type="hidden" value={id} name="id" />
          <input type="file" className="file-input w-full max-w-xs" name="file" />
          <button className="btn bg-blue-700 text-white"> <GoUpload /> Subir Imagen</button>
        </form>
      </ModalSmall>
    </div>
  );
}
