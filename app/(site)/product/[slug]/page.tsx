import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStore } from "@/lib/content";
import { activeProducts, categoryById, discount } from "@/lib/catalog";
import { telLink, whatsappLink } from "@/lib/contact";
import { ProductCard } from "@/components/ProductCard";
import { Price } from "@/components/Price";
import { Gallery } from "@/components/Gallery";
import { Tray } from "@/components/Tray";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { EnquiryForm } from "@/components/EnquiryForm";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return activeProducts(getStore()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = activeProducts(await getStore()).find((x) => x.slug === slug);
  return { title: p?.name ?? "Product", description: p?.shortDesc };
}

export default async function ProductPage({ params }: Props) {
  const store = await getStore();
  const { slug } = await params;
  const product = activeProducts(store).find((p) => p.slug === slug);
  if (!product) notFound();

  const { settings } = store;
  const cat = categoryById(store, product.categoryId);
  const parent = cat?.parentId ? categoryById(store, cat.parentId) : undefined;
  const related = activeProducts(store).filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 8);
  const off = settings.showPrices && product.showPrice ? discount(product) : 0;

  return (
    <div className="container">
      <div className="page-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link> /
          {parent && <><Link href={`/category/${parent.slug}`}>{parent.name}</Link> /</>}
          {cat && <><Link href={`/category/${cat.slug}`}>{cat.name}</Link> /</>}
          <span>{product.name}</span>
        </nav>
      </div>

      <div className="pdp">
        <Gallery images={product.images} name={product.name} />
        <div className="pdp-info">
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {product.brand && <span className="eyebrow">{product.brand}</span>}
            {off > 0 && <span className="badge" style={{ position: "static" }}>{off}% off</span>}
            {product.stockStatus === "out_of_stock" && <span className="badge out" style={{ position: "static" }}>Out of stock</span>}
          </div>
          <h1>{product.name}</h1>
          {product.shortDesc && <p className="muted">{product.shortDesc}</p>}
          <Price product={product} settings={settings} />
          <div className="cta-row">
            <a href={whatsappLink(settings, product)} target="_blank" rel="noreferrer" className="btn btn-sun"><WhatsAppIcon size={18} /> Get a quote on WhatsApp</a>
            <a href={telLink(settings.phone)} className="btn btn-ghost"><Icon name="phone" size={16} /> Call {settings.phone}</a>
          </div>
          <div className="perks">
            <div><b>Installation</b>By our trained team</div>
            <div><b>Warranty</b>Brand warranty</div>
            <div><b>Support</b>Service after sale</div>
          </div>
          {product.specs.length > 0 && (
            <div>
              <h2 className="eyebrow" style={{ marginBottom: 6 }}>Specifications</h2>
              <table className="specs"><tbody>
                {product.specs.map((s) => (<tr key={s.label}><td>{s.label}</td><td>{s.value}</td></tr>))}
              </tbody></table>
            </div>
          )}
          {product.description && <p style={{ whiteSpace: "pre-line" }}>{product.description}</p>}
          <details className="panel">
            <summary style={{ cursor: "pointer", fontWeight: 600 }}>Prefer a call back? Leave your number</summary>
            <div style={{ marginTop: 16 }}><EnquiryForm settings={settings} productName={product.name} /></div>
          </details>
        </div>
      </div>

      {related.length > 0 && (
        <Tray title="Related products">
          {related.map((p) => (<ProductCard key={p.id} product={p} category={cat} settings={settings} />))}
        </Tray>
      )}
    </div>
  );
}
