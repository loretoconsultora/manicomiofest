"use client";

import { useState } from "react";
import { WHATSAPP_MESSAGE, mxn, whatsappLink } from "@/lib/event";
import { useTier } from "./useTier";

const input =
  "w-full rounded-md border border-white/15 bg-black/60 px-4 py-3 text-foreground placeholder:text-muted/70 outline-none transition focus:border-blood-bright focus:ring-1 focus:ring-blood-bright";

export default function RegistroForm() {
  const [personas, setPersonas] = useState(1);
  const tier = useTier();

  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    const f = new FormData(e.currentTarget);
    const datos = {
      nombre: String(f.get("nombre")),
      telefono: String(f.get("telefono")),
      correo: String(f.get("correo")),
      personas,
      empresa: String(f.get("empresa") ?? ""),
    };

    // Guardamos el registro en Google Sheets; si falla, igual seguimos a WhatsApp
    // para no perder la venta.
    let folio: string | null = null;
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
        signal: AbortSignal.timeout(12_000),
      });
      folio = (await res.json()).folio ?? null;
    } catch {}

    const msg = [
      WHATSAPP_MESSAGE,
      "",
      ...(folio ? [`Folio: ${folio}`] : []),
      `Nombre: ${datos.nombre}`,
      `Teléfono: ${datos.telefono}`,
      `Correo: ${datos.correo}`,
      `Personas: ${personas}`,
      `Precio: ${tier.label} ${mxn(tier.price)} por persona`,
      `Total: ${mxn(personas * tier.price)}`,
      "Pago: transferencia",
      "",
      "Confirmo que todos los asistentes son mayores de 18 años.",
    ].join("\n");
    // Misma pestaña: abrir una nueva después de esperar la respuesta lo bloquean los navegadores.
    window.location.href = whatsappLink(msg);
    setTimeout(() => setSending(false), 3000);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      {/* Campo trampa anti-bots: oculto para personas */}
      <input type="text" name="empresa" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm text-muted">
          Nombre completo
        </label>
        <input id="nombre" name="nombre" required autoComplete="name" className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="telefono" className="mb-1 block text-sm text-muted">
            WhatsApp
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            placeholder="442 000 0000"
            className={input}
          />
        </div>
        <div>
          <label htmlFor="correo" className="mb-1 block text-sm text-muted">
            Correo
          </label>
          <input id="correo" name="correo" type="email" required autoComplete="email" className={input} />
        </div>
      </div>
      <div>
        <span className="mb-1 block text-sm text-muted">Número de personas</span>
        <div className="flex items-center justify-between rounded-md border border-white/15 bg-black/60 px-2 py-2">
          <button
            type="button"
            onClick={() => setPersonas((p) => Math.max(1, p - 1))}
            className="h-10 w-10 rounded text-2xl hover:bg-white/10"
            aria-label="Menos personas"
          >
            −
          </button>
          <span className="text-xl font-semibold tabular-nums" aria-live="polite">
            {personas}
          </span>
          <button
            type="button"
            onClick={() => setPersonas((p) => Math.min(20, p + 1))}
            className="h-10 w-10 rounded text-2xl hover:bg-white/10"
            aria-label="Más personas"
          >
            +
          </button>
        </div>
      </div>
      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" required className="mt-1 h-4 w-4 accent-[var(--blood-bright)]" />
        Confirmo que todos los asistentes son mayores de 18 años.
      </label>
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-muted">Total</span>
        <span className="font-display text-4xl font-bold text-white">{mxn(personas * tier.price)}</span>
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-md bg-blood-bright disabled:cursor-wait disabled:opacity-70 px-6 py-4 font-display text-lg font-semibold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(228,75,59,0.35)] transition hover:bg-blood"
      >
        {sending ? "Guardando registro…" : "Apartar por WhatsApp"}
      </button>
      <p className="text-center text-xs text-muted">
        Guardamos tu registro y se abrirá WhatsApp con tus datos. Ahí te compartimos los datos de transferencia y, al confirmar tu pago, tu código QR.
      </p>
    </form>
  );
}
