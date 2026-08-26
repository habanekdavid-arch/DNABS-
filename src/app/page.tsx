import { LanguageProvider } from "@/lib/i18n";
import Hero from "@/components/Hero";
import Realizacia from "@/components/Realizacia";
import ServicesMarquee from "@/components/ServicesMarquee";
import Services from "@/components/Services";
import About from "@/components/About";
import HomeFaq from "@/components/HomeFaq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider defaultLang="sk">
      <main id="top">
        <Hero />
        <Realizacia />
        <ServicesMarquee />
        <Services />
        <About />
        <HomeFaq />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
