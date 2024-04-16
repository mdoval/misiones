'use client'

import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  //console.log(process.env.AUTH_SECRET)

  return (
    <form action={dispatch} className="bg-blue-200 md:w-1/3 p-5 md:shadow-md flex flex-col space-y-2">
      <h1 className="md:text-4xl font-bold">Formulario de Login</h1>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>
        </div>
        <input
          type="email"
          placeholder="Email"
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
          placeholder="Email"
          className="input input-bordered w-full max-w-xs"
          name="password"
        />
      </label>
      <button className="btn btn-primary" type="submit">Ingresar</button>
      <div className="text-red-600">{errorMessage? errorMessage : ''}</div>
    </form>    
  );
}
