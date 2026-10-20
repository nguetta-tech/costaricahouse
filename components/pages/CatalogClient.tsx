"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { useStore } from "@/lib/store";
import { DESTINATIONS, PROVINCES } from "@/data/destinations";
import { PRICE_STEPS } from "@/lib/config";
import { compactPrice, cityOf } from "@/lib/utils";
import PropertyCard from "@/components/PropertyCard";
import type { PropertyType } from "@/lib/types";

const TYPES: PropertyType[] = ["luxuryVilla", "familyHome", "contemporary", "vacationHome", "beachNear", "natureHome"];
const KEYS = ["q", "province", "city", "type", "beds", "min", "max", "sort"] as const;

function Sel({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div><label className="label" htmlFor={id}>{label}</label><select id={id} className="field" value={value} onChange={(e) => onChange(e.target.value)}>{children}</select></div>
  );
}

export default function CatalogClient() {
  const { t, lang, properties } = useStore();
  const router = useRouter();
  const params = useSearchParams();
  const get = (k: (typeof KEYS)[number]) => params.get(k) ?? "";
  const [q, setQ] = useState(get("q"));
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => setQ(params.get("q") ?? ""), [params]);

  const setParam = (k: (typeof KEYS)[number], v: string) => {
    const n = new URLSearchParams(params.toString());
    if (v) n.set(k, v); else n.delete(k);
    if (k === "province") n.delete("city"); // cohérence province / ville
    router.replace(`/propiedades${n.toString() ? `?${n}` : ""}`, { scroll: false });
  };
  const reset = () => { setQ(""); router.replace("/propiedades", { scroll: false }); };
  const hasFilters = KEYS.some((k) => get(k));

  const province = get("province"), city = get("city"), type = get("type"), sort = get("sort");
  const beds = Number(get("beds")) || 0, min = Number(get("min")) || 0, max = Number(get("max")) || Infinity;
  const cityOptions = DESTINATIONS.filter((d) => !province || d.province === province);

  const results = useMemo(() => {
    const kw = (params.get("q") ?? "").trim().toLowerCase();
    let list = properties.filter((p) => p.status === "published");
    list = list.filter((p) => {
      const c = cityOf(p);
      if (province && c?.province !== province) return false;
      if (city && p.cityId !== city) return false;
      if (type && p.type !== type) return false;
      if (p.bedrooms < beds) return false;
      if (p.price < min || p.price > max) return false;
      if (kw) {
        const hay = [p.title.es, p.title.en, p.description.es, p.description.en, c?.name, c?.province, p.id, t.types[p.type]].join(" ").toLowerCase();
        if (!kw.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      return true;
    });
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    else list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [properties, params, province, city, type, beds, min, max, sort, t]);

  const filters = (
    <div className="space-y-4">
      <div>
        <label className="label" htmlFor="c-q">{t.catalog.keywords}</label>
        <input id="c-q" type="search" className="field" value={q} placeholder={t.catalog.keywordsPlaceholder}
          onChange={(e) => { setQ(e.target.value); setParam("q", e.target.value); }} />
      </div>
      <Sel id="c-prov" label={t.catalog.province} value={province} onChange={(v) => setParam("province", v)}>
        <option value="">{t.catalog.all}</option>{PROVINCES.map((p) => <option key={p}>{p}</option>)}
      </Sel>
      <Sel id="c-city" label={t.catalog.city} value={city} onChange={(v) => setParam("city", v)}>
        <option value="">{t.catalog.all}</option>{cityOptions.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
      </Sel>
      <Sel id="c-type" label={t.catalog.type} value={type} onChange={(v) => setParam("type", v)}>
        <option value="">{t.catalog.allM}</option>{TYPES.map((k) => <option key={k} value={k}>{t.types[k]}</option>)}
      </Sel>
      <Sel id="c-beds" label={t.catalog.bedrooms} value={get("beds")} onChange={(v) => setParam("beds", v)}>
        <option value="">{t.search.any}</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
      </Sel>
      <div className="grid gap-4">
        <Sel id="c-min" label={t.catalog.min} value={get("min")} onChange={(v) => setParam("min", v)}>
          <option value="">{t.search.noMin}</option>{PRICE_STEPS.map((v) => <option key={v} value={v}>{compactPrice(v, lang)}</option>)}
        </Sel>
        <Sel id="c-max" label={t.catalog.max} value={get("max")} onChange={(v) => setParam("max", v)}>
          <option value="">{t.search.noMax}</option>{PRICE_STEPS.map((v) => <option key={v} value={v}>{compactPrice(v, lang)}</option>)}
        </Sel>
      </div>
      <button type="button" onClick={reset} disabled={!hasFilters} className="btn-outline w-full">{t.catalog.reset}</button>
    </div>
  );

  return (
    <>
      <section className="bg-forest pb-14 pt-32 text-cream">
        <div className="container-x">
          <p className="eyebrow !text-gold">{t.nav.properties}</p>
          <h1 className="mt-2 text-5xl !text-cream sm:text-6xl">{t.catalog.title}</h1>
          <p className="mt-3 max-w-xl text-cream/80">{t.catalog.subtitle}</p>
        </div>
      </section>

      <div className="container-x grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <aside aria-label={t.catalog.filters}>
          <button type="button" className="btn-outline w-full lg:hidden" aria-expanded={showFilters} onClick={() => setShowFilters((s) => !s)}>
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />{showFilters ? t.catalog.hideFilters : t.catalog.filters}
          </button>
          <div className={`${showFilters ? "mt-4 block" : "hidden"} rounded-2xl bg-white p-5 shadow-card lg:sticky lg:top-24 lg:mt-0 lg:block`}>{filters}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold text-forest-deep" role="status" aria-live="polite">{t.catalog.results(results.length)}</p>
            <div className="flex items-center gap-2">
              <label className="label !mb-0" htmlFor="c-sort">{t.catalog.sort}</label>
              <select id="c-sort" className="field !w-auto" value={sort} onChange={(e) => setParam("sort", e.target.value)}>
                <option value="">{t.catalog.sortRelevance}</option>
                <option value="asc">{t.catalog.sortAsc}</option>
                <option value="desc">{t.catalog.sortDesc}</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-sand-dark bg-white/60 px-6 py-16 text-center">
              <SearchX className="mx-auto h-10 w-10 text-gold-dark" aria-hidden="true" />
              <h2 className="mt-4 text-3xl">{t.catalog.emptyTitle}</h2>
              <p className="mt-2 text-ink-soft">{t.catalog.emptyText}</p>
              <button type="button" onClick={reset} className="btn-primary mt-6">{t.catalog.reset}</button>
            </div>
          ) : (
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((p) => (
                  <motion.li key={p.id} layout="position" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <PropertyCard p={p} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
