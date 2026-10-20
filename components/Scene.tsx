import type { SceneKind } from "@/lib/types";

/**
 * Illustration de démonstration générée en SVG (aucune image distante, aucun chargement bloquant).
 * Remplacée par une vraie photo dès que `photo.src` est fourni (voir PropertyImage).
 */
const PAL = [
  // 0 jour
  { skyA: "#9CC9D8", skyB: "#E6F0E8", sun: "#FFF6D8", far: "#6F9C8A", mid: "#3F7357", near: "#1F4A36", sea: "#4C9DB0", wall: "#F4F0E6", roof: "#26382F", glow: "#BFE3EA", sand: "#E8DCC4" },
  // 1 coucher de soleil
  { skyA: "#E8A66B", skyB: "#F6D9A8", sun: "#FFE9B0", far: "#9A8670", mid: "#4F6B50", near: "#24402E", sea: "#D18B6A", wall: "#FBEBD2", roof: "#3A2B22", glow: "#FFD27A", sand: "#E3CDA6" },
  // 2 lumineux / piscine
  { skyA: "#7FC1D6", skyB: "#DFF1EC", sun: "#FFFFFF", far: "#5F9B80", mid: "#2E6B4F", near: "#174232", sea: "#39A5BC", wall: "#FFFFFF", roof: "#2B3A33", glow: "#9FE0EE", sand: "#EFE3C8" },
  // 3 crépuscule
  { skyA: "#2B3F5C", skyB: "#7C7BA0", sun: "#E9E3F5", far: "#3B4F64", mid: "#22402F", near: "#10261D", sea: "#2D5170", wall: "#D9D3C6", roof: "#141C18", glow: "#FFCF6B", sand: "#8F8670" },
];

function Palm({ x, y, s = 1, c }: { x: number; y: number; s?: number; c: string }) {
  const fronds = [-70, -35, 0, 35, 70, 160, 200];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C 6 -40 -4 -80 4 -120" stroke="#5A4630" strokeWidth="6" fill="none" strokeLinecap="round" />
      <g transform="translate(4 -120)">
        {fronds.map((a) => (
          <path key={a} d="M0 0 Q 40 -26 86 6 Q 42 -8 0 0Z" fill={c} transform={`rotate(${a - 90})`} />
        ))}
      </g>
    </g>
  );
}

function Villa({ x, y, s = 1, p, pool = true }: { x: number; y: number; s?: number; p: (typeof PAL)[number]; pool?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* volume bas */}
      <rect x="0" y="-70" width="230" height="70" fill={p.wall} />
      <rect x="-12" y="-78" width="254" height="9" fill={p.roof} />
      {/* volume haut */}
      <rect x="50" y="-132" width="150" height="54" fill={p.wall} />
      <rect x="38" y="-140" width="176" height="9" fill={p.roof} />
      {/* vitrages */}
      <rect x="14" y="-58" width="120" height="50" fill={p.glow} opacity=".92" />
      <rect x="146" y="-58" width="70" height="50" fill={p.glow} opacity=".75" />
      <rect x="64" y="-122" width="122" height="34" fill={p.glow} opacity=".9" />
      <path d="M74 -58v50M104 -58v50M134 -58v50M94 -122v34M124 -122v34M154 -122v34" stroke={p.roof} strokeWidth="2" opacity=".5" />
      {/* terrasse + piscine */}
      <rect x="-30" y="0" width="290" height="8" fill={p.roof} opacity=".85" />
      {pool && (
        <g>
          <rect x="10" y="14" width="200" height="22" rx="2" fill={p.sea} />
          <path d="M20 22 h60 M110 28 h70" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

function Hills({ p, kind }: { p: (typeof PAL)[number]; kind: SceneKind }) {
  switch (kind) {
    case "mountain":
      return (
        <>
          <path d="M0 330 L130 190 L240 290 L380 150 L520 290 L650 200 L800 320 V420 H0Z" fill={p.far} />
          <path d="M0 380 L160 270 L300 360 L470 250 L640 360 L800 290 V460 H0Z" fill={p.mid} />
        </>
      );
    case "volcano":
      return (
        <>
          <path d="M0 360 L120 300 L260 350 L420 140 L580 350 L700 300 L800 350 V440 H0Z" fill={p.far} />
          <path d="M380 175 Q 420 120 470 170" stroke="#fff" strokeOpacity=".55" strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d="M0 400 Q 200 340 400 395 T 800 380 V470 H0Z" fill={p.mid} />
        </>
      );
    case "city":
      return (
        <>
          <path d="M0 330 L200 260 L420 320 L640 240 L800 300 V430 H0Z" fill={p.far} />
          {[40, 110, 190, 560, 640, 720].map((bx, i) => (
            <rect key={bx} x={bx} y={300 - (i % 3) * 26} width="44" height={90 + (i % 3) * 26} fill={p.roof} opacity=".55" />
          ))}
          <path d="M0 400 Q 250 360 480 405 T 800 390 V470 H0Z" fill={p.mid} />
        </>
      );
    case "jungle":
      return (
        <>
          <path d="M0 300 Q 150 200 300 290 T 600 270 T 800 300 V440 H0Z" fill={p.far} />
          <path d="M0 360 Q 120 280 260 360 T 520 340 T 800 350 V470 H0Z" fill={p.mid} />
        </>
      );
    default: // beach, ocean
      return (
        <>
          <path d="M0 330 Q 200 270 380 330 T 800 310 V380 H0Z" fill={p.far} opacity=".8" />
          <rect x="0" y="330" width="800" height="110" fill={p.sea} />
          <path d="M0 360 H800 M0 390 H800" stroke="#fff" strokeOpacity=".18" strokeWidth="2" />
        </>
      );
  }
}

export default function Scene({ kind, variant = 0, seed = 0, className }: { kind: SceneKind; variant?: number; seed?: number; className?: string }) {
  const p = PAL[((variant % 4) + 4) % 4];
  const zoom = variant === 2;
  const vx = 120 + (seed % 5) * 30;
  const water = kind === "beach" || kind === "ocean";
  const id = `g-${kind}-${variant}-${seed}`;
  return (
    <svg className={className} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyA} />
          <stop offset="1" stopColor={p.skyB} />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${id})`} />
      <circle cx={variant === 3 ? 610 : 560 - (seed % 3) * 80} cy={variant === 1 ? 300 : 130} r={variant === 3 ? 34 : 52} fill={p.sun} opacity={variant === 3 ? 0.85 : 0.95} />
      <Hills p={p} kind={kind} />
      <g transform={zoom ? `translate(-260 -150) scale(1.55)` : undefined}>
        {/* sol / terrasse */}
        <path d={water ? "M0 440 Q 300 420 800 450 V600 H0Z" : "M0 450 H800 V600 H0Z"} fill={water ? p.sand : p.near} />
        <rect x="0" y="470" width="800" height="130" fill={p.near} opacity={water ? 0.18 : 0.55} />
        <Villa x={vx} y={470} p={p} />
        {water && <Palm x={vx + 300} y={500} s={1.1} c={p.near} />}
        {(kind === "jungle" || kind === "mountain" || kind === "volcano") && (
          <>
            <Palm x={vx - 40} y={520} s={1.3} c={p.near} />
            <Palm x={vx + 320} y={540} s={1.6} c={p.near} />
          </>
        )}
        <Palm x={vx - 80} y={560} s={1.5} c={p.near} />
      </g>
      {variant === 3 && <rect width="800" height="600" fill="#0b1420" opacity=".18" />}
    </svg>
  );
}
