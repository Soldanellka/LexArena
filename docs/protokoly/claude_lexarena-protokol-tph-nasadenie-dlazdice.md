# LexArena — TPH pavúky + mapa nasadené, kompaktné dlaždice (protokol od Code)

> **Fáza:** dva commity lokálne — `6152528` (pavúky) a `6e19e4d` (dlaždice), push na Babu. Nadväzuje na `claude_lexarena-tph-nasadenie-dlazdice-zadanie.md`.

## 1. TPH pavúky A1–A13 + mapa
- **Cesta nasadenia: priamo do repa** (nie Firebase overridy). Dôvody: Pracovné má spider rovnako inline v `A*.json` (konzistencia); verzované a revertovateľné cez git; `spiderOverrides.js` vyhradzuje Firebase zápis pre Babu cez UI editor. **Globálny sync nespúšťaný.**
- **Súbory:** `Trestné právo hmotné/data/A1–A13.json` (pribudlo pole `spider`) + nový `.../_map.json`. Premapovanie mechanické (`name → label`, list `{name, def}` → `"Pojem – definícia"`), obsah nemenený. `theory` aj kvízy (5 otázok) vo všetkých súboroch nedotknuté.
- **Validácia 13/13** (`isValidSpider()` + `JSON.parse`):

| Okruh | Vetiev | Listov | | Okruh | Vetiev | Listov |
|---|---|---|---|---|---|---|
| A1 | 4 | 15 | | A8 | 4 | 10 |
| A2 | 5 | 19 | | A9 | 4 | 10 |
| A3 | 4 | 17 | | A10 | 4 | 8 |
| A4 | 5 | 12 | | A11 | 4 | 18 |
| A5 | 3 | 11 | | A12 | 3 | 11 |
| A6 | 4 | 12 | | A13 | 5 | 11 |
| A7 | 4 | 14 | | mapa | 7 klastrov / 13 okruhov | 9 prepojení |

- **Overenie UI skutočným preklikaním** (AREA_PATHS mieria na produkciu → fetch presmerovaný na localhost): Z1 mapa so 7 klastrami ako Pracovné ✅ · Z2 klaster ukazuje okruhy s ⇄ odznakmi (počty sedia s `links[]`) ✅ · Z3 strom (A6: 4 vetvy, listy sa vykresľujú) ✅ · „Súvisí s (2)" skáče aj s poznámkami ✅ · hry ponúknuté: Kukučka · Rozpárovanie · Recall · Blesk + „Kde som?" na mape ✅ · modul Trestného kreslí pavúk (`renderSpiderInto`, A9 overené) ✅. Snímky nekompozitujú — výstupy textom.

## 2. Kompaktné dlaždice · `6e19e4d`
`styles.css:281` tvar · `:1290` mobil

| | Pred | Po |
|---|---|---|
| Výška desktop | 168 px | **104 px** |
| Výška mobil | 74 px | 84 px |
| Ikona | 36 px nad textom | **26 px vľavo vedľa textu** (28 mobil) |
| Layout | vertikálny | ikona cez oba riadky vľavo; vpravo názov + popis |

Gradient (trojzastávkový), pulz aj vypnutý stav bez zmeny — obe témy, kaskádu nič neprebíja. Mobil zjednodušený (rovnaký tvar, iná výška/šírka). Trojica v riadku (3 × 207 × 104 při 1280). Konzola čistá.

### ⚠️ Zalamovanie — nahlásené, nerozhodnuté
Pri 1280 px sa „Spustiť pojednávanie" láme na 2 riadky (ostatné dva názvy nie). Nič nepreteká, výšky rovnaké. Možnosti, ak prekáža: skrátiť na „Pojednávanie" · font 13,5 px · menší column-gap. **Rozhodne Babu.**

## Otvorené
- Právna kontrola obsahu pavúkov — Babu (opraviteľné aj po nasadení: repo alebo editor).
- **A10 summary začína bodom 2** — pavúk kompletný, ale v appke chýba bod 1 (pojem súbehu).
- Zalamovanie „Spustiť pojednávanie" (2 riadky) — rozhodnutie Babu.
- Balans stĺpcov — rozhodnutie Babu.
- Prvé spustenie GitHub syncu (~106 overridov) — beh z admin panelu, kód bezpečný.

## Dovetok — PUSHNUTÉ
`07c600d..6e19e4d` na `origin/main` (pavúky + dlaždice). **Balans po zmenšení dlaždíc premeraný: 2 178 / 1 810 px = 120 %** (bolo 143 % — rozdiel klesol zo 774 na 368 px); kompaktné dlaždice ho stiahli späť na úroveň po presune registra, ďalej nevyrovnávané.
