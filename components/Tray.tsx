"use client";
import { useRef } from "react";
import Link from "next/link";
import { Icon } from "./Icon";

// Horizontal product row with arrow buttons; cards are passed in already rendered
export function Tray({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="eyebrow">Top selling</span>
          <h2>{title}</h2>
        </div>
        <div className="tray-nav">
          {href && <Link href={href} className="btn btn-ghost btn-sm">View all</Link>}
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll left"><Icon name="arrowL" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll right"><Icon name="arrowR" /></button>
        </div>
      </div>
      <div className="tray" ref={ref}>{children}</div>
    </section>
  );
}
