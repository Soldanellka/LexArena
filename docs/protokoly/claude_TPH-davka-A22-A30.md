# TPH — dávka A22–A30: pavúky + podklady + mapa (výroba, dokončenie TPH!)

> **Zdroj:** summary A22–A30 od Babu. Pavúky vo formáte appky. Čísla §§ ponechané tam, kde sedia so SK TZ (A22, A23, A24, A26, A27 — Babu ich overovala na Slov-Lex a sedia); vynechané/označené tam, kde nesedia (A25 čiastočne, A28 čiastočne, A30 — viď garantské poznámky).
> ⚠️ **NOVÝ NÁLEZ K A17:** správne §§ podľa TZ 300/2005: **úkladná vražda § 144, vražda § 145, zabitie §§ 147–148, usmrtenie § 149** — v A17 summary/pavúku sú 159/160/164 (to sú §§ neoprávneného odoberania orgánov!). Po tvojom overení opravíme.

---

## ČASŤ 1 — PAVÚKY

### A22 — Trestné činy proti majetku
```json
{
  "center": "TČ proti majetku",
  "branches": [
    { "label": "Krádež (§ 212)", "leaves": [
      "Podstata – úmyselné prisvojenie si cudzej veci zmocnením sa",
      "Trestnosť – škoda nad 700 €, alebo vlámanie, vrecková či opakovaná krádež",
      "Kľúčový znak – fyzické zmocnenie bez súhlasu vlastníka"
    ] },
    { "label": "Podvod (§ 221)", "leaves": [
      "Podstata – obohatenie uvedením do omylu alebo využitím omylu",
      "Formy – aktívne uvedenie do omylu, využitie omylu, zamlčanie podstatných skutočností",
      "Rozdiel od krádeže – poškodený majetok odovzdá sám, na základe omylu",
      "Škoda – aspoň malá (nad 700 €)"
    ] },
    { "label": "Sprenevera (§ 213)", "leaves": [
      "Podstata – prisvojenie si cudzej veci, ktorá bola páchateľovi zverená",
      "Zverenie – dobrovoľné odovzdanie na účel (správa, úschova, povolanie)",
      "Kľúčový znak – vec zverená, nie odňatá; konanie v rozpore s účelom",
      "Typické – profesionálne vzťahy (zamestnanec, účtovník, správca)"
    ] },
    { "label": "Rozlíšenie trojice", "leaves": [
      "Krádež – odňatie veci",
      "Podvod – omyl poškodeného",
      "Sprenevera – zneužitie zverenia",
      "Hranica malej škody – 700 €"
    ] }
  ]
}
```

### A23 — Trestné činy hospodárske
```json
{
  "center": "Hospodárske TČ",
  "branches": [
    { "label": "Skresľovanie evidencie (§ 259)", "leaves": [
      "Podstata – pozmenenie, zničenie, zatajenie či nevedenie účtovných dokladov",
      "Cieľ – zakryť trestnú činnosť, skresliť výsledok, znížiť daň, poškodiť veriteľov",
      "Chránené – pravdivosť a transparentnosť účtovníctva"
    ] },
    { "label": "Poškodzovanie veriteľa (§ 239)", "leaves": [
      "Podstata – dlžník zmarí alebo sťaží uspokojenie veriteľov",
      "Formy – prevody a skrývanie majetku, fiktívne zmluvy, darovanie pred exekúciou",
      "Kľúčový znak – úmyselné konanie proti záujmom veriteľa"
    ] },
    { "label": "Daňové TČ (§§ 276–279)", "leaves": [
      "Skrátenie dane (§ 276) – nepravdivé údaje, zatajenie príjmov",
      "Neodvedenie dane a poistného (§ 277) – neodvedie vybrané či zrazené sumy",
      "Daňový podvod (§ 277a) – vylákanie daňovej výhody, karuselové podvody",
      "Nebezpečnosť – zásah do príjmov verejných rozpočtov"
    ] },
    { "label": "Chránený záujem", "leaves": [
      "Hospodársky poriadok – transparentnosť a stabilita",
      "Práva veriteľov – uspokojenie pohľadávok",
      "Daňový systém – príjmy štátu"
    ] }
  ]
}
```

