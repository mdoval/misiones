export default function SearchForm() {
  return (
    <form>
      <div className="text-center p-5 space-y-2 sm:space-x-2">
        <input
          type="text"
          placeholder="Destino"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="date"
          placeholder="Desde"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="date"
          placeholder="Hasta"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Adultos"
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          placeholder="Niños"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="btn w-1/2 btn-primary sm:w-1/12">Buscar</button>
      </div>
    </form>
  );
}
