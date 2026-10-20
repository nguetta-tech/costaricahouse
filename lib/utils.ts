import type { Lang, Property, SiteSettings } from "./types";
import { getDestination } from "@/data/destinations";

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

// Formatage maison (déterministe) : Intl peut différer entre le serveur Node et le navigateur et casser l'hydratation.
const group = (n: number, sep: string) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);

export function formatPrice(usd: number, currency: "USD" | "CRC", settings: Pick<SiteSettings, "crcRate">, lang: Lang): string {
  const sep = lang === "es" ? "\u00A0" : ",";
  return currency === "CRC" ? `₡${group(usd * settings.crcRate, sep)}` : `$${group(usd, sep)}`;
}

export const compactPrice = (n: number, _lang: Lang) =>
  n >= 1_000_000 ? `$${+(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n / 1000)}K`;

export const cityOf = (p: Property) => getDestination(p.cityId);

export const whatsappLink = (number: string, text: string) =>
  number ? `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}` : "";

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
export const isPhone = (v: string) => /^[+\d][\d\s\-()]{6,17}$/.test(v);