### A24 — Všeobecne nebezpečné TČ a TČ proti životnému prostrediu
```json
{
  "center": "Všeobecne nebezpečné TČ × ochrana ŽP",
  "branches": [
    { "label": "Všeobecné ohrozenie (§ 284)", "leaves": [
      "Podstata – spôsobenie či zvýšenie všeobecného nebezpečenstva",
      "Formy – požiar, výbuch, havária, výbušniny, plyn, elektrina, rádioaktivita",
      "Trestnosť – stačí vydanie ľudí do nebezpečenstva smrti/ťažkej ujmy alebo škoda veľkého rozsahu",
      "Princíp – ohrozovací delikt, škoda nemusí vzniknúť"
    ] },
    { "label": "Ohrozenie ŽP (§ 300)", "leaves": [
      "Podstata – vydanie životného prostredia do nebezpečenstva",
      "Znak – porušenie predpisov o ochrane prírody",
      "Následok – značná alebo veľká ekologická škoda",
      "Chránené – ekologická rovnováha a zdravé životné podmienky"
    ] },
    { "label": "Odpady", "leaves": [
      "Podstata – nelegálne ukladanie, preprava, skladovanie či likvidácia odpadov",
      "Dôraz – nebezpečné odpady",
      "Riziko – ohrozenie pôdy, vody a ovzdušia"
    ] },
    { "label": "Znečisťovanie", "leaves": [
      "Podstata – vypúšťanie či únik škodlivých látok do vody, pôdy, ovzdušia",
      "Následok – vážna ekologická ujma alebo ohrozenie zdravia obyvateľstva"
    ] }
  ]
}
```

### A25 — Trestné činy proti republike
```json
{
  "center": "TČ proti republike",
  "branches": [
    { "label": "Vlastizrada (§ 311)", "leaves": [
      "Podstata – občan SR v spojení s cudzou mocou spácha TČ proti SR",
      "Formy – úklady proti SR, teror, sabotáž v spojení s cudzou mocou",
      "Závažnosť – 15–25 rokov alebo doživotie"
    ] },
    { "label": "Rozvracanie republiky (§ 312)", "leaves": [
      "Podstata – násilná zmena ústavného zriadenia",
      "Formy – narušenie samostatnosti, zvrchovanosti či územnej celistvosti SR",
      "Sadzba – vysoká, pri kvalifikovaných formách až doživotie"
    ] },
    { "label": "Teror (§ 313)", "leaves": [
      "Podstata – úmyselné usmrtenie s cieľom poškodiť ústavné zriadenie",
      "Cieľ – vyvolať strach, destabilizovať štát, donútiť orgány konať",
      "Pozn. – terorizmus ako samostatná kategória patrí do 12. hlavy (viď A30)"
    ] },
    { "label": "Chránený záujem", "leaves": [
      "Suverenita a ústavné zriadenie SR",
      "Bezpečnosť a obranyschopnosť štátu"
    ] }
  ]
}
```

