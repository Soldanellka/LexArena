# LexArena — nasadenie dávky A18–A21 + count 21 (zadanie pre Code)

> **Zdroj:** `claude_TPH-davka-A18-A21.md`. Pravidlá platia (commit + protokol, push na Babu, nič cez globálny sync).

## Úlohy
1. **Pavúky do repa:** `spider` do `Trestné právo hmotné/data/A18–A21.json` (formát appky, len vlož + `isValidSpider()` 4/4). Pavúky sú **zámerne bez čísel §§** — v summary sú sporné čísla, Babu overuje; nedopĺňaj ich.
2. **Mapa:** `osobitna-cast` → [17, 18, 19, 20, 21]; doplň 5 nových links z podkladu. Kontroly integrity ako minule (každý okruh práve raz, unikátne id, links v rozsahu). Over UI: klaster Osobitná časť ukazuje 5 okruhov, stromy sa otvárajú, ⇄ odznaky sedia.
3. **Štátnica:** `CRIMINAL_HMOTNE_COUNT` → **21** (pokrýva aj čakajúce zdvihnutie 13→17; potvrdené Babu). Over extrakciu kľúčových bodov A18–A21 („Zapamätaj si (štátnicové jadro)") a doberanie tém z bazéna 21.
4. **Regresia:** A1–A17 pavúky a mapa nedotknuté; sieň Pracovné/Občianske bez zmeny.

## Protokol
Commit + `súbor:riadok` · validácia 4/4 · mapa (5 okruhov v Osobitnej časti) · sieň bazén 21 + extrakcia · regresie · otvorené otázky.
