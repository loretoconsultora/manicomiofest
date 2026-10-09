export const EVENT = {
  name: "Manicomio Madness Night",
  presenter: "M Producciones",
  dateLabel: "Miércoles 28 de octubre",
  timeLabel: "8:00 PM – 2:00 AM",
  // Querétaro (UTC-6, sin horario de verano)
  startsAt: "2026-10-28T20:00:00-06:00",
  venue: "Black Lounge",
  address: "Plaza Campa, Planta Alta",
  city: "Querétaro",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Black+Lounge+Plaza+Campa+Quer%C3%A9taro",
  lineupReveal: "19 de octubre",
  whatsapp: "524422007615",
  whatsappLabel: "+52 442 200 7615",
  instagramUrl: "https://www.instagram.com/mproduccionesyeventos/",
  instagramUser: "@mproduccionesyeventos",
};

export const WHATSAPP_MESSAGE =
  "Hola, quiero reservar mi acceso para Manicomio Madness Night este 28 de octubre.";

export const WHATSAPP_MESA =
  "Hola, quiero reservar una mesa VIP para Manicomio Madness Night este 28 de octubre (8-10 personas con botella + accesos incluidos).";

export type Tier = { id: string; label: string; short: string; price: number; when: string; endsAt: string };

// Cortes en hora de Querétaro (UTC-6)
export const TIERS: Tier[] = [
  { id: "fase1", label: "Preventa Fase 1", short: "Fase 1", price: 350, when: "9 al 16 de octubre", endsAt: "2026-10-17T00:00:00-06:00" },
  { id: "fase2", label: "Preventa Fase 2", short: "Fase 2", price: 400, when: "17 al 23 de octubre", endsAt: "2026-10-24T00:00:00-06:00" },
  { id: "fase3", label: "Preventa Fase 3", short: "Fase 3", price: 450, when: "24 al 28 de octubre", endsAt: "2026-10-28T20:00:00-06:00" },
];

export function tierAt(now: number): Tier {
  return TIERS.find((t) => now < new Date(t.endsAt).getTime()) ?? TIERS[TIERS.length - 1];
}

export function whatsappLink(message: string) {
  return `https://wa.me/${EVENT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
