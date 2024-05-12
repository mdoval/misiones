import { fetchPropiedadesFiltradas } from "@/lib/data";
import { MainBanner2 } from "./ui/site/main-banner";
import MainMap from "./ui/site/main-map";
import MainNavBar from "./ui/site/main-nav-bar";
import { MainResults } from "./ui/site/main-search-results";

export default async function Home({ searchParams, }: { searchParams?: { query?: string; page?: string };}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;  
  const propiedades = await fetchPropiedadesFiltradas(query, currentPage);


  return (
    <div className="h-full w-full">
      <div className="w-full">
        <MainNavBar />
      </div>
      <div className="h-full w-full">
        <div className="h-full w-full flex flex-col">
          <MainBanner2 />
          <div className="p-10">
            <div className="flex flex-row space-x-5">
              <MainResults query={query} currentPage={currentPage}  />
              <MainMap propiedades={propiedades} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
