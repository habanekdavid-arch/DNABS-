import type { Metadata } from "next";
import {
  Space_Grotesk,
  Space_Mono,
  Instrument_Serif,
  Bricolage_Grotesque,
  Allura,
} from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "DNABS — Digitál, čo rastie.",
  description:
    "DNABS je digitálne štúdio — weby, aplikácie a digitálny marketing pre firmy, ktoré chcú zrýchliť svoje procesy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable} ${bricolage.variable} ${allura.variable}`}
    >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18360461587"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18360461587');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
