import type { AmenityKey, Photo, Property, SceneKind } from "@/lib/types";

/**
 * DONNÉES FICTIVES DE DÉMONSTRATION.
 * Ce module sera remplacé par un appel à l'API/base de données lors de la phase 2.
 * Pour utiliser de vraies photos : ajoutez `src: "https://…"` dans `photos` (l'illustration sert de secours).
 */
const illustrations = (id: string, n = 4): Photo[] =>
  Array.from({ length: n }, (_, i) => ({ id: `${id}-${i}`, variant: i }));

/** Vraies photos fournies par le client (dossier public/photos). Sans entrée : illustrations de démonstration. */
const REAL_PHOTOS: Record<string, string[]> = {
  "CR-001": ["CR-001-1.jpg", "CR-001-2.jpg"],
  "CR-002": ["CR-002-1.jpg"],
  "CR-003": ["CR-003-1.jpg", "CR-003-2.jpg"],
  "CR-004": ["CR-004-1.jpg"],
  "CR-005": ["CR-005-1.jpg"],
  "CR-006": ["CR-006-1.jpg"],
  "CR-007": ["CR-007-1.jpg"],
  "CR-008": ["CR-008-1.jpg"],
  "CR-009": ["CR-009-1.jpg"],
  "CR-010": ["CR-010-1.jpg", "CR-010-2.jpg"],
  "CR-011": ["CR-011-1.jpg"],
  "CR-012": ["CR-012-1.jpg"],
  "CR-013": ["CR-013-1.jpg"],
  "CR-014": ["CR-014-1.jpg"],
  "CR-015": ["CR-015-1.jpg"],
  "CR-016": ["CR-016-1.jpg"],
};

const photos = (id: string): Photo[] =>
  REAL_PHOTOS[id]?.length
    ? REAL_PHOTOS[id].map((f, i) => ({ id: `${id}-${i}`, variant: i, src: `/photos/${f}` }))
    : illustrations(id);

interface Seed {
  id: string; es: string; en: string; cityId: string; price: number;
  type: Property["type"]; bd: number; ba: number; living: number; lot?: number;
  scene: SceneKind; amen: AmenityKey[]; descEs: string; descEn: string; featured?: boolean;
  status?: Property["status"];
}