### A26 — TČ proti poriadku vo verejných veciach
```json
{
  "center": "TČ proti poriadku vo verejných veciach",
  "branches": [
    { "label": "Marenie výkonu úradného rozhodnutia (§ 348)", "leaves": [
      "Podstata – úmyselné sťaženie či znemožnenie výkonu rozhodnutia",
      "Formy – činnosť napriek zákazu, nerešpektovanie zákazu vstupu/pobytu",
      "Judikatúra – už samotné vykonávanie zakázanej činnosti napĺňa SP (jazda počas zákazu)"
    ] },
    { "label": "Falšovanie verejnej listiny (§ 352)", "leaves": [
      "Podstata – vyhotovenie falošnej, pozmenenie pravej alebo použitie falošnej listiny",
      "Verejná listina – rozhodnutie súdu, notárska zápisnica, úradné potvrdenie",
      "Cieľ – neoprávnená výhoda či ovplyvnenie právneho postavenia"
    ] },
    { "label": "Ohýbanie práva (§ 326)", "leaves": [
      "Podstata – verejný činiteľ úmyselne rozhoduje v rozpore so zákonom",
      "Účel – poškodiť alebo zvýhodniť osobu",
      "Znaky – páchateľ verejný činiteľ, úmysel, nezákonné rozhodnutie, účel",
      "Závažnosť – zásah do princípov právneho štátu"
    ] },
    { "label": "Chránený záujem", "leaves": [
      "Autorita verejnej moci a výkon rozhodnutí",
      "Dôveryhodnosť verejných listín",
      "Zákonnosť rozhodovania"
    ] }
  ]
}
```

### A27 — Korupcia
```json
{
  "center": "Korupcia (§§ 328–336b)",
  "branches": [
    { "label": "Prijímanie úplatku (§§ 328–330)", "leaves": [
      "Podstata – prijme, žiada alebo si dá sľúbiť úplatok",
      "Súvislosť – výkon právomoci, obstarávanie veci všeobecného záujmu, porušenie povinností",
      "Charakter – pasívna korupcia",
      "Sadzby – vyššie pri verejnom činiteľovi a značnom rozsahu"
    ] },
    { "label": "Podplácanie (§§ 332–334)", "leaves": [
      "Podstata – poskytne, ponúkne alebo sľúbi úplatok",
      "Cieľ – konanie či zdržanie sa konania v rozpore s povinnosťami",
      "Charakter – aktívna korupcia",
      "Verejný činiteľ – osobitná SP (§ 334)"
    ] },
    { "label": "Nepriama korupcia (§ 336)", "leaves": [
      "Podstata – úplatok za pôsobenie vplyvom na verejného činiteľa",
      "Obe strany – prostredník aj ten, kto vplyv kupuje"
    ] },
    { "label": "Spoločné znaky", "leaves": [
      "Vzťah dvoch strán – prijímateľ a poskytovateľ",
      "Poškodený – verejný záujem a dôvera v právny štát",
      "Rovnosť – narúša rovnosť účastníkov právnych vzťahov"
    ] }
  ]
}
```

### A28 — TČ proti iným právam a slobodám
```json
{
  "center": "TČ proti iným právam a slobodám",
  "branches": [
    { "label": "Porušovanie domovej slobody (§ 194)", "leaves": [
      "Podstata – neoprávnené vniknutie do obydlia alebo zotrvanie v ňom",
      "Stačí – obyčajný vstup bez súhlasu oprávnenej osoby",
      "Kvalifikácia – prekonanie prekážky, skupina, chránená osoba",
      "Ústavný základ – čl. 21 Ústavy SR"
    ] },
    { "label": "Obmedzovanie osobnej slobody (§ 183)", "leaves": [
      "Podstata – protiprávne bránenie užívať osobnú slobodu, najmä voľný pohyb",
      "Kvalifikácia – chránená osoba, závažnejší spôsob, ťažká ujma či smrť",
      "Ústavný základ – čl. 17 Ústavy SR",
      "Väzba – detailne v okruhu TČ proti slobode (A19)"
    ] },
    { "label": "Diskriminácia a extrémizmus", "leaves": [
      "Podstata – znevýhodnenie osoby pre rasu, národnosť, pohlavie, vieru či iný znak",
      "Formy – porušovanie rovnosti; hanobenie a podnecovanie nenávisti (extrémistické TČ)",
      "Ústavný základ – čl. 12 Ústavy SR (rovnosť)"
    ] }
  ]
}
```

