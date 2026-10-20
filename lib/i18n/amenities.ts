import type { AmenityKey, Localized } from "../types";

export const AMENITY_LABELS: Record<AmenityKey, Localized> = {
  pool: { es: "Piscina", en: "Swimming pool" },
  oceanView: { es: "Vista al mar", en: "Ocean view" },
  mountainView: { es: "Vista a las montañas", en: "Mountain view" },
  ac: { es: "Aire acondicionado", en: "Air conditioning" },
  solar: { es: "Paneles solares", en: "Solar panels" },
  garden: { es: "Jardín tropical", en: "Tropical garden" },
  security: { es: "Seguridad 24 h", en: "24h security" },
  wifi: { es: "Internet de fibra", en: "Fibre internet" },
  bbq: { es: "Zona de barbacoa", en: "BBQ area" },
  gym: { es: "Gimnasio", en: "Gym" },
  jacuzzi: { es: "Jacuzzi", en: "Hot tub" },
  garage: { es: "Garaje", en: "Garage" },
  furnished: { es: "Amueblada", en: "Furnished" },
  terrace: { es: "Terraza amplia", en: "Large terrace" },
  beachAccess: { es: "Acceso a la playa", en: "Beach access" },
  gatedCommunity: { es: "Condominio cerrado", en: "Gated community" },
  outdoorKitchen: { es: "Cocina exterior", en: "Outdoor kitchen" },
  yoga: { es: "Espacio de yoga", en: "Yoga space" },
  smartHome: { es: "Domótica", en: "Smart home" },
  guestHouse: { es: "Casa de huéspedes", en: "Guest house" },
  petFriendly: { es: "Admite mascotas", en: "Pet friendly" },
  rainforest: { es: "Entorno de selva", en: "Rainforest setting" },
};

export const ALL_AMENITIES = Object.keys(AMENITY_LABELS) as AmenityKey[];
