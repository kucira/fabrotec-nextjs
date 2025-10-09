import { IProduct } from "@/shared/interfaces/IProduct";
import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ product, showImage = true }: { product: IProduct, showImage?: boolean }) => {
  return (
    <Link href={`/product/${product?.id}`}>
      <section className="flex flex-col gap-4 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold tracking-tight">{product?.title}</h2>
        <p className="text-sm opacity-70">{product?.description}</p>
        {showImage && <Image
          src={product?.thumbnail}
          alt={product?.title}
          width={20}
          height={20}
          loading="lazy"
          layout="responsive"
        />}
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm">
            {product?.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm opacity-70">
              {product?.discountPercentage}% off
            </p>
            <p className="font-mono text-sm opacity-70">
              {product?.rating.toFixed(1)}
              {"\u2605"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-mono text-sm opacity-70">
              stock: {product?.stock || 0}
            </p>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default ProductItem;
