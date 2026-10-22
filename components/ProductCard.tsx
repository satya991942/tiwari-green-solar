import Link from "next/link";
import type { Category, Product, Settings } from "@/lib/types";
import { discount } from "@/lib/catalog";
import { ProductImage } from "./ProductImage";
import { Price } from "./Price";

export function ProductCard({ product, category, settings }: { product: Product; category?: Category; settings: Settings }) {
  const off = settings.showPrices && product.showPrice ? discount(product) : 0;
  return (
    <article className="card">
      {off > 0 && <span className="badge">{off}% off</span>}
      {product.stockStatus === "out_of_stock" && <span className="badge out">Out of stock</span>}
      <Link href={`/product/${product.slug}`} className="card-img" aria-label={product.name}>
        <ProductImage src={product.images[0]} />
      </Link>
      {category && <span className="card-cat">{category.name}</span>}
      <Link href={`/product/${product.slug}`} className="card-title">{product.name}</Link>
      <Price product={product} settings={settings} />
      <Link href={`/product/${product.slug}`} className="btn btn-ghost btn-sm">View product</Link>
    </article>
  );
}
