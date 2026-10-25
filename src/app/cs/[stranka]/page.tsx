import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VstupnaStranka from "@/components/VstupnaStranka";
import { VSTUPNE_STRANKY, getVstupnaStrankaCs } from "@/data/vstupneStranky";
import { hreflang } from "@/lib/hreflang";

/* Všetky české adresy sa predgenerujú do statických stránok — sú ich
   štyri a menia sa málo. */
export function generateStaticParams() {
  return VSTUPNE_STRANKY.map((s) => ({ stranka: s.slugCs }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ stranka: string }> },
): Promise<Metadata> {
  const { stranka } = await params;
  const data = getVstupnaStrankaCs(stranka);
  if (!data) return {};

  return {
    title: data.seo.title.cs,
    description: data.seo.description.cs,
    alternates: {
      canonical: `/cs/${data.slugCs}`,
      languages: hreflang(data),
    },
    openGraph: {
      title: data.seo.title.cs,
      description: data.seo.description.cs,
      url: `https://dnabs.online/cs/${data.slugCs}`,
      siteName: "DNABS",
      locale: "cs_CZ",
      type: "website",
    },
  };
}

export default async function CeskaStranka({
  params,
}: {
  params: Promise<{ stranka: string }>;
}) {
  const { stranka } = await params;
  const data = getVstupnaStrankaCs(stranka);
  if (!data) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.sluzbaNazov.cs,
    description: data.seo.description.cs,
    url: `https://dnabs.online/cs/${data.slugCs}`,
    inLanguage: "cs-CZ",
    areaServed: [{ "@type": "Country", name: "Česko" }],
    provider: { "@id": "https://dnabs.online/#organizacia" },
    mainEntityOfPage: {
      "@type": "FAQPage",
      mainEntity: data.faq.map((o) => ({
        "@type": "Question",
        name: o.q.cs,
        acceptedAnswer: { "@type": "Answer", text: o.a.cs },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VstupnaStranka data={data} jazykZAdresy="cs" />
    </>
  );
}
