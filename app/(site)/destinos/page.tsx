import type { Metadata } from "next";
import DestinationsClient from "@/components/pages/DestinationsClient";

export const metadata: Metadata = { title: "Destinos", description: "Zonas de Costa Rica organizadas por provincia: Guanacaste, Puntarenas, San José, Alajuela y Limón." };

export default function Page() {
  return <DestinationsClient />;
}
