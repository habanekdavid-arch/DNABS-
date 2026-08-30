import type { Metadata } from "next";
import {
  Space_Grotesk,
  Space_Mono,
  Instrument_Serif,
  Bricolage_Grotesque,
  Allura,
} from "next/font/google";
import CookieConsent from "@/components/CookieConsent";
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

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DNABS",
  url: "https://dnabs.online",
  email: "contact.dnabs@gmail.com",
  telephone: "+421949390797",
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bratislava",
    addressCountry: "SK",
  },
  sameAs: ["https://www.instagram.com/dnabs.sk/"],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dnabs.online"),
  title: {
    default: "DNABS — Digitál, čo rastie.",
    template: "%s | DNABS",
  },
  description:
    "DNABS je digitálne štúdio — weby, aplikácie a digitálny marketing pre firmy, ktoré chcú zrýchliť svoje procesy.",
  openGraph: {
    title: "DNABS — Digitál, čo rastie.",
    description:
      "Bezplatný náhľad tvojho webu do 48 hodín. Weby, aplikácie a digitálny marketing pre firmy, ktoré chcú zrýchliť svoje procesy.",
    url: "https://dnabs.online",
    siteName: "DNABS",
    locale: "sk_SK",
    type: "website",
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
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable} ${bricolage.variable} ${allura.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
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
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18360461587"></script>
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
