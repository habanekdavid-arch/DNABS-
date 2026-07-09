import { LanguageProvider } from "@/lib/i18n";
import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider defaultLang="sk">
      <div id="top">
        <Hero />
        <ServicesMarquee />
        <Services />
        <About />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
