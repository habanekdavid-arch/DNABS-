# Obrázky realizácií

Sem nahrajte vlastné obrázky a v `src/data/hlavicka.ts` prepíšte cesty.

Odporúčané rozmery:

| Na čo | Rozmer | Formát |
|---|---|---|
| Screenshot webu do notebooku | 1600 × 1000 px | JPG alebo WebP |
| Fotka do koláže | podľa `w` a `h` karty, 2× väčšie | JPG alebo WebP |
| Logo klienta na panel | 440 × 192 px | PNG s priehľadným pozadím alebo SVG |

Súbory, ktoré sú tu teraz, sú iba zástupné (`.svg`). Pokojne ich zmažte.

Príklad v `src/data/hlavicka.ts`:

```ts
{ typ: "obrazok", x: 700, y: 60, w: 250, h: 180,
  src: "/realizacie/mojafotka.jpg", alt: "Popis fotky" }
```
