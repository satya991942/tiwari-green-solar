import type { Product, Settings } from "@/lib/types";
import { formatINR } from "@/lib/catalog";

export function Price({ product, settings }: { product: Product; settings: Settings }) {
  if (!settings.showPrices || !product.showPrice || product.price == null) {
    return <div className="price"><b>Price on request</b></div>;
  }
  return (
    <div className="price">
      <b>{formatINR(product.price)}</b>
      {product.mrp != null && product.mrp > product.price && <s>{formatINR(product.mrp)}</s>}
      <small>Inclusive of all taxes</small>
    </div>
  );
}
