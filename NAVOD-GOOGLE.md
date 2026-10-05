# Aby „dnabs" v Googli našlo nás

Tri veci sa často miešajú dokopy, ale riešia každá niečo iné. Ber ich v tomto
poradí — Google Ads je posledná a najmenej dôležitá.

---

## 1. Vyhľadávanie zadarmo (Search Console) — toto je tá skutočná oprava

Ak sa stránka v Googli nedá nájsť, vo veľkej väčšine prípadov to nie je o
peniazoch — Google ju jednoducho ešte nemá v indexe. Reklama to neopraví:
reklama je nalepená nad výsledkami, samotný web sa do nich tým nedostane.

Vlastníctvo domény už overené máme (`public/googledd910b1d2f6ab20f.html`),
takže v [Search Console](https://search.google.com/search-console) stačí:

1. Otvoriť property `dnabs.online`.
2. **Sitemaps** → zadať `sitemap.xml` → *Odoslať*.
   Mapa má teraz **15 adries** (predtým 7) — pribudlo osem podstránok
   realizácií, ktoré v nej dovtedy vôbec neboli.
3. **Kontrola adresy URL** hore → vložiť `https://dnabs.online/` →
   *Požiadať o indexovanie*. To isté spraviť pre `/o-nas`.
4. O pár dní sa vrátiť do **Indexovanie → Stránky** a pozrieť, čo Google
   zaradil a čo odmietol. Tam je aj dôvod, ak niečo nezaradil.

Na strane kódu je hotové:

- `<title>` začína slovom DNABS — pri dopyte „dnabs" Google zvýrazňuje zhodu
  v titulku a podľa neho sa rozhoduje, či výsledok vyzerá ako oficiálna
  stránka firmy.
- Štruktúrované dáta `Organization` + `WebSite` + `LocalBusiness` — odtiaľ
  berie Google názov, logo a odkazy na profily do bočného panela.
- `max-image-preview:large` pre Googlebot, inak ukáže len drobný náhľad.
- Kanonická adresa na každej stránke, aby sa to isté nerátalo dvakrát.
- `logo.png` (1200 × 575) — Google pre logo v štruktúrovaných dátach prijíma
  len `.jpg`, `.png` a `.gif`, SVG ignoruje.

**Dokedy to potrvá:** pri novej doméne spravidla **dni až niekoľko týždňov**
od zaindexovania. Urýchliť sa to nedá, ani platene.

---

## 2. Firemný profil Google (Google Business Profile) — panel po pravej strane

To okno s logom, telefónom a hodnotením po pravej strane výsledkov nie je
SEO ani reklama, ale samostatný zápis:
[business.google.com](https://business.google.com) → firma DNABS,
Bratislava, kategória *Webdizajnér* alebo *Marketingová agentúra*, web
`https://dnabs.online`. Google posiela overovací kód poštou alebo cez video.

V štruktúrovaných dátach máme adresu aj telefón rovnaké ako budú v profile —
tie dva zápisy by sa mali presne zhodovať, inak si ich Google nemusí spojiť.

---

## 3. Google Ads — až keď je hotové 1 a 2

Kampaň na vlastné meno („dnabs") má zmysel v dvoch prípadoch:

- na meno firmy si platí reklamu **konkurencia** a berie nám preklik,
- chceme byť vidieť **hneď**, kým prebieha indexovanie.

Inak sú to vyhodené peniaze: za preklik na vlastnú značku platíme aj vtedy,
keď by nás ten človek našiel aj tak. Značkové kľúčové slová bývajú veľmi
lacné (jednotky centov za preklik), takže rozpočet 3–5 € na deň stačí.

Merací kód už beží — Ads tag `AW-18360461587` aj GA4 `G-WPM8C948S2` sú v
`src/app/layout.tsx`, konverzia *odoslaný formulár* sa posiela zo stránky
`/dakujeme`. Netreba teda nič dopĺňať, len v Ads založiť kampaň:

- typ **Vyhľadávanie**, cieľ *Potenciálni zákazníci*
- kľúčové slová vo **frázovej zhode**: `"dnabs"`, `"dnabs online"`,
  `"dnabs digitálne štúdio"`
- vylučujúce kľúčové slová: `dna`, `test dna`, `abs` — inak sa kampaň
  minie na dopyty o DNA testoch a brzdách
- cieľová adresa `https://dnabs.online/`

---

## Čo ešte pomôže, a je zadarmo

Pri krátkom a dvojznačnom slove ako „dnabs" Google váha medzi našou firmou
a DNA testami. Rozhodnú ho odkazy zvonku, kde je názov **DNABS** napísaný
spolu s adresou `dnabs.online`:

- Instagram `@dnabs.sk` — adresu dať do bio (je už v `sameAs`)
- profily na slovenských katalógoch firiem
- weby klientov — pätička „web: DNABS" s odkazom
- Firemný profil LinkedIn

Každý takýto odkaz je pre Google potvrdenie, že DNABS je firma a že patrí
k tejto doméne.
