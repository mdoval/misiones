"use client";

import { deleteProvincia } from "@/lib/actions";
import { ModalSmall } from "../../site/modal";
import { MouseEventHandler, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { useFormState } from "react-dom";
import { ProvinciaState } from "@/lib/definitions";

export function DeleteButton({ id }: { id: number }) {
 
  function showModal(e:any) {
    e.preventDefault()    
    setShow(!show)
  }
  const [show, setShow] = useState(false);
  const initialState:string = ""
  const deleteProvinciaWithId = deleteProvincia.bind(null, id)
  const [erroresDevueltos, dispatch] = useFormState(deleteProvinciaWithId,initialState);

  return (
    <>
      <button className="btn btn-error text-white" onClick={showModal}>
        <IoMdTrash /> Eliminar
      </button>
      <ModalSmall show={show} title="Eliminar">
        <p className="py-4">Desea eliminar el registro?</p>
        <div className="modal-action">
          <form className="w-full" action={dispatch}>
              <button className="btn btn-primary w-1/2" type="submit">SI</button>            
              <button className="btn btn-error w-1/2" onClick={showModal}>Cancelar</button>
          </form>
          {erroresDevueltos}
        </div>
      </ModalSmall>
    </>
  );
}
