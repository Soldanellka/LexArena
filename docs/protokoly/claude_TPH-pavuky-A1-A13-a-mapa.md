# TPH — pavúky A1–A13 + mapa klastrov (výroba podľa kostry a summary od Babu)

> **Zdroj:** kostra pavúka (Centrum → vetvy → listy) + summary A1–A13 od Babu. Definície listov sú zhustené zo summary; kde summary nestačilo, doplnené z Trestného zákona — **Babu právne overí pred nasadením.**
> **Pre Code:** schéma `{center, branches:[{name, leaves:[{name, def}]}]}` — over kľúče proti `isValidSpider()` a existujúcim spider dátam (Pracovné/Občianske); ak sa líšia, premapuj 1:1, obsah nechaj. Mapa klastrov = návrh do `_map.json` (štruktúru súboru over podľa Pracovného).
> ⚠️ **A10:** summary začína bodom 2 (bod 1 chýba) — pavúk je aj tak kompletný z kostry; Babu môže summary doplniť nezávisle.

---

## MAPA KLASTROV (návrh na odsúhlasenie — vzor Pracovné právo)

| Klaster | Okruhy | Pozn. |
|---|---|---|
| 🧭 **Základy trestného práva** | A1, A2 | pojem, funkcie, zásady; trestný čin a triedenie |
| 🧩 **Skutková podstata** | A3, A4, A6 | pojem a znaky; objektívne znaky; subjektívna stránka a omyl |
| 👤 **Páchateľ a súčinnosť** | A5, A9 | FO/PO; účastníctvo a spolupáchateľstvo |
| 🛡️ **Protiprávnosť a štádiá** | A7, A8 | okolnosti vylučujúce protiprávnosť; príprava–pokus–dokonanie |
| 🔁 **Mnohosť trestnej činnosti** | A10 | súbeh a recidíva |
| ⚖️ **Sankcie** | A11, A12 | tresty; ochranné a výchovné opatrenia |
| 🌱 **Mladiství** | A13 | zodpovednosť a trestanie mladistvých |

