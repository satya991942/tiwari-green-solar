import Link from "next/link";
import type { Store } from "@/lib/types";
import { childrenOf } from "@/lib/catalog";
import { telLink, whatsappLink } from "@/lib/contact";
import { WhatsAppIcon } from "./Icon";
import { basePath } from "@/lib/asset";

export function Footer({ store }: { store: Store }) {
  const { settings } = store;
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <h4>{settings.businessName}</h4>
              <p>{settings.tagline}</p>
              <p>{settings.address}</p>
              <p>Service area: {settings.serviceArea}</p>
            </div>
            <div>
              <h4>Products</h4>
              <ul>
                {childrenOf(store, null).map((g) => (
                  <li key={g.id}><Link href={`/category/${g.slug}`}>{g.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/category/subsidy-solar-system">Rooftop subsidy</Link></li>
              </ul>
            </div>
            <div>
              <h4>Talk to us</h4>
              <ul>
                <li><a href={telLink(settings.phone)}>{settings.phone}</a></li>
                <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
                <li><a href={whatsappLink(settings)} target="_blank" rel="noreferrer">WhatsApp chat</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-base">
            <span>© {new Date().getFullYear()} {settings.businessName}</span>
            <a href={`${basePath}/admin/`}>Admin</a>
          </div>
        </div>
      </footer>
      <a className="wa-float" href={whatsappLink(settings)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon />
      </a>
    </>
  );
}
