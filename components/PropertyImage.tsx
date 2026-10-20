"use client";

import { useState } from "react";
import Scene from "./Scene";
import type { Photo, SceneKind } from "@/lib/types";

/** Affiche la vraie photo si `photo.src` existe et se charge ; sinon l'illustration de secours. */
export default function PropertyImage({
  photo, scene, seed = 0, alt, className = "", eager = false,
}: { photo?: Photo; scene: SceneKind; seed?: number; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const showReal = !!photo?.src && !failed;
  return (
    <div className={`relative overflow-hidden bg-sand-light ${className}`} role="img" aria-label={alt}>
      {showReal ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo!.src} alt="" loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <Scene kind={scene} variant={photo?.variant ?? 0} seed={seed} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}
