# TPH — dávka A22–A24: pavúky + štátnicové podklady + mapa (výroba)

> **Zdroj:** summary A22–A24 od Babu (overené podľa Slov-Lex — §§ tu vyzerajú správne: krádež § 212, sprenevera § 213, podvod § 221, poškodzovanie veriteľa § 239, skresľovanie § 259, daňové §§ 276–279, všeobecné ohrozenie § 284, ŽP § 300). Pavúky vo **formáte appky**.

---

## ČASŤ 1 — PAVÚKY

### A22 — Trestné činy proti majetku
```json
{
  "center": "TČ proti majetku – krádež × podvod × sprenevera",
  "branches": [
    { "label": "Chránený záujem", "leaves": [
      "Vlastnícke právo a držba – ochrana majetku pred odňatím",
      "Majetkové záujmy – ochrana pred obohatením na cudzí úkor",
      "Hranica malej škody – 700 € pre trestnosť"
    ] },
    { "label": "Krádež (§ 212)", "leaves": [
      "Podstata – úmyselné prisvojenie si cudzej veci zmocnením sa",
      "Trestnosť – škoda nad 700 €, alebo vlámanie, vrecková či opakovaná krádež",
      "Kľúčový znak – fyzické zmocnenie sa veci bez súhlasu vlastníka"
    ] },
    { "label": "Podvod (§ 221)", "leaves": [
      "Podstata – obohatenie sa uvedením do omylu alebo využitím omylu",
      "Formy – aktívne uvedenie do omylu, využitie omylu, zamlčanie podstatných skutočností",
      "Škoda – aspoň malá (nad 700 €)",
      "Rozdiel od krádeže – poškodený majetok sám odovzdá, hoci na základe omylu"
    ] },
    { "label": "Sprenevera (§ 213)", "leaves": [
      "Podstata – prisvojenie si cudzej veci, ktorá bola páchateľovi zverená",
      "Zverenie – dobrovoľné odovzdanie na určitý účel (správa, úschova, povolanie)",
      "Znak – konanie v rozpore s účelom zverenia; vec zverená, nie odňatá",
      "Typicky – profesionálne vzťahy: zamestnanec, účtovník, správca"
    ] },
    { "label": "Porovnanie", "leaves": [
      "Krádež – odňatie (zmocnenie sa veci)",
      "Podvod – omyl poškodeného",
      "Sprenevera – zverenie a zneužitie dôvery"
    ] }
  ]
}
```

### A23 — Trestné činy hospodárske
```json
{
  "center": "Hospodárske TČ – evidencia × veriteľ × dane",
  "branches": [
    { "label": "Chránený záujem", "leaves": [
      "Hospodársky poriadok – transparentnosť a ekonomická stabilita",
      "Účtovníctvo – pravdivosť a úplnosť hospodárskej evidencie",
      "Verejné rozpočty a veritelia – daňový systém a práva veriteľov"
    ] },
    { "label": "Skresľovanie evidencie (§ 259)", "leaves": [
      "Podstata – úmyselné pozmenenie, zničenie, zatajenie či nevedenie dokladov",
      "Účel – zakrytie trestnej činnosti, skreslenie výsledku, zníženie dane",
      "Dosah – poškodenie veriteľov a obchodných partnerov"
    ] },
    { "label": "Poškodzovanie veriteľa (§ 239)", "leaves": [
      "Podstata – dlžník zmarí alebo sťaží uspokojenie veriteľov",
      "Formy – prevody a darovanie majetku, skrývanie, fiktívne zmluvy",
      "Znak – úmyselné konanie proti záujmom veriteľa"
    ] },
    { "label": "Daňové TČ (§§ 276–279)", "leaves": [
      "Skrátenie dane (§ 276) – nepravdivé údaje, zatajené príjmy, neoprávnené výdavky",
      "Neodvedenie dane a poistného (§ 277) – neodvedenie vybratej či zrazenej dane",
      "Daňový podvod (§ 277a) – vylákanie daňovej výhody, typicky karuselové podvody s DPH",
      "Nebezpečnosť – zásah do príjmov verejných rozpočtov"
    ] }
  ]
}
```

### A24 — TČ všeobecne nebezpečné a proti životnému prostrediu
```json
{
  "center": "Všeobecne nebezpečné TČ × TČ proti životnému prostrediu",
  "branches": [
    { "label": "Spoločný princíp", "leaves": [
      "Ohrozovací charakter – trestné je už samotné ohrozenie, škoda nemusí vzniknúť",
      "Široký dosah – ohrozenie mnohých osôb alebo prírodného prostredia"
    ] },
    { "label": "Všeobecné ohrozenie (§ 284)", "leaves": [
      "Podstata – spôsobenie či zvýšenie všeobecného nebezpečenstva",
      "Formy – požiar, výbuch, havária, škodlivý účinok výbušnín, plynu, elektriny, rádioaktivity",
      "Trestnosť – nebezpečenstvo smrti či ťažkej ujmy viacerých osôb, alebo škoda veľkého rozsahu",
      "Sadzby – vysoké, najmä pri následkoch na zdraví a životoch"
    ] },
    { "label": "Ohrozenie životného prostredia (§ 300)", "leaves": [
      "Podstata – vydanie životného prostredia do nebezpečenstva porušením predpisov",
      "Následok – značná alebo veľká ekologická škoda",
      "Chránené – príroda, voda, ovzdušie, pôda, živočíchy a rastliny"
    ] },
    { "label": "Ďalšie formy", "leaves": [
      "Neoprávnené nakladanie s odpadmi – nelegálne ukladanie, preprava, likvidácia (najmä nebezpečných)",
      "Znečisťovanie – vypúšťanie škodlivých látok do vody, pôdy či ovzdušia",
      "Cieľ – ekologická rovnováha a zdravé životné podmienky"
    ] }
  ]
}
```

