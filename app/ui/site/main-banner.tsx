import SearchForm from "./search-form";

export async function MainBanner2() {
  return (
    <div className="w-full h-1/3 bg-blue-500 flex flex-col space-y-3 justify-center pb-8 pt-8">
      <h1 className="text-white text-5xl font-bold text-center">Encontrá tu alojamiento en Misiones</h1>
      <div>
        <SearchForm placeHolder="A donde quieres ir?" />
      </div>
    </div>
  );
}
