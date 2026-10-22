"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Slide } from "@/lib/types";
import { HeroArt } from "./HeroArt";

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length, i]);

  return (
    <div className="hero-frame">
      {slides.map((s, n) => (
        <div key={n} className={`hero-slide${n === i ? " active" : ""}`} aria-hidden={n !== i}>
          <div>
            <span className="eyebrow">{s.eyebrow}</span>
            <h1>{s.title}</h1>
            <p>{s.text}</p>
            <Link href={s.href} className="btn btn-sun" tabIndex={n === i ? 0 : -1}>{s.cta}</Link>
          </div>
          <div className="hero-art"><HeroArt variant={n} /></div>
        </div>
      ))}
      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((s, n) => (
            <button key={n} className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={`Show slide ${n + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}
