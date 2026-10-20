import type { Metadata } from "next";
import type { ReactNode } from "react";

// noindex NO es seguridad: solo evita el referenciado. La protección real (auth + autorización en servidor) llegará en la fase 2.
export const metadata: Metadata = { title: "Panel (prototipo)", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#EFEBE0]">{children}</div>;
}
