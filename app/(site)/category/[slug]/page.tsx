import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStore } from "@/lib/content";
import { categoryById, categoryBySlug, childrenOf, productsIn } from "@/lib/catalog";
import { whatsappLink } from "@/lib/contact";
import { ProductGrid } from "@/components/ProductGrid";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getStore().categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = categoryBySlug(getStore(), (await params).slug);
  return { title: cat?.name ?? "Products" };
}

export default async function CategoryPage({ params }: Props) {
  const store = getStore();
  const cat = categoryBySlug(store, (await params).slug);
  if (!cat) notFound();

  const parent = cat.parentId ? categoryById(store, cat.parentId) : undefined;
  const group = parent ?? cat;
  const subs = childrenOf(store, group.id);
  const items = productsIn(store, cat);

  return (
    <div className="container">
      <div className="page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link> /
          {parent && <><Link href={`/category/${parent.slug}`}>{parent.name}</Link> /</>}
          <span>{cat.name}</span>
        </nav>
        <h1>{cat.name}</h1>
      </div>

      <ProductGrid
        products={items}
        categories={store.categories}
        settings={store.settings}
        group={{ name: group.name, slug: group.slug, active: cat.id === group.id }}
        subs={subs.map((s) => ({ name: s.name, slug: s.slug, active: s.id === cat.id }))}
        empty={
          <div className="empty">
            <p>We supply {cat.name.toLowerCase()} but haven&apos;t listed models here yet.</p>
            <a href={whatsappLink(store.settings)} target="_blank" rel="noreferrer" className="btn btn-sun">Ask us on WhatsApp</a>
          </div>
        }
      />
    </div>
  );
}
