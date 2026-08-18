# EÚ právo — podklady dávka 13 (A36–A38), uzavretie K7 a celej oblasti

**Autor:** Code · **Stav:** nasadené v repe, čaká na push
**Rozsah:** A36 dohody obmedzujúce súťaž · A37 zneužitie dominancie · A38 koncentrácie a štátna pomoc

> **Oblasť Európske právo je týmto kompletná — 38/38 vo všetkých vrstvách.**

---

## A36 — Dohody obmedzujúce súťaž (čl. 101 ZFEÚ)

- Pavúk: stred „Zákaz dohôd obmedzujúcich súťaž (čl. 101 ZFEÚ)", 4 vetvy (zákaz podľa ods. 1, formy dohôd, cieľ verzus následok, následky a výnimky).
- Prípady: **Consten & Grundig**, **T-Mobile**, **Cartes Bancaires** — rovnaká trojica ako predtým, prepracované texty.
- Citácia bez zmeny: `ECLI:EU:C:1966:41; ECLI:EU:C:2009:343; ECLI:EU:C:2014:2204; čl. 101 ZFEÚ`
- Drobnosť: v prípade Cartes Bancaires doplnené „P" k číslu veci (`C‑67/13 P`) — išlo o odvolanie.

## A37 — Zneužitie dominantného postavenia (čl. 102 ZFEÚ)

- Pavúk: stred „Zákaz zneužitia dominantného postavenia (čl. 102 ZFEÚ)", 5 vetiev (dominancia, osobitná zodpovednosť, vylučovacie zneužitie, vykorisťovateľské zneužitie, test a následky).
- Prípady: **United Brands**, **Hoffmann-La Roche**, **Intel** (nový).
- Vypadol: AKZO (`1991:286`).
- Citácia: `1978:22; 1979:36; 1991:286; čl. 102` → **`ECLI:EU:C:1978:22; ECLI:EU:C:1979:36; ECLI:EU:C:2017:632; čl. 102 ZFEÚ`**

## A38 — Kontrola koncentrácií a štátna pomoc

- Pavúk: stred „Kontrola koncentrácií a štátna pomoc", 5 vetiev (koncentrácie, posúdenie, pojem štátnej pomoci, výnimky a Altmark, dohľad Komisie).
- Prípady: **Continental Can** (nový), **Altmark**, **Airtours**.
- Vypadol: Leipzig-Halle (`2011:24`).
- Citácia: `T:2002:146; 2003:415; 2011:24; nariadenie 139/2004; čl. 107 – 109`
  → **`ECLI:EU:C:1973:22; ECLI:EU:C:2003:415; ECLI:EU:T:2002:146; nariadenie (ES) č. 139/2004; čl. 107 – 109 ZFEÚ`**

## Mapa

Bez zmeny. Prepojenia z dávky (36→37, 36→38, 37→38) už v mape boli.

---

## Overenie ECLI (EUR-Lex)

| judikát | ECLI | dátum | stav |
|---|---|---|---|
| C‑8/08 T-Mobile Netherlands | `2009:343` | 4. 6. 2009 | ✔ cross-check potvrdený |
| C‑280/00 Altmark Trans | `2003:415` | 24. 7. 2003 | ✔ cross-check potvrdený |
| T‑342/99 Airtours | `T:2002:146` | 6. 6. 2002 | ✔ cross-check potvrdený, Všeobecný súd (rozšírená päťčlenná komora) |
| C‑413/14 P Intel | `2017:632` | 6. 9. 2017 | ✔ potvrdené, veľká komora |
| 6/72 Continental Can | `1973:22` | 21. 2. 1973 | ✔ potvrdené |

---

# Záverečná kontrola celej oblasti

Prebehla nad živými dátami cez všetkých 38 súborov aj mapu. **Chyby: 0.**

## Čo sa kontrolovalo

| kontrola | výsledok |
|---|---|
| Parsovanie JSON, `id`, `title`, `summary` | 38/38 ✔ |
| Kvíz: 5 otázok, 4 možnosti, `correct` v rozsahu, `explanation` reťazec, žiadne duplicitné možnosti | **190 otázok** ✔ |
| Prípady: počet podľa okruhu (2 pre A1–A8, 3 pre A9–A38), 2 kroky, scenárový krok bez možností, objekt `explanation`, `source` v každom kroku | **106 prípadov** ✔ |
| `difficulty` = „stredná" | 106/106 ✔ |
| Pavúky podľa `isValidSpider()` | **38/38** ✔ |
| Dlaždice: `term` + `definition` | 38/38 ✔ |
| Koreňová citácia vs. ECLI použité v prípadoch | zhoda vo všetkých 38 ✔ |
| Opakovanie judikatúry (limit 2×) | **žiadny nad 2×** ✔ |
| Mapa: klastre, pokrytie, väzby | 7 klastrov, 38/38, 42 väzieb, 0 zlomených ✔ |

## Čísla

- **190** kvízových otázok · **106** prípadových štúdií · **212** krokov s citáciou
- **38** pavúkov, **195** vetiev, **683** listov
- **79** rôznych judikátov, žiadny viac než 2×
- Mapa: 7 klastrov — vznik a členstvo (3), inštitúcie (7), právny poriadok (9), súdna ochrana (6), vnútorný trh (6), MPS (4), súťažné právo (3)

---

## Jedno otvorené — tvoje texty

Zoznamy judikatúry v `summary` posledných troch okruhov menujú aj prípady, ktoré nie sú nasadené ako prípadové štúdie:

- A36: *Consten & Grundig, IAZ, T-Mobile Netherlands, Allianz Hungária, Cartes Bancaires*
- A37: *United Brands, Hoffmann-La Roche, Michelin, AKZO, Intel, Google Shopping*
- A38: *Airtours, Continental Can, Altmark, Leipzig-Halle, Eventech*

Na rozdiel od A32–A34 tu **nejde o chyby** — všetky menované rozsudky sú v danej oblasti relevantné a Michelin je aj v pavúku A37. Zadanie zladenie summary pre túto dávku nežiadalo, tak som ich nechal tak. Ak chceš rovnaký rez ako v dávke 12 (nechať len nasadené prípady), je to jeden priechod — povedz.

---

## Stav oblasti

| klaster | okruhy | stav |
|---|---|---|
| K1 vznik a členstvo | A1–A3 | ✔ |
| K2 inštitúcie | A4–A10 | ✔ |
| K3 právny poriadok | A11–A18, A25 | ✔ |
| K4 súdna ochrana | A19–A24 | ✔ |
| K5 vnútorný trh | A26–A31 | ✔ |
| K6 medzinárodné právo súkromné | A32–A35 | ✔ |
| K7 súťažné právo | A36–A38 | ✔ |

**Európske právo: 38/38 hotové.**