### A29 — TČ proti brannosti, civilnej službe, ozbrojeným silám, obrane vlasti; vojenské TČ
```json
{
  "center": "Brannosť × obrana vlasti × vojenské TČ",
  "branches": [
    { "label": "Proti brannosti a civilnej službe", "leaves": [
      "Brannosť – vyhýbanie sa povinnostiam obrany štátu (nenastúpenie, marenie, útek)",
      "Civilná služba – vyhýbanie sa zákonnej alternatíve vojenskej služby",
      "Rámec – branná povinnosť podľa zákona č. 150/2025 Z. z."
    ] },
    { "label": "Proti službe v ozbrojených silách", "leaves": [
      "Podstata – narúšanie disciplíny a pripravenosti ozbrojených síl",
      "Formy – nenastúpenie, neuposlúchnutie rozkazu, svojvoľné opustenie jednotky"
    ] },
    { "label": "Proti obrane vlasti", "leaves": [
      "Podstata – oslabovanie obranyschopnosti štátu",
      "Formy – sabotáž, poškodzovanie vojenského materiálu, konanie v prospech nepriateľa"
    ] },
    { "label": "Vojenské TČ", "leaves": [
      "Páchateľ – len vojak (osobitný subjekt)",
      "Formy – dezercia, neuposlúchnutie rozkazu, urážka nadriadeného, porušenie strážnej služby",
      "Chránené – vojenská disciplína, hierarchia, pripravenosť"
    ] }
  ]
}
```

### A30 — TČ proti mieru, ľudskosti, terorizmus, extrémizmus, vojnové TČ
```json
{
  "center": "Mier × ľudskosť × terorizmus × vojnové TČ (12. hlava)",
  "branches": [
    { "label": "Proti mieru", "leaves": [
      "Ohrozenie mieru – podnecovanie k vojne, propagácia a podpora vojnovej propagandy",
      "Prísnejšie – v spojení s cudzou mocou, počas krízovej situácie"
    ] },
    { "label": "Zločiny proti ľudskosti", "leaves": [
      "Genocídium – úmysel zničiť národnú, etnickú, rasovú či náboženskú skupinu",
      "Formy genocídia – usmrcovanie, bránenie rodeniu, prevádzanie detí, ničivé životné podmienky",
      "Zotročenie – otroctvo, nevoľníctvo, nútené práce, obchodovanie s ľuďmi"
    ] },
    { "label": "Terorizmus", "leaves": [
      "Podstata – zastrašenie obyvateľstva, destabilizácia usporiadania štátu",
      "Cieľ – donútiť vládu či medzinárodnú organizáciu konať alebo nekonať",
      "Prostriedok – hrozba alebo čin ohrozujúci život, zdravie, majetok"
    ] },
    { "label": "Extrémizmus", "leaves": [
      "Materiály – výroba, šírenie a držba extrémistických materiálov",
      "Hnutia – podpora hnutí potláčajúcich práva a slobody",
      "Nenávisť – hanobenie národa, rasy, etnika; podnecovanie k nenávisti"
    ] },
    { "label": "Vojnové TČ", "leaves": [
      "Podstata – závažné porušenia humanitárneho práva počas konfliktu",
      "Formy – útoky na civilistov, mučenie zajatcov, zakázané zbrane, ničenie chránených objektov",
      "Rámec – Ženevské dohovory; trestné aj podľa medzinárodného práva"
    ] }
  ]
}
```

---

## ČASŤ 2 — MAPA (9 → 13 klastrov)

