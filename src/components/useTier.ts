"use client";

import { useSyncExternalStore } from "react";
import { TIERS, tierAt, type Tier } from "@/lib/event";

// La página es estática: la etapa vigente se calcula en el navegador
// para que el precio cambie solo al pasar cada fecha de corte.
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};

export function useTier(): Tier {
  const id = useSyncExternalStore(
    subscribe,
    () => tierAt(Date.now()).id,
    () => TIERS[0].id,
  );
  return TIERS.find((t) => t.id === id)!;
}
