"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { useStore } from "@/lib/store";
import { DESTINATIONS, PROVINCES } from "@/data/destinations";
import { PRICE_STEPS } from "@/lib/config";
import { compactPrice } from "@/lib/utils";
import type { PropertyType } from "@/lib/types";

const TYPES: PropertyType[] = ["luxuryVilla", "familyHome", "contemporary", "vacationHome", "beachNear", "natureHome"];

export default function SearchBar() {
  const { t, lang } = useStore();
  const router = useRouter();
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [beds, setBeds] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (city) q.set("city", city);
    if (type) q.set("type", type);
    if (min) q.set("min", min);
    if (max) q.set("max", max);
    if (beds) q.set("beds", beds);
    router.push(`/propiedades${q.toString() ? `?${q}` : ""}`);
  };

  return (
    <form onSubmit={submit} aria-label={t.search.title}
      className="grid gap-3 rounded-2xl bg-cream/95 p-4 shadow-lift backdrop-blur sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_1fr_1fr_0.8fr_auto] lg:items-end lg:p-5">
      <div>
        <label className="label" htmlFor="s-city">{t.search.destination}</label>
        <select id="s-city" className="field" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">{t.search.allDestinations}</option>
          {PROVINCES.map((pr) => (
            <optgroup key={pr} label={pr}>
              {DESTINATIONS.filter((d) => d.province === pr).map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </optgroup>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="s-type">{t.search.type}</label>
        <select id="s-type" className="field" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">{t.search.allTypes}</option>
          {TYPES.map((k) => <option key={k} value={k}>{t.types[k]}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="s-min">{t.search.minBudget}</label>
        <select id="s-min" className="field" value={min} onChange={(e) => setMin(e.target.value)}>
          <option value="">{t.search.noMin}</option>
          {PRICE_STEPS.map((v) => <option key={v} value={v}>{compactPrice(v, lang)}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="s-max">{t.search.maxBudget}</label>
        <select id="s-max" className="field" value={max} onChange={(e) => setMax(e.target.value)}>
          <option value="">{t.search.noMax}</option>
          {PRICE_STEPS.map((v) => <option key={v} value={v}>{compactPrice(v, lang)}</option>)}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="s-beds">{t.search.bedrooms}</label>
        <select id="s-beds" className="field" value={beds} onChange={(e) => setBeds(e.target.value)}>
          <option value="">{t.search.any}</option>
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
        </select>
      </div>
      <button type="submit" className="btn-primary sm:col-span-2 lg:col-span-1"><Search className="h-4 w-4" aria-hidden="true" />{t.search.submit}</button>
    </form>
  );
}
