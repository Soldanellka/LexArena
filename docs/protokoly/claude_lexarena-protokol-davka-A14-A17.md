# LexArena — nasadenie dávky A14–A17 (protokol od Code)

> **Fáza:** commit `9ab25a7`, **pushnuté** (`0cd270d..9ab25a7`). TPH má 17 pavúkov a mapu s 9 klastrami. Nadväzuje na `claude_lexarena-davka-A14-A17-nasadenie-zadanie.md`.

## Pavúky — nasadené bez zásahu do obsahu
Boli vo formáte appky → len validácia a vloženie do `A14–A17.json`.

| Okruh | Vetiev | Listov | isValidSpider |
|---|---|---|---|
| A14 | 4 | 15 | ✅ |
| A15 | 3 | 11 | ✅ |
| A16 | 4 | 14 | ✅ |
| A17 | 4 | 14 | ✅ |

Všetkých 17 okruhov prejde validáciou; `theory` aj kvízy (5 otázok) nedotknuté.

## Mapa — 7 → 9 klastrov, 9 → 15 prepojení
A14 → `pachatel-a-sucinnost`, A15 → `sankcie`, nové `europsky-rozmer` [16] a `osobitna-cast` [17]; 6 nových links. Kontroly integrity: okruhy 1–17 v mape práve raz, unikátne id, žiadny link mimo mapy.

## Overené v UI
Mapa TPH: 9 klastrov · „Osobitná časť" → A17 s odznakom ⇄ 2, strom Vražda · Úkladná vražda · Usmrtenie · Porovnanie s ▸(4)(4)(3)(3) · „Súvisí s (2)" skáče na A3 a A6 s poznámkami. Konzola čistá.

## Zámerne neurobené / otvorené
- `CRIMINAL_HMOTNE_COUNT` ponechaný na 13 — zdvihnutie mení, na čo sa štátnica pýta (rozhodnutie Babu). **Pozn.: zadanie dávky A18–A21 obsahuje zdvihnutie rovno na 21.**
- Časť 3 (štátnicové podklady) ostáva u Babu — appka pre otázky/chyby/vodítka nemá miesto.
- Garantská kontrola: zákon 167/2026 (A16) · §§ 161, 166 (A17) · právne prečítanie A1–A13 · bod 1 v A10 · **§§ v A18–A21** (viď upozornenie v dávke).
- Prvý GitHub sync — overridov je už ~110.
