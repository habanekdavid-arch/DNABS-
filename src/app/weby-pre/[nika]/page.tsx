import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/lib/i18n";
import { niches, getNiche } from "@/data/niches";
import NicheHero from "@/components/NicheHero";
import Showcase from "@/components/Showcase";
import NicheFaq from "@/components/NicheFaq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return niches.map((niche) => ({ nika: niche.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ nika: string }>;
}): Promise<Metadata> {
  const { nika } = await params;
  const niche = getNiche(nika);
  if (!niche) return {};
  return {
    title: niche.seo.title.sk,
    description: niche.seo.description.sk,
  };
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ nika: string }>;
}) {
  const { nika } = await params;
  const niche = getNiche(nika);
  if (!niche) notFound();

  return (
    <LanguageProvider defaultLang="sk">
      <main id="top">
        <NicheHero niche={niche} />
        <Showcase />
        <NicheFaq niche={niche} />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
