import Image from "next/image";

export default function MainBanner() {
  return (
    <div className="w-full bg-white border">
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <div className="w-full h-full relative">            
            <Image src="/images/banner1.jpg" alt="Banner 1" className="w-full h-full" width={1070} height={940} />
            <div className="absolute bottom-0 left-0 sm:mb-10 sm:ml-14">
              <h1 className="font-bold text-white sm:text-5xl">
                Visita Colonia Aurora en su maximo esplendor
              </h1>
            </div>
          </div>
        </div>
        <div id="item2" className="carousel-item w-full">
          <div className="w-full h-full relative">
          <Image src="/images/banner2.jpg" alt="Banner 1" className="w-full h-full" width={1070} height={940} />
            <div className="absolute bottom-0 left-0 sm:mb-10 sm:ml-14">
              <h1 className="font-bold text-white sm:text-5xl">
                Conoce las islas de Colonia Aurora
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
      </div>
    </div>
  );
}