```
zmena:
  osobitna-cast · label „Osobitná časť – osoba a rodina" · [17, 18, 19, 20, 21, 28]  ← +28

nové clusters:
  majetok-a-hospodarstvo · Majetok a hospodárstvo · [22, 23]
  vseobecne-nebezpecne   · Všeobecne nebezpečné a ŽP · [24]
  stat-a-verejna-moc     · Štát a verejná moc · [25, 26, 27, 29]
  mier-a-ludskost        · Mier a ľudskosť · [30]

nové links (nesmerované):
  22–23 „majetkové × hospodárske delikty"
  24–18 „ohrozovací princíp v praxi"
  25–29 „bezpečnosť a obrana štátu"
  25–30 „vnútroštátna × medzinárodná ochrana štátu"
  26–27 „verejná moc a jej korumpovanie"
  27–14 „korupcia a zodpovednosť právnických osôb"
  28–19 „príbuzné skutkové podstaty slobody"
  30–16 „medzinárodný a európsky rozmer"
```

---

## ČASŤ 3 — ŠTÁTNICOVÉ PODKLADY (skrátený formát)

### A22 — TČ proti majetku
**Kľúčové body:** krádež § 212 (zmocnenie; nad 700 € / vlámanie / vrecková / opakovaná) · podvod § 221 (omyl → obohatenie; poškodený odovzdá sám) · sprenevera § 213 (zverená vec, rozpor s účelom) · trojica: odňatie × omyl × zverenie · hranica malej škody 700 €.
**Otázky (over):** 1. Krádež × lúpež (pristúpi násilie). 2. Podvod × sprenevera pri zverených peniazoch. 3. Škodové pásma (malá → veľkého rozsahu). 4. Neoprávnené užívanie cudzej veci — čím sa líši od krádeže? 5. Pokus podvodu.
**Chyby:** trojica sa mieša (kľúč: ako sa vec dostala k páchateľovi) · „krádež až od 700 €" bez výnimiek (vlámanie!) · lúpež ako kvalifikovaná krádež.
**Vodítko:** 1 = tri SP + rozlíšenie + pásma škody; 2 = SP bez pásiem; 3 = definície hrubé; 4 = mieša SP.

### A23 — Hospodárske TČ
**Kľúčové body:** skresľovanie evidencie § 259 · poškodzovanie veriteľa § 239 · daňové §§ 276–279 (skrátenie / neodvedenie / daňový podvod § 277a — karusely) · chránené: účtovníctvo, veritelia, rozpočty.
**Otázky (over):** 1. Skrátenie dane × daňový podvod (znížiť daň × vylákať výhodu). 2. Neodvedenie DPH/odvodov — kedy trestné. 3. Poškodzovanie × zvýhodňovanie veriteľa. 4. Účinná ľútosť pri daňových TČ (§ 86 — over). 5. Vzťah k A14 (daňové TČ právnických osôb).
**Chyby:** skrátenie × neodvedenie sa mieša · „dlh = trestný čin" (nie, treba marenie) · karusel vysvetlený ako obyčajné skrátenie.
**Vodítko:** 1 = tri skupiny + rozdiely daňových SP; 2 = skupiny bez rozdielov; 3 = len daňové hrubo; 4 = nevie rozlíšiť.

### A24 — Všeobecne nebezpečné a ŽP
**Kľúčové body:** všeobecné ohrozenie § 284 (požiar, výbuch…; stačí ohrozenie viacerých osôb / škoda veľkého rozsahu) · ohrozenie ŽP § 300 (porušenie predpisov, ekologická škoda) · odpady · znečisťovanie · ohrozovací princíp (väzba A4, A18).
**Otázky (over):** 1. Koľko osôb = „viacero" pri § 284? 2. Úmyselná × nedbanlivostná forma ohrozenia. 3. Ekologická škoda — ako sa vyčísľuje? 4. Súbeh § 284 s ublížením/usmrtením. 5. Prevencia: prečo trestať už ohrozenie?
**Chyby:** „bez škody nie je TČ" · § 284 len pri požiari · ekologické TČ ako priestupky.
**Vodítko:** 1 = obe SP + princíp + odpady/znečistenie; 2 = SP bez princípu; 3 = len § 284; 4 = nechápe ohrozovací princíp.

