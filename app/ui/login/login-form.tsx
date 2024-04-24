'use client'

import { authenticate } from "@/lib/actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import Alert from "../site/alert";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)

  return (
    <form action={dispatch} className="bg-blue-200 md:w-1/4 p-5 md:shadow-md flex flex-col space-y-3 rounded-lg">
      <h1 className="md:text-4xl font-bold">Formulario de Login</h1>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="email"
          placeholder="example@dominio.com"
          className="input input-bordered w-full max-w-xs"
          name="email"
          required
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
      <button className="btn btn-primary" type="submit">Ingresar</button>
      {errorMessage? <Alert descripcion="Esto es una prueba" hidden={false} /> : ''}
      
      <div className="text-center">No tenes cuenta aun? <Link href={"/register"} className="font-semibold">Registrate aca</Link></div>
    </form>    
  );
}
