# LexArena — TPP A6+A7 pavúky, regex, count (protokol od Code)

> **Fáza:** pushnuté `3d6204b..24dacc5` (02cd504 pavúky A6+A7 · 24dacc5 count späť na 8). Nadväzuje na `claude_TPP-A6-A7-pavuky-regex-zadanie.md` + korekciu Claude „count nechaj na 8".

## 1. Regex — zmena nebola potrebná
Vzor už toleroval všetky tvary: „Zapamätaj si" / „Zapamätaj si:" / „…(štátnicové jadro)" / VERZÁLKY (`[^\n:]*:?` + flag `i`). Doplnený len ochranný komentár + vysvetlenie poradia: TPP A3–A7 majú „Zhrnutie (štátnicové jadro)" hore (odstavec) aj „Zapamätaj si" dole (zoznam) — jadro je zoznam, poradie vzorov to zabezpečuje, „Zhrnutie" ostáva zálohou.

## 2. Count — finálne 8
Dočasne nastavené 2 (rozhodnutie zo starého stavu), po korekcii vrátené na **8**. Dáta: A1–A8 všetky majú zhrnutia; extrakcia 4–8 bodov na okruh. **A1/A2 po prepise Babu: 6 a 7 bodov** (predtým 1 z 360-znakového bloku) — najslabší obsah v sieni opravený.

## 3. Pavúky TPP A6+A7 — medzera zaplnená
A6 (Obhajca × samostatné obhajovacie práva): 4 vetvy / 15 listov ✅ · A7 (Poškodený × obeť × zúčastnená osoba): 4/14 ✅. Sada A1–A8 súvislá, kvízy zachované, stromy v UI OK. **TPP nemá `_map.json` → otvára sa zoznamom (fail-soft), hry sa neponúkajú** — vyrieši mapa TPP (v pláne po vypísaní názvov A1–A8).

## Testy
Dvojica s procesným A1 → hmotné A6 + procesné A1 (pravá dvojica) ✅ · s A2 ✅ · procesný A3 mimo vtedajšieho rozsahu → doplnené z hmotného ✅ · regresie Pracovné/Občianske/TPH ✅ · konzola čistá.

## Otvorené
- **Sync ZLYHAL u Babu:** „Server nie je nakonfigurovaný (chýbajú env premenné)" — viď zadanie `claude_lexarena-sync-env-zadanie.md`.
- Nasadenie TPP A9–A30 (`claude_lexarena-tpp-A9-A30-nasadenie-zadanie.md`) + názvy A1–A8 pre mapu TPP.
