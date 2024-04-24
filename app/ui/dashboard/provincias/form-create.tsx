export default function CreateProvinciaForm() {
  return (
    <form className="w-full flex flex-col space-y-4">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Nombre de Provincia?</span>
        </div>
        <input
          type="text"
          placeholder="Ingrese aqui.."
          className="input input-bordered w-full max-w-xs"
        />
        <div className="label">
          <span className="label-text-alt text-red-800">Error</span>
        </div>
      </label>
      <div className="w-full flex space-x-4 justify-end">
        <button className="btn btn-primary w-1/6">Guardar</button>
        <button className="btn btn-error w-1/6">Cancelar</button>
      </div>
    </form>
  );
}
