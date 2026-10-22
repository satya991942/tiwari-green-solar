import type { Metadata } from "next";
import { Suspense } from "react";
import { getStore } from "@/lib/content";
import { activeProducts } from "@/lib/catalog";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  const store = getStore();
  return (
    <div className="container">
      <Suspense>
        <SearchResults products={activeProducts(store)} categories={store.categories} settings={store.settings} />
      </Suspense>
    </div>
  );
}
