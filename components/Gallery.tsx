"use client";
import { useState } from "react";
import { ProductImage } from "./ProductImage";
import { asset } from "@/lib/asset";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="pdp-gallery">
      <div className="pdp-main">
        <ProductImage src={images[i]} alt={name} />
      </div>
      {images.length > 1 && (
        <div className="img-list">
          {images.map((src, n) => (
            <button key={src + n} type="button" onClick={() => setI(n)} style={{ padding: 0, border: 0, background: "none", cursor: "pointer", opacity: n === i ? 1 : 0.55 }} aria-label={`Show image ${n + 1}`}>
              <img src={asset(src)} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
