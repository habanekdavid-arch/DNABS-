# Ako pridať obrázky k realizáciám

Všetko sa deje na dvoch miestach:

1. **súbory** hodíte sem, do `public/realizacie/`
2. **texty a farby** prepíšete v `src/data/hlavicka.ts`

---

## 1 · Obrázky do koláže

Každý projekt má **jeden notebook a tri miesta** na obrázky — jedno na
šírku, jedno na výšku a jedno menšie. Miesta sú vo všetkých projektoch
na rovnakých súradniciach, takže netreba nič prepočítavať — len vymeniť
súbor.

| Súbor | Čo to je | Rozmer | Formát |
|---|---|---|---|
| `<projekt>-web.jpg` | screenshot webu do notebooku | 1600 × 1000 | JPG / WebP |
| `<projekt>-1.jpg` | miesto 1 — **na šírku**, hore vpravo | 640 × 410 | JPG / WebP |
| `<projekt>-2.jpg` | miesto 2 — **na výšku**, dole vpravo | 500 × 660 | JPG / WebP |
| `<projekt>-3.jpg` | miesto 3 — **menšie na šírku**, dole v strede | 430 × 300 | JPG / WebP |

Rozmery sú **dvojnásobok** toho, čo sa zobrazí — aby to bolo ostré na
retina displejoch.

Názvy projektov (`<projekt>`):
`clever` · `mnam` · `happyhour` · `omrvinka` · `nicepoke` · `risebloom` · `vytlacto-3d`

Príklad — obrázky pre CLEVER:

```
public/realizacie/clever-web.jpg
public/realizacie/clever-1.jpg
public/realizacie/clever-2.jpg
public/realizacie/clever-3.jpg
```

Potom v `src/data/hlavicka.ts` nájdete projekt `clever` a v jeho `karty`
prepíšete koncovku `.svg` na `.jpg`:

```ts
src: "/realizacie/clever-1.jpg",
```

Teraz sú tam zástupné `.svg` — na každom je napísané, kam patrí.
Pokojne ich zmažte.

---

## 2 · Logo klienta

Priehľadné SVG alebo PNG sem, pomenované `<projekt>-logo.svg`, a v
dátovom súbore:

```ts
logo: "/realizacie/clever-logo.svg",
```

Logo sa zobrazí na farebnom paneli. **Musí mať priehľadné pozadie** —
inak bude mať okolo seba biely alebo čierny štvorec.

Keď `logo` necháte prázdne, zobrazí sa namiesto neho názov projektu.

---

## 3 · Logo DNABS do navigácie

SVG hoďte do `public/` (nie sem) a v `src/data/hlavicka.ts` hore:

```ts
export const NAV_LOGO = "/logo.svg";
```

Logo má jednu farbu a výšku 24 px. Keď je pole prázdne, v navigácii je
nápis DNABS.

---

## 4 · Ukážky na stránke projektu

Stránka `/realizacie/<projekt>` má pod textom galériu. Obrázky do nej
sa pridávajú do poľa `ukazky`:

```ts
ukazky: [
  { src: "/realizacie/clever-galeria-1.jpg", alt: "Úvodná stránka", popis: "Úvodná stránka" },
  { src: "/realizacie/clever-galeria-2.jpg", alt: "Detail produktu" },
],
```

Tu nie je obmedzený počet ani rozmer — obrázky sa zobrazia pod sebou
v mriežke. Odporúčaná šírka aspoň 1200 px.

---

## 5 · Čo ešte treba doplniť

V `src/data/hlavicka.ts` má každý projekt polia označené `// TODO`:

| Pole | Čo tam patrí |
|---|---|
| `farba` | firemná farba klienta, napr. `"#6637ED"` |
| `href` | adresa živého webu |
| `popis` | krátky riadok, napr. `"2026 — Web a branding"` |
| `tagline` | jedna veta, zobrazí sa vedľa koláže |
| `text` | odstavce na stránku projektu |
| `sluzby` | čo ste pre klienta spravili |

---

## 6 · Ako to dostanete na web

```bash
git add public/realizacie src/data/hlavicka.ts
git commit -m "Pridané obrázky realizácií"
git push
```

Vercel nasadí sám do pár minút.
