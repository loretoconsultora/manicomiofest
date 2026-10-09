import type { Metadata, Viewport } from "next";
import { Manrope, Pirata_One } from "next/font/google";
import "./globals.css";

const pirata = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirata",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const description =
  "M Producciones presenta Manicomio Madness Night: fiesta de Halloween VIP. 28 de octubre, 8 PM – 2 AM en Black Lounge, Plaza Campa, Querétaro. DJ's invitados, concurso de disfraces y premios. Solo adultos.";

export const metadata: Metadata = {
  title: "Manicomio Madness Night | 28 de octubre · Querétaro",
  description,
  openGraph: {
    title: "Manicomio Madness Night",
    description,
    locale: "es_MX",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060606",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${pirata.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
