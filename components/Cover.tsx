"use client";

import { useState } from "react";
import Scene from "./Scene";
import type { SceneKind } from "@/lib/types";

/** Image de couverture : vraie photo si disponible, illustration de secours sinon (ou si l'image échoue). */
export default function Cover({ src, kind, variant = 0, seed = 0, alt = "", className = "", eager = false }: { src?: string; kind: SceneKind; variant?: number; seed?: number; alt?: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <Scene kind={kind} variant={variant} seed={seed} className={className} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
