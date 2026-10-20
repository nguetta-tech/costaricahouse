import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

// Ojo: excluir /admin del indexado NO es una medida de seguridad. La protección real llegará con la autenticación (fase 2).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: "/admin" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
