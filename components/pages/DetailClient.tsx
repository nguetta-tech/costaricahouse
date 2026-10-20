"use client";

import Link from "next/link";
import { ArrowLeft, Bath, BedDouble, Check, MapPin, Maximize, Ruler, Trees } from "lucide-react";
import { useStore } from "@/lib/store";
import { AMENITY_LABELS } from "@/lib/i18n/amenities";
import { cityOf, formatPrice } from "@/lib/utils";
import Gallery from "@/components/Gallery";
import InquiryForm from "@/components/InquiryForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import Cover from "@/components/Cover";
import { destPhoto } from "@/data/destinations";

export default function DetailClient({ id }: { id: string }) {
  const { t, lang, properties, currency, settings } = useStore();
  const p = properties.find((x) => x.id === id);

  if (!p || p.status === "draft")
    return (
      <div className="container-x grid min-h-[70vh] place-items-center pt-24 text-center">
        <div><h1 className="text-4xl">{t.detail.notFound}</h1><Link href="/propiedades" className="btn-primary mt-6">{t.detail.back}</Link></div>
      </div>
    );

  const city = cityOf(p);
  const title = p.title[lang];
  const similar = properties.filter((x) => x.id !== p.id && x.status === "published" && (cityOf(x)?.province === city?.province || x.type === p.type)).slice(0, 3);
  const osm = city ? `https://www.openstreetmap.org/?mlat=${city.lat}&mlon=${city.lng}#map=11/${city.lat}/${city.lng}` : "#";
  const waText = t.forms.defaultSubjectProperty(`${title} (${p.id})`);
  const facts = [
    { Icon: BedDouble, v: p.bedrooms, l: t.card.bedrooms },
    { Icon: Bath, v: p.bathrooms, l: t.card.bathrooms },
    { Icon: Ruler, v: `${p.livingArea} m²`, l: t.detail.living },
    ...(p.lotArea ? [{ Icon: Trees, v: `${p.lotArea} m²`, l: t.detail.lot }] : []),
  ];

  return (
    <div className="container-x pb-8 pt-28">
      <Link href="/propiedades" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-forest hover:text-gold-dark"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{t.detail.back}</Link>

      <div className="mt-2 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <Gallery p={p} title={title} />

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
              <span className="rounded-full bg-forest px-3 py-1 text-cream">{t.types[p.type]}</span>
              <span className="rounded-full bg-sand px-3 py-1 text-forest-deep">{t.demo.badge}</span>
              {p.status === "unavailable" && <span className="rounded-full bg-ink px-3 py-1 text-white">{t.detail.unavailable}</span>}
              <span className="text-ink-soft">{t.detail.id} {p.id}</span>
            </div>
            <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-ink-soft"><MapPin className="h-4 w-4 text-gold-dark" aria-hidden="true" />{city?.name}, {city?.province}, Costa Rica</p>
            <p className="mt-4 text-3xl font-semibold text-forest-deep">{formatPrice(p.price, currency, settings, lang)}</p>
          </div>

          <section aria-labelledby="feat" className="mt-8">
            <h2 id="feat" className="sr-only">{t.detail.features}</h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map(({ Icon, v, l }) => (
                <li key={l} className="rounded-xl bg-white p-4 text-center shadow-card"><Icon className="mx-auto h-5 w-5 text-gold-dark" aria-hidden="true" /><p className="mt-1 text-xl font-semibold text-forest-deep">{v}</p><p className="text-xs text-ink-soft">{l}</p></li>
              ))}
            </ul>
          </section>

          <section className="mt-10"><h2 className="text-3xl">{t.detail.description}</h2><p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{p.description[lang]}</p></section>

          <section className="mt-10"><h2 className="text-3xl">{t.detail.amenities}</h2>
            <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {p.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-forest" aria-hidden="true" />{AMENITY_LABELS[a][lang]}</li>)}
            </ul>
          </section>

          <section className="mt-10"><h2 className="text-3xl">{t.detail.areas}</h2>
            <dl className="mt-4 grid max-w-md grid-cols-2 gap-y-2 text-sm">
              <dt className="text-ink-soft">{t.detail.living}</dt><dd className="font-semibold">{p.livingArea} m²</dd>
              {p.lotArea && (<><dt className="text-ink-soft">{t.detail.lot}</dt><dd className="font-semibold">{p.lotArea} m²</dd></>)}
            </dl>
          </section>

          <section className="mt-10"><h2 className="text-3xl">{t.detail.location}</h2>
            <div className="relative mt-4 overflow-hidden rounded-2xl">
              <div className="relative aspect-[16/7]"><Cover src={city ? destPhoto(city.id) : undefined} alt={city?.name} kind={city?.scene ?? p.scene} variant={0} seed={9} className="absolute inset-0 h-full w-full" /></div>
              <div className="absolute inset-0 grid place-items-center bg-forest-deep/35"><span className="flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-serif text-xl text-forest-deep"><MapPin className="h-5 w-5 text-gold-dark" aria-hidden="true" />{city?.name}</span></div>
            </div>
            <p className="mt-2 text-xs text-ink-soft">{t.detail.mapNote}</p>
            <a href={osm} target="_blank" rel="noopener noreferrer" className="btn-outline mt-3"><Maximize className="h-4 w-4" aria-hidden="true" />{t.detail.openMap}</a>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-labelledby="inq">
          <div className="rounded-2xl bg-white p-6 shadow-lift">
            <h2 id="inq" className="text-3xl">{t.detail.inquiryTitle}</h2>
            <div className="mt-4"><InquiryForm key={`${p.id}-${lang}`} propertyId={p.id} defaultSubject={waText} idPrefix="d" /></div>
            <div className="mt-4 grid gap-3">
              <Link href="/contacto" className="btn-outline w-full">{t.detail.contactBtn}</Link>
              <WhatsAppButton text={waText} />
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20"><Reveal><h2 className="text-4xl">{t.detail.similar}</h2></Reveal>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <PropertyCard key={s.id} p={s} />)}</div>
        </section>
      )}
    </div>
  );
}
