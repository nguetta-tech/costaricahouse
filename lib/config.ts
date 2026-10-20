import type { SiteSettings } from "./types";

/**
 * Configuration centralisée du site.
 * Le nom de marque est PROVISOIRE (disponibilité du nom et du domaine non vérifiée).
 * Les coordonnées ci-dessous sont des emplacements : remplacez-les par celles du propriétaire.
 */
export const DEFAULT_SETTINGS: SiteSettings = {
  brandName: "micasa",
  ownerName: "[Nom du propriétaire]",
  email: "contacto@ejemplo.invalid",
  phone: "",
  whatsapp: "", // ex. "50688888888" (indicatif pays + numéro, sans +). Vide = bouton en mode démo.
  address: "Costa Rica",
  defaultCurrency: "USD",
  crcRate: 500, // taux de référence éditable, NON temps réel
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PRICE_STEPS = [100000, 250000, 500000, 750000, 1000000, 1500000, 2500000, 5000000];
