import { FaSearch } from "react-icons/fa";

export default function SearchForm() {
  const initialValue = {errors: { destino: null, entrada: null, salida: null, adultos: null, menores: null }}
  return (
    <form>
      <div className="w-3/5 w- ml-auto mr-auto flex flex-col bg-blue-200 border shadow-lg rounded-lg">
        <div>
          <label className="form-control w-1/2 pl-4">
            <div className="label">
              <span className="label-text">¿ A donde quieres ir ?</span>
            </div>
            <input
              name="destino"
              type="text"
              placeholder="Ingrese lugar"
              className="input input-bordered w-full"
            />
              {initialValue.errors.destino? <div className="label"><span className="label-text-alt">Error</span></div> : ""}
          </label>
        </div>
        <div className="flex flex-row space-x-10 pl-4 items-end pb-2">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Entrada</span>
            </div>
            <input
              name="entrada"
              type="date"
              placeholder="dd/mm/aaaa"
              className="input input-bordered"
            />
              {initialValue.errors.entrada? <div className="label"><span className="label-text-alt">Error</span></div>: ""}
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Salida</span>
            </div>
            <input
              name="salida"
              type="date"
              placeholder="dd/mm/aaaa"
              className="input input-bordered"
            />            
              {initialValue.errors.salida? <div className="label"><span className="label-text-alt">Error</span></div>: ""}           
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Adultos</span>
            </div>
            <input
              name="adultos"
              type="number"
              placeholder="0"
              className="input input-bordered"
            />            
              {initialValue.errors.adultos? <div className="label"><span className="label-text-alt">Error</span></div>: ""}             
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Niños</span>
            </div>
            <input
              name="menores"
              type="number"
              placeholder="0"
              className="input input-bordered"
            />            
             {initialValue.errors.menores? <div className="label"><span className="label-text-alt">Error</span></div>: ""}            
          </label>

          <button className="btn bg-blue-800 text-white w-1/6">
            <FaSearch /> Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
