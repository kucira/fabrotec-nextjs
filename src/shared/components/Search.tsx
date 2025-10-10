"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/product-api";
import { useRouter } from "next/navigation";
import { paramsToString } from "../libs";

const Search = ({ params }: { params: any }) => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: any = new FormData(event.currentTarget);
    const newParams = { ...params, category: null, q: formData?.get('search') };
    router.push(`/${paramsToString(newParams)}`);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newParams = { ...params, q: null, category: event.target.value };
    router.push(`/${paramsToString(newParams)}`);
  };
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newParamsSort = { ...params, order: event.target.value, sortBy: 'price', };
    router.push(`/${paramsToString(newParamsSort)}`);
  };

  return (
    <form name="form" onSubmit={handleSubmit} className="flex w-full items-center gap-8">
      <input
        id="search"
        type="search"
        name="search"
        onChange={() => {}}
        placeholder="Search..."
        className="w-[50%] w-min-[10%] animate-bounce border border-gray-300 rounded-md py-2 px-4 pr-8 ring-blue-500 focus:ring-blue-600"
      />
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={params.category || ""}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleCategoryChange(event)
        }
      >
        {isLoading && <option value="">Loading...</option>}
        <option className="bg-black" value={""}>
          Select a category
        </option>
        {data &&
          data?.categories.map((category: any) => (
            <option
              className="bg-black"
              key={category.slug}
              value={category.slug}
            >
              {category.name}
            </option>
          ))}
      </select>
      <label htmlFor="sort">Sort by:</label>
      <select
        id="sort"
        value={params.order || ""}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          handleSortChange(event)
        }
      >
        <option className="bg-black" value="">
          Select a sort order
        </option>
        <option className="bg-black" value="asc">
          Ascending
        </option>
        <option className="bg-black" value="desc">
          Descending
        </option>
      </select>
    </form>
  );
};

export default Search;
