"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ImagePlus, Sparkles, Star, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { DESTINATIONS } from "@/data/destinations";
import { ALL_AMENITIES, AMENITY_LABELS } from "@/lib/i18n/amenities";
import PropertyImage from "@/components/PropertyImage";
import type { AmenityKey, Property, PropertyStatus, PropertyType } from "@/lib/types";
import type { View } from "./AdminApp";

const TYPES: PropertyType[] = ["luxuryVilla", "familyHome", "contemporary", "vacationHome", "beachNear", "natureHome"];
const STATUSES: PropertyStatus[] = ["draft", "published", "unavailable"];

export default function PropertyEditor({ id, go }: { id: string; go: (v: View) => void }) {
  const { t, lang, properties, saveProperty } = useStore();
  const E = t.admin.editor;
  const existing = properties.find((p) => p.id === id);
  const [d, setD] = useState<Property>(() => existing ?? {
    id: `CR-${String(100 + properties.length + Math.floor(Math.random() * 800))}`,
    title: { es: "", en: "" }, cityId: DESTINATIONS[0].id, price: 0, type: "contemporary", bedrooms: 2, bathrooms: 2, livingArea: 100,
    description: { es: "", en: "" }, amenities: [], scene: "beach", photos: [{ id: "n-0", variant: 0 }], status: "draft", featured: false, isDemo: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const upd = (patch: Partial<Property>) => { setSaved(false); setD((s) => ({ ...s, ...patch })); };
  const num = (v: string) => (v === "" ? NaN : Number(v));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!d.title.es.trim()) er.titleEs = E.errors.required;
    if (!d.title.en.trim()) er.titleEn = E.errors.required;
    if (!(d.price > 0)) er.price = E.errors.price;
    for (const k of ["bedrooms", "bathrooms", "livingArea"] as const) if (!Number.isFinite(d[k]) || d[k] < 0) er[k] = E.errors.number;
    setErrors(er);
    if (Object.keys(er).length) { document.getElementById(`e-${Object.keys(er)[0]}`)?.focus(); return; }
    // La ville détermine aussi le décor d'illustration par défaut
    const dest = DESTINATIONS.find((x) => x.id === d.cityId);
    saveProperty({ ...d, scene: existing ? d.scene : dest?.scene ?? d.scene });
    setSaved(true);
  };

  const movePhoto = (i: number, dir: -1 | 1) => {
    const j = i + dir; if (j < 0 || j >= d.photos.length) return;
    const ph = [...d.photos]; [ph[i], ph[j]] = [ph[j], ph[i]]; upd({ photos: ph });
  };
  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const added = Array.from(files).filter((f) => f.type.startsWith("image/")).map((f, i) => ({ id: `u-${Date.now()}-${i}`, variant: 0, src: URL.createObjectURL(f) }));
    if (added.length) upd({ photos: [...d.photos, ...added] });
    if (fileRef.current) fileRef.current.value = "";
  };
  const toggleAmenity = (a: AmenityKey) => upd({ amenities: d.amenities.includes(a) ? d.amenities.filter((x) => x !== a) : [...d.amenities, a] });

  const err = (k: string) => errors[k] && <p id={`e-${k}-err`} role="alert" className="mt-1 text-xs font-medium text-red-700">{errors[k]}</p>;
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}-err` : undefined });
  const seed = Number(d.id.replace(/\D/g, "")) || 0;

  return (
    <form onSubmit={submit} noValidate>
      <button type="button" onClick={() => go({ name: "properties" })} className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm font-semibold text-forest"><ArrowLeft className="h-4 w-4" aria-hidden="true" />{t.admin.nav.properties}</button>
      <h1 className="text-4xl">{existing ? E.editTitle : E.newTitle} <span className="text-lg text-ink-soft">{d.id}</span></h1>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="grid gap-4 rounded-xl bg-white p-5 shadow-card sm:grid-cols-2">
            <div><label className="label" htmlFor="e-titleEs">{E.titleEs}</label><input id="e-titleEs" className="field" value={d.title.es} onChange={(e) => upd({ title: { ...d.title, es: e.target.value } })} {...inv("titleEs")} />{err("titleEs")}</div>
            <div><label className="label" htmlFor="e-titleEn">{E.titleEn}</label><input id="e-titleEn" className="field" value={d.title.en} onChange={(e) => upd({ title: { ...d.title, en: e.target.value } })} {...inv("titleEn")} />{err("titleEn")}</div>
            <div><label className="label" htmlFor="e-city">{E.city}</label><select id="e-city" className="field" value={d.cityId} onChange={(e) => upd({ cityId: e.target.value })}>{DESTINATIONS.map((x) => <option key={x.id} value={x.id}>{x.name} — {x.province}</option>)}</select></div>
            <div><label className="label" htmlFor="e-price">{E.price}</label><input id="e-price" type="number" min="0" step="1000" className="field" value={Number.isNaN(d.price) ? "" : d.price} onChange={(e) => upd({ price: num(e.target.value) })} {...inv("price")} />{err("price")}</div>
            <div><label className="label" htmlFor="e-type">{E.type}</label><select id="e-type" className="field" value={d.type} onChange={(e) => upd({ type: e.target.value as PropertyType })}>{TYPES.map((k) => <option key={k} value={k}>{t.types[k]}</option>)}</select></div>
            <div><label className="label" htmlFor="e-status">{E.status}</label><select id="e-status" className="field" value={d.status} onChange={(e) => upd({ status: e.target.value as PropertyStatus })}>{STATUSES.map((s) => <option key={s} value={s}>{t.admin.status[s]}</option>)}</select></div>
            <div><label className="label" htmlFor="e-bedrooms">{E.beds}</label><input id="e-bedrooms" type="number" min="0" className="field" value={Number.isNaN(d.bedrooms) ? "" : d.bedrooms} onChange={(e) => upd({ bedrooms: num(e.target.value) })} {...inv("bedrooms")} />{err("bedrooms")}</div>
            <div><label className="label" htmlFor="e-bathrooms">{E.baths}</label><input id="e-bathrooms" type="number" min="0" className="field" value={Number.isNaN(d.bathrooms) ? "" : d.bathrooms} onChange={(e) => upd({ bathrooms: num(e.target.value) })} {...inv("bathrooms")} />{err("bathrooms")}</div>
            <div><label className="label" htmlFor="e-livingArea">{E.living}</label><input id="e-livingArea" type="number" min="0" className="field" value={Number.isNaN(d.livingArea) ? "" : d.livingArea} onChange={(e) => upd({ livingArea: num(e.target.value) })} {...inv("livingArea")} />{err("livingArea")}</div>
            <div><label className="label" htmlFor="e-lot">{E.lot}</label><input id="e-lot" type="number" min="0" className="field" value={d.lotArea ?? ""} onChange={(e) => upd({ lotArea: e.target.value === "" ? undefined : Number(e.target.value) })} /></div>
            <div className="sm:col-span-2"><label className="label" htmlFor="e-descEs">{E.descEs}</label><textarea id="e-descEs" rows={4} className="field py-3" value={d.description.es} onChange={(e) => upd({ description: { ...d.description, es: e.target.value } })} /></div>
            <div className="sm:col-span-2"><label className="label" htmlFor="e-descEn">{E.descEn}</label><textarea id="e-descEn" rows={4} className="field py-3" value={d.description.en} onChange={(e) => upd({ description: { ...d.description, en: e.target.value } })} /></div>
            <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm font-medium sm:col-span-2"><input type="checkbox" className="h-5 w-5 accent-forest" checked={d.featured} onChange={(e) => upd({ featured: e.target.checked })} />{E.featured}</label>
          </section>

          <fieldset className="rounded-xl bg-white p-5 shadow-card">
            <legend className="px-1 font-serif text-2xl">{E.amenities}</legend>
            <div className="mt-2 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_AMENITIES.map((a) => <label key={a} className="flex min-h-[44px] cursor-pointer items-center gap-2.5 text-sm"><input type="checkbox" className="h-4 w-4 accent-forest" checked={d.amenities.includes(a)} onChange={() => toggleAmenity(a)} />{AMENITY_LABELS[a][lang]}</label>)}
            </div>
          </fieldset>

          <section className="rounded-xl bg-white p-5 shadow-card" aria-labelledby="ph">
            <h2 id="ph" className="text-2xl">{E.photos}</h2>
            <p className="mt-1 text-sm text-ink-soft">{E.photosHelp}</p>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {d.photos.map((ph, i) => (
                <li key={ph.id} className="overflow-hidden rounded-lg border border-sand-dark/50">
                  <div className="relative"><PropertyImage photo={ph} scene={d.scene} seed={seed} alt={`${i + 1}`} className="aspect-[4/3] w-full" />{i === 0 && <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-forest-deep"><Star className="h-3 w-3" aria-hidden="true" />{E.main}</span>}</div>
                  <div className="flex justify-between p-1">
                    <button type="button" disabled={i === 0} onClick={() => movePhoto(i, -1)} aria-label={E.left} className="grid h-10 w-10 cursor-pointer place-items-center rounded hover:bg-sand-light disabled:opacity-30"><ArrowLeft className="h-4 w-4" aria-hidden="true" /></button>
                    <button type="button" disabled={i === 0} onClick={() => upd({ photos: [ph, ...d.photos.filter((x) => x.id !== ph.id)] })} aria-label={E.makeMain} title={E.makeMain} className="grid h-10 w-10 cursor-pointer place-items-center rounded hover:bg-sand-light disabled:opacity-30"><Star className="h-4 w-4" aria-hidden="true" /></button>
                    <button type="button" onClick={() => upd({ photos: d.photos.filter((x) => x.id !== ph.id) })} aria-label={E.remove} title={E.remove} className="grid h-10 w-10 cursor-pointer place-items-center rounded text-red-700 hover:bg-red-50"><Trash2 className="h-4 w-4" aria-hidden="true" /></button>
                    <button type="button" disabled={i === d.photos.length - 1} onClick={() => movePhoto(i, 1)} aria-label={E.right} className="grid h-10 w-10 cursor-pointer place-items-center rounded hover:bg-sand-light disabled:opacity-30"><ArrowRight className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <input ref={fileRef} id="e-file" type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addFiles(e.target.files)} />
              <label htmlFor="e-file" className="btn-outline cursor-pointer focus-within:outline"><ImagePlus className="h-4 w-4" aria-hidden="true" />{E.add}</label>
              <button type="button" className="btn-outline" onClick={() => upd({ photos: [...d.photos, { id: `i-${Date.now()}`, variant: d.photos.length % 4 }] })}><Sparkles className="h-4 w-4" aria-hidden="true" />{E.addIllus}</button>
            </div>
          </section>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-xl bg-white p-5 shadow-card">
            <PropertyImage photo={d.photos[0]} scene={d.scene} seed={seed} alt="" className="aspect-[4/3] w-full rounded-lg" />
            <p className="mt-3 font-serif text-2xl">{d.title[lang] || "—"}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">{E.save}</button>
            <button type="button" className="btn-outline" onClick={() => go({ name: "properties" })}>{E.cancel}</button>
          </div>
          {saved && <p role="status" className="rounded-lg bg-forest/10 px-3 py-2 text-sm font-medium text-forest">{E.saved}</p>}
        </aside>
      </div>
    </form>
  );
}
