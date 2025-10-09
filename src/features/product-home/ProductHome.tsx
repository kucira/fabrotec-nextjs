"use client";

import {
  getCategoryProducts,
  getProducts,
  searchProducts,
} from "@/shared/api/product-api";
import ProductItem from "@/shared/components/ProductItem";
import { IProduct } from "@/shared/interfaces/IProduct";
import { paramsToString } from "@/shared/libs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const ProductHome = ({ params }: { params: any }) => {
  const router = useRouter();
  let queryResponse: any = null;
  queryResponse = params.category
    ? useQuery({
        queryKey: ["products", params],
        queryFn: () => getCategoryProducts(params),
      })
    : params.q
    ? useQuery({
        queryKey: ["products", params],
        queryFn: () => searchProducts(params),
      })
    : useQuery({
        queryKey: ["products", params],
        queryFn: () => getProducts(params),
      });

  const handleNextPage = () => {
    const newParams = {
      ...params,
      skip: Number(params.skip) + 10 || 10,
      limit: 10,
    };
    router.push(`/${paramsToString(newParams)}`);
  };

  const handlePreviousPage = () => {
    if (params.skip === 0) return;
    const newParams = {
      ...params,
      skip: Number(params.skip) - 10 || null,
      limit: 10,
    };
    router.push(`/${paramsToString(newParams)}`);
  };

  const { data, isLoading, error } = queryResponse;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {data &&
          data.products.map((product: IProduct) => (
            <ProductItem key={product.id} product={product} showImage={true} />
          ))}
      </div>
      <div
        className={
          params.skip > 0
            ? "grid grids-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
            : ""
        }
      >
        {params.skip > 0 && (
          <button
            onClick={handlePreviousPage}
            className="w-full p-4 text-center border rounded cursor-pointer"
          >
            Prev Page
          </button>
        )}
        {queryResponse.data?.total >= 10 && (
          <button
            onClick={handleNextPage}
            className="w-full p-4 text-center border rounded cursor-pointer"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductHome;
