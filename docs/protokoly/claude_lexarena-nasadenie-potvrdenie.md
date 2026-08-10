# LexArena — nasadenie na produkciu (potvrdenie)

> **Fáza:** pushnuté a **živé na lexarena.sk**. Rozsah `4e094aa..5a7cd49` — všetkých 13 commitov (Stopa A: 8 · Stopa B: 3 · úzka Stopa C: 2). Uzatvára reťaz: návrh v2 → prestavbové zadanie → Stopa A/B/C → nasadenie.

## Overené priamo na produkcii

| Súbor | Kontrola | Stav |
|-------|----------|------|
| `index.html` | 4 nadpisy svetov · mŕtva karta preč (0×) · `#shopCard` | ✅ |
| `styles.css` | `.chip:disabled` · `.card-soon` · `#worldArena { order: 1 }` | ✅ |
| `cases.js` | `maybeAwardCaseSet` — § a energia za prípady | ✅ |
| `quiz.js` | `_lexOptHandler` — koniec dvojitého skórovania | ✅ |
| `memoryTrainer.js` | `DEFINITIONS_PER_OKRUH` — správny menovateľ | ✅ |
| `app.js` | `markUnavailableAreaChips` — vypnuté chipy | ✅ |
| `scripts/duels.js` | `announceOwnDuelResults` — výsledok pre tvorcu | ✅ |
| `pravo-app/engine.js` | `econBridgeAward` — § za okruh v moduloch | ✅ |
| `scripts/judikatura.js` | mount za `biflovackaCard` — Judikatúra v Tréningoch | ✅ |

## Čo išlo živé
- **Opravy (Stopa A):** prípady dávajú § a berú energiu · výsledok duelu vidia obaja hráči · cudzie výzvy sa nedajú mazať z DB · moduly pripíšu § · kvíz sa nedá odkliknúť dvakrát · bifľovačka počíta percentá zo správneho menovateľa.
- **Prestavba (Stopa B + C):** tri svety s nadpismi — Aréna vpravo (pojednávanie → hry → register), vľavo Tréningy → Súťaž a komunita → Servis. Rímske právo a Dejiny práva viditeľne vypnuté, Obchod stlmený „čoskoro".

## Sledovať prvé dni
1. **Výsledkové okná spätne:** hráči s dokončenými výzvami z posledných 7 dní dostanú pri otvorení výsledkové okno — max 3 naraz, zvyšok nabudúce. Zámer; zúženie okna/stropu je jednoriadková zmena.
2. **Energia za prípady:** prípady odteraz strhávajú −4 % a dávajú §; dovtedy boli zadarmo → spotreba energie u aktívnych hráčov mierne stúpne.

## Stále otvorené (na posúdenie naživo)
- **Šírka Senátov a Judikatúry** — 708 px v ľavom stĺpci namiesto pôvodných 420. Dôsledok rozhodnutia „Senáty → Svet 3". Vrátiť sa dá lacno.

## Nezačaté (čaká na rozhodnutie Babu)
- Zvyšok Stopy C: **vlajková loď** (Štátnicová sieň), **konsolidácia lišty**, **onboarding**.
- **Model práv obsahu** (garant/admin/študent, pečate, atribúcia) — čaká na doplnenie, či Babu upravuje otázky priamo a či má byť jej zmena súkromná.
- **Štátnicové podklady z A1–A4** (Trestné hmotné) — čaká na dodanie summary.
