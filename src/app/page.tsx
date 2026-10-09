import Countdown from "@/components/Countdown";
import RegistroForm from "@/components/RegistroForm";
import { EVENT, mxn, whatsappLink } from "@/lib/event";

const quickBuy = whatsappLink(`Hola, quiero información para comprar accesos para ${EVENT.name} 🎃`);

const highlights = [
  {
    title: "DJ's invitados",
    text: "Música toda la noche, de las 8 PM a las 2 AM.",
    icon: "🎧",
  },
  {
    title: "Concurso de disfraces",
    text: "Ven con tu mejor disfraz y compite por los premios de la noche.",
    icon: "🎭",
  },
  {
    title: "Premios",
    text: "Los mejores disfraces se llevan premio. Prepárate.",
    icon: "🏆",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blood-bright">{children}</p>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 py-24 text-center">
        <div className="fog" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#060606_85%)]"
        />
        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-8 rounded-full border border-blood-bright/60 px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-blood-bright">
            Adults only · +18
          </span>
          <p className="text-sm uppercase tracking-[0.5em] text-muted">{EVENT.presenter} presenta</p>
          <h1 className="flicker mt-4 font-display text-6xl leading-[0.9] sm:text-8xl md:text-9xl">
            Manicomio
            <span className="block text-blood-bright">Madness Night</span>
          </h1>
          <p className="mt-6 text-lg tracking-wide text-foreground/90 sm:text-xl">
            Halloween VIP · {EVENT.city}
          </p>
          <div className="mt-6 flex flex-col items-center gap-1 text-sm uppercase tracking-[0.2em] text-muted sm:flex-row sm:gap-4">
            <span>{EVENT.dateLabel}</span>
            <span className="hidden text-blood-bright sm:inline">✦</span>
            <span>{EVENT.timeLabel}</span>
            <span className="hidden text-blood-bright sm:inline">✦</span>
            <span>{EVENT.venue}</span>
          </div>
          <div className="mt-10">
            <Countdown to={EVENT.startsAt} />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#registro"
              className="rounded-md bg-blood px-8 py-4 font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(227,36,43,0.4)] transition hover:bg-blood-bright"
            >
              Registrarme · {mxn(EVENT.price)}
            </a>
            <a
              href="#evento"
              className="rounded-md border border-white/20 px-8 py-4 font-semibold uppercase tracking-wider transition hover:border-white/50"
            >
              Ver detalles
            </a>
          </div>
        </div>
      </section>

      {/* DETALLES */}
      <section id="evento" className="mx-auto max-w-5xl px-4 py-24">
        <div className="text-center">
          <Eyebrow>La noche</Eyebrow>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl">Bienvenido al manicomio</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Una noche de Halloween exclusiva en el corazón del Querétaro moderno. Cupo limitado.
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
          {[
            { k: "Fecha", v: EVENT.dateLabel, s: "2026" },
            { k: "Horario", v: EVENT.timeLabel, s: "Llega temprano" },
            { k: "Lugar", v: EVENT.venue, s: `${EVENT.address}, ${EVENT.city}` },
          ].map((d) => (
            <div key={d.k} className="bg-background p-8 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-blood-bright">{d.k}</p>
              <p className="mt-3 font-display text-3xl">{d.v}</p>
              <p className="mt-1 text-sm text-muted">{d.s}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-[0.2em] text-muted underline decoration-blood-bright underline-offset-8 hover:text-foreground"
          >
            Cómo llegar →
          </a>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section className="relative border-y border-white/10 bg-[linear-gradient(180deg,#0b0505,#060606)] px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>Lo que te espera</Eyebrow>
            <h2 className="mt-3 font-display text-5xl sm:text-6xl">Pierde la cordura</h2>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-lg border border-white/10 bg-black/40 p-8 transition hover:border-blood-bright/60"
              >
                <div className="text-4xl" aria-hidden>
                  {h.icon}
                </div>
                <h3 className="mt-4 font-display text-3xl">{h.title}</h3>
                <p className="mt-2 text-muted">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGISTRO */}
      <section id="registro" className="mx-auto grid max-w-5xl gap-12 px-4 py-24 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow>Accesos</Eyebrow>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl">Firma tu ingreso</h2>
          <p className="mt-4 text-muted">
            Regístrate aquí y termina tu compra por WhatsApp. Te confirmamos tu pago y tu lugar en la lista.
          </p>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display text-7xl text-blood-bright">{mxn(EVENT.price)}</span>
            <span className="text-muted">por persona</span>
          </div>
          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li>✦ Evento exclusivo para mayores de 18 años</li>
            <li>✦ Cupo limitado</li>
            <li>✦ Venta por WhatsApp: {EVENT.whatsappLabel}</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <RegistroForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-4 pb-28 pt-16 text-center sm:pb-16">
        <p className="text-xs uppercase tracking-[0.5em] text-muted">{EVENT.presenter} presenta</p>
        <p className="mt-3 font-display text-4xl">{EVENT.name}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm sm:flex-row sm:gap-8">
          <a href={EVENT.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blood-bright">
            Instagram {EVENT.instagramUser}
          </a>
          <a href={quickBuy} target="_blank" rel="noopener noreferrer" className="hover:text-blood-bright">
            WhatsApp {EVENT.whatsappLabel}
          </a>
        </div>
        <p className="mt-10 text-xs text-muted/70">
          Solo adultos +18 · {EVENT.venue}, {EVENT.address}, {EVENT.city}
        </p>
      </footer>

      {/* CTA fija en móvil */}
      <a
        href="#registro"
        className="fixed inset-x-4 bottom-4 z-50 rounded-md bg-blood py-4 text-center font-bold uppercase tracking-wider text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)] sm:hidden"
      >
        Registrarme · {mxn(EVENT.price)}
      </a>
    </main>
  );
}
