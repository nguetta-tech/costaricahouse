import type { Destination, Province } from "@/lib/types";

/** Destinos de recherche (zones). Ce ne sont pas des offres réelles. */
export const DESTINATIONS: Destination[] = [
  { id: "tamarindo", name: "Tamarindo", province: "Guanacaste", scene: "beach", lat: 10.299, lng: -85.841,
    blurb: { es: "Playa animada, surf y atardeceres, con servicios a pocos pasos.", en: "Lively beach town, surf and sunsets, with services close by." } },
  { id: "flamingo", name: "Playa Flamingo", province: "Guanacaste", scene: "ocean", lat: 10.435, lng: -85.791,
    blurb: { es: "Colinas sobre una bahía tranquila, ideales para vistas amplias.", en: "Hills above a calm bay, ideal for wide views." } },
  { id: "coco", name: "Playas del Coco", province: "Guanacaste", scene: "beach", lat: 10.55, lng: -85.697,
    blurb: { es: "Ambiente de pueblo costero, buceo y vida local.", en: "Coastal village feel, diving and local life." } },
  { id: "nosara", name: "Nosara", province: "Guanacaste", scene: "jungle", lat: 9.976, lng: -85.653,
    blurb: { es: "Selva, yoga y playas largas en un entorno de bienestar.", en: "Jungle, yoga and long beaches in a wellness setting." } },
  { id: "santa-teresa", name: "Santa Teresa", province: "Puntarenas", scene: "jungle", lat: 9.646, lng: -85.169,
    blurb: { es: "Estilo descalzo entre palmeras, olas y caminos de tierra.", en: "Barefoot style among palms, waves and dirt roads." } },
  { id: "jaco", name: "Jacó", province: "Puntarenas", scene: "beach", lat: 9.615, lng: -84.629,
    blurb: { es: "Playa del Pacífico central, cerca de San José.", en: "Central Pacific beach, close to San José." } },
  { id: "manuel-antonio", name: "Manuel Antonio", province: "Puntarenas", scene: "ocean", lat: 9.392, lng: -84.139,
    blurb: { es: "Selva sobre el mar, junto a un parque nacional.", en: "Rainforest above the sea, next to a national park." } },
  { id: "uvita", name: "Uvita", province: "Puntarenas", scene: "jungle", lat: 9.163, lng: -83.74,
    blurb: { es: "Costa Ballena: montañas verdes que caen al océano.", en: "Costa Ballena: green mountains dropping to the ocean." } },
  { id: "san-jose", name: "San José", province: "San José", scene: "city", lat: 9.928, lng: -84.091,
    blurb: { es: "La capital: cultura, servicios y clima templado.", en: "The capital: culture, services and a mild climate." } },
  { id: "escazu", name: "Escazú", province: "San José", scene: "mountain", lat: 9.919, lng: -84.139,
    blurb: { es: "Residencias en las colinas con vistas al valle.", en: "Residences in the hills with valley views." } },
  { id: "santa-ana", name: "Santa Ana", province: "San José", scene: "mountain", lat: 9.933, lng: -84.183,
    blurb: { es: "Zona residencial tranquila, con comercios y áreas verdes.", en: "Quiet residential area with shops and green spaces." } },
  { id: "alajuela", name: "Alajuela", province: "Alajuela", scene: "mountain", lat: 10.016, lng: -84.214,
    blurb: { es: "Valle Central, a un paso del aeropuerto internacional.", en: "Central Valley, minutes from the international airport." } },
  { id: "la-fortuna", name: "La Fortuna", province: "Alajuela", scene: "volcano", lat: 10.468, lng: -84.643,
    blurb: { es: "A los pies del volcán Arenal, entre termas y naturaleza.", en: "At the foot of Arenal volcano, among hot springs and nature." } },
  { id: "puerto-viejo", name: "Puerto Viejo de Talamanca", province: "Limón", scene: "jungle", lat: 9.655, lng: -82.754,
    blurb: { es: "Caribe sur: selva, arrecife y ritmo pausado.", en: "Southern Caribbean: jungle, reef and an unhurried pace." } },
];

export const PROVINCES: Province[] = ["Guanacaste", "Puntarenas", "San José", "Alajuela", "Limón"];

/** Photos des destinations (public/photos/<id>.jpg). Sans fichier : illustration de secours. */
export const destPhoto = (id: string) => `/photos/${id}.jpg`;

export const getDestination = (id: string) => DESTINATIONS.find((d) => d.id === id);