const seeds: Seed[] = [
  { id: "CR-001", es: "Villa Horizonte Tamarindo", en: "Horizon Villa Tamarindo", cityId: "tamarindo", price: 1250000, type: "luxuryVilla", bd: 5, ba: 5, living: 420, lot: 1800, scene: "ocean", featured: true,
    amen: ["pool", "oceanView", "ac", "solar", "outdoorKitchen", "security", "terrace"],
    descEs: "Villa contemporánea sobre una colina con vistas abiertas al Pacífico. Salón de doble altura abierto a una terraza con piscina infinita, cinco suites y cocina exterior para recibir a la familia.",
    descEn: "Contemporary hilltop villa with open Pacific views. A double-height living room opens onto a terrace with an infinity pool, five suites and an outdoor kitchen for hosting family." },
  { id: "CR-002", es: "Casa Brisa Marina", en: "Sea Breeze House", cityId: "tamarindo", price: 585000, type: "beachNear", bd: 3, ba: 2, living: 190, lot: 450, scene: "beach",
    amen: ["ac", "garden", "wifi", "furnished", "beachAccess", "petFriendly"],
    descEs: "Casa luminosa a cinco minutos a pie de la playa, con jardín tropical y plantas abiertas. Entrega amueblada, pensada como segunda residencia.",
    descEn: "Bright home a five-minute walk from the beach, with a tropical garden and open-plan living. Sold furnished, designed as a second residence." },
  { id: "CR-003", es: "Mirador de Flamingo", en: "Flamingo Lookout", cityId: "flamingo", price: 2100000, type: "luxuryVilla", bd: 6, ba: 7, living: 610, lot: 3200, scene: "ocean", featured: true,
    amen: ["pool", "oceanView", "jacuzzi", "gym", "smartHome", "guestHouse", "security", "ac"],
    descEs: "Residencia de líneas puras sobre la bahía de Flamingo. Seis suites, gimnasio, casa de huéspedes independiente y una terraza continua frente al océano.",
    descEn: "Clean-lined residence above Flamingo bay. Six suites, a gym, a separate guest house and a continuous terrace facing the ocean." },
  { id: "CR-004", es: "Casita Coco Azul", en: "Blue Coco Cottage", cityId: "coco", price: 340000, type: "vacationHome", bd: 2, ba: 2, living: 120, lot: 300, scene: "beach",
    amen: ["pool", "ac", "wifi", "furnished", "bbq"],
    descEs: "Casa de vacaciones con piscina privada, a pocos minutos de la playa y del pueblo. Ideal para escapadas de fin de semana.",
    descEn: "Vacation home with a private pool, minutes from the beach and the village. Ideal for weekend getaways." },
  { id: "CR-005", es: "Selva y Sol Nosara", en: "Jungle & Sun Nosara", cityId: "nosara", price: 795000, type: "natureHome", bd: 4, ba: 3, living: 260, lot: 2400, scene: "jungle", featured: true,
    amen: ["pool", "yoga", "rainforest", "solar", "garden", "wifi", "terrace"],
    descEs: "Casa de madera y vidrio rodeada de selva, con espacio de yoga cubierto y piscina entre los árboles. Energía solar y gran privacidad.",
    descEn: "Timber-and-glass home surrounded by jungle, with a covered yoga space and a pool among the trees. Solar power and great privacy." },
  { id: "CR-006", es: "Palmas de Santa Teresa", en: "Santa Teresa Palms", cityId: "santa-teresa", price: 640000, type: "contemporary", bd: 3, ba: 3, living: 210, lot: 900, scene: "jungle",
    amen: ["pool", "ac", "garden", "wifi", "outdoorKitchen", "beachAccess"],
    descEs: "Casa contemporánea de hormigón y madera a pocos pasos de las olas. Cocina exterior, piscina pequeña y jardín de palmeras.",
    descEn: "Contemporary concrete-and-timber house a short walk from the waves. Outdoor kitchen, small pool and a palm garden." },
  { id: "CR-007", es: "Casa Jacó Familiar", en: "Jacó Family Home", cityId: "jaco", price: 420000, type: "familyHome", bd: 4, ba: 3, living: 230, lot: 520, scene: "beach",
    amen: ["ac", "garage", "garden", "gatedCommunity", "security", "bbq", "petFriendly"],
    descEs: "Vivienda familiar en condominio cerrado, con garaje doble, jardín y zona de barbacoa. A diez minutos de la playa.",
    descEn: "Family home in a gated community with a double garage, garden and BBQ area. Ten minutes from the beach." },
  { id: "CR-008", es: "Villa Cascada Manuel Antonio", en: "Waterfall Villa Manuel Antonio", cityId: "manuel-antonio", price: 1480000, type: "luxuryVilla", bd: 4, ba: 5, living: 380, lot: 2100, scene: "ocean", featured: true,
    amen: ["pool", "oceanView", "jacuzzi", "rainforest", "ac", "terrace", "security"],
    descEs: "Villa suspendida entre selva y mar, con piscina de borde infinito, jacuzzi y vistas a las islas. Cuatro suites con terraza propia.",
    descEn: "Villa suspended between rainforest and sea, with an infinity-edge pool, hot tub and island views. Four suites, each with its own terrace." },
  { id: "CR-009", es: "Ballena Retreat Uvita", en: "Ballena Retreat Uvita", cityId: "uvita", price: 530000, type: "natureHome", bd: 3, ba: 2, living: 175, lot: 5000, scene: "jungle",
    amen: ["mountainView", "oceanView", "solar", "garden", "rainforest", "yoga"],
    descEs: "Refugio en la ladera con vistas al mar y a la selva. Energía solar, jardín de frutales y gran terreno.",
    descEn: "Hillside retreat with sea and jungle views. Solar power, fruit-tree garden and a generous plot." },
  { id: "CR-010", es: "Loft Urbano San José", en: "San José Urban Loft", cityId: "san-jose", price: 245000, type: "contemporary", bd: 2, ba: 2, living: 105, scene: "city",
    amen: ["ac", "wifi", "gym", "security", "garage", "smartHome"],
    descEs: "Residencia contemporánea en el corazón de la capital, con seguridad, gimnasio del edificio y estacionamiento.",
    descEn: "Contemporary residence in the heart of the capital, with security, a building gym and parking." },
  { id: "CR-011", es: "Residencia Escazú Alto", en: "Escazú Heights Residence", cityId: "escazu", price: 890000, type: "luxuryVilla", bd: 5, ba: 5, living: 450, lot: 1200, scene: "mountain", featured: true,
    amen: ["mountainView", "pool", "ac", "garage", "smartHome", "security", "gatedCommunity", "gym"],
    descEs: "Residencia de lujo en las colinas de Escazú, con vistas al valle, piscina climatizada y domótica en toda la casa.",
    descEn: "Luxury residence in the Escazú hills with valley views, a heated pool and home automation throughout." },
  { id: "CR-012", es: "Casa Santa Ana Jardín", en: "Santa Ana Garden House", cityId: "santa-ana", price: 465000, type: "familyHome", bd: 4, ba: 4, living: 280, lot: 700, scene: "mountain",
    amen: ["garden", "ac", "garage", "bbq", "gatedCommunity", "security", "petFriendly"],
    descEs: "Casa familiar con jardín amplio en una zona residencial tranquila. Cuatro habitaciones y espacios sociales abiertos.",
    descEn: "Family home with a large garden in a quiet residential area. Four bedrooms and open social spaces." },
  { id: "CR-013", es: "Hacienda Alajuela", en: "Alajuela Hacienda", cityId: "alajuela", price: 380000, type: "familyHome", bd: 3, ba: 3, living: 220, lot: 1500, scene: "mountain",
    amen: ["garden", "mountainView", "garage", "bbq", "wifi", "guestHouse"],
    descEs: "Casa de estilo hacienda con gran terreno y vistas a las montañas, a pocos minutos del aeropuerto.",
    descEn: "Hacienda-style home on a large plot with mountain views, minutes from the airport." },
  { id: "CR-014", es: "Casa Volcán Arenal", en: "Arenal Volcano House", cityId: "la-fortuna", price: 560000, type: "natureHome", bd: 3, ba: 3, living: 200, lot: 3000, scene: "volcano",
    amen: ["mountainView", "jacuzzi", "garden", "rainforest", "terrace", "wifi", "solar"],
    descEs: "Casa con vistas despejadas al volcán Arenal, jacuzzi exterior y jardines rodeados de naturaleza.",
    descEn: "Home with clear views of Arenal volcano, an outdoor hot tub and gardens surrounded by nature." },
  { id: "CR-015", es: "Casa Caribe Puerto Viejo", en: "Caribbean House Puerto Viejo", cityId: "puerto-viejo", price: 310000, type: "vacationHome", bd: 2, ba: 2, living: 130, lot: 800, scene: "jungle",
    amen: ["garden", "rainforest", "wifi", "furnished", "beachAccess", "terrace"],
    descEs: "Casa de vacaciones de estilo caribeño, entre la selva y la playa, con terraza cubierta y entrega amueblada.",
    descEn: "Caribbean-style vacation home between jungle and beach, with a covered terrace, sold furnished." },
  { id: "CR-016", es: "Villa Lomas de Escazú (borrador)", en: "Escazú Hills Villa (draft)", cityId: "escazu", price: 1150000, type: "contemporary", bd: 4, ba: 4, living: 360, lot: 1400, scene: "mountain", status: "draft",
    amen: ["pool", "mountainView", "smartHome", "ac", "garage"],
    descEs: "Ficha en preparación: villa contemporánea con piscina y vistas al valle.",
    descEn: "Listing in preparation: contemporary villa with pool and valley views." },
];

export const INITIAL_PROPERTIES: Property[] = seeds.map((s) => ({
  id: s.id,
  title: { es: s.es, en: s.en },
  cityId: s.cityId,
  price: s.price,
  type: s.type,
  bedrooms: s.bd,
  bathrooms: s.ba,
  livingArea: s.living,
  lotArea: s.lot,
  description: { es: s.descEs, en: s.descEn },
  amenities: s.amen,
  scene: s.scene,
  photos: photos(s.id),
  status: s.status ?? "published",
  featured: !!s.featured,
  isDemo: true,
}));

/** Identifiants statiques pour generateStaticParams (seules les fiches publiées sont pré-générées). */
export const PUBLIC_IDS = INITIAL_PROPERTIES.filter((p) => p.status === "published").map((p) => p.id);
