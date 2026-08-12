# Európske právo — podklady, dávka 1: mapa klastrov + A1–A3

**Fáza:** nasadené, commit lokálny · Staviame na zauditovaných summary A1–A38 · **Pravidlo čísel:** v pavúkoch aj kvíze len overené čísla; sporné sa vynechávajú, nie hádajú

## Východiskový stav (pred dávkou)

Európske právo bolo jediná oblasť **úplne bez pavúkov a bez mapy**:

| vrstva | stav pred | stav po dávke 1 |
|---|---|---|
| `spider` | **0 / 38** | **3 / 38** (A1, A2, A3) |
| `_map.json` | **neexistuje** → oblasť sa otvárala núdzovým plochým zoznamom | **nasadená, 7 klastrov / 34 prepojení, pokrytie 38/38** → oblasť sa otvára mapou Z1 → Z2 → Z3 |
| summary | 38/38 | nedotknuté |
| kvíz | 5 otázok / okruh, kľúč `q`, `explanation` ako string | nedotknuté (viď nižšie) |
| tiles | 5 / okruh | nedotknuté |
| cases | 2 pri A1–A8, 3 pri A9–A38 | nedotknuté |
| Firebase overridy mimo summary | žiadne | žiadne — repo je jediný zdroj, nič nekoliduje |

## Mapa klastrov

