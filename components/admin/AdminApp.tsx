"use client";

import Link from "next/link";
import { useState } from "react";
import { Inbox, LayoutDashboard, Home, Settings as Cog, TriangleAlert, Building2 } from "lucide-react";
import { useStore } from "@/lib/store";
import Logo from "@/components/Logo";
import Dashboard from "./Dashboard";
import PropertyList from "./PropertyList";
import PropertyEditor from "./PropertyEditor";
import Inquiries from "./Inquiries";
import SettingsView from "./SettingsView";

export type View = { name: "dashboard" | "properties" | "inquiries" | "settings" } | { name: "editor"; id: string | "new" };

export default function AdminApp() {
  const { t, lang, setLang, settings, inquiries } = useStore();
  const [view, setView] = useState<View>({ name: "dashboard" });
  const nav = [
    { name: "dashboard", label: t.admin.nav.dashboard, Icon: LayoutDashboard },
    { name: "properties", label: t.admin.nav.properties, Icon: Building2 },
    { name: "inquiries", label: t.admin.nav.inquiries, Icon: Inbox },
    { name: "settings", label: t.admin.nav.settings, Icon: Cog },
  ] as const;
  const current = view.name === "editor" ? "properties" : view.name;
  const newCount = inquiries.filter((q) => q.state === "new").length;

  return (
    <div>
      <div role="note" className="flex items-start gap-2 bg-gold px-4 py-2 text-xs font-semibold text-forest-deep sm:items-center sm:justify-center">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden="true" />{t.admin.banner}
      </div>
      <div className="flex min-h-[calc(100vh-36px)] flex-col md:flex-row">
        <aside className="bg-forest-deep text-cream md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0">
          <div className="flex items-center justify-between gap-3 px-5 py-4 md:block md:py-6">
            <Logo name={settings.brandName} light />
            <p className="hidden pt-2 text-xs uppercase tracking-widest text-cream/60 md:block">{t.admin.title}</p>
          </div>
          <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-3 md:pb-0">
            {nav.map(({ name, label, Icon }) => (
              <button key={name} type="button" onClick={() => setView({ name })} aria-current={current === name ? "page" : undefined}
                className={`flex min-h-[44px] shrink-0 cursor-pointer items-center gap-3 rounded-lg px-3.5 text-sm font-medium transition ${current === name ? "bg-white/12 text-white" : "text-cream/70 hover:bg-white/8 hover:text-white"}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />{label}
                {name === "inquiries" && newCount > 0 && <span className="ml-auto rounded-full bg-gold px-2 text-[11px] font-bold text-forest-deep">{newCount}</span>}
              </button>
            ))}
          </nav>
          <div className="hidden space-y-3 px-5 pt-6 md:block">
            <Link href="/" className="flex items-center gap-2 text-sm text-cream/80 hover:text-white"><Home className="h-4 w-4" aria-hidden="true" />{t.admin.backSite}</Link>
            <div role="group" aria-label={t.lang.label} className="inline-flex rounded-full border border-white/25 p-0.5 text-xs font-semibold">
              {(["es", "en"] as const).map((l) => <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)} className={`min-h-[32px] min-w-[40px] cursor-pointer rounded-full px-3 uppercase ${lang === l ? "bg-gold text-forest-deep" : "hover:bg-white/10"}`}>{l}</button>)}
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-8">
          {view.name === "dashboard" && <Dashboard go={setView} />}
          {view.name === "properties" && <PropertyList go={setView} />}
          {view.name === "editor" && <PropertyEditor key={view.id} id={view.id} go={setView} />}
          {view.name === "inquiries" && <Inquiries />}
          {view.name === "settings" && <SettingsView />}
          <div className="mt-10 flex gap-4 text-sm md:hidden"><Link href="/" className="font-semibold text-forest underline">{t.admin.backSite}</Link></div>
        </main>
      </div>
    </div>
  );
}
