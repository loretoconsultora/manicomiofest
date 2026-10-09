import Image from "next/image";
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

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-3 font-display text-4xl font-bold uppercase text-white tracking-tight sm:text-6xl">{children}</h2>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover opacity-70"
        />
        <div className="fog" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,2,2,0.2)_20%,#050202_80%)]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />

        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
          <span className="mb-8 rounded-full border border-blood-bright/70 bg-black/40 px-4 py-1 text-xs font-bold uppercase tracking-[0.3em] text-blood-bright backdrop-blur">
            Adults only · +18
          </span>
          <Image
            src="/logo-m-producciones.webp"
            alt="M Producciones presenta"
            width={683}
            height={124}
            priority
            className="h-auto w-56 sm:w-72"
          />
          <h1 className="mt-6 w-full">
            <span className="sr-only">{EVENT.name}</span>
            <Image
              src="/logo-manicomio.webp"
              alt=""
              width={942}
              height={533}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="flicker mx-auto h-auto w-full max-w-3xl"
            />
          </h1>
          <p className="mt-2 font-display text-base uppercase tracking-[0.3em] text-white sm:text-xl sm:tracking-[0.5em]">
            Halloween · {EVENT.city}
          </p>
          <div className="mt-5 flex flex-col items-center gap-1 font-display text-base uppercase tracking-[0.15em] text-muted sm:flex-row sm:gap-4 sm:text-lg">
            <span className="text-white">28 Oct 2026</span>
            <span className="hidden text-blood-bright sm:inline">✦</span>
            <span>{EVENT.timeLabel}</span>
            <span className="hidden text-blood-bright sm:inline">✦</span>
            <span>{EVENT.venue}</span>
          </div>
          <div className="mt-8">
            <Countdown to={EVENT.startsAt} />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#registro"
              className="rounded-md bg-blood-bright px-8 py-4 font-display text-lg font-semibold uppercase tracking-wider text-white shadow-[0_0_40px_rgba(228,75,59,0.45)] transition hover:bg-blood"
            >
              Registrarme · {mxn(EVENT.price)}
            </a>
            <a
              href="#evento"
              className="rounded-md border border-white/25 bg-black/30 px-8 py-4 font-display text-lg uppercase tracking-wider backdrop-blur transition hover:border-white/60"
            >
              Ver detalles
            </a>
          </div>
        </div>
      </section>

      {/* DETALLES */}
      <section id="evento" className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <figure className="relative">
            <div aria-hidden className="absolute -inset-4 rounded-2xl bg-wine/30 blur-2xl" />
            <Image
              src="/poster.webp"
              alt="Póster oficial de Manicomio Madness Night"
              width={1080}
              height={1080}
              sizes="(max-width: 768px) 100vw, 520px"
              className="relative rounded-lg border border-white/10 shadow-2xl"
            />
          </figure>
          <div>
            <Eyebrow>La noche</Eyebrow>
            <Heading>Bienvenido al manicomio</Heading>
            <p className="mt-4 text-muted">
              Una noche de Halloween exclusiva en el corazón del Querétaro moderno. Cupo limitado.
            </p>
            <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {[
                { k: "Fecha", v: EVENT.dateLabel, s: "2026" },
                { k: "Horario", v: EVENT.timeLabel, s: "Noche de Halloween" },
                { k: "Lugar", v: EVENT.venue, s: `${EVENT.address}, ${EVENT.city}` },
              ].map((d) => (
                <div key={d.k} className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="text-xs uppercase tracking-[0.3em] text-blood-bright">{d.k}</dt>
                  <dd className="text-right">
                    <span className="block font-display text-2xl font-semibold uppercase sm:text-3xl">{d.v}</span>
                    <span className="text-sm text-muted">{d.s}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm uppercase tracking-[0.2em] text-muted underline decoration-blood-bright underline-offset-8 hover:text-white"
            >
              Cómo llegar →
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section className="relative border-y border-wine-deep bg-[linear-gradient(180deg,var(--abyss),var(--ember)_50%,var(--abyss))] px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>Lo que te espera</Eyebrow>
            <Heading>Pierde la cordura</Heading>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-lg border border-wine/60 bg-black/50 p-8 transition hover:border-blood-bright hover:shadow-[0_0_30px_rgba(228,75,59,0.2)]"
              >
                <div className="text-4xl" aria-hidden>
                  {h.icon}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold uppercase">{h.title}</h3>
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
          <Heading>Firma tu ingreso</Heading>
          <p className="mt-4 text-muted">
            Regístrate aquí y termina tu compra por WhatsApp. Te confirmamos tu pago y tu lugar en la lista.
          </p>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display text-7xl font-bold text-blood-bright">{mxn(EVENT.price)}</span>
            <span className="text-muted">por persona</span>
          </div>
          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li>✦ Evento exclusivo para mayores de 18 años</li>
            <li>✦ Cupo limitado</li>
            <li>✦ Accesos por WhatsApp: {EVENT.whatsappLabel}</li>
          </ul>
        </div>
        <div className="rounded-xl border border-wine/60 bg-abyss/80 p-6 shadow-[0_0_60px_rgba(122,37,27,0.25)] sm:p-8">
          <RegistroForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-wine-deep bg-abyss px-4 pb-28 pt-16 text-center sm:pb-16">
        <Image
          src="/logo-m-producciones.webp"
          alt="M Producciones presenta"
          width={683}
          height={124}
          className="mx-auto h-auto w-48"
        />
        <Image
          src="/logo-manicomio.webp"
          alt={EVENT.name}
          width={942}
          height={533}
          className="mx-auto mt-4 h-auto w-64"
        />
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
        className="fixed inset-x-4 bottom-4 z-50 rounded-md bg-blood-bright py-4 text-center font-display text-lg font-semibold uppercase tracking-wider text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)] sm:hidden"
      >
        Registrarme · {mxn(EVENT.price)}
      </a>
    </main>
  );
}
