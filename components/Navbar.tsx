"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export default function Navbar() {
  const { t, lang, setLang, settings } = useStore();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/propiedades", label: t.nav.properties },
    { href: "/destinos", label: t.nav.destinations },
    { href: "/nosotros", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ];
  const isActive = (h: string) => (h === "/" ? pathname === "/" : pathname.startsWith(h));

  const LangSwitch = (
    <div role="group" aria-label={t.lang.label} className={cn("inline-flex rounded-full border p-0.5 text-xs font-semibold", overHero ? "border-white/40" : "border-forest/25")}>
      {(["es", "en"] as const).map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l} aria-label={t.lang[l]}
          className={cn("min-h-[32px] min-w-[40px] cursor-pointer rounded-full px-3 uppercase transition",
            lang === l ? "bg-gold text-forest-deep" : overHero ? "text-white hover:bg-white/15" : "text-forest hover:bg-forest/10")}>
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-colors duration-300", overHero ? "bg-transparent" : "bg-cream/95 shadow-card backdrop-blur")}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label={settings.brandName}><Logo name={settings.brandName} light={overHero} /></Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}
              className={cn("relative px-3.5 py-2 text-sm font-medium transition", overHero ? "text-white/90 hover:text-white" : "text-ink-soft hover:text-forest")}>
              {l.label}
              {isActive(l.href) && <motion.span layoutId="nav-underline" className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded bg-gold" />}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {LangSwitch}
          <Link href="/propiedades" className={overHero ? "btn-gold" : "btn-primary"}>{t.nav.discover}</Link>
        </div>

        <button type="button" className={cn("grid h-11 w-11 cursor-pointer place-items-center rounded-full lg:hidden", overHero ? "text-white" : "text-forest")}
          aria-label={open ? t.nav.close : t.nav.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="border-t border-sand-dark/40 bg-cream lg:hidden">
            <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
              {links.map((l) => (
                <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn("flex min-h-[48px] items-center rounded-lg px-3 font-serif text-xl", isActive(l.href) ? "bg-sand-light text-forest-deep" : "text-ink-soft")}>
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3">
                {LangSwitch}
                <Link href="/propiedades" className="btn-primary">{t.nav.discover}</Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