Nasadená podľa zadania. Klastre 1:1, prepojenia doplnené o textové `note` (zobrazujú sa v sekcii „Súvisí s").

| klaster | okruhy |
|---|---|
| Vznik, členstvo a povaha Únie | 1–3 |
| Inštitúcie a tvorba práva Únie | 4–10 |
| Právny poriadok a pramene práva EÚ | 11–18, 25 |
| Súdna ochrana a konania pred SDEÚ | 19–24 |
| Vnútorný trh a štyri slobody | 26–31 |
| Medzinárodné právo súkromné EÚ | 32–35 |
| Súťažné právo EÚ | 36–38 |

**Kontrola integrity:** pokrytie 38/38, žiadny okruh navyše ani dvakrát, 0 self-linkov, 0 duplicitných hrán, každá hrana má poznámku, oba konce ležia v klastroch.

### Dve odchýlky oproti zadaniu — nemenil som, len hlásim

1. **Prepojení je 34, nie 24.** Zadanie uvádza v hlavičke „24 prepojení", ale vymenovaný zoznam ich obsahuje 34 (samotné skupinové riadky dávajú 5 + 4 + 3 = 12 hrán). Nasadil som všetkých 34 podľa zoznamu — ten považujem za záväzný, číslo v hlavičke za preklep.
2. **A13 (primárne právo) nemá ani jednu hranu.** V klastri je, mapa je platná, len sekcia „Súvisí s" mu ostane prázdna. Pavúky A1 a A3 pritom v „prepojeniach" A13 spomínajú — do globálneho zoznamu sa nedostalo. Ponúkajú sa hrany A13–A11 (primárne právo × právny poriadok) a A13–A1 (zmluvná základňa), ale nedopĺňal som ich bez tvojho slova.

## Pavúky A1–A3

Namapované 1:1 z mind mapy do repo formátu `{center, branches:[{label, leaves[]}]}`.

| okruh | centrum | vetiev / listov |
|---|---|---|
| **A1** | Vývoj zmluvnej základne a členstvo v EÚ | 7 / 21 |
| **A2** | Občianstvo Únie, hodnoty a demokratické zásady | 5 / 19 |
| **A3** | Právomoci Únie a zásady ich výkonu | 6 / 15 |

Riadok „prepojenia" z mind mapy som do pavúka nedával — to je práve to, čo rieši `_map.json` cez `links`, aby sa údaj neduplikoval na dvoch miestach.

## Štátnicové podklady

Uložené v tomto súbore v plnom znení tak, ako prišli.

### A1 — Vývoj zmluvnej základne a členstvo v EÚ
**Téma:** postupné prehlbovanie integrácie od sektorových spoločenstiev po Úniu s právnou subjektivitou; podmienky a postup členstva a vystúpenia.
**Kľúčové body:** tri zakladajúce zmluvy a roky — Paríž 1951 (ESUO), Rím 1957 (EHS + Euratom) · míľniky JEA 1986 → Maastricht 1992/93 → Amsterdam → Nice → Lisabon 2007/09 · Lisabon zrušil piliere, dal EÚ právnu subjektivitu a Charte záväznosť · členstvo čl. 49 ZEÚ (európsky štát, hodnoty čl. 2, kodanské kritériá, acquis; Rada jednomyseľne + súhlas EP; Európska rada – status kandidáta; prístupovú zmluvu ratifikujú všetky štáty) · vystúpenie čl. 50 ZEÚ, oznámenie sa dá jednostranne vziať späť (Wightman).
**Doplňujúce otázky:** Kto a akou väčšinou rozhoduje o prijatí? (Rada jednomyseľne, nie Európska rada.) · Čo priniesol Lisabon oproti Maastrichtu? · Aké sú kodanské kritériá? · Dá sa oznámenie o vystúpení vziať späť?
**Časté chyby:** zámena Rada × Európska rada pri prijímaní · „Európska rada mení zmluvy sama" (treba ratifikáciu všetkými štátmi) · miešanie rokov podpisu a účinnosti.

### A2 — Občianstvo Únie, hodnoty a demokratické zásady
**Téma:** občianstvo EÚ ako nadstavba nad štátnym; hodnoty ako podmienka členstva a ich vynútenie; demokratický rozmer Únie.
**Kľúčové body:** občianstvo čl. 20 ZFEÚ – dopĺňa štátne, je od neho odvodené · práva občana čl. 20–24 ZFEÚ · hodnoty čl. 2 ZEÚ + sankčný mechanizmus čl. 7 · demokratické zásady čl. 9–12 ZEÚ · judikatúra: občianstvo = základný status.
**Doplňujúce otázky:** Môže existovať občianstvo EÚ bez štátneho? (Nie.) · Čo pri závažnom porušení hodnôt? (Čl. 7.) · Kde presne sú demokratické zásady? (Čl. 9–12, nie 10–12.)
**Časté chyby:** uvádzať demokratické zásady ako „čl. 10–12" · zamieňať čl. 7 s čl. 258 · tvrdiť, že Charta je zdrojom občianstva.

### A3 — Právomoci Únie a zásady
**Téma:** ako sa vymedzujú a vykonávajú právomoci Únie a tri zásady, ktoré kontrolujú jej konanie.
**Kľúčové body:** zverenie právomocí (čl. 5 ods. 2) · tri kategórie — výlučné (čl. 3), zdieľané (čl. 4), podporné (čl. 6) ZFEÚ · subsidiarita (čl. 5 ods. 3) + proporcionalita (čl. 5 ods. 4) + lojálna spolupráca (čl. 4 ods. 3) · kontrola subsidiarity národnými parlamentmi, žltá/oranžová karta (Protokol č. 2).
**Doplňujúce otázky:** rozdiel subsidiarita × proporcionalita · kde sa subsidiarita uplatňuje a kde nie · príklad výlučnej a zdieľanej právomoci · čo znamená negatívna zložka lojality.
**Časté chyby:** zamieňať subsidiaritu (či konať) a proporcionalitu (ako intenzívne) · uplatňovať subsidiaritu na výlučné právomoci · zabudnúť na zverenie ako východiskovú zásadu.

## Kvízová sada — dodaná, zatiaľ nenasadená

Kvízové otázky z dávky sú nižšie v plnom znení. **Do `quiz` polí som ich nevložil** a dôvod je vecný, nie opatrnícky:

Každý okruh EÚ už má **5 otázok** (rovnaká konvencia ako všetky ostatné oblasti). Nové otázky sú 4 na okruh a čiastočne sa s existujúcimi prekrývajú. Sú tri možné cesty a každá dá iný výsledok, preto rozhodnutie nechávam na garanta:

1. **Nahradiť** existujúcich 5 novými 4 → okruh by mal 4 otázky, EÚ by sa vymykala konvencii
2. **Doplniť** → 9 otázok na okruh, s prekryvmi
3. **Nechať ako doplňujúce otázky** v štátnicovej sieni, `quiz` bez zmeny

### ⚠️ Jedna vec sa nedala nechať tak — opravená na pokyn garanta

**A2, existujúca otázka č. 4 učila opak podkladu.** V repe bolo:

> „Ktorý článok upravuje demokratické zásady fungovania Únie?" → správna odpoveď **„Čl. 10 – 12 ZEÚ"**, vysvetlenie *„Demokratické zásady sú upravené v čl. 10 – 12 ZEÚ."*

Presne tá pasca, ktorú podklad menuje medzi častými chybami („chýba čl. 9 – rovnosť občanov"). Opravené na **čl. 9 – 12 ZEÚ**; „čl. 10 – 12" zostalo ako distraktor a vysvetlenie teraz rozpisuje všetky štyri články. To isté číslo nieslo aj `tiles[2].definition` a `zdroj.citation` — obe zladené. Summary A2 malo čl. 9 – 12 správne už predtým, rozchádzali sa len tieto tri miesta.

### A1
1. Ktorý orgán rozhoduje o prijatí nového členského štátu podľa čl. 49 ZEÚ? — A) Európska rada jednomyseľne · **B) Rada jednomyseľne po súhlase Európskeho parlamentu ✓** · C) Komisia · D) Európsky parlament dvojtretinovou väčšinou
2. Ktorá zmluva vytvorila Európsku úniu a pilierovú štruktúru? — A) Rímska (1957) · B) Jednotný európsky akt (1986) · **C) Maastrichtská (1992) ✓** · D) Lisabonská (2007)
3. Čo NEpriniesla Lisabonská zmluva? — A) Zrušenie pilierovej štruktúry · B) Právnu subjektivitu EÚ · C) Záväznosť Charty · **D) Zavedenie spoločnej meny euro ✓**
4. Vystúpenie z EÚ upravuje: — A) čl. 7 ZEÚ · B) čl. 49 ZEÚ · **C) čl. 50 ZEÚ ✓** · D) čl. 2 ZEÚ

