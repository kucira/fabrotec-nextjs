import { IProduct } from "@/shared/interfaces/IProduct";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductItem = ({
  product,
  showImage = true,
}: {
  product: IProduct;
  showImage?: boolean;
}) => {
  const [visible, setVisible] = useState<Boolean>(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Link href={`/product/${product?.id}`}>
      <section
        className={`${visible ? "opacity-100" : "opacity-0"} flex flex-col gap-4 p-6 rounded-lg shadow-md transition transform ease-in-out duration-1000 hover:scale-110`}
      >
        <h2 className="text-xl font-bold tracking-tight">{product?.title}</h2>
        <p className="text-sm opacity-70">{product?.description}</p>
        {showImage && (
          <Image
            src={product?.thumbnail}
            alt={product?.title}
            width={20}
            height={20}
            loading="lazy"
            layout="responsive"
          />
        )}
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
