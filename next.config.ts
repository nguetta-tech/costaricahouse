import type { NextConfig } from "next";

// Maquette 100 % frontend : aucune image distante obligatoire, aucun secret.
// Netlify détecte Next.js automatiquement (runtime OpenNext) : pas de config serveur à ajouter.
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
