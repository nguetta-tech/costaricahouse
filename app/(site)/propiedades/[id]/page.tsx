import type { Metadata } from "next";
import DetailClient from "@/components/pages/DetailClient";
import { INITIAL_PROPERTIES, PUBLIC_IDS } from "@/data/properties";
import { getDestination } from "@/data/destinations";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PUBLIC_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = INITIAL_PROPERTIES.find((x) => x.id === id);
  if (!p) return { title: "Propiedad" };
  const c = getDestination(p.cityId);
  return {
    title: `${p.title.es} · ${c?.name}`,
    description: `${p.description.es.slice(0, 150)}… (Anuncio de demostración)`,
    openGraph: { title: p.title.es, description: `${c?.name}, ${c?.province} · anuncio de demostración` },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <DetailClient id={id} />;
}
