import Image from "next/image";
import ArtImage from "@/components/ArtImage";
import Countdown from "@/components/Countdown";
import HeroVideo from "@/components/HeroVideo";
import RegistroForm from "@/components/RegistroForm";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { EVENT, WHATSAPP_MESSAGE, mxn, whatsappLink } from "@/lib/event";

const quickBuy = whatsappLink(WHATSAPP_MESSAGE);

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

const dressIdeas = [
  {
    title: "Paciente del pabellón",
    text: "Bata de hospital, camisa de fuerza, vendajes y mirada perdida.",
  },
  {
    title: "Personal médico",
    text: "Enfermeras, doctores y cirujanos siniestros. Batas manchadas incluidas.",
  },
  {
    title: "Terror clásico",
    text: "Los íconos del cine de terror, con tu propio toque.",
  },
  {
    title: "Dark glam",
    text: "Negro y rojo, maquillaje de impacto. Elegante, pero inquietante.",
  },
];

const steps = [
  "Regístrate con el formulario: tus datos se envían por WhatsApp.",
  "Te compartimos los datos para pagar por transferencia.",
  "Al confirmar tu pago recibes tu código QR.",
  "Presenta tu QR en la entrada. El acceso es con el nombre registrado.",
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
        <ArtImage priority className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <HeroVideo />
        <div className="fog" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,2,2,0.45)_15%,rgba(5,2,2,0.85)_70%,#050202_95%)]"
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
      <section id="evento" className="mx-auto max-w-5xl px-4 py-24">
        <div className="text-center">
          <Eyebrow>La noche</Eyebrow>
          <Heading>Bienvenido al manicomio</Heading>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Una noche de Halloween exclusiva en el corazón del Querétaro moderno. Cupo limitado.
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-wine/60 bg-wine/40 sm:grid-cols-3">
          {[
            { k: "Fecha", v: EVENT.dateLabel, s: "2026" },
            { k: "Horario", v: EVENT.timeLabel, s: "Noche de Halloween" },
            { k: "Lugar", v: EVENT.venue, s: `${EVENT.address}, ${EVENT.city}` },
          ].map((d) => (
            <div key={d.k} className="bg-background p-8 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-blood-bright">{d.k}</p>
              <p className="mt-3 font-display text-2xl font-semibold uppercase sm:text-3xl">{d.v}</p>
              <p className="mt-1 text-sm text-muted">{d.s}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a
            href={EVENT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-[0.2em] text-muted underline decoration-blood-bright underline-offset-8 hover:text-white"
          >
            Cómo llegar →
          </a>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section className="relative overflow-hidden border-y border-wine-deep px-4 py-24">
        <ArtImage className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,var(--background),rgba(18,4,3,0.6)_50%,var(--background))]"
        />
        <div className="relative mx-auto max-w-5xl">
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

      {/* DRESS CODE */}
      <section id="dresscode" className="mx-auto max-w-5xl px-4 py-24">
        <div className="text-center">
          <Eyebrow>Dress code</Eyebrow>
          <Heading>Ideas para tu disfraz</Heading>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Inspírate en el manicomio y ven listo para el concurso de disfraces.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dressIdeas.map((d) => (
            <div key={d.title} className="rounded-lg border border-wine/60 bg-abyss/70 p-6">
              <h3 className="font-display text-xl font-semibold uppercase text-white">{d.title}</h3>
              <p className="mt-2 text-sm text-muted">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REGISTRO */}
      <section id="registro" className="mx-auto grid max-w-5xl gap-12 px-4 py-24 md:grid-cols-2 md:items-center">
        <div>
          <Eyebrow>Accesos</Eyebrow>
          <Heading>Firma tu ingreso</Heading>
          <p className="mt-4 text-muted">
            Regístrate aquí y termina tu compra por WhatsApp. Pago por transferencia.
          </p>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display text-7xl font-bold text-blood-bright">{mxn(EVENT.price)}</span>
            <span className="text-muted">por persona</span>
          </div>
          <ol className="mt-8 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blood-bright font-display text-blood-bright">
                  {i + 1}
                </span>
                <span className="pt-1 text-sm text-muted">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-md border border-wine/60 bg-ember/60 p-4 text-sm text-white">
            Acceso solo con nombre registrado y código QR. Evento exclusivo para mayores de 18 años.
          </p>
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

      <WhatsAppFloat />

      {/* CTA fija en móvil (deja espacio al botón de WhatsApp) */}
      <a
        href="#registro"
        className="fixed bottom-4 left-[84px] right-4 z-50 rounded-md bg-blood-bright py-4 text-center font-display text-lg font-semibold uppercase tracking-wider text-white shadow-[0_10px_40px_rgba(0,0,0,0.8)] sm:hidden"
      >
        Registrarme · {mxn(EVENT.price)}
      </a>
    </main>
  );
}
