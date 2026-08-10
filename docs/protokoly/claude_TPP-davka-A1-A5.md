# TPP — prvá dávka A1–A5: pavúky + podklady (Trestné právo procesné štartuje!)

> **Zdroj:** summary TPP A1–A5 od Babu (Trestný poriadok č. 301/2005 Z. z.).
> ⚠️ **NÁLEZ — nadpis jadra:** TPP summary používajú **„Zhrnutie (štátnicové jadro)"** (A1, A2, A4, A5), kým regex siene chytá „Kľúčové slová (štátnicové):" a „Zapamätaj si (štátnicové jadro)". A3 má „Zapamätaj si". → buď zjednotiť nadpisy v appke na „Zapamätaj si (štátnicové jadro)", alebo rozšíriť regex o tretí vzor (bezpečnejšie — v zadaní pre Code).

---

## PAVÚKY (formát appky)

### A1 — Základné zásady trestného konania
```json
{
  "center": "Základné zásady trestného konania (§ 2 TP)",
  "branches": [
    { "label": "Zákonnosť a primeranosť", "leaves": [
      "Zákonnosť stíhania – stíhať len zo zákonných dôvodov a zákonným spôsobom",
      "Primeranosť – zásahy do práv len v nevyhnutnej miere, rešpekt k dôstojnosti a súkromiu",
      "Sudca pre prípravné konanie – o zásahoch do práv rozhoduje súd"
    ] },
    { "label": "Ochrana obvineného", "leaves": [
      "Prezumpcia neviny – nevinný, kým súd právoplatne nevysloví vinu",
      "Právo na obhajobu – obhajca už v prípravnom konaní",
      "Ne bis in idem – nie dvakrát za ten istý čin"
    ] },
    { "label": "Chod konania", "leaves": [
      "Legalita – prokurátor je povinný stíhať všetky TČ, o ktorých sa dozvedel",
      "Oficialita – orgány konajú z úradnej povinnosti",
      "Rýchlosť – väzobné veci prednostne, bez prieťahov",
      "Spravodlivý proces – nezávislý a nestranný súd, primeraná lehota, prítomnosť"
    ] },
    { "label": "Dokazovanie a proces", "leaves": [
      "Skutkový stav bez dôvodných pochybností – v rozsahu potrebnom na rozhodnutie",
      "Voľné hodnotenie dôkazov – vnútorné presvedčenie po zvážení všetkých okolností",
      "Kontradiktórnosť a rovnosť strán – vyjadriť sa k dôkazom, navrhovať dôkazy",
      "Ústnosť a verejnosť – hlavné pojednávanie spravidla verejné"
    ] }
  ]
}
```

### A2 — Ochrana základných práv a slobôd v trestnom konaní
```json
{
  "center": "Ochrana základných práv v trestnom konaní (§§ 1–2 TP)",
  "branches": [
    { "label": "Východiská", "leaves": [
      "Účel (§ 1) – TČ náležite zistiť, páchateľov potrestať, práva rešpektovať",
      "Ústavný rámec – Ústava SR a Dohovor o ochrane ľudských práv",
      "Platí pre FO aj PO – ochrana práv oboch"
    ] },
    { "label": "Limity zásahov", "leaves": [
      "Primeranosť (§ 2 ods. 2) – len v miere nevyhnutnej na účel konania",
      "Súdna kontrola – prehliadku, odpočúvanie, väzbu povoľuje sudca pre prípravné konanie",
      "Zákonnosť – len zo zákonných dôvodov a zákonným spôsobom"
    ] },
    { "label": "Práva osoby", "leaves": [
      "Prezumpcia neviny – štát dokazuje vinu; zákaz predčasného označovania za páchateľa",
      "Právo na obhajobu – obhajca, prítomnosť pri úkonoch, rovnosť zbraní",
      "Spravodlivý proces – nezávislý súd, primeraná lehota, vyjadrenie k dôkazom",
      "Ne bis in idem – ochrana pred opakovaným stíhaním"
    ] },
    { "label": "Kvalita rozhodovania", "leaves": [
      "Skutkový stav bez pochybností – základ spravodlivého rozhodnutia",
      "Oficialita a legalita – konanie z úradnej povinnosti, povinnosť stíhať"
    ] }
  ]
}
```

