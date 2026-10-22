import type { Category, Product, Store } from "./types";

export function childrenOf(store: Store, parentId: string | null) {
  return store.categories.filter((c) => c.parentId === parentId).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function categoryBySlug(store: Store, slug: string) {
  return store.categories.find((c) => c.slug === slug);
}

export function categoryById(store: Store, id: string) {
  return store.categories.find((c) => c.id === id);
}

// A category's own id plus all its sub-category ids
export function categoryScope(store: Store, cat: Category) {
  return [cat.id, ...childrenOf(store, cat.id).map((c) => c.id)];
}

export function activeProducts(store: Store) {
  return store.products.filter((p) => p.isActive);
}

export function productsIn(store: Store, cat: Category) {
  const scope = categoryScope(store, cat);
  return activeProducts(store).filter((p) => scope.includes(p.categoryId));
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatINR = (n: number) => inr.format(n);

export function discount(p: Product) {
  if (!p.mrp || !p.price || p.mrp <= p.price) return 0;
  return Math.round(((p.mrp - p.price) / p.mrp) * 100);
}
