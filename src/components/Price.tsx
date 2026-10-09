"use client";

import { TIERS, mxn } from "@/lib/event";
import { useTier } from "./useTier";

/** Precio vigente según la etapa de venta. */
export function CurrentPrice() {
  return <>{mxn(useTier().price)}</>;
}

/** Las tres etapas: la vigente resaltada y las pasadas tachadas. */
export function PriceTiers() {
  const current = useTier();
  const currentIndex = TIERS.indexOf(current);
  return (
    <div className="grid grid-cols-3 gap-2">
      {TIERS.map((t, i) => {
        const active = i === currentIndex;
        const past = i < currentIndex;
        return (
          <div
            key={t.id}
            className={`rounded-lg border p-3 text-center ${
              active ? "border-blood-bright bg-blood-bright/10 shadow-[0_0_30px_rgba(228,75,59,0.25)]" : "border-wine/50"
            } ${past ? "opacity-40" : ""}`}
          >
            <p className={`text-[10px] uppercase tracking-[0.2em] ${active ? "text-blood-bright" : "text-muted"}`}>
              {active ? `${t.label} · Vigente` : t.label}
            </p>
            <p className={`mt-1 font-display text-3xl font-bold sm:text-4xl ${past ? "line-through" : "text-white"}`}>
              {mxn(t.price)}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-muted">{t.when}</p>
          </div>
        );
      })}
    </div>
  );
}
