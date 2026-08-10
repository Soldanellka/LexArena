# TPP A9 — Zaistenie osôb (výroba)

> **Zdroj:** summary A9 od Babu. ⚠️ Do registra konfliktov: § 89 „predvedenie" (over — § 89 TP je vydanie veci; predvedenie obvineného § 120, svedka § 128) · § 118 „zistenie totožnosti" (over) · 96 h „pri OZZ" (podľa čl. 17 ods. 3 Ústavy SR platí 96 h pri trestných činoch terorizmu — over znenie). V pavúku §§ len tam, kde sedia.

## PAVÚK (formát appky)
```json
{
  "center": "Zaistenie osôb v trestnom konaní",
  "branches": [
    { "label": "Zadržanie (§ 85)", "leaves": [
      "Kto a kedy – policajt pri dôvode väzby alebo pristihnutí pri čine či bezprostredne po ňom",
      "Postup – poučenie o právach (najmä obhajca), zápisnica",
      "Lehota – do 48 hodín odovzdať súdu alebo prepustiť; predĺžená 96-hodinová lehota pre osobitné prípady"
    ] },
    { "label": "Predvedenie", "leaves": [
      "Podstata – privedenie osoby, ktorá sa bez ospravedlnenia nedostavila na úkon po riadnom predvolaní",
      "Účel – zabezpečiť prítomnosť, nie sankcionovať",
      "Limity – dôstojnosť osoby a primeranosť zásahu"
    ] },
    { "label": "Zatknutie (§ 73)", "leaves": [
      "Príkaz – vydáva sudca pre prípravné konanie",
      "Podmienky – dôvodné podozrenie zo spáchania TČ + dôvod väzby",
      "Postup – poučenie o právach, bezodkladné odovzdanie súdu"
    ] },
    { "label": "Väzba (§§ 71–72)", "leaves": [
      "Úteková – obava, že osoba ujde alebo sa bude skrývať",
      "Kolúzna – obava z ovplyvňovania svedkov či marenia dôkazov",
      "Preventívna – obava z pokračovania v trestnej činnosti",
      "Zásady – rozhoduje výlučne sudca; primeranosť, nevyhnutný čas, pravidelné preskúmavanie, prednostné vybavovanie"
    ] },
    { "label": "Zistenie totožnosti", "leaves": [
      "Podstata – identifikácia osoby pri konkrétnych indíciách o súvislosti s TČ",
      "Úkony – osobné údaje, odtlačky prstov, fotografie, hlasové záznamy",
      "Povinnosť – osoba je povinná strpieť; pri odmietnutí zákonné donútenie"
    ] }
  ]
}
```

## ŠTÁTNICOVÝ PODKLAD
**Kľúčové body:** štyri inštitúty zaistenia: zadržanie · predvedenie · zatknutie · väzba (+ zistenie totožnosti) · zadržanie § 85: dôvod väzby / pristihnutie, 48 h (predĺžená 96 h — over rozsah), poučenie + zápisnica · zatknutie § 73: príkaz sudcu, dôvod väzby, bezodkladné odovzdanie · väzba §§ 71–72: tri dôvody (úteková, kolúzna, preventívna), len sudca, primeranosť a prednostné vybavovanie · predvedenie: zabezpečenie prítomnosti, nie sankcia.
**Otázky (over):** 1. Zadržanie × zatknutie — kto rozhoduje a kedy. 2. Tri dôvody väzby s príkladmi; možno ich kombinovať? 3. Čo sa deje po uplynutí 48 h bez rozhodnutia súdu? 4. Nahradenie väzby (záruka, sľub, dohľad, peňažná záruka — § 80–81, over). 5. Kolúzna väzba — prečo je časovo najprísnejšie limitovaná?
**Chyby:** „polícia rozhoduje o väzbe" — klasika! · zadržanie a zatknutie ako synonymá · väzba ako trest (je zabezpečovací inštitút!) · zabudnuté poučenie o obhajcovi pri zadržaní.
**Vodítko:** 1 = štyri inštitúty + tri dôvody väzby + lehoty + súdna kontrola; 2 = inštitúty a dôvody bez lehôt; 3 = len zadržanie/väzba hrubo; 4 = mieša zadržanie so zatknutím alebo väzbu s trestom.

## Pre Code
Po prepise summary A9 v appke (ak už je) nasadiť `spider` do `Trestné právo procesné/data/A9.json` + count → 9. Ide spolu s A8.
