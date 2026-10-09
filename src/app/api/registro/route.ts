import { tierAt } from "@/lib/event";

const clean = (v: unknown, max = 120) => String(v ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Campo trampa: los humanos no lo ven, los bots lo llenan.
  if (clean(body.empresa)) return Response.json({ ok: true, folio: null });

  const nombre = clean(body.nombre);
  const telefono = clean(body.telefono, 30);
  const correo = clean(body.correo);
  const personas = Math.round(Number(body.personas));
  if (!nombre || !telefono || !/^\S+@\S+\.\S+$/.test(correo) || !(personas >= 1 && personas <= 20)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_SECRET;
  if (!url || !secret) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  // El precio se calcula aquí, no se confía en el navegador.
  const tier = tierAt(Date.now());
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        nombre,
        telefono,
        correo,
        personas,
        etapa: tier.label,
        precio: tier.price,
        total: tier.price * personas,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error ?? "sheets_error");
    return Response.json({ ok: true, folio: data.folio as string });
  } catch (err) {
    console.error("Registro no guardado en Sheets:", err);
    return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
