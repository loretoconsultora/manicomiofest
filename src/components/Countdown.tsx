"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    días: Math.floor(ms / 86_400_000),
    horas: Math.floor(ms / 3_600_000) % 24,
    min: Math.floor(ms / 60_000) % 60,
    seg: Math.floor(ms / 1000) % 60,
  };
}

export default function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [left, setLeft] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    const tick = () => setLeft(diff(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex justify-center gap-3 sm:gap-5" aria-label="Cuenta regresiva">
      {Object.entries(left ?? { días: 0, horas: 0, min: 0, seg: 0 }).map(([label, value]) => (
        <div
          key={label}
          className="w-16 rounded-md border border-wine/70 bg-black/60 py-2 backdrop-blur sm:w-20"
        >
          <div className="font-display text-3xl font-semibold tabular-nums text-white sm:text-4xl">
            {left ? String(value).padStart(2, "0") : "--"}
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted">{label}</div>
        </div>
      ))}
    </div>
  );
}
