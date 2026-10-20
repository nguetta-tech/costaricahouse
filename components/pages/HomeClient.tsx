"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Compass, Eye, Languages, MessageSquareText, ShieldCheck, UserRound, Layers } from "lucide-react";
import { useStore } from "@/lib/store";
import { DESTINATIONS, destPhoto } from "@/data/destinations";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import Cover from "@/components/Cover";

const BENEFIT_ICONS = [Layers, Languages, UserRound, ShieldCheck];
const STEP_ICONS = [Compass, Eye, MessageSquareText];

export default function HomeClient() {
  const { t, properties, lang } = useStore();
  const reduce = useReducedMotion();
  const published = properties.filter((p) => p.status === "published");
  const featured = (published.filter((p) => p.featured).length ? published.filter((p) => p.featured) : published).slice(0, 6);
  const popular = DESTINATIONS.filter((d) => published.some((p) => p.cityId === d.id)).slice(0, 6);
  const item = (d: number) => reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-deep">
        <motion.div className="absolute inset-0 -z-10" initial={reduce ? false : { scale: 1.08, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, ease: "easeOut" }}>
          <Cover src="/photos/hero.jpg" kind="beach" variant={1} seed={2} alt="" eager className="h-full w-full" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-forest-deep/55" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep/80 via-forest-deep/35 to-transparent" aria-hidden="true" />
        <div className="container-x pb-10 pt-32 sm:pb-16">
          <motion.p {...item(0.1)} className="eyebrow !text-gold">{t.hero.eyebrow}</motion.p>
          <motion.h1 {...item(0.25)} className="mt-4 max-w-3xl text-5xl leading-[1.02] !text-cream sm:text-7xl">{t.hero.title}</motion.h1>
          <motion.p {...item(0.4)} className="mt-5 max-w-xl text-base text-cream/85 sm:text-lg">{t.hero.subtitle}</motion.p>
          <motion.div {...item(0.55)} className="mt-8 flex flex-wrap gap-3">
            <Link href="/propiedades" className="btn-gold">{t.hero.cta1}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link href="/destinos" className="btn-light">{t.hero.cta2}</Link>
          </motion.div>
          <motion.div {...item(0.75)} className="mt-10"><SearchBar /></motion.div>
          <p className="mt-3 text-xs text-cream/70">{t.demo.banner}</p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-x pt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">{t.home.featured.eyebrow}</p><h2 className="mt-2 text-4xl sm:text-5xl">{t.home.featured.title}</h2><p className="mt-3 max-w-xl text-ink-soft">{t.home.featured.sub}</p></div>
          <Link href="/propiedades" className="btn-outline">{t.home.featured.all}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 0.08}><PropertyCard p={p} /></Reveal>)}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="container-x pt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">{t.home.destinations.eyebrow}</p><h2 className="mt-2 text-4xl sm:text-5xl">{t.home.destinations.title}</h2><p className="mt-3 max-w-xl text-ink-soft">{t.home.destinations.sub}</p></div>
          <Link href="/destinos" className="btn-outline">{t.home.destinations.all}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((d, i) => (
            <Reveal key={d.id} delay={(i % 3) * 0.08}>
              <Link href={`/propiedades?city=${d.id}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl">
                <Cover src={destPhoto(d.id)} alt={d.name} kind={d.scene} variant={i % 4 === 3 ? 2 : i % 4} seed={i + 1} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs uppercase tracking-widest text-gold">{d.province}</p>
                  <p className="font-serif text-3xl text-cream">{d.name}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REGIONS */}
      <section className="mt-24 bg-sand-light py-20">
        <div className="container-x">
          <Reveal><p className="eyebrow">{t.home.regions.eyebrow}</p><h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">{t.home.regions.title}</h2></Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-sand-dark/50 sm:grid-cols-2 lg:grid-cols-5">
            {t.home.regions.items.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.06} className="bg-cream p-6">
                <span className="font-serif text-4xl text-gold">0{i + 1}</span>
                <h3 className="mt-3 text-2xl">{r.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="container-x grid gap-12 pt-24 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="eyebrow">{t.home.experience.eyebrow}</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">{t.home.experience.title}</h2>
          <p className="mt-4 max-w-lg text-ink-soft">{t.home.experience.text}</p>
        </Reveal>
        <ol className="space-y-4">
          {t.home.experience.steps.map((s, i) => { const Icon = STEP_ICONS[i]; return (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="flex gap-4 rounded-2xl bg-white p-5 shadow-card">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest text-gold"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <div><h3 className="text-2xl">{i + 1}. {s.title}</h3><p className="mt-1 text-sm text-ink-soft">{s.text}</p></div>
              </li>
            </Reveal>); })}
        </ol>
      </section>

      {/* BENEFITS */}
      <section className="container-x pt-24">
        <Reveal><p className="eyebrow">{t.home.benefits.eyebrow}</p><h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">{t.home.benefits.title}</h2></Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.benefits.items.map((b, i) => { const Icon = BENEFIT_ICONS[i]; return (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="h-full border-t-2 border-gold pt-5"><Icon className="h-6 w-6 text-forest" aria-hidden="true" /><h3 className="mt-3 text-2xl">{b.title}</h3><p className="mt-2 text-sm text-ink-soft">{b.text}</p></div>
            </Reveal>); })}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pt-24">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-forest px-6 py-16 text-center sm:px-16">
            <div className="absolute inset-0 -z-10 opacity-25"><Cover src="/photos/cta.webp" kind="jungle" variant={3} seed={4} className="h-full w-full" /></div>
            <h2 className="text-4xl !text-cream sm:text-5xl">{t.home.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-lg text-cream/85">{t.home.cta.text}</p>
            <Link href="/contacto" className="btn-gold mt-8">{t.home.cta.button}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </section>
      <span className="sr-only">{lang}</span>
    </>
  );
}
