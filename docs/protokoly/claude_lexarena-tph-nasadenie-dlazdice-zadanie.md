# LexArena — nasadenie TPH pavúkov + kompaktné dlaždice (zadanie pre Code)

> Dve úlohy. Klastre TPH **odsúhlasené Babu** (bez emoji). Pravidlá platia (obe témy, mobil, commit + protokol, push na Babu).

## 1. TPH pavúky A1–A13 + mapa — nasadiť
Zdroj: `claude_TPH-pavuky-A1-A13-a-mapa.md` (13 pavúkov) + doplnené id/čísla/prepojenia nižšie.

- **Premapovať schému** na formát appky (mechanicky, obsah nemeniť): `name → label` pre vetvy, listy `{name, def}` → string `"Pojem – definícia"`. Validovať cez `isValidSpider()` — všetkých 13 musí prejsť.
- **Vytvoriť `Trestné právo hmotné/data/_map.json`** podľa tvaru Pracovného:

```
clusters (id · label · okruhy):
  zaklady-trestneho-prava   · Základy trestného práva   · [1, 2]
  skutkova-podstata         · Skutková podstata         · [3, 4, 6]
  pachatel-a-sucinnost      · Páchateľ a súčinnosť      · [5, 9]
  protipravnost-a-stadia    · Protiprávnosť a štádiá    · [7, 8]
  mnohost-trestnej-cinnosti · Mnohosť trestnej činnosti · [10]
  sankcie                   · Sankcie                   · [11, 12]
  mladistvi                 · Mladiství                 · [13]

links (nesmerované, from/to = čísla okruhov):
  2–3  „druhy TČ napĺňajú skutkové podstaty"
  4–6  „objektívna a subjektívna stránka jednej SP"
  5–6  „zavinenie ako podmienka zodpovednosti páchateľa"
  5–13 „vek a vyspelosť páchateľa"
  7–8  „obe riešia hranicu trestnosti konania"
  8–9  „štádiá a formy účasti sa kvalifikujú spolu"
  10–11 „súbeh a recidíva určujú ukladanie trestu"
  11–12 „trest × opatrenie — dva druhy sankcií"
  11–13 „tresty mladistvých ako osobitný režim"
```

- **Cesta nasadenia:** zvoľ konzistentnú s existujúcim obsahom — buď priamo do `A*.json` (pole `spider`) + `_map.json` v repe, alebo ako `spider` overridy vo Firebase + `_map.json` v repe. Popíš voľbu a dôvod; POZOR: nič nespúšťať cez globálny sync bez Babu.
- **Overiť po nasadení:** TPH v pavúkovi sa otvára **mapou klastrov** (ako Pracovné), stromy Z3 fungujú, **pavúčie hry sa ponúkajú** (mount z mapy), „Súvisí s" skáče. Aj v module Trestného sa pavúk zobrazí.
- Obsah je z textov Babu; právne finálne prebehne Babu (overridy/JSON sa dajú opraviť aj po nasadení).

## 2. Dlaždice — kompaktný horizontálny formát
168 px stále pôsobí obrovsky (tri sýte bloky cez celý pás). Prerob na **kompaktný horizontálny layout**:
- **Výška ~100–110 px.** Ikona ~24–26 px **vľavo vedľa textu** (nie nad ním); vpravo názov (14–15 px/700) + popis (11 px) pod sebou.
- Gradient (trojzastávkový z `07c600d`), pulz aj disabled logika **ostávajú** — dlaždica má vyskočiť sýtosťou, nie plochou.
- Trojica ostáva v riadku; menšie akcie pod nimi bez zmeny. Mobil: pod sebou, výška môže byť ešte nižšia (~80–90 px), over zalamovanie textu.
- Ak by horizontálny variant v úzkom stĺpci lámal názvy škaredo, nahlás s meraniami — nerozhoduj sám o návrate k vertikálu.

## Protokol
Commit(y) + `súbor:riadok` · TPH: potvrdenie validácie 13/13, cesta nasadenia, screenshot/opis mapy, hry ponúknuté · dlaždice: rozmery pred/po, obe témy, mobil · konzola · otvorené otázky.
