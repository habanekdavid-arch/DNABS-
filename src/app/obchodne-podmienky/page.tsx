import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";
import LegalLayout from "@/components/LegalLayout";
import styles from "@/components/LegalLayout.module.css";

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
          povinnosti medzi spoločnosťou{" "}
          <strong>4from media s.r.o.</strong>, so sídlom{" "}
          <span className={styles.placeholder}>PLACEHOLDER — adresa sídla</span>, IČO{" "}
          <span className={styles.placeholder}>PLACEHOLDER — IČO</span>, DIČ{" "}
          <span className={styles.placeholder}>PLACEHOLDER — DIČ</span>, zapísanou{" "}
          <span className={styles.placeholder}>PLACEHOLDER — registrácia v OR</span> (ďalej len
          „DNABS“ alebo „poskytovateľ“), a osobou, ktorá si prostredníctvom webu dnabs.online
          objedná bezplatný náhľad webu alebo inú službu (ďalej len „klient“).
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
          požiadaviek klienta a je oznámená vopred pred začatím prác. Splatnosť faktúr je{" "}
          <span className={styles.placeholder}>PLACEHOLDER — počet dní splatnosti</span> dní od
          jej vystavenia, pokiaľ sa strany nedohodnú inak. Platba sa realizuje bankovým prevodom
          na účet uvedený na faktúre.
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
          DNABS zodpovedá za to, že dodané dielo zodpovedá dohodnutej špecifikácii. Prípadné
          nedostatky je klient povinný reklamovať bez zbytočného odkladu po ich zistení, najneskôr
          do <span className={styles.placeholder}>PLACEHOLDER — reklamačná lehota</span> od
          odovzdania diela. DNABS nezodpovedá za škody spôsobené neodborným zásahom tretej strany
          do odovzdaného riešenia.
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
          Toto je všeobecné znenie obchodných podmienok — pred oficiálnym použitím odporúčame dať
          si ho skontrolovať právnikom a doplniť chýbajúce firemné údaje označené ako PLACEHOLDER.
        </p>
      </LegalLayout>
    </LanguageProvider>
  );
}
