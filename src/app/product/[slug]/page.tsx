"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/shared/api/product-api";
import { IProduct } from "@/shared/interfaces/IProduct";
import { useParams } from "next/navigation";
import ProductItem from "@/shared/components/ProductItem";
import Image from "next/image";

const ProductDetailPage = () => {
  const { slug }: any = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getProductById(slug),
  });
  console.log(data?.title);
  return (
    <main className="m-8">
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ProductItem product={data as IProduct} showImage={false} />
      <div className="flex gap-4 w-full ">
        <div className="flex overflow-x-scroll ">
          {data?.images?.map((image: any, index: number) => (
            <Image
              className="animate-pulse"
              width={20}
              height={20}
              loading="lazy"
              layout="responsive"
              key={index}
              src={image}
              alt={data?.title}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;

