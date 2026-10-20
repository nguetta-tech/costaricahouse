import { Leaf } from "lucide-react";

export default function Logo({ name, light = false }: { name: string; light?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${light ? "text-cream" : "text-forest-deep"}`}>
      <span className={`grid h-9 w-9 place-items-center rounded-full border ${light ? "border-gold bg-white/10" : "border-gold bg-forest"}`}>
        <Leaf className={`h-4 w-4 ${light ? "text-gold" : "text-gold"}`} aria-hidden="true" />
      </span>
      <span className="font-serif text-2xl font-semibold tracking-wide">{name}</span>
    </span>
  );
}
