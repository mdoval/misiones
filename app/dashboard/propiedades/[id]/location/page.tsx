'use client'

import { SearchInput } from "@/app/ui/search-input";

export default async function EditPropiedad({
  params,
}: {
  params: { id: string };
}) {
  return (
    <form>
      <div className="w-full space-y-4 p-10">
        <h1 className="text-3xl">Propiedad / Ubicacion</h1>
        <hr />

        <SearchInput />

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Latitud
            </span>
          </div>
          <input
            type="text"
            placeholder="Latitud"
            className="input input-bordered w-full"
            name="lat"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Longitud
            </span>
          </div>
          <input
            type="text"
            placeholder="Longitud"
            className="input input-bordered w-full"
            name="lng"
          />
        </label>
      </div>
    </form>
  );
}
