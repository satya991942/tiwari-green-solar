import Link from "next/link";
import type { Store } from "@/lib/types";
import { childrenOf } from "@/lib/catalog";
import { telLink, whatsappLink } from "@/lib/contact";
import { Icon, WhatsAppIcon } from "./Icon";
import { MobileToggle } from "./MobileToggle";

export function Header({ store }: { store: Store }) {
  const { settings } = store;
  const groups = childrenOf(store, null);
  return (
    <>
      {settings.demoNotice && (
        <div className="demo-bar">Demo catalog: products, prices and photos are sample data from UTL Solar and will be replaced.</div>
      )}
      <div className="topstrip">
        <div className="container">
          <span className="hide-sm">{settings.tagline}</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a href={telLink(settings.phone)}>Call {settings.phone}</a>
            <a href={whatsappLink(settings)} target="_blank" rel="noreferrer">WhatsApp</a>
          </span>
        </div>
      </div>
      <header className="header" id="site-header">
        <div className="container">
          <Link href="/" className="logo" aria-label={`${settings.businessName} home`}>
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="17" cy="17" r="16" fill="none" stroke="#3ad38f" strokeOpacity="0.5" />
              <circle cx="17" cy="13" r="5.5" fill="#f5b640" />
              <path d="M7 25h20l-2.5-6h-15z" fill="#0b7a4f" stroke="#3ad38f" />
            </svg>
            <span>Tiwari Green<small>SOLAR</small></span>
          </Link>
          <nav className="nav" aria-label="Main">
            <details className="mega">
              <summary>Products</summary>
              <div className="mega-panel">
                {groups.map((g) => (
                  <div key={g.id}>
                    <h4><Link href={`/category/${g.slug}`}>{g.name}</Link></h4>
                    <ul>
                      {childrenOf(store, g.id).map((c) => (
                        <li key={c.id}><Link href={`/category/${c.slug}`}>{c.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
            <Link href="/category/subsidy-solar-system">Rooftop subsidy</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <form action="/search" className="header-search" role="search">
            <Icon name="search" size={16} />
            <input name="q" placeholder="Search inverters, panels…" aria-label="Search products" />
          </form>
          <a href={whatsappLink(settings)} target="_blank" rel="noreferrer" className="btn btn-sun btn-sm hide-md">
            <WhatsAppIcon size={16} /> Get a quote
          </a>
          <MobileToggle />
        </div>
      </header>
    </>
  );
}