### A25 — TČ proti republike
**Kľúčové body:** vlastizrada § 311 (občan SR + cudzia moc + TČ proti SR) · rozvracanie § 312 (ústavné zriadenie, zvrchovanosť, celistvosť) · teror § 313 (usmrtenie s protištátnym cieľom) · najzávažnejšie sadzby. **Pozn.: „terorizmus" ako kategória = 12. hlava (A30)** — v A25 je klasický „teror".
**Otázky (over):** 1. Vlastizrada — prečo len občan SR (osobitný subjekt, väzba A3)? 2. Rozvracanie × ústavne zaručená sloboda prejavu. 3. Teror (§ 313) × terorizmus (12. hlava). 4. Sabotáž. 5. Príprava pri týchto zločinoch (väzba A8).
**Chyby:** vlastizrada u cudzinca · teror = terorizmus · „kritika vlády = rozvracanie".
**Vodítko:** 1 = tri SP + subjekt + odlíšenie teror/terorizmus; 2 = SP správne; 3 = hrubé definície; 4 = mieša pojmy.

### A26 — TČ proti poriadku vo verejných veciach
**Kľúčové body:** marenie výkonu úradného rozhodnutia § 348 (jazda počas zákazu!) · falšovanie verejnej listiny § 352 · ohýbanie práva § 326 (verejný činiteľ, úmysel, nezákonné rozhodnutie, účel poškodiť/zvýhodniť).
**Otázky (over):** 1. Čo všetko je verejná listina? 2. Ohýbanie práva × nesprávny právny názor (kľúčové!). 3. Marenie — stačí nedbanlivosť? (nie, úmysel). 4. Útok na verejného činiteľa — súvisiace SP. 5. Kto je verejný činiteľ (definícia § 128 — over).
**Chyby:** ohýbanie práva pri každom zlom rozhodnutí (chýba úmysel+účel) · falšovanie súkromnej listiny pod § 352 · marenie z nedbanlivosti.
**Vodítko:** 1 = tri SP + verejný činiteľ + odlíšenie právneho názoru; 2 = SP bez odlíšení; 3 = hrubo; 4 = mieša.

### A27 — Korupcia
**Kľúčové body:** prijímanie §§ 328–330 (pasívna: prijme/žiada/dá si sľúbiť) · podplácanie §§ 332–334 (aktívna: poskytne/ponúkne/sľúbi) · nepriama korupcia § 336 (obchodovanie s vplyvom) · vždy dve strany; poškodený = verejný záujem; prísnejšie pri verejnom činiteľovi.
**Otázky (over):** 1. Je trestné aj prijatie úplatku „po" — dodatočná odmena? 2. Vec všeobecného záujmu — príklady. 3. Musí úplatok byť peniaze? (akákoľvek výhoda). 4. Korupcia vo verejnom × súkromnom sektore. 5. Oznámenie korupcie — beztrestnosť oznamovateľa (over aktuálny stav § 86).
**Chyby:** „úplatok len peniaze" · trestná len jedna strana · nepriama korupcia zabudnutá · malý úplatok „nie je TČ".
**Vodítko:** 1 = tri formy + obe strany + verejný činiteľ; 2 = formy bez detailov; 3 = len prijímanie/podplácanie; 4 = mieša aktívnu a pasívnu.

### A28 — TČ proti iným právam a slobodám
**Kľúčové body:** porušovanie domovej slobody § 194 (stačí vstup bez súhlasu; čl. 21 Ústavy) · obmedzovanie osobnej slobody § 183 (čl. 17) · diskriminácia a extrémistické formy (rovnosť, čl. 12). §§ diskriminačných SP — **over presné čísla** (v summary § 190/424/424a — skontroluj rozsah).
**Otázky (over):** 1. Obydlie — čo všetko (aj hotelová izba, dvor?). 2. Domová prehliadka ako zákonný zásah (kontrast s § 194; väzba na TP). 3. Vniknutie × zotrvanie. 4. Diskriminácia trestná × antidiskriminačný zákon (civilná). 5. Nenávistný motív ako priťažujúca okolnosť.
**Chyby:** „vstup bez poškodenia nie je TČ" · obydlie len byt · miešanie trestnej a civilnej diskriminácie.
**Vodítko:** 1 = tri okruhy + ústavné základy; 2 = SP bez ústavy; 3 = hrubo; 4 = mieša.

