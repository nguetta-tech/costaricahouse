import type { Metadata } from "next";
import ContactClient from "@/components/pages/ContactClient";

export const metadata: Metadata = { title: "Contacto", description: "Escriba al propietario para pedir información sobre las propiedades." };

export default function Page() {
  return <ContactClient />;
}
