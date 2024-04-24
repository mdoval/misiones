"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { IoIosSearch } from "react-icons/io";

export default function Search({ placeHolder }: { placeHolder: string }) {
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
    <label className="input input-bordered flex items-center gap-2 w-4/5">
      <input
        type="text"
        className="grow"
        placeholder={placeHolder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <IoIosSearch className="text-3xl" />
    </label>
  );
}
