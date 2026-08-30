import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Obchodné podmienky",
  description: "Všeobecné obchodné podmienky DNABS pre objednávky webov, aplikácií a digitálneho marketingu.",
};

export default function ObchodnePodmienkyPage() {
  return (
    <LanguageProvider defaultLang="sk">
      <LegalLayout
        kicker="// Právne"
        title="Obchodné podmienky"
        updated="30. 8. 2026"
      >
        <p>
          Tieto všeobecné obchodné podmienky (ďalej len „podmienky“) upravujú vzájomné práva a
          povinnosti medzi <strong>DNABS</strong> (ďalej len „DNABS“ alebo „poskytovateľ“),
          dostupným na webe dnabs.online a kontaktom{" "}
          <a href="mailto:contact.dnabs@gmail.com">contact.dnabs@gmail.com</a>, a osobou, ktorá si
          prostredníctvom tohto webu objedná bezplatný náhľad webu alebo inú službu (ďalej len
          „klient“).
        </p>

        <h2>1. Bezplatný náhľad webu</h2>
        <p>
          Vyplnením a odoslaním kontaktného formulára na webe dnabs.online klient objednáva
          bezplatné vypracovanie úvodného náhľadu webovej stránky. Táto objednávka je nezáväzná a
          bezplatná — jej odoslaním klientovi nevzniká žiadna platobná povinnosť ani zmluva o
          dielo. DNABS sa zaväzuje náhľad pripraviť a odpovedať klientovi spravidla do 24–48 hodín
          od odoslania formulára.
        </p>

        <h2>2. Vznik zmluvného vzťahu</h2>
        <p>
          Zmluvný vzťah medzi DNABS a klientom (napr. zmluva o dielo alebo o poskytovaní služieb)
          vzniká až po tom, čo sa obe strany dohodnú na rozsahu, cene a termíne dodania konkrétnej
          zákazky a klient túto ponuku výslovne potvrdí (e-mailom alebo iným preukázateľným
          spôsobom). Do tohto momentu nie je DNABS povinný žiadne plnenie poskytnúť a klient nie je
          povinný nič uhradiť.
        </p>

        <h2>3. Cena a platobné podmienky</h2>
        <p>
          Cena za konkrétnu zákazku sa stanovuje individuálne na základe rozsahu, zložitosti a
          požiadaviek klienta a je oznámená vopred pred začatím prác. Splatnosť faktúr je 30 dní
          od jej vystavenia (v súlade s § 340a Obchodného zákonníka, ktorý túto lehotu určuje ako
          všeobecnú, pokiaľ nie je dohodnuté inak), pokiaľ sa strany nedohodnú na kratšej alebo
          dlhšej lehote. Platba sa realizuje bankovým prevodom na účet uvedený na faktúre.
        </p>

        <h2>4. Dodanie a autorské práva</h2>
        <p>
          Výsledný web, aplikácia alebo iný výstup sa odovzdáva klientovi po úplnom uhradení dohodnutej
          ceny, pokiaľ sa strany nedohodnú inak (napr. čiastočné zálohy). Autorské práva k
          vytvorenému dielu prechádzajú na klienta okamihom úplného zaplatenia ceny, pokiaľ nie je
          v konkrétnej ponuke dohodnuté inak.
        </p>

        <h2>5. Zodpovednosť a reklamácie</h2>
        <p>
          DNABS zodpovedá za to, že dodané dielo zodpovedá dohodnutej špecifikácii. Zjavné
          nedostatky je klient povinný reklamovať bez zbytočného odkladu po ich zistení, skryté
          vady najneskôr do 24 mesiacov od odovzdania diela (bežná zákonná záručná doba podľa
          Občianskeho zákonníka a zákona o ochrane spotrebiteľa). DNABS nezodpovedá za škody
          spôsobené neodborným zásahom tretej strany do odovzdaného riešenia.
        </p>

        <h2>6. Ochrana osobných údajov a cookies</h2>
        <p>
          Informácie o tom, aké osobné údaje DNABS spracúva a aké súbory cookie web dnabs.online
          používa, nájdeš na stránke{" "}
          <a href="/cookies">Cookies a ochrana osobných údajov</a>.
        </p>

        <h2>7. Záverečné ustanovenia</h2>
        <p>
          DNABS si vyhradzuje právo tieto podmienky priebežne aktualizovať. Aktuálne znenie je
          vždy dostupné na tejto stránke. Vzťahy neupravené týmito podmienkami sa riadia právnym
          poriadkom Slovenskej republiky.
        </p>

        <p style={{ opacity: 0.6, fontSize: 13 }}>
          Toto je všeobecné znenie obchodných podmienok vychádzajúce z bežnej praxe a všeobecne
          platných ustanovení slovenského práva — pred oficiálnym použitím odporúčame dať si ho
          skontrolovať právnikom, najmä ak sa DNABS v budúcnosti formálne zaregistruje ako
          spoločnosť alebo živnosť.
        </p>
      </LegalLayout>
    </LanguageProvider>
  );
}
