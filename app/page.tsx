import { MainBanner2 } from "./ui/site/main-banner";
import MainNavBar from "./ui/site/main-nav-bar";
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('@/app/ui/map/map'), {
  ssr: false
});

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="w-full">
        <MainNavBar />
      </div>
      <div className="h-full w-full">
        <div className="h-full w-full flex flex-col">
          <MainBanner2 />
          <div><DynamicMap /></div>
        </div>
      </div>
    </div>
  );
}