*(7 klastrov na 13 okruhov — proporčne ako Pracovné. „Súvisí s" prepojenia navrhnem po odsúhlasení klastrov: napr. A6 omyl ↔ A5 zavinenie, A8 pokus ↔ A9 súčinnosť, A11 trest ↔ A13 mladiství.)*

---

## A1 — Pojem, funkcie a zásady TPH
```json
{
  "center": "TPH – pojem × funkcie × zásady",
  "branches": [
    { "name": "Pojem TPH", "leaves": [
      { "name": "Čo upravuje", "def": "Určuje, ktoré konania sú trestnými činmi, aké tresty a ochranné opatrenia možno uložiť." },
      { "name": "Trestná zodpovednosť", "def": "Ustanovuje podmienky, za ktorých vzniká trestná zodpovednosť." },
      { "name": "Kodifikácia", "def": "Základná úprava: Trestný zákon (zákon č. 300/2005 Z. z.)." } ] },
    { "name": "Funkcie TPH", "leaves": [
      { "name": "Ochranná", "def": "Chráni spoločnosť, hodnoty, právny poriadok, život, zdravie a majetok." },
      { "name": "Preventívna", "def": "Generálna (potenciálni páchatelia) × individuálna (konkrétny páchateľ)." },
      { "name": "Represívna", "def": "Umožňuje uložiť trest ako reakciu na trestný čin." },
      { "name": "Regulačná", "def": "Stanovuje hranice dovoleného správania v spoločnosti." } ] },
    { "name": "Zásada zákonnosti", "leaves": [
      { "name": "Nullum crimen sine lege", "def": "Trestné činy a tresty musia byť ustanovené zákonom." },
      { "name": "Zákaz analógie", "def": "Analógia v neprospech páchateľa je zakázaná." },
      { "name": "Zákaz retroaktivity", "def": "Zákon nesmie pôsobiť spätne v neprospech páchateľa." },
      { "name": "Lex mitior", "def": "Retroaktivita v prospech páchateľa je dovolená." } ] },
    { "name": "Ďalšie zásady", "leaves": [
      { "name": "Subsidiarita (ultima ratio)", "def": "Trestné právo je krajný prostriedok — nastupuje, len ak iné prostriedky nestačia." },
      { "name": "Individuálna vina", "def": "Zodpovednosť je osobná; trest len za zavinené konanie (úmysel/nedbanlivosť)." },
      { "name": "Humanizmus", "def": "Tresty nesmú byť kruté, neľudské ani ponižujúce; rešpekt k dôstojnosti." },
      { "name": "Proporcionalita", "def": "Trest primeraný závažnosti: spôsob, následok, zavinenie, osobné pomery." } ] }
  ]
}
```

## A2 — Trestný čin a jeho druhy
```json
{
  "center": "Trestný čin – definícia × druhy × triedenie",
  "branches": [
    { "name": "Definícia trestného činu", "leaves": [
      { "name": "Protiprávne konanie", "def": "Konanie v rozpore s právnym poriadkom." },
      { "name": "Označené zákonom", "def": "Zákon ho výslovne označuje za trestný čin." },
      { "name": "Trestnosť", "def": "Možno zaň uložiť trest." },
      { "name": "Zavinenie", "def": "Musí byť zavinené — úmysel alebo nedbanlivosť." } ] },
    { "name": "Druhy podľa závažnosti", "leaves": [
      { "name": "Prečin", "def": "Menej závažný TČ; z nedbanlivosti, alebo úmyselný s hornou hranicou do 5 rokov." },
      { "name": "Zločin", "def": "Závažnejší, vždy úmyselný TČ; horná hranica nad 5 rokov." },
      { "name": "Obzvlášť závažný zločin", "def": "Horná hranica nad 10 rokov (napr. vražda)." } ] },
    { "name": "Druhy podľa predmetu útoku", "leaves": [
      { "name": "Život a zdravie", "def": "TČ proti životu a zdraviu." },
      { "name": "Majetok", "def": "TČ proti majetku." },
      { "name": "Sloboda a dôstojnosť", "def": "TČ proti slobode a ľudskej dôstojnosti." },
      { "name": "Verejný poriadok", "def": "TČ proti verejnému poriadku." },
      { "name": "Hospodárstvo", "def": "TČ proti hospodárstvu." },
      { "name": "Ďalšie hlavy", "def": "Životné prostredie, rodina a mládež, republika, mier a ľudskosť — podľa systematiky osobitnej časti TZ." } ] },
    { "name": "Druhy podľa zavinenia", "leaves": [
      { "name": "Úmyselné", "def": "Páchateľ chcel porušiť/ohroziť chránený záujem alebo bol s tým uzrozumený." },
      { "name": "Nedbanlivostné", "def": "Následok nechcel, ale konal nedbalo (vedomá × nevedomá nedbanlivosť)." } ] },
    { "name": "Účel triedenia", "leaves": [
      { "name": "Právna kvalifikácia", "def": "Zaradenie skutku pod správnu skutkovú podstatu." },
      { "name": "Určenie trestu", "def": "Druh a výmera trestu podľa závažnosti." },
      { "name": "Procesný režim", "def": "Napr. podmienky väzby či premlčanie." },
      { "name": "Štatistika a prevencia", "def": "Kriminologická štatistika a trestná politika štátu." } ] }
  ]
}
```

## A3 — Skutková podstata: pojem, znaky, triedenie
```json
{
  "center": "Skutková podstata – pojem × znaky × triedenie",
  "branches": [
    { "name": "Pojem", "leaves": [
      { "name": "Súhrn zákonných znakov", "def": "Znaky, ktoré musia byť naplnené, aby bol skutok trestným činom." },
      { "name": "Model v zákone", "def": "„Model" TČ, s ktorým sa porovnáva konanie páchateľa." },
      { "name": "Základ kvalifikácie", "def": "Určuje hranice trestnej zodpovednosti." } ] },
    { "name": "Znaky skutkovej podstaty", "leaves": [
      { "name": "Objekt", "def": "Chránený spoločenský záujem (život, zdravie, majetok…)." },
      { "name": "Subjekt", "def": "Páchateľ — trestne zodpovedná osoba; niekedy osobitný subjekt (napr. verejný činiteľ)." },
      { "name": "Objektívna stránka", "def": "Konanie/opomenutie, následok, príčinná súvislosť; prípadne spôsob, miesto, čas." },
      { "name": "Subjektívna stránka", "def": "Zavinenie (úmysel/nedbanlivosť); niekedy motív či pohnútka." },
      { "name": "Následok", "def": "Porušenie alebo ohrozenie objektu; pri niektorých TČ obligatórny." } ] },
    { "name": "Triedenie", "leaves": [
      { "name": "Podľa konštrukcie", "def": "Formálne (bez následku) × materiálne (vyžadujú následok)." },
      { "name": "Podľa útoku", "def": "Proti životu, majetku, slobode… (systematika osobitnej časti TZ)." },
      { "name": "Podľa zavinenia", "def": "Úmyselné × nedbanlivostné × kombinované." },
      { "name": "Podľa následku", "def": "Poruchové (škoda/ujma) × ohrozovacie (stačí nebezpečenstvo)." },
      { "name": "Podľa subjektu", "def": "Všeobecné × osobitné (špeciálne postavenie páchateľa)." } ] },
    { "name": "Význam", "leaves": [
      { "name": "Právna kvalifikácia", "def": "Nástroj zaradenia skutku pod zákon." },
      { "name": "Určenie trestu", "def": "Východisko pre druh a výmeru trestu." },
      { "name": "Odlíšenie od priestupkov", "def": "Hranica medzi trestným činom a priestupkom." },
      { "name": "Predvídateľnosť", "def": "Zaručuje predvídateľnosť trestného práva." } ] }
  ]
}
```

## A4 — Objektívne znaky skutkovej podstaty
```json
{
  "center": "Objektívne znaky – konanie × následok × príčinná súvislosť",
  "branches": [
    { "name": "Konanie / opomenutie", "leaves": [
      { "name": "Konanie", "def": "Aktívny zásah do chráneného záujmu." },
      { "name": "Opomenutie", "def": "Pasívne nekonanie tam, kde existovala povinnosť konať." } ] },
    { "name": "Následok", "leaves": [
      { "name": "Poruchový", "def": "Skutočná ujma na chránenom záujme." },
      { "name": "Ohrozovací", "def": "Stačí vytvorenie nebezpečenstva pre chránený záujem." } ] },
    { "name": "Príčinná súvislosť", "leaves": [
      { "name": "Conditio sine qua non", "def": "Bez konania by následok nenastal." },
      { "name": "Právna relevancia", "def": "Príčina musí byť právne významná, nie akákoľvek." } ] },
    { "name": "Okolnosti činu", "leaves": [
      { "name": "Miesto a čas", "def": "Kde a kedy bol čin spáchaný." },
      { "name": "Spôsob a prostriedky", "def": "Ako a čím bol čin spáchaný." },
      { "name": "Kvalifikačné znaky", "def": "Okolnosti zvyšujúce závažnosť (kvalifikované skutkové podstaty)." } ] },
    { "name": "Význam", "leaves": [
      { "name": "Právna kvalifikácia", "def": "Podklad zaradenia skutku." },
      { "name": "Závažnosť", "def": "Určenie závažnosti a výmery trestu." },
      { "name": "Odlíšenie od priestupku", "def": "Hranica trestnosti." } ] }
  ]
}
```

## A5 — Páchateľ (FO, PO)
```json
{
  "center": "Páchateľ – fyzická osoba × právnická osoba",
  "branches": [
    { "name": "Fyzická osoba", "leaves": [
      { "name": "Vek", "def": "Trestná zodpovednosť od 14 rokov (pri vybraných situáciách skúmanie vyspelosti do 15)." },
      { "name": "Príčetnosť", "def": "Schopnosť rozpoznať protiprávnosť a ovládať konanie." },
      { "name": "Zavinenie", "def": "Úmysel alebo nedbanlivosť ako podmienka zodpovednosti." },
      { "name": "Osobitný subjekt", "def": "Niektoré TČ vyžadujú špeciálne postavenie (napr. verejný činiteľ)." } ] },
    { "name": "Právnická osoba", "leaves": [
      { "name": "Zákon č. 91/2016 Z. z.", "def": "Trestná zodpovednosť právnických osôb — osobitný zákon." },
      { "name": "Pričítateľnosť", "def": "Konanie štatutárov, zamestnancov a osôb konajúcich v jej mene." },
      { "name": "Tresty pre PO", "def": "Peňažný trest, prepadnutie majetku, zákaz činnosti, zrušenie PO." },
      { "name": "Obmedzenia", "def": "PO nezodpovedá za všetky TČ — len za zákonom vymenované." } ] },
    { "name": "Spôsobilosť a zodpovednosť", "leaves": [
      { "name": "Vek + príčetnosť", "def": "Základné podmienky trestnej zodpovednosti FO." },
      { "name": "Ovládacia schopnosť", "def": "Schopnosť ovládať svoje konanie." },
      { "name": "Rozpoznávacia schopnosť", "def": "Schopnosť rozpoznať protiprávnosť konania." } ] }
  ]
}
```

## A6 — Subjektívna stránka, omyl
```json
{
  "center": "Subjektívna stránka – zavinenie × úmysel × nedbanlivosť × omyl",
  "branches": [
    { "name": "Subjektívna stránka", "leaves": [
      { "name": "Psychický vzťah", "def": "Vnútorný vzťah páchateľa k činu a následku." },
      { "name": "Zavinenie", "def": "Obligatórny znak — úmysel alebo nedbanlivosť." },
      { "name": "Motív a pohnútka", "def": "Znak SP len vtedy, keď to zákon vyžaduje." } ] },
    { "name": "Formy zavinenia", "leaves": [
      { "name": "Úmysel priamy", "def": "Páchateľ chcel porušiť alebo ohroziť chránený záujem." },
      { "name": "Úmysel nepriamy", "def": "Vedel, že môže porušiť, a bol s tým uzrozumený." },
      { "name": "Vedomá nedbanlivosť", "def": "Vedel, že môže spôsobiť následok, ale bez primeraných dôvodov sa spoliehal, že nenastane." },
      { "name": "Nevedomá nedbanlivosť", "def": "Nevedel, hoci vedieť mal a mohol." } ] },
    { "name": "Omyl", "leaves": [
      { "name": "Skutkový omyl", "def": "Omyl o faktoch — vylučuje úmysel." },
      { "name": "Právny omyl nevyhnutný", "def": "Nemohol sa mu vyhnúť — vylučuje zavinenie." },
      { "name": "Právny omyl vyhnuteľný", "def": "Mohol sa mu vyhnúť — zodpovednosť trvá, môže znížiť trest." } ] },
    { "name": "Význam", "leaves": [
      { "name": "Vznik zodpovednosti", "def": "Bez zavinenia niet trestnej zodpovednosti." },
      { "name": "Kvalifikácia a trest", "def": "Forma zavinenia ovplyvňuje kvalifikáciu aj výmeru trestu." } ] }
  ]
}
```

## A7 — Okolnosti vylučujúce protiprávnosť
```json
{
  "center": "Okolnosti vylučujúce protiprávnosť – nutná obrana × krajná núdza",
  "branches": [
    { "name": "Pojem", "leaves": [
      { "name": "Formálne znaky TČ", "def": "Konanie formálne napĺňa znaky trestného činu." },
      { "name": "Nie je protiprávne", "def": "Právny poriadok ho za daných okolností dovoľuje." },
      { "name": "Vylučuje zodpovednosť", "def": "Trestná zodpovednosť nevzniká." } ] },
    { "name": "Nutná obrana", "leaves": [
      { "name": "Odvrátenie útoku", "def": "Konanie odvracia útok na chránený záujem." },
      { "name": "Protiprávny útok", "def": "Útok musí byť protiprávny a trvať alebo priamo hroziť." },
      { "name": "Primeranosť", "def": "Obrana nesmie byť zjavne neprimeraná útoku." },
      { "name": "Netreba ustupovať", "def": "Obranca nemá povinnosť útoku ustúpiť." } ] },
    { "name": "Krajná núdza", "leaves": [
      { "name": "Odvrátenie nebezpečenstva", "def": "Odvracia sa nebezpečenstvo (nie útok osoby)." },
      { "name": "Neodvrátiteľnosť inak", "def": "Nebezpečenstvo nemožno za daných okolností odvrátiť inak." },
      { "name": "Proporcionalita", "def": "Spôsobený následok nesmie byť zjavne závažnejší než hroziaci." } ] },
    { "name": "Ďalšie okolnosti", "leaves": [
      { "name": "Súhlas poškodeného", "def": "Dovolené nakladanie s vlastným právom v medziach zákona." },
      { "name": "Povolené riziko", "def": "Riziko spoločensky prospešnej činnosti v medziach pravidiel." },
      { "name": "Výkon práva a povinnosti", "def": "Konanie pri výkone práva alebo plnení povinnosti." },
      { "name": "Príkaz nadriadeného", "def": "Plnenie záväzného príkazu za zákonných podmienok." } ] }
  ]
}
```

## A8 — Vývinové štádiá trestného činu
```json
{
  "center": "Vývinové štádiá – príprava × pokus × dokonanie",
  "branches": [
    { "name": "Príprava", "leaves": [
      { "name": "Vytváranie podmienok", "def": "Úmyselné vytváranie podmienok na spáchanie TČ." },
      { "name": "Len OZZ", "def": "Trestná len pri obzvlášť závažných zločinoch." },
      { "name": "Bez bezprostrednosti", "def": "Nevyžaduje bezprostredné smerovanie k dokonaniu." } ] },
    { "name": "Pokus", "leaves": [
      { "name": "Bezprostredné smerovanie", "def": "Konanie bezprostredne smeruje k dokonaniu TČ." },
      { "name": "Úmysel", "def": "Pokus je možný len pri úmyselných TČ." },
      { "name": "Nedokonanie", "def": "K dokonaniu nedošlo nezávisle od vôle páchateľa." } ] },
    { "name": "Dokonanie", "leaves": [
      { "name": "Naplnené znaky", "def": "Naplnené všetky znaky skutkovej podstaty." },
      { "name": "Konzumpcia", "def": "Dokonaný čin konzumuje pokus aj prípravu." } ] },
    { "name": "Význam", "leaves": [
      { "name": "Kvalifikácia a trest", "def": "Štádium ovplyvňuje kvalifikáciu a výmeru trestu." },
      { "name": "Ochrana spoločnosti", "def": "Trestnosť skorších štádií chráni spoločnosť pred dokonaním." } ] }
  ]
}
```

## A9 — Trestná súčinnosť
```json
{
  "center": "Trestná súčinnosť – účastníctvo × spolupáchateľstvo",
  "branches": [
    { "name": "Účastníctvo", "leaves": [
      { "name": "Účasť na cudzom TČ", "def": "Úmyselná účasť na trestnom čine inej osoby." },
      { "name": "Bez vlastného naplnenia SP", "def": "Účastník nenapĺňa skutkovú podstatu vlastným konaním." } ] },
    { "name": "Formy účastníctva", "leaves": [
      { "name": "Organizátor", "def": "Zosnoval alebo riadil spáchanie trestného činu." },
      { "name": "Návodca", "def": "Naviedol iného na spáchanie trestného činu." },
      { "name": "Pomocník", "def": "Poskytol pomoc (prostriedky, rada, sľub pomoci po čine)." } ] },
    { "name": "Spolupáchateľstvo", "leaves": [
      { "name": "Spoločné konanie", "def": "Spoločné úmyselné konanie dvoch alebo viacerých osôb." },
      { "name": "Spoločné naplnenie SP", "def": "Spolu napĺňajú skutkovú podstatu trestného činu." } ] },
    { "name": "Rozdiel", "leaves": [
      { "name": "Spolupáchateľ", "def": "Trestný čin vykonáva." },
      { "name": "Účastník", "def": "Podporuje, riadi alebo navádza toho, kto čin vykoná." },
      { "name": "Trestanie", "def": "Obaja sa trestajú v rámci sadzby za čin, na ktorom sa podieľali." } ] }
  ]
}
```

## A10 — Súbeh a recidíva
```json
{
  "center": "Súbeh × recidíva",
  "branches": [
    { "name": "Súbeh", "leaves": [
      { "name": "Pojem", "def": "Viac TČ spáchaných pred právoplatným odsúdením za niektorý z nich." },
      { "name": "Úhrnný / súhrnný trest", "def": "Spôsob ukladania trestu podľa toho, či už existuje skorší rozsudok." } ] },
    { "name": "Jednočinný súbeh", "leaves": [
      { "name": "Jedno konanie", "def": "Jedným konaním naplnené viaceré skutkové podstaty." } ] },
    { "name": "Viacčinný súbeh", "leaves": [
      { "name": "Viac konaní", "def": "Viac trestných činov viacerými konaniami bez odsúdenia medzi nimi." } ] },
    { "name": "Recidíva", "leaves": [
      { "name": "Pojem", "def": "Nový trestný čin po predchádzajúcom odsúdení." },
      { "name": "Všeobecná × špeciálna", "def": "Akýkoľvek nový TČ × rovnaký/obdobný TČ." },
      { "name": "Rovnorodá × rôznorodá", "def": "Rovnaký typ TČ × iný druh TČ." },
      { "name": "Vplyv na trest (§ 47 TZ)", "def": "Horná hranica sadzby sa zvyšuje o 1/3 pri úmyselnom TČ po odsúdení za úmyselný TČ." } ] }
  ]
}
```

## A11 — Trest: pojem, účel, druhy, zásady
```json
{
  "center": "Trest – pojem × účel × druhy × zásady",
  "branches": [
    { "name": "Pojem trestu", "leaves": [
      { "name": "Ujma podľa zákona", "def": "Ujma na slobode, majetkových alebo iných právach odsúdeného (§ 31 ods. 2 TZ)." },
      { "name": "Ukladá len súd", "def": "Jediný orgán oprávnený uložiť trest." },
      { "name": "Reakcia na TČ", "def": "Základný sankčný prostriedok trestného práva." } ] },
    { "name": "Účel trestu (§ 34 TZ)", "leaves": [
      { "name": "Ochrana spoločnosti", "def": "Chrániť spoločnosť pred páchateľom." },
      { "name": "Zabránenie", "def": "Zabrániť v páchaní ďalšej trestnej činnosti." },
      { "name": "Výchova", "def": "Vychovať páchateľa k riadnemu životu." },
      { "name": "Generálna prevencia", "def": "Odradiť ostatných od páchania TČ." },
      { "name": "Morálne odsúdenie", "def": "Vyjadrenie morálneho odsúdenia spoločnosťou." } ] },
    { "name": "Druhy trestov", "leaves": [
      { "name": "Odňatie slobody", "def": "Najprísnejší trest; pre mladistvých len výnimočne." },
      { "name": "Domáce väzenie", "def": "Obmedzenie slobody v domácom prostredí." },
      { "name": "Peňažný trest", "def": "Majetková sankcia." },
      { "name": "Prepadnutie majetku / veci", "def": "Majetkové tresty prepadnutia." },
      { "name": "Zákazy", "def": "Zákaz činnosti, pobytu, účasti na verejných podujatiach." },
      { "name": "Ďalšie", "def": "Povinná práca, vyhostenie, strata titulov a hodností." } ] },
    { "name": "Zásady ukladania", "leaves": [
      { "name": "Zákonnosť", "def": "Nulla poena sine lege." },
      { "name": "Úmernosť a spravodlivosť", "def": "Trest primeraný a spravodlivý." },
      { "name": "Humánnosť", "def": "Rešpekt k ľudskej dôstojnosti." },
      { "name": "Ne bis in idem", "def": "Nie dvakrát za to isté." } ] }
  ]
}
```

## A12 — Ochranné a výchovné opatrenia
```json
{
  "center": "Ochranné × výchovné opatrenia",
  "branches": [
    { "name": "Ochranné opatrenia", "leaves": [
      { "name": "Ochranné liečenie", "def": "Liečba porúch páchateľa (liečebný charakter)." },
      { "name": "Ochranný dohľad", "def": "Bezpečnostný dohľad nad páchateľom." },
      { "name": "Zabratie veci", "def": "Odňatie veci na ochranu spoločnosti." },
      { "name": "Účel", "def": "Preventívny, liečebný alebo bezpečnostný — keď trest nestačí." } ] },
    { "name": "Výchovné opatrenia (mladiství)", "leaves": [
      { "name": "Napomenutie", "def": "Formálne napomenutie mladistvého." },
      { "name": "Dohľad probačného úradníka", "def": "Sledovanie a vedenie mladistvého." },
      { "name": "Obmedzenia a povinnosti", "def": "Výchovné obmedzenia a uložené povinnosti." },
      { "name": "Výchovné programy", "def": "Programy prevýchovy a sociálneho začlenenia." } ] },
    { "name": "Rozdiel trest × opatrenie", "leaves": [
      { "name": "Trest", "def": "Sankcia spôsobujúca ujmu." },
      { "name": "Opatrenie", "def": "Preventívny alebo výchovný zásah — nie je trest." },
      { "name": "Samostatnosť", "def": "Opatrenia možno uložiť samostatne aj popri treste." } ] }
  ]
}
```

## A13 — Mladiství
```json
{
  "center": "Mladiství – vek × vyspelosť × tresty × opatrenia",
  "branches": [
    { "name": "Veková hranica", "leaves": [
      { "name": "Mladistvý 14–18", "def": "Osoba, ktorá dovŕšila 14 a neprekročila 18 rokov (§ 94 TZ)." },
      { "name": "Pod 14 rokov", "def": "Trestná zodpovednosť nevzniká; rieši sociálnoprávna ochrana detí." } ] },
    { "name": "Vyspelosť (§ 95 TZ)", "leaves": [
      { "name": "Rozumová a mravná vyspelosť", "def": "Mladistvý < 15 rokov nemusí byť zodpovedný bez dostatočnej vyspelosti." },
      { "name": "Znalecké skúmanie", "def": "Vyspelosť sa zisťuje znalecky (prostredie, správanie, vývin)." } ] },
    { "name": "Tresty mladistvých", "leaves": [
      { "name": "Znížené sadzby", "def": "Miernejšie tresty pre neukončený osobnostný vývin (§ 97 TZ)." },
      { "name": "Odňatie slobody výnimočne", "def": "Len krajné riešenie, v podstatne nižšej sadzbe." },
      { "name": "Účel", "def": "Výchova a prevencia, nie represia." } ] },
    { "name": "Výchovné opatrenia", "leaves": [
      { "name": "Nástroje", "def": "Napomenutie, dohľad, obmedzenia a povinnosti, výchovné programy (§ 105 TZ)." },
      { "name": "Prednosť", "def": "Preferujú sa pred represívnym trestom; podporujú resocializáciu." } ] },
    { "name": "Špecifiká konania", "leaves": [
      { "name": "Šetrnosť a rýchlosť", "def": "Konanie šetrné, rýchle, často neverejné." },
      { "name": "Ochrana budúcnosti", "def": "Možnosť rýchleho zahladenia odsúdenia." } ] }
  ]
}
```

---

## Na odsúhlasenie / ďalšie kroky
1. **Mapa klastrov** (7 klastrov hore) — sedí rozdelenie a názvy? Emoji v klastroch nechať/vyhodiť?
2. Po odsúhlasení navrhem **„Súvisí s" prepojenia** a Code to celé nasadí (ako `spider` overridy alebo priamo do `A*.json` + `_map.json` — po nasadení sa Trestné otvorí mapou ako Pracovné, vrátane pavúčích hier).
3. **Štátnicové podklady A2–A13** (formát ako ukážka A1) — dodám v ďalšej dávke.
4. Pripomienka: **A10 summary začína bodom 2** — doplň bod 1 (pojem súbehu) v appke, keď budeš pri tom.
