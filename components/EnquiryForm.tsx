"use client";
import { useState } from "react";
import type { Settings } from "@/lib/types";

// The site is static, so a call-back request is sent as a pre-filled WhatsApp message
export function EnquiryForm({ settings, productName }: { settings: Settings; productName?: string }) {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    if (!get("name")) return setError("Please enter your name.");
    if (!/^[+\d][\d\s-]{8,15}$/.test(get("phone"))) return setError("Please enter a valid phone number, for example 98765 43210.");
    setError("");
    const text = [
      `Call-back request for ${settings.businessName}`,
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      get("city") && `City: ${get("city")}`,
      get("message") && `Need: ${get("message")}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="form" noValidate>
      <div className="form-row">
        <label className="field">Your name<input id="enq-name" name="name" required maxLength={80} /></label>
        <label className="field">Phone<input id="enq-phone" name="phone" type="tel" required placeholder="98765 43210" /></label>
      </div>
      <label className="field">City or area<input id="enq-city" name="city" maxLength={80} /></label>
      <label className="field">What do you need?
        <textarea id="enq-message" name="message" rows={3} maxLength={1000} defaultValue={productName ? `Quote for ${productName}` : ""} />
      </label>
      {error && <p className="notice err">{error}</p>}
      {sent && <p className="notice">WhatsApp opened with your details. Press send there and we will call you back.</p>}
      <div><button className="btn btn-sun">Send on WhatsApp</button></div>
    </form>
  );
}
