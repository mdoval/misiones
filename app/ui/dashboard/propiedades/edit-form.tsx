"use client";

import { updatePropiedad, subirFotoDePropiedad, eliminarFotoDePropiedad } from "@/lib/actions";
import { FormState } from "@/lib/definitions";
import Link from "next/link";
import { useFormState } from "react-dom";
import Alert from "../../site/alert";
import { Servicios, Tipos } from "@prisma/client";
import { useState } from "react";
import { ModalSmall } from "../../site/modal";
import { GrGallery } from "react-icons/gr";
import { GoUpload } from "react-icons/go";
import Image from "next/image";

export default function EditPropiedadForm({
  propiedad,
  tipos,
  servicios,
  serviciosSeleccionados,
  imagenes,
}: {
  propiedad:
    | { id: number; descripcion: string; userId: string; tipoId: number }
    | null
    | undefined;
  tipos: Tipos[] | undefined;
  servicios: Servicios[] | undefined;
  serviciosSeleccionados: boolean[];
  imagenes: { id: number; url: string }[] | undefined;
}) {
  const id = propiedad?.id.toString();
  const updatePropiedadWithId = updatePropiedad.bind(null, id);
  const initialState: FormState = { message: null, errors: {} };
  const [errors, dispatch] = useFormState(updatePropiedadWithId, initialState);

  return (
    <div>
      <form action={dispatch} className="w-full flex flex-col space-y-4">
        <div className="w-full flex space-x-4 justify-end">
          <button className="btn btn-primary w-1/6">Guardar</button>
          <Link className="btn btn-error w-1/6" href={"/dashboard/propiedades"}>
            Cancelar
          </Link>
        </div>
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
            <UbicacionPropiedad id={propiedad?.id} />
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
        {errors.message ? (
          <Alert descripcion={errors.message as string} hidden={false} />
        ) : (
          ""
        )}
      </form>
      <div className="w-1/2 mt-4">
        <GaleriaDeImagenes id={propiedad?.id} imagenes={imagenes} />
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

function UbicacionPropiedad({id}: {id: number | null | undefined}) {
  return (
    <div className="card w-3/4 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Ubicacion de la propiedad</h2>
        <Link href={`/dashboard/propiedades/${id}/location`} className="btn btn-success text-white">Configurar Ubicacion</Link>
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

function GaleriaDeImagenes({
  id,
  imagenes,
}: {
  id: number | undefined;
  imagenes: { id: number; url: string }[] | undefined;
}) {
  const [show, setShow] = useState<boolean>(false);
  const [spinner, setSpinner] = useState<boolean>(false);

  async function dispatch(formData: FormData) {
    setSpinner(true);
    await subirFotoDePropiedad(formData);
    setSpinner(false);
    setShow(!show);
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex">
          <div className="w-1/3">
            <h2 className="card-title">Galeria de Imagenes</h2>
            <button
              className="btn w-full"
              onClick={() => setShow(!show)}
            >
              <GrGallery />
              Subir Imagen
            </button>
          </div>
          <div className="flex flex-wrap w-full">
            {imagenes?.map((imagen) => {
              return <Imagen key={imagen.id} idpropiedad={id} imagen={imagen} />
            })}
          </div>
        </div>
      </div>
      <ModalSmall title="Subir Imagenes" show={show}>
        <div hidden={spinner}>
          <form action={dispatch} className="flex flex-col">
            <input type="hidden" value={id} name="id" />
            <input
              type="file"
              className="file-input w-full max-w-xs"
              name="file"
            />
            <button className="btn bg-blue-700 text-white">
              <GoUpload /> Subir Imagen
            </button>
          </form>
        </div>
        <div hidden={!spinner}>
          <div className="w-full flex flex-col items-center text-center">
            <h1>Subiendo Imagen</h1>
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      </ModalSmall>
    </div>
  );
}

function Imagen({idpropiedad,imagen}: {idpropiedad: number | undefined, imagen: {id: number; url: string} }) {
  const [show, setShow] = useState<boolean>(false)

  async function handleSubmit() {    
    console.log("Eliminando Foto")
    if(idpropiedad != undefined) {
      await eliminarFotoDePropiedad(idpropiedad, imagen.id)
    }
    setShow(false)
  }

  function cerrarVentana() {
    setShow(false)
  }
  
  return (
    <div className="m-2 border shadow-lg w-28 h-28 bg-white flex align-middle justify-center hover:cursor-pointer" onClick={() => setShow(true)}>
      <Image src={`/images/propiedades/${imagen.url}`} width={200} height={200} alt={imagen.url} />
      <ModalSmall title="Quitar Imagen" show={show}>
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl">Desea Eliminar esta imagen ?</h1>
          <Image src={`/images/propiedades/${imagen.url}`} width={200} height={200} alt={imagen.url} />
          <div className="flex">
            <button className="btn bg-blue-800 text-white w-1/2" onClick={() => handleSubmit()}>Si</button>
            <button className="btn bg-red-800 text-white w-1/2" onClick={() => cerrarVentana()}>No</button>
          </div>
        </div>
      </ModalSmall>
    </div>
  )
}
