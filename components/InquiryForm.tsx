"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { useStore } from "@/lib/store";
import { isEmail, isPhone } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "phone" | "subject" | "message", string>>;

/** Formulaire 100 % frontend : valide, puis affiche une confirmation SIMULÉE (aucun envoi réel). */
export default function InquiryForm({ propertyId, defaultSubject = "", idPrefix = "f" }: { propertyId?: string; defaultSubject?: string; idPrefix?: string }) {
  const { t, addInquiry } = useStore();
  const [v, setV] = useState({ name: "", email: "", phone: "", subject: defaultSubject, message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));
  const E = t.forms.errors;

  const validate = (): Errors => {
    const er: Errors = {};
    if (!v.name.trim()) er.name = E.required;
    if (!v.email.trim()) er.email = E.required; else if (!isEmail(v.email.trim())) er.email = E.email;
    if (v.phone.trim() && !isPhone(v.phone.trim())) er.phone = E.phone;
    if (!v.subject.trim()) er.subject = E.required;
    if (!v.message.trim()) er.message = E.required; else if (v.message.trim().length < 10) er.message = E.messageMin;
    return er;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      const first = Object.keys(er)[0];
      document.getElementById(`${idPrefix}-${first}`)?.focus();
      return;
    }
    addInquiry({ name: v.name.trim(), email: v.email.trim(), phone: v.phone.trim() || undefined, subject: v.subject.trim(), message: v.message.trim(), propertyId });
    setDone(true);
  };

  const field = ({ k, label, type = "text", optional = false, area = false }: { k: keyof Errors; label: string; type?: string; optional?: boolean; area?: boolean }) => {
    const id = `${idPrefix}-${k}`;
    const err = errors[k];
    const common = { id, value: v[k], onChange: set(k), "aria-invalid": !!err, "aria-describedby": err ? `${id}-err` : undefined, className: `field ${area ? "py-3" : ""} ${err ? "!border-red-600" : ""}` };
    return (
      <div>
        <label className="label" htmlFor={id}>{label}{optional && <span className="ml-1 font-normal normal-case tracking-normal">({t.forms.optional})</span>}</label>
        {area ? <textarea rows={5} {...common} /> : <input type={type} autoComplete={k === "name" ? "name" : k === "email" ? "email" : k === "phone" ? "tel" : "off"} {...common} />}
        <AnimatePresence>
          {err && <motion.p id={`${id}-err`} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-700"><TriangleAlert className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />{err}</motion.p>}
        </AnimatePresence>
      </div>
    );
  };

  if (done)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} role="status" className="rounded-2xl border border-gold/50 bg-sand-light p-6 text-center">
        <CheckCircle2 className="mx-auto h-9 w-9 text-forest" aria-hidden="true" />
        <h3 className="mt-3 font-serif text-2xl">{t.forms.success.title}</h3>
        <p className="mt-2 text-sm text-ink-soft">{t.forms.success.text}</p>
        <button type="button" className="btn-outline mt-5" onClick={() => { setDone(false); setV({ name: "", email: "", phone: "", subject: defaultSubject, message: "" }); }}>{t.forms.success.again}</button>
      </motion.div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      {Object.keys(errors).length > 0 && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800">{E.summary}</p>}
      {field({ k: "name", label: t.forms.name })}
      {field({ k: "email", label: t.forms.email, type: "email" })}
      {field({ k: "phone", label: t.forms.phone, type: "tel", optional: true })}
      {field({ k: "subject", label: t.forms.subject })}
      {field({ k: "message", label: t.forms.message, area: true })}
      <button type="submit" className="btn-primary w-full">{t.forms.send}</button>
    </form>
  );
}
