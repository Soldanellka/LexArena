# Európske právo — podklady, dávka 5: A14–A16 (klaster K3)

**Fáza:** nasadené, commit lokálny · Charta · všeobecné zásady a medzinárodné dohody · sekundárne právo

## Čo sa nasadilo

| okruh | pavúk | kvíz | prípady |
|---|---|---|---|
| **A14** Základné práva, Charta, vzťah k Dohovoru | 6 vetiev / 23 listov | 5, nahradených | 3 — Åkerberg Fransson, stanovisko 2/13, Google Spain |
| **A15** Všeobecné zásady, medzinárodné dohody | 6 / 22 | 5, nahradených | 3 — všeobecné zásady, Front Polisario, stanovisko 1/91 |
| **A16** Sekundárne právo | 5 / 15 | 5, nahradených | 3 — C‑81/13, Skoma-Lux, CILFIT |

Stav oblasti: **16 / 38 pavúkov**. Summary a dlaždice nedotknuté.

## Root citácie — opäť to bolo slabé miesto

Pravidlo z tejto dávky („len ECLI reálne použitých prípadov + kľúčové články") sa ukázalo ako potrebné. Pôvodné citácie v A15 a A16 neobsahovali **ani jeden** ECLI, ktorý by v okruhu na niečo odkazoval:

| okruh | bolo | je |
|---|---|---|
| A14 | `2013:105; 2014:317; 2014:2454; čl. 6 ZEÚ; čl. 51 – 52 Charty` | `2013:105; 2014:2454; 2014:317; čl. 6 ZEÚ; čl. 51 a 52 Charty` — len preusporiadané do poradia prípadov |
| A15 | `2006:491; 2009:624; **2017:703**; čl. 216 – 218 ZFEÚ` | `2016:973; 1991:490; čl. 6 ods. 3 ZEÚ; čl. 216 – 218 a 351 ZFEÚ` |
| A16 | `2004:584; 2015:84; **2023:123**; čl. 288 ZFEÚ` | `2014:2449; 2007:773; 1982:335; čl. 288, 296 a 297 ZFEÚ` |

V A15 aj A16 boli teda všetky tri ECLI nahradené — žiadny z pôvodných nezodpovedal ani prípadu, ani judikatúre v pavúku. A14 bola jediná, kde ECLI sedeli; zmenilo sa len poradie a zápis rozsahu článkov Charty.

## Štátnicové podklady

### A14 — Základné práva, Charta, vzťah k Dohovoru
**Téma:** Charta ako záväzný katalóg základných práv; jej pôsobnosť a vzťah k Dohovoru.
**Kľúčové body:** vyhlásená 2000, záväzná od Lisabonu 2009, rovnaká sila ako zmluvy (čl. 6 ods. 1 ZEÚ) · pôsobnosť len pri vykonávaní práva EÚ (čl. 51) — Åkerberg Fransson · vzťah k EDĽP (čl. 52 ods. 3), EÚ zatiaľ nepristúpila (stanovisko 2/13) · autonómny výklad, zohľadňuje ESĽP.
**Doplňujúce otázky:** odkedy je Charta záväzná · kedy sa uplatňuje na členské štáty · je EÚ stranou EDĽP.
**Časté chyby:** tvrdiť, že Charta platí na všetky vnútroštátne situácie · zamieňať Chartu (EÚ) a EDĽP (Rada Európy) · tvrdiť, že EÚ už pristúpila.

### A15 — Všeobecné zásady, medzinárodné dohody
**Téma:** všeobecné zásady ako nepísaný prameň s rangom primárneho práva; medzinárodné dohody Únie a členských štátov.
**Kľúčové body:** pramene a výpočet zásad, rang primárneho práva · medzinárodné dohody Únie (čl. 216–218): záväznosť, hierarchia nad sekundárnym a pod primárnym · dohody štátov: súlad s právom EÚ, výlučné vs. zdieľané, čl. 351 · judikatúra Front Polisario, stanovisko 1/91.
**Doplňujúce otázky:** odkiaľ Súdny dvor odvodzuje zásady · postavenie medzinárodnej dohody v hierarchii · môže štát uzavrieť dohodu vo výlučnej právomoci.
**Časté chyby:** zaradiť medzinárodné dohody nad primárne právo · tvrdiť, že zásady majú len silu sekundárneho práva · pri výlučných právomociach dovoliť štátom konať samostatne.

### A16 — Sekundárne právo EÚ
**Téma:** triedenie aktov, ich právny základ, publikácia a jazykový režim.
**Kľúčové body:** typy aktov (čl. 288), záväzné vs. nezáväzné · právny základ a odôvodnenie (čl. 296), preskúmateľnosť voľby (C‑81/13) · publikácia (Úradný vestník, séria L; čl. 297) · jazykový režim (rovnako autentické; Skoma-Lux, CILFIT).
**Doplňujúce otázky:** typy aktov podľa čl. 288 · čo ak akt nebol uverejnený v jazyku štátu · ako sa rieši rozdiel medzi jazykovými verziami.
**Časté chyby:** tvrdiť, že odporúčania sú záväzné · zabudnúť na povinný právny základ · tvrdiť, že rozhoduje jedna jazyková verzia.

## Overenie

Prešiel som **všetkých 38 okruhov**, nielen dotknuté:

- kvízy 5 otázok × 4 možnosti, každá s vysvetlením a `correct` v rozsahu
- prípady 2 pri A1–A8 a 3 pri A9–A38; každý krok má `question` aj `source`; `explanation` v otázkových krokoch je objekt `{correct, wrong}`
- **16/16 pavúkov prejde `isValidSpider`**
- stromy sa v UI kreslia (A14 6/23, A15 6/22, A16 5/15), živá cesta prípadov overená na A16 („Prípad 1 / 3"), konzola čistá
- žiadna chyba naprieč oblasťou

## Poznámka k obsahu

**A15 Prípad 1 je jediný prípad v celej oblasti bez judikátu aj bez konkrétneho článku ZFEÚ** — `source` je `čl. 6 ods. 3 ZEÚ` a scenár je hypotetický. Funguje to a schéma to dovoľuje (rovnako ako A7 Prípad 1 na čl. 258 alebo A10 Prípad 3 na čl. 24 ZEÚ), len nech je to vedomé: okruh o všeobecných zásadách ilustruje zásady bez rozsudku, hoci by sa ponúkalo napríklad niečo k legitímnym očakávaniam.

**A16 a A8 zdieľajú prípad C‑81/13** — v A8 ako voľba právneho základu aktu Rady, v A16 ako právny základ sekundárneho aktu. Rovnaké zámerné prekrytie ako Pringle v A6/A13 a Wightman v A1/A13.

## Ďalej

Dávka 6 (posledná K3): A17 (nariadenie) · A18 (smernica) · A25 (judikatúra ako prameň, metódy výkladu).
