"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import Logo from "./Logo";

export default function Footer() {
  const { t, settings, currency, setCurrency } = useStore();
  return (
    <footer className="mt-24 bg-forest-deep text-cream/85">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo name={settings.brandName} light />
          <p className="mt-4 max-w-sm font-serif text-xl text-cream">{t.footer.tagline}</p>
        </div>
        <nav aria-label={t.footer.explore}>
          <h2 className="eyebrow !text-gold">{t.footer.explore}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/propiedades">{t.nav.properties}</Link></li>
            <li><Link className="hover:text-white" href="/destinos">{t.nav.destinations}</Link></li>
            <li><Link className="hover:text-white" href="/nosotros">{t.nav.about}</Link></li>
            <li><Link className="hover:text-white" href="/contacto">{t.nav.contact}</Link></li>
            <li><Link className="hover:text-white" href="/admin">{t.nav.admin}</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow !text-gold">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{settings.ownerName}</li>
            <li>{settings.email}</li>
            <li>{settings.phone || t.contact.notProvided}</li>
            <li>{settings.address}</li>
          </ul>
          <div className="mt-5" role="group" aria-label={t.footer.currency}>
            <p className="text-xs uppercase tracking-wider text-cream/60">{t.footer.currency}</p>
            <div className="mt-2 inline-flex rounded-full border border-white/25 p-0.5 text-xs font-semibold">
              {(["USD", "CRC"] as const).map((c) => (
                <button key={c} type="button" aria-pressed={currency === c} onClick={() => setCurrency(c)}
                  className={`min-h-[32px] min-w-[52px] cursor-pointer rounded-full px-3 transition ${currency === c ? "bg-gold text-forest-deep" : "hover:bg-white/10"}`}>{c}</button>
              ))}
            </div>
            <p className="mt-2 text-xs text-cream/60">{t.footer.rateNote}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-5 text-xs text-cream/60">© {new Date().getFullYear()} {settings.brandName} · {t.footer.demo} {t.footer.rights}</p>
      </div>
    </footer>
  );
}