### A3 — Subjekty a strany trestného konania
```json
{
  "center": "Subjekty × strany trestného konania",
  "branches": [
    { "label": "Rozlíšenie", "leaves": [
      "Subjekty – všetky osoby s procesným postavením podľa TP",
      "Strany – aktívni účastníci: obvinený, obhajca, prokurátor, poškodený"
    ] },
    { "label": "Orgány činné v trestnom konaní (§ 10)", "leaves": [
      "Policajt – úkony prípravného konania, zabezpečovanie dôkazov",
      "Prokurátor – riadi prípravné konanie, podáva obžalobu, zastupuje štát",
      "Súd – rozhoduje o vine, treste a zásahoch do práv"
    ] },
    { "label": "Strany a ich práva", "leaves": [
      "Obvinený (§ 32) – najširšie práva: obhajoba, dôkazy, opravné prostriedky",
      "Obhajca (§ 34) – advokát; úkony, dôkazy, opravné prostriedky v mene obvineného",
      "Poškodený (§ 46) – ujma z TČ; adhézny nárok na náhradu škody",
      "Zúčastnená osoba (§ 47) – bráni vlastnícke práva pri zaistenej veci"
    ] },
    { "label": "Ďalšie subjekty", "leaves": [
      "Svedok (§ 127) – povinnosť vypovedať, ak zákon neustanovuje inak",
      "Znalec (§ 133) – odborné posúdenie znaleckým posudkom",
      "Pomocné osoby – tlmočník, prekladateľ, zapisovateľ"
    ] }
  ]
}
```

### A4 — Súdy, OČTK a pomocné osoby
```json
{
  "center": "Súdy × OČTK × pomocné osoby",
  "branches": [
    { "label": "Súdy (§§ 11–23)", "leaves": [
      "Okresný súd – prvý stupeň vo väčšine vecí",
      "Krajský súd – závažnejšie veci a odvolania",
      "Špecializovaný trestný súd – korupcia, organizovaný zločin, extrémizmus, terorizmus",
      "Najvyšší súd SR – dovolanie a mimoriadne opravné prostriedky",
      "Sudca pre prípravné konanie – väzba, prehliadky, odpočúvanie"
    ] },
    { "label": "OČTK (§ 10)", "leaves": [
      "Prokurátor – riadi prípravné konanie, obžaloba, zastupuje štát",
      "Policajt – vyšetrovanie, dôkazy, zadržanie, prehliadky, výsluchy",
      "Špecializované orgány – finančná správa, vojenská polícia, ZVJS, veliteľ lode"
    ] },
    { "label": "Pomocné osoby (§§ 24–29)", "leaves": [
      "Probačný a mediačný úradník – dohľad, alternatívne tresty, mediácia",
      "Vyšší súdny úradník – úkony z poverenia sudcu",
      "Zapisovateľ a tlmočník – zápisnice, preklad",
      "Nezúčastnená osoba a figurant – kontrola nestrannosti, rekonštrukcia"
    ] }
  ]
}
```

### A5 — Obvinený, jeho postavenie a výsluch
```json
{
  "center": "Obvinený × výsluch obvineného",
  "branches": [
    { "label": "Vznik postavenia", "leaves": [
      "Vznesenie obvinenia – uznesením podľa § 206 TP",
      "Okamih – doručením alebo oznámením uznesenia (aj pri zadržaní)",
      "Formálny status – zakladá najširšie procesné práva"
    ] },
    { "label": "Práva a povinnosti (§ 34)", "leaves": [
      "Práva – obhajca, nevypovedať, vyjadriť sa k dôkazom, navrhovať dôkazy, opravné prostriedky",
      "Ďalšie práva – prítomnosť pri úkonoch, preklad a tlmočenie",
      "Povinnosti – dostaviť sa, strpieť zákonné úkony (DNA, dychová skúška)"
    ] },
    { "label": "Postavenie v konaní", "leaves": [
      "Strana konania – rovnosť zbraní s prokurátorom",
      "Ochrana zásadami – prezumpcia neviny, obhajoba, spravodlivý proces",
      "Podozrivý × obvinený – práva obvineného sú širšie, nemožno ich zamieňať"
    ] },
    { "label": "Výsluch (§ 121)", "leaves": [
      "Zákaz donucovania – k výpovedi ani k priznaniu, rešpekt k osobnosti",
      "Poučenie – právo vypovedať/odmietnuť, obhajca, nevypovedať bez obhajcu",
      "Ďalšie poučenia – podmienečné zastavenie, zmier, dohoda o vine a treste",
      "Neúčinnosť – výpoveď podozrivého pred vznesením obvinenia nemožno použiť"
    ] }
  ]
}
```

---

## ŠTÁTNICOVÉ PODKLADY (skrátený formát)

### A1 — Zásady trestného konania
**Kľúčové body:** § 2 TP · zákonnosť, primeranosť, sudca pre prípravné konanie · prezumpcia neviny, obhajoba, ne bis in idem · legalita, oficialita, rýchlosť, spravodlivý proces · skutkový stav bez pochybností, voľné hodnotenie dôkazov, kontradiktórnosť, ústnosť a verejnosť.
**Otázky (over):** 1. Legalita × oportunita (výnimky z povinnosti stíhať). 2. Prezumpcia neviny — praktické dôsledky (in dubio pro reo). 3. Prečo o zásahoch rozhoduje súd, nie prokurátor. 4. Voľné hodnotenie × zákonná dôkazná teória. 5. Kedy môže byť pojednávanie neverejné.
**Chyby:** zásady sa len vymenujú bez obsahu · miešanie legality s legalizmom · „obhajoba až na súde".
**Vodítko:** 1 = systém zásad s obsahom a väzbami; 2 = väčšina zásad správne; 3 = vymenované bez obsahu; 4 = mieša zásady.

