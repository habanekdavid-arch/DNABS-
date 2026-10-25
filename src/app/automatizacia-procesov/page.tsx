import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/lib/i18n";
import VstupnaStranka from "@/components/VstupnaStranka";
import { getVstupnaStranka } from "@/data/vstupneStranky";

const SLUG = "automatizacia-procesov";
const data = getVstupnaStranka(SLUG);

export const metadata: Metadata = {
  title: data?.seo.title.sk,
  description: data?.seo.description.sk,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    title: data?.seo.title.sk,
    description: data?.seo.description.sk,
    url: `https://dnabs.online/${SLUG}`,
    siteName: "DNABS",
    locale: "sk_SK",
    type: "website",
  },
};

export default function Stranka() {
  if (!data) notFound();

  /* Service v štruktúrovaných dátach ukazuje na rovnaký uzol Organization
     ako hlavička webu, takže Google vie, že službu poskytuje DNABS. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.sluzbaNazov.sk,
    description: data.seo.description.sk,
    url: `https://dnabs.online/${SLUG}`,
    areaServed: [
      { "@type": "Country", name: "Slovensko" },
      { "@type": "Country", name: "Česko" },
    ],
    provider: { "@id": "https://dnabs.online/#organizacia" },
    /* FAQ je na stránke naozaj vidieť — štruktúrované dáta, ktoré
       popisujú obsah skrytý pred návštevníkom, Google berie ako porušenie. */
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: data.faq.map((o) => ({
        "@type": "Question",
        name: o.q.sk,
        acceptedAnswer: { "@type": "Answer", text: o.a.sk },
      })),
    },
  };

  return (
    <LanguageProvider defaultLang="sk">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VstupnaStranka data={data} />
    </LanguageProvider>
  );
}
