import Link from "next/link";
import { getStore } from "@/lib/content";
import { activeProducts, categoryById } from "@/lib/catalog";
import { whatsappLink } from "@/lib/contact";
import { HeroSlider } from "@/components/HeroSlider";
import { Icon, WhatsAppIcon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { Tray } from "@/components/Tray";

const trust = [
  { icon: "survey", title: "Free site survey", text: "We check your roof and load first" },
  { icon: "subsidy", title: "Subsidy help", text: "PM Surya Ghar paperwork handled" },
  { icon: "wrench", title: "Installation and AMC", text: "Our own trained team" },
  { icon: "shield", title: "Genuine warranty", text: "Brand warranty on every product" },
];

export default async function Home() {
  const store = await getStore();
  const { settings } = store;
  const products = new Map(activeProducts(store).map((p) => [p.id, p]));
  const trays = store.trays
    .filter((t) => t.isVisible)
    .map((t) => ({ ...t, items: (t.products ?? []).map((id) => products.get(id)).filter((p) => p !== undefined) }))
    .filter((t) => t.items.length);

  return (
    <div className="container">
      <section className="hero">
        <HeroSlider slides={store.slides} />
        <div className="tiles">
          {store.tiles.map((t) => {
            const cat = categoryById(store, t.categoryId);
            return (
              <Link key={t.label} href={cat ? `/category/${cat.slug}` : "/"} className="tile">
                <Icon name={t.icon} />
                {t.label}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="trust">
        {trust.map((t) => (
          <div key={t.title}>
            <Icon name={t.icon} />
            <p><b>{t.title}</b><span>{t.text}</span></p>
          </div>
        ))}
      </div>

      {trays.map((t) => (
        <Tray key={t.title} title={t.title}>
          {t.items.map((p) => (
            <ProductCard key={p.id} product={p} category={categoryById(store, p.categoryId)} settings={settings} />
          ))}
        </Tray>
      ))}

      <section className="section about">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span className="eyebrow">About us</span>
          <h2 className="display" style={{ fontSize: "clamp(1.3rem,2.6vw,1.9rem)" }}>One team for your whole solar setup</h2>
          <p className="muted">
            {settings.businessName} supplies and installs rooftop solar systems, solar inverters, PCUs, panels and batteries
            for homes, shops and farms. We survey your site, size the system to your load, handle the subsidy paperwork and
            service what we install.
          </p>
          <div><Link href="/about" className="btn btn-ghost">More about us</Link></div>
        </div>
        <div className="stats">
          {settings.stats.map((s) => (
            <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>
      </section>

      {store.testimonials.length > 0 && (
        <section className="section">
          <div className="section-head"><div><span className="eyebrow">Reviews</span><h2>What customers say</h2></div></div>
          <div className="quotes">
            {store.testimonials.map((q, n) => (
              <figure key={n} className="quote" style={{ margin: 0 }}>
                <span className="stars" aria-label={`${q.rating} out of 5`}>{"★".repeat(q.rating)}</span>
                <blockquote style={{ margin: 0 }}>{q.text}</blockquote>
                <figcaption className="muted">{q.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="cta-band">
        <div>
          <h2>Not sure what size system you need?</h2>
          <p style={{ opacity: 0.8, marginTop: 6 }}>Send us your monthly bill and we will suggest the right setup, free.</p>
        </div>
        <div className="cta-row">
          <a href={whatsappLink(settings)} target="_blank" rel="noreferrer" className="btn btn-sun"><WhatsAppIcon size={18} /> WhatsApp us</a>
          <Link href="/contact" className="btn btn-ghost">Request a call back</Link>
        </div>
      </section>
    </div>
  );
}
