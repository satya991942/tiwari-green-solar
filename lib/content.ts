import { readFileSync, readdirSync } from "fs";
import path from "path";
import { cache } from "react";
import type { Product, Store } from "./types";

// All content lives as JSON in /content and is edited through the admin (Sveltia CMS) at /admin.
// It is read once at build time; every admin save commits to the repo and triggers a rebuild.
const dir = path.join(process.cwd(), "content");
const read = (file: string) => JSON.parse(readFileSync(path.join(dir, file), "utf8"));

export const getStore = cache((): Store => {
  const home = read("home.json");
  const products: Product[] = readdirSync(path.join(dir, "products"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const id = f.replace(/\.json$/, "");
      const raw = read(`products/${f}`);
      return {
        brand: "",
        mrp: null,
        price: null,
        showPrice: true,
        stockStatus: "in_stock",
        shortDesc: "",
        description: "",
        specs: [],
        images: [],
        isActive: true,
        ...raw,
        id,
        slug: id,
      };
    });
  return {
    settings: read("settings.json"),
    categories: read("categories.json").categories,
    products,
    trays: home.trays ?? [],
    tiles: home.tiles ?? [],
    slides: home.slides ?? [],
    testimonials: home.testimonials ?? [],
  };
});
