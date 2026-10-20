"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { DESTINATIONS, PROVINCES, destPhoto } from "@/data/destinations";
import Reveal from "@/components/Reveal";
import Cover from "@/components/Cover";

export default function DestinationsClient() {
  const { t, lang, properties } = useStore();
  const count = (id: string) => properties.filter((p) => p.cityId === id && p.status === "published").length;
  return (
    <>
      <section className="bg-forest pb-14 pt-32 text-cream">
        <div className="container-x"><p className="eyebrow !text-gold">{t.nav.destinations}</p><h1 className="mt-2 text-5xl !text-cream sm:text-6xl">{t.destinationsPage.title}</h1><p className="mt-3 max-w-xl text-cream/80">{t.destinationsPage.subtitle}</p></div>
      </section>
      <div className="container-x space-y-16 py-14">
        {PROVINCES.map((pr) => (
          <section key={pr} aria-labelledby={`pr-${pr}`}>
            <Reveal><h2 id={`pr-${pr}`} className="border-b border-gold/60 pb-3 text-4xl">{pr}</h2></Reveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DESTINATIONS.filter((d) => d.province === pr).map((d, i) => (
                <Reveal key={d.id} delay={(i % 3) * 0.07}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-lift">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Cover src={destPhoto(d.id)} alt={d.name} kind={d.scene} variant={(i + pr.length) % 4} seed={i + 3} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="eyebrow">{d.province}</p>
                      <h3 className="mt-1 text-3xl">{d.name}</h3>
                      <p className="mt-2 flex-1 text-sm text-ink-soft">{d.blurb[lang]}</p>
                      <p className="mt-3 text-sm font-semibold text-forest-deep">{t.destinationsPage.count(count(d.id))}</p>
                      <Link href={`/propiedades?city=${d.id}`} className="btn-outline mt-4 self-start">{t.destinationsPage.view}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
