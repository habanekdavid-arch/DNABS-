import { LanguageProvider } from "@/lib/i18n";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Realizacia from "@/components/Realizacia";
import ServicesMarquee from "@/components/ServicesMarquee";
import Services from "@/components/Services";
import CtaBand from "@/components/CtaBand";
import Niches from "@/components/Niches";
import Referencie from "@/components/Referencie";
import About from "@/components/About";
import HomeFaq from "@/components/HomeFaq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider defaultLang="sk">
      <main id="top">
        <Hero />
        <HowItWorks />
        <Realizacia />
        <ServicesMarquee />
        <Services />
        <Niches />
        <CtaBand />
        <About />
        <HomeFaq />
        <Referencie />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
