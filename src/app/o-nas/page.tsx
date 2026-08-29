import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import OnasContent from "@/components/OnasContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "DNABS je digitálne štúdio z Bratislavy. Zisti, ako pristupujeme k tvorbe webových stránok, e-shopov a digitálneho marketingu pre malé a stredné firmy.",
};

export default function OnasPage() {
  return (
    <LanguageProvider defaultLang="sk">
      <main id="top">
        <OnasContent />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