---

## ČASŤ 2 — AKTUALIZÁCIA MAPY (9 → 11 klastrov)

```
nové clusters:
  majetok-a-hospodarstvo         · Majetok a hospodárstvo            · [22, 23]
  vseobecna-bezpecnost-a-prostredie · Všeobecná bezpečnosť a prostredie · [24]

(osobitna-cast ostáva [17–21] — okruhy o osobách; osobitná časť sa člení podľa hláv,
 presne ako sme predpokladali pri jej založení)

nové links (nesmerované):
  22–15 „účinná ľútosť typicky pri majetkových TČ"
  22–2  „hranice škody a závažnosť činu"
  23–14 „právnické osoby ako typickí páchatelia hospodárskych TČ"
  24–18 „ohrozovací princíp – spoločný menovateľ"
```

---

## ČASŤ 3 — ŠTÁTNICOVÉ PODKLADY

### A22 — TČ proti majetku
**Kľúčové body:** krádež (§ 212): prisvojenie zmocnením; trestná nad 700 € alebo vlámanie/vrecková/opakovaná · podvod (§ 221): omyl (uvedenie/využitie/zamlčanie) + obohatenie + škoda; poškodený vec **sám odovzdá** · sprenevera (§ 213): prisvojenie **zverenej** veci v rozpore s účelom · trojrozdiel: odňatie × omyl × zverenie · hranica malej škody 700 € (od novely 2024).
**Doplňujúce otázky (over):** 1. Krádež × lúpež (pristúpi násilie — iná hlava!). 2. Škodové pásma (malá/väčšia/značná/veľkého rozsahu) a ich vplyv na kvalifikáciu. 3. Podvod × sprenevera pri zverených peniazoch. 4. Vlámanie ako kvalifikačný znak — čo všetko je „vlámanie"? 5. Účinná ľútosť pri majetkových TČ (väzba A15).
**Časté chyby:** krádež pod 700 € „nie je nič" (priestupok!) · podvod bez škody · sprenevera zamenená s krádežou pri zverení · lúpež radená k majetkovým.
**Vodítko:** 1 = tri SP + trojrozdiel + škodové hranice; 2 = SP správne bez hraníc; 3 = definície hrubé; 4 = mieša podvod so spreneverou.

### A23 — TČ hospodárske
**Kľúčové body:** skresľovanie evidencie (§ 259): pozmenenie/zničenie/zatajenie/nevedenie dokladov · poškodzovanie veriteľa (§ 239): marenie uspokojenia (prevody, skrývanie, fiktívne zmluvy) · daňové TČ: skrátenie (§ 276), neodvedenie dane a poistného (§ 277), daňový podvod (§ 277a — karusely s DPH) · chránené: účtovníctvo, veritelia, verejné rozpočty.
**Doplňujúce otázky (over):** 1. Skrátenie dane × neodvedenie (vlastná daň × vybratá/zrazená cudzia). 2. Čo je karuselový podvod? 3. Poškodzovanie veriteľa × zvýhodňovanie veriteľa. 4. Trestná zodpovednosť PO pri hospodárskych TČ (väzba A14). 5. Účinná ľútosť pri daňových TČ — zaplatenie dane.
**Časté chyby:** skrátenie/neodvedenie ako jedno · daňový podvod = skrátenie (277a je vylákanie výhody!) · poškodzovanie veriteľa aj z nedbanlivosti (úmysel!) · zabudnutá väzba na PO.
**Vodítko:** 1 = tri bloky + rozdiely daňových SP + väzba PO; 2 = bloky bez rozdielov; 3 = len dane hrubo; 4 = mieša daňové SP.

### A24 — Všeobecne nebezpečné a ŽP
**Kľúčové body:** spoločný princíp: **ohrozovací charakter** — trestné už ohrozenie · všeobecné ohrozenie (§ 284): požiar, výbuch, havária…; nebezpečenstvo smrti/ťažkej ujmy viacerých alebo škoda veľkého rozsahu · ohrozenie ŽP (§ 300): porušenie predpisov + ekologická škoda · odpady a znečisťovanie ako ďalšie formy · chránené: životy, zdravie, majetok vo veľkom + ekologická rovnováha.
**Doplňujúce otázky (over):** 1. „Viacero osôb" pri všeobecnom ohrození — koľko? 2. Úmyselná × nedbanlivostná forma všeobecného ohrozenia. 3. Ako sa počíta ekologická škoda? 4. Vzťah k ohrozovacím deliktom z A18 (rovnaký princíp, iný rozsah). 5. Príklad z praxe: požiar bytovky, únik chemikálie do rieky.
**Časté chyby:** „bez škody nie je trestné" (ohrozenie stačí!) · všeobecné ohrozenie pri ohrození jednej osoby · ŽP delikty len úmyselné · miešanie § 284 a § 300.
**Vodítko:** 1 = princíp + obe hlavné SP + formy ŽP; 2 = SP bez princípu; 3 = len všeobecné ohrozenie; 4 = nechápe ohrozovací princíp.

---

## Poznámky pre Babu
1. §§ v tejto dávke vyzerajú správne (Slov-Lex) — pri kontrole len potvrď hranicu **700 €** (malá škoda po novele od 1. 1. 2024) a rozsah § 259 (skresľovanie má aj § 260 — over, či ho chceš spomenúť).
2. Doplňujúce otázky miestami siahajú na susedné SP (lúpež, zvýhodňovanie veriteľa) — over, či ich chceš v rozsahu okruhov.
