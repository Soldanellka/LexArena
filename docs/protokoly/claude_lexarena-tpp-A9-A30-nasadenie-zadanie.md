# LexArena — nasadenie TPP pavúkov A9–A30 + count (zadanie pre Code)

> **Zdroj:** `claude_TPP-pavuky-A9-A30.md` (22 pavúkov, formát appky; sporné §§ zámerne vynechané — viď poznámky pre Babu v podklade). Pravidlá platia (commit + protokol, push na Babu, nič cez globálny sync).

## Úlohy
1. **Pavúky do repa:** `spider` do `Trestné právo procesné/data/A9–A30.json` (cestu over podľa A1–A8). Vlož + `isValidSpider()` 22/22; theory/quiz nedotknuté. TPP sada bude kompletná 30/30.
2. **Summary a count:** over, ktoré TPP okruhy majú zhrnutie vo Firebase (Babu ukladá texty A9–A30 do appky; A1/A2 opravené na zoznam pomlčiek). Nastav `CRIMINAL_PROCESNE_COUNT` na **najvyššie súvislé pokrytie** (ideálne 30) a nahlás per-okruh extrakciu (tolerantný regex „Zapamätaj si" už chytá aj holé nadpisy). Ak niektorý okruh zhrnutie ešte nemá, count zastav pred ním a vypíš, čo chýba.
3. **TPP mapa klastrov (voliteľné, nahlás podklady):** TPP zatiaľ nemá `_map.json` → otvára sa stromom. Vypíš **názvy okruhov A1–A8** (tie nepoznám) — navrhnem klastre + prepojenia pre celú mapu TPP v ďalšom kroku, Babu odsúhlasí, nasadíš.
4. **Regresia:** TPH nedotknuté (30/30, mapa 13 klastrov) · sieň Pracovné/Občianske bez zmeny · pri plnom TPP counte over v sieni jednu skúšku Trestného: dvojica hmotné + procesné z reálnych zhrnutí.

## Protokol
Commit + `súbor:riadok` · validácia 22/22 · tabuľka: okruh → summary áno/nie → počet extrahovaných bodov · finálny count · názvy TPP A1–A8 · regresie · otvorené otázky.
