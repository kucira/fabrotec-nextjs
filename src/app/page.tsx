import ProductHome from "@/features/product-home/ProductHome";
import { getProducts } from "@/shared/api/product-api";
import Search from "@/shared/components/Search";
import { generateQueryClient } from "@/shared/libs";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home({ params, searchParams }: any) {
  const searchValue = await searchParams;
  const queryClient = generateQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["products", params],
    queryFn: (param:any) => getProducts(param),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="m-8">
        <Search params={searchValue}/>
        <ProductHome params={searchValue}/>
      </main>
    </HydrationBoundary>
  );
}
