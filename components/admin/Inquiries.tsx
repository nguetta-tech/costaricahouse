"use client";

import { useStore } from "@/lib/store";

export default function Inquiries() {
  const { t, lang, inquiries, properties, updateInquiry, deleteInquiry } = useStore();
  const I = t.admin.inquiries;
  const color = { new: "bg-gold/25 text-gold-dark", read: "bg-ink/10 text-ink-soft", replied: "bg-forest/10 text-forest" } as const;
  return (
    <div>
      <h1 className="text-4xl">{I.title}</h1>
      <p className="mt-1 text-sm text-ink-soft">{I.note}</p>
      {inquiries.length === 0 ? <p className="mt-6 rounded-xl bg-white p-8 text-center text-ink-soft">{I.empty}</p> : (
        <ul className="mt-6 space-y-3">
          {inquiries.map((q) => {
            const prop = properties.find((p) => p.id === q.propertyId);
            return (
              <li key={q.id} className="rounded-xl bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${color[q.state]}`}>{I.state[q.state]}</span>
                  {q.simulated && <span className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-semibold text-forest-deep">{I.simulated}</span>}
                  <time className="ml-auto text-xs text-ink-soft" dateTime={q.date}>{new Date(q.date).toLocaleString(lang === "es" ? "es-CR" : "en-US", { dateStyle: "medium", timeStyle: "short" })}</time>
                </div>
                <p className="mt-2 font-semibold">{q.subject}</p>
                <p className="text-sm text-ink-soft">{I.from}: {q.name} · {q.email}{q.phone ? ` · ${q.phone}` : ""}{prop ? ` · ${I.about}: ${prop.title[lang]}` : ""}</p>
                <p className="mt-2 text-sm">{q.message}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" disabled={q.state !== "new"} onClick={() => updateInquiry(q.id, "read")} className="btn-outline !min-h-[40px] !px-4">{I.markRead}</button>
                  <button type="button" disabled={q.state === "replied"} onClick={() => updateInquiry(q.id, "replied")} className="btn-outline !min-h-[40px] !px-4">{I.markReplied}</button>
                  <button type="button" onClick={() => deleteInquiry(q.id)} className="btn-outline !min-h-[40px] !px-4 !text-red-700">{I.delete}</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
