export type Lang = "es" | "en";
export type Localized = { es: string; en: string };

export type PropertyType =
  | "luxuryVilla"
  | "familyHome"
  | "contemporary"
  | "vacationHome"
  | "beachNear"
  | "natureHome";

export type PropertyStatus = "draft" | "published" | "unavailable";

export type SceneKind = "beach" | "ocean" | "jungle" | "mountain" | "volcano" | "city";

export type AmenityKey =
  | "pool" | "oceanView" | "mountainView" | "ac" | "solar" | "garden" | "security"
  | "wifi" | "bbq" | "gym" | "jacuzzi" | "garage" | "furnished" | "terrace"
  | "beachAccess" | "gatedCommunity" | "outdoorKitchen" | "yoga" | "smartHome"
  | "guestHouse" | "petFriendly" | "rainforest";

/** Une photo : soit une image réelle (src), soit une illustration de démonstration (variant). */
export interface Photo {
  id: string;
  variant: number; // 0..3 : variante de l'illustration de secours
  src?: string; // URL de photo réelle (optionnel, remplaçable)
  alt?: Localized;
}

export interface Property {
  id: string;
  title: Localized;
  cityId: string;
  price: number; // USD
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  livingArea: number; // m²
  lotArea?: number; // m²
  description: Localized;
  amenities: AmenityKey[];
  scene: SceneKind;
  photos: Photo[];
  status: PropertyStatus;
  featured: boolean;
  isDemo: true;
}

export interface Destination {
  id: string;
  name: string;
  province: Province;
  scene: SceneKind;
  blurb: Localized;
  lat: number;
  lng: number;
}

export type Province = "Guanacaste" | "Puntarenas" | "San José" | "Alajuela" | "Limón";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  propertyId?: string;
  date: string; // ISO
  state: "new" | "read" | "replied";
  simulated: boolean;
}

export interface SiteSettings {
  brandName: string;
  ownerName: string;
  email: string;
  phone: string;
  whatsapp: string; // numéro international sans +, vide tant que non fourni
  address: string;
  defaultCurrency: "USD" | "CRC";
  crcRate: number; // taux de référence MODIFIABLE (démo), pas une conversion en temps réel
}
