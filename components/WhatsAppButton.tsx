"use client";

import { MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { whatsappLink } from "@/lib/utils";

/** Bouton WhatsApp configurable (Admin > Ajustes). Sans numéro : affiché désactivé, en mode démo. */
export default function WhatsAppButton({ text, className = "btn-outline w-full" }: { text: string; className?: string }) {
  const { t, settings } = useStore();
  const href = whatsappLink(settings.whatsapp, text);
  if (!href)
    return <button type="button" disabled className={className} title={t.contact.placeholderNote}><MessageCircle className="h-4 w-4" aria-hidden="true" />{t.detail.whatsappDemo}</button>;
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}><MessageCircle className="h-4 w-4" aria-hidden="true" />{t.detail.whatsapp}</a>;
}
