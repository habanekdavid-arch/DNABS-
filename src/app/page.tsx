import { LanguageProvider } from "@/lib/i18n";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import ServicesMarquee from "@/components/ServicesMarquee";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import HomeFaq from "@/components/HomeFaq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider defaultLang="sk">
      <div id="top">
        <Hero />
        <Showcase />
        <ServicesMarquee />
        <Services />
        <About />
        <Team />
        <HomeFaq />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}
