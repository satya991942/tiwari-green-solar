"use client";
import { useState } from "react";
import { ProductPlaceholder } from "./Icon";
import { asset } from "@/lib/asset";

// Falls back to the drawn placeholder when a photo is missing or fails to load
export function ProductImage({ src, alt = "" }: { src?: string; alt?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <ProductPlaceholder />;
  return <img src={asset(src)} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}
