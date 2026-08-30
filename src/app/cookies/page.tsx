import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import LegalLayout from "@/components/LegalLayout";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Cookies a ochrana osobných údajov",
  description: "Aké súbory cookie web dnabs.online používa a ako spracúvame osobné údaje.",
};

export default function CookiesPage() {
  return (
    <LanguageProvider defaultLang="sk">
      <LegalLayout
        kicker="// Právne"
        title="Cookies a ochrana osobných údajov"
        updated="30. 8. 2026"
      >
        <h2>Čo sú cookies</h2>
        <p>
          Cookies sú malé textové súbory, ktoré si webová stránka ukladá v tvojom prehliadači,
          aby si zapamätala tvoje nastavenia alebo ti vedela ukázať relevantnejší obsah pri
          ďalšej návšteve.
        </p>

        <h2>Aké cookies na dnabs.online používame</h2>
        <p>
          <strong>Nevyhnutné cookies</strong> — potrebné na základné fungovanie webu, napríklad
          prihlásenie do administrácie (Clerk). Tieto cookies nemožno vypnúť, keďže bez nich by
          web nefungoval, a podľa GDPR/ePrivacy si na ne nevyžadujeme súhlas.
        </p>
        <p>
          <strong>Marketingové cookies (Google Ads)</strong> — používame ich na meranie
          účinnosti reklamných kampaní (napr. či niekto po kliknutí na reklamu odoslal dopyt).
          Tieto cookies sa aktivujú až po tom, čo s nimi súhlasíš v cookie lište nižšie na
          stránke.
        </p>

        <h2>Ako môžeš zmeniť svoju voľbu</h2>
        <p>
          Svoj súhlas s marketingovými cookies môžeš kedykoľvek zmeniť tlačidlom nižšie — znovu
          sa ti zobrazí cookie lišta, kde si môžeš vybrať inak.
        </p>
        <CookieSettingsButton />

        <h2>Osobné údaje z kontaktného formulára</h2>
        <p>
          Ak nám cez kontaktný formulár pošleš dopyt, spracúvame tvoje meno, e-mail, telefónne
          číslo a ďalšie údaje, ktoré nám dobrovoľne poskytneš, výhradne za účelom vybavenia
          tvojho dopytu a prípadnej realizácie objednanej služby. Tieto údaje neposkytujeme
          tretím stranám okrem nástrojov nevyhnutných na prevádzku webu (napr. e-mailová
          notifikácia, databáza dopytov).
        </p>

        <h2>Kontakt</h2>
        <p>
          Otázky ohľadom spracúvania osobných údajov alebo cookies nám napíš na{" "}
          <a href="mailto:contact.dnabs@gmail.com">contact.dnabs@gmail.com</a>.
        </p>
      </LegalLayout>
    </LanguageProvider>
  );
}
