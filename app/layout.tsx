import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { StoreProvider } from "@/lib/store";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "micasa · Propiedades en Costa Rica (maqueta)", template: "%s · micasa" },
  description: "Maqueta de una plataforma inmobiliaria premium en Costa Rica: villas, casas familiares y propiedades de vacaciones. Anuncios ficticios de demostración.",
  openGraph: { type: "website", siteName: "micasa", locale: "es_CR" },
};
export const viewport: Viewport = { themeColor: "#1F3D2E", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap" />
      </head>
      <body><StoreProvider>{children}</StoreProvider></body>
    </html>
  );
}
