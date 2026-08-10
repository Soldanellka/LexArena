# TPH A1 — UKÁŽKA podkladu (na odsúhlasenie formátu)

> **Okruh:** A1 — Pojem, funkcie a zásady trestného práva hmotného
> **Zdroj:** summary od Babu (Firebase override, 4. 8. 2026) + kostra pavúka od Babu.
> **Čo je ukážka:** (1) štátnicový podklad pre Štátnicovú sieň, (2) pavúk v JSON formáte appky. Doplňujúce otázky a časté chyby som **dogeneroval ja** — pred nasadením ich právne over (si garant obsahu). Po odsúhlasení formátu vyrobím rovnako A2–A13.

---

## ČASŤ 1 — Štátnicový podklad (pre Štátnicovú sieň)

### Téma skúšky
Pojem, funkcie a zásady trestného práva hmotného.

### Kľúčové body, ktoré musí dobrá odpoveď pokryť
1. **Pojem TPH** — odvetvie práva určujúce, ktoré konania sú trestnými činmi, aké tresty a ochranné opatrenia možno uložiť a za akých podmienok vzniká trestná zodpovednosť; kodifikácia v Trestnom zákone (zákon č. 300/2005 Z. z.).
2. **Štyri funkcie:** ochranná (spoločnosť, život, zdravie, majetok, právny poriadok) · preventívna (generálna × individuálna) · represívna (trest ako reakcia) · regulačná (hranice dovoleného správania).
3. **Zásada zákonnosti** (*nullum crimen, nulla poena sine lege*) vrátane troch dôsledkov: zákaz analógie v neprospech páchateľa, zákaz retroaktivity v neprospech, dovolená retroaktivita v prospech (*lex mitior*).
4. **Zásada subsidiarity trestnej represie** (*ultima ratio*) — trestné právo ako krajný prostriedok.
5. **Zásada individuálnej viny** — osobná zodpovednosť, trest len za zavinené konanie (úmysel/nedbanlivosť).
6. **Zásada humanizmu** — zákaz krutých, neľudských a ponižujúcich trestov; dôstojnosť páchateľa.
7. **Zásada proporcionality** — primeranosť trestu závažnosti činu (spôsob, následok, zavinenie, osobné pomery).

### Pravdepodobné doplňujúce otázky komisie *(dogenerované — over)*
1. Vysvetlite rozdiel medzi generálnou a individuálnou prevenciou a uveďte príklad.
2. Čo znamená *lex mitior* a kedy sa uplatní? Uveďte praktický príklad zmeny zákona.
3. Prečo je zakázaná analógia v neprospech páchateľa, ale výklad v jeho prospech dovolený?
4. Ako sa zásada *ultima ratio* prejavuje vo vzťahu trestného práva k správnemu právu (priestupky)?
5. Ktoré ustanovenia Ústavy SR a medzinárodných dokumentov zakotvujú zásadu zákonnosti? *(čl. 49 Ústavy SR, čl. 7 EDĽP — over presné odkazy)*
6. Môže byť trestne zodpovedná právnická osoba? Ako sa to zlučuje so zásadou individuálnej viny? *(zákon č. 91/2016 Z. z. — over, či chceš túto otázku v A1)*
7. Vzťah TPH a trestného práva procesného — čím sa líšia a ako sa dopĺňajú?

