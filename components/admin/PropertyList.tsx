"use client";

import { useState } from "react";
import { Copy, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { DESTINATIONS } from "@/data/destinations";
import { cityOf, formatPrice } from "@/lib/utils";
import PropertyImage from "@/components/PropertyImage";
import type { PropertyStatus } from "@/lib/types";
import type { View } from "./AdminApp";

export const STATUS_STYLE: Record<PropertyStatus, string> = {
  published: "bg-forest/10 text-forest",
  draft: "bg-sand text-gold-dark",
  unavailable: "bg-ink/10 text-ink-soft",
};

export default function PropertyList({ go }: { go: (v: View) => void }) {
  const { t, lang, properties, saveProperty, deleteProperty, duplicateProperty, currency, settings } = useStore();
  const L = t.admin.list;
  const [q, setQ] = useState(""), [city, setCity] = useState(""), [status, setStatus] = useState("");
  const rows = properties.filter((p) => {
    const kw = q.trim().toLowerCase();
    if (kw && !`${p.title.es} ${p.title.en} ${p.id}`.toLowerCase().includes(kw)) return false;
    if (city && p.cityId !== city) return false;
    if (status && p.status !== status) return false;
    return true;
  });
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl">{L.title}</h1>
        <button type="button" className="btn-primary" onClick={() => go({ name: "editor", id: "new" })}><Plus className="h-4 w-4" aria-hidden="true" />{L.new}</button>
      </div>
      <div className="mt-5 grid gap-3 rounded-xl bg-white p-4 shadow-card sm:grid-cols-3">
        <div><label className="label" htmlFor="a-q">{L.search}</label><input id="a-q" type="search" className="field" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div><label className="label" htmlFor="a-city">{L.city}</label><select id="a-city" className="field" value={city} onChange={(e) => setCity(e.target.value)}><option value="">{L.all}</option>{DESTINATIONS.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div>
        <div><label className="label" htmlFor="a-st">{L.status}</label><select id="a-st" className="field" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">{L.all}</option>{(["published", "draft", "unavailable"] as const).map((s) => <option key={s} value={s}>{t.admin.status[s]}</option>)}</select></div>
      </div>
      <p className="mt-4 text-sm text-ink-soft" role="status" aria-live="polite">{L.count(rows.length)}</p>

      {rows.length === 0 ? <p className="mt-6 rounded-xl bg-white p-8 text-center text-ink-soft">{L.empty}</p> : (
        <ul className="mt-3 space-y-3">
          {rows.map((p) => {
            const c = cityOf(p);
            return (
              <li key={p.id} className="grid items-center gap-4 rounded-xl bg-white p-3 shadow-card sm:grid-cols-[88px_1fr_auto]">
                <PropertyImage photo={p.photos[0]} scene={p.scene} seed={1} alt="" className="hidden h-16 w-22 rounded-lg sm:block sm:h-[66px] sm:w-[88px]" />
                <div className="min-w-0">
                  <p className="truncate font-semibold">{p.title[lang]}</p>
                  <p className="text-sm text-ink-soft">{p.id} · {c?.name} · {formatPrice(p.price, currency, settings, lang)}</p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[p.status]}`}>{t.admin.status[p.status]}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    { k: "edit", Icon: Pencil, label: L.edit, fn: () => go({ name: "editor", id: p.id }) },
                    { k: "toggle", Icon: p.status === "published" ? EyeOff : Eye, label: p.status === "published" ? L.unpublish : L.publish, fn: () => saveProperty({ ...p, status: p.status === "published" ? "draft" : "published" }) },
                    { k: "dup", Icon: Copy, label: L.duplicate, fn: () => duplicateProperty(p.id) },
                    { k: "del", Icon: Trash2, label: L.delete, fn: () => { if (window.confirm(L.confirmDelete)) deleteProperty(p.id); } },
                  ].map(({ k, Icon, label, fn }) => (
                    <button key={k} type="button" onClick={fn} aria-label={`${label}: ${p.title[lang]}`} title={label}
                      className={`grid h-11 w-11 cursor-pointer place-items-center rounded-lg border border-sand-dark/60 transition hover:bg-sand-light ${k === "del" ? "text-red-700" : "text-forest"}`}><Icon className="h-4 w-4" aria-hidden="true" /></button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
