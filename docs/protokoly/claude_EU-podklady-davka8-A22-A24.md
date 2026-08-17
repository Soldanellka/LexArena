# EÚ právo — podklady dávka 8 (A22–A24), uzavretie klastra K4

**Autor:** Code · **Stav:** nasadené v repe, čaká na push
**Rozsah:** A22 fakultatívne a obligatórne prejudiciálne otázky · A23 konanie o nesplnení povinnosti · A24 neplatnosť aktu a nečinnosť
**Plus:** mikroúprava A5 (bod 0 zadania)

---

## 0. A5 — dokončenie prechodu na Roquette Frères

V dávke 7 (`f5776b7`) sa vymenil prípad, ale pavúk a summary ešte niesli C‑409/13. Doriešené:

- Pavúk, vetva „Judikatúra": `C-409/13 – inštitucionálna rovnováha v legislatívnom postupe` → **`Roquette Frères (138/79) – povinná konzultácia Parlamentu`**
- Summary, tri miesta: výkladový odsek, blok „Zapamätaj si" a zoznam zdrojov — všade C‑409/13 → **138/79 (Roquette Frères v Rada)**, s vysvetlením, že konzultácia je podstatnou formálnou náležitosťou.

A5 už na C‑409/13 neodkazuje nikde. A10 sa podľa zadania nemenilo.

---

## A22 — Fakultatívne a obligatórne prejudiciálne otázky

- Pavúk: stred „Fakultatívne a obligatórne prejudiciálne otázky", 4 vetvy (fakultatívne podľa ods. 2, obligatórne podľa ods. 3 s tromi výnimkami, neplatnosť aktu, dôsledky nepoloženia).
- Prípady: **Köbler**, **Da Costa** (acte éclairé), článkový scenár o rozdiele medzi ods. 2 a ods. 3.
- **CILFIT a Foto-Frost už nie sú prípadmi** — ostávajú v pavúku a v kvíze. Tým CILFIT klesol na povolené 2×.
- Citácia: `1982:335; 1987:452; 2003:513; čl. 267` → **`ECLI:EU:C:2003:513; ECLI:EU:C:1963:6; čl. 267 ZFEÚ`**

## A23 — Konanie o nesplnení povinnosti členského štátu

- Pavúk: stred „Konanie o nesplnení povinnosti (čl. 258 – 260 ZFEÚ)", 5 vetiev (žalobca, predbežná fáza, súdna fáza, sankčná fáza, dôsledky pre štát).
- Prípady: **C‑304/02** (prvý raz paušál aj penále súčasne), **Kouroupitos** (prvé penále vôbec), **Francovich**.
- Citácia bez zmeny: `ECLI:EU:C:2005:444; ECLI:EU:C:2000:356; ECLI:EU:C:1991:428; čl. 258 – 260 ZFEÚ` — konsolidovaná verzia prevzala opravu na Kouroupitos z dávky 9, takže sedí.

## A24 — Neplatnosť aktu a nečinnosť inštitúcie

- Pavúk: stred „Žaloba o neplatnosť a žaloba na nečinnosť", 4 vetvy (dôvody a lehota podľa čl. 263, kategórie žalobcov, nečinnosť podľa čl. 265, účinky rozsudku podľa čl. 264 a 266).
- Prípady: **Plaumann**, **UPA**, **T. Port**.
- Citácia bez zmeny: `ECLI:EU:C:1963:17; ECLI:EU:C:2002:462; ECLI:EU:C:1996:452; čl. 263 – 266 ZFEÚ` — opravy UPA a T. Port z dávky 9 tu už boli.

## Mapa

Doplnené štyri chýbajúce väzby z „Prepojení" tejto dávky:

| väzba | poznámka |
|---|---|
| 22 → 25 | Acte clair a acte éclairé × judikatúra ako prameň |
| 22 → 23 | Nepoloženie prejudiciálnej otázky × konanie o nesplnení povinnosti |
| 23 → 24 | Nesplnenie povinnosti štátom × žaloby proti inštitúciám |
| 24 → 20 | Žaloba o neplatnosť × konanie pred Súdnym dvorom |

Ostatné (21→22, 3→23, 7→23, 4→24) už v mape boli. Mapa teraz: 7 klastrov, pokrytie 38/38, **42 väzieb**, žiadna zlomená ani duplicitná.

---

## Overenie ECLI

| judikát | ECLI | dátum | stav |
|---|---|---|---|
| 28 – 30/62 Da Costa | `1963:6` | 27. 3. 1963 | ✔ potvrdené na EUR-Lexe (spojené veci 28 až 30-62) |
| C‑224/01 Köbler | `2003:513` | — | ✔ v repe, nezmenené |
| C‑304/02 Komisia v Francúzsko | `2005:444` | — | ✔ v repe, nezmenené |
| C‑387/97 Kouroupitos | `2000:356` | 4. 7. 2000 | ✔ overené v dávke 9 |
| C‑50/00 P UPA | `2002:462` | 25. 7. 2002 | ✔ overené v dávke 9 |
| C‑68/95 T. Port | `1996:452` | 26. 11. 1996 | ✔ overené v dávke 9 |

---

## Kontrola všetkých 38 súborov

**Chyby: 0.** Kvízy (5 × 4 možnosti, `correct` v rozsahu, `explanation` reťazec), prípady (počet podľa okruhu, scenárový krok s `options: []`, otázkový krok s objektom `explanation`, `source` v každom kroku), pavúky, dlaždice, `zdroj` — všetko bez nálezu.

- **`difficulty` je „stredná" vo všetkých prípadoch všetkých 38 okruhov** — posledná výnimka (A10 Prípad 3) padla tvojím commitom `d3ba856`.
- Koreňová citácia vs. ECLI použité v prípadoch: zhoda vo všetkých 38 okruhoch.
- Pavúky: **28/38**. Chýba 10: A29–A38.
- `source` bez ECLI len tam, kde je to zámerné (čl. 258, 294, 24, 49, 6 ods. 3, 288, 19, 267, 263, 26 a Protokol č. 3).

## Opakovanie judikatúry

**CILFIT `1982:335` klesol na 2× (A16, A25)** — presne ako predpokladalo zadanie.

Nad limitom ostáva už len jeden judikát:

| judikát | počet | okruhy |
|---|---|---|
| C‑399/11 Melloni `2012:756` | 3× | A6, A13, **A31** — padne v dávke 10 |

Všetko ostatné je na 2× alebo menej.

---

## Stav klastrov

| klaster | okruhy | stav |
|---|---|---|
| K1 – K4 | A1–A25 | **kompletné** |
| K5 | A26–A31 | A26–A28 hotové, A29–A31 zostáva (dávka 10) |
| K6 | A32–A35 | zostáva |
| K7 | A36–A38 | zostáva |
