import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { PUBLIC_IDS } from "@/data/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/propiedades", "/destinos", "/nosotros", "/contacto"].map((p) => ({ url: `${SITE_URL}${p}` }));
  return [...pages, ...PUBLIC_IDS.map((id) => ({ url: `${SITE_URL}/propiedades/${id}` }))];
}
