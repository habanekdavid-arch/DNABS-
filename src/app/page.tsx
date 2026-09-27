import { LanguageProvider } from "@/lib/i18n";
import TopNav from "@/components/hero/TopNav";
import HeroTop from "@/components/hero/HeroTop";
import HowItWorks from "@/components/HowItWorks";
import Realizacia from "@/components/Realizacia";
import ServicesMarquee from "@/components/ServicesMarquee";
import Services from "@/components/Services";
import CtaBand from "@/components/CtaBand";
import Referencie from "@/components/Referencie";
import About from "@/components/About";
import HomeFaq from "@/components/HomeFaq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider defaultLang="sk">
      <TopNav />
      <main id="top">
        <HeroTop />
        <HowItWorks />
        <Realizacia />
        <ServicesMarquee />
        <Services />
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
