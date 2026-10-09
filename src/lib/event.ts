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
  price: 400,
  whatsapp: "524422007615",
  whatsappLabel: "+52 442 200 7615",
  instagramUrl: "https://www.instagram.com/mproduccionesyeventos/",
  instagramUser: "@mproduccionesyeventos",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${EVENT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
