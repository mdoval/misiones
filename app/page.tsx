import Image from "next/image";
import { MainBanner2 } from "./ui/site/main-banner";
import SearchForm from "./ui/site/search-form";
import MainNavBar from "./ui/site/main-nav-bar";

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="w-full">
        <MainNavBar />
      </div>
      <div className="h-full w-full">
        <div className="h-full w-full flex flex-col">
          <MainBanner2 />
        </div>
      </div>
    </div>
  );
}
