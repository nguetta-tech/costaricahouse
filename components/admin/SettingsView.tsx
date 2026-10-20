"use client";

import { useState, type FormEvent } from "react";
import { useStore } from "@/lib/store";
import type { SiteSettings } from "@/lib/types";

export default function SettingsView() {
  const { t, settings, saveSettings } = useStore();
  const S = t.admin.settings;
  const [s, setS] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);
  const set = <K extends keyof SiteSettings>(k: K, v: SiteSettings[K]) => { setSaved(false); setS((x) => ({ ...x, [k]: v })); };
  const submit = (e: FormEvent) => { e.preventDefault(); saveSettings({ ...s, crcRate: s.crcRate > 0 ? s.crcRate : settings.crcRate, whatsapp: s.whatsapp.replace(/\D/g, "") }); setSaved(true); };
  const text = (k: "brandName" | "ownerName" | "email" | "phone" | "address", label: string, type = "text") => (
    <div><label className="label" htmlFor={`s-${k}`}>{label}</label><input id={`s-${k}`} type={type} className="field" value={s[k]} onChange={(e) => set(k, e.target.value)} /></div>
  );
  return (
    <form onSubmit={submit} className="max-w-2xl">
      <h1 className="text-4xl">{S.title}</h1>
      <p className="mt-1 text-sm text-ink-soft">{S.note}</p>
      <div className="mt-6 grid gap-4 rounded-xl bg-white p-5 shadow-card sm:grid-cols-2">
        {text("brandName", S.brand)}{text("ownerName", S.owner)}{text("email", S.email, "email")}{text("phone", S.phone, "tel")}
        <div className="sm:col-span-2">{text("address", S.address)}</div>
        <div className="sm:col-span-2"><label className="label" htmlFor="s-wa">{S.whatsapp}</label><input id="s-wa" inputMode="numeric" className="field" value={s.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} aria-describedby="s-wa-h" /><p id="s-wa-h" className="mt-1 text-xs text-ink-soft">{S.whatsappHelp}</p></div>
        <div><label className="label" htmlFor="s-cur">{S.currency}</label><select id="s-cur" className="field" value={s.defaultCurrency} onChange={(e) => set("defaultCurrency", e.target.value as "USD" | "CRC")}><option>USD</option><option>CRC</option></select></div>
        <div><label className="label" htmlFor="s-rate">{S.rate}</label><input id="s-rate" type="number" min="1" className="field" value={s.crcRate} onChange={(e) => set("crcRate", Number(e.target.value))} aria-describedby="s-rate-h" /><p id="s-rate-h" className="mt-1 text-xs text-ink-soft">{S.rateHelp}</p></div>
      </div>
      <button type="submit" className="btn-primary mt-5">{S.save}</button>
      {saved && <p role="status" className="mt-3 rounded-lg bg-forest/10 px-3 py-2 text-sm font-medium text-forest">{S.saved}</p>}
    </form>
  );
}
