import { ReactNode } from "react";

export function ModalSmall({children, show, title}: {children: ReactNode, show: boolean, title: string}) {
  return (
    <dialog id="my_modal_5" className={`modal modal-bottom sm:modal-middle ${show? 'modal-open': ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
      </div>
    </dialog>
  );
}
