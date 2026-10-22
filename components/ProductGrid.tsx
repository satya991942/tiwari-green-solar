"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Category, Product, Settings } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type Nav = { name: string; slug: string; active: boolean };
type Sort = "featured" | "low" | "high";

// Category listing with brand filter and price sort, done in the browser since the site is static
export function ProductGrid(props: { products: Product[]; categories: Category[]; settings: Settings; group: Nav; subs: Nav[]; empty: React.ReactNode }) {
  const { products, categories, settings, group, subs, empty } = props;
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand).filter(Boolean))].sort(), [products]);

  let items = brand ? products.filter((p) => p.brand === brand) : products;
  if (sort !== "featured") {
    const dir = sort === "low" ? 1 : -1;
    items = [...items].sort((a, b) => ((a.price ?? Infinity) - (b.price ?? Infinity)) * dir);
  }
  const chip = (on: boolean) => `chip${on ? " on" : ""}`;

  return (
    <div className="listing">
      <aside className="filters">
        <div>
          <h3>{group.name}</h3>
          <div className="chips">
            <Link href={`/category/${group.slug}`} className={chip(group.active)}>All</Link>
            {subs.map((s) => (<Link key={s.slug} href={`/category/${s.slug}`} className={chip(s.active)}>{s.name}</Link>))}
          </div>
        </div>
        {brands.length > 1 && (
          <div>
            <h3>Brand</h3>
            <div className="chips">
              <button type="button" className={chip(!brand)} onClick={() => setBrand("")}>Any</button>
              {brands.map((b) => (<button type="button" key={b} className={chip(brand === b)} onClick={() => setBrand(b)}>{b}</button>))}
            </div>
          </div>
        )}
        <div>
          <h3>Sort</h3>
          <div className="chips">
            <button type="button" className={chip(sort === "featured")} onClick={() => setSort("featured")}>Featured</button>
            <button type="button" className={chip(sort === "low")} onClick={() => setSort("low")}>Price: low to high</button>
            <button type="button" className={chip(sort === "high")} onClick={() => setSort("high")}>Price: high to low</button>
          </div>
        </div>
      </aside>
      <div style={{ minWidth: 0 }}>
        <div className="toolbar"><span>{items.length} {items.length === 1 ? "product" : "products"}</span></div>
        {items.length ? (
          <div className="grid">
            {items.map((p) => (<ProductCard key={p.id} product={p} category={categories.find((c) => c.id === p.categoryId)} settings={settings} />))}
          </div>
        ) : empty}
      </div>
    </div>
  );
}