### Časté chyby študentov *(dogenerované — over)*
- Zamieňanie **funkcií** so **zásadami** (napr. „represívna zásada").
- Tvrdenie, že retroaktivita je zakázaná **absolútne** — zabúda sa na *lex mitior*.
- Zákaz analógie sa uvádza všeobecne — správne je **len v neprospech** páchateľa.
- Subsidiarita sa vysvetľuje ako „trestá sa málo" — správne je „trestné právo nastupuje, len keď iné prostriedky nestačia".
- Pri proporcionalite sa zabúda na **osobné pomery páchateľa** ako kritérium.

### Hodnotiace vodítko (čo odlišuje známky)
- **1:** pojem + všetky 4 funkcie + všetkých 5 zásad s latinskými názvami a dôsledkami zákonnosti (analógia, retroaktivita oboma smermi); reaguje na doplňujúce otázky s príkladmi.
- **2:** pojem + funkcie + zásady, chýbajú detaily (napr. dôsledky zákonnosti neúplné).
- **3:** pojem a väčšina zásad, funkcie neúplné alebo zamieňané.
- **4:** nevie vysvetliť pojem alebo vymenovať základné zásady.

---

## ČASŤ 2 — Pavúk (JSON vo formáte appky)

```json
{
  "center": "TPH – pojem × funkcie × zásady",
  "branches": [
    {
      "name": "Pojem TPH",
      "leaves": [
        { "name": "Čo upravuje", "def": "Určuje, ktoré konania sú trestnými činmi, aké tresty a ochranné opatrenia možno uložiť." },
        { "name": "Trestná zodpovednosť", "def": "Ustanovuje podmienky, za ktorých vzniká trestná zodpovednosť." },
        { "name": "Kodifikácia", "def": "Základná úprava: Trestný zákon (zákon č. 300/2005 Z. z.)." }
      ]
    },
    {
      "name": "Funkcie TPH",
      "leaves": [
        { "name": "Ochranná", "def": "Chráni spoločnosť, hodnoty, právny poriadok, život, zdravie a majetok." },
        { "name": "Preventívna", "def": "Generálna (potenciálni páchatelia) × individuálna (konkrétny páchateľ)." },
        { "name": "Represívna", "def": "Umožňuje uložiť trest ako reakciu na trestný čin." },
        { "name": "Regulačná", "def": "Stanovuje hranice dovoleného správania v spoločnosti." }
      ]
    },
    {
      "name": "Zásada zákonnosti",
      "leaves": [
        { "name": "Nullum crimen sine lege", "def": "Trestné činy a tresty musia byť ustanovené zákonom." },
        { "name": "Zákaz analógie", "def": "Analógia v neprospech páchateľa je zakázaná." },
        { "name": "Zákaz retroaktivity", "def": "Zákon nesmie pôsobiť spätne v neprospech páchateľa." },
        { "name": "Lex mitior", "def": "Retroaktivita v prospech páchateľa je dovolená." }
      ]
    },
    {
      "name": "Ďalšie zásady",
      "leaves": [
        { "name": "Subsidiarita (ultima ratio)", "def": "Trestné právo je krajný prostriedok — nastupuje, len ak iné prostriedky nestačia." },
        { "name": "Individuálna vina", "def": "Zodpovednosť je osobná; trest len za zavinené konanie (úmysel/nedbanlivosť)." },
        { "name": "Humanizmus", "def": "Tresty nesmú byť kruté, neľudské ani ponižujúce; rešpekt k dôstojnosti." },
        { "name": "Proporcionalita", "def": "Trest primeraný závažnosti: spôsob, následok, zavinenie, osobné pomery." }
      ]
    }
  ]
}
```

> **Pozn. pre Code:** presnú schému listov (kľúče `name`/`def` vs. iné) over proti `isValidSpider()` a existujúcim spider dátam (Pracovné/Občianske) — ak sa kľúče líšia, premapuj 1:1, obsah nechaj. Vetvy zámerne 4 (zásady rozdelené na „zákonnosť" + „ďalšie"), aby strom nebol preťažený jednou vetvou so 7 listami — ak má appka limit/zvyk inak, prispôsob.

---

## Na odsúhlasenie od Babu
1. **Rozsah podkladu** — sedí štruktúra (kľúčové body → doplňujúce otázky → chyby → hodnotiace vodítko)? Niečo pridať/ubrať?
2. **Doplňujúce otázky č. 5 a 6** siahajú mierne za summary (ústavný rámec, právnické osoby) — chceš ich v A1, alebo držať prísne v rozsahu summary?
3. **Pavúk:** delenie zásad na 2 vetvy OK?
Po odsúhlasení vyrobím A2–A13 rovnakým formátom (a učešem zdroje pri A8/A10/A12/A13, ako našla Code).
