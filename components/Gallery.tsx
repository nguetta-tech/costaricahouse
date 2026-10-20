"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Property } from "@/lib/types";
import PropertyImage from "./PropertyImage";

export default function Gallery({ p, title }: { p: Property; title: string }) {
  const { t } = useStore();
  const [i, setI] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const n = p.photos.length;
  const seed = Number(p.id.replace(/\D/g, "")) || 0;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  useEffect(() => { if (i >= n) setI(0); }, [i, n]);
  useEffect(() => {
    if (!lightbox) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = prevOverflow; openerRef.current?.focus(); };
  }, [lightbox, go]);

  if (n === 0) return <PropertyImage scene={p.scene} seed={seed} alt={title} className="aspect-[16/10] w-full rounded-2xl" />;
  const alt = (idx: number) => `${title} — ${t.detail.gallery.of(idx + 1, n)}`;

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <PropertyImage photo={p.photos[i]} scene={p.scene} seed={seed} alt={alt(i)} eager className="aspect-[4/3] w-full sm:aspect-[16/10]" />
          </motion.div>
        </AnimatePresence>
        <button ref={openerRef} type="button" onClick={() => setLightbox(true)} aria-label={t.detail.gallery.open}
          className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-cream/90 text-forest shadow-card transition hover:bg-white"><Expand className="h-5 w-5" aria-hidden="true" /></button>
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={t.detail.gallery.prev} className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-cream/90 text-forest shadow-card transition hover:bg-white"><ChevronLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => go(1)} aria-label={t.detail.gallery.next} className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-cream/90 text-forest shadow-card transition hover:bg-white"><ChevronRight aria-hidden="true" /></button>
          </>
        )}
        <span className="absolute bottom-3 left-3 rounded-full bg-forest-deep/80 px-3 py-1 text-[11px] text-cream" aria-live="polite">{t.detail.gallery.of(i + 1, n)}</span>
        {!p.photos[i]?.src && <span className="absolute bottom-3 right-3 rounded-full bg-forest-deep/80 px-3 py-1 text-[11px] text-cream">{t.demo.imageNote}</span>}
      </div>

      {n > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {p.photos.map((ph, idx) => (
            <li key={ph.id} className="shrink-0">
              <button type="button" onClick={() => setI(idx)} aria-label={t.detail.gallery.thumb(idx + 1)} aria-current={idx === i}
                className={`block h-16 w-24 cursor-pointer overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28 ${idx === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <PropertyImage photo={ph} scene={p.scene} seed={seed} alt="" className="h-full w-full" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/95 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setLightbox(false)}>
            <button ref={closeRef} type="button" onClick={() => setLightbox(false)} aria-label={t.detail.gallery.close} className="absolute right-4 top-4 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X aria-hidden="true" /></button>
            <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <PropertyImage photo={p.photos[i]} scene={p.scene} seed={seed} alt={alt(i)} eager className="aspect-[16/10] max-h-[80vh] w-full rounded-xl" />
              <p className="mt-3 text-center text-sm text-cream/80">{t.detail.gallery.of(i + 1, n)}</p>
            </div>
            {n > 1 && (
              <>
                <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t.detail.gallery.prev} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronLeft aria-hidden="true" /></button>
                <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t.detail.gallery.next} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><ChevronRight aria-hidden="true" /></button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
