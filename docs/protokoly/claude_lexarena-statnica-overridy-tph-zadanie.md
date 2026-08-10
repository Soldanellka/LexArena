# LexArena — Štátnicová sieň: overridy, regex, TPH (zadanie pre Code)

> **Kontext:** Babu odsúhlasila všetky tri veci z nálezov (`claude_lexarena-protokol-pojednavanie-statnica-nalezy.md`). Cieľ: sieň má skúšať z aktuálnych textov Babu a podporovať aj Trestné právo hmotné. Pravidlá platia (commit + protokol, push na Babu, nič cez globálny sync bez Babu).

## 1. Štátnica číta Firebase overridy
Do `fetchOkruh` (`statnice.js:359`) doplniť `applyContentOverrides` — konzistentne s tým, ako overridy aplikuje zvyšok appky (klientská cesta). Sieň tým začne skúšať z vyeditovaných summary (~2000 znakov) namiesto starého `theory` v repe, bez závislosti od syncu.
- Over dopad na výkon (fetch overridov pri štarte skúšky) a na prípad, keď override neexistuje (fallback na súbor).

## 2. Rozšíriť regex kľúčových bodov
`extractKeyPoints` (`statnice.js:320`) chytá len „Kľúčové slová (štátnicové):". Rozšíriť tak, aby chytal **aj „Zapamätaj si (štátnicové jadro)"** (tolerantne na dvojbodku/medzery/veľkosť písmen). Texty Babu sa nemenia. Over na reálnych TPH summary, že extrakcia vráti body, nie núdzové vety.

## 3. Pridať TPH do Štátnicovej siene
Rozšíriť allow-list oblastí siene o **Trestné právo hmotné** (dnes Pracovné, Občianske, Európske). Over všetko, čo s tým súvisí:
- odkiaľ sieň berie zoznam okruhov a texty pre TPH (A1–A13 majú summary vo Firebase + `spider`/`theory` v repe),
- výber okruhov cez vybranú dvojicu (`__selectedOkruhPair`) — TPH je `dual` (hmotné+procesné? **nie** — TPH je čisté hmotné; dual je „Trestné právo" ako oblasť v Aréne: 1 okruh z hmotného + 1 z procesného). ⚠️ **Toto over a nahlás:** ak sieň dostane dvojicu hmotné+procesné, ale podklady (summary/kľúčové body) má zatiaľ len hmotné (A1–A13), rozhodni sa medzi (a) skúšať len hmotný okruh z dvojice, (b) pustiť aj procesný so starým obsahom — **nerozhoduj sám, nahlás možnosti**, ak to nie je jednoznačné z kódu.
- ekonomika siene (15 § vstup, odmeny) beží pre TPH rovnako.

## Otestovať
Sieň s Pracovným (regresia — nič sa nezhoršilo) · sieň s TPH: skúška sa spustí, kľúčové body idú zo „Zapamätaj si (štátnicové jadro)", hodnotenie pracuje s novým summary · override vs. fallback na súbor · konzola · bez zápisu do produkčných dát pri testoch, kde sa dá.

## Protokol
Commit(y) + `súbor:riadok` · potvrdenie extrakcie bodov na reálnom TPH summary (ukáž 2–3 extrahované body) · ako je vyriešená dvojica hmotné+procesné · regresia Pracovného · otvorené otázky.