### A29 — Brannosť, obrana vlasti, vojenské TČ
**Kľúčové body:** proti brannosti (vyhýbanie sa; zákon č. 150/2025) · proti civilnej službe · proti službe v ozbrojených silách (disciplína) · proti obrane vlasti (sabotáž, prospech nepriateľa) · vojenské TČ — **páchateľ len vojak** (osobitný subjekt): dezercia, rozkaz, strážna služba.
**Otázky (over):** 1. Osobitný subjekt vojak (väzba A3/A5). 2. Rozkaz zjavne protiprávny — poslušnosť? (väzba A7 plnenie príkazu). 3. Dezercia × svojvoľné opustenie. 4. Kedy sa aktivujú branné SP (krízový stav?). 5. Civilná služba — dôvod svedomia.
**Chyby:** vojenské TČ u civilistu · „rozkaz ospravedlní všetko" · brannosť zamieňaná so službou.
**Vodítko:** 1 = päť skupín + osobitný subjekt + rozkaz; 2 = skupiny bez subjektu; 3 = hrubo; 4 = mieša.

### A30 — Mier, ľudskosť, terorizmus, extrémizmus, vojnové TČ
**Kľúčové body:** 12. hlava · ohrozenie mieru (vojnová propaganda) · genocídium (úmysel zničiť skupinu) a zotročenie · terorizmus (zastrašenie, destabilizácia, donútenie vlády) · extrémizmus (materiály, hnutia, nenávisť) · vojnové TČ (humanitárne právo, Ženevské dohovory). **⚠️ §§ v summary (148–151) nesedia — 12. hlava je §§ 417 a nasl. (ohrozenie mieru § 417, genocídium § 418, terorizmus § 419, extrémizmus §§ 421–424a, vojnové §§ 426 a nasl. — over presne).**
**Otázky (over):** 1. Genocídium × zločiny proti ľudskosti × vojnové TČ — rozlíšenie. 2. Terorizmus (§ 419) × teror (§ 313). 3. Nepremlčateľnosť týchto zločinov (väzba A15!). 4. Extrémistický materiál — držba stačí? 5. Zodpovednosť veliteľa za podriadených.
**Chyby:** genocídium „len zabíjanie" (aj bránenie rodeniu, prevádzanie detí) · terorizmus = teror · premlčanie genocídia · extrémizmus len verejné prejavy.
**Vodítko:** 1 = päť kategórií + nepremlčateľnosť + teror/terorizmus; 2 = kategórie bez väzieb; 3 = hrubo; 4 = mieša kategórie.

---

## Garantské poznámky (dôležité!)
1. **A17 (spätne):** úkladná vražda **§ 144**, vražda **§ 145**, zabitie **§§ 147–148**, usmrtenie **§ 149** — v nasadenom pavúku/summary sú 159/160/164 (§§ odoberania orgánov). Po overení opravíme pavúk aj summary.
2. **A30:** §§ 148–151 v summary patria inde — 12. hlava = §§ 417+. Pavúk je bez čísel; summary oprav.
3. **A25:** § 313 je „teror" (nie terorizmus) — v pavúku zohľadnené poznámkou; v summary zváž preformulovanie.
4. **A28:** over §§ diskriminačných SP (§ 190? § 424/424a rozsah).
5. **A22–A24, A26, A27:** §§ sedia so Slov-Lex — v pavúkoch ponechané. ✓