### A2 — Ochrana základných práv
**Kľúčové body:** §§ 1–2 TP · primeranosť zásahov · súdna kontrola (prehliadka, odpočúvanie, väzba) · prezumpcia neviny, obhajoba, spravodlivý proces, ne bis in idem · ústavný rámec (Ústava, Dohovor).
**Otázky (over):** 1. Ktoré zásahy vyžadujú príkaz sudcu? 2. Rovnosť zbraní v praxi. 3. Dôkaz získaný nezákonne — použiteľnosť. 4. Vzťah k EDĽP (čl. 5, 6). 5. Práva PO v konaní.
**Chyby:** „prokurátor povoľuje väzbu" · nezákonný dôkaz „sa dá použiť, ak je pravdivý" · ochrana len obvineného (aj poškodený, svedok).
**Vodítko:** 1 = limity + kontrola + práva + ústavný rámec; 2 = bez ústavného rámca; 3 = len prezumpcia a obhajoba; 4 = mieša právomoci.

### A3 — Subjekty a strany
**Kľúčové body:** subjekty (širší pojem) × strany (obvinený, obhajca, prokurátor, poškodený) · OČTK § 10 (policajt, prokurátor) + súd · poškodený a adhézne konanie § 46 · zúčastnená osoba § 47 · svedok, znalec.
**Otázky (over):** 1. Je súd OČTK? (nie — rozhoduje, nekoná v prípravnom). 2. Poškodený ako strana — v akom rozsahu. 3. Zúčastnená osoba — príklad. 4. Svedok odmietnutie výpovede (§ 130 — over). 5. Postavenie oznamovateľa.
**Chyby:** súd medzi OČTK — klasika! · subjekt = strana · poškodený „vždy plná strana".
**Vodítko:** 1 = rozlíšenie + všetky roly + adhézia; 2 = roly bez adhézie; 3 = hrubé delenie; 4 = súd ako OČTK.

### A4 — Súdy, OČTK, pomocné osoby
**Kľúčové body:** sústava (okresný, krajský, ŠTS, NS SR) + sudca pre prípravné konanie · OČTK: prokurátor (riadi, obžaloba), policajt (vyšetruje), špecializované orgány · pomocné osoby §§ 24–29 (probačný a mediačný úradník, VSÚ, zapisovateľ, tlmočník, nezúčastnená osoba, figurant).
**Otázky (over):** 1. Príslušnosť ŠTS — ktoré veci. 2. Vecná × miestna príslušnosť. 3. Prokurátor × sudca pre prípravné konanie — deľba. 4. Probačný úradník — úloha pri alternatívnych trestoch. 5. Nezúčastnená osoba pri prehliadke — načo.
**Chyby:** ŠTS ako odvolací súd · policajt „podáva obžalobu" · pomocné osoby zamieňané so stranami.
**Vodítko:** 1 = sústava + deľba rolí + pomocné osoby; 2 = sústava a OČTK; 3 = hrubo; 4 = mieša právomoci.

### A5 — Obvinený a výsluch
**Kľúčové body:** vznik postavenia (§ 206 uznesenie) · práva § 34 (obhajca, nevypovedať, dôkazy, prítomnosť) · povinnosti (dostaviť sa, strpieť úkony) · výsluch § 121: zákaz donucovania, povinné poučenia, ďalšie poučenia (zmier, dohoda) · neúčinnosť výpovede spred obvinenia · podozrivý × obvinený (ÚS SR).
**Otázky (over):** 1. Rozdiel podozrivý × obvinený × obžalovaný. 2. Môže mlčanie priťažiť? (nie). 3. Povinná obhajoba — kedy (§ 37 — over). 4. Výsluch bez obhajcu — kedy neúčinný. 5. Priznanie ako „kráľovná dôkazov"? (nie — hodnotí sa voľne).
**Chyby:** obvinený „musí vypovedať pravdu" (nesmie byť donucovaný; krivá výpoveď sa netýka obvineného) · zamieňanie statusov · priznanie stačí na odsúdenie.
**Vodítko:** 1 = status + práva + výsluch s poučeniami + neúčinnosť; 2 = bez neúčinnosti; 3 = len práva hrubo; 4 = mieša statusy.

---

## Poznámky
1. **Nadpis jadra:** zjednotiť na „Zapamätaj si (štátnicové jadro)" alebo rozšíriť regex (odporúčam regex — texty sa nemenia).
2. TPP zatiaľ **bez mapy klastrov** (5 okruhov — strom fail-soft stačí); mapu navrhnem pri ďalších dávkach.
3. §§ TP (301/2005) v summary vyzerajú konzistentne (§ 2, § 10, §§ 32–47, § 121, § 206) — bežná garantská kontrola stačí.
