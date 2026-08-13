# Európske právo — podklady, dávka 4: A11–A13 (začiatok klastra K3)

**Fáza:** nasadené, commit lokálny · Pramene práva: právny poriadok a prednosť · priamy a nepriamy účinok · primárne právo

## Čo sa nasadilo

| okruh | pavúk | kvíz | prípady |
|---|---|---|---|
| **A11** Právny poriadok EÚ, prednosť | 5 vetiev / 17 listov | 5, nahradených | 3 — Costa/ENEL, Simmenthal, Internationale Handelsgesellschaft |
| **A12** Priamy a nepriamy účinok | 5 / 15 | 5, nahradených | 3 — Van Gend en Loos, Marleasing, Faccini Dori |
| **A13** Primárne právo | 6 / 18 | 5, nahradených | 3 — Pringle, Wightman, zmluva o pristúpení |

Stav oblasti: **13 / 38 pavúkov**. Summary a dlaždice nedotknuté.

## Root citácie — všetky tri niesli judikát, ktorý sa v okruhu nikde nepoužíval

Zadanie predpísalo nové citácie a pri porovnaní s pôvodnými vyšlo najavo, že v každom z troch okruhov visel ECLI bez väzby na obsah:

| okruh | bolo | je |
|---|---|---|
| A11 | `1964:66; 1978:49; **2013:107**; čl. 7 ods. 2 Ústavy SR; čl. 288 – 294 ZFEÚ` | `1964:66; 1978:49; **1970:114**; čl. 7 ods. 2 Ústavy SR; čl. 288 ZFEÚ` |
| A12 | `1963:1; **1984:153**; 1990:395; čl. 267 ZFEÚ; čl. 7 ods. 2 Ústavy SR` | `1963:1; **1994:292**; 1990:395; čl. 267 a 288 ZFEÚ; čl. 7 ods. 2 Ústavy SR` |
| A13 | `2012:756; 2018:999; **1999:574**; čl. 48 ZEÚ; čl. 49 ZEÚ` | `2012:756; 2018:999; čl. 48, 49 a 50 ZEÚ` |

`2013:107` v A11 a `1999:574` v A13 nemali v okruhu žiadny prípad ani otázku; `1984:153` (Von Colson) v A12 síce k téme patrí, ale prípad na ňom postavený nie je — nahradil ho Faccini Dori, ktorý prípad má. Rozsah `čl. 288 – 294 ZFEÚ` v A11 som zúžil na `čl. 288`, keďže čl. 289 – 294 sú legislatívne postupy, teda okruh A10.

## Štátnicové podklady

### A11 — Právny poriadok EÚ, prednosť
**Téma:** EÚ ako autonómny právny poriadok s prednosťou pred vnútroštátnym právom; ukotvenie v SR.
**Kľúčové body:** autonómny poriadok — Van Gend (priamy účinok), Costa/ENEL (prednosť) · pramene a účinok aktov (čl. 288) · prednosť pred všetkými normami vrátane ústavných (IHG), Simmenthal (neuplatnenie), Melloni · prednosť nie je v texte zmlúv → Vyhlásenie č. 17 · SR: čl. 7 ods. 2 Ústavy, prejudiciálna otázka.
**Doplňujúce otázky:** kde je prednosť zakotvená · vzťahuje sa aj na ústavu · čo musí urobiť súd pri konflikte.
**Časté chyby:** tvrdiť, že prednosť je výslovne v zmluvách · zamieňať priamy účinok a prednosť · pri SR tvrdiť, že čl. 7 ods. 2 dáva prednosť pred ústavou (hovorí o zákonoch).

### A12 — Priamy a nepriamy účinok, aplikácia súdmi
**Téma:** ako sa právo EÚ dovoláva a uplatňuje pred vnútroštátnymi súdmi.
**Kľúčové body:** priamy účinok (Van Gend) — jasné, presné, bezpodmienečné · nariadenia a niektoré ustanovenia zmlúv; smernice len vertikálne, nie horizontálne (Faccini Dori) · nepriamy účinok = eurokonformný výklad (Von Colson, Marleasing); Francovich · aplikácia súdmi: Simmenthal, prejudiciálna otázka (čl. 267).
**Doplňujúce otázky:** podmienky priameho účinku · majú smernice horizontálny účinok · čo je nepriamy účinok.
**Časté chyby:** priznať smerniciam horizontálny priamy účinok · zamieňať priamy a nepriamy účinok · tvrdiť, že nariadenie treba transponovať.

### A13 — Primárne právo EÚ
**Téma:** čo tvorí primárne právo, ako sa mení a publikuje, a čo sú zmluvy o pristúpení.
**Kľúčové body:** zloženie (zmluvy + Charta + protokoly + zmluvy o pristúpení + zásady) · najvyššia právna sila · revízia čl. 48 (riadny vs. zjednodušený, čl. 48 ods. 6) — Pringle · zmluvy o pristúpení (čl. 49); vystúpenie (čl. 50, Wightman).
**Doplňujúce otázky:** čo patrí do primárneho práva · dva revízne postupy · sú zmluvy o pristúpení primárne právo (áno).
**Časté chyby:** zaradiť nariadenia či smernice do primárneho práva · tvrdiť, že zjednodušená revízia nepotrebuje súhlas štátov · zabudnúť Chartu.

## Overenie

Prešiel som **všetkých 38 okruhov**, nielen dotknuté:

- kvízy 5 otázok × 4 možnosti, každá s vysvetlením a `correct` v rozsahu
- prípady 2 pri A1–A8 a 3 pri A9–A38; každý krok má `question` aj `source`; `explanation` v otázkových krokoch je objekt `{correct, wrong}`, `difficulty` je „stredná" alebo „ľahká"
- **13/13 pavúkov prejde `isValidSpider`**
- stromy sa v UI kreslia (A11 5/17, A12 5/15, A13 6/18), živá cesta prípadov cez `loadCasesFromJson()` overená na A11 („Prípad 1 / 3"), konzola čistá
- žiadna chyba naprieč oblasťou

## Poznámka k obsahu

Pasca, ktorú si pri K3 čakala, sa tentoraz v kvízoch neobjavila — pôvodné otázky A11–A13 boli síce plytké („ktorý článok upravuje…"), ale nie nesprávne. Chybné odkazy boli tentoraz v **root citáciách**, nie v otázkach.

A13 má teraz Wightman aj v prípade aj v A1 — v A1 ako prípad k členstvu a vystúpeniu, v A13 ako prípad k revízii a čl. 50. Je to zámerné prekrytie dvoch pohľadov na ten istý rozsudok, rovnako ako dvakrát Pringle v A6.

## Ďalej

Dávka 5: A14–A16 (Charta · všeobecné zásady a medzinárodné dohody · sekundárne právo).
