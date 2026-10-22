import type { Product, Settings } from "./types";

export function whatsappLink(settings: Settings, product?: Product) {
  const text = product
    ? `Hi ${settings.businessName}, I'd like a quote for: ${product.name}`
    : `Hi ${settings.businessName}, I'd like to know more about solar for my home.`;
  return `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export const telLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
