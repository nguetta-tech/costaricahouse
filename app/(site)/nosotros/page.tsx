import type { Metadata } from "next";
import AboutClient from "@/components/pages/AboutClient";

export const metadata: Metadata = { title: "Nosotros", description: "Conozca la visión y el enfoque de la plataforma." };

export default function Page() {
  return <AboutClient />;
}
