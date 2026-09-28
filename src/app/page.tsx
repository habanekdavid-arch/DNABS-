import { LanguageProvider } from "@/lib/i18n";
import TopNav from "@/components/hero/TopNav";
import HeroTop from "@/components/hero/HeroTop";
import HowItWorks from "@/components/HowItWorks";
import ServicesMarquee from "@/components/ServicesMarquee";
import Services from "@/components/Services";
import Spolupraca from "@/components/Spolupraca";
import CtaBand from "@/components/CtaBand";
import Referencie from "@/components/Referencie";
import PruhKonzultacia from "@/components/PruhKonzultacia";
import HomeFaq from "@/components/HomeFaq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider defaultLang="sk">
      <TopNav />
      <main id="top">
        {/* Realizácie sú v koláži hore v hero — samostatná sekcia
            s jedným projektom už len opakovala to isté. */}
        <HeroTop />
        <HowItWorks />
        <ServicesMarquee />
        <Services />
        <Spolupraca />
        <CtaBand />
        {/* Dlhá sekcia „o nás" je preč — namiesto nej len tenký pruh
            s výzvou na formulár. */}
        <PruhKonzultacia />
        <HomeFaq />
        <Referencie />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
