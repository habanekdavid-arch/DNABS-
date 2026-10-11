import type { Metadata } from "next";
import OnasContent from "@/components/OnasContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "DNABS je digitálne štúdio z Bratislavy. Zisti, ako pristupujeme k tvorbe webových stránok, e-shopov a digitálneho marketingu pre malé a stredné firmy.",
  alternates: { canonical: "/o-nas" },
};

export default function OnasPage() {
  return (
    <>
      <main id="top">
        <OnasContent />
      </main>
      <Footer />
    </>
  );
}
