import type { Inquiry } from "@/lib/types";

/** Demandes d'exemple (fictives) pour la maquette du back-office. */
export const INITIAL_INQUIRIES: Inquiry[] = [
  { id: "q1", name: "Persona de ejemplo A", email: "a@ejemplo.invalid", subject: "Información sobre Villa Horizonte", message: "Hola, me gustaría conocer más detalles y posibles fechas para una visita.", propertyId: "CR-001", date: "2026-10-18T09:12:00Z", state: "new", simulated: true },
  { id: "q2", name: "Example Person B", email: "b@example.invalid", phone: "+1 555 0100", subject: "Question about Jungle & Sun Nosara", message: "Is the property suitable as a vacation rental? Thank you.", propertyId: "CR-005", date: "2026-10-17T15:40:00Z", state: "read", simulated: true },
  { id: "q3", name: "Persona de ejemplo C", email: "c@ejemplo.invalid", subject: "Consulta general", message: "Busco una casa familiar cerca de San José con jardín.", date: "2026-10-15T11:05:00Z", state: "replied", simulated: true },
];
