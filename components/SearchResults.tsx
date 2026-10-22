"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Category, Product, Settings } from "@/lib/types";
import { ProductCard } from "./ProductCard";

function matches(p: Product, cat: string, words: string[]) {
  const hay = [p.name, p.brand, p.shortDesc, cat, ...p.specs.map((s) => `${s.label} ${s.value}`)].join(" ").toLowerCase();
  return words.every((w) => hay.includes(w));
}

export function SearchResults({ products, categories, settings }: { products: Product[]; categories: Category[]; settings: Settings }) {
  const [q, setQ] = useState(useSearchParams().get("q") ?? "");
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? "";
  const results = words.length ? products.filter((p) => matches(p, catName(p.categoryId), words)) : [];

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Search</span>
        <h1>{q ? `Results for “${q}”` : "Search products"}</h1>
        <div className="header-search" style={{ display: "flex", marginLeft: 0, maxWidth: 480 }} role="search">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try 5kW on-grid, lithium, 48V…" aria-label="Search products" style={{ width: "100%" }} autoFocus />
        </div>
      </div>
      <div style={{ marginTop: 28 }}>
        {words.length > 0 && !results.length && <div className="empty">No products match “{q}”. Try a shorter word like “inverter” or “panel”.</div>}
        <div className="grid">
          {results.map((p) => (<ProductCard key={p.id} product={p} category={categories.find((c) => c.id === p.categoryId)} settings={settings} />))}
        </div>
      </div>
    </>
  );
}
