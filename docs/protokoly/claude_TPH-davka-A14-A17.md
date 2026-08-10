# TPH — dávka A14–A17: pavúky + štátnicové podklady + mapa (výroba)

> **Zdroj:** summary A14–A17 od Babu (Firebase, 6. 8. 2026). Pavúky sú **rovno vo formáte appky** (`label` + `leaves` ako reťazce „Pojem – definícia") — Code nemusí premapovávať, len validovať. Podklady vo formáte A1. Babu právne overí (⚠️ najmä zákon č. 167/2026 pri A16).

---

## ČASŤ 1 — PAVÚKY (formát appky)

### A14 — Trestná zodpovednosť a trestanie právnických osôb
```json
{
  "center": "Trestná zodpovednosť právnických osôb",
  "branches": [
    { "label": "Právny základ a podmienky", "leaves": [
      "Zákon č. 91/2016 Z. z. – osobitný zákon o trestnej zodpovednosti PO",
      "Podmienka – čin spáchaný v mene, v prospech, v záujme alebo v rámci činnosti PO",
      "Súbežná zodpovednosť – zodpovednosť PO nevylučuje zodpovednosť konajúcej FO"
    ] },
    { "label": "Pričítateľnosť konania", "leaves": [
      "Štatutár – konanie štatutárneho orgánu sa pripisuje PO",
      "Riadiaca osoba – konanie osoby v riadiacej pozícii",
      "Zamestnanec – konanie zamestnanca v rámci činnosti PO",
      "S vedomím PO – konanie osoby s vedomím či súhlasom PO"
    ] },
    { "label": "Sankcie pre PO", "leaves": [
      "Peňažný trest – základná majetková sankcia",
      "Zákaz činnosti – organizačná sankcia",
      "Prepadnutie majetku – najzávažnejšia majetková sankcia",
      "Zákaz dotácií a verejného obstarávania – vylúčenie z verejných zdrojov",
      "Zrušenie PO – najprísnejší trest"
    ] },
    { "label": "Účel trestania PO", "leaves": [
      "Ochrana spoločnosti – reakcia na kriminalitu právnických osôb",
      "Prevencia – odradenie od zneužívania PO",
      "Zamedzenie zneužívania – PO nesmie byť nástrojom trestnej činnosti"
    ] }
  ]
}
```

### A15 — Dôvody zániku trestnosti a trestu, zahladenie odsúdenia
```json
{
  "center": "Zánik trestnosti × zánik trestu × zahladenie",
  "branches": [
    { "label": "Zánik trestnosti (§ 85–88)", "leaves": [
      "Premlčanie – uplynutie doby podľa závažnosti činu, stíhanie už nie je možné",
      "Účinná ľútosť – dobrovoľná náprava či odvrátenie následku pri vybraných TČ",
      "Smrť páchateľa – stíhanie sa zastaví, trest nemožno uložiť",
      "Zmena zákona – čin už nie je trestný (lex mitior)"
    ] },
    { "label": "Zánik trestu (§ 89–91)", "leaves": [
      "Výkon trestu – trest zaniká úplným vykonaním",
      "Premlčanie výkonu – trest sa nevykonal v zákonnej lehote",
      "Amnestia a milosť – rozhodnutie, ktoré trest odpúšťa alebo zmierňuje"
    ] },
    { "label": "Zahladenie odsúdenia (§ 92–93)", "leaves": [
      "Podmienky – riadny život, uplynutie času, vykonaný trest",
      "Účinok – na osobu sa hľadí, akoby nebola odsúdená",
      "Register trestov – výmaz záznamu",
      "Význam – zamestnanie, licencie, spoločenské postavenie"
    ] }
  ]
}
```

### A16 — Vplyv práva EÚ na trestné právo hmotné
```json
{
  "center": "Právo EÚ × trestné právo hmotné",
  "branches": [
    { "label": "Harmonizácia smernicami", "leaves": [
      "Minimálne štandardy – smernice zjednocujú definície TČ a sankcií",
      "Terorizmus – smernica o boji proti terorizmu",
      "Pranie špinavých peňazí – harmonizované definície a sankcie",
      "Obchodovanie s ľuďmi – spoločná ochrana obetí",
      "PIF smernica – ochrana finančných záujmov EÚ"
    ] },
    { "label": "Eurozatykač (EZR)", "leaves": [
      "Vzájomné uznávanie – nahrádza klasické vydávacie konanie v EÚ",
      "Rýchle odovzdanie – zadržanie a odovzdanie na stíhanie či výkon trestu",
      "Priamy styk – konanie priamo medzi justičnými orgánmi",
      "Vnútroštátna úprava – zákon o medzinárodnej justičnej spolupráci (č. 167/2026 Z. z.)"
    ] },
    { "label": "Účinok práva EÚ", "leaves": [
      "Nariadenia – môžu mať priamy účinok, sú priamo záväzné",
      "Smernice – nemajú priamy účinok v neprospech jednotlivca (nullum crimen)",
      "Eurokonformný výklad – vnútroštátne právo sa vykladá v súlade s cieľmi smernice"
    ] },
    { "label": "Súdny dvor EÚ", "leaves": [
      "Prejudiciálne konanie – výklad práva EÚ podľa čl. 267 ZFEÚ",
      "Judikatúra – kľúčový vplyv na výklad trestnoprávnych noriem členských štátov"
    ] }
  ]
}
```

### A17 — Trestné činy proti životu
```json
{
  "center": "Trestné činy proti životu (2. hlava osobitnej časti)",
  "branches": [
    { "label": "Vražda (§ 160)", "leaves": [
      "Podstata – úmyselné usmrtenie inej osoby",
      "Zavinenie – úmysel priamy alebo nepriamy",
      "Sadzba – 15 až 20 rokov; kvalifikované formy až 25 rokov alebo doživotie",
      "Kategória – obzvlášť závažný zločin"
    ] },
    { "label": "Úkladná vražda (§ 159)", "leaves": [
      "Podstata – úmyselné usmrtenie s rozmyslom alebo po predchádzajúcej úvahe",
      "Rozmysel – premyslené, plánované konanie s časovým odstupom",
      "Sadzba – 20 až 25 rokov; kvalifikované formy doživotie",
      "Postavenie – najprísnejšie trestaná forma usmrtenia"
    ] },
    { "label": "Usmrtenie (§ 164)", "leaves": [
      "Podstata – neúmyselné spôsobenie smrti, spravidla z nedbanlivosti",
      "Zavinenie – porušenie povinnosti zo zákona, povolania či situácie",
      "Sadzba – do 3 rokov; kvalifikované formy vyššie (napr. alkohol pri nehode)"
    ] },
    { "label": "Porovnanie", "leaves": [
      "Kľúčový rozdiel – zavinenie: úmysel (vražda) × nedbanlivosť (usmrtenie)",
      "Rozmysel – odlišuje úkladnú vraždu od vraždy",
      "Chránená hodnota – život ako najvyššia hodnota, najprísnejšie tresty"
    ] }
  ]
}
```

---

## ČASŤ 2 — AKTUALIZÁCIA MAPY (9 klastrov)

```
zmeny clusters:
  pachatel-a-sucinnost · Páchateľ a súčinnosť · [5, 9, 14]   ← +14
  sankcie              · Sankcie              · [11, 12, 15] ← +15
  NOVÝ: europsky-rozmer · Európsky rozmer     · [16]
  NOVÝ: osobitna-cast   · Osobitná časť       · [17]

nové links (nesmerované):
  14–5  „PO ako osobitný páchateľ"
  15–10 „zahladenie ruší účinok odsúdenia pre recidívu"
  15–11 „zánik trestu nadväzuje na jeho ukladanie"
  16–1  „európsky rámec zásad trestného práva"
  17–3  „skutkové podstaty osobitnej časti"
  17–6  „úmysel × nedbanlivosť rozlišuje vraždu a usmrtenie"
```

*(Klaster `osobitna-cast` je pomenovaný všeobecne — pri ďalších okruhoch osobitnej časti bude rásť a časom sa dá rozdeliť podľa hláv TZ.)*

---

## ČASŤ 3 — ŠTÁTNICOVÉ PODKLADY

### A14 — Trestná zodpovednosť a trestanie PO
**Kľúčové body:** zákon č. 91/2016 Z. z. · podmienky: čin v mene / v prospech / v záujme / v rámci činnosti PO · pričítateľnosť (štatutár, riadiaca osoba, zamestnanec, s vedomím PO) · súbežná zodpovednosť PO a FO · sankcie: peňažný, zákaz činnosti, prepadnutie majetku, zákaz dotácií a VO, zrušenie PO · účel: ochrana, prevencia, zamedzenie zneužívania.
**Doplňujúce otázky (over):** 1. Zodpovedá PO za všetky TČ, alebo len za vymenované? 2. Ako sa PO „zbaví" zodpovednosti (compliance, prevencia — pozná zákon exkulpáciu?). 3. Čo sa stane so zodpovednosťou PO pri jej zániku/premene? 4. Prečo zrušenie PO ako najprísnejší trest? 5. Vzťah k zásade individuálnej viny z A1.
**Časté chyby:** „PO zodpovedá za všetko" · zabudnutá súbežnosť s FO · miešanie sankcií PO s trestami FO · pričítateľnosť len cez štatutára.
**Vodítko:** 1 = zákon + podmienky + pričítateľnosť + katalóg sankcií; 2 = bez detailov pričítateľnosti; 3 = len zákon a pár sankcií; 4 = nevie podmienky.

### A15 — Zánik trestnosti a trestu, zahladenie
**Kľúčové body:** zánik trestnosti (§ 85–88): premlčanie, účinná ľútosť, smrť páchateľa, zmena zákona · zánik trestu (§ 89–91): výkon, premlčanie výkonu, amnestia/milosť · zahladenie (§ 92–93): podmienky, účinok „hľadí sa, akoby nebol odsúdený", register trestov · rozdiel troch inštitútov (stíhanie × výkon × následky odsúdenia).
**Doplňujúce otázky (over):** 1. Ktoré TČ sa nepremlčujú? 2. Účinná ľútosť — pri ktorých TČ a aké podmienky? 3. Rozdiel amnestie a individuálnej milosti. 4. Kedy nastáva zahladenie zo zákona a kedy rozhoduje súd? 5. Účinok zahladenia na recidívu (väzba A10).
**Časté chyby:** miešanie zániku trestnosti so zánikom trestu · „premlčí sa všetko" (nepremlčateľné TČ!) · zahladenie ako „zmazanie viny" (ruší následky, nie skutok) · amnestia = milosť.
**Vodítko:** 1 = tri inštitúty s dôvodmi + nepremlčateľnosť + účinok zahladenia; 2 = inštitúty správne, detaily chýbajú; 3 = len premlčanie a zahladenie hrubo; 4 = mieša inštitúty.

### A16 — Vplyv práva EÚ na TPH
**Kľúčové body:** harmonizácia smernicami — minimálne štandardy (terorizmus, pranie, obchodovanie s ľuďmi, PIF) · eurozatykač: vzájomné uznávanie, nahrádza extradíciu, priamy styk justičných orgánov; vnútroštátne zákon č. 167/2026 Z. z. (⚠️ over číslo/rok) · účinok: nariadenia priamy; smernice **nie v neprospech jednotlivca** (nullum crimen), eurokonformný výklad · SDEÚ a prejudiciálne konanie (čl. 267 ZFEÚ).
**Doplňujúce otázky (over):** 1. Prečo smernica nemôže sama založiť trestnosť? 2. Čo je PIF smernica a koho chráni? 3. Ako funguje odovzdanie na základe EZR — a kedy ho možno odmietnuť? 4. Čo je európsky vyšetrovací príkaz? 5. Príklad, keď SDEÚ ovplyvnil vnútroštátne trestné právo.
**Časté chyby:** priamy účinok smernice v neprospech · EZR ako „vydávanie" (je to odovzdanie, iný režim) · harmonizácia = jednotný trestný zákon EÚ (sú to minimálne štandardy) · zabudnutý eurokonformný výklad.
**Vodítko:** 1 = harmonizácia + EZR + účinky + SDEÚ; 2 = tri zo štyroch blokov; 3 = len EZR a smernice hrubo; 4 = tvrdí priamy účinok v neprospech.

### A17 — Trestné činy proti životu
**Kľúčové body:** 2. hlava osobitnej časti; život = najvyššia chránená hodnota · vražda (§ 160): úmyselné usmrtenie, OZZ, 15–20 (kvalif. 25/doživotie) · úkladná vražda (§ 159): rozmysel/predchádzajúca úvaha, 20–25/doživotie, najprísnejšia · usmrtenie (§ 164): nedbanlivosť, do 3 rokov (kvalif. vyššie) · kľúč: **zavinenie** rozlišuje skutky (väzba A6).
**Doplňujúce otázky (over):** 1. Čím sa líši rozmysel od obyčajného úmyslu? 2. Vražda novonarodeného dieťaťa matkou (§ 161? — over) — prečo privilegovaná? 3. Účasť na samovražde (§ 166? — over). 4. Nepriamy úmysel pri vražde — príklad. 5. Usmrtenie pri dopravnej nehode pod vplyvom — kvalifikácia.
**Časté chyby:** úkladná vražda „len naplánovaná dopredu o dni" (stačí rozmysel) · miešanie usmrtenia s vraždou v nepriamom úmysle — klasika z A6! · zabudnuté privilegované SP · sadzby naopak.
**Vodítko:** 1 = tri SP s § a sadzbami + rozdiel zavinenia + privilegované; 2 = tri SP bez privilegovaných; 3 = len vražda/usmrtenie hrubo; 4 = mieša zavinenie.

---

## Poznámky pre Babu (garantská kontrola)
1. **A16:** over zákon **č. 167/2026 Z. z.** (v texte ako nový zákon o medzinárodnej justičnej spolupráci; doteraz platil 236/2017 o EZR) — ak číslo nesedí, opravíme v summary aj pavúku.
2. **A17:** doplňujúce otázky 2 a 3 siahajú na susedné SP (§ 161, § 166) — over čísla §§ a či ich chceš v rozsahu okruhu.
3. Pri kontrole pavúkov stačí bežné garantské oko — obsah je z tvojich textov, len zhustený.
