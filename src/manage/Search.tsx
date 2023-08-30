import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get("query");
  const [value, setValue] = useState(
    initialValue ? decodeURIComponent(initialValue) : "",
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams({ query: encodeURIComponent(value) });
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, setSearchParams]);

  return (
    <div className="flex pb-4">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative mt-1 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          className=" block w-full max-w-sm rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:shadow-lg focus:outline-gray-400"
          placeholder="Search"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
      </div>
    </div>
  );
};
