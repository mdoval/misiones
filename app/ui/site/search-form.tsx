"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { IoIosSearch } from "react-icons/io";

export default function SearchForm({ placeHolder }: { placeHolder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
      <div className="w-3/5 ml-auto mr-auto flex flex-row bg-blue-200 border shadow-lg rounded-lg">
        <div className="w-full">
          <label className="form-control w-full p-4">
            <div className="label">
              <span className="label-text">¿ A donde quieres ir ?</span>
            </div>
            <input
              type="text"              
              placeholder={placeHolder}
              className="input input-bordered w-full"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            <IoIosSearch className="text-3xl" />
          </label>
        </div>
      </div>
  );
}
