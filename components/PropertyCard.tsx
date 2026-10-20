"use client";

import Link from "next/link";
import { ArrowUpRight, Bath, BedDouble, Ruler } from "lucide-react";
import { useStore } from "@/lib/store";
import { cityOf, formatPrice } from "@/lib/utils";
import type { Property } from "@/lib/types";
import PropertyImage from "./PropertyImage";

export default function PropertyCard({ p }: { p: Property }) {
  const { t, lang, currency, settings } = useStore();
  const city = cityOf(p);
  const title = p.title[lang];
  const seed = Number(p.id.replace(/\D/g, "")) || 0;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-lift">
      <Link href={`/propiedades/${p.id}`} className="absolute inset-0 z-10" aria-label={`${t.card.view}: ${title}`} />
      <div className="relative aspect-[4/3] overflow-hidden">
        <PropertyImage photo={p.photos[0]} scene={p.scene} seed={seed} alt={`${title}, ${city?.name ?? ""}`}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-forest">{t.types[p.type]}</span>
        <span className="absolute bottom-3 left-3 rounded-full bg-forest-deep/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-cream/90">{t.demo.badge}</span>
        {p.status === "unavailable" && <span className="absolute right-3 top-3 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-white">{t.detail.unavailable}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-sans text-2xl font-semibold tracking-tight text-forest-deep">{formatPrice(p.price, currency, settings, lang)}</p>
        <h3 className="mt-1 font-serif text-2xl leading-tight">{title}</h3>
        <p className="mt-1 text-sm text-ink-soft">{city?.name}, {city?.province}</p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-sand-dark/40 pt-4 text-sm text-ink-soft">
          <li className="flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-gold-dark" aria-hidden="true" />{p.bedrooms} {t.card.bedrooms}</li>
          <li className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-gold-dark" aria-hidden="true" />{p.bathrooms} {t.card.bathrooms}</li>
          <li className="flex items-center gap-1.5"><Ruler className="h-4 w-4 text-gold-dark" aria-hidden="true" />{p.livingArea} {t.card.living}</li>
        </ul>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-all group-hover:gap-2.5">
          {t.card.view}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
