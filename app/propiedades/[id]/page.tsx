import { MainBanner2 } from "@/app/ui/site/main-banner";
import MainNavBar from "@/app/ui/site/main-nav-bar";

export default async function PropiedadView({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);
  return (
    <div className="h-full w-full">
      <div className="w-full">
        <MainNavBar />
      </div>
      <div className="h-full w-full">
        <div className="h-full w-full flex flex-col">
          <div className="p-10">
            <div className="flex flex-row space-x-5">
                <h1>Vista de Propiedad</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