### A2
1. Občianstvo Únie podľa čl. 20 ZFEÚ: — A) nahrádza štátne · **B) dopĺňa štátne, nenahrádza ho ✓** · C) existuje nezávisle · D) udeľuje sa na žiadosť
2. Hodnoty Únie sú zakotvené v: — **A) čl. 2 ZEÚ ✓** · B) čl. 2 ZFEÚ · C) čl. 51 Charty · D) čl. 20 ZFEÚ
3. Demokratické zásady Únie sú upravené v: — A) čl. 10–12 ZEÚ · **B) čl. 9–12 ZEÚ ✓** · C) čl. 2 ZEÚ · D) čl. 13–19 ZEÚ
4. O závažnom a pretrvávajúcom porušení hodnôt rozhoduje podľa čl. 7 ZEÚ: — A) Komisia · B) Súdny dvor · **C) Európska rada jednomyseľne ✓** · D) Rada kvalifikovanou väčšinou

### A3
1. Zásada subsidiarity sa uplatňuje: — A) na všetky právomoci · **B) len mimo výlučných právomocí ✓** · C) len na výlučné · D) len v SZBP
2. Colná únia a menová politika eurozóny patria medzi: — A) zdieľané · B) podporné · **C) výlučné právomoci (čl. 3 ZFEÚ) ✓** · D) právomoci členských štátov
3. Zásada, podľa ktorej opatrenia neprekročia rámec nevyhnutný na dosiahnutie cieľov: — A) subsidiarita · **B) proporcionalita (čl. 5 ods. 4 ZEÚ) ✓** · C) lojálna spolupráca · D) zverenie právomocí
4. Dodržiavanie subsidiarity kontrolujú okrem inštitúcií aj: — **A) národné parlamenty (Protokol č. 2) ✓** · B) ECB · C) Dvor audítorov · D) Európsky ombudsman

## Overenie

- `_map.json` sa načíta a je platná → **oblasť sa už otvára mapou**, nie núdzovým zoznamom; pavúčie hry („Kukučka", „Kde som") tým dostali dáta, ktoré doteraz nemali
- pavúky A1–A3 prejdú `isValidSpider`, stromy sa v UI kreslia (7/21, 5/19, 6/15), konzola čistá
- integrita mapy overená (pokrytie, duplicity, self-linky, poznámky)
- summary, kvízy, dlaždice ani prípady sa nedotkli

## Ďalší postup

Formát sedí, dávkovanie po 3–4 okruhoch je v poriadku. Pri ďalších dávkach potrebujem od garanta:
1. rozhodnutie o kvízovej sade (nahradiť / doplniť / len do siene) — platí spätne aj na A1–A3
2. či doplniť hrany pre A13
