import type { Metadata } from "next";
import Link from "next/link";
import { getStore } from "@/lib/content";

export const metadata: Metadata = { title: "About us" };

const steps = [
  ["Site survey", "We visit, check roof space, shade and your electricity load."],
  ["Right-sized proposal", "A clear quote for panels, inverter and batteries, with subsidy if eligible."],
  ["Installation", "Our team installs, wires and tests the system, usually in one to two days."],
  ["Net metering and subsidy", "We file the DISCOM and PM Surya Ghar paperwork with you."],
  ["Service", "Cleaning, health checks and warranty claims after installation."],
];

export default async function About() {
  const { settings } = await getStore();
  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">About us</span>
        <h1>{settings.businessName}</h1>
        <p className="muted" style={{ maxWidth: "62ch" }}>
          We help homes, shops and farms switch to solar and keep the lights on through power cuts. We supply panels,
          solar inverters, PCUs and batteries from trusted brands, and our own team installs and services them.
        </p>
      </div>
      <section className="section">
        <div className="section-head"><h2>How we work</h2></div>
        <ol className="quotes" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {steps.map(([title, text], n) => (
            <li key={title} className="quote">
              <span className="eyebrow">Step {n + 1}</span>
              <b>{title}</b>
              <span className="muted">{text}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="section about">
        <div><h2 className="display">Numbers so far</h2></div>
        <div className="stats">
          {settings.stats.map((s) => (<div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>))}
        </div>
      </section>
      <div className="cta-band"><h2>Ready for a free site survey?</h2><Link href="/contact" className="btn btn-sun">Contact us</Link></div>
    </div>
  );
}
