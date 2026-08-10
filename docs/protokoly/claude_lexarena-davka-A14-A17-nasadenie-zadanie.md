# LexArena — nasadenie dávky A14–A17 (zadanie pre Code)

> **Zdroj:** `claude_TPH-davka-A14-A17.md` — 4 pavúky (už vo formáte appky: `label` + `leaves: string[]`), aktualizácia mapy (9 klastrov + 6 nových links), štátnicové podklady (garantský materiál, nenasadzujú sa). Pravidlá platia (commit + protokol, push na Babu, nič cez globálny sync).

## Úlohy
1. **Pavúky do repa:** pole `spider` do `Trestné právo hmotné/data/A14–A17.json` (rovnako ako A1–A13). Formát je už finálny — len vlož a validuj `isValidSpider()` 4/4. Obsah nemeniť.
2. **Mapa:** aktualizuj `_map.json` — `pachatel-a-sucinnost` → [5, 9, 14], `sankcie` → [11, 12, 15], nové klastre `europsky-rozmer` · Európsky rozmer · [16] a `osobitna-cast` · Osobitná časť · [17]; doplň 6 nových links z podkladu. Over v UI: mapa ukazuje 9 klastrov, A14–A17 otvárajú stromy, ⇄ odznaky sedia s links.
3. **Štátnica:** zdvihni `CRIMINAL_HMOTNE_COUNT` 13 → **17**. Over extrakciu kľúčových bodov na A14–A17 (regex „Zapamätaj si (štátnicové jadro)" — už potvrdené 4/3/5/5, stačí sanity check v sieni) a že doberanie tém funguje s rozšíreným bazénom.
4. **Regresia:** A1–A13 pavúky nedotknuté, mapa Pracovného bez zmeny, sieň Pracovné/Občianske bez zmeny.

## Protokol
Commit + `súbor:riadok` · validácia 4/4 · mapa 9 klastrov v UI · sieň skúša z bazéna 17 · regresie · otvorené otázky.
