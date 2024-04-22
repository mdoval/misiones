'use client'

import { userRegister } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function RegisterForm() {
  const initialState = "";
  const [state, dispatch] = useFormState(userRegister, initialState)

  return (
    <form action={dispatch} className="bg-blue-200 md:w-1/3 p-5 md:shadow-md flex flex-col space-y-2 rounded-lg">
      <h1 className="md:text-4xl font-bold">Registrando Usuario</h1>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Nombre</span>
        </div>
        <input
          type="text"
          placeholder="Nombre"
          className="input input-bordered w-full max-w-xs"
          name="name"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="email"
          placeholder="example@dominio.com"
          className="input input-bordered w-full max-w-xs"
          name="email"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          placeholder="Contraseña"
          className="input input-bordered w-full max-w-xs"
          name="password"
        />
      </label>
      <button className="btn btn-primary" type="submit">
        Registrar usuario
      </button>
      <div>{state}</div>
    </form>
  );
}
