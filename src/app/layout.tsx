import type { Metadata } from "next";
import {
  Space_Grotesk,
  Space_Mono,
  Instrument_Serif,
  Bricolage_Grotesque,
  Allura,
  Manrope,
  Geist,
  Geist_Mono,
} from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
import Cursor from "@/components/Cursor";
import SmoothAnchors from "@/components/SmoothAnchors";
import ShapeBurst from "@/components/ShapeBurst";
import Grain from "@/components/Grain";
import "./globals.css";

/* Vrchná časť webu — nadpisy Manrope 800, text Geist, štítky Geist Mono. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["800"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});

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

/* Jedna adresa na jednom mieste — používa ju metadata aj štruktúrované dáta. */
const WEB = "https://dnabs.online";

/**
 * Štruktúrované dáta pre Google. Je to jeden @graph, nie tri samostatné
 * skripty, aby sa dali uzly navzájom poprepájať cez @id — Google tak vie,
 * že Organization, WebSite aj LocalBusiness opisujú tú istú firmu.
 *
 * Pre značkový dopyt („dnabs") je dôležitý najmä uzol Organization: z neho
 * Google berie názov, logo a odkazy na profily (sameAs) do bočného panela.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${WEB}/#organizacia`,
      name: "DNABS",
      /* Variácie, ktoré ľudia reálne píšu do hľadania. */
      alternateName: ["DNABS digitálne štúdio", "DNABS štúdio", "dnabs.online"],
      url: `${WEB}/`,
      /* Naschvál PNG a nie logo.svg: Google pre logo v štruktúrovaných
         dátach prijíma len .jpg, .png a .gif — SVG ignoruje. Súbor je
         vyrenderovaný z logo.svg, takže sa obe verzie zhodujú. */
      logo: {
        "@type": "ImageObject",
        "@id": `${WEB}/#logo`,
        url: `${WEB}/logo.png`,
        contentUrl: `${WEB}/logo.png`,
        width: 1200,
        height: 575,
        caption: "DNABS",
      },
      image: { "@id": `${WEB}/#logo` },
      email: "contact.dnabs@gmail.com",
      telephone: "+421949390797",
      foundingDate: "2026",
      areaServed: { "@type": "Country", name: "Slovensko" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bratislava",
        addressCountry: "SK",
      },
      sameAs: ["https://www.instagram.com/dnabs.sk/"],
    },
    {
      "@type": "WebSite",
      "@id": `${WEB}/#web`,
      url: `${WEB}/`,
      name: "DNABS",
      inLanguage: "sk-SK",
      publisher: { "@id": `${WEB}/#organizacia` },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${WEB}/#prevadzka`,
      name: "DNABS",
      url: `${WEB}/`,
      email: "contact.dnabs@gmail.com",
      telephone: "+421949390797",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bratislava",
        addressCountry: "SK",
      },
      parentOrganization: { "@id": `${WEB}/#organizacia` },
    },
  ],
};

/**
 * GA4 Measurement ID. Nie je to tajný údaj — v zdrojáku stránky ho vidí každý,
 * rovnako ako Ads tag nižšie, preto je tu natvrdo ako fallback. Cez
 * NEXT_PUBLIC_GA4_ID sa dá prebiť (napr. iná property pre testovacie
 * prostredie); prázdny reťazec GA4 vypne úplne.
 */
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "G-WPM8C948S2";

export const metadata: Metadata = {
  metadataBase: new URL(WEB),
  title: {
    /* Názov značky je naschvál na začiatku — pri dopyte „dnabs" Google
       zvýrazňuje zhodu v titulku a ten rozhoduje, či výsledok vyzerá
       ako oficiálna stránka firmy. */
    default: "DNABS — digitálne štúdio | weby, aplikácie a marketing",
    template: "%s | DNABS",
  },
  description:
    "DNABS je digitálne štúdio z Bratislavy — weby, aplikácie a digitálny marketing pre firmy, ktoré chcú zrýchliť svoje procesy. Bezplatná 30-minútová konzultácia.",
  applicationName: "DNABS",
  keywords: ["DNABS", "digitálne štúdio", "tvorba webov", "webové aplikácie", "digitálny marketing", "Bratislava"],
  authors: [{ name: "DNABS", url: WEB }],
  creator: "DNABS",
  publisher: "DNABS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      /* Bez tohto Google v značkovom výsledku ukáže len drobný náhľad
         alebo žiadny — veľký náhľad a dlhší popis treba povoliť. */
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  /* Token zo Search Console. Súbor /googledd910b1d2f6ab20f.html už v public/
     je; meta značka je druhý, nezávislý dôkaz vlastníctva — stačí doplniť
     NEXT_PUBLIC_GOOGLE_VERIFICATION a nič v kóde sa nemení. */
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION }
    : undefined,
  openGraph: {
    title: "DNABS — digitálne štúdio",
    description:
      "Bezplatná 30-minútová konzultácia. Weby, aplikácie a digitálny marketing pre firmy, ktoré chcú zrýchliť svoje procesy.",
    url: `${WEB}/`,
    siteName: "DNABS",
    locale: "sk_SK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DNABS — digitálne štúdio",
    description:
      "Weby, aplikácie a digitálny marketing. Bezplatná 30-minútová konzultácia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable} ${bricolage.variable} ${allura.variable} ${manrope.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });
              gtag('js', new Date());
              gtag('config', 'AW-18360461587');
              ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ""}
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18360461587"></script>
      </head>
      <body>
        {children}
        <CookieConsent />
        <Cursor />
        <SmoothAnchors />
        <ShapeBurst />
        <Grain />
      </body>
    </html>
  );
}
