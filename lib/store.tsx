"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { INITIAL_PROPERTIES } from "@/data/properties";
import { INITIAL_INQUIRIES } from "@/data/inquiries";
import { DEFAULT_SETTINGS } from "./config";
import { es } from "./i18n/es";
import { en } from "./i18n/en";
import type { Dict } from "./i18n/es";
import type { Inquiry, Lang, Property, SiteSettings } from "./types";

/**
 * Store de démonstration : tout vit en mémoire (React state).
 * Rien n'est stocké dans le navigateur, hormis la langue choisie (donnée non sensible).
 * Phase 2 : remplacer par des appels API + base de données.
 */
interface Store {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  properties: Property[];
  inquiries: Inquiry[];
  settings: SiteSettings;
  currency: "USD" | "CRC";
  setCurrency: (c: "USD" | "CRC") => void;
  saveProperty: (p: Property) => void;
  deleteProperty: (id: string) => void;
  duplicateProperty: (id: string) => void;
  addInquiry: (i: Omit<Inquiry, "id" | "date" | "state" | "simulated">) => void;
  updateInquiry: (id: string, state: Inquiry["state"]) => void;
  deleteInquiry: (id: string) => void;
  saveSettings: (s: SiteSettings) => void;
}

const Ctx = createContext<Store | null>(null);
const DICTS: Record<Lang, Dict> = { es, en };
const LANG_KEY = "verdanta-lang";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [currency, setCurrency] = useState<"USD" | "CRC">(DEFAULT_SETTINGS.defaultCurrency);

  // Langue : lue après le premier rendu pour éviter tout écart d'hydratation.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch {}
  }, []);

  const saveProperty = useCallback((p: Property) => {
    setProperties((prev) => (prev.some((x) => x.id === p.id) ? prev.map((x) => (x.id === p.id ? p : x)) : [p, ...prev]));
  }, []);
  const deleteProperty = useCallback((id: string) => setProperties((prev) => prev.filter((p) => p.id !== id)), []);
  const duplicateProperty = useCallback((id: string) => {
    setProperties((prev) => {
      const src = prev.find((p) => p.id === id);
      if (!src) return prev;
      const n = prev.length + 1;
      const newId = `CR-${String(900 + n)}`;
      return [{ ...src, id: newId, status: "draft", featured: false, title: { es: `${src.title.es} (copia)`, en: `${src.title.en} (copy)` }, photos: src.photos.map((ph, i) => ({ ...ph, id: `${newId}-${i}` })) }, ...prev];
    });
  }, []);

  const addInquiry = useCallback((i: Omit<Inquiry, "id" | "date" | "state" | "simulated">) => {
    setInquiries((prev) => [{ ...i, id: `q${Date.now()}`, date: new Date().toISOString(), state: "new", simulated: true }, ...prev]);
  }, []);
  const updateInquiry = useCallback((id: string, state: Inquiry["state"]) => setInquiries((p) => p.map((q) => (q.id === id ? { ...q, state } : q))), []);
  const deleteInquiry = useCallback((id: string) => setInquiries((p) => p.filter((q) => q.id !== id)), []);
  const saveSettings = useCallback((s: SiteSettings) => { setSettings(s); setCurrency(s.defaultCurrency); }, []);

  const value = useMemo<Store>(
    () => ({ lang, setLang, t: DICTS[lang], properties, inquiries, settings, currency, setCurrency, saveProperty, deleteProperty, duplicateProperty, addInquiry, updateInquiry, deleteInquiry, saveSettings }),
    [lang, setLang, properties, inquiries, settings, currency, saveProperty, deleteProperty, duplicateProperty, addInquiry, updateInquiry, deleteInquiry, saveSettings],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore doit être utilisé dans <StoreProvider>");
  return v;
}
