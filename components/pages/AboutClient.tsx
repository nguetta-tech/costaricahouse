"use client";

import { ShieldCheck, Eye, HeartHandshake } from "lucide-react";
import { useStore } from "@/lib/store";
import Reveal from "@/components/Reveal";
import Cover from "@/components/Cover";

const ICONS = [ShieldCheck, Eye, HeartHandshake];

export default function AboutClient() {
  const { t } = useStore();
  const a = t.about;
  return (
    <>
      <section className="bg-forest pb-14 pt-32 text-cream">
        <div className="container-x"><p className="eyebrow !text-gold">{t.nav.about}</p><h1 className="mt-2 text-5xl !text-cream sm:text-6xl">{a.title}</h1><p className="mt-4 max-w-2xl font-serif text-2xl text-cream/90">{a.intro}</p></div>
      </section>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Cover src="/photos/about.webp" kind="jungle" variant={0} seed={6} className="absolute inset-0 h-full w-full" /></Reveal>
        <div className="space-y-8">
          <Reveal><h2 className="text-4xl">{a.visionTitle}</h2><p className="mt-3 text-ink-soft">{a.visionText}</p></Reveal>
          <Reveal delay={0.08}><h2 className="text-4xl">{a.approachTitle}</h2><p className="mt-3 text-ink-soft">{a.approachText}</p></Reveal>
        </div>
      </div>
      <div className="container-x grid gap-6 sm:grid-cols-3">
        {a.values.map((v, i) => { const Icon = ICONS[i]; return (
          <Reveal key={v.title} delay={i * 0.07}><div className="h-full rounded-2xl bg-white p-6 shadow-card"><Icon className="h-6 w-6 text-forest" aria-hidden="true" /><h3 className="mt-3 text-3xl">{v.title}</h3><p className="mt-2 text-sm text-ink-soft">{v.text}</p></div></Reveal>); })}
      </div>
      <p className="container-x mt-10 rounded-xl border border-dashed border-gold/60 bg-sand-light px-5 py-4 text-sm text-ink-soft">{a.editable}</p>
    </>
  );
}
