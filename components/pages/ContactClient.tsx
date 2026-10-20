"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useStore } from "@/lib/store";
import InquiryForm from "@/components/InquiryForm";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContactClient() {
  const { t, lang, settings } = useStore();
  const rows = [
    { Icon: Mail, l: t.contact.email, v: settings.email },
    { Icon: Phone, l: t.contact.phone, v: settings.phone || t.contact.notProvided },
    { Icon: MapPin, l: t.contact.address, v: settings.address },
  ];
  return (
    <>
      <section className="bg-forest pb-14 pt-32 text-cream">
        <div className="container-x"><p className="eyebrow !text-gold">{t.nav.contact}</p><h1 className="mt-2 text-5xl !text-cream sm:text-6xl">{t.contact.title}</h1><p className="mt-3 max-w-xl text-cream/80">{t.contact.subtitle}</p></div>
      </section>
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_420px]">
        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8"><InquiryForm key={lang} idPrefix="c" /></div>
        <aside className="space-y-6">
          <div className="rounded-2xl bg-sand-light p-6">
            <h2 className="text-3xl">{t.contact.detailsTitle}</h2>
            <p className="mt-1 font-semibold">{settings.ownerName}</p>
            <ul className="mt-4 space-y-3 text-sm">
              {rows.map(({ Icon, l, v }) => <li key={l} className="flex gap-3"><Icon className="mt-0.5 h-4 w-4 text-gold-dark" aria-hidden="true" /><span><span className="block text-xs uppercase tracking-wider text-ink-soft">{l}</span>{v}</span></li>)}
            </ul>
            <p className="mt-4 text-xs text-ink-soft">{t.contact.placeholderNote}</p>
          </div>
          <WhatsAppButton text={t.contact.title} className="btn-primary w-full" />
        </aside>
      </div>
    </>
  );
}
