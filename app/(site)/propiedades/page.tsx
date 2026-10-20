import { Suspense } from "react";
import type { Metadata } from "next";
import CatalogClient from "@/components/pages/CatalogClient";

export const metadata: Metadata = {
  title: "Propiedades",
  description: "Explore villas, casas familiares y propiedades de vacaciones de demostración en Costa Rica. Filtre por destino, tipo y presupuesto.",
};

export default function Page() {
  return <Suspense fallback={<div className="min-h-screen" />}><CatalogClient /></Suspense>;
}
