"use client";

import { useStore } from "@/lib/store";
import { PROVINCES } from "@/data/destinations";
import { cityOf } from "@/lib/utils";
import type { View } from "./AdminApp";

export default function Dashboard({ go }: { go: (v: View) => void }) {
  const { t, properties, inquiries } = useStore();
  const s = t.admin.dashboard;
  const stats = [
    { l: s.stats.total, v: properties.length },
    { l: s.stats.published, v: properties.filter((p) => p.status === "published").length },
    { l: s.stats.draft, v: properties.filter((p) => p.status === "draft").length },
    { l: s.stats.unavailable, v: properties.filter((p) => p.status === "unavailable").length },
    { l: s.stats.inquiries, v: inquiries.filter((q) => q.state === "new").length },
  ];
  const byProv = PROVINCES.map((pr) => ({ pr, n: properties.filter((p) => cityOf(p)?.province === pr).length }));
  const maxN = Math.max(1, ...byProv.map((b) => b.n));
  return (
    <div>
      <h1 className="text-4xl">{s.title}</h1>
      <p className="mt-1 text-sm text-ink-soft">{s.demoNote}</p>
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((x) => <li key={x.l} className="rounded-xl bg-white p-4 shadow-card"><p className="text-3xl font-semibold text-forest-deep">{x.v}</p><p className="text-xs uppercase tracking-wider text-ink-soft">{x.l}</p></li>)}
      </ul>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-white p-5 shadow-card" aria-labelledby="bp">
          <h2 id="bp" className="text-2xl">{s.byProvince}</h2>
          <ul className="mt-4 space-y-3">
            {byProv.map(({ pr, n }) => (
              <li key={pr} className="grid grid-cols-[110px_1fr_28px] items-center gap-3 text-sm">
                <span>{pr}</span>
                <span className="h-2.5 overflow-hidden rounded-full bg-sand-light"><span className="block h-full rounded-full bg-forest" style={{ width: `${(n / maxN) * 100}%` }} /></span>
                <span className="text-right font-semibold">{n}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl bg-white p-5 shadow-card" aria-labelledby="rc">
          <h2 id="rc" className="text-2xl">{s.recent}</h2>
          {inquiries.length === 0 ? <p className="mt-4 text-sm text-ink-soft">{s.none}</p> : (
            <ul className="mt-4 divide-y divide-sand-dark/40">
              {inquiries.slice(0, 4).map((q) => (
                <li key={q.id} className="py-3"><p className="text-sm font-semibold">{q.name}</p><p className="truncate text-sm text-ink-soft">{q.subject}</p></li>
              ))}
            </ul>
          )}
          <button type="button" className="btn-outline mt-4" onClick={() => go({ name: "inquiries" })}>{t.admin.nav.inquiries}</button>
        </section>
      </div>
    </div>
  );
}
