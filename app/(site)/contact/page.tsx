import type { Metadata } from "next";
import { getStore } from "@/lib/content";
import { telLink, whatsappLink } from "@/lib/contact";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon, WhatsAppIcon } from "@/components/Icon";

export const metadata: Metadata = { title: "Contact" };

export default async function Contact() {
  const { settings } = await getStore();
  return (
    <div className="container">
      <div className="page-head">
        <span className="eyebrow">Contact</span>
        <h1>Talk to a solar expert</h1>
        <p className="muted">Call, WhatsApp, or leave your number and we will call you back.</p>
      </div>
      <div className="pdp">
        <div className="panel"><EnquiryForm settings={settings} /></div>
        <div className="pdp-info">
          <a href={telLink(settings.phone)} className="btn btn-ghost" style={{ alignSelf: "flex-start" }}><Icon name="phone" size={16} /> {settings.phone}</a>
          <a href={whatsappLink(settings)} target="_blank" rel="noreferrer" className="btn btn-sun" style={{ alignSelf: "flex-start" }}><WhatsAppIcon size={18} /> Chat on WhatsApp</a>
          <p><b>Email</b><br /><span className="muted">{settings.email}</span></p>
          <p><b>Address</b><br /><span className="muted">{settings.address}</span></p>
          <p><b>Service area</b><br /><span className="muted">{settings.serviceArea}</span></p>
          <a className="btn btn-ghost btn-sm" style={{ alignSelf: "flex-start" }} target="_blank" rel="noreferrer"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}>Open in Google Maps</a>
        </div>
      </div>
    </div>
  );
}
