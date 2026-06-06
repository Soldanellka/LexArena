// =====================================
// TRESTNÉ PRÁVO – DÁTOVÝ MODEL (2026)
// =====================================

// ===== SEKCIE (A, B, C, QUIZ) =====
const TRESTNE_SECTIONS = [
  {
    id: "A",
    nazov: "Trestné právo hmotné",
    popis: "Základné inštitúty, pojmy, zásady",
    poradie: 1
  },
  {
    id: "B",
    nazov: "Trestné právo procesné",
    popis: "Konanie, subjekty, opravné prostriedky",
    poradie: 2
  },
  {
    id: "C",
    nazov: "Praktické príklady",
    popis: "Kazuistiky a aplikácia práva",
    poradie: 3
  },
  {
    id: "QUIZ",
    nazov: "Veľký kvíz",
    popis: "Otestuj sa naprieč celým trestným právom",
    poradie: 4
  }
];

// ===== OTÁZKY (A1 zatiaľ, ďalšie doplníme) =====
const TRESTNE_QUESTIONS = [
  {
    id: "A1",
    section: "A",
    kod: "A1",
    nazov: "Pojem, funkcie a zásady trestného práva hmotného",

    vysvetlenie: `
Trestné právo hmotné určuje, čo je trestný čin, aké tresty možno uložiť a za akých podmienok vzniká trestná zodpovednosť. 
Plní ochrannú, preventívnu, represívnu a regulatívnu funkciu. Trestné právo hmotné je jedno z odvetví slovenského právneho poriadku, 
ktoré chráni významné spoločenské vzťahy pred protiprávnym konaním tým, že určuje čo je to trestný čin, ustanovuje podmienky 
trestnej zodpovednosti, beztrestnosti, druhy sankcií spôsob ich ukladania a výkonu.
Opiera sa o zásady zákonnosti, proporcionality, humanizmu, individuálnej zodpovednosti a subsidiarity trestnej represie.
`,

    priklad: `
Páchateľ spácha krádež v roku 2024. 
V roku 2025 sa zmení zákon a trest je miernejší. 
Použije sa zákon z roku 2025 podľa zásady lex mitior.
`,

    klucove_slova: [
      "zásada humanizmu a zásada zákonnosti",
      "zásada trestnej zodpovednosti fyzických osôb za trestný čin",
      "zásada subsidiarity trestnej represie - ultima ratio",
      "zásada zodpovednosti za zavinenie",
      "zásada trestnej zodpovednosti právnických osôb",
      "zásada súbežnej a nezávislej zodpovednosti FO a PO",
      "zásada pričítateľnosti činu PO",
      "zásada prechodu trestnej zodpovednosti na právneho nástupcu PO"
      ],

    zapamataj_si: [
      "Trestné právo hmotné definuje trestné činy a tresty.",
      "Zásada nullum crimen sine lege je základ.",
      "Trestné právo je ultima ratio.",
      "Pri časovej pôsobnosti sa použije miernejší zákon.",
      "Pôsobnosť zákona má vecnú, osobnú, územnú a časovú rovinu."
    ],

    literatura: [
      "Ivor – Polák – Záhora: Trestné právo hmotné I.",
      "Repetitórium trestného práva (úvodné kapitoly)",
      "Praktikum z trestného práva hmotného"
    ]
  },
{
  id: "A2",
  section: "A",
  kod: "A2",
  nazov: "Trestný čin a jeho druhy, triedenie",

  vysvetlenie: `
Trestný čin je protiprávne konanie, ktorého zákonné znaky sú uvedené v Trestnom zákone a ktoré dosahuje potrebný stupeň spoločenskej škodlivosti. Ide spravidla o dokonaný čin, výnimočne o pokus, ak to zákon pripúšťa.
Jeho znaky sa delia na typové (znaky skutkovej podstaty trestného činu) a všeobecné, medzi ktoré patria najmä vek, príčetnosť a primeraná rozumová a mravná vyspelosť páchateľa.
Trestné činy sa členia na prečiny, zločiny a obzvlášť závažné zločiny. Podľa formy konania môžu byť komisívne (spáchané konaním) alebo omisívne (spáchané opomenutím). Z hľadiska zavinenia rozlišujeme úmyselné a nedbanlivostné trestné činy. Podľa následku môžu byť poruchové alebo ohrozovacie.
Z časového hľadiska poznáme pokračovacie, hromadné a trváce trestné činy.
`,

  priklad: `
Opakované drobné krádeže môžu tvoriť pokračovací trestný čin.
`,

  klucove_slova: [
    "prečin",
    "zločin",
    "pokračovací čin",
    "spoločenská škodlivosť"
  ],

  zapamataj_si: [
    "Prečin = trestný čin z nedbanlivosti alebo úmyselný čin s trestnou sadzbou do 5 rokov; u mladistvého čin malej závažnosti nie je trestným činom.",
    "Zločin = úmyselný trestný čin so sadzbou nad 5 rokov; obzvlášť závažný zločin má dolnú hranicu min. 10 rokov.",
    "Pokračovací čin = viac útokov s rovnakou skutkovou podstatou, objektívnou súvislosťou (čas, spôsob, predmet) a subjektívnou súvislosťou (jednotiaci zámer); hromadný čin vzniká až súhrnom viacerých útokov, ktoré samostatne nie sú trestným činom."
  ],

  literatura: [
    "TPH I. – trestný čin"
  ]
},
{
  id: "A3",
  section: "A",
  kod: "A3",
  nazov: "Skutková podstata – pojem, znaky a triedenie",

  vysvetlenie: `
Skutkovou podstatou trestného činu rozumieme súhrn konkrétnych znakov, ktoré charakterizujú určité ľudské správanie ako trestný čin. Skutková podstata je jedným z formálnych znakov trestného činu. 
Znaky: objekt, objektívna stránka, páchateľ, subjektívna stránka. Všetky štyri skupiny znakov tvoria jeden neoddeliteľný celok a sú pre skutkovú podstatu trestného činu obligatórne. Sú prítomné v každej skutkovej podstate, aj keď nie vždy výslovne uvedené. Ak by niektorý z týchto znakov chýbal, nejde o trestný čin. 
Triedenie: základná (1 stupeň), kvalifikovaná (obzvlášť priťažujúce okolnosti, zvyšujú závažnosť trestného činu), privilegovaná (znižujú závažnosť trestného činu). Podľa štruktúry na jednoduché (po jednom znaku) a zložené (pluralita znakov). Zložené sa ďalej delia na alternatívne a kumulatívne (súčasne). Podľa vyjadrenia na opisné (užšie, širšie), odkazovacie (odkaz na inú SP) a blanketové (odkaz na iné odvetie).
`,

  priklad: `
Krádež má základnú SP, ale ak je spáchaná so zbraňou, ide o kvalifikovanú SP.
`,

  klucove_slova: [
    "SP",
    "objekt",
    "subjekt",
    "kvalifikovaná SP"
  ],

  zapamataj_si: [
    "SP je jadro trestného činu.",
    "Každá SP má štyri znaky.",
    "Kvalifikovaná SP = vyššia trestnosť."
  ],

  literatura: [
    "TPH I. – skutková podstata"
  ]
},
{
  id: "A4",
  section: "A",
  kod: "A4",
  nazov: "Objektívne znaky skutkovej podstaty",
  vysvetlenie: `
Objektom trestného činu sú spoločenské vzťahy chránené Trestným zákonom; zákon ich spravidla nevymenúva priamo, preto ich určujeme výkladom. Všeobecný objekt zahŕňa najdôležitejšie hodnoty, ktoré zákon chráni (práva osôb, záujmy spoločnosti, ústavné zriadenie). Druhový (skupinový) objekt je užšia skupina príbuzných záujmov usporiadaná v hlávach osobitnej časti zákona (napr. trestné činy proti majetku alebo proti životu a zdraviu). Individuálny objekt je konkrétny záujem chránený daným ustanovením – odpoveď na otázku "čo toto ustanovenie chráni?".

Z hľadiska významu rozlišujeme primárny objekt (hlavná chránená hodnota, na ktorú čin priamo útočí) a sekundárny objekt (vedľajšia hodnota zasiahnutá popri tom). Oba sú rozhodujúce pre správnu právnu kvalifikáciu, pretože konanie, ktoré nezasahuje žiadnu chránenú hodnotu, nemôže byť trestným činom.

Hmotný predmet útoku je odlišný pojem: ide o vec, zviera alebo človeka, na ktorý páchateľ priamo pôsobí, aby zasiahol objekt. Je to fakultatívny znak objektívnej stránky, ktorý sa stáva povinným len vtedy, ak je výslovne uvedený v skutkovej podstate (napr. "dieťa" pri únose, "cudzia vec" pri krádeži, "zviera" pri týraní zvierat). Niektoré trestné činy hmotný predmet útoku nemajú (napr. neoznámenie trestného činu, dezercia).

Objektívna stránka vyjadruje vonkajšiu podobu činu a zahŕňa konanie (alebo opomenutie), následok (porušenie alebo ohrozenie chránených vzťahov) a príčinný vzťah medzi nimi: konanie → následok → príčinný vzťah. Fakultatívne znaky ako predmet útoku, čas alebo miesto sa stávajú povinnými len vtedy, ak ich skutková podstata výslovne obsahuje.
  `,
  priklad: `Osoba odcudzí v obchode kozmetiku — všeobecným objektom je ochrana majetkového poriadku, druhovým objektom sú trestné činy proti majetku, individuálnym objektom je majetok konkrétneho obchodu, primárnym objektom vlastnícke právo, hmotným predmetom útoku je "cudzia vec" (kozmetika). Objektívna stránka: konanie (odcudzenie) → následok (strata tovaru) → príčinný vzťah.`,
  klucove_slova: [
    "všeobecný objekt",
    "druhový objekt",
    "individuálny objekt",
    "primárny objekt",
    "sekundárny objekt",
    "hmotný predmet útoku",
    "konanie",
    "následok",
    "kauzalita"
  ],
  zapamataj_si: [
    "Objekt trestného činu = chránené spoločenské vzťahy.",
    "Individuálny objekt odpovedá na otázku: čo ustanovenie chráni?",
    "Objektívna stránka: konanie → následok → príčinný vzťah."
  ],
  literatura: [
    "TPH I. – objektívna stránka"
  ]
},
{
  id: "A5",
  section: "A",
  kod: "A5",
  nazov: "Páchateľ trestného činu – FO a PO",

  vysvetlenie: `
Páchateľ trestného činu je ten, kto trestný čin spáchal. Môže to byť FO alebo PO — PO však nemôže konať sama; jej konanie sa pripisuje cez osoby, ktoré za ňu konajú (štatutárny orgán, osoby vykonávajúce kontrolu alebo iné oprávnené osoby). Aby sa právnickej osobe pripísala trestná zodpovednosť, musia byť splnené tieto podmienky: existuje protiprávne konanie; konanie vykonala osoba uvedená v zákone (§ 4 TZPO); konanie bolo v prospech právnickej osoby, v jej mene, v rámci jej činnosti alebo jej prostredníctvom; konanie je právnickej osobe pripísateľné podľa zákona. Zákon zároveň vymedzuje, ktoré PO nepodliehajú trestnej zodpovednosti (napr. štát a jeho orgány, niektoré inštitúcie zriadené zákonom, obce, vybrané subjekty s konkurznou imunitou). Triedenie páchateľov podľa znakov skutkovej podstaty: Páchateľ môže byť všeobecný, ak skutková podstata nevyžaduje žiadnu osobitnú vlastnosť a čin môže spáchať ktokoľvek trestne zodpovedný. Pri špeciálnom alebo konkrétnom páchateľovi zákon vyžaduje určitú vlastnosť, postavenie alebo kvalitu (napr. verejný činiteľ, vojak, matka novonarodeného dieťaťa).
`,

  priklad: `
Konateľ spoločnosti prikáže účtovníčke skryť príjem a presunúť peniaze na účet dodávateľa, aby sa obchádzali dane. Účtovníčka vykoná pokyn.FO páchateľ: účtovníčka vykonala konkrétne úkony; konateľ môže byť stíhaný ako organizátor alebo návodca. PO páchateľ: ak bolo konanie vykonané v mene alebo v prospech spoločnosti a konateľ ako štatutárny orgán konal v rámci jej činnosti, môže sa trestná zodpovednosť pripísať spoločnosti podľa TZPO. Dôsledok: súčasné stíhanie FO (konateľ, účtovníčka) a PO, ak sú splnené zákonné znaky pričítania.Triedenie páchateľov podľa znakov skutkovej podstaty je nasledovné.  
Páchateľ môže byť všeobecný, ak skutková podstata nevyžaduje žiadnu osobitnú vlastnosť a čin môže spáchať ktokoľvek trestne zodpovedný. Pri špeciálnom alebo konkrétnom páchateľovi zákon vyžaduje určitú vlastnosť, postavenie alebo kvalitu (napr. verejný činiteľ, vojak, matka novonarodeného dieťaťa).`,

  klucove_slova: [
    "Páchateľ",
    "Právnická osoba",
    "Príčetnosť",
    "Štatutárny orgán"
  ],

  zapamataj_si: [
    "Páchateľ = ten, kto spáchal trestný čin (FO alebo PO za zákonom stanovených podmienok).",
    "PO nemá vlastnú vôľu; jej konanie sa pripisuje cez osoby, ktoré za ňu konajú. Podmienky zodpovednosti PO sú protiprávne konanie; konanie osoby uvedenej v § 4 TZPO; konanie v prospech/meno/ramci činnosti PO; pričítateľnosť."

  ],

  literatura: [
    "TPH I. – subjekt"
  ]
},
{
  id: "A6",
  section: "A",
  kod: "A6",
  nazov: "Subjektívna stránka a omyl v trestnom práve",

  vysvetlenie: `
Subjektívna stránka trestného činu je vnútorná psychická stránka konania páchateľa – teda to, ako páchateľ vnímal, chcel alebo bol uzrozumený s následkami svojho konania.
Jej obligatórnym znakom je zavinenie, ktoré sa skladá z dvoch zložiek:

intelektuálna (vedomosť, predstava o okolnostiach),

vôľová (chcenie alebo uzrozumenie).

Fakultatívne znaky subjektívnej stránky sú motív a cieľ, ak ich skutková podstata vyžaduje (napr. konať „v úmysle zmocniť sa veci“ pri lúpeži).

Zavinenie môže byť:

úmyselné,

v úmysle (špeciálny úmysel),

z nedbanlivosti,

hoci aj z nedbanlivosti (stačí nedbanlivosť, môže byť aj úmysel).

Ak skutková podstata zavinenie neuvádza, platí zásada: trestnosť vyžaduje úmysel, ak zákon neustanovuje, že stačí nedbanlivosť.

Omyl je nesúlad medzi tým, čo si páchateľ myslí, a skutočnosťou.
Poznáme:

skutkový omyl negatívny (nepozná okolnosť → vylučuje úmysel),

skutkový omyl pozitívny (myslí si, že sú splnené znaky → pokus),

právny omyl negatívny (nepozná zákon → neospravedlňuje),

právny omyl pozitívny (myslí si, že koná trestne, ale nekoná → nejde o trestný čin).
Osobitné prípady: error in objecto, aberatio ictus, error generalis.
`,

  priklad: `
Muž chce ukradnúť bicykel pred obchodom. Vidí bicykel, myslí si, že je cudzí, odstrihne zámok a odíde.

Úmysel: chcel sa zmocniť cudzej veci → úmyselné zavinenie.

Motív/cieľ: chcel získať majetkový prospech → fakultatívny znak.

Skutkový omyl negatívny: ak by bicykel patril jemu, ale zabudol na to → chýba úmysel, nejde o krádež.

Skutkový omyl pozitívny: ak by chcel ukradnúť bicykel, ale zobral svoj vlastný → pokus krádeže.
`,

  klucove_slova: [
    "Subjektívna stránka",
    "Zavinenie (úmysel / nedbanlivosť)",
    "Motív a cieľ",
    "Omyl (skutkový / právny)"
  ],

  zapamataj_si: [
    "Subjektívna stránka = vnútorný psychický vzťah páchateľa k činu; jej základom je zavinenie.",
    "Omyl môže vylúčiť úmysel alebo viesť k pokusu, ale neznalosť zákona neospravedlňuje."
  ],

  literatura: [
    "TPH I. – subjektívna stránka"
  ]
},
{
  id: "A7",
  section: "A",
  kod: "A7",
  nazov: "Okolnosti vylučujúce protiprávnosť",

  vysvetlenie: `
Okolnosti vylučujúce protiprávnosť sú situácie, pri ktorých čin, ktorý by inak bol trestným činom, nie je trestný, pretože mu chýba znak protiprávnosti.
Ide o prípady, keď právo výnimočne dovolí zasiahnuť do chránených záujmov (život, zdravie, majetok), ak je to nevyhnutné alebo spoločensky akceptované.

Trestný zákon pozná tieto okolnosti:

1. Krajná núdza (§ 24 TZ)
Konanie na odvrátenie priamo hroziaceho nebezpečenstva, ak ho nebolo možné odvrátiť inak a spôsobený následok nie je závažnejší než hroziaci. Neplatí, ak osoba bola povinná nebezpečenstvo znášať.

2. Nutná obrana (§ 25 TZ)
Konanie na odvrátenie priamo hroziaceho alebo trvajúceho útoku človeka. Obrana nesmie byť celkom zjavne neprimeraná útoku. Zahŕňa aj putatívnu obranu (mylnú domnienku útoku).

3. Oprávnené použitie zbrane (§ 26 TZ)
Použitie zbrane úradnou osobou podľa zákona alebo civilom v obydlí proti neoprávnenému vniknutiu, ak nejde o nutnú obranu a nie je spôsobená smrť úmyselne.

4. Dovolené riziko (§ 27 TZ)
Konanie v oblasti výroby a výskumu, kde je riziko nevyhnutné na dosiahnutie spoločensky prospešného výsledku a je v súlade s poznaním, zákonom a dobrými mravmi.

5. Výkon práva a povinnosti (§ 28 TZ)
Konanie, ktoré je vykonané v rámci zákonného oprávnenia, povinnosti, rozhodnutia súdu, orgánu verejnej moci, pracovnej úlohy alebo zmluvy. Neplatí pri genocíde, neľudskosti a nedobrovoľnom zmiznutí.

6. Súhlas poškodeného (§ 29 TZ)
Platí pri záujmoch, o ktorých môže poškodený rozhodovať. Súhlas musí byť vážny, dobrovoľný, zrozumiteľný a daný vopred alebo počas činu. Nevzťahuje sa na život a zdravie (okrem zdravotnej starostlivosti).

7. Plnenie úlohy agenta (§ 30 TZ)
Agent konajúci podľa zákona nie je trestne zodpovedný, ak poruší chránený záujem preto, že bol donútený zločineckou skupinou alebo konal v dôvodnej obave o život či zdravie. Nesmie však spôsobiť ťažkú ujmu alebo smrť.`,

  priklad: `
Muž vidí, že v susedovom byte horí a dnu zostalo dieťa. Rozbije okno, vlezie dnu a dieťa zachráni.

Rozbitie okna = čin inak trestný (škoda na majetku)

Ale ide o krajnu núdzu, pretože odvracia priamo hroziace nebezpečenstvo života a škoda je menšia než hroziaci následok.
→ Nie je trestne zodpovedný.`,

  klucove_slova: [
    "Krajná núdza / Nutná obrana",
    "Dovolené riziko",
    "súhlas poškodeného"
  ],

  zapamataj_si: [
    "Ak chýba protiprávnosť, nejde o trestný čin — aj keď čin vyzerá ako trestný.",
    "Každá okolnosť má presné zákonné podmienky; ak nie sú splnené, ide o exces a čin môže byť trestný."
  ],

  literatura: [
    "TPH I. – okolnosti vylučujúce protiprávnosť"
  ]
},
{
  id: "A8",
  section: "A",
  kod: "A8",
  nazov: "Vývinové štádiá trestného činu",

  vysvetlenie: `
Vývinové štádiá trestného činu sú fázy, v ktorých sa postupne uskutočňuje úmysel páchateľa spáchať trestný čin. Týkajú sa len úmyselných trestných činov.

1. Príprava na zločin (§ 13 TZ)
Najskoršia fáza. Páchateľ ešte nenapĺňa znaky skutkovej podstaty, iba úmyselne vytvára podmienky na spáchanie zločinu (organizovanie, zadovažovanie nástrojov, spolčenie, návod…).
Trestná je len pri zločinoch.

2. Pokus trestného činu (§ 14 TZ)
Páchateľ už koná tak, že jeho konanie bezprostredne smeruje k dokonaniu trestného činu, ale následok ešte nenastal.
Pokus je trestný rovnako ako dokonaný čin.

3. Dokonaný trestný čin
Najzávažnejšia forma. Sú naplnené všetky znaky skutkovej podstaty a nastal trestnoprávne relevantný následok.
`,

  priklad: `
Muž chce vykradnúť klenotníctvo:

Príprava: zadováži si plán budovy a vlámačské náradie.

Pokus: v noci vylomí zámok a vojde dnu, ale spustí alarm a utečie.

Dokonanie: ak by šperky skutočne odcudzil, ide o dokonaný trestný čin krádeže.`,

  klucove_slova: [
    "Príprava – vytváranie podmienok",
    "Pokus – bezprostredné smerovanie",
    "Dokonanie – naplnené znaky SP"
  ],

  zapamataj_si: [
    "Páchateľovi sa vždy prisudzuje len najzávažnejšia forma (dokonaný čin > pokus > príprava).",
    "Príprava je trestná len pri zločinoch, pokus pri všetkých úmyselných trestných činoch."
  ],

  literatura: [
    "TPH I. – štádiá činu"
  ]
},
{
  id: "A9",
  section: "A",
  kod: "A9",
  nazov: "Trestná súčinnosť a účastníctvo",

  vysvetlenie: `
Trestná súčinnosť znamená, že na trestnom čine sa podieľa viac osôb — buď ako páchatelia, alebo ako osoby, ktoré trestný čin úmyselne podporujú, uľahčujú či organizujú.

Patria sem:

1. Priame formy páchateľstva
Nepriamy páchateľ – použije inú osobu ako „živý nástroj“ (nepríčetnú, dieťa, osobu v omyle, osobu donútenú násilím).

Spolupáchateľ – dvaja alebo viacerí konajú spoločne, každý zodpovedá, akoby čin spáchal sám.

Súbežné páchateľstvo – viacerí spôsobia následok, ale bez dohody → každý sa posudzuje samostatne.

2. Účastníctvo (§ 21 TZ)
Úmyselná, nepriama účasť na trestnom čine. Týka sa len úmyselných TČ.
Formy:

Organizátor – zosnoval alebo riadil spáchanie trestného činu.

Návodca – úmyselne naviedol inú osobu na spáchanie TČ.

Objednávateľ – požiadal inú osobu, aby spáchala TČ (typicky „nájomný“ čin).

Pomocník – poskytol pomoc (fyzickú alebo psychickú) pred spáchaním TČ.

3. Osobitné formy súčinnosti v osobitnej časti TZ
Napr. podnecovanie, schvaľovanie TČ, neoznámenie TČ, nadržiavanie, podpora zločineckej skupiny atď.

Trestnosť účastníctva
Platí zásada akcesority – účastník je trestný, ak sa páchateľ aspoň pokúsil o TČ.

A zásada samostatnosti – pri kolektívnych formách prípravy alebo tam, kde zákon považuje účasť za samostatný TČ.

Zánik trestnosti účastníctva
Analogicky ako pri príprave a pokuse:

dobrovoľné upustenie,

odstránenie nebezpečenstva,

oznámenie orgánom.`,

  priklad: `
Štyria ľudia chcú vykradnúť klenotníctvo:

Organizátor pripraví plán, rozdelí úlohy.

Návodca presvedčí jedného člena, aby sa pridal.

Objednávateľ chce šperky a zaplatí im za to.

Pomocník im zadováži náradie a dá tip, kedy je obchod prázdny.

Spolupáchatelia sú tí, ktorí sa fyzicky vlámu a kradnú.

Ak by niekto použil dieťa na prenesenie lupov → nepriamy páchateľ.`,

  klucove_slova: [
    "Organizátor – návodca – pomocník",
    "Spolupáchateľ vs. účastník",
    "Akcesorita účastníctva",
    "Zásada samostatnosti"
  ],

  zapamataj_si: [
    "Účastníctvo je vždy úmyselné a vždy nepriame.",
    "Spolupáchateľ koná spoločne → účastník len podporuje."
  ],

  literatura: [
    "TPH I. – účastníctvo"
  ]
},
{
  id: "A10",
  section: "A",
  kod: "A10",
  nazov: "Súbeh trestných činov a recidíva",

  vysvetlenie: `
O súbeh ide, keď ten istý páchateľ spácha dva alebo viac trestných činov ešte predtým, než je za niektorý z nich právoplatne odsúdený.

Druhy súbehu
Jednočinný súbeh – jeden skutok → viac trestných činov

Rovnorodý – rovnaký objekt (napr. krádež + poškodzovanie cudzej veci).

Rôznorodý – rôzne objekty (napr. krádež + nedovolené ozbrojovanie).

Viacčinný súbeh – viac skutkov → viac trestných činov

Rovnorodý – rovnaký druhový objekt (napr. viac majetkových TČ).

Rôznorodý – rôzne objekty (napr. podplácanie + ublíženie na zdraví + krádež).

Kedy je súbeh vylúčený
Špecialita (špeciálny TČ pohltí všeobecný).

Subsidiarita (subsidiárny TČ sa použije len ak nejde o primárny).

Faktická konzumpcia (vedľajší čin je len prostriedkom hlavného).

Pokračovací, hromadný, trváci TČ – vždy jeden skutok.

Opilstvo (§ 363 TZ) – pohltí všetky činy spáchané v nepríčetnosti.

Účinky súbehu
Ukladá sa úhrnný, spoločný alebo súhrnný trest.

Súbeh je priťažujúca okolnosť (§ 37 písm. h).

Možnosť spoločného konania v trestnom konaní.

2. Recidíva
O recidívu ide, keď páchateľ znova spácha trestný čin po právoplatnom odsúdení za predchádzajúci TČ.

Druhy recidívy
Všeobecná – po odsúdení za akýkoľvek TČ spácha akýkoľvek TČ.

Druhová – nový TČ rovnakého druhu (napr. opäť proti majetku).

Individuálna (špeciálna) – nový TČ rovnaký ako predchádzajúci (napr. krádež → krádež).

Dôsledky recidívy
Môže byť znakom skutkovej podstaty (napr. kvalifikované formy).

Je to priťažujúca okolnosť (§ 37 písm. m).

Môže byť okolnosť podmieňujúca vyššiu sadzbu.

Možnosť uložiť ochranný dohľad.

Uplatnenie zásady „trikrát a dosť“ (§ 47 TZ).

Pri opätovnom zločine sa zvyšuje dolná hranica sadzby o polovicu (§ 38 ods. 5).

Pri opätovnom obzvlášť závažnom zločine tiež o polovicu (§ 38 ods. 4).

Vplyv na zaradenie do ústavu (spravidla stredný stupeň).`,

  priklad: `
Muž vykradne obchod → ešte pred odsúdením spácha ďalšiu krádež a potom ublíženie na zdraví.

Krádež + krádež = viacčinný súbeh rovnorodý

Krádež + ublíženie = viacčinný súbeh rôznorodý

Po odsúdení za krádež spácha ďalšiu krádež → individuálna recidíva
`,

  klucove_slova: [
    "Jednočinný / viacčinný súbeh",
    "Recidíva – všeobecná / druhová / individuálna",
    "Trikrát a dosť"
  ],

  zapamataj_si: [
    "Súbeh = viac TČ pred odsúdením. Recidíva = nový TČ po odsúdení.",
"Nepravá recidíva - situácia - § 43 TZ uloženie ďalšieho trestu",
    "Recidíva často zvyšuje trestnú sadzbu a zhoršuje postavenie páchateľa."
  ],

  literatura: [
    "TPH I. – súbeh a recidíva"
  ]
},
{
  id: "A11",
  section: "A",
  kod: "A11",
  nazov: "Pojem a účel trestu, jednotlivé druhy trestov",

  vysvetlenie: `
Trest je štátne donútenie uložené súdom za spáchaný trestný čin.
Spôsobuje páchateľovi ujmu (na slobode, majetku alebo právach) a zároveň vyjadruje morálne odsúdenie jeho konania.

Trest môže uložiť len súd, len podľa zákona a vždy v mene štátu.

Účel trestu (§ 34 TZ)
Trest má päť funkcií:

1. Ochranná funkcia
Chráni spoločnosť pred páchateľom.

2. Represívna funkcia
Zabráni odsúdenému v ďalšej trestnej činnosti (aspoň na určitý čas).

3. Individuálna prevencia
Výchova odsúdeného k riadnemu životu.

4. Generálna prevencia
Odrádza ostatných od páchania trestných činov a posilňuje právnu istotu.

5. Morálne odsúdenie
Spoločnosť dáva najavo, že čin je neprijateľný.

Systém trestov
Trestný zákon obsahuje taxatívny výpočet trestov — súd nemôže uložiť nič mimo zoznamu.

Tresty pre fyzické osoby (§ 32 TZ)
trest odňatia slobody

trest domáceho väzenia

trest povinnej práce

peňažný trest

prepadnutie majetku

prepadnutie veci

zákaz činnosti

zákaz pobytu

zákaz účasti na verejných podujatiach

strata čestných titulov a vyznamenaní

strata vojenskej a inej hodnosti

trest vyhostenia

Tresty pre mladistvých (§ 109 TZ)
Miernejší systém, ale podobný:

povinná práca

peňažný trest

prepadnutie veci

zákaz činnosti

zákaz účasti na verejných podujatiach

vyhostenie

domáce väzenie

odňatie slobody (len ako posledná možnosť)

Tresty pre právnické osoby (§ 10 TZPO)
zrušenie právnickej osoby

prepadnutie majetku

prepadnutie veci

peňažný trest

zákaz činnosti

zákaz prijímať dotácie

zákaz prijímať pomoc z fondov EÚ

zákaz účasti vo verejnom obstarávaní

zverejnenie odsudzujúceho rozsudku`,

  priklad: `
Muž spácha krádež v obchode.
Súd mu uloží:

trest odňatia slobody (ak ide o závažnejšiu formu),

alebo peňažný trest,

alebo zákaz pobytu v obchodnom centre,

a zároveň tým spoločnosť vyjadruje morálne odsúdenie jeho konania.

Trest má zároveň odradiť jeho aj ostatných od ďalšej trestnej činnosti.`,

  klucove_slova: [
    "Ochrana – represia – prevencia",
    "Taxatívny výpočet trestov",
    "Morálne odsúdenie",
    "Alternatívne tresty",
    "peňažný trest"
  ],

  zapamataj_si: [
    "Trest nie je pomsta — je to nástroj ochrany spoločnosti.",
    "Súd môže uložiť len tresty uvedené v zákone, nikdy mimo zoznamu.",
    "Subsystémy trestov pre dospelých, mladistvých a PO"
  ],

  literatura: [
    "TPH I. – tresty",
    "Komentár – § 32 až 60"
  ]
},
{
  id: "A12",
  section: "A",
  kod: "A12",
  nazov: "Ochranné opatrenia a výchovné opatrenia",

  vysvetlenie: `
Ochranné opatrenia sú zásahy štátu, ktoré nepredstavujú trest, ale slúžia na:

ochranu spoločnosti pred nebezpečnými osobami,

liečbu, prevýchovu alebo dohľad,

odobratie nebezpečných vecí alebo majetku pochádzajúceho z trestnej činnosti.

Na rozdiel od trestov neobsahujú morálne odsúdenie a ich účel je výlučne preventívny a ochranný.

Nevzťahuje sa na ne:

premlčanie,

milosť,

zahladenie.

2. Druhy ochranných opatrení (§ 33 TZ)
Ochranné liečenie (§ 73 TZ)
Slúži na liečbu duševných porúch, závislostí a na ochranu spoločnosti pred osobami, ktoré sú kvôli týmto poruchám nebezpečné.

Formy: ústavné, ambulantné, počas výkonu trestu.
Ukladá sa obligatórne (napr. zmenšená príčetnosť, nepríčetný páchateľ) alebo fakultatívne (duševná porucha, závislosť, nebezpečnosť).
Trvá, kým sa splní účel.

Ochranná výchova (§ 102 TZ)
Určená pre maloletých a mladistvých, ktorí potrebujú náhradnú alebo intenzívnu výchovu.

Ukladá sa:

v trestnom konaní (zanedbaná výchova, nevhodné prostredie),

v civilnom konaní (12–14 rokov pri činoch s možnosťou doživotia, alebo mladší pri závažných činoch).

Výkon: výchovné zariadenie, profesionálna rodina, zdravotnícke zariadenie.
Trvá do 18 rokov (možno predĺžiť do 19).

Ochranný dohľad (§ 76 TZ)
Dohľad nad správaním odsúdeného po výkone trestu.

Účel: zabrániť recidíve a dokončiť nápravu.
Ukladá sa: recidivistom úmyselných TČ, páchateľom zločinov, osobám po detencii alebo ochrannom liečení.
Povinnosti: hlásiť sa probačnému úradníkovi, oznamovať pobyt, preukazovať obživu, dodržiavať liečbu.
Trvá 1–3 roky (pri § 76a podľa potreby).

Detencia (§ 81 TZ)
Najprísnejšie ochranné opatrenie — izolácia v detenčnom ústave.

Ukladá sa, ak:

páchateľ má trvalú duševnú poruchu a je nebezpečný,

ochranné liečenie nefunguje,

ide o sexuálne motivované TČ s rizikom recidívy.

Trvá, kým je osoba nebezpečná (môže byť aj doživotná).

Zhabanie veci (§ 83 TZ)
Odňatie veci, ktorá súvisí s trestným činom — aj keď nepatrí páchateľovi.

Predmet:

vec použitá na TČ,

určená na TČ,

výnos z TČ,

nebezpečné predmety (zbrane, drogy, výbušniny),

tovar bez kontrolných známok.

Zhabanie časti majetku (§ 83a TZ)
Konfiškácia majetku, o ktorom je dôvodný predpoklad, že pochádza z trestnej činnosti.

Ukladá sa, ak:

ide o úmyselný TČ s hornou hranicou min. 4 roky,

páchateľ získal majetkový prospech,

súd má za to, že časť majetku je výnosom z TČ.

Možno uložiť aj voči tretím osobám, ak majetok previedli od páchateľa (okrem dobromyseľných).

⭐ 3. Výchovné opatrenia (§ 106–108 TZ)
Ukladajú sa mladistvým pri podmienečnom upustení od potrestania alebo v prípravnom konaní.

Ukladá ich: súd alebo prokurátor (so súhlasom mladistvého).
Mladistvý môže súhlas kedykoľvek odvolať → opatrenie sa končí.

Ak ich neplní, súd/prokurátor ich môže zmeniť alebo zrušiť.

Druhy výchovných opatrení
1. Výchovné povinnosti a obmedzenia (§ 107 TZ)
Najmä:

podrobiť sa probačnému dohľadu,

bývať s rodičom alebo zodpovednou osobou,

nahradiť škodu alebo sa usilovať o zmier,

vykonať spoločensky prospešnú činnosť (max. 4 h denne, 18 h týždenne, 60 h celkovo),

podrobiť sa liečeniu závislosti,

absolvovať sociálny, psychologický, vzdelávací alebo rekvalifikačný program.

2. Napomenutie s výstrahou (§ 108 TZ)
Súd alebo prokurátor dôrazne upozorní mladistvého na protiprávnosť jeho konania a na následky, ktoré mu hrozia.

Účelom je zabrániť recidíve v spolupráci so zákonným zástupcom.`,

  priklad: `
Mladistvý 16-ročný chlapec opakovane kradne v obchode:

súd mu uloží výchovné opatrenia:
– probačný dohľad,
– povinnosť nahradiť škodu,
– povinnosť absolvovať sociálny výcvik.

Ak by bol mladší (napr. 13 rokov) a čin by bol veľmi závažný → ochranná výchova.

Ak by išlo o dospelého závislého páchateľa → ochranné liečenie.
Ak by bol extrémne nebezpečný → detencia.
Ak by mal doma drogy alebo zbrane → zhabanie veci.
Ak by mal majetok z trestnej činnosti → zhabanie časti majetku.`,

  klucove_slova: [
    "Detencia",
    "výchovné opatrenia",
    "Liečenie – výchova – dohľad",
    "zhabanie veci/majetku"
  ],

  zapamataj_si: [
    "Ochranné opatrenia chránia spoločnosť — nie sú trestom.",
    "Výchovné opatrenia sú najmiernejší zásah voči mladistvým.",
    "Cieľom je ochrana a náprava."
  ],

  literatura: [
    "TPH I. – ochranné opatrenia",
    "Komentár – § 73 až 75"
  ]
},
{
  id: "A13",
  section: "A",
  kod: "A13",
  nazov: "Trestná zodpovednosť a trestanie mladistvých",

  vysvetlenie: `
Kto je mladistvý (§ 94 TZ)
Mladistvý = osoba, ktorá v čase spáchania trestného činu:

dovŕšila 14 rokov,

neprekročila 18 rokov.

Mladistvý mladší ako 15 rokov
Ak nedosiahol potrebnú rozumovú a mravnú vyspelosť, nie je trestne zodpovedný → koncepcia podmienenej trestnej zodpovednosti.

Prečin malej závažnosti
Prečin spáchaný mladistvým nie je trestným činom, ak je jeho závažnosť malá.

Účel trestu u mladistvých (§ 97 TZ)
Trest u mladistvého má úplne iný charakter než u dospelých:

vychovať ho na riadneho občana,

predchádzať ďalším protiprávnym činom,

chrániť spoločnosť primerane,

napraviť narušené sociálne vzťahy,

pomôcť mu začleniť sa do rodiny a komunity.

Trest má byť miernejší, výchovný a individualizovaný.

Účel ochranných a výchovných opatrení (§ 97 ods. 2 TZ)
pozitívne ovplyvniť duševný, mravný a sociálny vývoj,

zohľadniť osobnosť, rodinu, prostredie,

chrániť mladistvého pred škodlivými vplyvmi,

chrániť spoločnosť pred jeho konaním.

Pri ukladaní trestov a opatrení (§ 97 ods. 3 TZ)
Súd musí prihliadať na:

vek,

rozumovú a mravnú vyspelosť,

zdravotný stav,

rodinné a sociálne pomery,

povahu a závažnosť činu.

Cieľ = začlenenie mladistvého do rodinného a sociálneho prostredia.

Upustenie od potrestania (§ 98–101 TZ)
Súd môže upustiť od potrestania, ak:

nápravu možno dosiahnuť aj bez trestu,

postačí výchovné opatrenie,

mladistvý prejaví účinnú snahu po náprave.

⭐ Druhy trestov pre mladistvých (§ 109 TZ)
1. Trest povinnej práce
max. 150 hodín,

nesmie ohroziť zdravie ani mravný vývoj.

2. Peňažný trest
30 – 16 590 €,

len ak je mladistvý zárobkovo činný alebo má majetok.

3. Prepadnutie veci
4. Zákaz činnosti
len ak nebráni príprave na povolanie,

max. 5 rokov,

výnimočne 7–15 rokov pri § 61 ods. 4–5 TZ.

5. Zákaz účasti na verejných podujatiach
max. 5 rokov.

6. Vyhostenie
1 – 5 rokov.

7. Domáce väzenie
max. 1 rok,

so súhlasom zákonného zástupcu.

8. Trest odňatia slobody
sadzby sa znižujú na polovicu,

horná hranica max. 7 rokov,

dolná hranica max. 2 roky,

pri obzvlášť závažnom zločine: 7–15 rokov.

Nepodmienečný trest len ak iný trest zjavne nestačí.

Výkon trestu prebieha v ústavoch pre mladistvých.

Zahladenie odsúdenia (§ 121 TZ)
Mladiství majú výhodnejšie podmienky na zahladenie odsúdenia.
`,

  priklad: `
16-ročný chlapec spácha krádež v obchode:

súd skúma jeho vyspelosť, rodinu, školu, prostredie,

môže uložiť výchovné opatrenia,

alebo povinnú prácu,

alebo domáce väzenie,

trest odňatia slobody len ak všetko ostatné zlyhalo.

Ak by mal 14 rokov, ale nízku rozumovú vyspelosť → nie je trestne zodpovedný.`,

  klucove_slova: [
    "Výchova – individualizácia – miernosť",
    "Podmienená trestná zodpovednosť",
    "Znížené sadzby trestu"
  ],

  zapamataj_si: [
    "Mladiství sa netrestajú ako dospelí — cieľom je výchova, nie represia.",
    "Mladiství majú osobitný režim.",
    "Trest odňatia slobody je až posledná možnosť."
  ],

  literatura: [
    "TPH I. – mladiství",
    "Komentár – § 97 až 100"
  ]
},
{
  id: "A14",
  section: "A",
  kod: "A14",
  nazov: "Trestná zodpovednosť a trestanie právnických osôb",

  vysvetlenie: `
Trestná zodpovednosť právnických osôb bola na Slovensku zavedená od 1. júla 2016 ako reakcia na medzinárodné záväzky sankcionovať právnické osoby za určité trestné činy. Ide o prelomenie zásady individuálnej trestnej zodpovednosti, pretože po novom môže byť za trestný čin zodpovedná aj firma, nadácia, združenie či iný právny subjekt. Zákon o trestnej zodpovednosti právnických osôb je lex specialis voči Trestnému zákonu a Trestnému poriadku, ktoré sa používajú subsidiárne, ak to povaha veci umožňuje.

Trestná zodpovednosť právnickej osoby sa posudzuje podľa zásad časovej pôsobnosti, teritoriality, sídla, subsidiárnej univerzality a pasívnej personality. Zákon sa použije na činy spáchané po 1. júli 2016. Trestnosť sa posudzuje podľa slovenského práva, ak bol čin spáchaný na území SR, alebo ak ho spáchala právnická osoba so sídlom v SR aj v zahraničí. Slovenský zákon sa použije aj vtedy, ak bol čin spáchaný v prospech slovenskej právnickej osoby alebo občana SR, alebo ak bola škoda spôsobená subjektu so sídlom či pobytom v SR. Medzinárodné zmluvy môžu pôsobnosť zákona rozšíriť alebo obmedziť.

Právnická osoba môže byť trestne zodpovedná len za trestné činy uvedené v taxatívnom zozname § 3 TZPO, čo je v súlade so zásadou nullum crimen sine lege. Trestný čin je spáchaný právnickou osobou vtedy, ak bol spáchaný v jej prospech, v jej mene, v rámci jej činnosti alebo prostredníctvom jej štruktúr, pričom konal štatutárny orgán, jeho člen, osoba vykonávajúca kontrolu alebo dohľad, alebo iná osoba oprávnená konať za právnickú osobu. Trestná zodpovednosť právnickej osoby je samostatná – nie je potrebné odsúdiť konkrétnu fyzickú osobu a nezaniká ani zrušením, konkurzom či likvidáciou právnickej osoby.

Príčitateľnosť trestného činu právnickej osobe vzniká vtedy, ak spáchanie trestného činu umožnili alebo vyvolali okolnosti na strane právnickej osoby, ako napríklad chybné rozhodnutia vedenia, pokyny, schválenie konania, zanedbanie kontroly alebo nedostatočné interné procesy. Právnická osoba sa môže zbaviť zodpovednosti, ak preukáže, že vynaložila všetko úsilie na zabránenie trestnej činnosti, najmä zavedením účinného compliance programu. Trestná zodpovednosť prechádza na právnych nástupcov právnickej osoby, nie však na fyzické osoby. Zákon upravuje aj účinnú ľútosť, avšak tá sa neuplatní pri korupcii a poškodzovaní finančných záujmov EÚ. Zahladenie odsúdenia nastáva vykonaním trestu alebo ochranného opatrenia.

Pri ukladaní trestov právnickej osobe súd prihliada na povahu a závažnosť trestného činu, pomery právnickej osoby, jej doterajšiu činnosť, majetkové pomery, strategický význam jej činnosti pre štát, následky uloženého trestu na zamestnancov, veriteľov či poškodených, ako aj na snahu právnickej osoby o nápravu. Súd zohľadňuje aj to, v akom rozsahu prešli výhody z trestnej činnosti na právnych nástupcov. Niektoré tresty nie je možné uložiť súčasne, napríklad zrušenie právnickej osoby a prepadnutie majetku.

Systém trestov pre právnické osoby zahŕňa trest zrušenia právnickej osoby, prepadnutie majetku, prepadnutie veci, peňažný trest, zákaz činnosti, zákaz prijímať dotácie alebo subvencie, zákaz prijímať pomoc a podporu z fondov EÚ, zákaz účasti vo verejnom obstarávaní a trest zverejnenia odsudzujúceho rozsudku. Trest zrušenia právnickej osoby je najprísnejší a ukladá sa obligatórne, ak bola činnosť právnickej osoby úplne alebo prevažne využívaná na páchanie trestnej činnosti. Prepadnutie majetku a veci sa ukladá podľa podmienok Trestného zákona. Peňažný trest môže dosiahnuť až 4 milióny eur. Zákazy činnosti, dotácií, podpory z EÚ či účasti vo verejnom obstarávaní sa ukladajú na jeden až desať rokov. Trest zverejnenia odsudzujúceho rozsudku je jediným vedľajším trestom a zverejňuje sa v Obchodnom vestníku.

Ochranným opatrením, ktoré možno uložiť právnickej osobe, je zhabanie časti majetku podľa § 83a TZ. Pri jeho ukladaní sa primerane použijú zásady ukladania trestov a popri ňom nemožno uložiť trest prepadnutia majetku.`,

  priklad: `
Firma EcoTrans, s. r. o. vyvážala odpad do zahraničia. Jej vedúci prevádzky, aby ušetril peniaze, nariadil zamestnancom vyviezť časť nebezpečného odpadu do lesa. Konal v mene firmy a v jej prospech. Firma nemala žiadne interné pravidlá, kontrolu ani dohľad.

Polícia odhalila environmentálny trestný čin.
Súd uznal, že čin je príčitateľný právnickej osobe, pretože bol spáchaný v jej mene a umožnilo ho zanedbanie kontroly.

EcoTrans dostala peňažný trest, zákaz činnosti v oblasti nakladania s odpadmi a zverejnenie rozsudku.
Keby mala firma funkčný compliance program, mohla sa zodpovednosti zbaviť.
Compliance program je súbor vnútorných pravidiel, kontrol, školení a postupov vo firme, ktoré majú zabrániť tomu, aby zamestnanci alebo vedenie spáchali trestný čin.`,

  klucove_slova: [
    "Trestná zodpovednosť právnickej osoby",
    "príčitateľnosť",
    "compliance program"
  ],

  zapamataj_si: [
    "Trestná zodpovednosť právnickej osoby je samostatná a nezávisí od odsúdenia fyzickej osoby.",
    "Firma sa môže zbaviť zodpovednosti len ak preukáže účinný compliance systém.",
    "Najprísnejším trestom je zrušenie právnickej osoby, ktoré sa ukladá aj obligatórne."
  ],

  literatura: [
    "Zákon o trestnej zodpovednosti PO",
    "Komentár – tresty PO"
  ]
},
{
  id: "A15",
  section: "A",
  kod: "A15",
  nazov: "Dôvody zániku trestnosti a trestu, zahladenie odsúdenia",

  vysvetlenie: `
Zánik trestu znamená, že po právoplatnosti rozsudku nastala taká okolnosť, pre ktorú už uložený trest nemožno vykonať. Ide o výnimočné situácie, ktoré nastanú až po rozhodnutí súdu. Trest zaniká najmä odpustením alebo zmiernením trestu prezidentom Slovenskej republiky, ktorý môže udeliť individuálnu milosť alebo amnestiu. Ak prezident trest odpustí, nevykoná sa, avšak toto sa netýka iných trestov uložených popri sebe, ktoré rozhodnutím prezidenta dotknuté neboli. Ďalším dôvodom zániku trestu je premlčanie výkonu trestu – po uplynutí zákonom stanovenej doby už trest nemožno vykonať, s výnimkou najzávažnejších trestných činov uvedených v § 91 TZ, pri ktorých sa výkon trestu nepremlčuje. Pre mladistvých platia osobitné premlčacie lehoty. Trest zaniká aj smrťou páchateľa, pretože výkon trestu je viazaný na jeho osobu.

Zahladenie odsúdenia slúži na odstránenie nepriaznivých následkov odsúdenia, ktoré pretrvávajú aj po výkone trestu a môžu sťažovať ďalší život odsúdeného, napríklad pri hľadaní práce alebo pri posudzovaní bezúhonnosti. Po zahladení odsúdenia sa na páchateľa hľadí, akoby nebol odsúdený. Zahladenie môže nastať rozhodnutím súdu, ak sú splnené dve podmienky: uplynutie zákonom stanovenej doby a vedenie riadneho života odsúdeným. Zahladenie môže nastať aj rozhodnutím prezidenta formou milosti alebo amnestie, hoci v praxi sa to využíva zriedkavo. Pri niektorých trestoch dochádza k zahladeniu priamo zo zákona ich vykonaním, napríklad pri trestoch uvedených v § 32 písm. b) až l) TZ. Po zahladení odsúdenia sa páchateľ považuje za bezúhonného. Pre mladistvých platia výhodnejšie podmienky zahladenia odsúdenia podľa § 121 TZ.`,

  priklad: `
Peter bol odsúdený za krádež a dostal peňažný trest. Po zaplatení trestu začal pracovať, staral sa o rodinu a tri roky viedol úplne riadny život. Keď potreboval potvrdenie o bezúhonnosti kvôli novej práci, požiadal súd o zahladenie odsúdenia. Súd uznal, že splnil podmienky — uplynul čas a Peter žil riadne.

Po zahladení sa naňho hľadí, ako keby nikdy nebol odsúdený, a môže bez problémov nastúpiť do novej práce.`,

  klucove_slova: [
    "premlčanie",
    "Zánik trestu",
    "amnestiа",
    "zahladenie odsúdenia"
  ],

  zapamataj_si: [
    "Zánik trestu nastáva až po právoplatnosti rozsudku, ak trest už nemožno vykonať.",
    "Zahladením odsúdenia sa na páchateľa hľadí, akoby nebol odsúdený.",
    "Prezident môže trest odpustiť alebo zahladiť, ale nie všetky tresty tým automaticky zanikajú."
  ],

  literatura: [
    "TPH I. – zánik trestnosti",
    "Komentár – § 85 až 88"
  ]
},
{
  id: "A16",
  section: "A",
  kod: "A16",
  nazov: "Vplyv práva Európskej únie na trestné právo hmotné",

  vysvetlenie: `
Právo Európskej únie ovplyvňuje trestné právo hmotné najmä dvoma spôsobmi: cez justičnú spoluprácu v trestných veciach a cez policajnú spoluprácu. Justičná spolupráca funguje na princípe vzájomného uznávania rozhodnutí a vykonávania procesných úkonov medzi členskými štátmi (napr. európsky zatýkací rozkaz, európsky príkaz na získanie dôkazov, vzájomná právna pomoc) a umožňuje rýchle zadržanie osôb, získanie dokumentov a vykonanie trestov naprieč hranicami. Policajná spolupráca zabezpečuje výmenu informácií, spoločné vyšetrovania a koordináciu cez agentúry ako Europol a Eurojust, vrátane colných orgánov a špecializovaných databáz. EÚ tiež vydáva smernice a nariadenia, ktoré nútia členské štáty harmonizovať (aproximovať) trestnoprávne normy v konkrétnych oblastiach — napríklad korupcia, pranie špinavých peňazí, ochrana finančných záujmov EÚ, terorizmus, environmentálne delikty a ochrana obetí. V praxi to znamená, že štáty musia do svojich zákonov zapracovať minimálne štandardy, zaviesť procesné nástroje pre cezhraničné vyšetrovanie a umožniť rýchlu a bezpečnú výmenu dôkazov a informácií.`,

  priklad: `
Malá slovenská firma získala zákazku v susednej krajine. Tamojšia polícia podozrievala podvod a požiadala o pomoc. Vďaka európskym nástrojom bol vydaný európsky príkaz na získanie dokumentov a európsky zatýkací rozkaz umožnil zadržanie podozrivého konateľa v SR. Europol pomohol prepojiť údaje z viacerých krajín, dôkazy sa rýchlo vymenili a vyšetrovanie pokračovalo bez zbytočných prieťahov. Firma aj konateľ pocítili, že cezhraničné vyšetrovanie funguje efektívne, pretože EÚ poskytla právne nástroje a mechanizmy spolupráce.`,

  klucove_slova: [
    "Justičná spolupráca",
    "Policajná spolupráca",
    "Aproximácia zákonov"
  ],

  zapamataj_si: [
    "EÚ nekriminalizuje všeobecne, ale vyžaduje harmonizáciu v konkrétnych oblastiach na ochranu spoločných záujmov.",
    "Európsky zatýkací rozkaz a príkazy na získanie dôkazov zrýchľujú cezhraničné vyšetrovania a vykonávanie rozhodnutí.",
    "Europol a Eurojust sú kľúčové inštitúcie pre koordináciu, výmenu informácií a podporu spoločných vyšetrovaní medzi členskými štátmi."
  ],

  literatura: [
    "TPH I. – vplyv EÚ",
    "Repetitórium – EÚ a TPH"
  ]
},
{
  id: "A17",
  section: "A",
  kod: "A17",
  nazov: "Trestné činy proti životu",

  vysvetlenie: `
Trestné činy proti životu a zdraviu chránia život a zdravie človeka. Objektívnu stránku tvoria konania, ktorými páchateľ spôsobí smrť, poškodenie zdravia alebo ohrozí život či zdravie inej osoby; môže ísť o priame konanie alebo opomenutie (neposkytnutie pomoci). Subjektom sú spravidla všetky trestne zodpovedné fyzické osoby, v niektorých ustanoveniach aj špeciálne subjekty (napr. matka novonarodeného dieťaťa, vodič účastný na nehode); pri drogovo motivovaných skutkoch môže byť subjektom aj právnická osoba. Subjektívna stránka je prevažne úmysel; v niektorých skutkových podstatách zákon vyžaduje nedbanlivosť a v niektorých sú možné obe formy zavinenia. Osobitná časť sa delí na tri diely: trestné činy proti životu (napr. úkladná vražda, vražda, zabitie, usmrtenie, vražda novonarodeného dieťaťa matkou), trestné činy proti zdraviu (ubližovanie na zdraví, neoprávnené odoberanie orgánov) a trestné činy ohrozujúce život alebo zdravie (napr. šírenie nebezpečnej nákazlivej choroby, poškodenie zdravia, trestné činy súvisiace s omamnými látkami).
Kľúčové pojmy: úkladná vražda = myslené usmrtenie s vopred uváženou pohnútkou; usmrtenie = akékoľvek zbavenie života iného človeka; zabitie = spôsobenie smrti pri úmysle spôsobiť ťažkú ujmu na zdraví alebo pri nedbanlivosti; ťažká ujma na zdraví je vymedzená taxatívne (zmrzačenie, strata pracovnej spôsobilosti, ochromenie, zohyzdenie, dlhodobá porucha vyžadujúca liečenie atď.). Ochrana života a zdravia sa realizuje aj v iných častiach zákona (napr. trestné činy súvisiace s domácim násilím, obchodovaním s ľuďmi, trestné činy v doprave).`,

  priklad: `
Mladý vodič ignoruje červenú a pri vysokorýchlostnom prejazde zrazí chodca, ktorý na mieste zomrie. Ak sa preukáže, že vodič konal z nedbanlivosti (nevenoval pozornosť, prekročil rýchlosť), pôjde o usmrtenie z nedbanlivosti; ak by vodič cielene zrazil konkrétnu osobu, išlo by o trestný čin s úmyslom (vražda alebo zabitie podľa okolností). Pri posudzovaní súd zohľadní stupeň zavinenia, následok (smrť), okolnosti činu a osobu páchateľa pri výmere trestu.`,

  klucove_slova: [
    "Život",
    "Zdravie",
    "Úmysel vs Nedbanlivosť",
    "Ťažká ujma"
  ],

  zapamataj_si: [
    "Pri trestných činoch proti životu je rozhodujúce rozlíšenie medzi úmyslom a nedbanlivosťou; od toho závisí kvalifikácia skutku a trestná sadzba.",
    "Ťažká ujma na zdraví je taxatívne vymedzená (zmrzačenie, strata pracovnej spôsobilosti, ochromenie, zohyzdenie, dlhodobé utrpenie) — jej preukázanie zásadne zvyšuje trestnoprávnu závažnosť skutku."
  ],

  literatura: [
    "TPH II. – proti životu",
    "Komentár – § 145 až 155"
  ]
},
{
  id: "A18",
  section: "A",
  kod: "A18",
  nazov: "Trestné činy proti zdraviu a ohrozujúce život alebo zdravie",

  vysvetlenie: `
Trestné činy proti zdraviu a ohrozujúce život alebo zdravie chránia život a zdravie človeka a zahŕňajú konania alebo opomenutia, ktorými sa spôsobí smrť, poškodenie zdravia alebo ohrozenie života či zdravia inej osoby. Právna úprava sa delí na tri časti: trestné činy proti životu (napr. úkladná vražda, vražda, zabitie, usmrtenie, vražda novonarodeného dieťaťa matkou), trestné činy proti zdraviu (ubližovanie na zdraví, neoprávnené odoberanie orgánov, nezákonná sterilizácia) a trestné činy ohrozujúce život alebo zdravie (napr. neoprávnené experimenty na človeku, šírenie nebezpečných nákazlivých chorôb, poškodzovanie zdravia závadnými potravinami, falšovanie liekov, neposkytnutie pomoci). Subjektom sú spravidla všetky trestne zodpovedné fyzické osoby; v niektorých skutkových podstatách ide o špeciálny subjekt (napr. matka novonarodeného dieťaťa, vodič účastný na nehode) a pri drogovo motivovaných trestných činoch môže byť subjektom aj právnická osoba. Zavinenie je prevažne úmyselné, v konkrétnych ustanoveniach zákon vyžaduje nedbanlivosť alebo umožňuje obe formy zavinenia. Kľúčové pojmy zahŕňajú: usmrtenie (akékoľvek zbavenie života inej osoby), zabitie (smrť pri úmysle spôsobiť ťažkú ujmu alebo pri nedbanlivosti), ťažká ujma na zdraví (taxatívne vymedzená: zmrzačenie, strata pracovnej spôsobilosti, ochromenie, zohyzdenie, dlhodobá porucha vyžadujúca liečenie) a ubliženie na zdraví (poškodenie vyžadujúce lekárske ošetrenie a aspoň dočasné obmedzenie bežného života).

Drogové trestné činy sú súčasťou tejto kapitoly a chránia spoločnosť pred nekontrolovaným nakladaním s omamnými a psychotropnými látkami a ich prekurzormi. Hlavné skutkové podstaty sú: § 171 neoprávnené prechovávanie (rozdiel medzi nepatrným množstvom pre osobnú spotrebu a väčším množstvom vedúcim k podozreniu z obchodovania), § 172 neoprávnené pestovanie rastlín/húb obsahujúcich omamné látky, § 173 neoprávnená výroba a obchodovanie (dovoz, vývoz, prevoz, predaj, sprostredkovanie), § 173a prekurzory a predmety určené na výrobu drog a § 174 šírenie toxikománie (podnecovanie alebo podpora užívania). Zákon rozlišuje množstvá: nepatrné, malé, väčšie, značné, veľké, pričom prekročenie hranice nepatrného množstva mení právnu kvalifikáciu z užívania na obchodovanie alebo výrobu; pri posudzovaní sa rozhoduje podľa obsahu účinnej látky a účelu (osobná spotreba vs. distribúcia).
`,

  priklad: `
Mladý muž má doma niekoľko rastlín konopy na vlastnú spotrebu; ak ide o nepatrné množstvo, hrozí mu postih podľa § 171 alebo § 172 s miernejším trestom. Ak však polícia nájde pri ňom veľkú úrodu, zariadenia na spracovanie a doklady o predaji, skutok sa prekvalifikuje na § 173 (obchodovanie alebo výroba) a trestná sadzba bude výrazne prísnejšia. Pri rozhodovaní súd posudzuje množstvo, obsah účinnej látky a účel držby.`,

  klucove_slova: [
    "Život",
    "Zdravie",
    "Drogové trestné činy",
    "Množstvá"
  ],

  zapamataj_si: [
    "Rozdiel medzi „nepatrným“ množstvom (užívateľ) a väčším množstvom (diler/výrobca) rozhoduje o kvalifikácii a treste.",
    "Pri trestných činoch proti zdraviu je rozhodujúce rozlíšenie medzi úmyslom a nedbanlivosťou; preukázanie ťažkej ujmy na zdraví výrazne zvyšuje právnu závažnosť skutku."
  ],

  literatura: [
    "TPH II. – proti zdraviu",
    "Komentár – § 155 až 174"
  ]
},
{
  id: "A19",
  section: "A",
  kod: "A19",
  nazov: "Trestné činy proti slobode",

  vysvetlenie: `
Trestné činy proti slobode a ľudskej dôstojnosti chránia základné práva a slobody a ľudskú dôstojnosť. Objektívna stránka spočíva v konaní alebo opomenutí, ktoré neoprávnene obmedzí alebo zbaví osobu slobody, zastraší ju násilím, donúti k určitému správaniu alebo poruší jej dôstojnosť (napr. pozbavenie osobnej slobody, obmedzovanie slobody pohybu, branie rukojemníka, vydieranie, únos, obchodovanie s ľuďmi, sexuálne trestné činy). Subjektom sú spravidla všetky trestne zodpovedné fyzické osoby; pri niektorých skutkoch sa vyžaduje špeciálny subjekt alebo veková hranica. Subjektívna stránka je prevažne úmysel. Trestné činy proti slobode sú rozdelené na činy proti slobode (napr. pozbavenie osobnej slobody, obmedzovanie slobody pobytu, vydieranie, únos) a činy proti ľudskej dôstojnosti (napr. znásilnenie, sexuálne násilie, sexuálne zneužívanie). Do tejto oblasti zasahujú aj iné inštitúcie práva (napr. ochrana domovej slobody, súkromia, sloboda združovania).`,

  priklad: `
Mladík A unáša bývalú partnerku B a drží ju v uzavretej miestnosti, aby ju prinútil podpísať dokumenty a odovzdať mu peniaze. B sa bojí a nemôže slobodne odísť. Konanie A predstavuje pozbavenie osobnej slobody a zároveň vydieranie; ak by použil násilie alebo hrozil bezprostredným násilím, ide o závažnejšiu kvalifikáciu s prísnejším trestom. Súd posudzuje okolnosti, trvanie obmedzenia slobody, použité prostriedky a úmysel páchateľa.
`,

  klucove_slova: [
    "Sloboda",
    "Dôstojnosť",
    "Úmysel",
    "Pozbavenie slobody"
  ],

  zapamataj_si: [
    "Pozbavenie osobnej slobody je trvalé alebo dlhšie obmedzenie slobody podobné väzbe; obmedzovanie slobody môže byť aj krátkodobé (uzavretie miestnosti).",
    "Rozlíšenie medzi rôznymi formami nátlaku, vydieraním a násilím rozhoduje o kvalifikácii skutku a o prísnosti trestu."
  ],

  literatura: [
    "TPH II. – proti slobode",
    "Komentár – § 179 až 186"
  ]
},
{
  id: "A20",
  section: "A",
  kod: "A20",
  nazov: "Trestné činy proti ľudskej dôstojnosti",

  vysvetlenie: `
Trestné činy proti ľudskej dôstojnosti chránia intimitu, telesnú integritu, sexuálnu autonómiu a vnútornú hodnotu človeka. Ide o konania, ktorými páchateľ násilím, hrozbou násilia, zneužitím bezbrannosti alebo inou formou nátlaku zasiahne do sexuálnej slobody alebo dôstojnosti obete. Patria sem najmä znásilnenie, sexuálne násilie, sexuálne zneužívanie a súlož medzi príbuznými. Objektívna stránka spočíva v donútení k súloži alebo inému sexuálnemu konaniu, v prekonaní odporu, v zneužití bezbrannosti (bezvedomie, spánok, intoxikácia) alebo v zneužití závislosti či autority. Subjektom je spravidla každá trestne zodpovedná fyzická osoba, pri niektorých skutkoch sa vyžaduje vek (pri sexuálnom zneužívaní min. 15 alebo 18 rokov). Subjektívna stránka je vždy úmyselná. Ochrana ľudskej dôstojnosti je mimoriadne prísna, pretože ide o zásah do najintímnejšej sféry človeka a následky bývajú dlhodobé.`,

  priklad: `
Muž využije, že žena na večierku zaspala po alkohole a nie je schopná klásť odpor. Dotýka sa jej intímnych miest a vykoná na nej sexuálne úkony. Hoci žena neprotestuje, je to preto, že je bezbranná. Ide o sexuálne násilie alebo znásilnenie, pretože páchateľ zneužil jej stav, v ktorom sa nemohla brániť. Súd posudzuje spôsob konania, stav obete, úmysel páchateľa a následky na psychike obete.`,

  klucove_slova: [
    "Dôstojnosť",
    "Sexuálne násilie",
    "Bezbrannosť",
    "Úmysel"
  ],

  zapamataj_si: [
    "Pri trestných činoch proti ľudskej dôstojnosti je rozhodujúce, či bola obeť donútená násilím, hrozbou alebo zneužitím bezbrannosti.",
    "Súhlas musí byť slobodný a vedomý; ak obeť nie je schopná odporu, ide o trestný čin aj bez fyzického násilia."
  ],

  literatura: [
    "TPH II. – dôstojnosť",
    "Komentár – § 199 až 205"
  ]
},
{
  id: "A21",
  section: "A",
  kod: "A21",
  nazov: "Trestné činy proti rodine a mládeži",

  vysvetlenie: `
Trestné činy proti rodine a mládeži chránia rodinné vzťahy a riadnu výchovu mladého človeka podľa zákona o rodine; ide o skutky, pri ktorých osoba poruší zákonné povinnosti voči dieťaťu alebo zverenej osobe, zanedbá vyživovaciu či výchovnú povinnosť, odloží alebo opustí dieťa, týra blízku osobu, unesie ju alebo inak ohrozí mravnú výchovu mládeže. Objektom je predovšetkým záujem dieťaťa o bezpečný fyzický, psychický a morálny vývoj; objektívna stránka spočíva v opomenutí alebo konaní, ktoré vedie k ohrozeniu alebo poškodeniu dieťaťa či zverenej osoby. Subjektom sú zvyčajne rodičia, opatrovníci alebo iné osoby, ktorým zákon ukladá povinnosť starať sa o dieťa; pri niektorých skutkoch sa vyžaduje špecifický subjekt (napr. rodič alebo príbuzný v priamej rade). Zavinenie je prevažne úmyselné, pri niektorých ustanoveniach však postačuje nedbanlivosť. Odloženie dieťaťa znamená zanechanie na mieste bez bezprostredného ohrozenia života alebo zdravia, opustenie predstavuje závažnejší čin s rizikom ohrozenia; zanedbanie vyživovacej povinnosti sa trestne posudzuje najmä ak rodič najmenej dva mesiace v priebehu dvoch rokov neplní zákonnú povinnosť vyživovať alebo zaopatrovať. Týranie blízkej alebo zverenej osoby je dlhodobé, bezcitné a hrubé zaobchádzanie spôsobujúce obeti ťažké útrapy. Príklad zo života: rodič, ktorý dlhodobo neplatí výživné a dva mesiace v priebehu dvoch rokov neposkytne dieťaťu základné potreby, môže byť trestne stíhaný za neplnenie vyživovacej povinnosti a zanedbanie povinnej výchovy; ak navyše dieťa žije v podmienkach, ktoré vedú k jeho fyzickému alebo psychickému poškodeniu, hrozia páchateľovi prísnejšie sankcie a zásah sociálnych orgánov aj súdu.`,

  priklad: `
Rodičia sa po hádke rozhodnú odísť z bytu a nechajú trojmesačné dieťa v kočíku pred vchodom s návodom, kde ho nájsť; sused dieťa nájde a zavolá záchranku — polícia zistí, že rodičia dieťa opustili bez zabezpečenia základnej starostlivosti a bez možnosti návratu, pričom dieťa bolo vystavené riziku podchladenia a úrazu; rodičia môžu byť stíhaní za odloženie alebo opustenie dieťaťa a súd pri rozhodovaní zohľadní trvanie opustenia, stupeň ohrozenia života a zdravia dieťaťa, ich úmysel alebo nedbanlivosť a predchádzajúce správanie (napr. predchádzajúce zanedbávanie), pričom okrem trestnoprávnych následkov hrozí aj zásah sociálnych orgánov a odňatie dieťaťa do starostlivosti štátu.
`,

  klucove_slova: [
    "rodina",
    "dieťa",
    "vyživovacia povinnosť",
    "týranie",
    "zanedbanie"
  ],

  zapamataj_si: [
    "Hlavným cieľom je ochrana dieťaťa a rodinných vzťahov; porušenie zákonných povinností voči dieťaťu je trestné.",
    "Odloženie dieťaťa sa líši od opustenia podľa stupňa ohrozenia života alebo zdravia.",
    "Neplnenie vyživovacej povinnosti sa posudzuje podľa trvania (minimálne 2 mesiace v priebehu 2 rokov) a následkov pre dieťa."
  ],

  literatura: [
    "TPH II. – rodina a mládež",
    "Komentár – § 207 až 211"
  ]
},
{
  id: "A22",
  section: "A",
  kod: "A22",
  nazov: "Trestné činy proti majetku",

  vysvetlenie: `
Trestné činy proti majetku chránia vlastníctvo bez ohľadu na jeho druh a formu. Objektom je cudzie majetkové právo; objektívna stránka spočíva v útokoch proti majetku — napríklad prisvojení si cudzej veci, neoprávnenom užívaní, poškodení veci, podvode, sprenevere alebo v konaniach, ktorými sa páchateľ obohatí na úkor cudzieho majetku alebo získa prostriedky z trestnej činnosti inej osoby. Subjektom sú spravidla všetky trestne zodpovedné fyzické osoby; pri niektorých skutkoch sa vyžaduje špeciálny subjekt (napr. štatutárny orgán, prokurista) a niektoré skutky môže spáchať aj právnická osoba. Zavinenie je prevažne úmyselné, výnimky sú v niektorých ustanoveniach, kde postačuje nedbanlivosť. V praxi sa trestné činy proti majetku delia na štyri skupiny: (1) činy charakterizované obohatením sa na škodu cudzieho majetku — krádež, sprenevera, podvod, neoprávnené užívanie veci a pod.; (2) úmyselné poškodzovanie majetku — napr. poškodzovanie cudzej veci, marenie konkurzu či exekúcie; (3) počítačové trestné činy, kde predmetom sú počítačové systémy alebo údaje (neoprávnený prístup, zásah do systému, zachytávanie dát); a (4) koristenie sa z trestnej činnosti inej osoby vrátane legalizácie výnosov z trestnej činnosti. Kľúčové pojmy: prisvojenie veci znamená odňatie veci z dispozície oprávnenej osoby bez jej súhlasu s úmyslom nakladať s ňou ako s vlastnou; vecou môže byť aj nehmotná informácia alebo dáta; škoda zahŕňa ujmu na majetku alebo zisk získaný v príčinnej súvislosti s trestným činom. Zákon rozlišuje stupne škody podľa výšky (malá, väčšia, značná, veľkého rozsahu) a vymedzuje vlámanie ako prekonanie zabezpečenia pri vniknutí do uzavretého priestoru; protiprávne obsadenie a neoprávnené užívanie priestoru sú samostatné skutkové podstaty. Legalizácia výnosu z trestnej činnosti postihuje nakladanie s výnosmi s cieľom skryť ich trestný pôvod. Počítačové trestné činy sú čoraz dôležitejšie: ide o neoprávnený prístup, zásahy do systémov a údajov, výrobu a držbu prístupových zariadení či hesiel.`,

  priklad: `
Účtovník malej firmy vytvorí falošné faktúry za dodávky, ktoré nikdy neprebehli, a prevádza peniaze na svoj účet; časť peňazí použije na nákup elektronických zariadení, časť pošle cez kryptomeny do zahraničia, aby zakryl pôvod. Polícia pri vyšetrovaní zistí spreneveru a podvod; zároveň sa začne vyšetrovanie legalizácie výnosov z trestnej činnosti a možného neoprávneného prístupu do účtovného systému (počítačový trestný čin). Pri kvalifikácii sa posudzuje rozsah škody, úmysel páchateľa, použité prostriedky a či došlo k ďalším súvisiacim trestným činom.`,

  klucove_slova: [
    "vlastníctvo",
    "prisvojenie",
    "legalizácia",
    "počítačová kriminalita",
    "podvod"
  ],

  zapamataj_si: [
    "Hlavné rozdiely pri kvalifikácii sú medzi obohatením sa na úkor cudzieho majetku (krádež, sprenevera, podvod) a úmyselným poškodzovaním majetku.",
    "Pre počítačové trestné činy je predmetom systém alebo dáta — trestnosť závisí od zásahu do integrity, dostupnosti alebo dôvernosti.",
    "Pre určenie trestnej sadzby a kvalifikácie je rozhodujúca výška škody (malá, väčšia, značná, veľkého rozsahu), spôsob spáchania a postavenie páchateľa (špeciálny subjekt alebo právnická osoba)."
  ],

  literatura: [
    "TPH II. – majetkové činy",
    "Komentár – § 212 až 245"
  ]
},
{
  id: "A23",
  section: "A",
  kod: "A23",
  nazov: "Trestné činy hospodárske",

  vysvetlenie: `
Trestné činy hospodárske chránia riadne fungovanie trhu a verejné finančné záujmy; ide o úmyselné porušenia pravidiel hospodárskeho styku, daňovej disciplíny, priemyselných a autorských práv a o činy, ktoré narúšajú hospodársku súťaž.

Trestné činy hospodárske sú upravené v piatej hlave osobitnej časti Trestného zákona a ich druhým objektom je funkčnosť trhovej ekonomiky a riadny výber daní. V praxi to znamená, že zákon postihuje konania, ktoré narúšajú hospodársku súťaž, obchádzajú pravidlá podnikania, poškodzujú finančné záujmy štátu alebo EÚ, falšujú peniaze či cenné papiere, manipulujú s trhom alebo zneužívajú obchodné informácie. 

Objektívna stránka týchto trestných činov zahŕňa široké spektrum protiprávnych konaní: neoprávnené podnikanie a zamestnávanie, skresľovanie hospodárskej evidencie, machinácie pri verejnom obstarávaní, poškodzovanie finančných záujmov EÚ, falšovanie peňazí a cenných papierov, skracovanie daní či legalizácia výnosov z trestnej činnosti. Pri počítačových formách hospodárskych trestných činov je predmetom útoku informačný systém alebo dáta, čo zvyšuje význam digitálnej forenziky pri vyšetrovaní. 

Subjektom týchto činov môže byť v zásade každá trestne zodpovedná fyzická osoba, pri niektorých skutkoch sa však vyžaduje špeciálny subjekt (napr. štatutárny orgán, prokurista) a mnohé skutkové podstaty môžu spáchať aj právnické osoby. Zavinenie je spravidla úmyselné, výnimky s nedbanlivosťou sú explicitne uvedené v zákone. Pri kvalifikácii sa posudzuje postavenie páchateľa, rozsah škody, spôsob spáchania a opakovanosť konania. `,

  priklad: `
Konateľ firmy vedome skresľuje účtovné doklady, neuvádza skutočné tržby a tak skracuje daň z príjmov; súčasne časť peňazí prevádza cez fiktívne faktúry na zahraničné účty, aby zamaskoval pôvod. Vyšetrovanie môže viesť k stíhaniu za skresľovanie údajov hospodárskej evidencie, daňový podvod a legalizáciu výnosov z trestnej činnosti, pričom orgány daňovej správy, polícia a prokuratúra spolupracujú pri dokazovaní úmyslu, rozsahu škody a prepojení transakcií. `,

  klucove_slova: [
    "trhová ekonomika",
    "daňový podvod",
"legalizácia výnosov",
    "falšovanie",
    "manipulácia s trhom"
  ],

  zapamataj_si: [
    "Hlavným cieľom je ochrana hospodárskej súťaže a verejných financií; porušenia pravidiel podnikania a daňovej disciplíny sú prísne trestané. ",
    "Rozsah škody, postavenie páchateľa a úmysel rozhodujú o kvalifikácii a treste; špeciálne subjekty a právnické osoby môžu niesť zvýšenú zodpovednosť.",
    "Počítačové formy hospodárskych trestných činov a legalizácia výnosov sú dnes kľúčové oblasti vyšetrovania; digitálne stopy a finančné toky sú často rozhodujúce dôkazy."
  ],

  literatura: [
    "TPH II. – hospodárske činy",
    "Komentár – § 250 až 273"
  ]
},
{
  id: "A24",
  section: "A",
  kod: "A24",
  nazov: "Trestné činy všeobecne nebezpečné a proti životnému prostrediu",

  vysvetlenie: `
Trestné činy všeobecne nebezpečné a proti životnému prostrediu chránia bezpečnosť života, zdravia, majetku a ekologickú rovnováhu; stačí už samotné ohrozenie týchto záujmov, aby bol čin trestný.

Šiesta hlava osobitnej časti Trestného zákona sústreďuje všeobecne nebezpečné činy (napr. všeobecné ohrozenie, poškodzovanie prevádzky verejných zariadení, nedovolené ozbrojovanie, založenie zločineckej alebo teroristickej skupiny) a trestné činy proti životnému prostrediu (napr. neoprávnené nakladanie s odpadmi, vypúšťanie znečisťujúcich látok, poškodzovanie vôd, pytliactvo, šírenie nákazlivých chorôb rastlín a zvierat). Predmetom ochrany je nielen konkrétna škoda, ale často už samotné ohrozenie verejných záujmov; zákon preto postihuje konania, ktoré môžu viesť k rozsiahlym následkom pre veľký počet osôb alebo pre prírodu. 

Subjektom sú spravidla všetky trestne zodpovedné fyzické osoby; pri niektorých skutkoch sa vyžaduje špeciálny subjekt a mnohé ustanovenia umožňujú stíhanie aj právnických osôb. Zavinenie býva prevažne úmyselné; pri vybraných skutkoch zákon pripúšťa aj nedbanlivosť alebo obe formy zavinenia. 

Prečo stačí ohrozenie
U týchto činov objektívna stránka často nastáva už pri ohrození (napr. ohrozenie prevádzky verejného zariadenia alebo vystavenie veľkého majetku nebezpečenstvu), pretože následky môžu byť rýchle, rozsiahle a ťažko napraviteľné. To umožňuje rýchlejšiu reakciu orgánov činných v trestnom konaní a prevenciu škôd. `,

  priklad: `
Firma nelegálne ukladá toxický odpad pri rieke; pri silnom daždi sa časť odpadu dostane do vodného toku a hrozí kontaminácia zásob pitnej vody pre obce. Už samotné neoprávnené nakladanie s odpadmi a neoprávnené vypúšťanie znečisťujúcich látok predstavuje trestný čin; ak dôjde k rozsiahlemu znečisteniu alebo dlhodobej škode na ekosystéme, kvalifikácia a tresty sú prísnejšie. Orgány môžu stíhať zodpovedné osoby aj právnickú osobu a uložiť nápravné opatrenia vrátane obnovy životného prostredia. `,

  klucove_slova: [
    "Všeobecné ohrozenie",
    "Teroristická alebo zločinecká skupina",
    "Životné prostredie ",
    "Neoprávnené nakladanie s odpadmi"
  ],

  zapamataj_si: [
    "Stačí ohrozenie chráneného záujmu; nie vždy je potrebná skutočná škoda. ",
    "Trestnosť môže postihnúť fyzické aj právnické osoby; pri niektorých skutkoch sa vyžaduje špeciálny subjekt. ",
    "Nové európske a vnútroštátne zmeny zvyšujú dôraz a sankcie za trestné činy proti životnému prostrediu, vrátane prísnejších trestov a povinnosti obnovy poškodeného prostredia."
  ],

  literatura: [
    "TPH II. – všeobecne nebezpečné činy",
    "Komentár – § 284 až 310"
  ]
},
{
  id: "A25",
  section: "A",
  kod: "A25",
  nazov: "Trestné činy proti republike",

  vysvetlenie: `
Trestné činy proti republike chránia základy štátu — ústavné zriadenie, územnú celistvosť, samostatnosť, zvrchovanosť, obranyschopnosť a bezpečnosť Slovenskej republiky. Objektívna stránka týchto činov spočíva v útokoch, ktoré tieto hodnoty poškodzujú alebo im hrozia: ide o konania smerujúce proti ústavnému poriadku, proti obrane štátu, proti územnej celistvosti alebo ktoré ohrozujú život, zdravie či majetok vo veľkom rozsahu. Medzi typické skutky patria vlastizrada, úklady proti Slovenskej republike, teror, záškodníctvo, sabotáž, založenie alebo podpora zločineckej či teroristickej skupiny, ako aj trestné činy ohrozujúce bezpečnosť (napr. vedenie vojenských informácií cudzím mocnostiam, ohrozenie utajovanej skutočnosti). Subjektom je spravidla každá trestne zodpovedná fyzická osoba, pri niektorých skutkoch sa však vyžaduje špeciálny subjekt (napr. osoba s určitým postavením alebo oprávnením); trestný čin teroru môže byť spáchaný aj právnickou osobou. Subjektívna stránka je väčšinou úmyselná, výnimku tvorí napríklad ohrozenie utajovanej skutočnosti, kde zákon pripúšťa aj nedbanlivosť. Pri posudzovaní sa hodnotí cieľ páchateľa (či konal v prospech cudzej moci alebo s úmyslom oslabiť štát), spôsob konania, rozsah ohrozenia a postavenie páchateľa; tieto okolnosti zásadne ovplyvňujú kvalifikáciu a prísnosť trestu.`,

  priklad: `
Zamestnanec štátneho úradu, ktorý má prístup k utajovaným obranným plánom, skopíruje dokumenty a odovzdá ich zástupcovi cudzej mocnosti s cieľom oslabiť obranyschopnosť krajiny. Už samotné vyzrazenie utajovaných skutočností a ich odovzdanie cudzej moci predstavuje závažný trestný čin proti bezpečnosti republiky a môže byť kvalifikované ako vlastizrada alebo ohrozenie utajovanej skutočnosti; ak by išlo o organizované prípravy útoku, mohlo by ísť aj o terorizmus alebo založenie teroristickej skupiny. Pri dokazovaní sa skúma úmysel, rozsah škody alebo ohrozenia, postavenie páchateľa a či išlo o konanie v prospech cudzej moci.`,

  klucove_slova: [
    "vlastizrada",
    "terorizmus",
    "ústavné zriadenie",
    "utajované skutočnosti"
  ],

  zapamataj_si: [
    "Hlavným predmetom ochrany sú základy štátu a jeho bezpečnosť; trestnosť nastáva už pri ohrození týchto záujmov.",
    "Väčšina skutkov vyžaduje úmysel; výnimky (napr. ohrozenie utajovanej skutočnosti) môžu pripúšťať aj nedbanlivosť.",
    "Niektoré činy vyžadujú špeciálny subjekt a terorizmus môže byť stíhaný aj voči právnickej osobe — postavenie páchateľa a cieľ konania výrazne ovplyvňujú kvalifikáciu a trest."
  ],

  literatura: [
    "TPH II. – proti republike",
    "Komentár – § 312 až 326"
  ]
},
{
  id: "A26",
  section: "A",
  kod: "A26",
  nazov: "Trestné činy proti poriadku vo verejných veciach",

  vysvetlenie: `
Trestné činy proti poriadku vo verejných veciach chránia predovšetkým riadny výkon verejnej moci, dôveru v štátne inštitúcie a čistotu verejného života; ide o súbor skutkov, ktorými sa napádajú alebo zneužívajú právomoci orgánov verejnej moci a verejných činiteľov, narúša sa priebeh volieb, súdneho konania alebo sa páchajú formy korupcie a falšovania verejných listín. Objektívna stránka týchto činov spočíva buď v útoku na výkon právomoci (napr. útok na orgán verejnej moci, útok na verejného činiteľa), alebo v konaní verejných činiteľov, ktoré prekračuje alebo zneužíva ich právomoci (zneužívanie právomoci, ohýbanie práva, marenie úloh). Do tejto kapitoly patrí aj široké spektrum korupčných trestných činov — prijímanie a poskytovanie úplatku, nepriama korupcia, volebná a športová korupcia — ako aj činy narúšajúce priebeh spravodlivosti (krivé obvinenie, krivá výpoveď, marenie výkonu úradného rozhodnutia), falšovanie úradných dokumentov, ohrozovanie utajovaných skutočností či násilné prekročenie štátnej hranice. Subjektom týchto trestných činov je spravidla každá trestne zodpovedná fyzická osoba; pri niektorých skutkoch sa vyžaduje špeciálny subjekt (napr. verejný činiteľ, štatutárny orgán), mnohé ustanovenia umožňujú postihnúť aj právnickú osobu. Z hľadiska zavinenia sa väčšina skutkov posudzuje ako úmyselné; výnimky, kde postačuje nedbanlivosť, sú v zákone explicitne uvedené. Pri kvalifikácii a výmere trestu sú rozhodujúce postavenie páchateľa (či ide o verejného činiteľa), spôsob konania, rozsah poškodenia verejného záujmu a či išlo o opakované alebo organizované konanie.`,

  priklad: `
starosta obce vyhlási verejné obstarávanie na rekonštrukciu miestnej školy; súkromná firma mu ponúkne finančný úplatok výmenou za prednostné pridelenie zákazky. Starosta, aby zakryl dohodu, zmení podmienky súťaže tak, že vyhovujú len tejto firme, a zároveň prikryje skutočné rozhodnutie falšovaním zápisnice z výberového konania. Takéto konanie obsahuje viac trestných činov: prijatie úplatku zo strany starostu, podplácanie zo strany firmy, manipuláciu s verejným obstarávaním a falšovanie verejnej listiny; ak by sa pri tom maril výkon súdneho alebo kontrolného orgánu, mohlo by ísť aj o ďalšie skutkové podstaty. Pri dokazovaní sa skúma úmysel, či išlo o zneužitie právomoci verejného činiteľa, rozsah škody pre verejné prostriedky a či boli porušené pravidlá transparentnosti a hospodárnosti.`,

  klucove_slova: [
    "verejná moc",
    "marenie spravodlivosti",
    "falšovanie",
    "verejné obstarávanie"
  ],

  zapamataj_si: [
    "Tieto činy chránia fungovanie štátu a dôveru verejnosti; útoky na výkon právomoci alebo zneužitie funkcie majú vysokú spoločenskú závažnosť.",
    "Korupčné skutky zahŕňajú prijímanie aj poskytovanie úplatku; už sľub alebo prijatie sľubu úplatku je trestné.",
    "Postavenie páchateľa (verejný činiteľ, štatutár) a spôsob konania zásadne ovplyvňujú kvalifikáciu a prísnosť trestu."
  ],

  literatura: [
    "TPH II. – verejné veci",
    "Komentár – § 339 až 352"
  ]
},
{
  id: "A27",
  section: "A",
  kod: "A27",
  nazov: "Korupcia",

  vysvetlenie: `
Korupcia je súhrn trestných činov, ktorými sa niekto snaží získať neoprávnenú výhodu alebo ovplyvniť rozhodovanie inej osoby výmenou za „úplatok“. Úplatok môže byť vecný (peniaze, dary, služby) alebo ne-majetkový (sľub vybavenia pracovného miesta, postupu, kontraktu). Z právneho hľadiska rozlišujeme aktívnu korupciu (ponúknutie, sľub alebo poskytnutie úplatku) a pasívnu korupciu (žiadosť o úplatok, prijatie alebo sľub prijatia). Existuje aj nepriama korupcia (vplyvom, cez sprostredkovateľa alebo tretie osoby) a formy súvisiace s konaním tretích osôb: podnecovanie, schvaľovanie, neoznámenie trestného činu alebo nadržovanie. Už samotné sľúbenie úplatku alebo jeho prijatie je trestné; nie je potrebné, aby úplatok bol aj skutočne využitý. V súkromnom sektore sú často trestné konania oboch strán (poskytovateľa aj príjemcu) s dôrazom na cieľ obohatenia alebo získania výhody; vo verejnom sektore je zvlášť prísne postihované prijatie úplatku verejným činiteľom a zneužitie verejnej funkcie. Pozor: povinnosť oznámiť korupčné konanie môže kolidovať s profesijnou mlčanlivosťou (napr. advokáta) — tieto výnimky upravujú osobitné predpisy.`,

  priklad: `
Firma A chce získať zákazku od obce. Zástupca firmy ponúkne vedúcemu odboru v obci „úplatok“ v podobe peňazí a sľúbi, že zamestná jeho príbuzného, ak zabezpečí výber práve tejto firmy. Vedúci odboru úplatok prijme a upraví podmienky verejného obstarávania tak, aby vyhovovali firme A. Tu ide o viacnásobnú korupčnú konanie: aktívne podplácanie zo strany firmy, pasívne prijatie úplatku zo strany verejného činiteľa, zneužitie právomoci a manipuláciu s verejným obstarávaním; ak by sa úplatok sprostredkoval cez tretiu osobu, ide aj o nepriamu korupciu.`,

  klucove_slova: [
    "Aktívna a pasívna korupcia",
    "Úplatok",
    "Podnecovanie",
 "Nepriama korupcia",
    "Mlčanlivosť"
  ],

  zapamataj_si: [
    "Úplatok môže byť vecný aj ne-majetkový; už sľub alebo prijatie úplatku je trestné.",
    "Korupcia sa trestá v súkromnom aj verejnom sektore; vo verejnom sektore je postih často prísnejší a zahŕňa zneužitie funkcie.",
    "Nepriama korupcia a konanie cez sprostredkovateľov sú bežné — preto sa trestá nielen priame dávanie/prijímanie, ale aj podnecovanie, schvaľovanie a krytie korupčných činov."
  ],

  literatura: [
    "TPH II. – korupcia",
    "Komentár – § 328 až 336"
  ]
},
{
  id: "A28",
  section: "A",
  kod: "A28",
  nazov: "Trestné činy proti iným právam a slobodám",

  vysvetlenie: `
Trestné činy proti iným právam a slobodám chránia rôzne osobné práva a slobody jednotlivca a spoločnosti, najmä pred útokmi na dôstojnosť, súkromie, verejný poriadok a morálne hodnoty; objektom sú napríklad právo na bezpečie, dobré meno, súkromie, integrita osobných údajov a mravnosť. Objektívna stránka zahŕňa konania, ktoré cielene ohrozujú alebo porušujú tieto práva — napr. násilie proti skupine obyvateľov, nebezpečné vyhrážanie, nebezpečné prenasledovanie (stalking), nebezpečné elektronické obťažovanie (cyberstalking), šírenie poplašnej správy, ohováranie, neoprávnené nakladanie s osobnými údajmi, výroba a šírenie detskej pornografie, podpora patologických sexuálnych praktík či hanobenie miesta posledného odpočinku. Subjektom môže byť spravidla ktorákoľvek trestne zodpovedná fyzická osoba; pri niektorých skutkoch zákon vyžaduje špeciálny subjekt alebo umožňuje stíhanie aj právnickej osoby. Zavinenie je väčšinou úmyselné, pri vybraných skutkoch sú prípustné obe formy zavinenia. Pri posudzovaní sa hodnotí spôsob konania (verejné vs. súkromné), rozsah šírenia alebo opakovanosti, cieľ páchateľa a následky pre obeť alebo spoločnosť.`,

  priklad: `
Mladý človek opakovane zasiela bývalej partnerke urážlivé správy, zverejní jej súkromné fotografie na sociálnych sieťach a vyhráža sa, že ich pošle jej rodine a kolegom; zároveň vytvorí falošné účty, aby ju verejne zosmiešnil. Jeho konanie predstavuje kombináciu nebezpečného elektronického obťažovania, neoprávneného nakladania s osobnými údajmi a ohovárania; ak by zverejnil materiál s obsahom detskej pornografie, išlo by o zvlášť závažné trestné činy s prísnymi sankciami. Pri dokazovaní sa skúma opakovanosť, verejný dosah, úmysel páchateľa a škoda na psychike či reputácii obete.`,

  klucove_slova: [
    "súkromie",
    "obťažovanie",
"ohováranie",
    "osobné údaje",
    "detská pornografia"
  ],

  zapamataj_si: [
    "Tieto činy chránia osobné práva a dôstojnosť; trestnosť často závisí od verejného dosahu a opakovania konania.",
    "Neoprávnené nakladanie s osobnými údajmi a elektronické obťažovanie sú dnes bežné a prísne postihované.",
    "Výroba alebo šírenie detskej pornografie a zneužívanie detí sú mimoriadne závažné skutky s vysokou trestnoprávnou záťažou."
  ],

  literatura: [
    "TPH II. – práva a slobody",
    "Komentár – § 179 až 186"
  ]
},
{
  id: "A29",
  section: "A",
  kod: "A29",
  nazov: "Trestné činy proti brannosti a vojenské trestné činy",

  vysvetlenie: `
Trestné činy proti brannosti a vojenské trestné činy chránia povinnosť občanov a vojakov plniť úlohy súvisiace s obranou štátu, riadne vykonávanie vojenskej služby a alternatívnej (civilnej) služby. Ide o konania, ktorými sa zabraňuje alebo sťažuje plnenie brannej povinnosti, nenastúpenie do služby v ozbrojených silách, vyhýbanie sa civilnej službe, neoprávnená služba v cudzom vojsku, spolupráca s nepriateľom či vojnová zrada; vojenské trestné činy sa týkajú výlučne vojakov a porušovania vojenskej disciplíny, napríklad neposlušnosti rozkazu, dezercie alebo porušenia povinností strážnej služby. Subjektom týchto činov je osoba, ktorá má brannú povinnosť alebo vojak; zavinenie je spravidla úmyselné, pri niektorých skutkoch zákon pripúšťa aj nedbanlivosť. Právna ochrana siaha od postihov za obchádzanie odvodnej povinnosti cez tresty za nenastúpenie civilnej služby až po veľmi prísne sankcie za spoluprácu s nepriateľom či vojnovú zradu, pretože takéto konanie ohrozuje obranyschopnosť a bezpečnosť štátu.`,

  priklad: `
mladý muž, ktorý sa vyhýba odvodu a odchádza do zahraničia, kde vstúpi do cudzích ozbrojených síl, môže byť stíhaný za obchádzanie brannej povinnosti a za službu v cudzom vojsku; ak by jeho konanie spočívalo v poskytovaní informácií alebo pomoci nepriateľovi, hrozilo by mu obvinenie zo spolupráce s nepriateľom alebo vojnová zrada, s výrazne prísnejšími trestami.`,

  klucove_slova: [
    "brannosť",
    "povinnosť",
    "civilná služba",
    "dezercia"
  ],

  zapamataj_si: [
    "Trestné činy proti brannosti postihujú osoby, ktoré majú zákonnú brannú povinnosť; nie sú to všeobecné trestné činy, ale sú viazané na špecifické povinnosti.",
    "Rozdiel medzi vyhýbaním sa brannej povinnosti, službou v cudzom vojsku a spoluprácou s nepriateľom je v cieli a následkoch konania; posledné menované majú najzávažnejšiu kvalifikáciu.",
    "Vojenské trestné činy sa vzťahujú výlučne na vojakov a zahŕňajú porušenie vojenskej disciplíny, neposlušnosť rozkazu a dezerciu; pri niektorých skutkoch môže postačovať aj nedbanlivosť."
  ],

  literatura: [
    "TPH II. – brannosť",
    "Komentár – § 269 až 279"
  ]
},
{
  id: "A30",
  section: "A",
  kod: "A30",
  nazov: "Trestné činy proti mieru, ľudskosti, terorizmus, extrémizmus a vojnové trestné činy",

  vysvetlenie: `
Trestné činy proti mieru, proti ľudskosti, terorizmus, extrémizmus a vojnové trestné činy chránia mierové spolužitie národov, základné ľudské práva, princípy humanizmu a pravidlá vedenia vojny. Ide o konania, ktoré narúšajú medzinárodný poriadok alebo vedú k masovým, systematickým alebo cielene brutálnym útokom na civilné obyvateľstvo. Medzi takéto skutky patria napríklad ohrozenie mieru, genocídium, mučenie, nedobrovoľné zmiznutie, teroristický útok, financovanie terorizmu, založenie a podpora extrémistického hnutia, popieranie holokaustu, ako aj vojnové zločiny ako plienenie, zneužívanie označení alebo vojnové bezprávie. Subjektom môže byť v zásade ktorákoľvek trestne zodpovedná osoba; pri niektorých skutkoch sa vyžaduje špeciálny subjekt alebo môže byť stíhaná aj právnická osoba. Zavinenie je vždy úmyselné. Tieto činy majú mimoriadnu spoločenskú závažnosť, pretože poškodzujú veľké skupiny ľudí, štáty alebo medzinárodné spoločenstvo.
Upozornenie: organizácie a hnutia, ktoré páchanie takýchto činov podporujú, spôsobujú vážne utrpenie a porušovanie ľudských práv.`,

  priklad: `
Skupina osôb založí a financuje ozbrojené zoskupenie, ktoré v priebehu konfliktu systematicky útočí na civilné obyvateľstvo v susednej krajine, pácha masové vraždy, mučí zajatcov a ničí kultúrne pamiatky. Jednotlivci z tejto skupiny organizujú a vykonávajú teroristické útoky, získavajú peniaze cez falošné charitatívne zbierky a šíria extrémistickú propagandu na internete. Orgány štátu a medzinárodné inštitúcie stíhajú organizátorov za genocídium, terorizmus, financovanie terorizmu, výrobu a šírenie extrémistického materiálu a za vojnové zločiny; tresty sú najprísnejšie, vrátane dlhodobého odňatia slobody a medzinárodného stíhania.`,

  klucove_slova: [
    "mier",
    "ľudskosť",
    "terorizmus",
    "extrémizmus",
    "vojnové zločiny"
  ],

  zapamataj_si: [
    "Tieto činy chránia medzinárodný poriadok a základné ľudské práva; trestnosť nastáva pri úmyselnom narušení mieru alebo pri systematickom útoku na civilistov.",
    "Terorizmus a extrémizmus zahŕňajú nielen násilné útoky, ale aj financovanie, propagáciu a šírenie materiálov; trestá sa aj cestovanie či príprava na teroristické účely.",
    "Vojnové zločiny porušujú pravidlá vedenia vojny a humanitárne zásady; ich stíhanie môže prebiehať na národnej aj medzinárodnej úrovni a má za cieľ obnoviť spravodlivosť a ochranu obetí."
  ],

  literatura: [
    "TPH II. – mier a ľudskosť",
    "Komentár – § 418 až 435"
  ]
},
{
  id: "B1",
  section: "B",
  kod: "B1",
  nazov: "Základné zásady trestného konania",

  vysvetlenie: `
Trestné konanie stojí na základných zásadách, ktoré určujú, ako majú orgány činné v trestnom konaní postupovať, čo je dovolené a čo je zakázané. Sú to vedúce právne idey, na ktorých je postavená celá organizácia trestného konania. Zásady chránia základné práva človeka, určujú limity zásahov štátu a zabezpečujú spravodlivý proces. Vyplývajú z Ústavy SR, Trestného poriadku a Európskeho dohovoru o ľudských právach. Majú poznávací význam (pomáhajú pochopiť zmysel konania), interpretačný význam (usmerňujú výklad zákona), aplikačný význam (vedú orgány pri rozhodovaní) a normotvorný význam (sú základom pre tvorbu ďalších procesných pravidiel).

Zásady tvoria ucelený systém: patrí sem zásada zákonnosti a oficiality, podľa ktorej možno stíhať len zo zákonných dôvodov a orgány musia konať z úradnej povinnosti; zásada primeranosti a zdržanlivosti, ktorá zakazuje neprimerané zásahy do práv; zásada rýchlosti konania, aby sa veci neodkladali; zásada kontradiktórnosti, ktorá zabezpečuje rovnosť strán; zásada práva na obhajobu, ktorá garantuje, že obvinený má možnosť brániť sa; zásada verejnosti, ktorá umožňuje kontrolu konania; zásada legality a oportunity, ktoré určujú, kedy je povinné stíhanie a kedy možno od stíhania upustiť; zásada ne bis in idem, ktorá zakazuje opätovné stíhanie za ten istý skutok; a zásady dokazovania, ako prezumpcia neviny, voľné hodnotenie dôkazov, ústnosť, bezprostrednosť a povinnosť zistiť skutkový stav bez dôvodných pochybností. Tieto zásady vytvárajú rámec, ktorý zabezpečuje, že trestné konanie je spravodlivé, zákonné a rešpektuje ľudské práva.`,

  priklad: `
polícia zadrží osobu podozrivú z lúpeže. Nemôže ju vypočúvať bez poučenia o právach, musí jej umožniť kontakt s obhajcom, nesmie ju nútiť k výpovedi a musí zhromaždiť dôkazy zákonným spôsobom. Súd následne rozhoduje verejne, na základe kontradiktórneho procesu, pričom rešpektuje prezumpciu neviny a hodnotí dôkazy podľa zásady voľného hodnotenia. Ak by polícia získala dôkaz nezákonne (napr. nelegálnou domovou prehliadkou), súd ho nesmie použiť. Tým sa zabezpečuje, že štát koná spravodlivo a v medziach zákona.`,

  klucove_slova: [
    "zákonnosť",
    "prezumpcia neviny",
    "právo na obhajobu",
    "dokazovanie",
    "kontradiktórnosť"
  ],

  zapamataj_si: [
    "Zásady chránia práva osôb a určujú limity zásahov štátu v trestnom konaní.",
    "Prezumpcia neviny znamená, že vina musí byť dokázaná bez pochybností, nie len predpokladaná.",
    "Konanie musí byť rýchle, zákonné a spravodlivé; nezákonne získané dôkazy sa nesmú použiť."
  ],

  literatura: [
    "TPP I. – Základné zásady trestného konania",
    "Repetitórium TPP – zásady"
  ]
},
{
  id: "B2",
  section: "B",
  kod: "B2",
  nazov: "Ochrana základných práv a slobôd v trestnom konaní",

  vysvetlenie: `
Ochrana základných práv a slobôd v trestnom konaní znamená, že všetky procesné úkony štátu musia rešpektovať ústavné a medzinárodné práva človeka; štát môže do týchto práv zasahovať len v presne vymedzenom rozsahu, ktorý stanoví zákon, a vždy len s oprávneným cieľom a primeranými prostriedkami. Medzi najdôležitejšie chránené práva patria právo na život a telesnú integritu, zákaz mučenia a krutého zaobchádzania, prezumpcia neviny, právo na spravodlivý proces vrátane práva na obhajobu, právo na súkromie, nedotknuteľnosť obydlia a listové tajomstvo a ochrana osobných údajov. Zásahy do týchto práv sú prípustné len ak ich zákon výslovne upravuje, ak sledujú legitímny cieľ (napríklad vyšetrovanie závažnej trestnej činnosti alebo ochrana verejného poriadku) a ak sú primerané — teda neprekračujú nevyhnutnú mieru na dosiahnutie tohto cieľa.

Procesné zásady, ktoré túto ochranu konkretizujú, sú napríklad zákonnosť a oficialita (orgány konajú na základe zákona a z úradnej povinnosti), zásada primeranosti a zdržanlivosti (zásahy len v nevyhnutnom rozsahu), prezumpcia neviny (obvinený je považovaný za nevinného, kým jeho vina nie je preukázaná bez dôvodných pochybností), právo na obhajobu (prístup k obhajcovi, možnosť vyjadriť sa k dôkazom) a zásada rýchlosti a verejnosti konania. Zásady dokazovania — ústnosť, bezprostrednosť, voľné hodnotenie dôkazov a povinnosť zistiť skutkový stav bez dôvodných pochybností — tiež slúžia na ochranu práv strán a na zabezpečenie, aby rozhodnutie súdu bolo spravodlivé a opreté o zákonné dôkazy.

Existujú osobitné procesné záruky pri zásahoch do súkromia: pred vykonaním domovej prehliadky, odpočúvania alebo prístupu k telekomunikačným údajom musí existovať zákonné povolenie, odôvodnenie a často súdny súhlas; tieto opatrenia sa používajú len pri závažnom podozrení a na obmedzený čas. Zákon zároveň striktne zakazuje praktiky ako mučenie, neľudské alebo ponižujúce zaobchádzanie a akékoľvek donucovanie k priznaniu; dôkazy získané takýmto spôsobom sú neprípustné. Ak osoba považuje postup orgánov za nezákonný alebo nadmerný, má k dispozícii opravné prostriedky: podanie sťažnosti na policajný útvar alebo prokuratúru, podanie sťažnosti pre nečinnosť, podanie návrhu na preskúmanie zákonnosti úkonov súdom a v konečnom dôsledku sťažnosť na Európsky súd pre ľudské práva.
`,

  priklad: `
Polícia má podozrenie z trestného činu a žiada súd o povolenie odpočúvania telefónu podozrivého. Súd povolenie vydá len ak sú splnené zákonné podmienky: existuje odôvodnené podozrenie zo závažného trestného činu, odpočúvanie je nevyhnutné pre získanie dôkazov, rozsah a trvanie sú obmedzené na nevyhnutné minimum a sú stanovené procesné záruky na ochranu tretích osôb. Ak by polícia odpočúvala bez súdneho povolenia alebo by záznamy z odpočúvania použila na nátlak, takéto dôkazy by boli neprípustné a konanie by porušilo práva podozrivého; poškodený môže podať sťažnosť a domáhať sa nápravy.`,

  klucove_slova: [
    "prezumpcia neviny",
    "právo na obhajobu",
    "zákonnosť zásahov",
    "primeranosť",
    "zákaz mučenia"
  ],

  zapamataj_si: [
    "Zásahy do základných práv v trestnom konaní sú prípustné len na základe zákona, s jasným cieľom a v primeranom rozsahu.",
    "Prezumpcia neviny a právo na obhajobu sú jadrom spravodlivého procesu; obvinený nesmie byť nútený k priznaniu a má právo na obhajcu.",
    "Ak orgány konajú nezákonne (neoprávnené odpočúvanie, domová prehliadka bez povolenia, nátlak), existujú opravné prostriedky vrátane sťažnosti, preskúmania súdom a podania sťažnosti k medzinárodným orgánom."
  ],

  literatura: [
    "TPP I. – Ochrana základných práv",
    "ESĽP – judikatúra k čl. 5 a 6 Dohovoru"
  ]
}, 
{
  id: "B3",
  section: "B",
  kod: "B3",
  nazov: "Subjekty a strany trestného konania",

  vysvetlenie: `
Subjektmi trestného konania sú tie štátne orgány, fyzické a právnické osoby, ktoré majú zákonom priznaný vplyv na priebeh konania a ktorým zákon ukladá procesné práva alebo povinnosti; ide o súbor aktérov, ktorí konanie iniciujú, vedú, rozhodujú alebo sa ho priamo zúčastňujú. Medzi hlavné orgány činné v trestnom konaní patria prokurátor, polícia a súdy; prokurátor zastupuje verejný záujem pri stíhaní trestných činov, polícia vykonáva vyšetrovanie a zabezpečuje dôkazy a súdy rozhodujú o vine a treste v nezávislom procese. K orgánom patria aj pomocné osoby, napríklad probačný a mediačný úradník, vyšší súdny radca, súdny tajomník, zapisovateľ, tlmočník a znalci, ktorí poskytujú odborné posudky alebo zabezpečujú priebeh pojednávania. Subjektmi môžu byť aj svedkovia, znalci, nezúčastnené osoby a figuranti, avšak len vtedy, ak si uplatňujú nároky na náhradu svedectva, znalečného alebo nevyhnutných výdavkov.

Stranami trestného konania sú tie subjekty, ktoré majú podľa zákona osobitné postavenie a sú oprávnené na súde uplatňovať alebo podporovať obžalobu, prípadne sa proti obžalobe brániť; medzi strany patria osoba, proti ktorej sa vedie trestné stíhanie (podozrivý, obvinený, obžalovaný, odsúdený), poškodený (alebo jeho splnomocnenec), zúčastnená osoba, prokurátor a ďalšie osoby so samostatnými obhajovacími právami. Osoba, proti ktorej sa vedie trestné stíhanie, má zákonom garantované práva: právo na obhajcu, právo byť informovaná o obvinení, právo vypovedať alebo mlčať, právo na zákonné procesné úkony a právo na odvolanie; zákonný zástupca a blízke osoby majú pri maloletých alebo neplnoletých osobitné postavenie a ochranu. Poškodený má právo uplatniť nároky na náhradu škody, byť informovaný o priebehu konania a zúčastňovať sa niektorých úkonov; zúčastnená osoba môže mať vlastné procesné oprávnenia na ochranu svojich práv.

Vzťahy medzi subjektmi a stranami sú riadené zásadami kontradiktórnosti a práva na obhajobu: strany majú možnosť predkladať dôkazy, vyjadrovať sa k dôkazom protistrany a využívať opravné prostriedky. Orgány činné v trestnom konaní majú povinnosti konať zákonne, zabezpečiť rýchlosť a efektívnosť konania, chrániť práva obvineného a poškodeného a postupovať s primeranosťou a zdržanlivosťou pri zásahoch do práv. V praxi to znamená, že polícia pri vyšetrovaní musí dodržiavať procesné záruky (povolenia súdu pri domových prehliadkach alebo odpočúvaní), prokurátor rozhoduje o vznesení obvinenia a súd posudzuje zákonnosť dôkazov a rozhoduje verejne a kontradiktórne.`,

  priklad: `
polícia začne vyšetrovanie lúpeže, zadrží podozrivého a vykoná domovú prehliadku na základe súdneho povolenia; podozrivý je oboznámený so svojimi právami a má právo na obhajcu, prokurátor po vyšetrení rozhodne o vznesení obvinenia a podá obžalobu; poškodený sa prihlási ako poškodený a uplatní nárok na náhradu škody; súd následne vedie kontradiktórne pojednávanie, hodnotí dôkazy podľa zásad ústnosti a bezprostrednosti a rozhodne o vine alebo oslobodení. V celom procese majú všetci účastníci právo na preskúmanie zákonnosti postupov a na podanie sťažností v prípade porušenia práv.`,

  klucove_slova: [
    "subjekt",
    "strany konania",
    "obvinený",
    "prokurátor",
    "poškodený"
  ],

  zapamataj_si: [
    "Subjektmi sú orgány a osoby, ktoré majú zákonom priznaný vplyv na priebeh konania; strany sú tí, ktorí majú osobitné procesné práva a povinnosti.",
    "Osoba, proti ktorej sa vedie stíhanie, má základné práva (obhajca, informovanie, právo mlčať) a štátne orgány musia konať zákonne a primerane.",
    "Poškodený a zúčastnená osoba majú vlastné procesné oprávnenia; ich nároky a práva sa uplatňujú v rámci kontradiktórneho a verejného procesu."
  ],

  literatura: [
    "TPP I. – Subjekty a strany konania",
    "Komentár k Trestnému poriadku – § o subjektoch"
  ]
},
{
  id: "B4",
  section: "B",
  kod: "B4",
  nazov: "Súdy, orgány činné v trestnom konaní a pomocné osoby",

  vysvetlenie: `
Súdnictvo a orgány činné v trestnom konaní sú postavené na ústavnom princípe, že len súd rozhoduje o vine a treste; ich postavenie upravuje Ústava SR a podrobne zákon o súdoch, zákon o Špecializovanom trestnom súde a Trestný poriadok. V Slovenskej republike vykonávajú súdnu moc nezávislé a nestranné súdy usporiadané do sústavy: okresné súdy, krajské súdy, špecializovaný trestný súd, mestské súdy v Bratislave a Košiciach a Najvyšší súd SR. Okresné súdy spravidla konajú v prvom stupni o všetkých trestných činoch, výnimočne o obzvlášť závažných skutkoch konajú v prvom stupni krajské alebo vybrané mestské súdy; Špecializovaný trestný súd má vymedzenú pôsobnosť pre najzávažnejšie trestné činy (organizovaná trestná činnosť, terorizmus, korupcia vo vysokom rozsahu a pod.). Najvyšší súd rozhoduje o opravných prostriedkoch, preskúmava dovolania a vykonáva zjednocovanie judikatúry, vrátane preskúmania zákonnosti niektorých príkazov na odpočúvanie či získanie telekomunikačných údajov.

Orgány činné v trestnom konaní tvoria predovšetkým prokuratúra, polícia a súdy. Polícia vykonáva vyšetrovanie, zhromažďuje dôkazy a zabezpečuje procesné úkony; prokurátor riadi trestné stíhanie, rozhoduje o vznesení obvinenia a zastupuje verejný záujem; súd rozhoduje nezávisle o vine a treste. K priebehu konania prispievajú pomocné osoby a odborníci: probační a mediační úradníci, vyšší súdni radcovia, súdni tajomníci, zapisovatelia, tlmočníci, znalci a psychológovia pri výsluchoch zraniteľných osôb. Pri procesných úkonoch platia prísne záruky zákonnosti — napríklad súdne povolenie pri domovej prehliadke alebo odpočúvaní — a každý zásah do práv účastníkov musí byť odôvodnený, primeraný a v medziach zákona.

V trestnom konaní existujú aj pravidlá riešenia sporov o príslušnosť medzi súdmi; spory medzi okresnými alebo krajskými súdmi a Špecializovaným trestným súdom rozhoduje Najvyšší súd SR. Od roku 2024 sa v niektorých oblastiach mení rozdelenie právomocí medzi prokurátorom a sudcom, čo ovplyvňuje procesné rozhodovanie a kontrolu zákonnosti úkonov.`,

  priklad: `
Polícia začne vyšetrovanie závažnej hospodárskej trestnej činnosti, vykoná domovú prehliadku na základe súdneho príkazu a zaistí dokumenty; prokurátor po vyšetrení vznesie obvinenie voči konateľovi spoločnosti a podá obžalobu; vec je priradená Špecializovanému trestnému súdu pre jej závažnosť a prepojenie na organizovanú skupinu; počas procesu súd posudzuje zákonnosť dôkazov, využíva znalecké posudky a rozhoduje verejne a kontradiktórne, pričom účastníci majú právo na obhajobu a opravné prostriedky.`,

  klucove_slova: [
    "súd",
    "prokurátor",
    "polícia",
    "Špecializovaný trestný súd",
    "znalec"
  ],

  zapamataj_si: [
    "Len súd rozhoduje o vine a treste; polícia a prokurátor majú vyšetrovaciu a obžalovaciu úlohu.",
    "Špecializovaný trestný súd rieši najzávažnejšie prípady; príslušnosť súdu závisí od povahy a závažnosti činu.",
    "Procesné úkony musia byť zákonné, primerané a podložené súdnym povolením tam, kde to zákon vyžaduje."
  ],

  literatura: [
    "TPP I. – Orgány činné v trestnom konaní",
    "TPP II. – Postavenie súdov"
  ]
},
{
  id: "B5",
  section: "B",
  kod: "B5",
  nazov: "Obvinený, postavenie obvineného a výsluch obvineného",

  vysvetlenie: `
Obvinený je v trestnom konaní osoba, voči ktorej bolo formálne vznesené obvinenie; právne postavenie obvineného sa mení v priebehu procesu — najprv je podozrivý, po vydaní uznesenia o vznesení obvinenia sa stáva obvineným, neskôr obžalovaným a po právoplatnom odsudzujúcom rozsudku odsúdeným. Obvinený má v procese zvláštne postavenie: je procesnou stranou, môže byť zdrojom dôkazov vlastnou výpoveďou, ale zároveň je predmetom rozhodnutia súdu, preto mu zákon priznáva rozsiahle práva a zároveň ukladá určité povinnosti. Medzi základné práva patrí právo byť oboznámený s tým, čo sa mu kladie za vinu a s právnou kvalifikáciou skutku, právo vyjadriť sa ku všetkým obvineným skutočnostiam, navrhovať a obstarávať dôkazy na svoju obhajobu, právo na rešpektovanie osobnosti a zákaz donucovania k výpovedi či priznaniu, právo nevypovedať, právo zvoliť si obhajcu a radovať sa s ním, nárok na bezplatnú obhajobu ak nemá prostriedky, právo nahliadnuť do spisu a robiť si z neho poznámky a kópie, právo byť poučený o svojich právach a o význame priznania, právo na tlmočníka a prekladateľa ak neovláda jazyk konania, právo na doručenie obžaloby a právo byť prítomný na hlavnom pojednávaní vrátane práva na záverečnú reč a posledné slovo. K povinnostiam obvineného patrí dostaviť sa na predvolanie, podrobiť sa predvedeniu, uviesť adresu na doručovanie písomností, strpieť úkony na zistenie totožnosti (odtlačky, fotografovanie, rekognícia), podrobiť sa prehliadke tela na zistenie stôp, strpieť odber krvi alebo iný biologický odber ak nie je spojený s nebezpečenstvom pre zdravie, poskytnúť vzorku DNA podľa osobitného zákona, zúčastniť sa konfrontácie a rekognície a strpieť potrebné zaistovacie úkony (zadržanie, väzba, odňatie vecí, domová prehliadka, osobná prehliadka). Zákon pritom chráni hranice donútenia: obvineného nemožno nútiť k priznaniu ani k písaniu alebo poskytnutiu hlasovej vzorky; pri niektorých úkonoch, ktoré by mohli zasahovať do osobnej integrity, platia prísne podmienky a často je potrebné súdne povolenie.

Výsluch obvineného má osobitné pravidlá: obvinený musí byť pred výsluchom poučený o svojich právach vrátane práva nevypovedať a práva na obhajcu; výsluch sa má viesť tak, aby sa zabezpečila jeho dobrovoľnosť a aby neboli použité nátlakové alebo ponižujúce metódy; ak obvinený požiada o obhajcu, polícia mu musí umožniť kontakt a poskytnúť primeraný čas na konzultáciu; výsluchy sa zvyčajne zaznamenávajú (zvukovo alebo obrazovo) a do spisu sa vkladajú zápisy, pričom obvinený má právo robiť si poznámky a vyjadriť námietky voči zápisu. Dôležitou zárukou je, že dôkazy získané mučením, nátlakom alebo iným nezákonným postupom sú neprípustné; ak sa preukáže porušenie práv pri výsluchu, môže to viesť k vylúčeniu dôkazu a k náprave postupu, vrátane podania sťažnosti na policajný útvar alebo prokuratúru a návrhu na preskúmanie zákonnosti úkonov súdom.`,

  priklad: `
Polícia zadrží osobu podozrivú z vlámania a pred prvým výsluchom ju oboznámi s tým, čo sa jej kladie za vinu, poučí ju o práve nevypovedať a o práve na obhajcu; obvinený si zvolí advokáta, s ktorým krátko konzultuje pred výsluchom; počas výsluchu odmietne odpovedať na niektoré otázky a využije právo mlčať, polícia vykoná zákonné úkony na zistenie totožnosti (odtlačky, fotografovanie) a na základe odôvodneného podozrenia a súdneho povolenia vykoná domovú prehliadku, pri ktorej zaistí veci súvisiace s trestným činom; ak by polícia použila nátlak alebo nezákonné odpočúvanie, obhajca by mohol podať návrh na vylúčenie takto získaných dôkazov a sťažnosť na prokuratúru.`,

  klucove_slova: [
    "obvinený",
    "právo nevypovedať",
    "neprípustnosť nátlaku",
    "právo na obhajobu"
  ],

  zapamataj_si: [
    "Obvinený má rozsiahle práva na ochranu osobnosti a na obhajobu; právo nevypovedať a právo na obhajcu sú kľúčové.",
    "Povinnosti obvineného (dostaviť sa, strpieť identifikačné úkony, odbery) sú limitované zákonom a musia byť primerané a odôvodnené.",
    "Dôkazy získané mučením, nátlakom alebo inými nezákonnými postupmi sú neprípustné a porušenie práv pri výsluchu môže viesť k vylúčeniu dôkazov a k disciplinárnym alebo trestnoprávnym následkom pre orgány."
  ],

  literatura: [
    "TPP I. – Obvinený",
    "Komentár – ustanovenia o výsluchu obvineného"
  ]
},
{
  id: "B6",
  section: "B",
  kod: "B6",
  nazov: "Obhajca a osoby so samostatnými obhajovacími právami",

  vysvetlenie: `
Obhajca je nezávislý a samostatný subjekt trestného konania, ktorý v mene obvineného vykonáva jeho procesné práva a poskytuje mu právnu pomoc; koná výlučne s jeho súhlasom a má povinnosť zachovávať mlčanlivosť o všetkom, čo sa dozvie pri výkone obhajoby. Obhajcom môže byť iba advokát zapísaný v zozname Slovenskej advokátskej komory alebo oprávnený euroadvokát; obhajca má právo nahliadať do spisu, podávať návrhy a opravné prostriedky, zúčastňovať sa vyšetrovacích úkonov, komunikovať s obvineným vo väzbe bez prítomnosti tretích osôb, zabezpečovať dôkazy na náklady obhajoby a viesť obhajobu na hlavnom pojednávaní vrátane záverečnej reči. Zákon tiež upravuje povinnú obhajobu — v závažných prípadoch alebo pri osobitnom význame veci musí mať obvinený obhajcu už v prípravnom konaní; ak si ho nezvolí, súd mu ho ustanoví ex offo. Okrem obhajcu majú niektoré osoby samostatné obhajovacie práva: napríklad zákonný zástupca maloletého obvineného, poškodený alebo zúčastnená osoba, ktoré môžu samostatne predkladať návrhy, navrhovať dôkazy a uplatňovať svoje procesné nároky nezávisle od obhajcu obvineného. Obhajca má zároveň etickú a zákonnú povinnosť konať v prospech klienta, chrániť jeho práva a usilovať sa o objasnenie skutočností, ktoré ho oslobodzujú alebo zmierňujú jeho vinu; porušenie mlčanlivosti alebo zneužitie postavenia môže viesť k disciplinárnej či trestnoprávnej zodpovednosti.`,

  priklad: `
Mladý muž je obvinený z krádeže. Po vznesení obvinenia si zvolí advokáta, ktorý okamžite nahliadne do spisu, podá návrh na doplnenie vyšetrovania a zabezpečí kamerové záznamy, ktoré preukazujú, že obvinený v čase činu nebol na mieste. Keďže ide o závažnejší skutok, súd mu ustanovil obhajcu ex offo ešte v prípravnom konaní; obhajca komunikuje s klientom vo väzbe, pripraví obhajobné dôkazy a na hlavnom pojednávaní prednesie záverečnú reč. Počas konania poškodený ako zúčastnená osoba uplatní nárok na náhradu škody a predloží vlastné dôkazy, pričom jeho právne záujmy zastupuje splnomocnenec so samostatnými obhajovacími právami.`,

  klucove_slova: [
    "Obhajca",
    "Povinná obhajoba",
    "Samostatné obhajovacie práva",
    "Advokát"
  ],

  zapamataj_si: [
    "Obhajca je nezávislý zástupca obvineného s právom nahliadať do spisu, podávať návrhy a viesť obhajobu; jeho mlčanlivosť je absolútna.",
    "V závažných prípadoch musí byť obvinenému ustanovený obhajca ex offo, ak si ho sám nezvolí.",
    "Poškodený a iné oprávnené osoby môžu mať samostatné obhajovacie práva, ktoré im umožňujú aktívne chrániť svoje procesné nároky nezávisle od obhajcu obvineného."
  ],

  literatura: [
    "TPP I. – Obhajca",
    "Advokátsky poriadok – úloha obhajcu"
  ]
},
{
  id: "B7",
  section: "B",
  kod: "B7",
  nazov: "Poškodený, obeť a zúčastnená osoba",

  vysvetlenie: `
Poškodený je procesný pojem: ide o osobu (fyzickú alebo právnickú, dokonca aj štát), ktorej trestným činom bola spôsobená majetková, morálna alebo iná škoda, alebo ktorej boli porušené či ohrozené iné zákonom chránené práva alebo slobody. Poškodený má v trestnom konaní postavenie strany — môže uplatniť nárok na náhradu škody v rámci adhézneho konania, navrhovať dôkazy, nahliadať do spisu, podávať opravné prostriedky a zúčastňovať sa na hlavnom pojednávaní.

Obeť je pojem ochranný a sociálnoprávny: ide výlučne o fyzickú osobu, ktorá utrpela ujmu (fyzickú, psychickú, majetkovú) v dôsledku trestného činu; pojem obete upravuje osobitný zákon o obetiach trestných činov a kladie dôraz na práva na informácie, odbornú a právnu pomoc, ochranu pred druhotnou viktimizáciou a na odškodnenie. Obeť má špecifický režim starostlivosti a ochrany, ktorý nemožno previesť na inú osobu.

Zúčastnená osoba je ten, komu bola zadržaná vec alebo časť majetku v súvislosti s trestným konaním; zúčastnená osoba nie je obvineným a má vlastné procesné práva — môže byť prítomná na pojednávaní, predkladať dôkazy, nahliadať do spisu, podať opravné prostriedky a v určitých prípadoch si zvoliť obhajcu obvineného alebo byť zastúpená splnomocnencom.

Dôležité ustanovenia (doslovne z dokumentu)  
„Poškodený je osoba, ktorej bolo trestným činom ublížené na zdraví, spôsobená majetková, morálna alebo iná škoda alebo boli porušené či ohrozené jej iné zákonom chránené práva alebo slobody (§ 46 ods. 1 TP).“
„Obeťou trestného činu je fyzická osoba, ktorej bolo alebo malo byť trestným činom ublížené na zdraví, ktorej bola spôsobená majetková škoda, morálna alebo iná škoda alebo ktorej boli porušené či ohrozené jej zákonom chránené práva alebo slobody.“`,

  priklad: `
Mária bola okradnutá na ulici — páchateľ jej vzal kabelku so všetkými dokladmi a peniazmi. Ako poškodená má Mária právo žiadať v trestnom konaní náhradu škody priamo voči obvinenému (adhézne), navrhovať dôkazy (napr. kamerové záznamy), nahliadať do spisu a byť informovaná o priebehu konania. Súčasne, ak by Mária utrpela psychickú traumu a potrebovala odbornú pomoc, vstupuje do hry režim obete podľa zákona o obetiach trestných činov — má nárok na bezplatnú odbornú a právnu pomoc, informácie o svojich právach a ochranu pred opakovanou viktimizáciou. Ak by počas vyšetrovania štát zaistil v byte páchateľa vec, ktorá patrila Márii (napr. jej doklady), Mária by mohla vystupovať aj ako zúčastnená osoba s právom predkladať dôkazy a žiadať vrátenie zadržanej veci.`,

  klucove_slova: [
    "Poškodený",
    "Obeť",
    "Zúčastnená osoba",
    "Adhézne konanie"
  ],

  zapamataj_si: [
    "Poškodený = procesná strana (môže uplatniť nárok na náhradu škody v trestnom konaní); obeť je osobitný ochranný pojem zameraný na pomoc a podporu.",
    "Práva poškodeného zahŕňajú nárok na náhradu škody, návrhy dôkazov, nahliadanie do spisu a účasť na pojednávaní; práva obete zahŕňajú aj špecializovanú pomoc a ochranu pred druhotnou viktimizáciou.",
    "Zúčastnená osoba nie je obvinený; jej práva sa viažu najmä k veciam zadržaným v konaní a k ochrane jej majetkového záujmu."
  ],

  literatura: [
    "TPP I. – Poškodený a obeť",
    "Zákon o obetiach trestných činov"
  ]
},
{
  id: "B8",
  section: "B",
  kod: "B8",
  nazov: "Procesné úkony a poskytovanie informácií v trestnom konaní",

  vysvetlenie: `
Procesné úkony sú konkrétne činnosti orgánov činných v trestnom konaní a súdu, ktorými sa spájajú vznik, zmena alebo zánik trestnoprávnych vzťahov; pri ich vykonávaní musia orgány zaobchádzať s účastníkmi tak, aby bol rešpektovaný ich zdravotný stav, dôstojnosť a ústavou zaručené práva. „Zápisnica je písomným osvedčením o priebehu procesného úkonu.“ Pri každom úkone zákon upravuje jeho obsah, formu, miesto a čas tak, aby forma úkonu zaručovala splnenie účelu konania; priebeh sa spravidla zapisuje do zápisnice, ktorá je dôležitá pre ďalšie dokazovanie a pre preskúmanie rozhodnutí v opravnom konaní. Procesné úkony sa vykonávajú v primeranom čase a mieste (zvyčajne v úradných miestnostiach medzi 7:00 a 20:00), výnimky sú prípustné len pri neodkladných alebo neopakovateľných úkonoch; ak je potrebné vykonať úkon mimo obvodu príslušného orgánu, vykoná sa dožiadanim príslušnému orgánu v tom obvode.

Z hľadiska záznamu a kontroly je dôležité, že hlavné pojednávanie, verejné a neverejné zasadnutie sa zaznamenávajú technickými prostriedkami; záznamy sa uchovávajú ako súčasť spisu a zápisnica sa vyhotovuje v slovenskom jazyku (prípadne s tlmočníkom, ak účastník jazyk neovláda). Pri poskytovaní informácií z trestného konania platí zásada ochrany vyšetrovania a súkromia: „Pri poskytovaní informácií orgány činné v trestnom konaní musia dbať na to (§ 6 ods. 1 a 2 TP), aby poskytnutím informácie nezmarili alebo neohrozili objasnenie a vyšetrenie veci (kriminalisticko‑taktické hľadisko).“ To znamená, že verejné informovanie musí byť vyvážené tak, aby neohrozilo priebeh vyšetrovania, neporušovalo prezumpciu neviny, nevyzradilo chránené osobné údaje a nezasahovalo do práv zraniteľných osôb.
`,

  priklad: `
Polícia dostane oznámenie o lúpeži, vykoná neodkladné úkony (zabezpečenie miesta činu, zadržanie podozrivého, zaistenie vecí) a každý úkon zdokumentuje zápisnicou; ak je potrebné vykonať domovú prehliadku alebo odpočúvanie, tieto úkony sa vykonajú len na základe zákonného titulu (súdneho povolenia alebo iného zákonného dôvodu) a s primeranými obmedzeniami, aby sa neporušili základné práva. Orgány zároveň informujú poškodeného o stave veci a oprávneným spôsobom poskytujú verejné informácie cez oznamovacie prostriedky, pričom vždy zvažujú kriminalisticko‑taktické hľadisko, ochranu osobných údajov a zásadu prezumpcie neviny.`,

  klucove_slova: [
    "Zápisnica",
    "Dožiadanie",
    "Primeranosť",
    "Ochrana informácií"
  ],

  zapamataj_si: [
    "Procesné úkony musia byť vykonané zákonne, v primeranom čase a mieste a vždy s rešpektom k dôstojnosti účastníkov.",
    "Zápisnica a technické záznamy sú kľúčové pre dokazovanie a pre kontrolu zákonnosti postupu; nesprávne vedené záznamy môžu oslabiť dôkaznú hodnotu úkonov.",
    "Informácie z trestného konania sa poskytujú len tak, aby neohrozili vyšetrovanie, neporušili prezumpciu neviny ani ochranu osobných údajov; pri pochybnostiach má prednosť ochrana vyšetrovania a zraniteľných osôb."
  ],

  literatura: [
    "TPP I. – Procesné úkony",
    "Komentár – všeobecné ustanovenia o úkonoch"
  ]
},
{
  id: "B9",
  section: "B",
  kod: "B9",
  nazov: "Zaistenie osôb na účely trestného konania",

  vysvetlenie: `
Zaistenie osôb slúži na zabezpečenie účasti relevantných osôb pri procesných úkonoch a na ochranu priebehu vyšetrovania. Zákon rozlišuje miernejšie donucovacie prostriedky (predvolanie, predvedenie, zabezpečenie svedka) a zásahy do osobnej slobody (zadržanie, príkaz na zatknutie, väzba, cezhraničné nástroje ako európsky alebo medzinárodný zatýkací rozkaz). Pri každom opatrení platí zásada zákonnosti, primeranosti a povinnosť poskytnúť dotknutej osobe procesné záruky (poučenie o právach, prístup k obhajcovi, tlmočník, informovanie blízkych pri vzatí do väzby).

Predvolanie je výzva orgánu alebo súdu, aby sa osoba v určenom čase a mieste dostavila na procesný úkon; musí obsahovať označenie orgánu, číslo veci, identifikáciu predvolávaného, miesto a čas úkonu a upozornenie na následky nedostavenia sa. Predvolanie sa doručuje písomne, v naliehavých prípadoch aj telefonicky alebo osobne.

Predvedenie je donucovacie opatrenie, ktorým sa zabezpečí prítomnosť osoby, ktorá sa na riadne predvolanie bez ospravedlnenia nedostavila; obvineného možno predviesť aj bez predchádzajúceho predvolania, ak je to nevyhnutné (skrýva sa, nemá trvalé bydlisko). Predvedenie vykonávajú príslušné policajné útvary a musí byť časovo obmedzené na nevyhnutný rozsah.

Zabezpečenie svedka je krátkodobé obmedzenie osobnej slobody svedka, ktorý sa bez ospravedlnenia nedostavil na súdne konanie a ktorého prítomnosť nemožno inak zabezpečiť; nariadi ho predseda senátu alebo iný príslušný sudca, trvanie je maximálne 72 hodín (24 hodín na predvedenie a 48 hodín na výsluch sudcom) a opatrenie sa vykonáva policajnými orgánmi.

Zadržanie je krátkodobé obmedzenie slobody osoby pristihnutej pri čine alebo osoby podozrivej s cieľom zabezpečiť dôkazy alebo rozhodnúť o ďalších opatreniach (napr. väzba). Zadržanie je účelovo obmedzené a musí byť vykonané v súlade so zákonom.

Príkaz na zatknutie sa vydáva, ak sú splnené dôvody na vzatie do väzby a nemožno zabezpečiť prítomnosť inými prostriedkami; príkaz vydáva sudca pre prípravné konanie na návrh prokurátora alebo predseda senátu v konaní pred súdom. Po zatknutí musí byť osoba predvedená pred súd a vypočutá v zákonných lehotách; súd rozhodne o vzatí do väzby alebo o prepustení.

Cezhraničné nástroje: medzinárodný zatýkací rozkaz umožňuje vyžiadať osobu z cudziny, ak sa vyhýba stíhaniu; európsky zatýkací rozkaz (EZR) slúži na zadržanie a vydanie osoby medzi členskými štátmi EÚ podľa pravidiel obojstrannej trestnosti alebo pri taxatívne vymedzených činoch. Postupy pri EZR sú prísne upravené vrátane lehot na rozhodnutie a predbežného vyšetrovania vykonávajúcim štátom.

Väzba je najzávažnejší zásah do osobnej slobody v trestnom konaní — obvinený je na základe rozhodnutia súdu dočasne zbavený slobody, aby sa zabezpečila jeho prítomnosť a ochrana vyšetrovania. Väzba sa odôvodňuje, ak sú splnené podmienky: dôvodné podozrenie zo spáchania trestného činu a jeden z dôvodov väzby (útek, kolúzia, pokračovanie v trestnej činnosti, nebezpečenstvo dokonania trestného činu). Pri trestných činoch terorizmu môže byť väzba nariadená aj pri nižšom stupni podozrenia podľa osobitného ustanovenia.

Väzbu možno nahradiť menej prísnymi opatreniami: záruka dôveryhodnej osoby alebo združenia, písomné sľuby, dohľad probačného úradníka, peňažná záruka alebo odovzdanie do dohledu iného členského štátu EÚ. Väzba môže byť opätovne nariadená, ak sa objavia nové dôvody (útok na svedkov, pokračovanie v trestnej činnosti a pod.). Trvanie väzby je limitované zákonom: základné lehoty a maximá závisia od povahy trestného stíhania (prečin, zločin, obzvlášť závažný zločin, terorizmus) a väzba musí trvať len nevyhnutnú dobu; o väzbe rozhoduje súd (v prípravnom konaní sudca pre prípravné konanie) a obvinený musí byť pred rozhodnutím vypočutý.

Procesné záruky pri všetkých opatreniach zahŕňajú poučenie o právach, právo na obhajcu, právo na tlmočníka, informovanie rodinných príslušníkov pri vzatí do väzby a možnosť podať opravné prostriedky proti rozhodnutiam o zaistení.`,

  priklad: `
Polícia zistí, že osoba bola pristihnutá pri vlámaní do bytu; okamžite ju zadrží, zaistí veci a prevedie na policajné oddelenie. Keďže podozrivý sa pokúsil utiecť a nemá trvalé bydlisko, prokurátor navrhne sudcovi vydanie príkazu na zatknutie a vzatie do väzby z dôvodu útekovej väzby. Sudca vydá príkaz, polícia vykoná zatknutie a do 24 až 72 hodín súd rozhodne o vzatí do väzby alebo o nahradení väzby primeraným opatrením (napr. peňažná záruka alebo dohľad probačného úradníka). Ak by sa podozrivý nachádzal v inom členskom štáte EÚ a vyhýbal sa stíhaniu, súd by mohol vydať európsky zatýkací rozkaz, ktorý by v inom štáte viedol k jeho zadržaniu a následnému vydaniu.`,

  klucove_slova: [
    "Predvolanie",
    "Predvedenie",
    "Zadržanie",
    "Väzba"
  ],

  zapamataj_si: [
    "Predvolanie je výzva; predvedenie a zabezpečenie svedka sú donucovacie opatrenia, ak sa osoba bez ospravedlnenia nedostaví.",
    "Zadržanie je krátkodobé a účelovo obmedzené; príkaz na zatknutie a väzba sú závažnejšie zásahy, ktoré môže nariadiť len súd za splnenia zákonných podmienok.",
    "Pri každom zaistení musia byť zachované procesné záruky: poučenie o právach, prístup k obhajcovi, tlmočník a primeranosť zásahu."
  ],

  literatura: [
    "TPP I. – Zaistenie osôb",
    "ESĽP – judikatúra k čl. 5 Dohovoru"
  ]
},
{
  id: "B10",
  section: "B",
  kod: "B10",
  nazov: "Zaistenie vecí pre účely trestného konania",

  vysvetlenie: `
Zaistenie vecí pre účely trestného konania zahŕňa všetky procesné úkony, ktorými orgány činné v trestnom konaní zabezpečujú predmety, dôkazy alebo majetkové hodnoty, ktoré sú nástrojom trestnej činnosti, výnosom z trestnej činnosti alebo sú potrebné na zabezpečenie nároku poškodeného. Klasické formy sú vydanie veci, odňatie veci, zaistenie počítačových údajov, zaistenie peňažných prostriedkov, zaknihovaných cenných papierov, nehnuteľností, majetkovej účasti, virtuálnej meny, inej majetkovej hodnoty, hmotných vecí alebo náhradnej hodnoty.

Do tejto kategórie neodmysliteľne patria aj prehliadky (osobná, domová, iných priestorov a pozemkov) a vstup do obydlia, ktoré predstavujú zásah do domovej a osobnej nedotknuteľnosti a sú prípustné len pri dôvodnom podozrení a spravidla na základe písomného a odôvodneného príkazu; výnimky sú možné v naliehavých prípadoch (osoba pristihnutá pri čine, neodkladný zásah na ochranu života alebo majetku). Pri vykonávaní prehliadok sa vždy vyžaduje predchádzajúca výzva na dobrovoľné vydanie veci, ak to situácia umožňuje, a vedenie zápisnice a technických záznamov podľa zákona.

Rovnako sem patrí sledovanie osôb a vecí (operatívne pátranie, technické sledovanie), ktoré možno vykonať len pri úmyselnom trestnom čine na základe písomného príkazu; príkaz určuje čas sledovania (max. šesť mesiacov s možnosťou predĺženia) a ak sa sledovanie začalo bez príkazu z naliehavých dôvodov, musí sa do 24 hodín dodatočne povoliť, inak sú získané informácie neprípustné. Pri všetkých úkonoch platia prísne procesné záruky: písomné odôvodnenie príkazu, poučenie dotknutých osôb o právach, záznamy o úkone, ochrana listového tajomstva a komunikácie (zvlášť komunikácie s obhajcom sú chránené) a možnosť podať sťažnosť proti rozhodnutiam o zaistení alebo vrátení vecí. Praktické prepojenie: pri zaistení digitálnych dôkazov (počítačové údaje, virtuálna mena) sa často kombinuje domová prehliadka (zabezpečenie zariadení), prevzatie a uchovanie dát (§ 91 TP) a súbežné sledovanie pohybu osôb alebo zásielok (kontrolovaná dodávka, predstieraný prevod) s cieľom získať kompletný dôkazný materiál bez toho, aby sa umožnil útek alebo zničenie dôkazov.`,

  priklad: `
Vyšetrovanie podvodu odhalí, že páchateľ ukrýva ukradnuté elektronické zariadenia v nebytových priestoroch a prevádza výnosy do kryptomenových peňaženiek. Prokurátor vydá písomné príkazy na: (1) domovú/prehliadku iných priestorov s opisom hľadaných vecí, (2) prevzatie a uchovanie počítačových údajov z nájdených serverov, (3) zaistenie peňažných prostriedkov na bankových účtoch a (4) zaistenie virtuálnej meny (blokácia peňaženiek alebo požiadanie o spoluprácu poskytovateľa). Súčasne súd na návrh vydá príkaz na sledovanie pohybu zásielok a osôb, aby sa zabránilo úteku a zničeniu dôkazov. Po vykonaní úkonov sú zaistené veci uložené do úschovy, zhotoví sa zápisnica a technické záznamy; ak sa preukáže, že ide o výnosy z trestnej činnosti, môžu byť použité na náhradu škody poškodeným, inak sa vrátia pôvodným vlastníkom.`,

  klucove_slova: [
    "Prehliadka",
    "Zaistenie digitálnych údajov",
    "Zaistenie majetku",
    "Sledovanie"
  ],

  zapamataj_si: [
    "Zaistenie vecí je účelové a viazané na zákon — príkazy musia byť písomné, odôvodnené a primerané účelu (dôkaz, zabezpečenie nároku poškodeného).",
    "Prehliadky a vstupy do priestorov sú závažný zásah do domovej a osobnej nedotknuteľnosti; pripúšťajú sa len pri dôvodnom podozrení a spravidla na základe príkazu, s výnimkami pre naliehavosť.",
    "Sledovanie bez dodatočného príkazu do 24 hodín zneprípustní získané informácie; pri každom úkone sa musia zachovať procesné záruky (zápisnice, poučenie, ochrana komunikácie s obhajcom)."
  ],

  literatura: [
    "TPP I. – Zaistenie vecí",
    "Komentár – domové prehliadky a odňatie veci"
  ]
},
{
  id: "B11",
  section: "B",
  kod: "B11",
  nazov: "Informačno-technické prostriedky v trestnom konaní",

  vysvetlenie: `
Informačno‑technické prostriedky sú utajené techniky používané v trestnom konaní na získanie dôkazov v podobe obrazových, zvukových alebo obrazovo‑zvukových záznamov, odpočúvania a údajov o telekomunikačnej prevádzke; slúžia na zistenie skutočností významných pre vyšetrovanie a majú charakter dôkazného prostriedku. Ich použitie je prísne regulované: príkaz na vyhotovovanie záznamov alebo na odpočúvanie musí byť písomný, odôvodnený a presne určiť osobu, zariadenie alebo účastnícku stanicu a dobu vykonávania; tieto prostriedky sú spravidla prípustné len pri závažných úmyselných trestných činoch (napríklad korupcia, terorizmus, tresty odňatia slobody s hornou hranicou nad tri roky alebo prípady viazané medzinárodnou zmluvou). Príkaz vydáva súd (sudca pre prípravné konanie alebo predseda senátu); v naliehavých prípadoch môže dočasne príkaz vydat prokurátor, avšak musí ho potvrdiť sudca do 24 hodín, inak stráca platnosť a získané informácie sa musia zničiť. Doba vykonávania je časovo obmedzená (zvyčajne maximálne šesť mesiacov s možnosťou predĺženia o dva mesiace opakovane). Záznamy medzi obvineným a jeho obhajcom sú zásadne neprípustné; ak sa pri odpočúvaní nezistia relevantné skutočnosti, záznamy sa bezodkladne zničia a o zničení sa vyhotoví zápisnica. Pri použití záznamu ako dôkazu sa vyhotoví doslovný prepis a splnia sa formálne požiadavky na jeho prílohu k spisu. Dotknutá osoba sa spravidla informuje o vykonaní záznamu do troch rokov od právoplatného skončenia konania, okrem výnimiek, kde by oznámenie ohrozilo účel konania. Príkazy na zistenie a oznámenie údajov o telekomunikačnej prevádzke (metadata) majú obdobné podmienky a vzťahujú sa aj na údaje prenášané počítačovými systémami.`,

  priklad: `
Vyšetrovateľ má podozrenie na rozsiahlu korupciu pri verejnom obstarávaní; súd vydá písomný príkaz na utajené vyhotovovanie obrazovo‑zvukových záznamov v priestoroch, kde sa majú konať stretnutia zainteresovaných osôb, a súčasne príkaz na odpočúvanie telefónnych liniek podozrivých osôb a na zistenie údajov o telekomunikačnej prevádzke, aby sa sledoval tok komunikácie a prevod finančných prostriedkov. Záznamy vyhotovuje špecializovaný útvar polície, k nim sa vyhotovujú doslovné prepisy; ak sa pri odpočúvaní nezistia relevantné skutočnosti, záznamy sa zničia a o tom sa vyhotoví zápisnica; ak sa preukáže trestná činnosť, záznamy sa použijú ako dôkaz v konaní.`,

  klucove_slova: [
    "Vyhotovovanie záznamov",
    "Odpočúvanie telekomunikácií",
    "Písomný príkaz",
    "Ochrana komunikácie s obhajcom"
  ],

  zapamataj_si: [
    "Informačno‑technické prostriedky sú silný zásah do súkromia a vyžadujú písomný, odôvodnený príkaz; bez neho sú získané záznamy neprípustné.",
    "Záznamy medzi obvineným a jeho obhajcom sú zásadne neprípustné; ak sa nezistia relevantné skutočnosti, záznamy sa musia zničiť.",
    "Doba vykonávania je limitovaná (zvyčajne 6 mesiacov) a v naliehavých prípadoch môže príkaz dočasne vydat prokurátor s následným potvrdením sudcom do 24 hodín."
  ],

  literatura: [
    "TPP I. – ITP",
    "Komentár – odpočúvanie a sledovanie"
  ]
},
{
  id: "B12",
  section: "B",
  kod: "B12",
  nazov: "Prostriedky operatívno-pátracej činnosti",

  vysvetlenie: `
Prostriedky operatívno‑pátracej činnosti sú súbor utajených a špecializovaných opatrení, ktorými polícia a ďalšie oprávnené orgány získavajú informácie potrebné na objasnenie trestnej činnosti, zistenie pohybu osôb alebo zásielok a zabezpečenie dôkazov. Medzi najčastejšie používané prostriedky patrí kontrolovaná dodávka (sledovanie a riadenie dovozu, vývozu alebo prepravy zásielky podozrivej z trestnej činnosti tak, aby sa zachytili všetky osoby a kanály zapojené do prevodu), sledovanie osôb a vecí (operatívne sledovanie pohybu a aktivít, často s využitím technických prostriedkov), predstieraný prevod a ďalšie taktické postupy. Tieto prostriedky sa vykonávajú utajene, spravidla na základe písomného príkazu oprávneného orgánu, a ich použitie je viazané na zákonné podmienky a časové limity; pri cezhraničných prípadoch sa koordinuje spolupráca s finančnými orgánmi a zahraničnými políciami.`,

  priklad: `
Vyšetrovateľ má podozrenie, že skupina organizuje dovoz falšovaného tovaru a súčasne prevádza výnosy cez viaceré medzinárodné zásielky. Na základe súdneho príkazu sa zrealizuje kontrolovaná dodávka: zásielka je sledovaná od miesta odoslania, polícia umožní jej prepravu pod dohľadom, zaznamená osoby, ktoré ju preberajú, a zároveň vykoná sledovanie osôb zapojených do prepravy. Ak sa potvrdí zapojenie ďalších osôb alebo finančných tokov, použijú sa ďalšie opatrenia (zaistenie dôkazov, zistenie údajov o telekomunikačnej prevádzke, spolupráca s finančnou správou). Všetky úkony sú dokumentované, získané dôkazy sa zabezpečia a neskôr použijú v trestnom konaní.`,

  klucove_slova: [
    "Kontrolovaná dodávka",
    "Sledovanie osôb a vecí",
    "Predstieraný prevod",
    "Operatívna spolupráca"
  ],

  zapamataj_si: [
    "Kontrolovaná dodávka je riadené sledovanie zásielky s cieľom odhaliť celý zločinecký reťazec.",
    "Sledovanie musí byť zákonné, časovo obmedzené a vykonávané oprávnenými útvarmi; získané informácie sa používajú len v súlade s procesnými zárukami.",
    "Pri cezhraničných prípadoch je kľúčová koordinácia s finančnými orgánmi a zahraničnými políciami, aby sa zabránilo úniku dôkazov a zabezpečilo vydanie alebo zadržanie osôb."
  ],

  literatura: [
    "TPP I. – OPČ",
    "Komentár – agent a predstieraný prevod"
  ]
},
{
  id: "B13",
  section: "B",
  kod: "B13",
  nazov: "Dokazovanie a dôkazné prostriedky",

  vysvetlenie: `
Dokazovanie je zákonom upravený postup orgánov činných v trestnom konaní a súdu, ktorým sa vyhľadávajú, zabezpečujú, vykonávajú a hodnotia poznatky potrebné na zistenie skutkového stavu a rozhodnutie o vine a treste; výsledkom dokazovania je obstaranie dôkazu v zákonom predpísanej forme. Ako dôkaz možno použiť čokoľvek, čo prispie k náležitému objasneniu veci a bolo získané zákonným spôsobom z dôkazných prostriedkov (výsluchy, obhliadka, znalecké posudky, listiny, veci, záznamy a pod.). Pri dokazovaní platia základné zásady: vyhľadávacia povinnosť orgánov, prezumpcia neviny, zásada ústnosti a bezprostrednosti, voľné hodnotenie dôkazov a snaha zistiť skutkový stav bez dôvodných pochybností. Zvlášť dôležité sú procesné záruky — dôkazy sa nesmú získavať násilím, donútením, hrozbou alebo nezákonným sľubom; takéto dôkazy sú neprípustné. Obvinený nemusí sám seba obviňovať (nemo tenetur se ipsum accusare) a nie je možné ho nútiť vypovedať proti sebe. `,

  priklad: `
V praxi to vyzerá takto: polícia vyšetrí vlámanie, zabezpečí miesto činu (obhliadka), zaistí veci ako nástroje trestnej činnosti, vypočuje svedkov a obvineného, požiada o znalecký posudok na určenie stôp a predloží listinné dôkazy o prevodoch peňazí; súd následne voľným hodnotením posúdi všetky zákonne získané dôkazy a rozhodne, či je skutok preukázaný bez dôvodných pochybností. Ak by sa však ukázalo, že časť dôkazov bola získaná mučením alebo nezákonným nátlakom, tieto dôkazy by boli vylúčené a nemohli by ovplyvniť rozhodnutie súdu.
`,

  klucove_slova: [
    "Predmet dôkazu",
    "Dôkazný prostriedok",
    "Prezumpcia neviny",
    "Neprípustnosť nezákonných dôkazov"
  ],

  zapamataj_si: [
    "Dokazovanie je systematické obstarávanie a hodnotenie poznatkov; výsledok musí umožniť rozhodnutie bez dôvodných pochybností.",
    "Dôkazy získané násilím, nátlakom alebo inak v rozpore so zákonom sú neprípustné; takéto postupy oslabujú proces a môžu viesť k neúčinnosti dôkazu.",
    "Obvinený nemusí vypovedať proti sebe a platí zásada voľného hodnotenia dôkazov — súd posudzuje všetky zákonne získané dôkazy komplexne."
  ],

  literatura: [
    "TPP I. – Dokazovanie",
    "Repetitórium – dôkazy"
  ]
},
{
  id: "B14",
  section: "B",
  kod: "B14",
  nazov: "Svedok v trestnom konaní",

  vysvetlenie: `
Svedok v trestnom konaní je osoba, ktorú orgány vyzvali, aby vypovedala o tom, čo vnímala svojimi zmyslami; má zákonom chránené práva (napr. odoprieť výpoveď, ochrana identity) a zároveň povinnosti (dostaviť sa, vypovedať pravdivo), pričom pri výsluchu platia procesné záruky a možnosť ochrany. 

Svedok je fyzická osoba odlišná od obvineného, ktorú orgán činný v trestnom konaní alebo súd vyzve, aby vypovedala o skutočnostiach, ktoré videla, počula alebo inak vnímala a ktoré sú dôležité pre objasnenie skutku. Pred výsluchom je orgán povinný svedka poučiť o jeho právach a povinnostiach; výsluch sa má viesť ohľaduplne, stručne a len do miery nevyhnutnej pre trestné konanie. Svedok je nezastupiteľný, pretože jeho výpoveď vychádza z priameho vnímania udalostí. 

Práva svedka zahŕňajú napríklad právo odoprieť výpoveď v prípadoch zákonom vymedzených vzťahov alebo ak by výpoveď ohrozila blízku osobu, právo žiadať utajenie totožnosti, právo nahliadnuť do vlastných poznámok a požadovať opravu zápisnice, nárok na náhradu preukázateľných nákladov a právo na tlmočníka, ak nerozumie jazyku konania. Orgán musí svedka informovať o trestnoprávnych následkoch krivej výpovede. 

Povinnosti svedka sú povinnosť dostaviť sa na predvolanie, vypovedať pravdivo a nič nezamlčať, zúčastniť sa konfrontácie alebo rekognície, poskytnúť hlasovú vzorku alebo rukopis, ak to situácia vyžaduje, a strpieť prehliadku tela či iné úkony, ktoré sú zákonom dovolené. Nedostavenie sa bez ospravedlnenia môže viesť k predvedeniu, poriadkovej pokute alebo zabezpečeniu svedka. 

Spolupracujúca osoba (korunný svedok) je páchateľ, ktorý významne prispieva k objasneniu závažných trestných činov a na základe formálnej dohody môže získať procesné výhody (odloženie obvinenia, prerušenie alebo zastavenie stíhania, podmienečné zastavenie) za prísnych materiálnych a formálnych podmienok; rozhodnutie o benefite robí prokurátor a všetko sa zaznamenáva písomne. `,

  priklad: `
 Svedok videl pri parku lúpež; polícia ho predvolá, poučí o právach (vrátane možnosti odoprieť výpoveď), zabezpečí mu ochranu identity, ak sa obáva odplaty, vyhotoví zápisnicu a umožní mu nahliadnuť do poznámok; ak by svedok dobrovoľne poskytol informácie vedúce k odhaleniu organizovanej skupiny, mohol by byť predmetom dohody o spolupráci s príslušnými benefitmi. `,

  klucove_slova: [
    "Svedok",
    "Práva a povinnosti",
    "Ochrana svedka",
    "Spolupracujúca osoba"
  ],

  zapamataj_si: [
    "Svedok musí vypovedať pravdivo, ale môže v zákonom stanovených prípadoch odoprieť výpoveď.",
    "Orgán je povinný svedka poučiť a zabezpečiť procesné záruky (zápisnica, možnosť opravy, ochrana). ",
    "Spolupráca páchateľa môže viesť k procesným benefitom, ale len pri splnení prísnych materiálnych a formálnych podmienok."
  ],

  literatura: [
    "TPP I. – Svedok",
    "Komentár – výsluch svedka"
  ]
},
{
  id: "B15",
  section: "B",
  kod: "B15",
  nazov: "Odborná činnosť a znalecká činnosť v trestnom konaní",

  vysvetlenie: `
Znalec poskytuje súdu alebo orgánu činnému v trestnom konaní odborné poznatky, ktoré presahujú bežné znalosti súdu; jeho posudok je samostatným dôkazným prostriedkom a musí byť vyhotovený písomne, objektívne a v súlade so zákonom. 

Znalecká činnosť v trestnom konaní slúži na získanie odborných skutkových poznatkov, ktoré sú nevyhnutné na objasnenie skutočností presahujúcich bežné právne alebo faktické poznanie súdu či vyšetrovateľa. Znalca alebo znaleckú organizáciu priberie orgán činný v trestnom konaní alebo súd, pričom prednosť má znalecká organizácia špecializovaná na daný odbor; ak takýto znalec nie je dostupný, možno v odôvodnených prípadoch prizvať aj inú odbornú osobu (tzv. znalec ad hoc), ktorá musí zložiť sľub a spĺňať zákonné predpoklady. 

Priebeh znaleckej činnosti zahŕňa oboznámenie znalca s úlohou a materiálom (štúdium spisu, prítomnosť pri úkonoch, kladenie otázok), vykonanie odborného skúmania a vypracovanie znaleckého posudku spravidla v písomnej forme. Posudok obsahuje úvod, nález, posudok samotný, záver a prílohy; je samostatným dôkazným prostriedkom, ktorého závery sú hodnotené súdom spolu s ostatnými dôkazmi, nie automaticky prijímané bez kritického posúdenia. 

Znalec má nezávislé postavenie: nesmie byť súčasťou procesných strán a nesie zodpovednosť za objektívnosť posudku; v zložitých prípadoch sa priberajú dvaja znalci (napr. pri pitve mŕtvoly alebo pri obzvlášť zložitých odborných otázkach). Odmena za posudok (znalečné) a náhrada účelne vynaložených nákladov sú upravené zákonom. 
`,

  priklad: `
Pri vyšetrovaní dopravnej nehody, kde je spor o rýchlosť a technický stav vozidla, súd pribral znalca z odboru dopravnej techniky. Znalec preskúmal vozidlo, analyzoval záznamy z palubnej jednotky, vykonal merania a vypracoval písomný znalecký posudok s nálezom a záverom o pravdepodobnej rýchlosti a technickej závade. Posudok bol priložený k spisu, znalec bol vypočutý na pojednávaní a súd jeho závery zohľadnil pri hodnotení viny.`,

  klucove_slova: [
    "Znalec",
    "Znalecký posudok",
    "Nezávislosť",
    "Znalečné"
  ],

  zapamataj_si: [
    "Znalecký posudok je samostatný dôkazný prostriedok; súd ho hodnotí spolu s ostatnými dôkazmi, nie mechanicky.",
    "Znalec musí byť odborník s potrebnou kvalifikáciou; ak nie je dostupný, možno prizvať znalca ad hoc za splnenia zákonných podmienok.",
    "Znalecká činnosť musí byť objektívna a zdokumentovaná (úvod, nález, posudok, záver, prílohy); znalec nesie zodpovednosť za pravdivosť a odbornosť posudku."
  ],

  literatura: [
    "TPP I. – Znalecká činnosť",
    "Zákon o znalcov a tlmočníkoch"
  ]
},
{
  id: "B16",
  section: "B",
  kod: "B16",
  nazov: "Rozhodnutia v trestnom konaní",

  vysvetlenie: `
Rozhodnutia v trestnom konaní sú individuálne právne akty orgánov činných v trestnom konaní a súdov, ktorými sa autoritatívne riešia otázky týkajúce sa skutku, obvineného, trestu alebo procesného postupu; majú zákonom určenú formu, obsah a účinky.

Rozhodnutia predstavujú jadro trestného konania, pretože určujú, ako sa bude v konaní pokračovať, aké úkony sa vykonajú a ako sa napokon rozhodne o vine a treste. Delia sa na rozhodnutia vo veci samej (meritórne), ktorými sa konanie končí – typicky rozsudok alebo trestný rozkaz – a na ostatné rozhodnutia, ktoré vytvárajú podmienky pre rozhodnutie vo veci samej (uznesenia, príkazy, opatrenia).

Najvýznamnejším rozhodnutím je rozsudok, ktorý súd vyhlasuje „v mene Slovenskej republiky“ a ktorým môže obvineného uznať vinným alebo ho oslobodiť; obsahuje výrok o vine, treste, náhrade škody, ochranných opatreniach, odôvodnenie a poučenie o opravnom prostriedku. Jednoduchšou formou je trestný rozkaz, ktorý sa vydáva bez hlavného pojednávania, ak je skutkový stav spoľahlivo preukázaný; obvinený môže podať odpor, čím sa trestný rozkaz zruší. Príkaz je rozhodnutie, proti ktorému spravidla nie je prípustný opravný prostriedok (napr. príkaz na domovú prehliadku, príkaz na odpočúvanie). Najčastejšou formou je uznesenie, ktorým sa rozhoduje o širokom okruhu otázok – od začatia trestného stíhania až po zastavenie konania; uznesenie musí obsahovať výrok, odôvodnenie a poučenie o sťažnosti.`,

  priklad: `
Polícia vyšetruje vlámanie do bytu. Prokurátor podá obžalobu a súd nariadi hlavné pojednávanie. Po vykonaní dôkazov súd vyhlási rozsudok, ktorým obžalovaného uzná vinným a uloží mu trest. Poškodenému prizná náhradu škody. Obžalovaný sa rozhodne podať odvolanie, o ktorom rozhodne odvolací súd uznesením. V priebehu konania boli vydané aj ďalšie rozhodnutia – napríklad príkaz na domovú prehliadku, uznesenie o vznesení obvinenia, či uznesenie o zamietnutí návrhu na doplnenie dokazovania. Každé z týchto rozhodnutí malo svoj procesný význam a posúvalo konanie dopredu.`,

  klucove_slova: [
    "Rozsudok",
    "Uznesenie",
    "Trestný rozkaz",
    "Príkaz"
  ],

  zapamataj_si: [
    "Rozsudok je jediná forma, ktorou možno vysloviť vinu obvineného; musí byť vyhlásený verejne a obsahovať všetky zákonné náležitosti.",
    "Uznesenie je najčastejšia forma rozhodnutia a môže riešiť aj zásadné otázky (napr. zastavenie trestného stíhania).",
    "Príkaz je rýchle rozhodnutie bez opravného prostriedku, používané najmä pri neodkladných úkonoch (prehliadky, odpočúvanie, odňatie veci)."
  ],

  literatura: [
    "TPP I. – Rozhodnutia",
    "Komentár – rozsudok a uznesenie"
  ]
},
{
  id: "B17",
  section: "B",
  kod: "B17",
  nazov: "Časti a štádiá trestného konania",

  vysvetlenie: `
Trestné konanie je zákonom upravený proces, ktorým sa zisťujú skutkové okolnosti, rozhoduje o vine a treste a vykonávajú sa súvisiace procesné úkony; v slovenskom systéme má kontinentálny charakter a prebieha v dvoch hlavných častiach, ktoré sa rozkladajú do šiestich štádií. Najprv prebieha postup pred začatím trestného stíhania, keď sa prijímajú trestné oznámenia a iné podnety, preveruje sa ich obsah a rozhoduje sa o ďalšom postupe. Nasleduje prípravné konanie, v ktorom orgány zhromažďujú dôkazy, zisťujú, či existuje odôvodnené podozrenie voči určitej osobe a či má prokurátor podať obžalobu alebo navrhnúť iné mimosúdne riešenie. Po ňom nasleduje preskúmanie obžaloby a predbežné prejednanie, kde sa kontroluje zákonnosť a dostatočnosť výsledkov prípravného konania a rozhoduje sa, či vec postúpiť na súd alebo vybaviť inak. Konanie pred súdom zahŕňa hlavné pojednávanie — verejné prerokovanie veci, vykonanie dôkazov a vydanie rozhodnutia o vine alebo nevine (rozsudok). Po vyhlásení rozsudku nasleduje odvolacie konanie, v ktorom sa preskúmava predchádzajúce konanie a rozhodnutie, a nakoniec vykonávacie konanie, ktoré zabezpečuje vykonanie právoplatného odsudzujúceho rozsudku (vykonanie trestu alebo ochranného opatrenia). Konanie môže skončiť v ktoromkoľvek štádiu (napr. zastavením, dohodou o vine a treste, trestným rozkazom) a nie vždy prejde všetkými fázami; v praxi sa často používajú aj odklony a mimosúdne riešenia, ktoré skrátením alebo zmenou postupu šetria čas a prostriedky.`,

  priklad: `
Polícia dostane oznámenie o podvode; v štádiu pred začatím trestného stíhania sa podnet preverí a začne prípravné konanie, počas ktorého sa zhromažďujú bankové výpisy a výpovede svedkov. Ak prokurátor uzná, že dôkazy stačia, podá obžalobu a súd vykoná predbežné prejednanie; na hlavnom pojednávaní súd vypočuje svedkov, predloží znalecký posudok a vyhlási rozsudok. Ak obvinený podá odvolanie, vec prejde do odvolacieho konania; po právoplatnom odsúdení nasleduje vykonanie trestu podľa vykonávacích pravidiel.`,

  klucove_slova: [
    "Prípravné konanie",
    "Hlavné pojednávanie",
    "Odvolacie konanie",
    "Vykonávacie konanie"
  ],

  zapamataj_si: [
    "Trestné konanie prebieha v etapách; každé štádium má odlišný cieľ — od preverenia podnetu cez zhromaždenie dôkazov až po rozhodnutie a vykonanie trestu.",
    "Konanie sa môže skončiť v ktoromkoľvek štádiu (zastavenie, dohoda, trestný rozkaz), preto nie je povinné prejsť všetkými fázami.",
    "Procesné záruky a právne formy rozhodnutí (rozsudok, uznesenie, príkaz, trestný rozkaz) sú viazané na konkrétne štádiá a určujú právne následky a opravné prostriedky."
  ],

  literatura: [
    "TPP I. – Štádiá konania",
    "Repetitórium – priebeh konania"
  ]
},
{
  id: "B18",
  section: "B",
  kod: "B18",
  nazov: "Predsúdne konanie",

  vysvetlenie: `
Predsúdne konanie zahŕňa postup pred začatím trestného stíhania a prípravné konanie; policajt aj prokurátor prijímajú a preverujú trestné oznámenia, vykonávajú neodkladné úkony a rozhodujú o začatí alebo odmietnutí trestného stíhania podľa zákonných lehot a pravidiel.

Vysvetlenie a príklad v súvislom texte
Predsúdne konanie je prvá časť trestného konania, ktorá sa skladá z postupu pred začatím trestného stíhania (prijímanie a preverovanie trestných oznámení) a prípravného konania (zhromažďovanie dôkazov až po rozhodnutie o obžalobe alebo inom spôsobe vybavenia veci). Orgány — predovšetkým policajt a prokurátor — sú pri tom viazané zákonnými formami podania (písomne, ústne do zápisnice, elektronicky) a povinnosťou poučiť oznamovateľa o zodpovednosti za nepravdivé údaje. Policajt pri prevzatí oznámenia vypočuje oznamovateľa, doplní podanie, vykoná neodkladné úkony (zaistenie dôkazov) a môže vypočuť osobu, proti ktorej sa podanie vzťahuje; táto osoba má právo odoprieť výpoveď a právo na obhajcu. Prokurátor môže oznámenie preskúmať, postúpiť ho inému orgánu, odložiť vec alebo nariadiť začatie trestného stíhania; v naliehavých prípadoch môže prokurátor nariadiť úkony, ktoré policajt vykoná pod jeho dozorom. Pri podaní, ktoré sa týka pôsobnosti Európskej prokuratúry alebo trestného činu spáchaného v inom členskom štáte, sa postupuje podľa medzinárodných pravidiel a príslušných kompetencií. Cieľom prípravného konania je získať dôkazy v potrebnom rozsahu a v primeraných lehotách (skrátené vyšetrovanie do 2–4 mesiacov, závažné prípady do 6 mesiacov) tak, aby prokurátor mohol rozhodnúť o podaní obžaloby, návrhu na dohodu o vine a treste alebo o inom opatrení. Ak sú splnené podmienky, prokurátor po skončení vyšetrovania rozhodne o postúpení veci, zastavení, podmienečnom zastavení, podaní obžaloby alebo návrhu na dohodu o vine a treste; policajt má obmedzené rozhodovacie kompetencie pri veciach, kde nebolo vznesené obvinenie. Tieto pravidlá sú upravené v Trestnom poriadku a v súvisiacich právnych predpisoch.`,

  priklad: `
Zamestnávateľ v banke zistí nezrovnalosti v účtovníctve a podá trestné oznámenie na políciu. Policajt pri prevzatí oznámenia vypočuje oznamovateľa, zabezpečí výpisy z účtov, zaistí počítačové servery a vykoná prvotnú obhliadku kancelárií. Na základe týchto úkonov prokurátor nariadi ďalšie vyšetrovanie — výsluchy zamestnancov, forenzné preskúmanie serverov a žiadosť o bankové výpisy od zahraničných bánk. Po zhromaždení dôkazov prokurátor rozhodne podať obžalobu voči konkrétnym osobám alebo navrhnúť dohodu o vine a treste, prípadne vec zastaví, ak sa preukáže, že skutok nie je trestným činom. Počas celého procesu sú vykonané úkony zdokumentované, dotknuté osoby sú poučené o právach a majú možnosť navrhnúť doplnenie dokazovania.`,

  klucove_slova: [
    "Trestné oznámenie",
    "Doplnenie podania",
    "Neodkladné úkony",
    "Rozhodnutie prokurátora"
  ],

  zapamataj_si: [
    "Oznamovateľ musí byť poučený o zodpovednosti za nepravdivé údaje; podanie možno urobiť viacerými formami a niektoré elektronické podania treba potvrdiť do 3 pracovných dní. ",
    "Policajt vykonáva prvotné preverenie a neodkladné úkony; prokurátor má dohľad a rozhodovaciu právomoc o ďalšom postupe vrátane začatia trestného stíhania.",
    "Prípravné konanie má fázy: začatie stíhania, vyšetrovanie (alebo skrátené vyšetrovanie) a rozhodnutie; lehoty na ukončenie sú zákonom viazané a dotknuté osoby majú právo nahliadnuť do spisu a navrhnúť doplnenie dokazovania."
  ],

  literatura: [
    "TPP I. – Predsúdne konanie",
    "Komentár – vyšetrovanie"
  ]
},
{
  id: "B19",
  section: "B",
  kod: "B19",
  nazov: "Rozhodnutia po skončení prípravného konania",

  vysvetlenie: `
Po skončení prípravného konania orgány rozhodnú, či sa začne alebo ďalej vedie trestné stíhanie proti určitej osobe a akým spôsobom sa vec ďalej vybaví. Trestné stíhanie sa začne vtedy, ak z podnetu alebo z výsledkov preverenia vyplýva dôvodné podozrenie, že bol spáchaný trestný čin, pričom musia byť splnené zákonné podmienky (existencia podnetu, jeho dostatočný opis alebo doplnenie a neprítomnosť dôvodov vylučujúcich postup podľa zákona). Začatie sa formálne zaznamená uznesením o začatí trestného stíhania alebo vykonaním neodkladného úkonu, po ktorom sa uznesenie vyhotoví.

Kto môže začať stíhanie závisí od povahy prípadu: poverený príslušník polície, vyšetrovatelia (polície alebo finančnej správy) alebo prokurátor; v naliehavých prípadoch policajt vykoná neodkladné úkony a do troch dní vec odovzdá príslušnému policajtovi. Odpis uznesenia sa doručí prokurátorovi do 48 hodín; oznamovateľ a poškodený sa o začatí stíhania len upovedomia.

Po skončení prípravného konania prokurátor (prípadne policajt v zákonom stanovených prípadoch) rozhodne o jednom z viacerých možných výsledkov: postúpenie veci (napr. na prejednanie ako priestupok), zastavenie trestného stíhania (obligatórne alebo fakultatívne dôvody), prerušenie stíhania (napr. neprítomnosť obvineného, vážna choroba), podanie obžaloby (ak sú dôkazy dostatočné), návrh na ochranné opatrenie, podmienečné zastavenie stíhania (pri splnení zákonných podmienok), schválenie zmieru alebo návrh na schválenie dohody o vine a treste. Niektoré rozhodnutia sú povinné (napr. zastavenie, ak sa preukáže, že skutok sa nestal), iné sú na uvážení orgánu (fakultatívne zastavenie, podmienečné zastavenie, dohoda o vine a treste).

Obsah uznesenia o začatí stíhania musí presne opisovať skutok, právnu kvalifikáciu a okolnosti, pri ktorých sa mal trestný čin stať; uznesenie sa zvyčajne neodôvodňuje, ale obsahuje poučenie o opravnom prostriedku. V ďalšom priebehu prípravného konania policajt koná samostatne a iniciatívne tak, aby čo najrýchlejšie a v potrebnom rozsahu objasnil všetky skutočnosti dôležité pre posúdenie prípadu.`,

  priklad: `
Účtovníčka v malej firme zistí, že z firemného účtu pravidelne odchádzajú neoprávnené platby. Podá trestné oznámenie na políciu. Policajt pri prevzatí oznámenia zabezpečí bankové výpisy, zaistí počítačové záznamy a vykoná prvotnú obhliadku kancelárie. Na základe zistení prokurátor vydá uznesenie o začatí trestného stíhania voči konkrétnej osobe a nariadi ďalšie vyšetrovanie (výsluchy, forenzné analýzy). Po doplnení dôkazov prokurátor rozhodne podať obžalobu, pretože dôkazy dostatočne odôvodňujú postavenie osoby pred súd; ak by sa však preukázalo, že skutok nespáchala, vec by bola zastavená.`,

  klucove_slova: [
    "Uznesenie o začatí trestného stíhania",
    "Postúpenie veci",
    "Zastavenie trestného stíhania",
    "Podanie obžaloby"
  ],

  zapamataj_si: [
    "Trestné stíhanie sa začína len pri splnení zákonných podmienok a formálne sa zaznamená uznesením; bez nich sa postup nezačne.",
    "Po skončení prípravného konania sú možné rôzne výsledky — od postúpenia alebo zastavenia až po podanie obžaloby alebo dohodu o vine a treste.",
    "Polícia vykonáva neodkladné úkony a prokurátor rozhoduje o ďalšom postupe; uznesenie o začatí sa doručí prokurátorovi a dotknuté osoby sa o ňom informujú."
  ],

  literatura: [
    "TPP I. – Rozhodnutia prokurátora",
    "Komentár – obžaloba"
  ]
},
{
  id: "B20",
  section: "B",
  kod: "B20",
  nazov: "Dozor a úkony prokurátora v predsúdnom konaní",

  vysvetlenie: `
Prokurátor v predsúdnom (predprípravnom a prípravnom) konaní plní dvojitú úlohu: dohliada na zákonnosť postupu orgánov činných v trestnom konaní a zároveň má vlastné rozhodovacie a iniciatívne právomoci pri riadení vyšetrovania. Jeho základnou povinnosťou je zabezpečiť, aby sa zistili všetky relevantné skutočnosti o trestnom čine a aby sa pri tom dodržiavali procesné záruky a zákonné lehoty. Prokurátor môže dávať policajtom záväzné pokyny, vyžadovať spisy a správy o stave konania, zúčastňovať sa na úkonoch polície, nariadiť vykonanie ďalších dôkazných úkonov alebo vrátiť vec na doplnenie vyšetrovania. Predkladá súdu návrhy na rozhodnutia, ktoré si vyžadujú súdny súhlas (napr. väzba, domová prehliadka, odpočúvanie), a sám rozhoduje o niektorých závažných úkonoch v rozsahu zákona (napr. exhumácia, zaistenie majetku, žiadosť o súhlas parlamentu pri stíhaní osôb s imunitou).

Prokurátor tiež rozhoduje o meritorických výsledkoch prípravného konania: môže podať obžalobu, navrhnúť súdu schválenie dohody o vine a treste, navrhnúť zastavenie alebo podmienečné zastavenie trestného stíhania, prípadne prerušenie stíhania. Pri dohode o vine a treste je prokurátor zodpovedný za to, aby výsledky vyšetrovania dostatočne odôvodňovali priznanie obvineného, aby bola zabezpečená náhrada škody poškodenému a aby dohoda obsahovala všetky zákonom požadované náležitosti; po uzavretí dohody podá prokurátor súdu návrh na jej schválenie spolu s kompletným spisom. Prokurátor je tiež povinný bezodkladne preskúmať sťažnosti na prieťahy alebo iné nedostatky v postupe polície a prijať opatrenia na ich odstránenie.`,

  priklad: `
V malom meste zistí účtovníčka mestského úradu neoprávnené prevody z účtu obce. Podá trestné oznámenie. Policajt pri prevzatí oznámenia zabezpečí bankové výpisy a zaistí počítačové servery; prokurátor, ktorý vykonáva dozor, si vyžiada spis, vydá záväzné pokyny na doplnenie forenzného skúmania, nariadi výsluchy viacerých zamestnancov a navrhne súdu zaistenie majetku podozrivého. Po zhromaždení dôkazov prokurátor posúdi, či sú podmienky na podanie obžaloby alebo na rokovanie o dohode o vine a treste. Ak obvinený prizná skutok a sú dôkazy potvrdzujúce priznanie, prokurátor môže s obvineným a jeho obhajcom dohodnúť podmienky trestu a náhrady škody a podať súdu návrh na schválenie dohody; ak dôkazy nepostačujú, prokurátor vec zastaví alebo vráti polícii na ďalšie vyšetrovanie.`,

  klucove_slova: [
    "Dozor nad zákonnosťou",
    "Záväzné pokyny",
    "Dohoda o vine a treste",
    "Rozhodnutia prokurátora"
  ],

  zapamataj_si: [
    "Prokurátor dohliada na zákonnosť a zároveň aktívne riadi vyšetrovanie — môže dávať záväzné pokyny, vyžadovať spisy a nariadiť ďalšie úkony.",
    "O výsledku prípravného konania rozhoduje prokurátor (obžaloba, zastavenie, dohoda o vine a treste, podmienečné zastavenie), pričom pri dohode musí zabezpečiť dôkazy a ochranu práv poškodeného.",
    "Prokurátor je povinný bezodkladne riešiť sťažnosti na prieťahy alebo nezákonné postupy polície a má právomoc zrušiť alebo nahradiť nezákonné rozhodnutia policajta."
  ],

  literatura: [
    "TPP I. – Dozor prokurátora",
    "Komentár – úkony prokurátora"
  ]
},
{
  id: "B21",
  section: "B",
  kod: "B21",
  nazov: "Preskúmanie obžaloby a predbežné prejednanie obžaloby",

  vysvetlenie: `
Obžaloba je písomné rozhodnutie prokurátora, ktorým sa končí prípravné konanie a začína súdne konanie; predseda senátu môže obžalobu predbežne prejednať (fakultatívne) a na jeho základe súd môže vec postúpiť, vrátiť, zastaviť alebo nariadiť hlavné pojednávanie. 

Obžaloba musí byť založená na vnútornom presvedčení prokurátora, že trestný čin sa stal a že obvinený je jeho páchateľ; obsahuje opis skutku, právnu kvalifikáciu, dôkazy a návrh na uloženie opatrení. Podaním obžaloby sa formálne končí prípravné konanie a vec prechádza na súd. 

Predbežné prejednanie obžaloby je fakultatívne štádium (§ 243 TP): predseda senátu preskúma obžalobu a spis a rozhodne, či nariadi hlavné pojednávanie alebo predbežné prejednanie. Predbežné prejednanie sa vykonáva najmä ak súd usudzuje, že vec možno vybaviť meritórnym rozhodnutím mimo hlavného pojednávania alebo ak je potrebné iné právne posúdenie skutku. Pri ňom súd skúma zákonnosť obžaloby a dôkazného materiálu a môže vypočuť obvineného či poškodeného. 

Možné rozhodnutia súdu pri predbežnom prejednaní zahŕňajú: postúpenie veci (inému súdu alebo orgánu), zastavenie trestného stíhania (obligatórne alebo fakultatívne dôvody), vrátenie veci prokurátorovi (napr. na došetrenie alebo pri návrhu dohody o vine a treste), odmietnutie obžaloby z procesných dôvodov alebo nariadenie hlavného pojednávania. Proti niektorým rozhodnutiam možno podať sťažnosť, ktorá má odkladný účinok.`,

  priklad: `
Mestský úrad podá obžalobu proti bývalému účtovníkovi za spreneveru. Predseda senátu po preskúmaní spisu usúdi, že je potrebné predbežné prejednanie, pretože chýbajú niektoré listinné dôkazy. Súd v rámci predbežného prejednania vráti vec prokurátorovi na doplnenie vyšetrovania; po doplnení dôkazov prokurátor obžalobu obnoví a súd nariadi hlavné pojednávanie. `,

  klucove_slova: [
    "Obžaloba",
    "Predbežné prejednanie",
    "Prijatie alebo vrátenie veci",
    "Meritórne rozhodnutie"
  ],

  zapamataj_si: [
    "Obžaloba končí prípravné konanie a musí byť podložená vnútorným presvedčením prokurátora a úplným spisom.",
    "Predbežné prejednanie je fakultatívne a je na uvážení predsedu senátu; jeho cieľom je rýchlo zistiť, či vec treba riešiť mimo hlavného pojednávania alebo ju postúpiť ďalej.",
    "Súd pri predbežnom prejednaní môže obžalobu prijať, vrátiť, odmietnuť alebo zastaviť stíhanie; proti rozhodnutiam sú opravné prostriedky, ktoré môžu mať odkladný účinok."
  ],

  literatura: [
    "TPP II. – Obžaloba",
    "Komentár – predbežné prejednanie"
  ]
},
{
  id: "B22",
  section: "B",
  kod: "B22",
  nazov: "Hlavné pojednávanie",

  vysvetlenie: `
Hlavné pojednávanie je rozhodujúce štádium trestného konania, v ktorom sa na základe vykonaných dôkazov verejne a formálne rozhoduje o vine alebo nevine obžalovaného a prípadne o treste, ochrannom opatrení a náhrade škody. Predpokladom riadneho pojednávania je starostlivá príprava súdu, strán a účastníkov; priebeh pojednávania je upravený zákonom a má presne stanovené fázy — otvorenie, dokazovanie, záverečné reči, posledné slovo obžalovaného a rozhodnutie. Počas dokazovania sa vykonávajú výsluchy obžalovaného a svedkov, predkladá sa znalecký posudok, prehliadajú sa vecné dôkazy a strany navrhujú doplnenie dokazovania. Súd po skončení dokazovania rozhodne formou rozsudku alebo uznesenia (odsudzujúci alebo oslobodzujúci rozsudok, prípadne uznesenie o zastavení či vrátení veci prokurátorovi). Hlavné pojednávanie sa vykonáva verejne, má obradnejší charakter a jeho priebeh zabezpečuje práva obvineného aj procesné záruky pre poškodeného a ďalšie zúčastnené osoby.`,

  priklad: `
V prípade dopravnej nehody, pri ktorej došlo k ťažkému zraneniu, prokurátor podá obžalobu na vodiča. Na hlavnom pojednávaní predseda senátu otvorí konanie, prečíta obžalobu a overí prítomnosť strán. Súd vypočuje znalca z odboru dopravnej techniky, ktorý predloží znalecký posudok o rýchlosti a technickom stave vozidla, vypočuje svedkov, vykoná konfrontácie a umožní obhajcovi predložiť dôkazy. Po skončení dokazovania prednesú svoje záverečné reči prokurátor a obhajca, obvinený využije posledné slovo a súd následne vyhlási rozsudok — napríklad odsudzujúci rozsudok s uložením trestu a príkazom na náhradu škody poškodenej osobe.`,

  klucove_slova: [
    "Otvorenie pojednávania",
    "Dokazovanie",
    "Záverečné reči",
    "Rozsudok"
  ],

  zapamataj_si: [
    "Hlavné pojednávanie je verejné a formálne štádium, kde sa rozhoduje o vine alebo nevine; jeho priebeh je prísne upravený zákonom.",
    "Dokazovanie na pojednávaní zahŕňa výsluchy, znalecké posudky a predkladanie vecných dôkazov; súd hodnotí všetky zákonne získané dôkazy.",
    "Po dokazovaní nasledujú záverečné reči, posledné slovo obžalovaného a potom rozhodnutie súdu formou rozsudku alebo uznesenia."
  ],

  literatura: [
    "TPP II. – Hlavné pojednávanie",
    "Repetitórium – priebeh pojednávania"
  ]
},
{
  id: "B23",
  section: "B",
  kod: "B23",
  nazov: "Meritórne rozhodnutia súdu na hlavnom pojednávaní",

  vysvetlenie: `
Meritórne rozhodnutia súdu na hlavnom pojednávaní rozhodujú o vine alebo nevine obžalovaného a o následných právnych následkoch; súd môže vydať odsudzujúci alebo oslobodzujúci rozsudok alebo rôzne uznesenia (zastavenie, vrátenie veci, postúpenie), vždy len k skutku uvedenému v obžalobe.

Meritórne rozhodnutie je výsledkom hodnotenia všetkých zákonne vykonaných dôkazov na hlavnom pojednávaní. Súd môže rozhodovať len o skutku a osobe uvedenej v obžalobe, hoci nie je viazaný právnym posúdením, ktoré navrhol prokurátor (§ 278 TP). Hlavné formy meritórnych rozhodnutí sú odsudzujúci rozsudok (s výrokmi o vine a treste) a oslobodzujúci rozsudok. Okrem toho súd môže prijať uznesenia, ktoré majú meritórny charakter — napr. uznesenie o zastavení trestného stíhania, o podmienečnom zastavení, o schválení zmieru, o vrátení veci prokurátorovi alebo o postúpení veci inému orgánu.

Dôležitý princíp: ak sa počas hlavného pojednávania objavia okolnosti odôvodňujúce zastavenie alebo iné meritórne rozhodnutie, súd môže rozhodnúť aj mimo verejného pojednávania (na neverejnom zasadnutí), pokiaľ to zákon umožňuje (§ 290 TP).`,

  priklad: `
V prípade obžaloby za spreneveru súd po vykonaní dokazovania zistí, že dôkazy preukázali vinu obžalovaného — vyhlási odsudzujúci rozsudok a uloží trest a povinnosť nahradiť škodu. Ak by sa však počas pojednávania preukázalo, že skutok nespĺňa znaky trestného činu, súd môže vydať uznesenie o postúpení veci príslušnému orgánu (napr. na riešenie ako priestupok) alebo uznesenie o zastavení stíhania, ak nastal zákonný dôvod.`,

  klucove_slova: [
    "Odsudzujúci rozsudok",
    "Oslobodzujúci rozsudok",
    "Uznesenie o zastavení",
    "Vrátenie veci prokurátorovi"
  ],

  zapamataj_si: [
    "Súd môže rozhodovať len o skutku a osobe uvedenej v obžalobe; právne posúdenie obžaloby ho však viazať nemusí.",
    "Meritórne rozhodnutia zahŕňajú nielen rozsudky, ale aj uznesenia (zastavenie, podmienečné zastavenie, schválenie zmieru, vrátenie veci).",
    "Ak sa počas hlavného pojednávania objavia nové skutočnosti odôvodňujúce iné riešenie, súd môže konať aj mimo verejného pojednávania a rozhodnúť o zastavení alebo vrátení veci prokurátorovi."
  ],

  literatura: [
    "TPP II. – Rozsudok",
    "Komentár – meritórne rozhodnutia"
  ]
},
{
  id: "B24",
  section: "B",
  kod: "B24",
  nazov: "Verejné a neverejné zasadnutie súdu",

  vysvetlenie: `
Verejné a neverejné zasadnutie sú formy súdneho rozhodovania mimo hlavného pojednávania, ktoré sa líšia stupňom verejnosti, závažnosťou rozhodovaných otázok a potrebou ústneho dokazovania. Verejné zasadnutie sa koná tam, kde zákon výslovne požaduje verejnosť alebo keď ide o otázky blízke meritu veci (napr. schválenie dohody o vine a treste, rozhodovanie o ochranných opatreniach alebo o niektorých opravách prostriedkoch); jeho cieľom je transparentnosť a zabezpečenie procesných záruk. Neverejné zasadnutie slúži na rýchle a efektívne rozhodovanie v prípadoch, kde nie je potrebné ústne dokazovanie ani prítomnosť verejnosti (napr. predbežné prejednanie obžaloby, sťažnosti, záležitosti výkonu trestu, započítanie väzby). Pri neverejnom zasadnutí sa rozhoduje spravidla písomne alebo na neverejnom zasadnutí, priebeh je administratívnejší a samosudca ho nevykonáva; obidve formy musia rešpektovať zákonné postupy a práva účastníkov.`,

  priklad: `
Mestský úrad a prokurátor uzavrú dohodu s obvineným v prípade sprenevery, ktorú je potrebné verejne posúdiť; súd preto zvolá verejné zasadnutie, kde sa prítomným stranám umožní predložiť stanoviská a verejne rozhodnúť o schválení dohody a o náhrade škody. Naopak, ak ide len o sťažnosť obvineného proti rozhodnutiu o započítaní väzby do trestu, súd rozhodne na neverejnom zasadnutí, pretože nie je potrebné ústne dokazovanie ani prítomnosť verejnosti.`,

  klucove_slova: [
    "Verejnosť",
    "Neverejnosť",
    "Transparentnosť",
    "Procesné záruky"
  ],

  zapamataj_si: [
    "Verejné zasadnutie sa používa pri otázkach vysokého významu a zabezpečuje verejnú kontrolu; neverejné pri technických alebo interných rozhodnutiach.",
    "Pri verejnom zasadnutí môže byť potrebné ústne dokazovanie; pri neverejnom sa rozhoduje bez ústneho dokazovania strán.",
    "Zákon určuje, kedy má byť zasadnutie verejné; ak to zákon neustanovuje a povaha veci to dovoľuje, súd rozhodne neverejne."
  ],

  literatura: [
    "TPP II. – Zasadnutia súdu",
    "Komentár – neverejné zasadnutia"
  ]
},
{
  id: "B25",
  section: "B",
  kod: "B25",
  nazov: "Riadne opravné prostriedky",

  vysvetlenie: `
Opravné konanie je štádium trestného procesu, ktorého cieľom je preskúmať rozhodnutie orgánu činného v trestnom konaní alebo súdu a v prípade jeho nesprávnosti ho napraviť. Začína sa podaním opravného prostriedku — procesného úkonu oprávnenej osoby, ktorá žiada preskúmanie rozhodnutia z dôvodov v zákone (skutkové, právne alebo procesné vady). Riadne opravné prostriedky sú také, ktoré možno uplatniť skôr, než napadnuté rozhodnutie nadobudne právoplatnosť; medzi ne patria odvolanie, stažnosť a odpor. V opravnom konaní platia zásady revízneho, kasačného a apelačného princípu: odvolací orgán spravidla preskúma len napadnuté výroky a postup konania vo vzťahu k nim (revízny princíp), môže chybný výrok zrušiť a vrátiť vec na nové rozhodnutie (kasačný princíp) alebo chybu sám napraviť a vyniesť nové rozhodnutie (apelačný princíp). Podanie opravného prostriedku zvyčajne prenáša rozhodovanie na iný, nadriadený orgán (devolutívny účinok), pričom v prípadoch, kde to zákon prizná, má opravný prostriedok odkladný účinok. Zásada zákazu reformationis in peius chráni obvineného pred zhoršením postavenia v dôsledku odvolania podaného v jeho prospech; princíp beneficium cohaesionis zabezpečuje, že rozhodnutie v prospech iných osôb sa vydá aj bez ich vlastného odvolania.`,

  priklad: `
Súd prvého stupňa odsúdi podnikateľa za spreneveru. Podnikateľ podá odvolanie proti odsudzujúcemu výroku s poukazom na nové listinné dôkazy a procesné pochybenia pri dokazovaní. Odvolací súd preskúma len napadnuté výroky a postup konania vo vzťahu k nim; ak zistí, že rozsudok obsahuje skutkové alebo procesné chyby, môže rozsudok zrušiť a vec vrátiť na nové prejednanie, alebo chyby sám napraviť a vyniesť nové rozhodnutie. Ak by išlo o trestný rozkaz, obvinený by podal odpor, ktorý by viedol k nariadeniu hlavného pojednávania.`,

  klucove_slova: [
    "Odvolanie",
    "Stažnosť",
    "Odpor",
    "Revizný princíp"
  ],

  zapamataj_si: [
    "Opravné konanie začína podaním opravného prostriedku; riadne opravné prostriedky možno uplatniť pred právoplatnosťou rozhodnutia.",
    "Odvolací orgán spravidla preskúma len napadnuté výroky; môže rozhodnutie zrušiť a vrátiť ho na nové prejednanie alebo chybu sám napraviť.",
    "Zákaz reformationis in peius a beneficium cohaesionis chránia obvineného a ďalšie osoby pred zhoršením ich postavenia pri opravnom konaní."
  ],

  literatura: [
    "TPP II. – Odvolanie",
    "Komentár – sťažnosť"
  ]
},
{
  id: "B26",
  section: "B",
  kod: "B26",
  nazov: "Mimoriadne opravné prostriedky",

  vysvetlenie: `
Mimoriadne opravné prostriedky sú právne prostriedky, ktoré možno uplatniť až po nadobudnutí právoplatnosti rozhodnutia s cieľom napraviť závažné chyby, ktoré sa prejavili až po skončení riadneho opravného konania. Patria sem zrušenie právoplatných rozhodnutí v prípravnom konaní, obnova konania a dovolanie. Ich účelom je napraviť porušenia zákona, nové alebo dodatočne zistené skutočnosti či dôkazy, alebo právne vady, ktoré by inak znemožnili spravodlivé rozhodnutie. Mimoriadny prostriedok možno podať len v zákonom stanovených lehotách a osobami, ktoré zákon oprávňuje; rozhodovanie o týchto prostriedkoch vykonávajú špecifické orgány (napr. generálny prokurátor pri zrušení rozhodnutí v prípravnom konaní, Najvyšší súd pri dovolaniach). Po povolení mimoriadneho prostriedku môže nasledovať nové prejednanie veci alebo iné opatrenia, ktoré sú viazané právnym názorom orgánu, ktorý mimoriadny prostriedok povolil.`,

  priklad: `
Po právoplatnom odsudzujúcom rozsudku v kauze podvodu sa objavia nové bankové záznamy, ktoré preukazujú, že obvinený nemal priamy prístup k účtom, z ktorých boli vykonané sporné prevody. Obvinený alebo prokurátor podá návrh na obnovu konania na základe dodatočne zistených dôkazov; ak súd obnovu povolí, konanie sa obnoví a rozhodne sa nanovo s prihliadnutím na nové dôkazy, čo môže viesť k zrušeniu pôvodného rozsudku a k oslobodeniu alebo inému rozhodnutiu.`,

  klucove_slova: [
    "Obnova konania",
    "Dovolanie",
    "Zrušenie rozhodnutí v prípravnom konaní",
    "Právoplatnosť"
  ],

  zapamataj_si: [
    "Mimoriadne opravné prostriedky sa uplatňujú až po právoplatnosti rozhodnutia a slúžia na nápravu závažných právnych alebo skutkových chýb.",
    "Každý druh mimoriadneho prostriedku má presne vymedzené podmienky, lehoty a oprávnené osoby; ich nesplnenie vedie k zamietnutiu návrhu.",
    "Povolenie mimoriadneho prostriedku môže viesť k novému prejednaniu alebo k zrušeniu rozhodnutia; orgán, ktorý ho povolí, určuje ďalší postup a jeho právny názor je záväzný pre vykonanie nariadených úkonov."
  ],

  literatura: [
    "TPP II. – Mimoriadne opravné prostriedky",
    "Komentár – dovolanie"
  ]
},
{
  id: "B27",
  section: "B",
  kod: "B27",
  nazov: "Osobitné spôsoby konania",

  vysvetlenie: `
Osobitné spôsoby konania sú odchýlky od všeobecného postupu trestného konania, ktoré sa používajú tam, kde by postup podľa všeobecných ustanovení nebol účelný a kde je potrebné efektívnejšie dosiahnuť cieľ konania. „Osobitné spôsoby konania predstavujú niektoré odchylky od všeobecného spôsobu práva trestného konania v prípadoch, keď by postup podľa všeobecných ustanovení bol na úkor cieľa, ktorý sa má v trestnom konaní dosiahnuť, a zároveň umožňujú tzv. odklony od procesne náročného hlavného pojednávania s cieľom efektívnejšie dosiahnuť cieľ trestného konania.“ Tento súbor inštitútov (konanie proti mladistvému, konanie proti ušlému, podmienečné zastavenie stíhania, zmier, dohoda o vine a treste, konanie pred sudcom pre prípravné konanie, konanie pred samosudcom a ďalšie) upravuje špecifické pravidlá, lehoty a účinky tak, aby sa zohľadnili osobitné okolnosti prípadu (napr. vek páchateľa, jeho spolupráca, naliehavosť dokazovania alebo verejný záujem). „Mladistvým je osoba, ktorá v čase spáchania trestného činu dovŕšila štrnásty rok a neprekročila osemnásty rok svojho veku.“ Pri každom osobitnom spôsobe konania zákon stanovuje podmienky jeho použitia, procesné záruky (napr. povinnosť obhajcu pri mladistvých, prítomnosť prokurátora pri verejnom zasadnutí o vine a treste, alebo obmedzené možnosti väzby) a následky rozhodnutí (napr. zastavenie stíhania, schválenie dohody, možnosť obnovy konania).`,

  priklad: `
Mladý človek (17 rokov) sa dopustí krádeže v obchode. Namiesto bežného hlavného pojednávania sa uplatní konanie proti mladistvému: súd zabezpečí prítomnosť orgánu sociálno‑právnej ochrany, mladistvý má od vznesenia obvinenia obhajcu, posúdi sa jeho rozumový a mravný vývoj a súd môže rozhodnúť s prihliadnutím na výchovné a resocializačné opatrenia namiesto prísneho trestu. Ak by sa preukázalo, že mladistvý spolupracoval pri objasnení závažnejšieho trestného činu, mohla by sa zvážiť aj možnosť podmienečného zastavenia trestného stíhania spolupracujúceho obvineného s dlhšou skúšobnou dobou, pričom jeho definitívne zastavenie by záviselo od plnenia podmienok spolupráce.`,

  klucove_slova: [
    "Odklony",
    "Mladistvý",
    "Dohoda o vine a treste",
    "Podmienečné zastavenie"
  ],

  zapamataj_si: [
    "Osobitné spôsoby konania sú výnimky od bežného postupu a používajú sa len pri splnení zákonných podmienok; ich cieľom je efektívnejšie a primeranejšie dosiahnuť cieľ trestného konania.",
    "Pri mladistvých a pri spolupracujúcich obvinených platia prísne procesné záruky (povinný obhajca, posúdenie vývoja, dlhšia skúšobná doba pri spolupráci), ktoré majú chrániť osobitný záujem na výchove a spravodlivosti.",
    "Dohoda o vine a treste a zmier sú nástroje, ktoré môžu viesť k zastaveniu stíhania alebo k rýchlejšiemu ukončeniu veci, avšak ich schválenie podlieha súdnemu alebo prokurátorskému preskúmaniu a musí byť primerané závažnosti činu a okolnostiam prípadu."
  ],

  literatura: [
    "TPP II. – Osobitné konania",
    "Komentár – dohoda o vine a treste"
  ]
},
{
  id: "B28",
  section: "B",
  kod: "B28",
  nazov: "Probácia a mediácia v trestnom konaní",

  vysvetlenie: `
Probácia v trestnom konaní je inštitucionalizovaný dohľad nad správaním páchateľa spojený s pomocou smerujúcou k jeho resocializácii; zahŕňa organizovanie a vykonávanie probačných programov, kontrolu plnenia uložených povinností a obmedzení, dohľad nad trestami alebo opatreniami s probačným alebo ochranným dohľadom, zabezpečenie predbežného šetrenia, organizovanie povinnej práce a domáceho väzenia, použitie technických prostriedkov na posilnenie dohľadu, pomoc poškodenému pri opatreniach na ochranu (napr. zákaz približovania) a podporu obvineného pri dodržiavaní podmienok uložených rozhodnutím súdu alebo prokurátora. Mediácia je mimosúdne sprostredkovanie medzi poškodeným a obvineným s cieľom urovnať konflikt; vykonáva sa len so súhlasom oboch strán a často sa využíva pri inštitútoch ako podmienečné zastavenie stíhania, zmier alebo dohoda o vine a treste. Výkon probácie a mediácie zabezpečujú probační a mediační úradníci, ktorí sú pracovníkmi súdu, majú právo vykonávať úkony na pokyn súdu alebo prokurátora, získavať relevantné informácie, žiadať súčinnosť štátnych orgánov a pomáhať pri príprave návrhov na rozhodnutia, pričom sú viazaní mlčanlivosťou a povinnosťou chrániť ľudské práva a dôstojnosť.`,

  priklad: `
Po krádeži v susedstve sa obvinený dohodne s poškodeným na náhrade škody a na účasti v probačnom programe zameranom na prevenciu recidívy; probačný úradník mu pomôže zabezpečiť zamestnanie, koordinuje povinné poradenstvo a sleduje plnenie podmienok, zatiaľ čo poškodenému pomôže pri uplatnení nároku na náhradu a pri opatreniach na jeho ochranu. Ak by sa strany rozhodli riešiť spor mimosúdnou cestou, mediačný úradník by sprostredkoval rozhovor, pomohol vyjasniť nároky a dospieť k dohode, ktorú následne zohľadní prokurátor pri rozhodovaní o podmienečnom zastavení stíhania alebo o zmieri.`,

  klucove_slova: [
    "Probácia",
    "Mediácia",
    "Probačný úradník",
    "Resocializácia"
  ],

  zapamataj_si: [
    "Probácia je dohľad spojený s pomocou a programami na resocializáciu páchateľa; jej cieľom je znížiť recidívu a podporiť návrat do spoločnosti.",
    "Mediácia je dobrovoľné mimosúdne riešenie sporu medzi poškodeným a obvineným; vyžaduje súhlas oboch strán a často uľahčuje mimosúdne ukončenie veci.",
    "Probační a mediační úradníci sú súdnymi pracovníkmi s právom vykonávať úkony na pokyn súdu alebo prokurátora, pričom musia zachovávať mlčanlivosť a chrániť práva zúčastnených osôb."
  ],

  literatura: [
    "TPP II. – Probácia a mediácia",
    "Zákon o probácii a mediácii"
  ]
},
{
  id: "B29",
  section: "B",
  kod: "B29",
  nazov: "Právny styk s cudzinou",

  vysvetlenie: `
Právny styk s cudzinou upravuje postup orgánov činných v trestnom konaní a súdov v prípadoch, keď medzinárodné zmluvy, ktorými je Slovenská republika viazaná, neustanovujú iný postup. „Právny styk s cudzinou je špecifický druh konania upravený v piatej časti Trestného poriadku predstavujúci zákonný podklad pre postup orgánov činných v trestnom konaní a súdov v prípadoch, ak medzinárodné zmluvy, ktorými je Slovenská republika viazaná, neustanovujú iný postup.“ Základné princípy sú subsidiarita (uplatní sa TP len ak zmluva neustanoví inak) a princíp reciprocity — bez zmluvy sa žiadosť cudzieho štátu vybaví len pri záruke vzájomnosti. Úprava pokrýva viaceré oblasti medzinárodnej justičnej spolupráce: vydávanie osôb (extradícia — vyžiadanie z cudziny a vydanie do cudziny), uznávanie a výkon cudzích rozhodnutí, prevzatie a odovzdanie trestnej veci, rôzne formy právnej pomoci (dožiadania, cezhraničné sledovanie, dočasné odovzdanie osôb na vykonanie úkonov, zaistenie vecí a finančných prostriedkov, prístup k informáciám z registra trestov) a špecifické postupy vo vzťahu k medzinárodným trestným súdom. „Základné zásady — subsidiarita (§ 478) — ustanovenia Trestného poriadku sa použijú len vtedy, ak medzinárodná zmluva neustanovuje inak; reciprocita (§ 479) — ak neexistuje medzinárodná zmluva, príslušné orgány budú konať o žiadosti o justičnú spoluprácu v trestných veciach, ak dožadujúci štát zaručí, že vyhovie porovnateľnej žiadosti slovenského orgánu.“ Pri každom konkrétnom kroku sa postupuje podľa medzinárodných zmlúv (Európsky dohovor o vydávaní, dohovor o vzájomnej pomoci a ďalšie) alebo, ak zmluva chýba, podľa pravidiel Trestného poriadku s dôrazom na ochranu záujmov SR a na zásady vzájomnosti.`,

  priklad: `
Slovenská polícia zistí, že osoba podozrivá z rozsiahleho podvodu sa ukrýva v inom štáte. Ak existuje medzinárodná zmluva medzi SR a týmto štátom, slovenské orgány podajú žiadosť o vydanie (extradíciu) podľa príslušného dohovoru; ak zmluva neexistuje, postupuje sa podľa pravidla reciprocity — žiadosť sa vybaví len vtedy, ak dožadujúci štát zaručí, že vyhovie porovnateľnej žiadosti Slovenska. V praxi to znamená, že prokurátor a ministerstvo spravodlivosti pripravia podklady, zašlú oficiálne dožiadanie cez diplomatické kanály alebo cez medzinárodné justičné kontakty, a následne sa podľa odpovede cudzieho štátu rozhodne o ďalších krokoch (prevzatí osoby, vykonaní úkonov v cudzine, prípadne dočasnom odovzdaní osoby na vykonanie úkonov).
`,

  klucove_slova: [
    "Extradícia",
    "Právna pomoc",
    "Reciprocita",
    "Uznanie a výkon rozhodnutí"
  ],

  zapamataj_si: [
    "Právny styk s cudzinou sa riadi predovšetkým medzinárodnými zmluvami; Trestný poriadok sa použije subsidiárne len tam, kde zmluva neustanoví inak.",
    "Bez zmluvy platí princíp reciprocity — žiadosť cudzieho štátu sa vybaví len pri záruke vzájomnosti.",
    "Formy spolupráce sú rôznorodé — od vydávania osôb cez dožiadania a cezhraničné sledovanie až po zaistenie majetku a prevzatie výkonu trestu; každý úkon má presne stanovený postup a kompetencie."
  ],

  literatura: [
    "TPP II. – Právny styk s cudzinou",
    "Zákon o justičnej spolupráci"
  ]
},
{
  id: "B30",
  section: "B",
  kod: "B30",
  nazov: "Spolupráca v trestných veciach medzi štátmi Európskej únie",

  vysvetlenie: `
Právny styk a spolupráca medzi štátmi EÚ v trestných veciach sú založené na zásade vzájomného uznávania rozhodnutí a na princípoch lojálnej spolupráce, subsidiarity a proporcionality; konkrétne nástroje zahŕňajú európsky zatýkací rozkaz, európsky vyšetrovací príkaz, vzájomné uznávanie trestných rozhodnutí a ďalšie formy justičnej pomoci.

Právny styk s cudzinou v slovenskom Trestnom poriadku poskytuje právny rámec pre postup orgánov pri medzinárodnej justičnej spolupráci, ak medzinárodné zmluvy neustanovujú inak. Právny styk s cudzinou je špecifický druh konania upravený v piatej časti Trestného poriadku predstavujúci zákonný podklad pre postup orgánov činných v trestnom konaní a súdov v prípadoch, ak medzinárodné zmluvy, ktorými je Slovenská republika viazaná, neustanovujú iný postup. Základné zásady sú subsidiarita (TP sa použije len ak zmluva neustanoví inak) a reciprocita (bez zmluvy sa žiadosť vybaví len pri záruke vzájomnosti). 

Medzi hlavné nástroje spolupráce v rámci EÚ patria európsky zatýkací rozkaz (EAW), európsky vyšetrovací príkaz (EIO), vzájomné uznávanie rozsudkov a príkazov na zaistenie/konfiškáciu, spoločné vyšetrovacie tímy a mechanizmy na výkon trestov a peňažných sankcií medzi členskými štátmi. Tieto nástroje sú postavené na zásade vzájomného uznávania a na právnom rámci Zmluvy o fungovaní EÚ (čl. 82–86).`,

  priklad: `
Slovenské orgány zistia, že podozrivý z rozsiahleho podvodu sa nachádza v inom členskom štáte EÚ. Namiesto klasickej diplomatickej extradície sa použije európsky zatýkací rozkaz: slovenský súd vydá EAW, ktorý priamo osloví justičný orgán dožiadaného štátu; po splnení podmienok dožiadanie vedie k rýchlemu odovzdaniu osoby na účely trestného stíhania. Ak sú potrebné dôkazy z iného štátu (napr. bankové údaje), použije sa európsky vyšetrovací príkaz na priame získanie dôkazov. `,

  klucove_slova: [
    "Európsky zatýkací rozkaz",
    "Vzájomné uznávanie",
    "Európsky vyšetrovací príkaz",
    "Subsidiarita a reciprocita"
  ],

  zapamataj_si: [
    "Základom spolupráce v EÚ je zásada vzájomného uznávania rozhodnutí; to umožňuje priame justičné nástroje medzi členskými štátmi bez zbytočných diplomatických prieťahov. ",
    "Ak existuje špecifická zmluva alebo akt EÚ, má prednosť pred vnútroštátnym Trestným poriadkom; TP sa uplatní subsidiárne. ",
    "Pri absencii zmluvy platí princíp reciprocity; žiadosť sa vybaví len pri záruke vzájomnosti."
  ],

  literatura: [
    "TPP II. – Spolupráca v EÚ",
    "Právo EÚ – trestná spolupráca"
  ]
},
{
  id: "C1",
  section: "C",
  kod: "C1",
  nazov: "Krádež – základná skutková podstata",

  vysvetlenie: `
Krádež podľa § 212 TZ patrí medzi najčastejšie posudzované majetkové trestné činy.
Pri riešení prípadu sa právnik riadi logikou MIRAC:

• M – skutok: prisvojenie cudzej veci zmocnením  
• I – právny problém: či ide o trestný čin alebo priestupok  
• R – právna norma: § 212 TZ, hranica 266 € (resp. 500 € pri recidíve)  
• A – aplikácia: skúma sa úmysel, spôsob zmocnenia, hodnota veci  
• C – záver: kvalifikácia + procesný postup (často skrátené konanie)

Najčastejšie chyby študentov:
– zamieňanie krádeže a podvodu  
– nesprávne posúdenie hodnoty veci  
– ignorovanie recidívy  
– nesprávne posúdenie úmyslu
`,

  priklad: `
Obvinený si v supermarkete vložil do tašky tovar v hodnote 85 € a prešiel pokladničnou zónou bez zaplatenia.
Bol zadržaný SBS pracovníkom. Hodnota nepresahuje 266 €, ide o prečin krádeže.
Vzhľadom na jasnosť skutku je vhodné skrátené konanie.
`,

  klucove_slova: ["krádež", "majetkové činy", "zmocnenie", "266 €", "skrátené konanie"],

  zapamataj_si: [
    "Krádež = prisvojenie cudzej veci zmocnením",
    "Hranica medzi priestupkom a trestným činom je 266 €",
    "Pri recidíve môže byť trestný čin aj pri nižšej hodnote",
    "Najčastejší procesný postup: skrátené konanie"
  ],

  literatura: [
    "§ 212 TZ – Krádež",
    "§ 10 TZ – Zavinenie",
    "§ 199–211 TP – Skrátené konanie"
  ]
},
{
  id: "C2",
  section: "C",
  kod: "C2",
  nazov: "Podvod – uvedenie do omylu",

  vysvetlenie: `
Podvod podľa § 221 TZ je založený na uvedení iného do omylu alebo využití omylu.
MIRAC logika:

• M – skutok: konanie smerujúce k obohateniu  
• I – problém: či bolo niekoho uvedené do omylu  
• R – norma: § 221 TZ  
• A – aplikácia: skúma sa omyl, úmysel, škoda  
• C – záver: kvalifikácia podľa výšky škody

Najčastejšie chyby:
– zamieňanie podvodu a krádeže  
– ignorovanie toho, kto bol uvedený do omylu  
– nesprávne posúdenie škody
`,

  priklad: `
Obvinený predstieral, že predáva mobilný telefón, prevzal platbu 300 € a tovar neodoslal.
Poškodený bol uvedený do omylu, vznikla škoda 300 €.
Ide o prečin podvodu podľa § 221 ods. 1 TZ.
`,

  klucove_slova: ["podvod", "omyl", "škoda", "obohatenie"],

  zapamataj_si: [
    "Podvod = uvedenie do omylu",
    "Rozhodujúca je výška škody",
    "Škoda nad 266 € = trestný čin",
    "Úmysel musí smerovať k obohateniu"
  ],

  literatura: [
    "§ 221 TZ – Podvod",
    "§ 125 TZ – Škoda"
  ]
},
{
  id: "C3",
  section: "C",
  kod: "C3",
  nazov: "Sprenevera – zverená vec",

  vysvetlenie: `
Sprenevera podľa § 213 TZ vyžaduje, aby bola vec zverená.
MIRAC logika:

• M – vec bola zverená  
• I – problém: či došlo k prisvojeniu  
• R – norma: § 213 TZ  
• A – aplikácia: skúma sa nakladanie so zverenou vecou  
• C – záver: kvalifikácia podľa škody

Najčastejšie chyby:
– zamieňanie so krádežou  
– ignorovanie zverenia veci  
– nesprávne posúdenie škody
`,

  priklad: `
Obvinený si ponechal firemný notebook v hodnote 900 € po skončení pracovného pomeru.
Notebook mu bol zverený na výkon práce.
Ide o spreneveru podľa § 213 TZ.
`,

  klucove_slova: ["sprenevera", "zverená vec", "škoda"],

  zapamataj_si: [
    "Rozhodujúce je zverenie veci",
    "Ak vec nebola zverená → nejde o spreneveru",
    "Škoda určuje kvalifikáciu"
  ],

  literatura: [
    "§ 213 TZ – Sprenevera",
    "§ 125 TZ – Škoda"
  ]
},
{
  id: "C4",
  section: "C",
  kod: "C4",
  nazov: "Ublíženie na zdraví – základ",

  vysvetlenie: `
Ublíženie na zdraví podľa § 156 TZ vyžaduje poruchu zdravia trvajúcu viac ako 7 dní.
MIRAC logika:

• M – zranenie  
• I – problém: či ide o ublíženie alebo priestupok  
• R – norma: § 156 TZ  
• A – aplikácia: znalecký posudok, dĺžka liečenia  
• C – záver: kvalifikácia + úmysel/neopatrnosť

Najčastejšie chyby:
– ignorovanie dĺžky liečenia  
– zamieňanie s ťažkou ujmou  
– nesprávne posúdenie úmyslu
`,

  priklad: `
Počas hádky obvinený udrel poškodeného päsťou do tváre.
Poškodený utrpel zlomeninu nosa a liečil sa 12 dní.
Ide o prečin ublíženia na zdraví podľa § 156 TZ.
`,

  klucove_slova: ["ublíženie na zdraví", "zranenie", "liečenie", "znalec"],

  zapamataj_si: [
    "Liečenie nad 7 dní = trestný čin",
    "Znalecký posudok je nevyhnutný",
    "Úmysel alebo nedbanlivosť mení kvalifikáciu"
  ],

  literatura: [
    "§ 156 TZ – Ublíženie na zdraví",
    "§ 157 TZ – Ťažká ujma"
  ]
},
{
  id: "C5",
  section: "C",
  kod: "C5",
  nazov: "Ťažká ujma na zdraví",

  vysvetlenie: `
Ťažká ujma podľa § 155 TZ je kvalifikovaná forma ublíženia na zdraví.
MIRAC logika:

• M – závažné zranenie  
• I – problém: či ide o ťažkú ujmu  
• R – norma: § 155 TZ  
• A – aplikácia: posúdenie trvalých následkov  
• C – záver: kvalifikácia + úmysel

Najčastejšie chyby:
– zamieňanie s ublížením  
– ignorovanie trvalých následkov  
– nesprávne posúdenie úmyslu
`,

  priklad: `
Poškodený utrpel otras mozgu, trvalé poruchy rovnováhy a 6-týždňové liečenie.
Ide o ťažkú ujmu na zdraví podľa § 155 TZ.
`,

  klucove_slova: ["ťažká ujma", "trvalé následky", "znalec"],

  zapamataj_si: [
    "Ťažká ujma = trvalé následky alebo vážne poškodenie zdravia",
    "Rozhoduje znalecký posudok",
    "Úmysel výrazne mení trestnú sadzbu"
  ],

  literatura: [
    "§ 155 TZ – Ťažká ujma",
    "§ 156 TZ – Ublíženie na zdraví"
  ]
},
{
  id: "C6",
  section: "C",
  kod: "C6",
  nazov: "Nedovolené prechovávanie omamných a psychotropných látok",

  vysvetlenie: `
Tento trestný čin podľa § 171 a § 172 TZ patrí medzi najčastejšie skúšané na štátniciach.
MIRAC logika:

• M – skutok: držba, prechovávanie, výroba, obchodovanie  
• I – problém: množstvo → malé / väčšie / značné / veľké  
• R – norma: § 171 (držba pre vlastnú potrebu), § 172 (výroba, obchodovanie)  
• A – aplikácia: znalecký posudok na množstvo a čistotu látky  
• C – záver: kvalifikácia podľa množstva a účelu

Najčastejšie chyby:
– študenti ignorujú hranice množstva  
– zamieňajú držbu pre vlastnú potrebu s obchodovaním  
– nevedia, že znalecký posudok je povinný
`,

  priklad: `
Obvinený mal pri sebe 0,8 g metamfetamínu (pervitínu) s čistotou 40 %. 
Znalecký posudok potvrdil, že ide o množstvo pre vlastnú potrebu.
Ide o prečin podľa § 171 ods. 1 TZ.
`,

  klucove_slova: ["drogy", "prechovávanie", "množstvo", "znalec", "pervitín"],

  zapamataj_si: [
    "Rozhoduje množstvo a čistota látky",
    "Znalecký posudok je povinný",
    "§ 171 = držba pre vlastnú potrebu",
    "§ 172 = výroba, obchodovanie, distribúcia"
  ],

  literatura: [
    "§ 171 TZ – Nedovolené prechovávanie",
    "§ 172 TZ – Nedovolená výroba a obchodovanie",
    "Zákon o omamných a psychotropných látkach"
  ]
},
{
  id: "C7",
  section: "C",
  kod: "C7",
  nazov: "Domáce násilie – týranie blízkej osoby",

  vysvetlenie: `
Týranie blízkej osoby podľa § 208 TZ je komplexný trestný čin, ktorý sa často skúša.
MIRAC logika:

• M – skutok: dlhodobé fyzické alebo psychické utrpenie  
• I – problém: či ide o týranie alebo len priestupok/ublíženie  
• R – norma: § 208 TZ  
• A – aplikácia: dlhodobosť, intenzita, opakované konanie  
• C – záver: kvalifikácia + posúdenie vzťahu (blízka osoba)

Najčastejšie chyby:
– študenti ignorujú dlhodobosť  
– zamieňajú jednorazový útok s týraním  
– nevedia definíciu „blízkej osoby“
`,

  priklad: `
Obvinený opakovane ponižoval, vyhrážal sa a fyzicky napádal svoju partnerku počas 8 mesiacov.
Poškodená mala psychické následky a strach z obvineného.
Ide o týranie blízkej osoby podľa § 208 TZ.
`,

  klucove_slova: ["týranie", "domáce násilie", "blízka osoba", "dlhodobosť"],

  zapamataj_si: [
    "Týranie = dlhodobé fyzické alebo psychické utrpenie",
    "Blízka osoba je definovaná v § 127 TZ",
    "Jednorazový útok nie je týranie",
    "Psychické násilie je rovnocenné fyzickému"
  ],

  literatura: [
    "§ 208 TZ – Týranie blízkej osoby",
    "§ 127 TZ – Blízka osoba"
  ]
},
{
  id: "C8",
  section: "C",
  kod: "C8",
  nazov: "Dopravná nehoda – ublíženie z nedbanlivosti",

  vysvetlenie: `
Dopravné trestné činy patria medzi najčastejšie skúšané.
MIRAC logika:

• M – skutok: porušenie pravidiel cestnej premávky  
• I – problém: či ide o priestupok alebo trestný čin  
• R – norma: § 157 (ublíženie), § 289 (ohrozenie pod vplyvom)  
• A – aplikácia: rýchlosť, predvídateľnosť, technický stav vozidla  
• C – záver: posúdenie zavinenia (nedbanlivosť)

Najčastejšie chyby:
– ignorovanie dĺžky liečenia  
– zamieňanie úmyslu a nedbanlivosti  
– nesprávne posúdenie spoluzavinenia
`,

  priklad: `
Vodič nedodržal bezpečnú vzdialenosť a narazil do vozidla pred sebou.
Poškodený utrpel zranenia s liečením 10 dní.
Ide o prečin ublíženia na zdraví z nedbanlivosti.
`,

  klucove_slova: ["dopravná nehoda", "nedbanlivosť", "ublíženie", "liečenie"],

  zapamataj_si: [
    "Liečenie nad 7 dní = trestný čin",
    "Nedbanlivosť = porušenie povinnosti, ktorú možno predvídať",
    "Spoluzavinenie nezbavuje trestnej zodpovednosti"
  ],

  literatura: [
    "§ 157 TZ – Ublíženie na zdraví",
    "Zákon o cestnej premávke"
  ]
},
{
  id: "C9",
  section: "C",
  kod: "C9",
  nazov: "Znásilnenie – sexuálne násilie",

  vysvetlenie: `
Znásilnenie podľa § 199 TZ je jedným z najzávažnejších trestných činov.
MIRAC logika:

• M – skutok: donútenie k súloži alebo inému sexuálnemu styku  
• I – problém: či bola vôľa obete zlomená násilím alebo hrozbou  
• R – norma: § 199 TZ  
• A – aplikácia: intenzita násilia, psychický nátlak, bezbrannosť  
• C – záver: kvalifikácia podľa spôsobu a následkov

Najčastejšie chyby:
– zamieňanie s § 200 (sexuálne násilie)  
– ignorovanie psychického nátlaku  
– nesprávne posúdenie bezbrannosti
`,

  priklad: `
Obvinený použil fyzické násilie a držal poškodenú za ruky, čím ju donútil k súloži.
Poškodená bola v šoku a nedokázala sa brániť.
Ide o znásilnenie podľa § 199 TZ.
`,

  klucove_slova: ["znásilnenie", "násilie", "bezbrannosť", "psychický nátlak"],

  zapamataj_si: [
    "Znásilnenie = donútenie k súloži alebo obdobnému styku",
    "Bezbrannosť môže byť aj psychická",
    "Hrozba násilia je rovnocenná fyzickému násiliu"
  ],

  literatura: [
    "§ 199 TZ – Znásilnenie",
    "§ 200 TZ – Sexuálne násilie"
  ]
},
{
  id: "C10",
  section: "C",
  kod: "C10",
  nazov: "Všeobecné ohrozenie – úmyselné aj nedbanlivostné",

  vysvetlenie: `
Všeobecné ohrozenie podľa § 284 a § 285 TZ je trestný čin, ktorý sa skúša pre jeho komplexnosť.
MIRAC logika:

• M – skutok: konanie, ktoré môže spôsobiť smrť alebo ťažkú ujmu viacerým osobám  
• I – problém: či ide o ohrozenie alebo len priestupok  
• R – norma: § 284 (úmysel), § 285 (nedbanlivosť)  
• A – aplikácia: počet ohrozených osôb, spôsob konania, následky  
• C – záver: kvalifikácia podľa úmyslu a rozsahu

Najčastejšie chyby:
– ignorovanie počtu ohrozených osôb  
– zamieňanie úmyslu a nedbanlivosti  
– nesprávne posúdenie následkov
`,

  priklad: `
Obvinený úmyselne založil požiar v bytovom dome.
V ohrození bolo 25 osôb.
Ide o úmyselné všeobecné ohrozenie podľa § 284 TZ.
`,

  klucove_slova: ["všeobecné ohrozenie", "požiar", "viac osôb", "úmysel"],

  zapamataj_si: [
    "Rozhoduje počet ohrozených osôb",
    "Úmysel výrazne zvyšuje trestnú sadzbu",
    "Následky môžu byť aj len potenciálne"
  ],

  literatura: [
    "§ 284 TZ – Úmyselné všeobecné ohrozenie",
    "§ 285 TZ – Nedbanlivostné všeobecné ohrozenie"
  ]
},
{
  id: "C11",
  section: "C",
  kod: "C11",
  nazov: "Korupcia – aktívne a pasívne podplácanie",

  vysvetlenie: `
Korupčné trestné činy patria medzi najdôležitejšie okruhy na štátniciach.
MIRAC logika:

• M – skutok: prijatie, žiadanie, ponúknutie alebo poskytnutie úplatku  
• I – problém: či ide o aktívne alebo pasívne podplácanie  
• R – norma: § 328–336 TZ  
• A – aplikácia: skúma sa účel úplatku, súvislosť s právomociou  
• C – záver: kvalifikácia podľa postavenia osoby (verejný činiteľ)

Najčastejšie chyby:
– zamieňanie aktívneho a pasívneho podplácania  
– ignorovanie súvislosti s právomociou  
– nesprávne posúdenie „nepriameho úplatku“
`,

  priklad: `
Obvinený ponúkol policajtovi 50 € za to, aby neuložil pokutu.
Ide o aktívne podplácanie podľa § 333 TZ.
`,

  klucove_slova: ["korupcia", "úplatok", "verejný činiteľ", "aktívne", "pasívne"],

  zapamataj_si: [
    "Aktívne podplácanie = ponúknutie alebo poskytnutie úplatku",
    "Pasívne podplácanie = prijatie alebo žiadanie úplatku",
    "Verejný činiteľ = vyššia trestná sadzba",
    "Úplatok nemusí byť len peniaz"
  ],

  literatura: [
    "§ 328–336 TZ – Korupcia",
    "§ 127 TZ – Verejný činiteľ"
  ]
},
{
  id: "C12",
  section: "C",
  kod: "C12",
  nazov: "Neoprávnené ozbrojovanie – držba a obchod so zbraňami",

  vysvetlenie: `
Tento trestný čin podľa § 294 TZ sa skúša pre jeho bezpečnostný význam.
MIRAC logika:

• M – skutok: držba, výroba, úprava alebo obchod so zbraňami  
• I – problém: či ide o zbraň kategórie A/B/C  
• R – norma: § 294 TZ  
• A – aplikácia: skúma sa povolenie, účel držby, technický stav  
• C – záver: kvalifikácia podľa rozsahu a účelu

Najčastejšie chyby:
– ignorovanie kategórie zbrane  
– zamieňanie legálnej držby s neoprávnenou  
– nesprávne posúdenie úpravy zbrane
`,

  priklad: `
Obvinený prechovával upravenú strelnú zbraň bez povolenia.
Ide o neoprávnené ozbrojovanie podľa § 294 TZ.
`,

  klucove_slova: ["zbraň", "držba", "povolenie", "úprava"],

  zapamataj_si: [
    "Zbraň kategórie A = zakázaná",
    "Držba bez povolenia = trestný čin",
    "Úprava zbrane môže zvýšiť trestnú sadzbu"
  ],

  literatura: [
    "§ 294 TZ – Neoprávnené ozbrojovanie",
    "Zákon o strelných zbraniach a strelive"
  ]
},
{
  id: "C13",
  section: "C",
  kod: "C13",
  nazov: "Verejný činiteľ – zneužitie právomoci",

  vysvetlenie: `
Zneužitie právomoci verejného činiteľa podľa § 326 TZ je kľúčový štátnicový okruh.
MIRAC logika:

• M – skutok: konanie verejného činiteľa v rozpore s právomocou  
• I – problém: či konal úmyselne a s cieľom spôsobiť škodu alebo získať prospech  
• R – norma: § 326 TZ  
• A – aplikácia: skúma sa právomoc, úmysel, následky  
• C – záver: kvalifikácia podľa spôsobenej škody

Najčastejšie chyby:
– nesprávne posúdenie právomoci  
– ignorovanie úmyslu  
– zamieňanie s nesprávnym úradným postupom
`,

  priklad: `
Policajt úmyselne nezadržal osobu, hoci mal zákonný dôvod, aby jej umožnil útek.
Ide o zneužitie právomoci podľa § 326 TZ.
`,

  klucove_slova: ["verejný činiteľ", "právomoc", "zneužitie", "úmysel"],

  zapamataj_si: [
    "Verejný činiteľ = osoba vykonávajúca právomoc orgánu verejnej moci",
    "Úmysel je rozhodujúci",
    "Musí ísť o konanie v rozpore s právomocou"
  ],

  literatura: [
    "§ 326 TZ – Zneužitie právomoci",
    "§ 127 TZ – Verejný činiteľ"
  ]
},
{
  id: "C14",
  section: "C",
  kod: "C14",
  nazov: "Trestná zodpovednosť mladistvých",

  vysvetlenie: `
Mladiství majú osobitný režim podľa § 97–§ 121 TZ.
MIRAC logika:

• M – skutok spáchaný osobou 14–18 rokov  
• I – problém: či je mladistvý trestne zodpovedný  
• R – norma: § 97–121 TZ  
• A – aplikácia: skúma sa rozumová a mravná vyspelosť  
• C – záver: osobitné tresty a výchovné opatrenia

Najčastejšie chyby:
– ignorovanie veku  
– nesprávne posúdenie vyspelosti  
– zamieňanie trestov a výchovných opatrení
`,

  priklad: `
Mladistvý (16 rokov) spáchal krádež v hodnote 150 €.
Je trestne zodpovedný, ale ukladá sa mu trest podľa osobitných zásad.
`,

  klucove_slova: ["mladistvý", "vyspelosť", "výchovné opatrenia"],

  zapamataj_si: [
    "Mladistvý = 14–18 rokov",
    "Rozhoduje rozumová a mravná vyspelosť",
    "Prednosť majú výchovné opatrenia"
  ],

  literatura: [
    "§ 97–121 TZ – Mladiství",
    "Zákon o sociálnoprávnej ochrane detí"
  ]
},
{
  id: "C15",
  section: "C",
  kod: "C15",
  nazov: "Tresty a sankcie – prehľad",

  vysvetlenie: `
Tresty podľa § 32–§ 60 TZ sú základom štátnicovej teórie aj praxe.
MIRAC logika:

• M – skutok a jeho závažnosť  
• I – problém: aký trest je primeraný  
• R – norma: § 32–60 TZ  
• A – aplikácia: skúma sa účel trestu, pomery páchateľa  
• C – záver: výber trestu a jeho výmera

Najčastejšie chyby:
– zamieňanie trestov a ochranných opatrení  
– ignorovanie poľahčujúcich a priťažujúcich okolností  
– nesprávne posúdenie účelu trestu
`,

  priklad: `
Páchateľ spáchal prečin krádeže bez recidívy.
Primeraným trestom je podmienečný trest odňatia slobody.
`,

  klucove_slova: ["tresty", "sankcie", "výmera", "účel trestu"],

  zapamataj_si: [
    "Tresty sú v § 32–60 TZ",
    "Ochranné opatrenia nie sú tresty",
    "Účel trestu = ochrana spoločnosti"
  ],

  literatura: [
    "§ 32–60 TZ – Tresty",
    "§ 34 TZ – Účel trestu"
  ]
},
{
  id: "C16",
  section: "C",
  kod: "C16",
  nazov: "Väzba, zadržanie a úkony OČTK",

  vysvetlenie: `
Procesné situácie patria medzi najčastejšie skúšané.
MIRAC logika:

• M – skutok: zásah do osobnej slobody  
• I – problém: či sú splnené dôvody väzby  
• R – norma: § 71–§ 88 TP  
• A – aplikácia: úteková, kolúzna, preventívna väzba  
• C – záver: rozhodnutie o väzbe

Najčastejšie chyby:
– zamieňanie dôvodov väzby  
– ignorovanie zásady subsidiarity väzby  
– nesprávne posúdenie dôkazov
`,

  priklad: `
Obvinený opakovane ovplyvňoval svedkov.
Sú splnené dôvody kolúznej väzby.
`,

  klucove_slova: ["väzba", "zadržanie", "kolúzna", "úteková"],

  zapamataj_si: [
    "Väzba je krajný prostriedok",
    "Kolúzna = ovplyvňovanie svedkov",
    "Úteková = riziko úteku"
  ],

  literatura: [
    "§ 71–88 TP – Väzba",
    "Ústava SR – osobná sloboda"
  ]
},
{
  id: "C17",
  section: "C",
  kod: "C17",
  nazov: "Skrátené konanie – podmienky a priebeh",

  vysvetlenie: `
Skrátené konanie podľa § 199–211 TP je najčastejší procesný postup.
MIRAC logika:

• M – skutok jasný, dôkazy okamžite dostupné  
• I – problém: či sú splnené podmienky  
• R – norma: § 199–211 TP  
• A – aplikácia: rýchlosť, jednoduchý skutok, priznanie  
• C – záver: návrh na potrestanie

Najčastejšie chyby:
– zamieňanie s dohliadacím konaním  
– ignorovanie podmienok  
– nesprávne posúdenie dôkazov
`,

  priklad: `
Obvinený bol pristihnutý pri krádeži v obchode.
Skutok je jasný → skrátené konanie.
`,

  klucove_slova: ["skrátené konanie", "návrh na potrestanie", "jednoduchý skutok"],

  zapamataj_si: [
    "Skutok musí byť jasný",
    "Dôkazy musia byť okamžite dostupné",
    "Používa sa pri menej závažných trestných činoch"
  ],

  literatura: [
    "§ 199–211 TP – Skrátené konanie"
  ]
},
{
  id: "C18",
  section: "C",
  kod: "C18",
  nazov: "Opravné prostriedky – riadne a mimoriadne",

  vysvetlenie: `
Opravné prostriedky sú základom procesného práva.
MIRAC logika:

• M – rozhodnutie, ktoré má byť preskúmané  
• I – problém: či ide o riadny alebo mimoriadny prostriedok  
• R – norma: § 309–§ 397 TP  
• A – aplikácia: skúma sa lehota, oprávnená osoba, dôvody  
• C – záver: prípustnosť opravného prostriedku

Najčastejšie chyby:
– zamieňanie odvolania a sťažnosti  
– ignorovanie lehôt  
– nesprávne posúdenie prípustnosti
`,

  priklad: `
Obvinený podal odvolanie proti rozsudku okresného súdu.
Odvolanie je riadny opravný prostriedok.
`,

  klucove_slova: ["odvolanie", "sťažnosť", "dovolanie", "obnova konania"],

  zapamataj_si: [
    "Odvolanie = riadny opravný prostriedok",
    "Dovolanie = mimoriadny opravný prostriedok",
    "Lehoty sú striktne viazané"
  ],

  literatura: [
    "§ 309–397 TP – Opravné prostriedky"
  ]
},
{
  id: "C19",
  section: "C",
  kod: "C19",
  nazov: "Dôkazy – hodnotenie a prípustnosť",

  vysvetlenie: `
Dôkazné právo je jadrom trestného procesu.
MIRAC logika:

• M – skutok, ktorý treba preukázať  
• I – problém: či je dôkaz zákonný a relevantný  
• R – norma: § 119–§ 150 TP  
• A – aplikácia: hodnotenie dôkazov podľa zásady voľného hodnotenia  
• C – záver: použiteľnosť dôkazu

Najčastejšie chyby:
– ignorovanie zákonnosti dôkazu  
– zamieňanie relevancie a prípustnosti  
– nesprávne hodnotenie výpovedí
`,

  priklad: `
Polícia získala dôkaz nezákonnou domovou prehliadkou.
Dôkaz je neprípustný.
`,

  klucove_slova: ["dôkazy", "prípustnosť", "relevancia", "hodnotenie"],

  zapamataj_si: [
    "Dôkaz musí byť zákonný",
    "Nezákonný dôkaz je neprípustný",
    "Súd hodnotí dôkazy voľne"
  ],

  literatura: [
    "§ 119–150 TP – Dôkazy"
  ]
},
{
  id: "C20",
  section: "C",
  kod: "C20",
  nazov: "Trestná zodpovednosť právnických osôb",

  vysvetlenie: `
Trestná zodpovednosť právnických osôb (TZPO) je upravená osobitným zákonom č. 91/2016 Z. z.
Ide o samostatný režim, ktorý sa skúša na štátniciach takmer vždy.

MIRAC právnická logika:

• M – skutok: konanie fyzickej osoby v mene, v prospech alebo v záujme právnickej osoby  
• I – problém: či osoba konala v postavení, ktoré zakladá zodpovednosť PO  
• R – norma: zákon č. 91/2016 Z. z.  
• A – aplikácia: skúma sa prospech, súvislosť s činnosťou PO, organizačné zlyhanie  
• C – záver: sankcie pre PO (peňažný trest, prepadnutie majetku, zrušenie PO)

Najčastejšie chyby študentov:
– zamieňanie občianskoprávnej a trestnej zodpovednosti  
– ignorovanie toho, kto konal (konateľ, zamestnanec, osoba v postavení)  
– nesprávne posúdenie „prospechu“ pre PO  
– zabúdanie na možnosť zániku trestnej zodpovednosti PO (compliance)
`,

  priklad: `
Konateľ spoločnosti úmyselne skrátil dane o 40 000 €.
Konanie vykonal v mene a v prospech spoločnosti, ktorá z toho získala finančný prospech.
Právnická osoba nesie trestnú zodpovednosť podľa zákona č. 91/2016 Z. z.
`,

  klucove_slova: [
    "právnická osoba",
    "konateľ",
    "prospech",
    "osoba v postavení",
    "zodpovednosť PO",
    "compliance"
  ],

  zapamataj_si: [
    "Právnická osoba zodpovedá za konanie osoby v postavení (§ 4 zákona)",
    "Musí ísť o konanie v mene, v prospech alebo v záujme PO",
    "Sankcie pre PO sú odlišné od sankcií pre FO",
    "Existuje možnosť zániku zodpovednosti pri účinnom compliance programe"
  ],

  literatura: [
    "Zákon č. 91/2016 Z. z. o trestnej zodpovednosti právnických osôb",
    "§ 4 – Osoba v postavení",
    "§ 10 – Sankcie pre právnické osoby"
  ]
}

];
/* ============================================================
   NÁCVIK RIEŠENIA PRÍPADOV – INTERAKTÍVNE SCENÁRE
============================================================ */

const TRAINING_CASES = [

  /* ============================================================
     TC1 – Krádež
  ============================================================ */
  {
    id: "TC1",
    nazov: "Tréningový prípad 1",
    obtiaznost: "ľahká",

    M: `
Obvinený si v supermarkete vložil do tašky tovar v hodnote 85 € a prešiel pokladničnou zónou bez zaplatenia.
Bol zadržaný SBS pracovníkom.
`,

    kroky: [
      {
        typ: "I",
        otazka: "Aký právny problém riešime?",
        moznosti: [
          { id: "A", text: "Krádež podľa § 212 TZ" },
          { id: "B", text: "Podvod podľa § 221 TZ" },
          { id: "C", text: "Priestupok proti majetku" }
        ],
        spravna: "A",
        vysvetlenie_spravne: "Správne – ide o prisvojenie cudzej veci zmocnením.",
        vysvetlenie_nespravne: {
          B: "Nie – podvod vyžaduje uvedenie do omylu.",
          C: "Nie – hodnota nad 50 € = trestný čin."
        }
      },

      {
        typ: "R",
        otazka: "Ktoré ustanovenie sa použije?",
        moznosti: [
          { id: "A", text: "§ 212 TZ – Krádež" },
          { id: "B", text: "§ 213 TZ – Sprenevera" },
          { id: "C", text: "§ 221 TZ – Podvod" }
        ],
        spravna: "A",
        vysvetlenie_spravne: "Správne – skutková podstata krádeže je naplnená.",
        vysvetlenie_nespravne: {
          B: "Nie – vec nebola zverená.",
          C: "Nie – chýba uvedenie do omylu."
        }
      },

      {
        typ: "A",
        otazka: "Ako sa norma aplikuje na skutok?",
        moznosti: [
          { id: "A", text: "Prisvojenie veci zmocnením je naplnené" },
          { id: "B", text: "Chýba úmysel" },
          { id: "C", text: "Chýba objekt trestného činu" }
        ],
        spravna: "A",
        vysvetlenie_spravne: "Úmysel je zrejmý z konania – prechod cez pokladničnú zónu.",
        vysvetlenie_nespravne: {
          B: "Nie – úmysel je zjavný.",
          C: "Nie – objektom je vlastníctvo."
        }
      },

      {
        typ: "P",
        otazka: "Aký procesný postup je najvhodnejší?",
        moznosti: [
          { id: "A", text: "Skrátené konanie" },
          { id: "B", text: "Klasické vyšetrovanie" },
          { id: "C", text: "Väzba" }
        ],
        spravna: "A",
        vysvetlenie_spravne: "Skutok je jasný, dôkazy okamžite dostupné.",
        vysvetlenie_nespravne: {
          B: "Nie – zbytočne zdĺhavé.",
          C: "Nie – nie sú dôvody väzby."
        }
      }
    ],

    C: `
Ide o prečin krádeže podľa § 212 TZ. Najvhodnejší postup je skrátené konanie.
`,

    tagy: ["MIRAC", "krádež", "procesný postup", "interaktívny tréning"]
  },

  /* ============================================================
     TC2 – Podvod
  ============================================================ */
  {
    id: "TC2",
    nazov: "Tréningový prípad 2",
    obtiaznost: "ľahká",

    M: `
Obvinený predstieral predaj mobilného telefónu, prevzal 300 € a tovar neodoslal.
`,

    kroky: [
      {
        typ: "I",
        otazka: "Aký právny problém riešime?",
        moznosti: [
          { id: "A", text: "Podvod podľa § 221 TZ" },
          { id: "B", text: "Krádež podľa § 212 TZ" },
          { id: "C", text: "Sprenevera podľa § 213 TZ" }
        ],
        spravna: "A",
        vysvetlenie_spravne: "Správne – poškodený bol uvedený do omylu.",
        vysvetlenie_nespravne: {
          B: "Nie – nešlo o zmocnenie veci.",
          C: "Nie – vec nebola zverená."
        }
      },

      {
        typ: "R",
        otazka: "Ktoré ustanovenie sa použije?",
        moznosti: [
          { id: "A", text: "§ 221 TZ – Podvod" },
          { id: "B", text: "§ 212 TZ – Krádež" },
          { id: "C", text: "§ 125 TZ – Škoda" }
        ],
        spravna: "A",
        vysvetlenie_spravne: "Ide o uvedenie do omylu s cieľom obohatenia.",
        vysvetlenie_nespravne: {
          B: "Nie – chýba zmocnenie.",
          C: "Nie – § 125 len definuje škodu."
        }
      },

      {
        typ: "A",
        otazka: "Ako sa norma aplikuje na skutok?",
        moznosti: [
          { id: "A", text: "Poškodený bol uvedený do omylu" },
          { id: "B", text: "Chýba úmysel" },
          { id: "C", text: "Nejde o škodu" }
        ],
        spravna: "A",
        vysvetlenie_spravne: "Úmysel je zrejmý – obvinený peniaze prevzal a tovar neposlal.",
        vysvetlenie_nespravne: {
          B: "Nie – úmysel je jasný.",
          C: "Nie – škoda je 300 €."
        }
      },

      {
        typ: "P",
        otazka: "Aký procesný postup je najvhodnejší?",
        moznosti: [
          { id: "A", text: "Začať trestné stíhanie pre podvod" },
          { id: "B", text: "Skrátené konanie" },
          { id: "C", text: "Väzba" }
        ],
        spravna: "A",
        vysvetlenie_spravne: "Ide o klasický podvod – treba začať trestné stíhanie.",
        vysvetlenie_nespravne: {
          B: "Nie – skutok nie je okamžite jasný, treba preveriť komunikáciu.",
          C: "Nie – nie sú dôvody väzby."
        }
      }
    ],

    C: `
Ide o prečin podvodu podľa § 221 TZ.
`,

    tagy: ["MIRAC", "podvod", "procesný postup", "interaktívny tréning"]
  },
{
  id: "TC3",
  nazov: "Tréningový prípad 3",
  obtiaznost: "stredná",

  M: `
Obvinený si ponechal firemný notebook v hodnote 900 € po skončení pracovného pomeru.
Notebook mu bol zverený na výkon práce.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Sprenevera podľa § 213 TZ" },
        { id: "B", text: "Krádež podľa § 212 TZ" },
        { id: "C", text: "Podvod podľa § 221 TZ" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vec bola zverená – to je rozhodujúce.",
      vysvetlenie_nespravne: {
        B: "Nie – vec nebola odcudzená, ale zverená.",
        C: "Nie – nešlo o uvedenie do omylu."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie sa použije?",
      moznosti: [
        { id: "A", text: "§ 213 TZ – Sprenevera" },
        { id: "B", text: "§ 212 TZ – Krádež" },
        { id: "C", text: "§ 125 TZ – Škoda" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Sprenevera vyžaduje zverenie veci.",
      vysvetlenie_nespravne: {
        B: "Nie – krádež nepracuje so zverením.",
        C: "Nie – § 125 len definuje škodu."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Obvinený si prisvojil zverenú vec" },
        { id: "B", text: "Chýba úmysel" },
        { id: "C", text: "Nejde o zverenú vec" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Notebook bol zverený a obvinený si ho ponechal.",
      vysvetlenie_nespravne: {
        B: "Nie – úmysel je zrejmý.",
        C: "Nie – vec bola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je najvhodnejší?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre spreneveru" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Väzba" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Treba preveriť pracovnú zmluvu a zverenie veci.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nie je okamžite jasný.",
        C: "Nie – nie sú dôvody väzby."
      }
    }
  ],

  C: `
Ide o prečin sprenevery podľa § 213 TZ.
`,

  tagy: ["MIRAC", "sprenevera", "zverená vec", "interaktívny tréning"]
},
{
  id: "TC4",
  nazov: "Tréningový prípad 4",
  obtiaznost: "stredná",

  M: `
Počas hádky obvinený udrel poškodeného päsťou do tváre.
Poškodený utrpel zlomeninu nosa a liečil sa 12 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Ublíženie na zdraví podľa § 156 TZ" },
        { id: "B", text: "Priestupok proti občianskemu spolunažívaniu" },
        { id: "C", text: "Ťažká ujma na zdraví" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Liečenie nad 7 dní = trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – liečenie nad 7 dní vylučuje priestupok.",
        C: "Nie – nejde o trvalé následky."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie sa použije?",
      moznosti: [
        { id: "A", text: "§ 156 TZ – Ublíženie na zdraví" },
        { id: "B", text: "§ 155 TZ – Ťažká ujma" },
        { id: "C", text: "§ 364 TZ – Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zlomenina nosa + 12 dní liečenia = § 156.",
      vysvetlenie_nespravne: {
        B: "Nie – chýbajú trvalé následky.",
        C: "Výtržníctvo môže byť súbežne, ale nie primárne."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Zranenie si vyžiadalo liečenie nad 7 dní" },
        { id: "B", text: "Chýba úmysel" },
        { id: "C", text: "Nejde o zranenie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Znalecký posudok potvrdzuje dĺžku liečenia.",
      vysvetlenie_nespravne: {
        B: "Nie – úmysel nie je potrebný, stačí nedbanlivosť.",
        C: "Nie – zlomenina nosa je zranenie."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je najvhodnejší?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Väzba" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Treba zabezpečiť znalecký posudok.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nie je okamžite jasný.",
        C: "Nie – nie sú dôvody väzby."
      }
    }
  ],

  C: `
Ide o prečin ublíženia na zdraví podľa § 156 TZ.
`,

  tagy: ["MIRAC", "ublíženie na zdraví", "znalec", "interaktívny tréning"]
},
{
  id: "TC5",
  nazov: "Tréningový prípad 5",
  obtiaznost: "stredná",

  M: `
Poškodený utrpel otras mozgu, trvalé poruchy rovnováhy a 6-týždňové liečenie.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Ťažká ujma na zdraví podľa § 155 TZ" },
        { id: "B", text: "Ublíženie na zdraví podľa § 156 TZ" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Trvalé následky = ťažká ujma.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trvalé následky.",
        C: "Nie – liečenie aj následky sú závažné."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie sa použije?",
      moznosti: [
        { id: "A", text: "§ 155 TZ – Ťažká ujma" },
        { id: "B", text: "§ 156 TZ – Ublíženie" },
        { id: "C", text: "§ 125 TZ – Škoda" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ťažká ujma vyžaduje trvalé následky.",
      vysvetlenie_nespravne: {
        B: "Nie – ublíženie nemá trvalé následky.",
        C: "Nie – § 125 len definuje škodu."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Poškodený má trvalé následky" },
        { id: "B", text: "Liečenie bolo krátke" },
        { id: "C", text: "Nejde o vážne zranenie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Trvalé poruchy rovnováhy = trvalý následok.",
      vysvetlenie_nespravne: {
        B: "Nie – liečenie bolo 6 týždňov.",
        C: "Nie – otras mozgu + následky sú vážne."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je najvhodnejší?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre ťažkú ujmu" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Väzba" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o závažný trestný čin, treba zabezpečiť znalecké dokazovanie.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nie je jednoduchý.",
        C: "Nie – nie sú dôvody väzby."
      }
    }
  ],

  C: `
Ide o zločin ťažkej ujmy na zdraví podľa § 155 TZ.
`,

  tagy: ["MIRAC", "ťažká ujma", "trvalé následky", "interaktívny tréning"]
},
{
  id: "TC6",
  nazov: "Tréningový prípad 6",
  obtiaznost: "stredná",

  M: `
Obvinený mal pri sebe 0,8 g metamfetamínu (pervitínu) s čistotou 40 %. 
Znalecký posudok potvrdil, že ide o množstvo pre vlastnú potrebu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Nedovolené prechovávanie podľa § 171 TZ" },
        { id: "B", text: "Výroba a obchodovanie podľa § 172 TZ" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Množstvo je malé a pre vlastnú potrebu.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o distribúciu ani výrobu.",
        C: "Nie – ide o omamnú látku, nie priestupok."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 171 TZ – Prechovávanie" },
        { id: "B", text: "§ 172 TZ – Obchodovanie" },
        { id: "C", text: "§ 125 TZ – Škoda" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o držbu pre vlastnú potrebu.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o predaj.",
        C: "Nie – škoda nie je rozhodujúca."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Množstvo je malé → § 171 TZ" },
        { id: "B", text: "Množstvo je značné → § 172 TZ" },
        { id: "C", text: "Nejde o drogu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Znalecký posudok potvrdil malé množstvo.",
      vysvetlenie_nespravne: {
        B: "Nie – množstvo je malé.",
        C: "Nie – ide o metamfetamín."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Väzba" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Treba vykonať znalecké dokazovanie.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nie je okamžite jasný.",
        C: "Nie – nie sú dôvody väzby."
      }
    }
  ],

  C: `
Ide o prečin podľa § 171 TZ – držba pre vlastnú potrebu.
`,

  tagy: ["MIRAC", "drogy", "prechovávanie", "interaktívny tréning"]
}, 
{
  id: "TC7",
  nazov: "Tréningový prípad 7",
  obtiaznost: "stredná",

  M: `
Obvinený opakovane ponižoval, vyhrážal sa a fyzicky napádal svoju partnerku počas 8 mesiacov.
Poškodená mala psychické následky a strach z obvineného.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Týranie blízkej osoby podľa § 208 TZ" },
        { id: "B", text: "Jednorazové ublíženie na zdraví" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dlhodobosť a psychické utrpenie = týranie.",
      vysvetlenie_nespravne: {
        B: "Nie – konanie bolo dlhodobé.",
        C: "Nie – ide o trestný čin."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 208 TZ – Týranie blízkej osoby" },
        { id: "B", text: "§ 156 TZ – Ublíženie" },
        { id: "C", text: "§ 364 TZ – Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o dlhodobé psychické a fyzické násilie.",
      vysvetlenie_nespravne: {
        B: "Nie – ublíženie nerieši dlhodobosť.",
        C: "Nie – výtržníctvo nie je primárne."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Konanie bolo dlhodobé a intenzívne" },
        { id: "B", text: "Išlo len o jednorazový incident" },
        { id: "C", text: "Nešlo o blízku osobu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "8 mesiacov = dlhodobosť.",
      vysvetlenie_nespravne: {
        B: "Nie – bolo to opakované.",
        C: "Nie – partnerka je blízka osoba."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre týranie" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Väzba – kolúzna" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Treba vykonať rozsiahle dokazovanie.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nie je jednoduchý.",
        C: "Väzba je možná, ale nie automatická."
      }
    }
  ],

  C: `
Ide o zločin týrania blízkej osoby podľa § 208 TZ.
`,

  tagy: ["MIRAC", "domáce násilie", "týranie", "interaktívny tréning"]
},
{
  id: "TC8",
  nazov: "Tréningový prípad 8",
  obtiaznost: "stredná",

  M: `
Vodič nedodržal bezpečnú vzdialenosť a narazil do vozidla pred sebou.
Poškodený utrpel zranenia s liečením 10 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Ublíženie na zdraví z nedbanlivosti" },
        { id: "B", text: "Ťažká ujma" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Liečenie nad 7 dní = trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o trvalé následky.",
        C: "Nie – liečenie nad 7 dní vylučuje priestupok."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 157 TZ – Ublíženie z nedbanlivosti" },
        { id: "B", text: "§ 155 TZ – Ťažká ujma" },
        { id: "C", text: "§ 364 TZ – Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o nedbanlivosť pri vedení vozidla.",
      vysvetlenie_nespravne: {
        B: "Nie – chýbajú trvalé následky.",
        C: "Nie – nejde o výtržníctvo."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Vodič porušil povinnosť → nedbanlivosť" },
        { id: "B", text: "Konanie bolo úmyselné" },
        { id: "C", text: "Nešlo o zranenie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nedodržanie vzdialenosti = porušenie povinnosti.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o úmysel.",
        C: "Nie – liečenie 10 dní = zranenie."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Väzba" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Treba zabezpečiť znalecký posudok.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nie je okamžite jasný.",
        C: "Nie – nie sú dôvody väzby."
      }
    }
  ],

  C: `
Ide o prečin ublíženia na zdraví z nedbanlivosti podľa § 157 TZ.
`,

  tagy: ["MIRAC", "dopravná nehoda", "nedbanlivosť", "interaktívny tréning"]
},
{
  id: "TC9",
  nazov: "Tréningový prípad 9",
  obtiaznost: "ťažká",

  M: `
Obvinený použil fyzické násilie a držal poškodenú za ruky, čím ju donútil k súloži.
Poškodená bola v šoku a nedokázala sa brániť.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Znásilnenie podľa § 199 TZ" },
        { id: "B", text: "Sexuálne násilie podľa § 200 TZ" },
        { id: "C", text: "Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Došlo k donúteniu k súloži.",
      vysvetlenie_nespravne: {
        B: "Nie – § 200 rieši iné formy sexuálneho nátlaku.",
        C: "Nie – ide o závažný sexuálny trestný čin."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 199 TZ – Znásilnenie" },
        { id: "B", text: "§ 200 TZ – Sexuálne násilie" },
        { id: "C", text: "§ 364 TZ – Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Došlo k donúteniu k súloži.",
      vysvetlenie_nespravne: {
        B: "Nie – § 200 sa nepoužije pri súloži.",
        C: "Nie – výtržníctvo nie je relevantné."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Poškodená bola donútená násilím" },
        { id: "B", text: "Poškodená súhlasila" },
        { id: "C", text: "Nešlo o sexuálny styk" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Fyzické násilie = donútenie.",
      vysvetlenie_nespravne: {
        B: "Nie – neexistoval súhlas.",
        C: "Nie – išlo o súlož."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre znásilnenie" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Väzba – preventívna" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o závažný trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nie je jednoduchý.",
        C: "Väzba je možná, ale nie automatická."
      }
    }
  ],

  C: `
Ide o zločin znásilnenia podľa § 199 TZ.
`,

  tagy: ["MIRAC", "znásilnenie", "násilie", "interaktívny tréning"]
},
/* ============================================================
   TC10 – Všeobecné ohrozenie
============================================================ */
{
  id: "TC10",
  nazov: "Tréningový prípad 10",
  obtiaznost: "ťažká",

  M: `
Obvinený úmyselne založil požiar v bytovom dome.
V ohrození bolo 25 osôb.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Úmyselné všeobecné ohrozenie podľa § 284 TZ" },
        { id: "B", text: "Nedbanlivostné všeobecné ohrozenie podľa § 285 TZ" },
        { id: "C", text: "Výtržníctvo podľa § 364 TZ" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úmyselné založenie požiaru s ohrozením viacerých osôb = úmyselné všeobecné ohrozenie.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nebol z nedbanlivosti.",
        C: "Nie – výtržníctvo nerieši ohrozenie viacerých osôb požiarom."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 284 TZ – Úmyselné všeobecné ohrozenie" },
        { id: "B", text: "§ 285 TZ – Nedbanlivostné všeobecné ohrozenie" },
        { id: "C", text: "§ 179 TZ – Poškodzovanie cudzej veci" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Rozhodujúci je úmysel a ohrozenie viacerých osôb.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o nedbanlivosť.",
        C: "Nie – poškodzovanie cudzej veci nerieši všeobecné ohrozenie."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Požiar ohrozil životy viacerých osôb" },
        { id: "B", text: "Ohrozená bola len jedna osoba" },
        { id: "C", text: "Nešlo o reálne ohrozenie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "25 osôb v bytovom dome = typický prípad všeobecného ohrozenia.",
      vysvetlenie_nespravne: {
        B: "Nie – ohrozených bolo viac osôb.",
        C: "Nie – požiar v obytnom dome je reálne ohrozenie."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je najvhodnejší?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre všeobecné ohrozenie" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Väzba – preventívna" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o závažný zločin, vyžaduje sa riadne vyšetrovanie.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok nie je jednoduchý.",
        C: "Väzba môže prichádzať do úvahy, ale nie je automatická."
      }
    }
  ],

  C: `
Ide o zločin úmyselného všeobecného ohrozenia podľa § 284 TZ.
`,

  tagy: ["MIRAC", "všeobecné ohrozenie", "požiar", "interaktívny tréning"]
},

/* ============================================================
   TC11 – Korupcia (aktívne/pasívne podplácanie)
============================================================ */
{
  id: "TC11",
  nazov: "Tréningový prípad 11",
  obtiaznost: "stredná",

  M: `
Obvinený ponúkol policajtovi 50 € za to, aby neuložil pokutu za dopravný priestupok.
Policajt úplatok odmietol.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Aktívne podplácanie podľa § 333 TZ" },
        { id: "B", text: "Pasívne podplácanie podľa § 329 TZ" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ponúknutie úplatku verejnému činiteľovi = aktívne podplácanie.",
      vysvetlenie_nespravne: {
        B: "Nie – pasívne podplácanie rieši prijatie úplatku.",
        C: "Nie – ide o trestný čin korupcie."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 333 TZ – Podplácanie" },
        { id: "B", text: "§ 328 TZ – Prijímanie úplatku" },
        { id: "C", text: "§ 326 TZ – Zneužitie právomoci" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Obvinený úplatok ponúkol, nie prijal.",
      vysvetlenie_nespravne: {
        B: "Nie – policajt úplatok neprijal.",
        C: "Nie – policajt nezneužil právomoc, úplatok odmietol."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Úplatok bol ponúknutý v súvislosti s právomocou policajta" },
        { id: "B", text: "Úplatok nesúvisel s právomocou" },
        { id: "C", text: "Nešlo o úplatok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Policajt mal rozhodovať o pokute – jasná súvislosť s právomocou.",
      vysvetlenie_nespravne: {
        B: "Nie – úplatok mal ovplyvniť výkon právomoci.",
        C: "Nie – peniaze ponúknuté za neuloženie pokuty sú úplatok."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre podplácanie" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Korupčné trestné činy sa štandardne riešia trestným stíhaním.",
      vysvetlenie_nespravne: {
        B: "Nie – treba preveriť všetky okolnosti.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o prečin aktívneho podplácania podľa § 333 TZ.
`,

  tagy: ["MIRAC", "korupcia", "podplácanie", "verejný činiteľ", "interaktívny tréning"]
},

/* ============================================================
   TC12 – Neoprávnené ozbrojovanie
============================================================ */
{
  id: "TC12",
  nazov: "Tréningový prípad 12",
  obtiaznost: "stredná",

  M: `
Obvinený prechovával doma upravenú krátku strelnú zbraň bez akéhokoľvek povolenia.
Zbraň bola plne funkčná.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Neoprávnené ozbrojovanie podľa § 294 TZ" },
        { id: "B", text: "Poškodzovanie cudzej veci" },
        { id: "C", text: "Priestupok proti verejnému poriadku" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Držba strelných zbraní bez povolenia = neoprávnené ozbrojovanie.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o poškodenie veci.",
        C: "Nie – ide o trestný čin, nie priestupok."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 294 TZ – Neoprávnené ozbrojovanie" },
        { id: "B", text: "Zákon o strelných zbraniach a strelive – priestupok" },
        { id: "C", text: "§ 360 TZ – Nebezpečné vyhrážanie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin podľa TZ, nie len o priestupok.",
      vysvetlenie_nespravne: {
        B: "Nie – množstvo a povaha zbrane zakladajú trestný čin.",
        C: "Nie – nešlo o vyhrážanie."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Obvinený držal strelnú zbraň bez povolenia" },
        { id: "B", text: "Zbraň bola nefunkčná" },
        { id: "C", text: "Obvinený mal platné povolenie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Plne funkčná zbraň bez povolenia = naplnenie skutkovej podstaty.",
      vysvetlenie_nespravne: {
        B: "Nie – zbraň bola funkčná.",
        C: "Nie – povolenie nemal."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre neoprávnené ozbrojovanie" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o závažný bezpečnostný delikt.",
      vysvetlenie_nespravne: {
        B: "Nie – treba vykonať riadne dokazovanie.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o prečin neoprávneného ozbrojovania podľa § 294 TZ.
`,

  tagy: ["MIRAC", "zbraň", "neoprávnené ozbrojovanie", "interaktívny tréning"]
},

/* ============================================================
   TC13 – Zneužitie právomoci verejného činiteľa
============================================================ */
{
  id: "TC13",
  nazov: "Tréningový prípad 13",
  obtiaznost: "ťažká",

  M: `
Policajt úmyselne nezasiahol proti známemu, ktorý spáchal trestný čin,
aby mu umožnil uniknúť trestnému stíhaniu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Zneužitie právomoci verejného činiteľa podľa § 326 TZ" },
        { id: "B", text: "Nesprávny úradný postup" },
        { id: "C", text: "Priestupok policajta" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úmyselné nekonanie v rozpore s právomocou = zneužitie právomoci.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin, nie len nesprávny postup.",
        C: "Nie – nejde o priestupok."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 326 TZ – Zneužitie právomoci verejného činiteľa" },
        { id: "B", text: "§ 327 TZ – Marenie úlohy verejným činiteľom" },
        { id: "C", text: "§ 326 ods. 3 – kvalifikovaná skutková podstata" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Základná skutková podstata zneužitia právomoci.",
      vysvetlenie_nespravne: {
        B: "Nie – marenie úlohy má iné znaky.",
        C: "Kvalifikácia závisí od škody a následkov – tu riešime základ."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Policajt nekonal v súlade so svojou právomocou úmyselne" },
        { id: "B", text: "Policajt konal z nedbanlivosti" },
        { id: "C", text: "Policajt nemal právomoc zasiahnuť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úmyselné nekonanie v prospech známeho = zneužitie právomoci.",
      vysvetlenie_nespravne: {
        B: "Nie – išlo o úmysel.",
        C: "Nie – policajt právomoc mal."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre zneužitie právomoci" },
        { id: "B", text: "Vyriešiť vec disciplinárne" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin verejného činiteľa.",
      vysvetlenie_nespravne: {
        B: "Nie – disciplinárne konanie nevylučuje trestnú zodpovednosť.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o zločin zneužitia právomoci verejného činiteľa podľa § 326 TZ.
`,

  tagy: ["MIRAC", "verejný činiteľ", "zneužitie právomoci", "interaktívny tréning"]
},

/* ============================================================
   TC14 – Mladistvý páchateľ
============================================================ */
{
  id: "TC14",
  nazov: "Tréningový prípad 14",
  obtiaznost: "stredná",

  M: `
Mladistvý vo veku 16 rokov spáchal krádež v hodnote 150 €.
Doteraz nebol trestaný, pochádza z funkčného rodinného prostredia.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Trestná zodpovednosť mladistvého" },
        { id: "B", text: "Nepríčetnosť" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Mladistvý (14–18 rokov) je trestne zodpovedný, ak je rozumovo a mravne vyspelý.",
      vysvetlenie_nespravne: {
        B: "Nie – nič nenasvedčuje nepríčetnosti.",
        C: "Nie – hodnota 150 € = trestný čin."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenia použijeme?",
      moznosti: [
        { id: "A", text: "§ 97–121 TZ – Mladiství" },
        { id: "B", text: "§ 12 TZ – Nepríčetnosť" },
        { id: "C", text: "§ 212 TZ – Krádež bez osobitného režimu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Mladiství majú osobitný režim trestania.",
      vysvetlenie_nespravne: {
        B: "Nie – nepríčetnosť nie je daná.",
        C: "Nie – treba aplikovať osobitnú úpravu pre mladistvých."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Uprednostní sa výchovné pôsobenie a miernejší trest" },
        { id: "B", text: "Uloží sa rovnaký trest ako dospelému" },
        { id: "C", text: "Mladistvý nie je trestne zodpovedný" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri mladistvých sa kladie dôraz na výchovu.",
      vysvetlenie_nespravne: {
        B: "Nie – tresty sú miernejšie.",
        C: "Nie – je trestne zodpovedný."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný a sankčný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie, zvážiť výchovné opatrenia" },
        { id: "B", text: "Vec odložiť" },
        { id: "C", text: "Uložiť nepodmienečný trest odňatia slobody" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri prvopáchateľovi mladistvom sa preferujú výchovné opatrenia.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok napĺňa znaky trestného činu.",
        C: "Nie – nepodmienečný trest je krajným riešením."
      }
    }
  ],

  C: `
Ide o prečin krádeže spáchaný mladistvým, u ktorého sa uplatní osobitný režim podľa § 97–121 TZ.
`,

  tagy: ["MIRAC", "mladistvý", "výchovné opatrenia", "interaktívny tréning"]
},

/* ============================================================
   TC15 – Tresty a sankcie – výber trestu
============================================================ */
{
  id: "TC15",
  nazov: "Tréningový prípad 15",
  obtiaznost: "stredná",

  M: `
Páchateľ spáchal prečin krádeže, doteraz nebol trestaný, priznal sa a nahradil škodu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo je hlavným právnym problémom?",
      moznosti: [
        { id: "A", text: "Výber druhu a výmery trestu" },
        { id: "B", text: "Otázka viny" },
        { id: "C", text: "Otázka príčetnosti" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vina je jasná, rieši sa primeraný trest.",
      vysvetlenie_nespravne: {
        B: "Nie – páchateľ sa priznal.",
        C: "Nie – nič nenasvedčuje nepríčetnosti."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenia sú kľúčové?",
      moznosti: [
        { id: "A", text: "§ 32–60 TZ – Tresty" },
        { id: "B", text: "§ 12 TZ – Nepríčetnosť" },
        { id: "C", text: "§ 125 TZ – Škoda" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Výber trestu sa riadi všeobecnou časťou TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nepríčetnosť nie je problém.",
        C: "Nie – škoda je už nahradená."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Možno uložiť podmienečný trest odňatia slobody" },
        { id: "B", text: "Nutné uložiť nepodmienečný trest" },
        { id: "C", text: "Nie je možné uložiť trest" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Prvopáchateľ, priznanie, náhrada škody = priestor pre podmienečný trest.",
      vysvetlenie_nespravne: {
        B: "Nie – nepodmienečný trest je neprimerane prísny.",
        C: "Nie – trestný čin bol spáchaný."
      }
    },

    {
      typ: "P",
      otazka: "Aký trest je najprimeranejší?",
      moznosti: [
        { id: "A", text: "Podmienečný trest odňatia slobody" },
        { id: "B", text: "Nepodmienečný trest odňatia slobody" },
        { id: "C", text: "Peňažný trest bez ďalšieho" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Podmienečný trest spĺňa účel trestu pri prvopáchateľovi.",
      vysvetlenie_nespravne: {
        B: "Nie – príliš prísne.",
        C: "Sám osebe nemusí postačovať na preventívny účinok."
      }
    }
  ],

  C: `
Primeraným trestom je podmienečný trest odňatia slobody podľa § 49 a nasl. TZ.
`,

  tagy: ["MIRAC", "tresty", "výber trestu", "interaktívny tréning"]
},

/* ============================================================
   TC16 – Väzba a zadržanie
============================================================ */
{
  id: "TC16",
  nazov: "Tréningový prípad 16",
  obtiaznost: "stredná",

  M: `
Obvinený je stíhaný pre závažný majetkový trestný čin, hrozí mu vysoký trest.
Opakovane sa vyhrážal svedkom, že ak budú vypovedať, „postará sa o nich“.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký procesný problém ide?",
      moznosti: [
        { id: "A", text: "Dôvody väzby" },
        { id: "B", text: "Otázka príslušnosti súdu" },
        { id: "C", text: "Otázka viny" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Rieši sa, či sú splnené dôvody väzby.",
      vysvetlenie_nespravne: {
        B: "Nie – príslušnosť nie je sporná.",
        C: "Nie – teraz sa rieši len procesné opatrenie."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenia sú rozhodujúce?",
      moznosti: [
        { id: "A", text: "§ 71–88 TP – Väzba" },
        { id: "B", text: "§ 119–150 TP – Dôkazy" },
        { id: "C", text: "§ 309–397 TP – Opravné prostriedky" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Väzba je upravená v § 71 a nasl. TP.",
      vysvetlenie_nespravne: {
        B: "Nie – dôkazy sú iná časť.",
        C: "Nie – opravné prostriedky riešia iné otázky."
      }
    },

    {
      typ: "A",
      otazka: "Aký dôvod väzby prichádza do úvahy?",
      moznosti: [
        { id: "A", text: "Kolúzna väzba – ovplyvňovanie svedkov" },
        { id: "B", text: "Úteková väzba" },
        { id: "C", text: "Preventívna väzba" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vyhrážky svedkom = typický dôvod kolúznej väzby.",
      vysvetlenie_nespravne: {
        B: "Úteková väzba by vyžadovala riziko úteku.",
        C: "Preventívna rieši pokračovanie v trestnej činnosti."
      }
    },

    {
      typ: "P",
      otazka: "Aký postup je primeraný?",
      moznosti: [
        { id: "A", text: "Navrhnúť vzatie do väzby z kolúznych dôvodov" },
        { id: "B", text: "Ponechať obvineného na slobode" },
        { id: "C", text: "Nahradiť väzbu dohľadom probačného úradníka" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri aktívnom ovplyvňovaní svedkov je väzba opodstatnená.",
      vysvetlenie_nespravne: {
        B: "Nie – hrozí marenie dokazovania.",
        C: "Dohľad nemusí postačovať pri takomto správaní."
      }
    }
  ],

  C: `
Sú splnené dôvody kolúznej väzby podľa § 71 ods. 1 písm. b) TP.
`,

  tagy: ["MIRAC", "väzba", "kolúzna väzba", "interaktívny tréning"]
},

/* ============================================================
   TC17 – Skrátené konanie
============================================================ */
{
  id: "TC17",
  nazov: "Tréningový prípad 17",
  obtiaznost: "ľahká",

  M: `
Obvinený bol pristihnutý pri krádeži v obchode, skutok bol zaznamenaný kamerou,
hodnota tovaru bola 70 €, obvinený sa priznal.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký procesný problém ide?",
      moznosti: [
        { id: "A", text: "Možnosť skráteného konania" },
        { id: "B", text: "Otázka príslušnosti" },
        { id: "C", text: "Otázka viny" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Rieši sa, či sú splnené podmienky skráteného konania.",
      vysvetlenie_nespravne: {
        B: "Nie – príslušnosť nie je problém.",
        C: "Nie – vina je jasná."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenia sú rozhodujúce?",
      moznosti: [
        { id: "A", text: "§ 199–211 TP – Skrátené konanie" },
        { id: "B", text: "§ 71–88 TP – Väzba" },
        { id: "C", text: "§ 309–397 TP – Opravné prostriedky" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Skrátené konanie je upravené v § 199 a nasl. TP.",
      vysvetlenie_nespravne: {
        B: "Nie – to je úprava väzby.",
        C: "Nie – opravné prostriedky riešia iné otázky."
      }
    },

    {
      typ: "A",
      otazka: "Sú splnené podmienky skráteného konania?",
      moznosti: [
        { id: "A", text: "Áno – skutok je jasný, dôkazy sú okamžite dostupné" },
        { id: "B", text: "Nie – skutok je zložitý" },
        { id: "C", text: "Nie – ide o zločin" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Kamera, priznanie, nízka škoda = typický prípad skráteného konania.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je jednoduchý.",
        C: "Nie – ide o prečin, nie zločin."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Viesť skrátené konanie a podať návrh na potrestanie" },
        { id: "B", text: "Začať klasické vyšetrovanie" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Skrátené konanie je efektívne a zákonné riešenie.",
      vysvetlenie_nespravne: {
        B: "Nie – zbytočne zdĺhavé.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Sú splnené podmienky skráteného konania podľa § 199–211 TP.
`,

  tagy: ["MIRAC", "skrátené konanie", "procesný postup", "interaktívny tréning"]
},

/* ============================================================
   TC18 – Opravné prostriedky
============================================================ */
{
  id: "TC18",
  nazov: "Tréningový prípad 18",
  obtiaznost: "stredná",

  M: `
Obvinený bol odsúdený okresným súdom, nesúhlasí s výmerou trestu.
Rozsudok ešte nie je právoplatný.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký procesný problém ide?",
      moznosti: [
        { id: "A", text: "Riadny opravný prostriedok – odvolanie" },
        { id: "B", text: "Mimoriadny opravný prostriedok – dovolanie" },
        { id: "C", text: "Obnova konania" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Rozsudok nie je právoplatný → prichádza do úvahy odvolanie.",
      vysvetlenie_nespravne: {
        B: "Nie – dovolanie sa podáva proti právoplatným rozhodnutiam.",
        C: "Nie – obnova rieši nové skutočnosti po právoplatnosti."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenia sú rozhodujúce?",
      moznosti: [
        { id: "A", text: "§ 309–322 TP – Odvolanie" },
        { id: "B", text: "§ 368–392 TP – Dovolanie" },
        { id: "C", text: "§ 397–404 TP – Obnova konania" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Odvolanie je riadny opravný prostriedok.",
      vysvetlenie_nespravne: {
        B: "Nie – dovolanie je mimoriadny prostriedok.",
        C: "Nie – obnova rieši iné situácie."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený môže podať odvolanie proti výroku o treste" },
        { id: "B", text: "Obvinený môže podať dovolanie" },
        { id: "C", text: "Obvinený nemá žiadnu možnosť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Odvolanie môže smerovať aj len proti trestu.",
      vysvetlenie_nespravne: {
        B: "Nie – dovolanie až po právoplatnosti.",
        C: "Nie – riadny opravný prostriedok je k dispozícii."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný krok je vhodný?",
      moznosti: [
        { id: "A", text: "Podať odvolanie v zákonnej lehote" },
        { id: "B", text: "Čakať na právoplatnosť a potom podať dovolanie" },
        { id: "C", text: "Nepodnikať žiadne kroky" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Odvolanie je základný prostriedok na preskúmanie trestu.",
      vysvetlenie_nespravne: {
        B: "Nie – zbytočne by sa stratil riadny opravný prostriedok.",
        C: "Nie – obvinený má možnosť brániť sa."
      }
    }
  ],

  C: `
Obvinený môže podať odvolanie proti výroku o treste podľa § 309 a nasl. TP.
`,

  tagy: ["MIRAC", "odvolanie", "opravné prostriedky", "interaktívny tréning"]
},

/* ============================================================
   TC19 – Dôkazy – zákonnosť a prípustnosť
============================================================ */
{
  id: "TC19",
  nazov: "Tréningový prípad 19",
  obtiaznost: "stredná",

  M: `
Polícia vykonala domovú prehliadku bez súhlasu súdu a bez splnenia zákonných podmienok
pre neodkladný úkon. Zaistila pri tom drogy a hotovosť.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Zákonnosť a prípustnosť dôkazov" },
        { id: "B", text: "Otázka príslušnosti" },
        { id: "C", text: "Otázka viny" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Rieši sa, či sú dôkazy získané zákonným spôsobom.",
      vysvetlenie_nespravne: {
        B: "Nie – príslušnosť nie je problém.",
        C: "Nie – najprv treba riešiť použiteľnosť dôkazov."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenia sú rozhodujúce?",
      moznosti: [
        { id: "A", text: "§ 119–150 TP – Dôkazy" },
        { id: "B", text: "§ 71–88 TP – Väzba" },
        { id: "C", text: "§ 309–397 TP – Opravné prostriedky" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dôkazné právo je upravené v § 119 a nasl. TP.",
      vysvetlenie_nespravne: {
        B: "Nie – to je úprava väzby.",
        C: "Nie – opravné prostriedky riešia iné otázky."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa posúdi získanie dôkazov?",
      moznosti: [
        { id: "A", text: "Domová prehliadka bola nezákonná → dôkazy sú neprípustné" },
        { id: "B", text: "Domová prehliadka bola v poriadku" },
        { id: "C", text: "Na zákonnosti nezáleží" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Bez súhlasu súdu a bez podmienok neodkladnosti je úkon nezákonný.",
      vysvetlenie_nespravne: {
        B: "Nie – chýbal súhlas a podmienky.",
        C: "Nie – zákonnosť je základom prípustnosti dôkazov."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Navrhnúť vylúčenie dôkazov ako neprípustných" },
        { id: "B", text: "Dôkazy normálne použiť" },
        { id: "C", text: "Ignorovať problém zákonnosti" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonne získané dôkazy sú neprípustné.",
      vysvetlenie_nespravne: {
        B: "Nie – porušilo by to právo na spravodlivý proces.",
        C: "Nie – zákonnosť je kľúčová."
      }
    }
  ],

  C: `
Dôkazy získané nezákonnou domovou prehliadkou sú neprípustné podľa § 119 a nasl. TP.
`,

  tagy: ["MIRAC", "dôkazy", "prípustnosť", "nezákonný dôkaz", "interaktívny tréning"]
},

/* ============================================================
   TC20 – Trestná zodpovednosť právnických osôb
============================================================ */
{
  id: "TC20",
  nazov: "Tréningový prípad 20",
  obtiaznost: "ťažká",

  M: `
Konateľ spoločnosti úmyselne skrátil dane v prospech firmy o 40 000 €.
Konanie vykonal v mene a v prospech právnickej osoby.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Trestná zodpovednosť právnickej osoby" },
        { id: "B", text: "Len trestná zodpovednosť fyzickej osoby" },
        { id: "C", text: "Len občianskoprávna zodpovednosť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Konateľ konal v mene a v prospech spoločnosti.",
      vysvetlenie_nespravne: {
        B: "Nie – zodpovedná je aj PO.",
        C: "Nie – ide o trestnoprávnu zodpovednosť."
      }
    },

    {
      typ: "R",
      otazka: "Ktorý predpis je rozhodujúci?",
      moznosti: [
        { id: "A", text: "Zákon č. 91/2016 Z. z. o trestnej zodpovednosti PO" },
        { id: "B", text: "Len Trestný zákon" },
        { id: "C", text: "Občiansky zákonník" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Trestná zodpovednosť PO je upravená osobitným zákonom.",
      vysvetlenie_nespravne: {
        B: "Nie – treba aplikovať aj osobitný zákon.",
        C: "Nie – občianske právo rieši iný typ zodpovednosti."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Konateľ je osobou v postavení, konal v prospech PO" },
        { id: "B", text: "Konanie nemá súvis s činnosťou PO" },
        { id: "C", text: "PO nemôže byť trestne zodpovedná" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Konateľ je typická osoba v postavení podľa zákona.",
      vysvetlenie_nespravne: {
        B: "Nie – konanie súvisí s daňovou povinnosťou firmy.",
        C: "Nie – zákon výslovne upravuje zodpovednosť PO."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný a sankčný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie aj voči PO a zvážiť peňažný trest" },
        { id: "B", text: "Stíhať len konateľa" },
        { id: "C", text: "Riešiť vec len daňovým konaním" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri splnení podmienok zodpovedá aj PO, sankcie sú špecifické.",
      vysvetlenie_nespravne: {
        B: "Nie – ignorovalo by to zodpovednosť PO.",
        C: "Nie – daňové konanie nevylučuje trestnú zodpovednosť."
      }
    }
  ],

  C: `
Právnická osoba nesie trestnú zodpovednosť podľa zákona č. 91/2016 Z. z., keďže konateľ konal v jej mene a v jej prospech.
`,

  tagy: ["MIRAC", "právnická osoba", "zodpovednosť PO", "interaktívny tréning"]
},
{
  id: "TC21",
  nazov: "Tréningový prípad 21",
  obtiaznost: "stredná",

  M: `
Obvinený sa susedovi vyhrážal, že ho „zabije a podpáli mu dom“. 
Sused sa vyhrážok reálne obával.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Nebezpečné vyhrážanie podľa § 360 TZ" },
        { id: "B", text: "Výtržníctvo" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vyhrážka smrťou + vyvolanie strachu = § 360 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – výtržníctvo nerieši vyhrážky smrťou.",
        C: "Nie – ide o trestný čin."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 360 TZ – Nebezpečné vyhrážanie" },
        { id: "B", text: "§ 364 TZ – Výtržníctvo" },
        { id: "C", text: "§ 155 TZ – Ťažká ujma" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vyhrážky smrťou patria pod § 360 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – výtržníctvo je doplnkové.",
        C: "Nie – nejde o ujmu."
      }
    },
{
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Poškodený sa vyhrážok reálne obával" },
        { id: "B", text: "Poškodený sa neobával" },
        { id: "C", text: "Nešlo o vyhrážku" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Reálny strach je podmienkou skutkovej podstaty.",
      vysvetlenie_nespravne: {
        B: "Nie – strach bol preukázaný.",
        C: "Nie – vyhrážka bola jasná."
      }
    },

    {
      typ: "P",
      otazka: "Aký postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre nebezpečné vyhrážanie" },
        { id: "B", text: "Riešiť vec ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vyhrážky smrťou sú trestným činom.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o priestupok.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o prečin nebezpečného vyhrážania podľa § 360 TZ.
`,

  tagy: ["MIRAC", "vyhrážanie", "násilie", "interaktívny tréning"]
},
{
  id: "TC22",
  nazov: "Tréningový prípad 22",
  obtiaznost: "stredná",

  M: `
Obvinený zamkol svoju partnerku v byte na 3 hodiny, aby jej zabránil odísť.
Poškodená nemala možnosť byt opustiť.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Obmedzovanie osobnej slobody podľa § 183 TZ" },
        { id: "B", text: "Týranie blízkej osoby" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zamknutie osoby = obmedzenie osobnej slobody.",
      vysvetlenie_nespravne: {
        B: "Nie – týranie vyžaduje dlhodobosť.",
        C: "Nie – ide o trestný čin."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 183 TZ – Obmedzovanie osobnej slobody" },
        { id: "B", text: "§ 208 TZ – Týranie" },
        { id: "C", text: "§ 364 TZ – Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o krátkodobé, ale úmyselné obmedzenie slobody.",
      vysvetlenie_nespravne: {
        B: "Nie – chýba dlhodobosť.",
        C: "Nie – výtržníctvo nie je relevantné."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Poškodená nemohla byt opustiť" },
        { id: "B", text: "Poškodená mohla odísť" },
        { id: "C", text: "Nešlo o obmedzenie slobody" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Fyzické zabránenie odchodu = obmedzenie slobody.",
      vysvetlenie_nespravne: {
        B: "Nie – bola zamknutá.",
        C: "Nie – išlo o obmedzenie."
      }
    },

    {
      typ: "P",
      otazka: "Aký postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie" },
        { id: "B", text: "Riešiť vec ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin proti slobode.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o prečin obmedzovania osobnej slobody podľa § 183 TZ.
`,

  tagy: ["MIRAC", "osobná sloboda", "násilie", "interaktívny tréning"]
},
{
  id: "TC23",
  nazov: "Tréningový prípad 23",
  obtiaznost: "ťažká",

  M: `
Obvinený sa dopustil sexuálnych dotykov na 13-ročnom dieťati.
Dieťa bolo v jeho starostlivosti.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Sexuálne zneužívanie podľa § 201 TZ" },
        { id: "B", text: "Znásilnenie" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Sexuálne dotyky na dieťati <15 rokov = § 201 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o súlož.",
        C: "Nie – ide o trestný čin."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 201 TZ – Sexuálne zneužívanie" },
        { id: "B", text: "§ 199 TZ – Znásilnenie" },
        { id: "C", text: "§ 364 TZ – Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Sexuálne dotyky na dieťati patria pod § 201 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o súlož.",
        C: "Nie – výtržníctvo nie je relevantné."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Dieťa malo menej ako 15 rokov" },
        { id: "B", text: "Dieťa malo viac ako 18 rokov" },
        { id: "C", text: "Nešlo o sexuálne konanie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vek <15 rokov = absolútna ochrana.",
      vysvetlenie_nespravne: {
        B: "Nie – malo 13 rokov.",
        C: "Nie – išlo o sexuálne dotyky."
      }
    },

    {
      typ: "P",
      otazka: "Aký postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre sexuálne zneužívanie" },
        { id: "B", text: "Riešiť vec ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o jeden z najzávažnejších trestných činov.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o zločin sexuálneho zneužívania podľa § 201 TZ.
`,

  tagy: ["MIRAC", "sexuálne zneužívanie", "dieťa", "interaktívny tréning"]
},
{
  id: "TC24",
  nazov: "Tréningový prípad 24",
  obtiaznost: "stredná",

  M: `
Obvinený neplatil výživné na dieťa 10 mesiacov, hoci mal príjem a bol schopný platiť.
Dlžná suma je 1 200 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Zanedbanie povinnej výživy podľa § 207 TZ" },
        { id: "B", text: "Podvod" },
        { id: "C", text: "Priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Neplatenie výživného >3 mesiace = trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o uvedenie do omylu.",
        C: "Nie – ide o trestný čin."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 207 TZ – Zanedbanie povinnej výživy" },
        { id: "B", text: "§ 212 TZ – Krádež" },
        { id: "C", text: "§ 221 TZ – Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o neplnenie zákonnej povinnosti výživy.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o zmocnenie veci.",
        C: "Nie – nejde o uvedenie do omylu."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený bol schopný platiť, ale neplatil" },
        { id: "B", text: "Obvinený nemal žiadny príjem" },
        { id: "C", text: "Nešlo o povinnosť výživy" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Schopnosť platiť je rozhodujúca.",
      vysvetlenie_nespravne: {
        B: "Nie – mal príjem.",
        C: "Nie – išlo o zákonnú povinnosť."
      }
    },

    {
      typ: "P",
      otazka: "Aký postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie" },
        { id: "B", text: "Riešiť vec ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Neplatenie >3 mesiace = trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o prečin zanedbania povinnej výživy podľa § 207 TZ.
`,

  tagy: ["MIRAC", "výživné", "rodina", "interaktívny tréning"]
},
{
  id: "TC25",
  nazov: "Tréningový prípad 25",
  obtiaznost: "ťažká",

  M: `
Obvinený bodol poškodeného nožom do ruky počas hádky.
Poškodený utrpel zranenie s liečením 14 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Ublíženie na zdraví so zbraňou (§ 156 + § 138 písm. a)" },
        { id: "B", text: "Priestupok" },
        { id: "C", text: "Ťažká ujma" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Použitie noža = zbraň = kvalifikácia.",
      vysvetlenie_nespravne: {
        B: "Nie – liečenie >7 dní.",
        C: "Nie – chýbajú trvalé následky."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenia použijeme?",
      moznosti: [
        { id: "A", text: "§ 156 TZ + § 138 TZ" },
        { id: "B", text: "§ 155 TZ" },
        { id: "C", text: "§ 364 TZ" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Použitie zbrane zvyšuje závažnosť.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o ťažkú ujmu.",
        C: "Nie – výtržníctvo nie je primárne."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Použitie noža je použitie zbrane podľa § 138 TZ" },
        { id: "B", text: "Nešlo o zbraň" },
        { id: "C", text: "Nešlo o ublíženie na zdraví" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nôž je zbraň podľa zákona, čo zvyšuje závažnosť skutku.",
      vysvetlenie_nespravne: {
        B: "Nie – nôž je zbraň.",
        C: "Nie – liečenie 14 dní = ublíženie na zdraví."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre kvalifikované ublíženie na zdraví" },
        { id: "B", text: "Skrátené konanie" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Použitie zbrane vylučuje skrátené konanie a vyžaduje riadne vyšetrovanie.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je príliš závažný.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o prečin ublíženia na zdraví podľa § 156 TZ s kvalifikáciou podľa § 138 písm. a) TZ (spáchané so zbraňou).
`,

  tagy: ["MIRAC", "ublíženie na zdraví", "zbraň", "interaktívny tréning"]
},
{
  id: "TC26",
  nazov: "Tréningový prípad 26",
  obtiaznost: "ťažká",

  M: `
Obvinený vložil na svoj účet 18 000 € v hotovosti, pričom vedel, že pochádzajú z drogovej trestnej činnosti jeho známeho.
Následne ich previedol na zahraničný účet.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Legalizácia príjmu z trestnej činnosti (§ 233 TZ)" },
        { id: "B", text: "Podvod" },
        { id: "C", text: "Sprenevera" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vklad hotovosti z trestnej činnosti + prevod = legalizácia.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o uvedenie do omylu.",
        C: "Nie – nejde o zverenú vec."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 233 TZ – Legalizácia príjmu" },
        { id: "B", text: "§ 212 TZ – Krádež" },
        { id: "C", text: "§ 221 TZ – Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Konanie smerovalo k zakrytiu pôvodu peňazí.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o zmocnenie veci.",
        C: "Nie – nejde o uvedenie do omylu."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený vedel o pôvode peňazí a konal s cieľom ich zakryť" },
        { id: "B", text: "Obvinený nevedel o pôvode peňazí" },
        { id: "C", text: "Nešlo o žiadnu finančnú operáciu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vedomosť o pôvode je základným znakom skutkovej podstaty.",
      vysvetlenie_nespravne: {
        B: "Nie – vedomosť bola preukázaná.",
        C: "Nie – išlo o vklad aj prevod."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre legalizáciu príjmu" },
        { id: "B", text: "Riešiť vec ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o závažný hospodársky trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o legalizáciu príjmu z trestnej činnosti podľa § 233 TZ.
`,

  tagy: ["MIRAC", "legalizácia", "hospodárska kriminalita", "interaktívny tréning"]
},
{
  id: "TC27",
  nazov: "Tréningový prípad 27",
  obtiaznost: "stredná",

  M: `
Obvinený pri žiadosti o úver uviedol nepravdivé údaje o príjme a predložil falošné potvrdenie o zamestnaní.
Banka mu poskytla úver 12 000 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Úverový podvod podľa § 222 TZ" },
        { id: "B", text: "Krádež" },
        { id: "C", text: "Sprenevera" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nepravdivé údaje pri úvere = úverový podvod.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o zmocnenie veci.",
        C: "Nie – vec nebola zverená."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 222 TZ – Úverový podvod" },
        { id: "B", text: "§ 221 TZ – Podvod" },
        { id: "C", text: "§ 270 TZ – Falšovanie listín" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Špeciálna skutková podstata pre úverové konania.",
      vysvetlenie_nespravne: {
        B: "Nie – použije sa špeciálna SP.",
        C: "Nie – falšovanie je len prostriedok."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený uviedol nepravdivé údaje s cieľom získať úver" },
        { id: "B", text: "Údaje boli pravdivé" },
        { id: "C", text: "Úver nebol poskytnutý" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Falošné potvrdenie = úmyselné uvedenie do omylu banky.",
      vysvetlenie_nespravne: {
        B: "Nie – údaje boli falošné.",
        C: "Nie – úver bol poskytnutý."
      }
    },

    {
      typ: "P",
      otazka: "Aký postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre úverový podvod" },
        { id: "B", text: "Riešiť ako občianskoprávny spor" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o typický úverový podvod.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o úverový podvod podľa § 222 TZ.
`,

  tagy: ["MIRAC", "úverový podvod", "hospodárska kriminalita", "interaktívny tréning"]
},
{
  id: "TC28",
  nazov: "Tréningový prípad 28",
  obtiaznost: "ťažká",

  M: `
Obvinený previedol svoj majetok na príbuzného, aby sa vyhol exekúcii a znemožnil uspokojenie veriteľa.
Hodnota prevedeného majetku bola 25 000 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Poškodzovanie veriteľa podľa § 239 TZ" },
        { id: "B", text: "Sprenevera" },
        { id: "C", text: "Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úmyselné zmenšenie majetku pred exekúciou = poškodzovanie veriteľa.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o zverenú vec.",
        C: "Nie – nejde o uvedenie do omylu."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 239 TZ – Poškodzovanie veriteľa" },
        { id: "B", text: "§ 221 TZ – Podvod" },
        { id: "C", text: "§ 212 TZ – Krádež" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o špeciálnu SP pre konanie proti veriteľovi.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o uvedenie do omylu.",
        C: "Nie – nejde o zmocnenie veci."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený previedol majetok s cieľom zmariť uspokojenie veriteľa" },
        { id: "B", text: "Obvinený majetok nepreviedol" },
        { id: "C", text: "Nešlo o žiadne dlhy" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úmysel zmariť uspokojenie je rozhodujúci.",
      vysvetlenie_nespravne: {
        B: "Nie – prevod bol preukázaný.",
        C: "Nie – existoval veriteľ."
      }
    },

    {
      typ: "P",
      otazka: "Aký postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre poškodzovanie veriteľa" },
        { id: "B", text: "Riešiť ako občianskoprávny spor" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o typický prípad poškodzovania veriteľa.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o poškodzovanie veriteľa podľa § 239 TZ.
`,

  tagy: ["MIRAC", "veriteľ", "hospodárska kriminalita", "interaktívny tréning"]
},
{
  id: "TC29",
  nazov: "Tréningový prípad 29",
  obtiaznost: "stredná",

  M: `
Obvinený mal viacerých veriteľov, ale zaplatil len jednému, ktorý bol jeho príbuzný.
Ostatní veritelia zostali neuspokojení.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Zvýhodňovanie veriteľa podľa § 240 TZ" },
        { id: "B", text: "Poškodzovanie veriteľa" },
        { id: "C", text: "Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Uprednostnenie jedného veriteľa = zvýhodňovanie.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o zmenšenie majetku.",
        C: "Nie – nejde o uvedenie do omylu."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 240 TZ – Zvýhodňovanie veriteľa" },
        { id: "B", text: "§ 239 TZ – Poškodzovanie veriteľa" },
        { id: "C", text: "§ 221 TZ – Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o uprednostnenie jedného veriteľa pred ostatnými.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o prevod majetku.",
        C: "Nie – nejde o uvedenie do omylu."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený uprednostnil jedného veriteľa" },
        { id: "B", text: "Všetci veritelia boli uspokojení" },
        { id: "C", text: "Nešlo o žiadne dlhy" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Uprednostnenie je základným znakom skutkovej podstaty.",
      vysvetlenie_nespravne: {
        B: "Nie – ostatní veritelia neboli uspokojení.",
        C: "Nie – dlhy existovali."
      }
    },

    {
      typ: "P",
      otazka: "Aký postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre zvýhodňovanie veriteľa" },
        { id: "B", text: "Riešiť ako občianskoprávny spor" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin podľa § 240 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o zvýhodňovanie veriteľa podľa § 240 TZ.
`,

  tagy: ["MIRAC", "veritelia", "hospodárska kriminalita", "interaktívny tréning"]
},
{
  id: "TC30",
  nazov: "Tréningový prípad 30",
  obtiaznost: "stredná",

  M: `
Obvinený vykonával stavebné práce pre verejnosť bez živnostenského oprávnenia.
Za tri mesiace získal príjem 9 000 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Neoprávnené podnikanie podľa § 251 TZ" },
        { id: "B", text: "Podvod" },
        { id: "C", text: "Krádež" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Podnikanie bez oprávnenia = neoprávnené podnikanie.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o uvedenie do omylu.",
        C: "Nie – nejde o zmocnenie veci."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 251 TZ – Neoprávnené podnikanie" },
        { id: "B", text: "§ 222 TZ – Úverový podvod" },
        { id: "C", text: "§ 212 TZ – Krádež" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o podnikanie bez zákonného oprávnenia.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o úver.",
        C: "Nie – nejde o zmocnenie veci."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený vykonával činnosť bez oprávnenia" },
        { id: "B", text: "Obvinený mal platné oprávnenie" },
        { id: "C", text: "Nešlo o podnikanie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Chýbajúce živnostenské oprávnenie je rozhodujúce.",
      vysvetlenie_nespravne: {
        B: "Nie – oprávnenie nemal.",
        C: "Nie – vykonával stavebné práce za odplatu."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre neoprávnené podnikanie" },
        { id: "B", text: "Riešiť ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin podľa § 251 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – rozsah činnosti a príjem sú vysoké.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o prečin neoprávneného podnikania podľa § 251 TZ.
`,

  tagy: ["MIRAC", "neoprávnené podnikanie", "hospodárska kriminalita", "interaktívny tréning"]
},
{
  id: "TC31",
  nazov: "Tréningový prípad 31",
  obtiaznost: "stredná",

  M: `
Obvinenému bol uložený zákaz viesť motorové vozidlá na 24 mesiacov.
Napriek tomu bol pristihnutý pri vedení osobného auta počas bežnej cestnej kontroly.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Marenie výkonu úradného rozhodnutia podľa § 348 TZ" },
        { id: "B", text: "Ohrozovanie pod vplyvom návykovej látky" },
        { id: "C", text: "Priestupok proti bezpečnosti cestnej premávky" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Porušenie zákazu činnosti = marenie výkonu rozhodnutia.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o alkohol ani drogy.",
        C: "Nie – zákaz činnosti je trestnoprávna sankcia."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré ustanovenie použijeme?",
      moznosti: [
        { id: "A", text: "§ 348 TZ – Marenie výkonu úradného rozhodnutia" },
        { id: "B", text: "§ 289 TZ – Ohrozovanie pod vplyvom" },
        { id: "C", text: "§ 22 zákona o priestupkoch" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Porušenie zákazu činnosti je trestný čin podľa § 348 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o návykovú látku.",
        C: "Nie – nejde o priestupok, ale o trestný čin."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený vedome porušil uložený zákaz činnosti" },
        { id: "B", text: "Obvinený o zákaze nevedel" },
        { id: "C", text: "Nešlo o vedenie motorového vozidla" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zákaz bol právoplatný a obvinený ho porušil.",
      vysvetlenie_nespravne: {
        B: "Nie – zákaz sa vždy oznamuje a doručuje.",
        C: "Nie – bol pristihnutý pri vedení auta."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre marenie výkonu rozhodnutia" },
        { id: "B", text: "Riešiť ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Porušenie zákazu činnosti je trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – priestupok to nie je.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o prečin marenia výkonu úradného rozhodnutia podľa § 348 TZ.
`,

  tagy: ["MIRAC", "marenie výkonu", "zákaz činnosti", "interaktívny tréning"]
},
{
  id: "TC32",
  nazov: "Tréningový prípad 32",
  obtiaznost: "stredná",

  M: `
Poškodený sa v noci vlámal do dvora obvineného. 
Obvinený ho pristihol a udrel kovovou tyčou, pričom mu spôsobil zlomeninu ruky. 
Útočník bol neozbrojený a snažil sa utiecť.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Nutná obrana (§ 25 TZ)" },
        { id: "B", text: "Krajná núdza (§ 24 TZ)" },
        { id: "C", text: "Ublíženie na zdraví (§ 156 TZ)" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o útok na domov – typická situácia nutnej obrany.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o odvracanie nebezpečenstva, ale útoku.",
        C: "Nie – najprv treba posúdiť obranu."
      }
    },

    {
      typ: "R",
      otazka: "Je obrana v medziach nutnej obrany?",
      moznosti: [
        { id: "A", text: "Nie, útočník utekal → obrana bola zjavne neprimeraná" },
        { id: "B", text: "Áno, každý útok na obydlie umožňuje akúkoľvek obranu" },
        { id: "C", text: "Áno, obrana bola primeraná" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Útočník už neútočil, ale utekal – obrana bola zjavne neprimeraná.",
      vysvetlenie_nespravne: {
        B: "Nie – obrana musí byť primeraná intenzite útoku.",
        C: "Nie – útočník sa už nesnažil pokračovať v útoku."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje?",
      moznosti: [
        { id: "A", text: "Obvinený prekročil medze nutnej obrany" },
        { id: "B", text: "Obvinený konal v krajne núdzi" },
        { id: "C", text: "Nešlo o obranu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Útok už netrval – obrana bola neprimeraná.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o krajnú núdzu.",
        C: "Nie – obrana existovala, ale bola neprimeraná."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre ublíženie na zdraví" },
        { id: "B", text: "Vec odložiť – išlo o nutnú obranu" },
        { id: "C", text: "Riešiť ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Prekročenie medzí nutnej obrany = trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – obrana bola neprimeraná.",
        C: "Nie – ide o trestný čin."
      }
    }
  ],

  C: `
Obvinený konal v nutnej obrane, ale prekročil jej medze. 
Ide o prečin ublíženia na zdraví podľa § 156 TZ.
`,

  tagy: ["MIRAC", "nutná obrana", "prekročenie medzí", "interaktívny tréning"]
},
{
  id: "TC33",
  nazov: "Tréningový prípad 33",
  obtiaznost: "stredná",

  M: `
Obvinený počas poľovačky vystrelil na pohyb v kroví, pretože si myslel, že ide o diviaka. 
V skutočnosti zasiahol iného poľovníka, ktorému spôsobil zranenie s liečením 10 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Skutkový omyl (§ 19 TZ)" },
        { id: "B", text: "Právny omyl (§ 20 TZ)" },
        { id: "C", text: "Úmyselné ublíženie na zdraví" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Páchateľ sa mýlil o skutočnosti – myslel si, že strieľa na zviera.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o omyl o protiprávnosti.",
        C: "Nie – chýba úmysel."
      }
    },

    {
      typ: "R",
      otazka: "Ako omyl vplýva na trestnú zodpovednosť?",
      moznosti: [
        { id: "A", text: "Vylučuje úmysel, ale nevylučuje nedbanlivosť" },
        { id: "B", text: "Vylučuje akúkoľvek trestnú zodpovednosť" },
        { id: "C", text: "Nemá žiadny vplyv" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Skutkový omyl vylučuje úmysel, ale páchateľ môže byť nedbanlivý.",
      vysvetlenie_nespravne: {
        B: "Nie – môže ísť o nedbanlivosť.",
        C: "Nie – omyl má zásadný význam."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Ide o ublíženie na zdraví z nedbanlivosti (§ 157 TZ)" },
        { id: "B", text: "Ide o úmyselné ublíženie na zdraví" },
        { id: "C", text: "Nejde o žiadny trestný čin" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Páchateľ si mal overiť, na čo strieľa – porušil povinnosť poľovníka.",
      vysvetlenie_nespravne: {
        B: "Nie – úmysel neexistuje.",
        C: "Nie – následok a nedbanlivosť sú preukázané."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre ublíženie na zdraví z nedbanlivosti" },
        { id: "B", text: "Vec odložiť" },
        { id: "C", text: "Riešiť ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Liečenie 10 dní = trestný čin, nie priestupok.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – liečenie nad 7 dní vylučuje priestupok."
      }
    }
  ],

  C: `
Ide o ublíženie na zdraví z nedbanlivosti podľa § 157 TZ. 
Skutkový omyl vylúčil úmysel, nie nedbanlivosť.
`,

  tagy: ["MIRAC", "skutkový omyl", "nedbanlivosť", "interaktívny tréning"]
},
{
  id: "TC34",
  nazov: "Tréningový prípad 34",
  obtiaznost: "stredná",

  M: `
Obvinený pestoval na záhrade 15 rastlín konopy. 
Tvrdil, že si myslel, že pestovanie pre vlastnú potrebu je legálne, pretože to počul od známeho.
Rastliny obsahovali THC nad zákonný limit.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Právny omyl (§ 20 TZ)" },
        { id: "B", text: "Skutkový omyl (§ 19 TZ)" },
        { id: "C", text: "Neoprávnené nakladanie s omamnými látkami (§ 171 TZ)" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Páchateľ sa mýlil o tom, čo zákon dovoľuje – to je právny omyl.",
      vysvetlenie_nespravne: {
        B: "Nie – nemýlil sa o skutočnosti, ale o práve.",
        C: "Nie – najprv treba posúdiť omyl."
      }
    },

    {
      typ: "R",
      otazka: "Je právny omyl ospravedlniteľný?",
      moznosti: [
        { id: "A", text: "Nie, neznalosť zákona neospravedlňuje (§ 20 ods. 1 TZ)" },
        { id: "B", text: "Áno, ak mu to povedal známy" },
        { id: "C", text: "Áno, ak si to myslel úprimne" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Právny omyl je ospravedlniteľný len vo výnimočných prípadoch – toto ním nie je.",
      vysvetlenie_nespravne: {
        B: "Nie – informácia od známeho nie je relevantná.",
        C: "Nie – subjektívna viera nestačí."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Ide o úmyselné neoprávnené nakladanie s omamnými látkami" },
        { id: "B", text: "Ide o nedbanlivostný trestný čin" },
        { id: "C", text: "Nejde o trestný čin" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Právny omyl neospravedlňuje → úmysel zostáva zachovaný.",
      vysvetlenie_nespravne: {
        B: "Nie – páchateľ vedel, že pestuje konopu.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 171 TZ" },
        { id: "B", text: "Vec odložiť – omyl bol ospravedlniteľný" },
        { id: "C", text: "Riešiť ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pestovanie konopy s THC nad limit je trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – omyl nebol ospravedlniteľný.",
        C: "Nie – nejde o priestupok."
      }
    }
  ],

  C: `
Ide o úmyselné neoprávnené nakladanie s omamnými látkami podľa § 171 TZ.
Právny omyl nebol ospravedlniteľný.
`,

  tagy: ["MIRAC", "právny omyl", "drogy", "interaktívny tréning"]
},
{
  id: "TC35",
  nazov: "Tréningový prípad 35",
  obtiaznost: "stredná",

  M: `
Obvinený počas troch týždňov opakovane kradol v tom istom supermarkete. 
Každý týždeň odcudzil tovar v hodnote 40–60 €. 
Konanie malo rovnaký spôsob, rovnaký objekt útoku a jednotiaci zámer.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Pokračovací trestný čin (§ 122 TZ)" },
        { id: "B", text: "Viacčinný súbeh trestných činov" },
        { id: "C", text: "Zločin krádeže" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Opakované útoky rovnakého druhu s jednotiacim zámerom = pokračovací čin.",
      vysvetlenie_nespravne: {
        B: "Nie – súbeh je len ak chýba jednotiaci zámer.",
        C: "Nie – škoda je malá, nejde o zločin."
      }
    },

    {
      typ: "R",
      otazka: "Spĺňa konanie znaky pokračovacieho trestného činu?",
      moznosti: [
        { id: "A", text: "Áno – rovnaký spôsob, objekt aj zámer" },
        { id: "B", text: "Nie – každý čin je samostatný" },
        { id: "C", text: "Nie – časový odstup to vylučuje" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Jednotiaci zámer a rovnaký spôsob sú rozhodujúce.",
      vysvetlenie_nespravne: {
        B: "Nie – jednotiaci zámer bol preukázaný.",
        C: "Nie – časový odstup 1 týždeň je úplne v norme."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Ide o jeden pokračovací prečin krádeže" },
        { id: "B", text: "Ide o tri samostatné prečiny" },
        { id: "C", text: "Ide o priestupky" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Útoky sa spoja do jedného pokračovacieho činu.",
      vysvetlenie_nespravne: {
        B: "Nie – jednotiaci zámer spája útoky.",
        C: "Nie – opakované konanie zvyšuje závažnosť."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Viesť jedno trestné stíhanie pre pokračovací čin" },
        { id: "B", text: "Začať tri samostatné trestné stíhania" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pokračovací čin sa posudzuje ako jeden skutok.",
      vysvetlenie_nespravne: {
        B: "Nie – to by bolo v rozpore s § 122 TZ.",
        C: "Nie – ide o trestný čin."
      }
    }
  ],

  C: `
Ide o jeden pokračovací prečin krádeže podľa § 122 TZ.
`,

  tagy: ["MIRAC", "pokračovací čin", "krádež", "interaktívny tréning"]
},
{
  id: "TC36",
  nazov: "Tréningový prípad 36",
  obtiaznost: "ťažká",

  M: `
Obvinený na verejnom priestranstve fyzicky napadol poškodeného, udrel ho päsťou do tváre 
a spôsobil mu zranenie s liečením 9 dní. 
Útok sa odohral pred viacerými osobami.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Zdanlivý súbeh – výtržníctvo vs. ublíženie na zdraví" },
        { id: "B", text: "Skutkový omyl" },
        { id: "C", text: "Krajná núdza" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o typickú situáciu, kde sa rieši konzumácia skutkových podstát.",
      vysvetlenie_nespravne: {
        B: "Nie – páchateľ sa nemýlil o skutočnosti.",
        C: "Nie – nejde o odvracanie nebezpečenstva."
      }
    },

    {
      typ: "R",
      otazka: "Ako sa posúdi vzťah medzi § 155/156 TZ a § 364 TZ?",
      moznosti: [
        { id: "A", text: "Výtržníctvo je konzumované ublížením na zdraví" },
        { id: "B", text: "Ide o reálny súbeh oboch trestných činov" },
        { id: "C", text: "Ublíženie na zdraví je konzumované výtržníctvom" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ak je násilie prostriedkom spôsobenia zranenia, výtržníctvo sa pohltí.",
      vysvetlenie_nespravne: {
        B: "Nie – násilie smerovalo k spôsobeniu ujmy.",
        C: "Nie – výtržníctvo je všeobecnejšie."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Ide o jeden trestný čin – ublíženie na zdraví (§ 156 TZ)" },
        { id: "B", text: "Ide o dva trestné činy v súbehu" },
        { id: "C", text: "Ide len o výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Výtržníctvo je v tomto prípade len sprievodným javom násilia.",
      vysvetlenie_nespravne: {
        B: "Nie – konzumácia vylučuje súbeh.",
        C: "Nie – došlo k zraneniu s liečením nad 7 dní."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre ublíženie na zdraví" },
        { id: "B", text: "Začať stíhanie pre výtržníctvo" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Primárnym následkom je ujma na zdraví – to určuje právnu kvalifikáciu.",
      vysvetlenie_nespravne: {
        B: "Nie – výtržníctvo je konzumované.",
        C: "Nie – ide o trestný čin."
      }
    }
  ],

  C: `
Ide o zdanlivý súbeh – výtržníctvo je konzumované ublížením na zdraví. 
Správna kvalifikácia: § 156 TZ.
`,

  tagy: ["MIRAC", "zdanlivý súbeh", "konzumácia", "ublíženie na zdraví", "interaktívny tréning"]
},
{
  id: "TC37",
  nazov: "Tréningový prípad 37",
  obtiaznost: "ťažká",

  M: `
A navrhol B, aby spoločne vykradli sklad. 
B súhlasil, ale sám nechcel ísť dnu. 
A presvedčil C, aby mu požičal auto „na súkromné účely“, pričom C netušil o pláne. 
B následne A-ovi poskytol rukavice a baterku. 
A vnikol do skladu a odcudzil tovar za 2 000 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Účastníctvo – organizátor, návodca, pomocník" },
        { id: "B", text: "Pokračovací trestný čin" },
        { id: "C", text: "Krajná núdza" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o typickú situáciu s rôznymi rolami účastníkov.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o opakované útoky.",
        C: "Nie – nejde o odvracanie nebezpečenstva."
      }
    },

    {
      typ: "R",
      otazka: "Ako sa posúdi úloha B?",
      moznosti: [
        { id: "A", text: "B je pomocník – poskytol prostriedky (rukavice, baterku)" },
        { id: "B", text: "B je spolupáchateľ" },
        { id: "C", text: "B nenesie žiadnu zodpovednosť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pomocník poskytuje prostriedky alebo uľahčuje čin.",
      vysvetlenie_nespravne: {
        B: "Nie – spolupáchateľ by musel konať spoločne.",
        C: "Nie – aktívne pomohol."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa posúdi úloha A?",
      moznosti: [
        { id: "A", text: "A je páchateľ – sám vykonal krádež" },
        { id: "B", text: "A je len organizátor" },
        { id: "C", text: "A je len návodca" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "A fyzicky vykonal skutok – je páchateľ.",
      vysvetlenie_nespravne: {
        B: "Nie – organizátor riadi, ale nekoná.",
        C: "Nie – návodca len navádza."
      }
    },

    {
      typ: "P",
      otazka: "Ako sa posúdi úloha C?",
      moznosti: [
        { id: "A", text: "C nenesie trestnú zodpovednosť – nevedel o čine" },
        { id: "B", text: "C je pomocník" },
        { id: "C", text: "C je spolupáchateľ" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pomocník musí vedieť, že pomáha k trestnému činu.",
      vysvetlenie_nespravne: {
        B: "Nie – chýba úmysel pomôcť.",
        C: "Nie – vôbec sa nepodieľal na čine."
      }
    }
  ],

  C: `
A je páchateľ. 
B je pomocník podľa § 21 TZ. 
C nenesie trestnú zodpovednosť, pretože nevedel o trestnom čine.
`,

  tagy: ["MIRAC", "účastníctvo", "pomocník", "návodca", "organizátor", "interaktívny tréning"]
},
{
  id: "TC38",
  nazov: "Tréningový prípad 38",
  obtiaznost: "stredná",

  M: `
Obvinený viedol motorové vozidlo po meste s 1,4 ‰ alkoholu v krvi. 
Pri odbočovaní nedal prednosť chodcovi na priechode a zrazil ho. 
Poškodený utrpel zranenie s liečením 12 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Ohrozovanie pod vplyvom návykovej látky (§ 289 TZ)" },
        { id: "B", text: "Ublíženie na zdraví z nedbanlivosti (§ 157 TZ)" },
        { id: "C", text: "Krajná núdza" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "1,4 ‰ = trestný čin podľa § 289 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – najprv treba riešiť alkohol.",
        C: "Nie – nejde o odvracanie nebezpečenstva."
      }
    },

    {
      typ: "R",
      otazka: "Ako sa posúdi následok na zdraví chodca?",
      moznosti: [
        { id: "A", text: "Ide aj o ublíženie na zdraví z nedbanlivosti (§ 157 TZ)" },
        { id: "B", text: "Ide len o priestupok" },
        { id: "C", text: "Následok nemá právny význam" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Liečenie 12 dní = trestný čin z nedbanlivosti.",
      vysvetlenie_nespravne: {
        B: "Nie – liečenie nad 7 dní = trestný čin.",
        C: "Nie – následok je rozhodujúci."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa posúdi vzťah medzi § 289 a § 157 TZ?",
      moznosti: [
        { id: "A", text: "Ide o reálny súbeh dvoch trestných činov" },
        { id: "B", text: "§ 289 konzumuje § 157" },
        { id: "C", text: "Ide len o jeden trestný čin" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Alkohol + spôsobenie zranenia = dva samostatné trestné činy.",
      vysvetlenie_nespravne: {
        B: "Nie – konzumácia sa tu neuplatní.",
        C: "Nie – sú dva rôzne následky."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 289 aj § 157 TZ" },
        { id: "B", text: "Začať len pre § 289 TZ" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o reálny súbeh – treba stíhať oba trestné činy.",
      vysvetlenie_nespravne: {
        B: "Nie – zranenie je samostatný trestný čin.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o reálny súbeh trestných činov: 
– § 289 TZ (ohrozovanie pod vplyvom návykovej látky), 
– § 157 TZ (ublíženie na zdraví z nedbanlivosti).
`,

  tagy: ["MIRAC", "doprava", "alkohol", "nedbanlivosť", "interaktívny tréning"]
},
{
  id: "TC39",
  nazov: "Tréningový prípad 39",
  obtiaznost: "ťažká",

  M: `
Obvinený dlhodobo (viac ako 1 rok) psychicky a fyzicky týral svoju partnerku. 
Opakovane ju ponižoval, kontroloval jej telefón, zakazoval kontakt s rodinou, 
vyhrážal sa jej a niekoľkokrát ju udrel. 
Poškodená trpela úzkosťami a strachom, bála sa odísť z domácnosti.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Týranie blízkej osoby a zverenej osoby (§ 208 TZ)" },
        { id: "B", text: "Ublíženie na zdraví" },
        { id: "C", text: "Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dlhodobosť + psychické a fyzické násilie = § 208 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o komplexné dlhodobé konanie.",
        C: "Nie – nejde o verejné miesto."
      }
    },

    {
      typ: "R",
      otazka: "Ktoré znaky skutkovej podstaty sú rozhodujúce?",
      moznosti: [
        { id: "A", text: "Dlhodobosť, opakované ponižovanie, kontrola, fyzické útoky" },
        { id: "B", text: "Jednorazový fyzický útok" },
        { id: "C", text: "Len psychické násilie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "§ 208 vyžaduje dlhodobé a intenzívne konanie.",
      vysvetlenie_nespravne: {
        B: "Nie – jednorazový útok nestačí.",
        C: "Nie – psychické násilie samo osebe môže stačiť, ale tu je aj fyzické."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Ide o týranie blízkej osoby podľa § 208 TZ" },
        { id: "B", text: "Ide o priestupok proti občianskemu spolunažívaniu" },
        { id: "C", text: "Ide len o ublíženie na zdraví" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dlhodobosť + psychické + fyzické násilie = typický § 208.",
      vysvetlenie_nespravne: {
        B: "Nie – intenzita a dlhodobosť sú príliš vysoké.",
        C: "Nie – ublíženie je len časť konania."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 208 TZ" },
        { id: "B", text: "Riešiť vec ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o závažný trestný čin proti blízkej osobe.",
      vysvetlenie_nespravne: {
        B: "Nie – intenzita a dlhodobosť vylučujú priestupok.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o trestný čin týrania blízkej osoby podľa § 208 TZ.
Konanie bolo dlhodobé, intenzívne a spôsobovalo psychické utrpenie.
`,

  tagy: ["MIRAC", "týranie", "domáce násilie", "blízka osoba", "interaktívny tréning"]
},
{
  id: "TC40",
  nazov: "Tréningový prípad 40",
  obtiaznost: "stredná",

  M: `
Obvinený prišiel do predajne elektroniky a predstieral, že si chce kúpiť notebook. 
Predavačke povedal, že si ho chce „len vyskúšať pri okne kvôli odleskom“. 
Keď mu ho predavačka podala, obvinený s notebookom ušiel z predajne. 
Hodnota notebooku bola 1 200 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Podvod (§ 221 TZ)" },
        { id: "B", text: "Krádež (§ 212 TZ)" },
        { id: "C", text: "Sprenevera (§ 213 TZ)" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Predavačka mu vec odovzdala dobrovoľne na základe omylu.",
      vysvetlenie_nespravne: {
        B: "Nie – pri krádeži sa páchateľ zmocní veci bez súhlasu.",
        C: "Nie – vec mu nebola zverená na dlhší čas."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o krádež?",
      moznosti: [
        { id: "A", text: "Lebo predavačka mu vec odovzdala dobrovoľne" },
        { id: "B", text: "Lebo notebook bol lacný" },
        { id: "C", text: "Lebo páchateľ nemal úmysel" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Krádež = zmocnenie sa veci bez súhlasu. Tu bol súhlas, ale vylákaný omylom.",
      vysvetlenie_nespravne: {
        B: "Nie – hodnota nemá vplyv na kvalifikáciu.",
        C: "Nie – úmysel bol zjavný."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Ide o podvod – uvedenie do omylu s cieľom získať vec" },
        { id: "B", text: "Ide o krádež – zmocnenie sa veci" },
        { id: "C", text: "Ide o spreneveru – zverená vec" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Páchateľ predstieral kúpu → uviedol predavačku do omylu → získal vec.",
      vysvetlenie_nespravne: {
        B: "Nie – predavačka mu vec odovzdala dobrovoľne.",
        C: "Nie – vec mu nebola zverená na dlhší čas."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre podvod" },
        { id: "B", text: "Začať trestné stíhanie pre krádež" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o typický podvod – vylákanie veci omylom.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o zmocnenie sa veci bez súhlasu.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o trestný čin podvodu podľa § 221 TZ. 
Predavačka odovzdala vec dobrovoľne, ale na základe omylu, ktorý páchateľ úmyselne vyvolal.
`,

  tagy: ["MIRAC", "podvod", "krádež", "omyl", "interaktívny tréning"]
},
{
  id: "TC40",
  nazov: "Tréningový prípad 40",
  obtiaznost: "stredná",

  M: `
Obvinený prišiel do predajne elektroniky a predstieral, že si chce kúpiť notebook. 
Predavačke povedal, že si ho chce „len vyskúšať pri okne kvôli odleskom“. 
Keď mu ho predavačka podala, obvinený s notebookom ušiel z predajne. 
Hodnota notebooku bola 1 200 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Podvod (§ 221 TZ)" },
        { id: "B", text: "Krádež (§ 212 TZ)" },
        { id: "C", text: "Sprenevera (§ 213 TZ)" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Predavačka mu vec odovzdala dobrovoľne na základe omylu.",
      vysvetlenie_nespravne: {
        B: "Nie – pri krádeži sa páchateľ zmocní veci bez súhlasu.",
        C: "Nie – vec mu nebola zverená na dlhší čas."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o krádež?",
      moznosti: [
        { id: "A", text: "Lebo predavačka mu vec odovzdala dobrovoľne" },
        { id: "B", text: "Lebo notebook bol lacný" },
        { id: "C", text: "Lebo páchateľ nemal úmysel" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Krádež = zmocnenie sa veci bez súhlasu. Tu bol súhlas, ale vylákaný omylom.",
      vysvetlenie_nespravne: {
        B: "Nie – hodnota nemá vplyv na kvalifikáciu.",
        C: "Nie – úmysel bol zjavný."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Ide o podvod – uvedenie do omylu s cieľom získať vec" },
        { id: "B", text: "Ide o krádež – zmocnenie sa veci" },
        { id: "C", text: "Ide o spreneveru – zverená vec" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Páchateľ predstieral kúpu → uviedol predavačku do omylu → získal vec.",
      vysvetlenie_nespravne: {
        B: "Nie – predavačka mu vec odovzdala dobrovoľne.",
        C: "Nie – vec mu nebola zverená na dlhší čas."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre podvod" },
        { id: "B", text: "Začať trestné stíhanie pre krádež" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o typický podvod – vylákanie veci omylom.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o zmocnenie sa veci bez súhlasu.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o trestný čin podvodu podľa § 221 TZ. 
Predavačka odovzdala vec dobrovoľne, ale na základe omylu, ktorý páchateľ úmyselne vyvolal.
`,

  tagy: ["MIRAC", "podvod", "krádež", "omyl", "interaktívny tréning"]
},
{
  id: "TC41",
  nazov: "Tréningový prípad 41",
  obtiaznost: "stredná",

  M: `
Počas silnej búrky spadol na cestu veľký strom. 
Obvinený viezol ťažko zranenú osobu do nemocnice a cesta bola neprejazdná. 
Aby mohol pokračovať, vošiel autom na súkromný pozemok vedľa cesty a poškodil plot v hodnote 300 €. 
Majiteľ pozemku podal trestné oznámenie.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Krajná núdza (§ 24 TZ)" },
        { id: "B", text: "Nutná obrana (§ 25 TZ)" },
        { id: "C", text: "Poškodzovanie cudzej veci (§ 245 TZ)" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o odvracanie nebezpečenstva, nie útoku.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o útok, ale o nebezpečenstvo.",
        C: "Nie – najprv treba posúdiť okolnosť vylučujúcu protiprávnosť."
      }
    },

    {
      typ: "R",
      otazka: "Sú splnené podmienky krajne núdze?",
      moznosti: [
        { id: "A", text: "Áno – hrozilo bezprostredné nebezpečenstvo pre život" },
        { id: "B", text: "Nie – škoda na plote bola väčšia než hroziaca škoda" },
        { id: "C", text: "Nie – mohol počkať na pomoc" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Záchrana života má vyššiu hodnotu než majetok.",
      vysvetlenie_nespravne: {
        B: "Nie – život má vyššiu hodnotu než plot.",
        C: "Nie – čakanie by ohrozilo život zraneného."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa norma aplikuje na skutok?",
      moznosti: [
        { id: "A", text: "Konanie je dovolené – ide o krajnú núdzu" },
        { id: "B", text: "Ide o trestný čin poškodzovania cudzej veci" },
        { id: "C", text: "Ide o priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Škoda na plote bola menšia než hroziaca škoda na zdraví/živote.",
      vysvetlenie_nespravne: {
        B: "Nie – konanie bolo dovolené.",
        C: "Nie – nejde o priestupok, ale o okolnosť vylučujúcu protiprávnosť."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Vec odložiť – konanie nie je trestným činom" },
        { id: "B", text: "Začať trestné stíhanie" },
        { id: "C", text: "Riešiť ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Krajná núdza vylučuje protiprávnosť.",
      vysvetlenie_nespravne: {
        B: "Nie – chýba protiprávnosť.",
        C: "Nie – nejde o priestupok."
      }
    }
  ],

  C: `
Ide o krajnú núdzu podľa § 24 TZ. 
Záchrana života má vyššiu hodnotu než škoda na plote, preto konanie nie je trestným činom.
`,

  tagy: ["MIRAC", "krajná núdza", "okolnosti vylučujúce protiprávnosť", "interaktívny tréning"]
},
{
  id: "TC42",
  nazov: "Tréningový prípad 42",
  obtiaznost: "stredná",

  M: `
Obvinený najprv vlámal do garáže a odcudzil bicykel v hodnote 500 €. 
O dve hodiny neskôr v inom meste fyzicky napadol náhodného okoloidúceho, 
ktorému spôsobil zranenie s liečením 8 dní. 
Oba skutky spolu nijako nesúviseli.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Skutočný súbeh trestných činov" },
        { id: "B", text: "Pokračovací trestný čin" },
        { id: "C", text: "Zdanlivý súbeh" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dva úplne odlišné skutky bez jednotiaceho zámeru = skutočný súbeh.",
      vysvetlenie_nespravne: {
        B: "Nie – chýba jednotiaci zámer a rovnaký spôsob konania.",
        C: "Nie – skutky sa navzájom nepohltia."
      }
    },

    {
      typ: "R",
      otazka: "Ako sa posúdi prvý skutok?",
      moznosti: [
        { id: "A", text: "Krádež vlámaním (§ 212 ods. 2 TZ)" },
        { id: "B", text: "Podvod" },
        { id: "C", text: "Sprenevera" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vlámanie + odcudzenie veci = kvalifikovaná krádež.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o uvedenie do omylu.",
        C: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa posúdi druhý skutok?",
      moznosti: [
        { id: "A", text: "Ublíženie na zdraví (§ 156 TZ)" },
        { id: "B", text: "Výtržníctvo" },
        { id: "C", text: "Krajná núdza" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Liečenie 8 dní = ublíženie na zdraví.",
      vysvetlenie_nespravne: {
        B: "Nie – primárny je následok na zdraví.",
        C: "Nie – nešlo o odvracanie nebezpečenstva."
      }
    },

    {
      typ: "P",
      otazka: "Ako sa posúdi vzťah medzi skutkami?",
      moznosti: [
        { id: "A", text: "Ide o skutočný súbeh – dva samostatné trestné činy" },
        { id: "B", text: "Ide o pokračovací čin" },
        { id: "C", text: "Ide o zdanlivý súbeh" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Skutky sú úplne odlišné, oddelené časom aj miestom.",
      vysvetlenie_nespravne: {
        B: "Nie – chýba jednotiaci zámer.",
        C: "Nie – skutky sa navzájom nepohltia."
      }
    }
  ],

  C: `
Ide o skutočný súbeh trestných činov: 
– krádež vlámaním podľa § 212 ods. 2 TZ, 
– ublíženie na zdraví podľa § 156 TZ.
`,

  tagy: ["MIRAC", "skutočný súbeh", "krádež", "ublíženie na zdraví", "interaktívny tréning"]
},
{
  id: "TC43",
  nazov: "Tréningový prípad 43",
  obtiaznost: "stredná",

  M: `
Obvinený úmyselne spôsobil poškodenému ťažkú ujmu na zdraví – zlomeninu stehennej kosti 
s dlhodobým liečením a trvalými následkami. 
Konanie bolo úmyselné, motivované osobným konfliktom.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Rozlíšenie prečinu a zločinu" },
        { id: "B", text: "Skutkový omyl" },
        { id: "C", text: "Krajná núdza" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o kvalifikáciu podľa trestnej sadzby.",
      vysvetlenie_nespravne: {
        B: "Nie – páchateľ sa nemýlil.",
        C: "Nie – nešlo o odvracanie nebezpečenstva."
      }
    },

    {
      typ: "R",
      otazka: "Ako sa kvalifikuje ťažká ujma na zdraví?",
      moznosti: [
        { id: "A", text: "Ako zločin podľa § 155 TZ" },
        { id: "B", text: "Ako prečin podľa § 156 TZ" },
        { id: "C", text: "Ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "§ 155 má sadzbu nad 5 rokov → ide o zločin.",
      vysvetlenie_nespravne: {
        B: "Nie – § 156 rieši ľahšie zranenia.",
        C: "Nie – ťažká ujma nikdy nie je priestupok."
      }
    },

    {
      typ: "A",
      otazka: "Prečo ide o zločin?",
      moznosti: [
        { id: "A", text: "Lebo horná hranica sadzby presahuje 5 rokov" },
        { id: "B", text: "Lebo páchateľ bol agresívny" },
        { id: "C", text: "Lebo poškodený mal trvalé následky" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zločin = úmyselný čin so sadzbou nad 5 rokov.",
      vysvetlenie_nespravne: {
        B: "Nie – agresivita nie je kritérium.",
        C: "Nie – následky sú len znak SP, nie definícia zločinu."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre zločin podľa § 155 TZ" },
        { id: "B", text: "Začať stíhanie pre prečin" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o úmyselný zločin s vysokou sadzbou.",
      vysvetlenie_nespravne: {
        B: "Nie – § 156 sa neuplatní.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o zločin ťažkej ujmy na zdraví podľa § 155 TZ, pretože horná hranica sadzby presahuje 5 rokov.
`,

  tagy: ["MIRAC", "zločin", "prečin", "ťažká ujma", "interaktívny tréning"]
},
{
  id: "TC44",
  nazov: "Tréningový prípad 44",
  obtiaznost: "stredná",

  M: `
Obvinený počas hádky sotil poškodeného, ktorý spadol na zem a udrel sa do hlavy. 
Obvinený tvrdil, že nechcel spôsobiť zranenie, len ho „odstrčiť“. 
Poškodený mal otras mozgu a liečenie 6 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Rozlíšenie úmyslu a nedbanlivosti" },
        { id: "B", text: "Krajná núdza" },
        { id: "C", text: "Skutkový omyl" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Kľúčové je posúdiť vnútorný vzťah páchateľa k následku.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o odvracanie nebezpečenstva.",
        C: "Nie – páchateľ sa nemýlil."
      }
    },

    {
      typ: "R",
      otazka: "Ako sa posúdi úmysel?",
      moznosti: [
        { id: "A", text: "Nepriamy úmysel – bol uzrozumený s možným následkom" },
        { id: "B", text: "Priamy úmysel – chcel spôsobiť zranenie" },
        { id: "C", text: "Nedbanlivosť – nemohol predvídať následok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri fyzickom útoku je páchateľ uzrozumený s možným zranením.",
      vysvetlenie_nespravne: {
        B: "Nie – nechcel zranenie.",
        C: "Nie – následok bol predvídateľný."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Ublíženie na zdraví (§ 156 TZ)" },
        { id: "B", text: "Ublíženie z nedbanlivosti (§ 157 TZ)" },
        { id: "C", text: "Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri fyzickom útoku sa spravidla uplatní nepriamy úmysel.",
      vysvetlenie_nespravne: {
        B: "Nie – páchateľ bol uzrozumený s následkom.",
        C: "Nie – primárny je následok na zdraví."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 156 TZ" },
        { id: "B", text: "Začať stíhanie pre § 157 TZ" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o úmyselné ublíženie na zdraví.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o nedbanlivosť.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o úmyselné ublíženie na zdraví podľa § 156 TZ. 
Páchateľ bol uzrozumený s tým, že odstrčením môže spôsobiť zranenie.
`,

  tagy: ["MIRAC", "úmysel", "nedbanlivosť", "ublíženie", "interaktívny tréning"]
},
{
  id: "TC45",
  nazov: "Tréningový prípad 45",
  obtiaznost: "stredná",

  M: `
Poškodený zveril obvinenému 3 000 € na kúpu stavebného materiálu. 
Obvinený peniaze použil na vlastné účely a materiál nekúpil. 
Tvrdil, že „to neskôr vráti“.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Sprenevera (§ 213 TZ)" },
        { id: "B", text: "Podvod (§ 221 TZ)" },
        { id: "C", text: "Krádež (§ 212 TZ)" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Peniaze mu boli zverené → sprenevera.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o uvedenie do omylu pri odovzdaní.",
        C: "Nie – vec mu bola odovzdaná dobrovoľne."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o podvod?",
      moznosti: [
        { id: "A", text: "Lebo poškodený mu peniaze zveril dobrovoľne bez omylu" },
        { id: "B", text: "Lebo suma bola nízka" },
        { id: "C", text: "Lebo obvinený nemal úmysel" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Podvod vyžaduje omyl – tu išlo o zverenie veci.",
      vysvetlenie_nespravne: {
        B: "Nie – hodnota nerozhoduje.",
        C: "Nie – úmysel bol zjavný."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Sprenevera – prisvojenie si zverenej veci" },
        { id: "B", text: "Podvod – vylákanie veci" },
        { id: "C", text: "Krádež – zmocnenie sa veci" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Peniaze boli zverené → sprenevera.",
      vysvetlenie_nespravne: {
        B: "Nie – nešlo o uvedenie do omylu.",
        C: "Nie – nešlo o zmocnenie sa veci."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre spreneveru" },
        { id: "B", text: "Začať stíhanie pre podvod" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o typickú spreneveru.",
      vysvetlenie_nespravne: {
        B: "Nie – chýba omyl.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o spreneveru podľa § 213 TZ. 
Peniaze boli zverené a páchateľ si ich prisvojil.
`,

  tagy: ["MIRAC", "sprenevera", "podvod", "zverená vec", "interaktívny tréning"]
},
{
  id: "TC46",
  nazov: "Tréningový prípad 46",
  obtiaznost: "stredná",

  M: `
Obvinený mal doma nelegálne držanú strelnú zbraň kategórie B. 
Tvrdil, že ju „zdedil po strýkovi“ a nevedel, že potrebuje povolenie. 
Zbraň bola funkčná.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "A", text: "Neoprávnené nakladanie so zbraňou (§ 294 TZ)" },
        { id: "B", text: "Krajná núdza" },
        { id: "C", text: "Skutkový omyl" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Držba zbrane bez povolenia je trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o odvracanie nebezpečenstva.",
        C: "Nie – neznalosť zákona neospravedlňuje."
      }
    },

    {
      typ: "R",
      otazka: "Je právny omyl ospravedlniteľný?",
      moznosti: [
        { id: "A", text: "Nie – povolenie je zákonná povinnosť" },
        { id: "B", text: "Áno – ak zbraň zdedil" },
        { id: "C", text: "Áno – ak ju nepoužil" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zákon jasne vyžaduje povolenie na držbu zbrane.",
      vysvetlenie_nespravne: {
        B: "Nie – dedenie neospravedlňuje držbu.",
        C: "Nie – samotná držba je trestná."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Neoprávnené nakladanie so zbraňou" },
        { id: "B", text: "Podvod" },
        { id: "C", text: "Krádež" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Držba bez povolenia napĺňa § 294 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o uvedenie do omylu.",
        C: "Nie – zbraň nebola odcudzená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 294 TZ" },
        { id: "B", text: "Vec odložiť" },
        { id: "C", text: "Riešiť ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin ohrozujúci verejnú bezpečnosť.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nejde o priestupok."
      }
    }
  ],

  C: `
Ide o trestný čin neoprávneného nakladania so zbraňou podľa § 294 TZ.
`,

  tagy: ["MIRAC", "zbraň", "neoprávnené nakladanie", "Paneurópska"]
},
{
  id: "TC47",
  nazov: "Tréningový prípad 47",
  obtiaznost: "stredná",

  M: `
Obvinený verejne na sociálnej sieti napísal o poškodenom: 
„Je to zlodej, kradne v práci a berie si veci domov.“ 
Tvrdenie nebolo pravdivé.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Ohováranie (§ 373 TZ)" },
        { id: "B", text: "Výtržníctvo" },
        { id: "C", text: "Krajná núdza" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nepravdivé tvrdenie poškodzujúce povesť = ohováranie.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o verejný poriadok.",
        C: "Nie – nejde o odvracanie nebezpečenstva."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o hodnotiaci úsudok?",
      moznosti: [
        { id: "A", text: "Lebo ide o konkrétne skutkové tvrdenie" },
        { id: "B", text: "Lebo to bolo na internete" },
        { id: "C", text: "Lebo poškodený sa urazil" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Skutkové tvrdenie je overiteľné → ak je nepravdivé, ide o ohováranie.",
      vysvetlenie_nespravne: {
        B: "Nie – médium nerozhoduje.",
        C: "Nie – subjektívny pocit nie je kritérium."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Ohováranie" },
        { id: "B", text: "Ublíženie na zdraví" },
        { id: "C", text: "Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nepravdivé tvrdenie poškodzujúce povesť = § 373 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o fyzickú ujmu.",
        C: "Nie – nejde o majetkový prospech."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre ohováranie" },
        { id: "B", text: "Vec odložiť" },
        { id: "C", text: "Riešiť ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nepravdivé skutkové tvrdenie je trestné.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nejde o priestupok."
      }
    }
  ],

  C: `
Ide o ohováranie podľa § 373 TZ.
`,

  tagy: ["MIRAC", "ohováranie", "česť", "Paneurópska"]
},
{
  id: "TC48",
  nazov: "Tréningový prípad 48",
  obtiaznost: "stredná",

  M: `
Obvinený vošiel bez súhlasu do cudzieho rodinného domu, 
pretože si myslel, že tam býva jeho kamarát. 
Majiteľ domu ho našiel v predsieni.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Neoprávnený zásah do práva k domu (§ 218 TZ)" },
        { id: "B", text: "Krádež" },
        { id: "C", text: "Krajná núdza" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vniknutie do obydlia bez súhlasu = § 218 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nič neodcudzil.",
        C: "Nie – nešlo o nebezpečenstvo."
      }
    },

    {
      typ: "R",
      otazka: "Je skutkový omyl relevantný?",
      moznosti: [
        { id: "A", text: "Nie – mýlil sa o osobe, nie o povolení vstúpiť" },
        { id: "B", text: "Áno – vylučuje trestnosť" },
        { id: "C", text: "Áno – ide o právny omyl" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Musí mať súhlas vlastníka – omyl o osobe nepomáha.",
      vysvetlenie_nespravne: {
        B: "Nie – omyl neodstraňuje protiprávnosť.",
        C: "Nie – nešlo o omyl o práve."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Neoprávnený zásah do práva k domu" },
        { id: "B", text: "Výtržníctvo" },
        { id: "C", text: "Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vniknutie bez súhlasu = § 218 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o verejné miesto.",
        C: "Nie – nešlo o omyl."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 218 TZ" },
        { id: "B", text: "Vec odložiť" },
        { id: "C", text: "Riešiť ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Vniknutie do obydlia je trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nejde o priestupok."
      }
    }
  ],

  C: `
Ide o trestný čin neoprávneného zásahu do práva k domu podľa § 218 TZ.
`,

  tagy: ["MIRAC", "obydlie", "vniknutie", "Paneurópska"]
},
{
  id: "TC49",
  nazov: "Tréningový prípad 49",
  obtiaznost: "stredná",

  M: `
Obvinený vykonával stavebné práce pre verejnosť bez živnostenského oprávnenia. 
Za 2 mesiace získal príjem 4 500 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Neoprávnené podnikanie (§ 251 TZ)" },
        { id: "B", text: "Podvod" },
        { id: "C", text: "Krádež" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Podnikanie bez oprávnenia = § 251 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o omyl.",
        C: "Nie – nejde o zmocnenie veci."
      }
    },

    {
      typ: "R",
      otazka: "Je potrebné živnostenské oprávnenie?",
      moznosti: [
        { id: "A", text: "Áno – stavebné práce sú viazané na oprávnenie" },
        { id: "B", text: "Nie – ak má prax" },
        { id: "C", text: "Nie – ak pracuje sám" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zákon vyžaduje oprávnenie bez ohľadu na prax.",
      vysvetlenie_nespravne: {
        B: "Nie – prax nenahrádza oprávnenie.",
        C: "Nie – počet osôb nerozhoduje."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Neoprávnené podnikanie" },
        { id: "B", text: "Podvod" },
        { id: "C", text: "Sprenevera" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Chýba oprávnenie → § 251 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o uvedenie do omylu.",
        C: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 251 TZ" },
        { id: "B", text: "Riešiť ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Príjem je vysoký → trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – rozsah činnosti je veľký.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o neoprávnené podnikanie podľa § 251 TZ.
`,

  tagy: ["MIRAC", "podnikanie", "živnosť", "Paneurópska"]
},
{
  id: "TC50",
  nazov: "Tréningový prípad 50",
  obtiaznost: "stredná",

  M: `
Obvinený počas hádky úmyselne hodil pohár o zem. 
Pohár sa rozletel a poškodil televízor patriaci poškodenému. 
Škoda bola 350 €.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Poškodzovanie cudzej veci (§ 245 TZ)" },
        { id: "B", text: "Krádež" },
        { id: "C", text: "Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úmyselné poškodenie cudzej veci napĺňa § 245 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – nič neodcudzil.",
        C: "Nie – skutok sa nestal na verejnom priestranstve."
      }
    },

    {
      typ: "R",
      otazka: "Bol úmysel smerovaný na poškodenie veci?",
      moznosti: [
        { id: "A", text: "Áno – bol uzrozumený, že môže poškodiť majetok" },
        { id: "B", text: "Nie – chcel len hodiť pohár" },
        { id: "C", text: "Nie – išlo o náhodu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri hodení predmetu v uzavretom priestore je predvídateľné, že môže dôjsť k poškodeniu vecí.",
      vysvetlenie_nespravne: {
        B: "Nie – úmysel nemusí smerovať na konkrétnu vec, stačí uzrozumenie s následkom.",
        C: "Nie – konanie nebolo náhodné, ale úmyselné."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Poškodzovanie cudzej veci (§ 245 TZ)" },
        { id: "B", text: "Ublíženie na zdraví" },
        { id: "C", text: "Nedbanlivostné konanie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Škoda bola spôsobená úmyselným konaním.",
      vysvetlenie_nespravne: {
        B: "Nie – nedošlo k ujme na zdraví.",
        C: "Nie – konanie bolo úmyselné."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 245 TZ" },
        { id: "B", text: "Riešiť ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Škoda 350 € + úmysel = trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – škoda presahuje hranicu priestupku.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o trestný čin poškodzovania cudzej veci podľa § 245 TZ. 
Páchateľ bol uzrozumený s tým, že jeho konanie môže poškodiť majetok poškodeného.
`,

  tagy: ["MIRAC", "poškodzovanie cudzej veci", "úmysel", "Paneurópska"]
},
{
  id: "TC51",
  nazov: "Tréningový prípad 51",
  obtiaznost: "stredná",

  M: `
Obvinený našiel na ulici stratenú platobnú kartu. 
Namiesto toho, aby ju odovzdal, zaplatil ňou v obchode nákup za 45 €. 
Majiteľ karty transakciu neautorizoval.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Neoprávnené použitie platobného prostriedku (§ 219 TZ)" },
        { id: "B", text: "Krádež" },
        { id: "C", text: "Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Použitie cudzej karty bez súhlasu = § 219 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – kartu nenašiel s úmyslom zmocniť sa jej.",
        C: "Nie – nejde o uvedenie obchodníka do omylu."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o podvod?",
      moznosti: [
        { id: "A", text: "Obchodník nebol uvedený do omylu – platba prebehla technicky správne" },
        { id: "B", text: "Lebo suma bola nízka" },
        { id: "C", text: "Lebo páchateľ nechcel škodiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Podvod vyžaduje omyl – tu bol omyl banky, nie obchodníka.",
      vysvetlenie_nespravne: {
        B: "Nie – výška sumy nerozhoduje.",
        C: "Nie – úmysel bol zjavný."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Neoprávnené použitie platobného prostriedku" },
        { id: "B", text: "Krádež" },
        { id: "C", text: "Sprenevera" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Použitie cudzej karty bez súhlasu = § 219 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – kartu nenašiel s úmyslom zmocniť sa jej.",
        C: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 219 TZ" },
        { id: "B", text: "Riešiť ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin bez ohľadu na výšku škody.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o špeciálnu skutkovú podstatu.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o trestný čin neoprávneného použitia platobného prostriedku podľa § 219 TZ.
`,

  tagy: ["MIRAC", "platobná karta", "neoprávnené použitie", "Paneurópska"]
},
{
  id: "TC52",
  nazov: "Tréningový prípad 52",
  obtiaznost: "stredná",

  M: `
Obvinený pravidelne brával 14-ročného synovca do herne, 
kde mu umožňoval hrať na výherných automatoch. 
Maloletý tam trávil celé večery a zanedbával školu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Ohrozovanie mravnej výchovy mládeže (§ 211 TZ)" },
        { id: "B", text: "Výtržníctvo" },
        { id: "C", text: "Podvod" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Maloletý bol vystavený škodlivému prostrediu.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o verejný poriadok.",
        C: "Nie – nejde o majetkový prospech."
      }
    },

    {
      typ: "R",
      otazka: "Je maloletý chránenou osobou?",
      moznosti: [
        { id: "A", text: "Áno – osoba mladšia ako 18 rokov" },
        { id: "B", text: "Nie – len deti do 15 rokov" },
        { id: "C", text: "Nie – len ak je obeťou násilia" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "§ 211 chráni všetkých mladistvých do 18 rokov.",
      vysvetlenie_nespravne: {
        B: "Nie – hranica je 18 rokov.",
        C: "Nie – násilie nie je podmienkou."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Ohrozovanie mravnej výchovy mládeže" },
        { id: "B", text: "Krádež" },
        { id: "C", text: "Sprenevera" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Maloletý bol vystavený hazardu a zanedbával školu.",
      vysvetlenie_nespravne: {
        B: "Nie – nič neodcudzil.",
        C: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 211 TZ" },
        { id: "B", text: "Riešiť ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin proti mládeži.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o trestný čin ohrozovania mravnej výchovy mládeže podľa § 211 TZ.
`,

  tagy: ["MIRAC", "mládež", "mravná výchova", "Paneurópska"]
},
{
  id: "TC53",
  nazov: "Tréningový prípad 53",
  obtiaznost: "stredná",

  M: `
Obvinený pracoval ako recepčný a neoprávnene si skopíroval občianske preukazy hostí. 
Údaje si uložil do súkromného počítača. 
Hostia o tom nevedeli.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Neoprávnené nakladanie s osobnými údajmi (§ 374 TZ)" },
        { id: "B", text: "Podvod" },
        { id: "C", text: "Krádež" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Osobné údaje boli získané a uchovávané bez súhlasu.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o omyl.",
        C: "Nie – nejde o vecnú krádež."
      }
    },

    {
      typ: "R",
      otazka: "Sú osobné údaje chránené trestným zákonom?",
      moznosti: [
        { id: "A", text: "Áno – ide o chránenú kategóriu údajov" },
        { id: "B", text: "Nie – len GDPR to rieši" },
        { id: "C", text: "Nie – ak neboli zneužité" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "§ 374 chráni osobné údaje aj bez ich zneužitia.",
      vysvetlenie_nespravne: {
        B: "Nie – trestný zákon to rieši tiež.",
        C: "Nie – samotné neoprávnené nakladanie stačí."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Neoprávnené nakladanie s osobnými údajmi" },
        { id: "B", text: "Sprenevera" },
        { id: "C", text: "Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Údaje boli kopírované bez súhlasu.",
      vysvetlenie_nespravne: {
        B: "Nie – údaje nie sú zverené veci.",
        C: "Nie – nejde o verejný poriadok."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 374 TZ" },
        { id: "B", text: "Vec odložiť" },
        { id: "C", text: "Riešiť ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Neoprávnené nakladanie s údajmi je trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nejde o priestupok."
      }
    }
  ],

  C: `
Ide o trestný čin neoprávneného nakladania s osobnými údajmi podľa § 374 TZ.
`,

  tagy: ["MIRAC", "osobné údaje", "Paneurópska"]
},
{
  id: "TC54",
  nazov: "Tréningový prípad 54",
  obtiaznost: "stredná",

  M: `
Obvinený jazdil na bicykli po meste s 2,1 ‰ alkoholu. 
Nebolo spôsobené žiadne zranenie ani škoda. 
Polícia ho zastavila pri bežnej kontrole.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Ohrozovanie pod vplyvom návykovej látky (§ 289 TZ)" },
        { id: "B", text: "Výtržníctvo" },
        { id: "C", text: "Krajná núdza" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Bicykel je vozidlo → § 289 sa uplatní.",
      vysvetlenie_nespravne: {
        B: "Nie – nejde o verejný poriadok.",
        C: "Nie – nešlo o odvracanie nebezpečenstva."
      }
    },

    {
      typ: "R",
      otazka: "Je bicykel vozidlo podľa zákona?",
      moznosti: [
        { id: "A", text: "Áno – zákon o cestnej premávke ho tak definuje" },
        { id: "B", text: "Nie – len motorové vozidlá" },
        { id: "C", text: "Nie – len ak ide rýchlo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Bicykel je vozidlo → § 289 sa vzťahuje aj na cyklistov.",
      vysvetlenie_nespravne: {
        B: "Nie – definícia je širšia.",
        C: "Nie – rýchlosť nerozhoduje."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "A", text: "Ohrozovanie pod vplyvom návykovej látky" },
        { id: "B", text: "Priestupok" },
        { id: "C", text: "Výtržníctvo" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "2,1 ‰ = trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – prekročenie hranice je trestné.",
        C: "Nie – nejde o verejný poriadok."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 289 TZ" },
        { id: "B", text: "Riešiť ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Hranica alkoholu bola prekročená výrazne.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o trestný čin ohrozovania pod vplyvom návykovej látky podľa § 289 TZ.
`,

  tagy: ["MIRAC", "alkohol", "bicykel", "Paneurópska"]
},
{
  id: "TC55",
  nazov: "Tréningový prípad 55",
  obtiaznost: "ťažká",

  M: `
Obvinený pri rekonštrukcii starého domu našiel historický meč z 15. storočia. 
Namiesto ohlásenia nálezu ho predal zberateľovi za 800 €. 
Meč bol podľa odborného posudku kultúrnou pamiatkou.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "A", text: "Neoprávnené nakladanie s kultúrnou pamiatkou (§ 249 TZ)" },
        { id: "B", text: "Krádež (§ 212 TZ)" },
        { id: "C", text: "Podvod (§ 221 TZ)" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Kultúrna pamiatka má osobitnú trestnoprávnu ochranu – § 249 TZ.",
      vysvetlenie_nespravne: {
        B: "Nie – vec nenašiel s úmyslom zmocniť sa cudzej veci.",
        C: "Nie – nejde o uvedenie kupujúceho do omylu o povahe veci."
      }
    },

    {
      typ: "R",
      otazka: "Mal obvinený povinnosť nález ohlásiť?",
      moznosti: [
        { id: "A", text: "Áno – pri náleze kultúrnej pamiatky je povinnosť oznámiť nález orgánom" },
        { id: "B", text: "Nie – nález vždy patrí nálezcovi" },
        { id: "C", text: "Nie – ak za nález dostal zaplatené" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zákon o ochrane pamiatkového fondu ukladá povinnosť nález oznámiť.",
      vysvetlenie_nespravne: {
        B: "Nie – pri pamiatkach platí osobitný režim, nie voľný nález.",
        C: "Nie – predaj neodstraňuje povinnosť oznámiť nález."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje konanie obvineného?",
      moznosti: [
        { id: "A", text: "Neoprávnené nakladanie s kultúrnou pamiatkou" },
        { id: "B", text: "Krádež" },
        { id: "C", text: "Sprenevera" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "S kultúrnou pamiatkou nakladal v rozpore so zákonom a bez oznámenia nálezu.",
      vysvetlenie_nespravne: {
        B: "Nie – vec neodcudzil z cudzej moci.",
        C: "Nie – vec mu nebola zverená, ale nájdená."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 249 TZ" },
        { id: "B", text: "Riešiť vec ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin proti kultúrnemu dedičstvu.",
      vysvetlenie_nespravne: {
        B: "Nie – kultúrna pamiatka je chránená trestným právom.",
        C: "Nie – skutok napĺňa znaky trestného činu."
      }
    }
  ],

  C: `
Ide o trestný čin neoprávneného nakladania s kultúrnou pamiatkou podľa § 249 TZ. 
Obvinený mal povinnosť nález oznámiť, namiesto toho pamiatku predal.
`,

  tagy: ["MIRAC", "kultúrna pamiatka", "pamiatky", "Paneurópska"]
},
{
  id: "TC56",
  nazov: "Tréningový prípad 56",
  obtiaznost: "ťažká",

  M: `
Obvinený sa na diskotéke pohádal s poškodeným. 
Najprv na neho vulgárne kričal a strčil do neho pred ľuďmi. 
Poškodený ho odstrčil späť a obvinený mu následne udrel päsťou do tváre, 
čím mu spôsobil zranenie s liečením 5 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "B", text: "Ublíženie na zdraví (§ 156 TZ)" },
        { id: "A", text: "Výtržníctvo (§ 364 TZ)" },
        { id: "C", text: "Súbeh výtržníctva a ublíženia" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Treba posúdiť, či ide o konzumáciu alebo skutočný súbeh.",
      vysvetlenie_nespravne: {
        A: "Nie – samotné výtržníctvo nestačí, došlo aj k zraneniu.",
        B: "Nie – konanie malo aj verejný výtržnícky charakter."
      }
    },

    {
      typ: "R",
      otazka: "Ako sa posúdi vzťah medzi výtržníctvom a ublížením?",
      moznosti: [
        { id: "C", text: "Ublíženie konzumuje výtržníctvo, ak je útok jeho prirodzeným vyústením" },
        { id: "A", text: "Vždy ide o dva samostatné trestné činy" },
        { id: "B", text: "Vždy ide len o výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ak fyzický útok priamo nadväzuje na výtržnícke správanie, ide o konzumáciu.",
      vysvetlenie_nespravne: {
        A: "Nie – niekedy ide o konzumáciu.",
        B: "Nie – zranenie je samostatný následok."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "B", text: "Ublíženie na zdraví (§ 156 TZ)" },
        { id: "C", text: "Výtržníctvo + ublíženie na zdraví v skutočnom súbehu" },
        { id: "A", text: "Len výtržníctvo" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Útok bol prirodzeným vyústením výtržnosti → výtržníctvo je konzumované.",
      vysvetlenie_nespravne: {
        A: "Nie – zranenie nemožno ignorovať.",
        C: "Nie – nejde o skutočný súbeh, ale o konzumáciu."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "C", text: "Začať trestné stíhanie pre ublíženie na zdraví" },
        { id: "A", text: "Začať stíhanie pre výtržníctvo" },
        { id: "B", text: "Začať stíhanie pre oba činy" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Výtržníctvo je pohltené ublížením.",
      vysvetlenie_nespravne: {
        A: "Nie – zranenie je primárne.",
        B: "Nie – ide o konzumáciu, nie súbeh."
      }
    }
  ],

  C: `
Ide o ublíženie na zdraví podľa § 156 TZ. 
Výtržníctvo je konzumované, pretože fyzický útok bol prirodzeným pokračovaním výtržného správania.
`,

  tagy: ["MIRAC", "výtržníctvo", "ublíženie", "konzumácia", "Paneurópska"]
},
{
  id: "TC57",
  nazov: "Tréningový prípad 57",
  obtiaznost: "stredná",

  M: `
Obvinený vošiel do dvora rodinného domu a pokúsil sa odmontovať kovovú bránu, 
aby ju predal do zberu. 
Pri pokuse o demontáž bránu poškodil, ale neodniesol ju.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "C", text: "Pokus krádeže (§ 212 TZ)" },
        { id: "A", text: "Poškodzovanie cudzej veci (§ 245 TZ)" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Úmysel bol zmocniť sa brány, nie ju poškodiť.",
      vysvetlenie_nespravne: {
        A: "Nie – poškodenie bolo len následkom pokusu o krádež.",
        B: "Nie – nejde o verejný poriadok."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o poškodzovanie cudzej veci?",
      moznosti: [
        { id: "B", text: "Lebo poškodenie bolo len vedľajším následkom pokusu o odcudzenie" },
        { id: "A", text: "Lebo škoda bola nízka" },
        { id: "C", text: "Lebo brána bola stará" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Primárny úmysel bol odcudziť vec.",
      vysvetlenie_nespravne: {
        A: "Nie – výška škody nerozhoduje.",
        C: "Nie – vek veci nie je relevantný."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "C", text: "Pokus krádeže" },
        { id: "A", text: "Poškodzovanie cudzej veci" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Pokus o odcudzenie je trestný aj bez dokonania.",
      vysvetlenie_nespravne: {
        A: "Nie – poškodenie bolo sekundárne.",
        B: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre pokus krádeže" },
        { id: "B", text: "Riešiť ako priestupok" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úmysel bol jasný – zmocniť sa brány.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – skutok napĺňa znaky pokusu."
      }
    }
  ],

  C: `
Ide o pokus krádeže podľa § 212 TZ. 
Poškodenie brány je len sekundárny následok pokusu o odcudzenie.
`,

  tagy: ["MIRAC", "krádež", "poškodzovanie", "pokus", "Paneurópska"]
},
{
  id: "TC58",
  nazov: "Tréningový prípad 58",
  obtiaznost: "stredná",

  M: `
Obvinený použil platobnú kartu svojej bývalej partnerky, 
ktorú si ponechal po rozchode. 
Zaplatil ňou v potravinách nákup za 32 €. 
Pokladníčka kartu normálne prijala, transakcia prešla.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký právny problém riešime?",
      moznosti: [
        { id: "B", text: "Podvod (§ 221 TZ)" },
        { id: "C", text: "Neoprávnené použitie platobného prostriedku (§ 219 TZ)" },
        { id: "A", text: "Krádež (§ 212 TZ)" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Obchodník nie je uvedený do omylu → nejde o podvod.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o zmocnenie sa veci.",
        B: "Nie – chýba omyl obchodníka."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o podvod?",
      moznosti: [
        { id: "A", text: "Obchodník nebol uvedený do omylu – platba prebehla technicky správne" },
        { id: "C", text: "Lebo suma bola nízka" },
        { id: "B", text: "Lebo páchateľ kartu neukradol" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Podvod vyžaduje omyl – tu nebol nikto uvedený do omylu.",
      vysvetlenie_nespravne: {
        B: "Nie – krádež karty nie je podmienkou.",
        C: "Nie – výška sumy nerozhoduje."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "C", text: "Neoprávnené použitie platobného prostriedku" },
        { id: "A", text: "Podvod" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Použitie cudzej karty bez súhlasu = § 219 TZ.",
      vysvetlenie_nespravne: {
        A: "Nie – chýba omyl.",
        B: "Nie – karta mu nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 219 TZ" },
        { id: "C", text: "Riešiť ako priestupok" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o trestný čin bez ohľadu na výšku škody.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nejde o priestupok."
      }
    }
  ],

  C: `
Ide o trestný čin neoprávneného použitia platobného prostriedku podľa § 219 TZ.
`,

  tagy: ["MIRAC", "podvod", "platobná karta", "Paneurópska"]
},
{
  id: "TC59",
  nazov: "Tréningový prípad 59",
  obtiaznost: "stredná",

  M: `
Obvinený počas hádky sotil poškodeného, ktorý spadol na zem a udrel sa do hlavy. 
Obvinený tvrdil, že nechcel spôsobiť zranenie, len ho „odstrčiť“. 
Poškodený mal otras mozgu a liečenie 6 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo je právnym problémom?",
      moznosti: [
        { id: "C", text: "Rozlíšenie úmyslu a nedbanlivosti" },
        { id: "A", text: "Krajná núdza" },
        { id: "B", text: "Skutkový omyl" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Treba určiť vnútorný vzťah páchateľa k následku.",
      vysvetlenie_nespravne: {
        A: "Nie – nešlo o odvracanie nebezpečenstva.",
        B: "Nie – páchateľ sa nemýlil."
      }
    },

    {
      typ: "R",
      otazka: "Ako sa posúdi úmysel?",
      moznosti: [
        { id: "B", text: "Nepriamy úmysel – bol uzrozumený s možným zranením" },
        { id: "A", text: "Priamy úmysel – chcel spôsobiť zranenie" },
        { id: "C", text: "Nedbanlivosť – nemohol predvídať následok" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Pri fyzickom útoku je páchateľ uzrozumený s možným zranením.",
      vysvetlenie_nespravne: {
        A: "Nie – nechcel zranenie.",
        C: "Nie – následok bol predvídateľný."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "C", text: "Ublíženie na zdraví (§ 156 TZ)" },
        { id: "A", text: "Ublíženie z nedbanlivosti (§ 157 TZ)" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Nepriamy úmysel → § 156 TZ.",
      vysvetlenie_nespravne: {
        A: "Nie – páchateľ bol uzrozumený s následkom.",
        B: "Nie – primárny je následok na zdraví."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "B", text: "Začať trestné stíhanie pre § 156 TZ" },
        { id: "A", text: "Začať stíhanie pre § 157 TZ" },
        { id: "C", text: "Vec odložiť" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Ide o úmyselné ublíženie na zdraví.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o nedbanlivosť.",
        C: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o úmyselné ublíženie na zdraví podľa § 156 TZ.
`,

  tagy: ["MIRAC", "úmysel", "nedbanlivosť", "Paneurópska"]
},
{
  id: "TC60",
  nazov: "Tréningový prípad 60",
  obtiaznost: "stredná",

  M: `
Poškodený dal obvinenému 1 500 € na kúpu stavebného materiálu. 
Obvinený peniaze použil na svoje dlhy a materiál nekúpil. 
Tvrdil, že „to neskôr vráti“.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo je právnym problémom?",
      moznosti: [
        { id: "B", text: "Podvod (§ 221 TZ)" },
        { id: "C", text: "Sprenevera (§ 213 TZ)" },
        { id: "A", text: "Krádež (§ 212 TZ)" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Peniaze mu boli zverené → sprenevera.",
      vysvetlenie_nespravne: {
        A: "Nie – vec mu bola odovzdaná dobrovoľne.",
        B: "Nie – chýba omyl poškodeného."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o podvod?",
      moznosti: [
        { id: "C", text: "Poškodený nebol uvedený do omylu – peniaze zveril dobrovoľne" },
        { id: "A", text: "Lebo suma bola nízka" },
        { id: "B", text: "Lebo obvinený nemal úmysel" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Podvod vyžaduje omyl – tu išlo o zverenie veci.",
      vysvetlenie_nespravne: {
        A: "Nie – výška sumy nerozhoduje.",
        B: "Nie – úmysel bol zjavný."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "B", text: "Podvod" },
        { id: "C", text: "Sprenevera" },
        { id: "A", text: "Krádež" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Peniaze boli zverené → sprenevera.",
      vysvetlenie_nespravne: {
        A: "Nie – vec mu bola odovzdaná dobrovoľne.",
        B: "Nie – chýba omyl."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "C", text: "Začať trestné stíhanie pre spreneveru" },
        { id: "A", text: "Začať stíhanie pre podvod" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ide o typickú spreneveru.",
      vysvetlenie_nespravne: {
        A: "Nie – chýba omyl.",
        B: "Nie – skutok je trestný čin."
      }
    }
  ],

  C: `
Ide o spreneveru podľa § 213 TZ.
`,

  tagy: ["MIRAC", "sprenevera", "podvod", "Paneurópska"]
},
{
  id: "TC61",
  nazov: "Tréningový prípad 61",
  obtiaznost: "stredná",

  M: `
Obvinený si bez dovolenia požičal susedove auto, aby si „išiel vybaviť veci“. 
Auto vrátil o tri hodiny neskôr, nepoškodené. 
Sused zavolal políciu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo je právnym problémom?",
      moznosti: [
        { id: "A", text: "Krádež (§ 212 TZ)" },
        { id: "C", text: "Neoprávnené užívanie cudzej veci (§ 216 TZ)" },
        { id: "B", text: "Sprenevera (§ 213 TZ)" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Chýbal úmysel prisvojiť si vec.",
      vysvetlenie_nespravne: {
        A: "Nie – auto chcel vrátiť.",
        B: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o krádež?",
      moznosti: [
        { id: "B", text: "Chýbal úmysel trvalo si prisvojiť vec" },
        { id: "A", text: "Lebo auto bolo lacné" },
        { id: "C", text: "Lebo sused nebol doma" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Krádež vyžaduje úmysel prisvojenia.",
      vysvetlenie_nespravne: {
        A: "Nie – hodnota nerozhoduje.",
        C: "Nie – prítomnosť vlastníka nie je podmienkou."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "C", text: "Neoprávnené užívanie cudzej veci" },
        { id: "A", text: "Krádež" },
        { id: "B", text: "Podvod" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Auto bolo použité bez súhlasu, nie odcudzené.",
      vysvetlenie_nespravne: {
        A: "Nie – chýba úmysel prisvojenia.",
        B: "Nie – nešlo o omyl."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre § 216 TZ" },
        { id: "C", text: "Začať stíhanie pre krádež" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o neoprávnené užívanie.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – chýba úmysel prisvojenia."
      }
    }
  ],

  C: `
Ide o neoprávnené užívanie cudzej veci podľa § 216 TZ.
`,

  tagy: ["MIRAC", "krádež", "užívanie", "Paneurópska"]
},
{
  id: "TC62",
  nazov: "Tréningový prípad 62",
  obtiaznost: "ťažká",

  M: `
Obvinený si kúpil kuklu, rukavice a pripravil si nôž. 
V noci prišiel k zadnému vchodu do obchodu, 
ale keď počul hluk, zľakol sa a odišiel bez toho, aby sa pokúsil vniknúť dnu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo je právnym problémom?",
      moznosti: [
        { id: "C", text: "Príprava trestného činu (§ 13 TZ)" },
        { id: "A", text: "Pokus trestného činu (§ 14 TZ)" },
        { id: "B", text: "Dokonaný trestný čin" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "K pokusu treba bezprostredné smerovanie k dokonaniu.",
      vysvetlenie_nespravne: {
        A: "Nie – neprešiel do štádia pokusu.",
        B: "Nie – skutok nebol dokonaný."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o pokus?",
      moznosti: [
        { id: "A", text: "Nezačal bezprostredne uskutočňovať skutkovú podstatu" },
        { id: "C", text: "Lebo si kúpil kuklu" },
        { id: "B", text: "Lebo si to rozmyslel" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Príprava končí tam, kde začína bezprostredné uskutočňovanie skutkovej podstaty – k tomu nedošlo.",
      vysvetlenie_nespravne: {
        B: "Nie – rozmyslenie môže byť aj pri pokuse.",
        C: "Nie – kúpa kukly je len prípravné konanie."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok (pri zločine lúpeže)?",
      moznosti: [
        { id: "C", text: "Príprava k zločinu lúpeže (§ 13 v spojení s § 188 TZ)" },
        { id: "A", text: "Pokus lúpeže" },
        { id: "B", text: "Dokonaná lúpež" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ide o prípravu k zločinu, nie o pokus.",
      vysvetlenie_nespravne: {
        A: "Nie – nezačal bezprostredne uskutočňovať útok.",
        B: "Nie – k útoku vôbec nedošlo."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre prípravu k zločinu lúpeže" },
        { id: "B", text: "Vec odložiť, lebo k činu nedošlo" },
        { id: "C", text: "Začať stíhanie pre pokus lúpeže" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Príprava k zločinu je trestná, ak to zákon výslovne ustanovuje.",
      vysvetlenie_nespravne: {
        B: "Nie – príprava je v tomto prípade trestná.",
        C: "Nie – nešlo o pokus."
      }
    }
  ],

  C: `
Ide o prípravu k zločinu lúpeže podľa § 13 v spojení s § 188 TZ. 
Obvinený sa nedostal do štádia pokusu, lebo nezačal bezprostredne uskutočňovať skutkovú podstatu.
`,

  tagy: ["MIRAC", "príprava", "pokus", "lúpež", "Paneurópska"]
},
{
  id: "TC63",
  nazov: "Tréningový prípad 63",
  obtiaznost: "stredná",

  M: `
Obvinený vošiel do predajne mobilov a požiadal predavača, 
aby mu ukázal nový telefón „zblízka“. 
Keď mu ho predavač podal do ruky, obvinený s ním ušiel. 
Predavač bol presvedčený, že ide o bežnú prezentáciu tovaru.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo je právnym problémom?",
      moznosti: [
        { id: "C", text: "Podvod (§ 221 TZ)" },
        { id: "A", text: "Krádež (§ 212 TZ)" },
        { id: "B", text: "Sprenevera (§ 213 TZ)" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Predavač bol uvedený do omylu → dobrovoľne vydal vec.",
      vysvetlenie_nespravne: {
        A: "Nie – vec bola vydaná dobrovoľne.",
        B: "Nie – vec mu nebola zverená na účel držby."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o krádež?",
      moznosti: [
        { id: "B", text: "Lebo predavač vydal vec dobrovoľne na základe omylu" },
        { id: "A", text: "Lebo telefón bol lacný" },
        { id: "C", text: "Lebo obvinený neutekal ďaleko" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Krádež = zmocnenie sa veci. Tu bola vec vydaná dobrovoľne.",
      vysvetlenie_nespravne: {
        A: "Nie – hodnota nerozhoduje.",
        C: "Nie – vzdialenosť nie je kritérium."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "C", text: "Podvod" },
        { id: "A", text: "Krádež" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Predavač bol uvedený do omylu → podvod.",
      vysvetlenie_nespravne: {
        A: "Nie – vec bola vydaná dobrovoľne.",
        B: "Nie – vec nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre podvod" },
        { id: "C", text: "Začať stíhanie pre krádež" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o podvodné vylákanie veci.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nejde o zmocnenie sa veci."
      }
    }
  ],

  C: `
Ide o podvod podľa § 221 TZ, pretože predavač vydal vec dobrovoľne na základe omylu.
`,

  tagy: ["MIRAC", "podvod", "krádež", "Paneurópska"]
},
{
  id: "TC64",
  nazov: "Tréningový prípad 64",
  obtiaznost: "ťažká",

  M: `
Obvinený na ulici bezdôvodne napadol náhodného okoloidúceho. 
Najprv ho udrel päsťou, potom ho kopol do brucha. 
Útok sledovalo viacero ľudí. 
Poškodený mal liečenie 3 dni.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "A", text: "Výtržníctvo" },
        { id: "C", text: "Súbeh výtržníctva a ublíženia" },
        { id: "B", text: "Ublíženie na zdraví" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Útok bol bezdôvodný a verejný → výtržníctvo + ublíženie.",
      vysvetlenie_nespravne: {
        A: "Nie – došlo aj k zraneniu.",
        B: "Nie – verejný výtržnícky charakter nemožno ignorovať."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o konzumáciu?",
      moznosti: [
        { id: "B", text: "Lebo útok nebol prirodzeným vyústením hádky, ale bezdôvodný" },
        { id: "A", text: "Lebo poškodený neutekal" },
        { id: "C", text: "Lebo útok bol krátky" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Pri bezdôvodnom útoku ide o skutočný súbeh.",
      vysvetlenie_nespravne: {
        A: "Nie – útek nie je kritérium.",
        C: "Nie – dĺžka útoku nerozhoduje."
      }
    },

    {
      typ: "A",
      otazka: "Kvalifikácia?",
      moznosti: [
        { id: "C", text: "Výtržníctvo + ublíženie na zdraví" },
        { id: "A", text: "Len ublíženie" },
        { id: "B", text: "Len výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ide o skutočný súbeh.",
      vysvetlenie_nespravne: {
        A: "Nie – verejný charakter je podstatný.",
        B: "Nie – došlo k zraneniu."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať stíhanie pre oba činy" },
        { id: "C", text: "Začať stíhanie len pre ublíženie" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o skutočný súbeh.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – výtržníctvo nemožno ignorovať."
      }
    }
  ],

  C: `
Ide o skutočný súbeh výtržníctva a ublíženia na zdraví.
`,

  tagy: ["MIRAC", "výtržníctvo", "ublíženie", "súbeh", "Paneurópska"]
},
{
  id: "TC65",
  nazov: "Tréningový prípad 65",
  obtiaznost: "ťažká",

  M: `
Obvinený podpálil vlastnú garáž, aby získal poistné plnenie. 
Oheň sa rozšíril na susedov plot, ale neohrozil žiadne osoby ani ďalšie budovy.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Poškodzovanie cudzej veci (§ 245 TZ)" },
        { id: "A", text: "Všeobecné ohrozenie (§ 284 TZ)" },
        { id: "B", text: "Podvod (§ 221 TZ)" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Oheň neohrozil väčší počet osôb ani majetku.",
      vysvetlenie_nespravne: {
        A: "Nie – nešlo o všeobecné ohrozenie.",
        B: "Nie – podvod je samostatná otázka, ale tu riešime následok ohňa."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o všeobecné ohrozenie?",
      moznosti: [
        { id: "A", text: "Nebolo ohrozené viac osôb ani väčší rozsah majetku" },
        { id: "C", text: "Lebo garáž bola malá" },
        { id: "B", text: "Lebo sused bol doma" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Všeobecné ohrozenie vyžaduje širší rozsah ohrozenia.",
      vysvetlenie_nespravne: {
        B: "Nie – prítomnosť suseda nie je kritérium.",
        C: "Nie – veľkosť garáže nerozhoduje."
      }
    },

    {
      typ: "A",
      otazka: "Kvalifikácia?",
      moznosti: [
        { id: "C", text: "Poškodzovanie cudzej veci" },
        { id: "A", text: "Všeobecné ohrozenie" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Oheň poškodil len susedov plot.",
      vysvetlenie_nespravne: {
        A: "Nie – rozsah ohrozenia bol malý.",
        B: "Nie – nejde o verejný poriadok."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať stíhanie pre poškodzovanie cudzej veci" },
        { id: "C", text: "Začať stíhanie pre všeobecné ohrozenie" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o poškodzovanie cudzej veci.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nebol splnený rozsah ohrozenia."
      }
    }
  ],

  C: `
Ide o poškodzovanie cudzej veci podľa § 245 TZ. 
Všeobecné ohrozenie nebolo naplnené, lebo rozsah ohrozenia bol malý.
`,

  tagy: ["MIRAC", "poškodzovanie", "všeobecné ohrozenie", "Paneurópska"]
},
{
  id: "TC66",
  nazov: "Tréningový prípad 66",
  obtiaznost: "stredná",

  M: `
Poškodený si zabudol peňaženku na lavičke v parku. 
Obvinený ju našiel, zobral a nechal si v nej 120 €. 
Doklady a peňaženku zahodil do koša.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký právny problém ide?",
      moznosti: [
        { id: "B", text: "Zatajenie veci (§ 213a TZ)" },
        { id: "A", text: "Krádež (§ 212 TZ)" },
        { id: "C", text: "Podvod (§ 221 TZ)" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Vec bola nájdená, nie odcudzená.",
      vysvetlenie_nespravne: {
        A: "Nie – nešlo o zmocnenie sa veci z cudzej moci.",
        C: "Nie – nešlo o uvedenie do omylu."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o krádež?",
      moznosti: [
        { id: "A", text: "Lebo vec bola nájdená, nie odňatá z držby" },
        { id: "C", text: "Lebo suma bola nízka" },
        { id: "B", text: "Lebo poškodený si ju zabudol" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Krádež = odňatie veci z držby. Tu bola vec nájdená.",
      vysvetlenie_nespravne: {
        B: "Nie – zabudnutie nie je kritérium.",
        C: "Nie – výška škody nerozhoduje."
      }
    },

    {
      typ: "A",
      otazka: "Kvalifikácia?",
      moznosti: [
        { id: "B", text: "Zatajenie veci" },
        { id: "A", text: "Krádež" },
        { id: "C", text: "Sprenevera" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Ide o zatajenie nájdenej veci.",
      vysvetlenie_nespravne: {
        A: "Nie – vec nebola odňatá.",
        C: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať stíhanie pre zatajenie veci" },
        { id: "C", text: "Začať stíhanie pre krádež" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zatajenie veci je trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nejde o krádež."
      }
    }
  ],

  C: `
Ide o zatajenie veci podľa § 213a TZ.
`,

  tagy: ["MIRAC", "zatajenie veci", "krádež", "Paneurópska"]
},
{
  id: "TC67",
  nazov: "Tréningový prípad 67",
  obtiaznost: "stredná",

  M: `
Obvinený vykonával murárske práce bez živnostenského oprávnenia. 
Prácu vykonal nekvalitne a poškodený musel zaplatiť ďalšiemu majstrovi opravu. 
Obvinený tvrdil, že „to vie robiť“.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Neoprávnené podnikanie (§ 251 TZ)" },
        { id: "A", text: "Podvod (§ 221 TZ)" },
        { id: "B", text: "Poškodzovanie cudzej veci (§ 245 TZ)" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Chýba omyl poškodeného o podstatnej skutočnosti.",
      vysvetlenie_nespravne: {
        A: "Nie – nekvalitná práca nie je podvod.",
        B: "Nie – nejde o úmyselné poškodenie veci."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o podvod?",
      moznosti: [
        { id: "B", text: "Poškodený nebol uvedený do omylu o podstatnej skutočnosti" },
        { id: "A", text: "Lebo práca bola lacná" },
        { id: "C", text: "Lebo obvinený nemal úmysel" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Podvod = omyl. Tu išlo o nekvalitnú prácu, nie o klamstvo.",
      vysvetlenie_nespravne: {
        A: "Nie – cena nerozhoduje.",
        C: "Nie – úmysel nie je kritérium."
      }
    },

    {
      typ: "A",
      otazka: "Kvalifikácia?",
      moznosti: [
        { id: "C", text: "Neoprávnené podnikanie" },
        { id: "A", text: "Podvod" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Chýba živnostenské oprávnenie.",
      vysvetlenie_nespravne: {
        A: "Nie – chýba omyl.",
        B: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať stíhanie pre neoprávnené podnikanie" },
        { id: "C", text: "Začať stíhanie pre podvod" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ide o neoprávnené podnikanie.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – chýba omyl."
      }
    }
  ],

  C: `
Ide o neoprávnené podnikanie podľa § 251 TZ.
`,

  tagy: ["MIRAC", "podnikanie", "podvod", "Paneurópska"]
},
{
  id: "TC68",
  nazov: "Tréningový prípad 68",
  obtiaznost: "ťažká",

  M: `
Počas bitky obvinený udrel poškodeného do oka. 
Poškodený mal trvalé zhoršenie zraku o 40 %. 
Liečenie trvalo 21 dní.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Ťažká ujma na zdraví (§ 155 ods. 2 TZ)" },
        { id: "A", text: "Ublíženie na zdraví (§ 156 TZ)" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Trvalé zhoršenie zraku = ťažká ujma.",
      vysvetlenie_nespravne: {
        A: "Nie – následok je závažnejší.",
        B: "Nie – verejný charakter nie je podstatný."
      }
    },

    {
      typ: "R",
      otazka: "Prečo ide o ťažkú ujmu?",
      moznosti: [
        { id: "A", text: "Ide o trvalé a závažné poškodenie zmyslového orgánu" },
        { id: "C", text: "Lebo liečenie trvalo 21 dní" },
        { id: "B", text: "Lebo poškodený mal okuliare" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zrak = zmyslový orgán → trvalé poškodenie = ťažká ujma.",
      vysvetlenie_nespravne: {
        B: "Nie – okuliare nie sú kritérium.",
        C: "Nie – dĺžka liečenia nie je rozhodujúca."
      }
    },

    {
      typ: "A",
      otazka: "Kvalifikácia?",
      moznosti: [
        { id: "C", text: "Ťažká ujma na zdraví" },
        { id: "A", text: "Ublíženie na zdraví" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Trvalé poškodenie zraku = ťažká ujma.",
      vysvetlenie_nespravne: {
        A: "Nie – následok je závažnejší.",
        B: "Nie – verejnosť nie je kritérium."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať stíhanie pre ťažkú ujmu na zdraví" },
        { id: "C", text: "Začať stíhanie pre ublíženie" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Následok je trvalý a závažný.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – ide o ťažkú ujmu."
      }
    }
  ],

  C: `
Ide o ťažkú ujmu na zdraví podľa § 155 ods. 2 TZ.
`,

  tagy: ["MIRAC", "ťažká ujma", "ublíženie", "Paneurópska"]
},
{
  id: "TC69",
  nazov: "Tréningový prípad 69",
  obtiaznost: "ťažká",

  M: `
Obvinený požičal poškodenému 200 € s tým, že mu musí vrátiť 800 €. 
Poškodený bol v ťažkej finančnej tiesni a nemal inú možnosť. 
Obvinený to vedel a využil to.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Úžera (§ 235 TZ)" },
        { id: "A", text: "Podvod (§ 221 TZ)" },
        { id: "B", text: "Krádež (§ 212 TZ)" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Úžera = zneužitie tiesne + hrubý nepomer plnení.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o omyl.",
        B: "Nie – nejde o odcudzenie veci."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde o podvod?",
      moznosti: [
        { id: "B", text: "Poškodený nebol uvedený do omylu" },
        { id: "A", text: "Lebo suma bola nízka" },
        { id: "C", text: "Lebo obvinený nemal úmysel" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Podvod = omyl. Tu išlo o zneužitie tiesne.",
      vysvetlenie_nespravne: {
        A: "Nie – výška sumy nerozhoduje.",
        C: "Nie – úmysel bol zjavný."
      }
    },

    {
      typ: "A",
      otazka: "Kvalifikácia?",
      moznosti: [
        { id: "C", text: "Úžera" },
        { id: "A", text: "Podvod" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Hrubý nepomer + zneužitie tiesne = úžera.",
      vysvetlenie_nespravne: {
        A: "Nie – chýba omyl.",
        B: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Začať stíhanie pre úžeru" },
        { id: "C", text: "Začať stíhanie pre podvod" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úžera je trestný čin.",
      vysvetlenie_nespravne: {
        B: "Nie – skutok je trestný čin.",
        C: "Nie – nejde o omyl."
      }
    }
  ],

  C: `
Ide o úžeru podľa § 235 TZ.
`,

  tagy: ["MIRAC", "úžera", "podvod", "Paneurópska"]
},
{
  id: "TC70",
  nazov: "Tréningový prípad 70",
  obtiaznost: "ťažká",

  M: `
Obvinený mal doma nelegálne držanú strelnú zbraň kategórie B. 
Okrem toho si ju svojpomocne upravil tak, aby mala vyššiu kadenciu. 
Nemal žiadne povolenie.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Nedovolené ozbrojovanie (§ 295 TZ)" },
        { id: "A", text: "Neoprávnené nakladanie so zbraňou (§ 294 TZ)" },
        { id: "B", text: "Výtržníctvo (§ 364 TZ)" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Úprava zbrane a zásah do jej technických parametrov spadá pod § 295 TZ.",
      vysvetlenie_nespravne: {
        A: "Nie – § 294 rieši najmä neoprávnenú držbu, nie úpravu zbrane.",
        B: "Nie – nejde o narušenie verejného poriadku na verejnosti."
      }
    },

    {
      typ: "R",
      otazka: "Prečo nejde len o neoprávnené nakladanie so zbraňou (§ 294 TZ)?",
      moznosti: [
        { id: "A", text: "Lebo úprava zbrane je samostatne postihovaná ako nedovolené ozbrojovanie" },
        { id: "C", text: "Lebo zbraň bola stará" },
        { id: "B", text: "Lebo obvinený zbraň nepoužil" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "§ 295 TZ sa vzťahuje na výrobu, úpravu a podobné zásahy do zbraní.",
      vysvetlenie_nespravne: {
        B: "Nie – použitie zbrane nie je podmienkou trestnosti.",
        C: "Nie – vek zbrane nie je rozhodujúci."
      }
    },

    {
      typ: "A",
      otazka: "Ako sa kvalifikuje skutok?",
      moznosti: [
        { id: "C", text: "Nedovolené ozbrojovanie (§ 295 TZ), prípadne v súbehu s § 294 TZ" },
        { id: "A", text: "Len neoprávnené nakladanie so zbraňou (§ 294 TZ)" },
        { id: "B", text: "Len priestupok" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Úprava zbrane napĺňa § 295 TZ, samotná držba môže zakladať aj § 294 TZ.",
      vysvetlenie_nespravne: {
        A: "Nie – úprava zbrane presahuje rámec § 294 TZ.",
        B: "Nie – ide o trestný čin, nie priestupok."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je vhodný?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre nedovolené ozbrojovanie (§ 295 TZ), prípadne v súbehu s § 294 TZ" },
        { id: "C", text: "Vec postúpiť ako priestupok" },
        { id: "B", text: "Vec odložiť, keďže zbraň nebola použitá" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Úprava a držba nelegálnej zbrane zakladajú dôvod na trestné stíhanie.",
      vysvetlenie_nespravne: {
        B: "Nie – použitie zbrane nie je podmienkou trestnosti.",
        C: "Nie – skutok má trestnoprávnu relevanciu."
      }
    }
  ],

  C: `
Ide o nedovolené ozbrojovanie podľa § 295 TZ, 
pričom samotná nelegálna držba môže zakladať aj trestný čin podľa § 294 TZ. 
Úprava zbrane smerujúca k zvýšeniu jej účinnosti je kvalifikovaná priamo § 295 TZ.
`,

  tagy: ["MIRAC", "zbraň", "nedovolené ozbrojovanie", "neoprávnené nakladanie so zbraňou", "Paneurópska"]
},
{
  id: "TC71",
  nazov: "Tréningový prípad 71",
  obtiaznost: "ťažká",

  M: `
Policajti zastavili muža, ktorý zodpovedal popisu páchateľa lúpeže spred jednej hodiny. 
Bez ďalšieho vysvetlenia ho spútali, odviezli na policajnú stanicu 
a držali 7 hodín bez poučenia a bez možnosti kontaktovať advokáta.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Zadržanie osoby podľa § 85 TP" },
        { id: "A", text: "Predvedenie osoby podľa § 76 TP" },
        { id: "B", text: "Väzbu podľa § 71 TP" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Osoba bola obmedzená na slobode → ide o zadržanie.",
      vysvetlenie_nespravne: {
        A: "Nie – predvedenie trvá len nevyhnutný čas.",
        B: "Nie – o väzbe rozhoduje súd."
      }
    },

    {
      typ: "R",
      otazka: "Bol postup zákonný?",
      moznosti: [
        { id: "B", text: "Nie – osoba nebola poučená a nemohla kontaktovať advokáta" },
        { id: "A", text: "Áno – polícia môže držať osobu 24 hodín bez poučenia" },
        { id: "C", text: "Áno – ak osoba zodpovedá popisu, poučenie netreba" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Poučenie a kontakt s advokátom sú povinné okamžite.",
      vysvetlenie_nespravne: {
        A: "Nie – poučenie musí byť bezodkladné.",
        C: "Nie – popis nenahrádza procesné práva."
      }
    },

    {
      typ: "A",
      otazka: "Aké právo bolo porušené?",
      moznosti: [
        { id: "C", text: "Právo na obhajobu" },
        { id: "A", text: "Právo na tlmočníka" },
        { id: "B", text: "Právo na náhradu škody" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Osoba nemohla kontaktovať advokáta.",
      vysvetlenie_nespravne: {
        A: "Nie – jazyková bariéra nebola uvedená.",
        B: "Nie – to rieši až následne."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Zadržanie je nezákonné – dôkazné následky" },
        { id: "C", text: "Zadržanie je v poriadku" },
        { id: "B", text: "Ide o predvedenie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonné zadržanie → dôkazy môžu byť nepoužiteľné.",
      vysvetlenie_nespravne: {
        B: "Nie – osoba bola držaná 7 hodín.",
        C: "Nie – porušené boli základné práva."
      }
    }
  ],

  C: `
Zadržanie bolo nezákonné pre absenciu poučenia a znemožnenie kontaktu s advokátom.
`,

  tagy: ["MIRAC", "zadržanie", "procesné práva", "Paneurópska"]
},
{
  id: "TC72",
  nazov: "Tréningový prípad 72",
  obtiaznost: "stredná",

  M: `
Polícia našla svedka, ktorý ignoroval opakované predvolania. 
Policajti ho odviezli na stanicu, vypočuli a po 40 minútach pustili. 
Svedok tvrdí, že bol „zadržaný“.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký úkon išlo?",
      moznosti: [
        { id: "C", text: "Predvedenie podľa § 76 TP" },
        { id: "A", text: "Zadržanie podľa § 85 TP" },
        { id: "B", text: "Väzba" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Predvedenie trvá len nevyhnutný čas.",
      vysvetlenie_nespravne: {
        A: "Nie – nešlo o obvineného ani podozrivého.",
        B: "Nie – o väzbe rozhoduje súd."
      }
    },

    {
      typ: "R",
      otazka: "Bolo predvedenie zákonné?",
      moznosti: [
        { id: "A", text: "Áno – svedok ignoroval predvolania" },
        { id: "C", text: "Nie – predvedenie musí trvať aspoň 2 hodiny" },
        { id: "B", text: "Nie – svedka nemožno predviesť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Predvedenie je zákonné pri ignorovaní predvolania.",
      vysvetlenie_nespravne: {
        B: "Nie – svedka možno predviesť.",
        C: "Nie – zákon nestanovuje minimálny čas."
      }
    },

    {
      typ: "A",
      otazka: "Trvalo predvedenie primerane?",
      moznosti: [
        { id: "C", text: "Áno – 40 minút je primerané" },
        { id: "A", text: "Nie – musí trvať kratšie" },
        { id: "B", text: "Nie – musí trvať dlhšie" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Predvedenie má trvať len nevyhnutný čas.",
      vysvetlenie_nespravne: {
        A: "Nie – zákon neurčuje limit.",
        B: "Nie – dlhšie trvanie by bolo neprimerané."
      }
    },

    {
      typ: "P",
      otazka: "Ako to právne uzavrieť?",
      moznosti: [
        { id: "A", text: "Išlo o zákonné predvedenie" },
        { id: "C", text: "Išlo o nezákonné zadržanie" },
        { id: "B", text: "Išlo o väzbu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Predvedenie bolo zákonné a primerané.",
      vysvetlenie_nespravne: {
        B: "Nie – o väzbe rozhoduje súd.",
        C: "Nie – trvanie bolo krátke."
      }
    }
  ],

  C: `
Išlo o zákonné predvedenie podľa § 76 TP.
`,

  tagy: ["MIRAC", "predvedenie", "zadržanie", "Paneurópska"]
},
{
  id: "TC73",
  nazov: "Tréningový prípad 73",
  obtiaznost: "ťažká",

  M: `
Polícia mala informáciu, že v byte sa nachádzajú drogy. 
Nemala súhlas súdu, ale vykonala domovú prehliadku s odôvodnením, 
že „hrozilo, že dôkazy zmiznú“. 
V spise však nie je uvedené, prečo by mali zmiznúť.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Zákonnosť domovej prehliadky bez príkazu" },
        { id: "A", text: "Zadržanie osoby" },
        { id: "B", text: "Väzbu" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Domová prehliadka bez príkazu je výnimka.",
      vysvetlenie_nespravne: {
        A: "Nie – osoba nebola zadržaná.",
        B: "Nie – nejde o väzbu."
      }
    },

    {
      typ: "R",
      otazka: "Bola prehliadka neodkladná?",
      moznosti: [
        { id: "B", text: "Nie – polícia neodôvodnila, prečo by dôkazy mali zmiznúť" },
        { id: "A", text: "Áno – drogy vždy môžu zmiznúť" },
        { id: "C", text: "Áno – ak ide o drogy, príkaz netreba" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Neodkladnosť musí byť konkrétne odôvodnená.",
      vysvetlenie_nespravne: {
        A: "Nie – treba konkrétne okolnosti.",
        C: "Nie – drogy neznamenajú automatickú výnimku."
      }
    },

    {
      typ: "A",
      otazka: "Je dôkaz použiteľný?",
      moznosti: [
        { id: "C", text: "Nie – prehliadka bola nezákonná" },
        { id: "A", text: "Áno – polícia konala v dobrej viere" },
        { id: "B", text: "Áno – ak to schváli prokurátor" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Nezákonná prehliadka → nezákonný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Nie – dobrá viera nestačí.",
        B: "Nie – prokurátor nemôže legalizovať nezákonnosť."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Vylúčiť dôkaz z konania" },
        { id: "C", text: "Použiť dôkaz, ak je závažný" },
        { id: "B", text: "Ignorovať chybu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonný dôkaz musí byť vylúčený.",
      vysvetlenie_nespravne: {
        B: "Nie – procesné chyby nemožno ignorovať.",
        C: "Nie – závažnosť nehrá rolu."
      }
    }
  ],

  C: `
Domová prehliadka bola nezákonná – nebola preukázaná neodkladnosť ani neopakovateľnosť.
`,

  tagy: ["MIRAC", "domová prehliadka", "neodkladnosť", "Paneurópska"]
},
{
  id: "TC74",
  nazov: "Tréningový prípad 74",
  obtiaznost: "stredná",

  M: `
Polícia mala informáciu, že v garáži pri rodinnom dome sa nachádzajú kradnuté bicykle. 
Bez príkazu vošla do garáže a bicykle zaistila. 
Majiteľ tvrdí, že išlo o domovú prehliadku bez príkazu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký úkon išlo?",
      moznosti: [
        { id: "C", text: "Prehliadka iných priestorov (§ 101 TP)" },
        { id: "A", text: "Domová prehliadka (§ 100 TP)" },
        { id: "B", text: "Zadržanie osoby" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Garáž nie je obydlie → nejde o domovú prehliadku.",
      vysvetlenie_nespravne: {
        A: "Nie – garáž nie je byt.",
        B: "Nie – osoba nebola obmedzená na slobode."
      }
    },

    {
      typ: "R",
      otazka: "Bolo možné vykonať prehliadku bez príkazu?",
      moznosti: [
        { id: "A", text: "Áno – pri iných priestoroch stačí súhlas držiteľa alebo neodkladnosť" },
        { id: "C", text: "Nie – vždy treba príkaz súdu" },
        { id: "B", text: "Nie – garáž je vždy obydlie" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Iné priestory majú miernejší režim.",
      vysvetlenie_nespravne: {
        B: "Nie – garáž nie je obydlie.",
        C: "Nie – zákon umožňuje výnimky."
      }
    },

    {
      typ: "A",
      otazka: "Je dôkaz použiteľný?",
      moznosti: [
        { id: "C", text: "Áno – ak bola preukázaná neodkladnosť" },
        { id: "A", text: "Nie – ak nebola preukázaná neodkladnosť ani súhlas" },
        { id: "B", text: "Áno – ak to schváli prokurátor" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Bez príkazu musí byť splnená neodkladnosť alebo súhlas.",
      vysvetlenie_nespravne: {
        B: "Nie – prokurátor nemôže legalizovať nezákonnosť.",
        C: "Nie – neodkladnosť musí byť preukázaná."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Preskúmať splnenie podmienok neodkladnosti" },
        { id: "C", text: "Automaticky vylúčiť dôkaz" },
        { id: "B", text: "Ignorovať chybu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Treba preskúmať, či boli splnené zákonné podmienky.",
      vysvetlenie_nespravne: {
        B: "Nie – chyby nemožno ignorovať.",
        C: "Nie – automatické vylúčenie nie je vždy správne."
      }
    }
  ],

  C: `
Išlo o prehliadku iných priestorov, nie domovú prehliadku. 
Zákonnosť závisí od splnenia podmienok neodkladnosti alebo súhlasu.
`,

  tagy: ["MIRAC", "prehliadka", "iné priestory", "Paneurópska"]
},
{
  id: "TC75",
  nazov: "Tréningový prípad 75",
  obtiaznost: "ťažká",

  M: `
Obvinený je stíhaný pre podvod. 
Hrozí mu trest 8 rokov. 
Poškodeným posielal správy, aby „zmenili výpovede“. 
Zároveň nemá trvalé bydlisko a v minulosti sa vyhýbal konaniu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Ktoré dôvody väzby prichádzajú do úvahy?",
      moznosti: [
        { id: "C", text: "Kolúzna aj úteková väzba" },
        { id: "A", text: "Len preventívna väzba" },
        { id: "B", text: "Len úteková väzba" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Obvinený ovplyvňoval svedkov (kolúzna) a nemá stabilné pomery (úteková).",
      vysvetlenie_nespravne: {
        A: "Nie – preventívna väzba sa týka pokračovania v trestnej činnosti.",
        B: "Nie – sú tu aj kolúzne dôvody."
      }
    },

    {
      typ: "R",
      otazka: "Prečo je daný kolúzny dôvod?",
      moznosti: [
        { id: "A", text: "Lebo ovplyvňoval svedkov správami" },
        { id: "C", text: "Lebo nemá trvalé bydlisko" },
        { id: "B", text: "Lebo mu hrozí vysoký trest" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Kolúzna väzba = ovplyvňovanie svedkov alebo marenie dokazovania.",
      vysvetlenie_nespravne: {
        B: "Nie – to je útekový dôvod.",
        C: "Nie – to je tiež útekový dôvod."
      }
    },

    {
      typ: "A",
      otazka: "Prečo je daný útekový dôvod?",
      moznosti: [
        { id: "C", text: "Nemá trvalé bydlisko a v minulosti sa vyhýbal konaniu" },
        { id: "A", text: "Lebo ovplyvňoval svedkov" },
        { id: "B", text: "Lebo poškodený zmenil výpoveď" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Úteková väzba = riziko úteku alebo skrývania sa.",
      vysvetlenie_nespravne: {
        A: "Nie – to je kolúzny dôvod.",
        B: "Nie – to nie je dôvod väzby."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je správny?",
      moznosti: [
        { id: "A", text: "Navrhnúť vzatie do väzby z kolúznych aj útekových dôvodov" },
        { id: "C", text: "Navrhnúť len útekovú väzbu" },
        { id: "B", text: "Nenavrhnúť väzbu – postačí dohľad probačného úradníka" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Sú splnené oba dôvody väzby.",
      vysvetlenie_nespravne: {
        B: "Nie – dohľad nerieši ovplyvňovanie svedkov.",
        C: "Nie – kolúzny dôvod je jasný."
      }
    }
  ],

  C: `
Obvinený má naplnené kolúzne aj útekové dôvody väzby. 
Správny postup je návrh na vzatie do väzby podľa § 71 ods. 1 písm. a) a c) TP.
`,

  tagy: ["MIRAC", "väzba", "kolúzna", "úteková", "Paneurópska"]
},
{
  id: "TC76",
  nazov: "Tréningový prípad 76",
  obtiaznost: "ťažká",

  M: `
Polícia mala informáciu, že obvinený obchoduje s drogami. 
Bez príkazu súdu požiadala operátora o záznam jeho telefonických hovorov 
za posledné 3 dni. Operátor záznam poskytol.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Zákonnosť odpočúvania a záznamu telekomunikácie" },
        { id: "A", text: "Domovú prehliadku" },
        { id: "B", text: "Zadržanie osoby" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ide o zásah do súkromia podľa § 115 TP.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o prehliadku.",
        B: "Nie – osoba nebola obmedzená na slobode."
      }
    },

    {
      typ: "R",
      otazka: "Bol postup zákonný?",
      moznosti: [
        { id: "B", text: "Nie – odpočúvanie vyžaduje príkaz sudcu" },
        { id: "A", text: "Áno – ak ide o drogy, príkaz netreba" },
        { id: "C", text: "Áno – ak operátor súhlasí" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Odpočúvanie je možné len na základe príkazu sudcu.",
      vysvetlenie_nespravne: {
        A: "Nie – drogy neznamenajú automatickú výnimku.",
        C: "Nie – operátor nemôže nahradiť súd."
      }
    },

    {
      typ: "A",
      otazka: "Je dôkaz použiteľný?",
      moznosti: [
        { id: "C", text: "Nie – ide o nezákonný dôkaz" },
        { id: "A", text: "Áno – ak bol získaný v dobrej viere" },
        { id: "B", text: "Áno – ak ho schváli prokurátor" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Nezákonné odpočúvanie = nezákonný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Nie – dobrá viera nestačí.",
        B: "Nie – prokurátor nemôže legalizovať nezákonnosť."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup?",
      moznosti: [
        { id: "A", text: "Vylúčiť dôkaz z konania" },
        { id: "C", text: "Použiť dôkaz, ak je závažný" },
        { id: "B", text: "Ignorovať chybu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonný dôkaz musí byť vylúčený.",
      vysvetlenie_nespravne: {
        B: "Nie – procesné chyby nemožno ignorovať.",
        C: "Nie – závažnosť nehrá rolu."
      }
    }
  ],

  C: `
Odpočúvanie bolo nezákonné, keďže neexistoval príkaz sudcu. 
Dôkaz je nepoužiteľný.
`,

  tagy: ["MIRAC", "odpočúvanie", "telekomunikácia", "Paneurópska"]
},
{
  id: "TC77",
  nazov: "Tréningový prípad 77",
  obtiaznost: "ťažká",

  M: `
Polícia predložila svedkovi fotografiu obvineného a opýtala sa: 
„Bol to tento muž?“ 
Svedok odpovedal, že áno. 
Neboli predložené žiadne iné fotografie ani osoby.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký úkon išlo?",
      moznosti: [
        { id: "C", text: "Nezákonná rekognícia" },
        { id: "A", text: "Zadržanie" },
        { id: "B", text: "Výsluch svedka" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Rekognícia musí byť medzi viacerými osobami/obrazmi.",
      vysvetlenie_nespravne: {
        A: "Nie – osoba nebola obmedzená na slobode.",
        B: "Nie – išlo o identifikáciu."
      }
    },

    {
      typ: "R",
      otazka: "Prečo bola rekognícia nezákonná?",
      moznosti: [
        { id: "A", text: "Neboli predložené porovnávacie osoby" },
        { id: "C", text: "Svedok bol unavený" },
        { id: "B", text: "Obvinený nemal advokáta" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Rekognícia musí byť medzi viacerými osobami/obrazmi.",
      vysvetlenie_nespravne: {
        B: "Nie – advokát nie je vždy povinný.",
        C: "Nie – únava nie je kritérium."
      }
    },

    {
      typ: "A",
      otazka: "Je dôkaz použiteľný?",
      moznosti: [
        { id: "C", text: "Nie – rekognícia bola nezákonná" },
        { id: "A", text: "Áno – ak svedok bol presvedčený" },
        { id: "B", text: "Áno – ak to schváli prokurátor" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Nezákonná rekognícia = nepoužiteľný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Nie – subjektívna istota nestačí.",
        B: "Nie – prokurátor nemôže legalizovať nezákonnosť."
      }
    },

    {
      typ: "P",
      otazka: "Ako postupovať?",
      moznosti: [
        { id: "A", text: "Vylúčiť rekogníciu z dokazovania" },
        { id: "C", text: "Použiť ju ako podporný dôkaz" },
        { id: "B", text: "Ignorovať chybu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonný dôkaz musí byť vylúčený.",
      vysvetlenie_nespravne: {
        B: "Nie – chyby nemožno ignorovať.",
        C: "Nie – nezákonný dôkaz nemožno použiť."
      }
    }
  ],

  C: `
Rekognícia bola nezákonná, keďže neboli predložené porovnávacie osoby ani fotografie.
`,

  tagy: ["MIRAC", "rekognícia", "identifikácia", "Paneurópska"]
},
{
  id: "TC78",
  nazov: "Tréningový prípad 78",
  obtiaznost: "stredná",

  M: `
Polícia zastavila muža na ulici a požiadala ho, aby „ukázal obsah vreciek“. 
Muž odmietol. 
Policajti ho prehľadali bez príkazu a našli u neho drogy.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký úkon išlo?",
      moznosti: [
        { id: "C", text: "Osobná prehliadka (§ 99 TP)" },
        { id: "A", text: "Prehliadka veci" },
        { id: "B", text: "Zadržanie" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Prehliadka tela a odevu = osobná prehliadka.",
      vysvetlenie_nespravne: {
        A: "Nie – prehliadka veci sa týka batožiny.",
        B: "Nie – osoba nebola obmedzená na slobode."
      }
    },

    {
      typ: "R",
      otazka: "Bol postup zákonný?",
      moznosti: [
        { id: "B", text: "Nie – osobná prehliadka vyžaduje príkaz alebo súhlas" },
        { id: "A", text: "Áno – polícia môže prehľadať kohokoľvek" },
        { id: "C", text: "Áno – ak ide o drogy" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Bez súhlasu alebo príkazu je prehliadka nezákonná.",
      vysvetlenie_nespravne: {
        A: "Nie – polícia nemá takúto právomoc.",
        C: "Nie – drogy neznamenajú automatickú výnimku."
      }
    },

    {
      typ: "A",
      otazka: "Je dôkaz použiteľný?",
      moznosti: [
        { id: "C", text: "Nie – ide o nezákonnú osobnú prehliadku" },
        { id: "A", text: "Áno – ak bol nález závažný" },
        { id: "B", text: "Áno – ak to schváli prokurátor" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Nezákonná prehliadka = nepoužiteľný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Nie – závažnosť nehrá rolu.",
        B: "Nie – prokurátor nemôže legalizovať nezákonnosť."
      }
    },

    {
      typ: "P",
      otazka: "Ako postupovať?",
      moznosti: [
        { id: "A", text: "Vylúčiť dôkaz z konania" },
        { id: "C", text: "Použiť dôkaz ako podporný" },
        { id: "B", text: "Ignorovať chybu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonný dôkaz musí byť vylúčený.",
      vysvetlenie_nespravne: {
        B: "Nie – chyby nemožno ignorovať.",
        C: "Nie – nezákonný dôkaz nemožno použiť."
      }
    }
  ],

  C: `
Osobná prehliadka bola nezákonná, pretože nebol daný súhlas ani príkaz.
`,

  tagy: ["MIRAC", "osobná prehliadka", "Paneurópska"]
},
{
  id: "TC79",
  nazov: "Tréningový prípad 79",
  obtiaznost: "stredná",

  M: `
Polícia pri kontrole vozidla zaistila notebook vodiča s odôvodnením, 
že „môže obsahovať dôkazy“. 
V spise však nie je uvedené, aké dôkazy a prečo by mali byť v notebooku.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký úkon išlo?",
      moznosti: [
        { id: "C", text: "Zaistenie veci (§ 95 TP)" },
        { id: "A", text: "Domová prehliadka" },
        { id: "B", text: "Zadržanie osoby" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Notebook bol zaistený ako vec dôležitá pre konanie.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o prehliadku.",
        B: "Nie – osoba nebola obmedzená na slobode."
      }
    },

    {
      typ: "R",
      otazka: "Bol postup zákonný?",
      moznosti: [
        { id: "B", text: "Nie – polícia musí odôvodniť, prečo je vec dôležitá pre konanie" },
        { id: "A", text: "Áno – polícia môže zaistiť akúkoľvek vec" },
        { id: "C", text: "Áno – ak ide o elektroniku" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Zaistenie musí byť konkrétne odôvodnené.",
      vysvetlenie_nespravne: {
        A: "Nie – polícia nemá takúto voľnú právomoc.",
        C: "Nie – elektronika nie je automatická výnimka."
      }
    },

    {
      typ: "A",
      otazka: "Je dôkaz použiteľný?",
      moznosti: [
        { id: "C", text: "Nie – zaistenie bolo nezákonné" },
        { id: "A", text: "Áno – ak bol notebook dôležitý" },
        { id: "B", text: "Áno – ak to schváli prokurátor" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Nezákonné zaistenie = nepoužiteľný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Nie – dôležitosť nehrá rolu.",
        B: "Nie – prokurátor nemôže legalizovať nezákonnosť."
      }
    },

    {
      typ: "P",
      otazka: "Ako postupovať?",
      moznosti: [
        { id: "A", text: "Vylúčiť dôkaz" },
        { id: "C", text: "Použiť dôkaz ako podporný" },
        { id: "B", text: "Ignorovať chybu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonný dôkaz musí byť vylúčený.",
      vysvetlenie_nespravne: {
        B: "Nie – chyby nemožno ignorovať.",
        C: "Nie – nezákonný dôkaz nemožno použiť."
      }
    }
  ],

  C: `
Zaistenie bolo nezákonné, pretože nebolo odôvodnené, prečo je notebook dôležitý pre konanie.
`,

  tagy: ["MIRAC", "zaistenie veci", "Paneurópska"]
},
{
  id: "TC80",
  nazov: "Tréningový prípad 80",
  obtiaznost: "ťažká",

  M: `
Polícia vykonala nezákonnú domovú prehliadku. 
Našla USB kľúč, na ktorom boli kontakty na ďalších páchateľov. 
Na základe týchto kontaktov vykonala ďalšie úkony a získala nové dôkazy.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Čo riešime?",
      moznosti: [
        { id: "C", text: "Reťazenie nezákonných dôkazov (ovocie z otráveného stromu)" },
        { id: "A", text: "Len zákonnosť domovej prehliadky" },
        { id: "B", text: "Len zákonnosť výsluchu svedkov" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ide o situáciu, keď ďalšie dôkazy nadväzujú na pôvodne nezákonný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde len o prehliadku, ale aj o následné dôkazy.",
        B: "Nie – problém je širší než len výsluchy."
      }
    },

    {
      typ: "R",
      otazka: "Aký je osud USB kľúča ako dôkazu?",
      moznosti: [
        { id: "A", text: "Je nepoužiteľný, lebo bol získaný nezákonnou domovou prehliadkou" },
        { id: "C", text: "Je použiteľný, ak obsahuje závažné informácie" },
        { id: "B", text: "Je použiteľný, ak to schváli prokurátor" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonná domová prehliadka → nezákonný dôkaz (USB).",
      vysvetlenie_nespravne: {
        B: "Nie – prokurátor nemôže legalizovať nezákonnosť.",
        C: "Nie – závažnosť obsahu nehrá rolu."
      }
    },

    {
      typ: "A",
      otazka: "Čo s dôkazmi získanými na základe kontaktov z USB?",
      moznosti: [
        { id: "C", text: "Spravidla sú tiež nepoužiteľné, lebo nadväzujú na nezákonný dôkaz" },
        { id: "A", text: "Sú vždy použiteľné, lebo boli získané neskôr" },
        { id: "B", text: "Sú použiteľné, ak boli získané so súdnym príkazom" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ide o tzv. odvodené (derivované) dôkazy z nezákonného zdroja.",
      vysvetlenie_nespravne: {
        A: "Nie – časové poradie nie je rozhodujúce.",
        B: "Nie – ani následný príkaz neodstráni pôvodnú nezákonnosť."
      }
    },

    {
      typ: "P",
      otazka: "Aký procesný postup je správny?",
      moznosti: [
        { id: "A", text: "Vylúčiť z dokazovania USB aj naň nadväzujúce dôkazy" },
        { id: "C", text: "Vylúčiť len USB, ostatné ponechať" },
        { id: "B", text: "Nevylučovať nič, lebo ide o závažnú trestnú činnosť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Ak sú ďalšie dôkazy priamo odvodené z nezákonného dôkazu, spravidla sa vylučujú tiež.",
      vysvetlenie_nespravne: {
        B: "Nie – závažnosť činu neospravedlňuje porušenie zákona.",
        C: "Nie – odvodené dôkazy sú kontaminované pôvodnou nezákonnosťou."
      }
    }
  ],

  C: `
Nezákonná domová prehliadka viedla k USB kľúču ako nezákonnému dôkazu. 
Dôkazy získané na základe údajov z USB sú spravidla tiež nepoužiteľné 
ako „ovocie z otráveného stromu“.
`,

  tagy: ["MIRAC", "dôkazy", "nezákonný dôkaz", "ovocie z otráveného stromu", "Paneurópska"]
},
{
  id: "TC81",
  nazov: "Tréningový prípad 81",
  obtiaznost: "stredná",

  M: `
Obvinený v samoobsluhe vložil do ruksaku fľašu alkoholu a prešiel cez pokladňu bez zaplatenia. 
Za pokladňou ho zastavil pracovník SBS, odviedol ho do zadnej miestnosti, 
zavrel dvere a nedovolil mu odísť, kým neprišla polícia (cca 40 minút). 
Polícia po príchode obvineného prehľadala a našla u neho aj ďalší tovar bez bločku.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Krádež podľa § 212 TZ" },
        { id: "A", text: "Podvod podľa § 221 TZ" },
        { id: "B", text: "Sprenevera podľa § 213 TZ" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Zmocnenie sa cudzej veci v obchode bez zaplatenia = krádež.",
      vysvetlenie_nespravne: {
        A: "Nie – nešlo o uvedenie do omylu.",
        B: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "R",
      otazka: "Ako kvalifikujeme konanie SBS (procesne)?",
      moznosti: [
        { id: "A", text: "Oprávnené zadržanie osoby pristihnutej pri čine" },
        { id: "C", text: "Nezákonné obmedzenie osobnej slobody" },
        { id: "B", text: "Väzba" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Každý môže zadržať osobu pristihnutú pri trestnom čine do príchodu polície.",
      vysvetlenie_nespravne: {
        B: "Nie – o väzbe rozhoduje súd.",
        C: "Nie – čas bol primeraný a účel legitímny."
      }
    },

    {
      typ: "A",
      otazka: "Ako posúdime osobnú prehliadku vykonanú políciou?",
      moznosti: [
        { id: "C", text: "Ako osobnú prehliadku podľa § 99 TP, ktorú možno vykonať pri dôvodnom podozrení" },
        { id: "A", text: "Ako nezákonnú, lebo vždy treba príkaz súdu" },
        { id: "B", text: "Ako domovú prehliadku" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Pri dôvodnom podozrení z trestného činu možno vykonať osobnú prehliadku aj bez príkazu súdu.",
      vysvetlenie_nespravne: {
        A: "Nie – zákon pozná aj iné situácie.",
        B: "Nie – nejde o obydlie."
      }
    },

    {
      typ: "P",
      otazka: "Procesný postup orgánov činných v trestnom konaní?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre krádež, dôkazy sú použiteľné" },
        { id: "C", text: "Vylúčiť všetky dôkazy pre nezákonnosť zadržania" },
        { id: "B", text: "Vec odložiť, lebo škoda je malá" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zadržanie SBS bolo oprávnené, osobná prehliadka zákonná, dôkazy použiteľné.",
      vysvetlenie_nespravne: {
        B: "Nie – krádež je trestná aj pri nižšej škode, ak sú splnené podmienky.",
        C: "Nie – nezákonnosť tu nie je."
      }
    }
  ],

  C: `
Ide o krádež podľa § 212 TZ. 
Zadržanie SBS bolo oprávnené, osobná prehliadka políciou zákonná, dôkazy sú použiteľné.
`,

  tagy: ["MIRAC", "krádež", "SBS", "zadržanie", "osobná prehliadka", "Paneurópska"]
},
{
  id: "TC82",
  nazov: "Tréningový prípad 82",
  obtiaznost: "ťažká",

  M: `
Obvinený je podozrivý, že vylákal peniaze od viacerých osôb ako „investície“. 
Súd vydal príkaz na domovú prehliadku jeho bytu. 
Pri prehliadke polícia zaistila zmluvy, hotovosť a notebook. 
V príkaze však nebolo výslovne uvedené zaistenie elektronických zariadení.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Podvod podľa § 221 TZ" },
        { id: "A", text: "Sprenevera" },
        { id: "B", text: "Krádež" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Vylákanie peňazí na základe klamstva = podvod.",
      vysvetlenie_nespravne: {
        A: "Nie – vec mu nebola zverená.",
        B: "Nie – nešlo o zmocnenie sa veci."
      }
    },

    {
      typ: "R",
      otazka: "Bola domová prehliadka zákonná?",
      moznosti: [
        { id: "A", text: "Áno – bola vykonaná na základe príkazu súdu" },
        { id: "C", text: "Nie – pri podvode nemožno robiť domovú prehliadku" },
        { id: "B", text: "Nie – lebo obvinený nesúhlasil" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Príkaz súdu je základnou podmienkou zákonnosti.",
      vysvetlenie_nespravne: {
        B: "Nie – súhlas obvineného netreba.",
        C: "Nie – domová prehliadka je možná pri závažnej trestnej činnosti."
      }
    },

    {
      typ: "A",
      otazka: "Je zaistenie notebooku zákonné, ak nebol výslovne uvedený v príkaze?",
      moznosti: [
        { id: "C", text: "Áno, ak ide o vec dôležitú pre trestné konanie" },
        { id: "A", text: "Nie, musí byť vždy výslovne uvedený" },
        { id: "B", text: "Nie, elektronika sa nesmie zaistiť" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Pri domovej prehliadke možno zaistiť veci dôležité pre konanie, aj keď nie sú všetky menovite uvedené.",
      vysvetlenie_nespravne: {
        A: "Nie – zákon nevyžaduje úplný výpočet.",
        B: "Nie – elektronika nie je chránená výnimkou."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Dôkazy (zmluvy, hotovosť, notebook) sú použiteľné" },
        { id: "C", text: "Notebook je nezákonný dôkaz" },
        { id: "B", text: "Celá prehliadka je nezákonná" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Príkaz súdu + veci dôležité pre konanie = zákonné zaistenie.",
      vysvetlenie_nespravne: {
        B: "Nie – neboli porušené podmienky.",
        C: "Nie – notebook spadá pod veci dôležité pre konanie."
      }
    }
  ],

  C: `
Ide o podvod podľa § 221 TZ. 
Domová prehliadka bola zákonná, zaistenie vecí vrátane notebooku je v poriadku, dôkazy sú použiteľné.
`,

  tagy: ["MIRAC", "podvod", "domová prehliadka", "zaistenie veci", "Paneurópska"]
},
{
  id: "TC83",
  nazov: "Tréningový prípad 83",
  obtiaznost: "stredná",

  M: `
Vodič spôsobil dopravnú nehodu, pri ktorej bol spolujazdec zranený (liečenie 10 dní). 
Polícia mala podozrenie, že vodič je pod vplyvom alkoholu. 
Vodič odmietol dychovú skúšku. 
Polícia nariadila odber krvi v nemocnici bez jeho súhlasu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Ublíženie na zdraví z nedbanlivosti v súvislosti s dopravou" },
        { id: "A", text: "Úmyselné ublíženie na zdraví" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Dopravná nehoda + zranenie = typicky nedbanlivosť.",
      vysvetlenie_nespravne: {
        A: "Nie – chýba úmysel.",
        B: "Nie – nejde o narušenie verejného poriadku."
      }
    },

    {
      typ: "R",
      otazka: "Bol odber krvi bez súhlasu zákonný?",
      moznosti: [
        { id: "A", text: "Áno – pri podozrení z trestného činu v doprave je to možné" },
        { id: "C", text: "Nie – vždy treba súhlas vodiča" },
        { id: "B", text: "Nie – treba príkaz súdu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zákon umožňuje odber krvi pri podozrení z trestného činu v doprave.",
      vysvetlenie_nespravne: {
        B: "Nie – príkaz súdu nie je podmienkou.",
        C: "Nie – súhlas nie je nevyhnutný."
      }
    },

    {
      typ: "A",
      otazka: "Je výsledok krvnej skúšky použiteľný ako dôkaz?",
      moznosti: [
        { id: "C", text: "Áno – odber bol zákonný" },
        { id: "A", text: "Nie – bol proti vôli vodiča" },
        { id: "B", text: "Nie – chýbal príkaz súdu" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Zákonný odber = zákonný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Nie – zákon to umožňuje.",
        B: "Nie – príkaz súdu netreba."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie, krvný test použiť ako dôkaz" },
        { id: "C", text: "Krvný test vylúčiť" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dôkaz je zákonný a relevantný.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – nebol porušený zákon."
      }
    }
  ],

  C: `
Ide o ublíženie na zdraví z nedbanlivosti v doprave. 
Odber krvi bol zákonný, výsledok je použiteľný dôkaz.
`,

  tagy: ["MIRAC", "doprava", "ublíženie", "odber krvi", "Paneurópska"]
},
{
  id: "TC84",
  nazov: "Tréningový prípad 84",
  obtiaznost: "ťažká",

  M: `
Pred barom došlo k bitke viacerých osôb. 
Polícia na mieste zadržala muža, ktorého svedkovia označili ako iniciátora útoku. 
Na druhý deň svedkovi ukázali štyri fotografie, medzi nimi aj jeho, 
a požiadali ho, aby označil útočníka. Svedok označil obvineného.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Výtržníctvo, prípadne v súbehu s ublížením na zdraví" },
        { id: "A", text: "Len ublíženie na zdraví" },
        { id: "B", text: "Len priestupok" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Verejná bitka = výtržníctvo, pri zranení aj súbeh.",
      vysvetlenie_nespravne: {
        A: "Nie – verejný charakter nemožno ignorovať.",
        B: "Nie – intenzita môže dosahovať trestný čin."
      }
    },

    {
      typ: "R",
      otazka: "Bolo zadržanie na mieste zákonné?",
      moznosti: [
        { id: "A", text: "Áno – osoba bola pristihnutá pri čine" },
        { id: "C", text: "Nie – treba príkaz súdu" },
        { id: "B", text: "Nie – polícia nemôže zadržať na mieste" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri pristihnutí pri čine je zadržanie možné.",
      vysvetlenie_nespravne: {
        B: "Nie – polícia má túto právomoc.",
        C: "Nie – príkaz súdu netreba."
      }
    },

    {
      typ: "A",
      otazka: "Bola rekognícia podľa fotografií zákonná?",
      moznosti: [
        { id: "C", text: "Áno – boli použité viaceré fotografie" },
        { id: "A", text: "Nie – vždy treba živé osoby" },
        { id: "B", text: "Nie – obvinený musel byť prítomný" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Rekognícia môže byť aj podľa fotografií, ak sú viaceré a porovnateľné.",
      vysvetlenie_nespravne: {
        A: "Nie – zákon umožňuje aj fotografie.",
        B: "Nie – prítomnosť obvineného nie je nutná pri fotorekognícii."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Dôkazy (zadržanie, rekognícia) sú použiteľné" },
        { id: "C", text: "Rekogníciu treba vylúčiť" },
        { id: "B", text: "Zadržanie bolo nezákonné" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Postup bol v súlade so zákonom.",
      vysvetlenie_nespravne: {
        B: "Nie – osoba bola pristihnutá pri čine.",
        C: "Nie – rekognícia spĺňala podmienky."
      }
    }
  ],

  C: `
Ide o výtržníctvo, prípadne v súbehu s ublížením na zdraví. 
Zadržanie na mieste a rekognícia podľa viacerých fotografií boli zákonné, dôkazy sú použiteľné.
`,

  tagy: ["MIRAC", "výtržníctvo", "zadržanie", "rekognícia", "Paneurópska"]
},
{
  id: "TC85",
  nazov: "Tréningový prípad 85",
  obtiaznost: "ťažká",

  M: `
Obvinený požičiaval peniaze osobám v tiesni za extrémne úroky. 
Polícia bez príkazu sudcu odpočúvala jeho telefonáty s dlžníkmi. 
Na základe obsahu hovorov identifikovala poškodených a získala od nich výpovede.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Úžera podľa § 235 TZ" },
        { id: "A", text: "Podvod" },
        { id: "B", text: "Krádež" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Zneužitie tiesne + hrubý nepomer plnení = úžera.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o omyl.",
        B: "Nie – nejde o zmocnenie sa veci."
      }
    },

    {
      typ: "R",
      otazka: "Bolo odpočúvanie zákonné?",
      moznosti: [
        { id: "B", text: "Nie – chýbal príkaz sudcu" },
        { id: "A", text: "Áno – pri úžere netreba príkaz" },
        { id: "C", text: "Áno – ak operátor súhlasil" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Odpočúvanie vždy vyžaduje príkaz sudcu.",
      vysvetlenie_nespravne: {
        A: "Nie – úžera nie je výnimka.",
        C: "Nie – operátor nemôže nahradiť súd."
      }
    },

    {
      typ: "A",
      otazka: "Aký je osud výpovedí poškodených, ktorí boli identifikovaní na základe nezákonného odpočúvania?",
      moznosti: [
        { id: "C", text: "Spravidla sú tiež problematické ako odvodené dôkazy" },
        { id: "A", text: "Sú vždy použiteľné, lebo ide o svedkov" },
        { id: "B", text: "Sú použiteľné, ak to schváli prokurátor" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ide o reťazenie nezákonnosti – ovocie z otráveného stromu.",
      vysvetlenie_nespravne: {
        A: "Nie – spôsob získania kontaktu je kľúčový.",
        B: "Nie – prokurátor nemôže legalizovať nezákonnosť."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Nezákonné odpočúvanie a naň nadväzujúce dôkazy treba vylúčiť" },
        { id: "C", text: "Použiť všetko, lebo ide o závažnú trestnú činnosť" },
        { id: "B", text: "Vylúčiť len nahrávky, výpovede ponechať" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Reťazenie nezákonných dôkazov kontaminuje aj odvodené dôkazy.",
      vysvetlenie_nespravne: {
        B: "Nie – sú priamo odvodené z nezákonného dôkazu.",
        C: "Nie – závažnosť činu neospravedlňuje porušenie zákona."
      }
    }
  ],

  C: `
Ide o úžeru podľa § 235 TZ. 
Odpočúvanie bez príkazu sudcu je nezákonné, 
dôkazy z neho a naň nadväzujúce sú spravidla nepoužiteľné.
`,

  tagy: ["MIRAC", "úžera", "odpočúvanie", "nezákonný dôkaz", "Paneurópska"]
},
{
  id: "TC86",
  nazov: "Tréningový prípad 86",
  obtiaznost: "ťažká",

  M: `
Polícia vykonala domovú prehliadku u obvineného pre podozrenie z drogovej trestnej činnosti. 
Obvinený sa pokúsil utiecť cez zadný východ, ale bol zadržaný. 
Nemá trvalé bydlisko a v minulosti sa vyhýbal konaniu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký procesný problém riešime?",
      moznosti: [
        { id: "C", text: "Úteková väzba" },
        { id: "A", text: "Kolúzna väzba" },
        { id: "B", text: "Predvedenie" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Útekový dôvod je zrejmý – pokus o útek + nestabilné pomery.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o ovplyvňovanie svedkov.",
        B: "Nie – osoba bola zadržaná pri úteku."
      }
    },

    {
      typ: "R",
      otazka: "Bolo zadržanie zákonné?",
      moznosti: [
        { id: "A", text: "Áno – osoba sa pokúsila utiecť počas prehliadky" },
        { id: "C", text: "Nie – treba príkaz súdu" },
        { id: "B", text: "Nie – polícia nemôže zadržať pri úteku" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri úteku je zadržanie zákonné.",
      vysvetlenie_nespravne: {
        B: "Nie – polícia môže zadržať pri úteku.",
        C: "Nie – príkaz súdu netreba."
      }
    },

    {
      typ: "A",
      otazka: "Je dôvod na väzbu?",
      moznosti: [
        { id: "C", text: "Áno – útekový dôvod je naplnený" },
        { id: "A", text: "Nie – pokus o útek nestačí" },
        { id: "B", text: "Nie – domová prehliadka to vylučuje" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Útek + nestabilné pomery = úteková väzba.",
      vysvetlenie_nespravne: {
        A: "Nie – pokus o útek je silný dôvod.",
        B: "Nie – prehliadka nemá vplyv na väzbu."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Navrhnúť útekovú väzbu" },
        { id: "C", text: "Pustiť obvineného na slobodu" },
        { id: "B", text: "Uložiť dohľad probačného úradníka" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Útekový dôvod je jasný.",
      vysvetlenie_nespravne: {
        B: "Nie – dohľad nerieši riziko úteku.",
        C: "Nie – riziko je vysoké."
      }
    }
  ],

  C: `
Úteková väzba je dôvodná. Zadržanie bolo zákonné, dôkazy sú použiteľné.
`,

  tagy: ["MIRAC", "väzba", "domová prehliadka", "zadržanie", "Paneurópska"]
},
{
  id: "TC87",
  nazov: "Tréningový prípad 87",
  obtiaznost: "ťažká",

  M: `
Obvinený je podozrivý z lúpeže. 
Po zadržaní poslal kamarátovi správu: 
„Dohodni sa s tým chalanom, nech povie, že ma nevidel.“ 
Svedok bol následne predvedený a vykonala sa rekognícia medzi 5 osobami.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký procesný problém riešime?",
      moznosti: [
        { id: "C", text: "Kolúzna väzba" },
        { id: "A", text: "Úteková väzba" },
        { id: "B", text: "Predvedenie" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Obvinený sa snažil ovplyvniť svedka.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o útek.",
        B: "Nie – predvedenie nie je hlavný problém."
      }
    },

    {
      typ: "R",
      otazka: "Bola rekognícia zákonná?",
      moznosti: [
        { id: "A", text: "Áno – bola vykonaná medzi viacerými osobami" },
        { id: "C", text: "Nie – vždy treba fotografie" },
        { id: "B", text: "Nie – obvinený musí byť prítomný" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Rekognícia medzi osobami je plne zákonná.",
      vysvetlenie_nespravne: {
        B: "Nie – prítomnosť obvineného nie je nutná.",
        C: "Nie – fotografie nie sú povinné."
      }
    },

    {
      typ: "A",
      otazka: "Je dôvod na kolúznu väzbu?",
      moznosti: [
        { id: "C", text: "Áno – obvinený sa pokúsil ovplyvniť svedka" },
        { id: "A", text: "Nie – správa nestačí" },
        { id: "B", text: "Nie – svedok už vypovedal" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Správa je jasný pokus o ovplyvňovanie.",
      vysvetlenie_nespravne: {
        A: "Nie – správa je dostatočná.",
        B: "Nie – kolúzny dôvod trvá aj po výpovedi."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Navrhnúť kolúznu väzbu" },
        { id: "C", text: "Pustiť obvineného" },
        { id: "B", text: "Uložiť dohľad" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Kolúzne riziko je vysoké.",
      vysvetlenie_nespravne: {
        B: "Nie – dohľad nerieši ovplyvňovanie.",
        C: "Nie – riziko je jasné."
      }
    }
  ],

  C: `
Kolúzna väzba je dôvodná. Rekognícia bola zákonná a použiteľná.
`,

  tagy: ["MIRAC", "rekognícia", "kolúzna väzba", "Paneurópska"]
},
{
  id: "TC88",
  nazov: "Tréningový prípad 88",
  obtiaznost: "stredná",

  M: `
Obvinený si bez dovolenia požičal auto svojho brata. 
Spôsobil dopravnú nehodu. 
Polícia mala podozrenie, že je pod vplyvom alkoholu. 
Odmietol dychovú skúšku, preto bol vykonaný odber krvi.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Neoprávnené užívanie cudzej veci (§ 216 TZ)" },
        { id: "A", text: "Krádež" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Chýbal úmysel prisvojiť si auto.",
      vysvetlenie_nespravne: {
        A: "Nie – auto chcel vrátiť.",
        B: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "R",
      otazka: "Bol odber krvi zákonný?",
      moznosti: [
        { id: "A", text: "Áno – pri odmietnutí dychovej skúšky je to možné" },
        { id: "C", text: "Nie – treba súhlas vodiča" },
        { id: "B", text: "Nie – treba príkaz súdu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zákon umožňuje odber krvi pri odmietnutí dychovej skúšky.",
      vysvetlenie_nespravne: {
        B: "Nie – príkaz súdu netreba.",
        C: "Nie – súhlas nie je podmienkou."
      }
    },

    {
      typ: "A",
      otazka: "Je výsledok krvnej skúšky použiteľný?",
      moznosti: [
        { id: "C", text: "Áno – odber bol zákonný" },
        { id: "A", text: "Nie – bol proti vôli vodiča" },
        { id: "B", text: "Nie – chýbal príkaz súdu" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Zákonný odber = zákonný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Nie – zákon to umožňuje.",
        B: "Nie – príkaz netreba."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Začať stíhanie pre § 216 TZ a použiť krvný test" },
        { id: "C", text: "Vylúčiť krvný test" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dôkaz je zákonný a relevantný.",
      vysvetlenie_nespravne: {
        B: "Nie – ide o trestný čin.",
        C: "Nie – odber bol zákonný."
      }
    }
  ],

  C: `
Ide o neoprávnené užívanie cudzej veci. Odber krvi bol zákonný a dôkaz je použiteľný.
`,

  tagy: ["MIRAC", "auto", "odber krvi", "Paneurópska"]
},
{
  id: "TC89",
  nazov: "Tréningový prípad 89",
  obtiaznost: "ťažká",

  M: `
Obvinený prevádzkoval falošný e‑shop. 
Súd vydal príkaz na domovú prehliadku. 
Polícia zaistila notebook, mobil a externý disk. 
Obvinený tvrdí, že elektronika nebola v príkaze uvedená.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Podvod (§ 221 TZ)" },
        { id: "A", text: "Krádež" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Falošný e‑shop = typický podvod.",
      vysvetlenie_nespravne: {
        A: "Nie – nešlo o zmocnenie sa veci.",
        B: "Nie – vec mu nebola zverená."
      }
    },

    {
      typ: "R",
      otazka: "Bolo zaistenie elektroniky zákonné?",
      moznosti: [
        { id: "A", text: "Áno – ide o veci dôležité pre trestné konanie" },
        { id: "C", text: "Nie – musia byť menovite uvedené" },
        { id: "B", text: "Nie – elektroniku nemožno zaistiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri domovej prehliadke možno zaistiť všetko dôležité pre konanie.",
      vysvetlenie_nespravne: {
        B: "Nie – elektronika nie je výnimka.",
        C: "Nie – zákon nevyžaduje úplný výpočet."
      }
    },

    {
      typ: "A",
      otazka: "Je dôkaz použiteľný?",
      moznosti: [
        { id: "C", text: "Áno – zaistenie bolo zákonné" },
        { id: "A", text: "Nie – elektronika nebola v príkaze" },
        { id: "B", text: "Nie – treba nový príkaz" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Zaistenie bolo v súlade so zákonom.",
      vysvetlenie_nespravne: {
        A: "Nie – príkaz nemusí obsahovať všetko.",
        B: "Nie – nový príkaz netreba."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Použiť všetky zaistené dôkazy" },
        { id: "C", text: "Vylúčiť elektroniku" },
        { id: "B", text: "Vylúčiť len externý disk" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Všetky veci boli zaistené zákonne.",
      vysvetlenie_nespravne: {
        B: "Nie – nie je dôvod.",
        C: "Nie – elektronika je použiteľná."
      }
    }
  ],

  C: `
Ide o podvod. Zaistenie elektroniky bolo zákonné a dôkazy sú použiteľné.
`,

  tagy: ["MIRAC", "podvod", "domová prehliadka", "elektronika", "Paneurópska"]
},
{
  id: "TC90",
  nazov: "Tréningový prípad 90",
  obtiaznost: "stredná",

  M: `
V nočnom klube došlo k bitke. 
Obvinený udrel poškodeného do tváre a spôsobil mu zranenie (liečenie 6 dní). 
Polícia ho zadržala a vykonala osobnú prehliadku, pri ktorej našla boxer.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Ublíženie na zdraví + výtržníctvo" },
        { id: "A", text: "Len ublíženie na zdraví" },
        { id: "B", text: "Len výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Verejná bitka + zranenie = súbeh výtržníctva a ublíženia.",
      vysvetlenie_nespravne: {
        A: "Ignoruje verejný charakter konania.",
        B: "Ignoruje spôsobené zranenie."
      }
    },

    {
      typ: "R",
      otazka: "Bola osobná prehliadka zákonná?",
      moznosti: [
        { id: "A", text: "Áno – bola vykonaná po zadržaní pri dôvodnom podozrení" },
        { id: "C", text: "Nie – vždy treba príkaz súdu" },
        { id: "B", text: "Nie – treba súhlas obvineného" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Pri dôvodnom podozrení možno vykonať osobnú prehliadku aj bez príkazu.",
      vysvetlenie_nespravne: {
        B: "Súhlas obvineného nie je podmienkou.",
        C: "Príkaz súdu nie je vždy potrebný."
      }
    },

    {
      typ: "A",
      otazka: "Je nález boxera použiteľný ako dôkaz?",
      moznosti: [
        { id: "C", text: "Áno – bol nájdený pri zákonnej osobnej prehliadke" },
        { id: "A", text: "Nie – bol nájdený proti vôli obvineného" },
        { id: "B", text: "Nie – nebol uvedený v príkaze" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ak je osobná prehliadka zákonná, všetko nájdené je použiteľné.",
      vysvetlenie_nespravne: {
        A: "Vôľa obvineného nie je kritérium.",
        B: "Pri osobnej prehliadke sa veci nemusia špecifikovať."
      }
    },

    {
      typ: "P",
      otazka: "Aký je procesný záver?",
      moznosti: [
        { id: "A", text: "Začať stíhanie pre ublíženie a výtržníctvo, boxer použiť ako dôkaz" },
        { id: "C", text: "Vylúčiť boxer z dokazovania" },
        { id: "B", text: "Posúdiť vec len ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zranenie + verejná bitka = trestný čin, boxer je relevantný dôkaz.",
      vysvetlenie_nespravne: {
        B: "Intenzita konania presahuje priestupok.",
        C: "Dôkaz bol získaný zákonne."
      }
    }
  ],

  C: `
Ide o súbeh ublíženia na zdraví a výtržníctva. 
Osobná prehliadka bola zákonná, boxer je použiteľný dôkaz.
`,

  tagy: ["MIRAC", "ublíženie", "výtržníctvo", "osobná prehliadka", "Paneurópska"]
},
{
  id: "TC91",
  nazov: "Tréningový prípad 91",
  obtiaznost: "stredná",

  M: `
V nákupnom centre bola odcudzená kabelka. 
Svedkyňa videla muža utekať a opísala ho polícii. 
O hodinu neskôr polícia zadržala muža zodpovedajúceho popisu. 
Na policajnej stanici vykonala rekogníciu podľa fotografií medzi 6 osobami.
`,

  kroky: [
    {
      typ: "I",
      otazka: "Aký hmotnoprávny problém riešime?",
      moznosti: [
        { id: "C", text: "Krádež (§ 212 TZ)" },
        { id: "A", text: "Podvod" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Zmocnenie sa kabelky = krádež.",
      vysvetlenie_nespravne: {
        A: "Nešlo o uvedenie do omylu.",
        B: "Vec mu nebola zverená."
      }
    },

    {
      typ: "R",
      otazka: "Bola rekognícia zákonná?",
      moznosti: [
        { id: "A", text: "Áno – bola vykonaná medzi viacerými fotografiami" },
        { id: "C", text: "Nie – vždy treba živé osoby" },
        { id: "B", text: "Nie – obvinený musí byť prítomný" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Fotorekognícia je zákonná, ak sú viaceré porovnávacie osoby.",
      vysvetlenie_nespravne: {
        B: "Prítomnosť obvineného nie je nutná.",
        C: "Fotografie sú plnohodnotná forma."
      }
    },

    {
      typ: "A",
      otazka: "Bolo zadržanie zákonné?",
      moznosti: [
        { id: "C", text: "Áno – osoba zodpovedala popisu a bola podozrivá z činu" },
        { id: "A", text: "Nie – treba príkaz súdu" },
        { id: "B", text: "Nie – polícia nemôže zadržať podľa popisu" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Pri bezprostrednom podozrení môže polícia zadržať osobu.",
      vysvetlenie_nespravne: {
        A: "Príkaz súdu netreba.",
        B: "Popis je relevantný dôvod."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Dôkazy sú použiteľné, začať stíhanie pre krádež" },
        { id: "C", text: "Rekogníciu treba vylúčiť" },
        { id: "B", text: "Zadržanie bolo nezákonné" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Postup bol zákonný.",
      vysvetlenie_nespravne: {
        B: "Zadržanie bolo oprávnené.",
        C: "Rekognícia bola vykonaná správne."
      }
    }
  ],

  C: `
Ide o krádež. Zadržanie aj rekognícia boli zákonné, dôkazy sú použiteľné.
`,

  tagy: ["MIRAC", "krádež", "rekognícia", "zadržanie", "Paneurópska"]
},
{
  id: "TC92",
  nazov: "Tréningový prípad 92",
  obtiaznost: "ťažká",

  M: `
Obvinený ponúkal falošné investície. 
Polícia bez príkazu sudcu získala jeho telefonické záznamy od operátora. 
Na základe nich identifikovala poškodených a získala ich výpovede.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký hmotnoprávny čin ide?",
      moznosti: [
        { id: "C", text: "Podvod (§ 221 TZ)" },
        { id: "A", text: "Sprenevera" },
        { id: "B", text: "Krádež" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Vylákanie peňazí = podvod.",
      vysvetlenie_nespravne: {
        A: "Vec mu nebola zverená.",
        B: "Nešlo o zmocnenie sa veci."
      }
    },

    {
      typ: "R",
      otazka: "Bolo odpočúvanie zákonné?",
      moznosti: [
        { id: "B", text: "Nie – chýbal príkaz sudcu" },
        { id: "A", text: "Áno – operátor môže poskytnúť záznamy" },
        { id: "C", text: "Áno – pri podvode netreba príkaz" }
      ],
      spravna: "B",
      vysvetlenie_spravne: "Odpočúvanie vždy vyžaduje príkaz sudcu.",
      vysvetlenie_nespravne: {
        A: "Operátor nemôže nahradiť súd.",
        C: "Podvod nie je výnimka."
      }
    },

    {
      typ: "A",
      otazka: "Čo s výpoveďami poškodených získanými na základe nezákonného odpočúvania?",
      moznosti: [
        { id: "C", text: "Sú problematické ako odvodené dôkazy" },
        { id: "A", text: "Sú vždy použiteľné" },
        { id: "B", text: "Stačí ich potvrdiť prokurátorom" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ide o reťazenie nezákonnosti.",
      vysvetlenie_nespravne: {
        A: "Spôsob získania kontaktu je rozhodujúci.",
        B: "Prokurátor nemôže legalizovať nezákonnosť."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Vylúčiť odpočúvanie aj odvodené dôkazy" },
        { id: "C", text: "Použiť všetko" },
        { id: "B", text: "Vylúčiť len nahrávky" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Nezákonný dôkaz kontaminuje ďalšie dôkazy.",
      vysvetlenie_nespravne: {
        B: "Odvodené dôkazy sú tiež problematické.",
        C: "Závažnosť činu neospravedlňuje nezákonnosť."
      }
    }
  ],

  C: `
Ide o podvod. Odpočúvanie bolo nezákonné, odvodené dôkazy sú nepoužiteľné.
`,

  tagy: ["MIRAC", "podvod", "odpočúvanie", "nezákonný dôkaz", "Paneurópska"]
},
{
  id: "TC93",
  nazov: "Tréningový prípad 93",
  obtiaznost: "stredná",

  M: `
Vodič zrazil chodca na priechode. 
Chodec utrpel zranenie s liečením 12 dní. 
Vodič odmietol dychovú skúšku. 
Polícia nariadila odber krvi bez jeho súhlasu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký čin ide?",
      moznosti: [
        { id: "C", text: "Ublíženie na zdraví z nedbanlivosti" },
        { id: "A", text: "Úmyselné ublíženie" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Dopravná nehoda = typicky nedbanlivosť.",
      vysvetlenie_nespravne: {
        A: "Chýba úmysel.",
        B: "Nejde o verejný poriadok."
      }
    },

    {
      typ: "R",
      otazka: "Bol odber krvi zákonný?",
      moznosti: [
        { id: "A", text: "Áno – pri odmietnutí dychovej skúšky je to možné" },
        { id: "C", text: "Nie – treba súhlas vodiča" },
        { id: "B", text: "Nie – treba príkaz súdu" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zákon to umožňuje.",
      vysvetlenie_nespravne: {
        B: "Príkaz netreba.",
        C: "Súhlas nie je podmienkou."
      }
    },

    {
      typ: "A",
      otazka: "Je výsledok krvi použiteľný?",
      moznosti: [
        { id: "C", text: "Áno – odber bol zákonný" },
        { id: "A", text: "Nie – bol proti vôli vodiča" },
        { id: "B", text: "Nie – chýbal príkaz" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Zákonný odber = zákonný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Vôľa vodiča nie je kritérium.",
        B: "Príkaz netreba."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Začať stíhanie, krvný test použiť" },
        { id: "C", text: "Vylúčiť krvný test" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dôkaz je relevantný.",
      vysvetlenie_nespravne: {
        B: "Ide o trestný čin.",
        C: "Odber bol zákonný."
      }
    }
  ],

  C: `
Ide o ublíženie na zdraví z nedbanlivosti. Odber krvi bol zákonný.
`,

  tagy: ["MIRAC", "doprava", "ublíženie", "odber krvi", "Paneurópska"]
},
{
  id: "TC94",
  nazov: "Tréningový prípad 94",
  obtiaznost: "ťažká",

  M: `
Obvinený sa zúčastnil bitky pred barom. 
Svedkovia uviedli, že použil boxer. 
Polícia vykonala domovú prehliadku na základe príkazu súdu a boxer našla.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký čin ide?",
      moznosti: [
        { id: "C", text: "Výtržníctvo, prípadne v súbehu s ublížením" },
        { id: "A", text: "Len ublíženie" },
        { id: "B", text: "Len priestupok" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Verejná bitka = výtržníctvo.",
      vysvetlenie_nespravne: {
        A: "Ignoruje verejnosť.",
        B: "Intenzita presahuje priestupok."
      }
    },

    {
      typ: "R",
      otazka: "Bola domová prehliadka zákonná?",
      moznosti: [
        { id: "A", text: "Áno – bola vykonaná na základe príkazu súdu" },
        { id: "C", text: "Nie – treba súhlas obvineného" },
        { id: "B", text: "Nie – boxer musí byť uvedený v príkaze" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Príkaz súdu je postačujúci.",
      vysvetlenie_nespravne: {
        B: "Veci nemusia byť menovite uvedené.",
        C: "Súhlas obvineného netreba."
      }
    },

    {
      typ: "A",
      otazka: "Je boxer použiteľný dôkaz?",
      moznosti: [
        { id: "C", text: "Áno – bol nájdený pri zákonnej prehliadke" },
        { id: "A", text: "Nie – nebol uvedený v príkaze" },
        { id: "B", text: "Nie – bol v súkromí obvineného" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Zákonná prehliadka = použiteľný dôkaz.",
      vysvetlenie_nespravne: {
        A: "Veci nemusia byť menovite uvedené.",
        B: "Súkromie nebráni zákonnému zaisteniu."
      }
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Použiť boxer ako dôkaz" },
        { id: "C", text: "Vylúčiť boxer" },
        { id: "B", text: "Posúdiť vec len ako priestupok" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Dôkaz je zákonný.",
      vysvetlenie_nespravne: {
        B: "Intenzita konania je trestná.",
        C: "Nie je dôvod na vylúčenie."
      }
    }
  ],

  C: `
Domová prehliadka bola zákonná, boxer je použiteľný dôkaz.
`,

  tagy: ["MIRAC", "výtržníctvo", "domová prehliadka", "Paneurópska"]
},
{
  id: "TC95",
  nazov: "Tréningový prípad 95",
  obtiaznost: "stredná",

  M: `
Obvinený dostal od zamestnávateľa služobný notebook. 
Po výpovedi ho nevrátil a používal ho pre seba. 
Polícia notebook zaistila pri kontrole auta.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký čin ide?",
      moznosti: [
        { id: "C", text: "Sprenevera (§ 213 TZ)" },
        { id: "A", text: "Krádež" },
        { id: "B", text: "Podvod" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Notebook mu bol zverený a nevrátil ho – typická sprenevera.",
      vysvetlenie_nespravne: {
        A: "Nie – nejde o zmocnenie sa cudzej veci bez zverenia.",
        B: "Nie – nejde o uvedenie do omylu."
      }
    },

    {
      typ: "R",
      otazka: "Bolo zaistenie notebooku zákonné?",
      moznosti: [
        { id: "A", text: "Áno – ide o vec dôležitú pre trestné konanie" },
        { id: "C", text: "Nie – vždy treba príkaz súdu" },
        { id: "B", text: "Nie – notebook bol v aute, nie v byte" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Zaistenie veci dôležitej pre konanie možno vykonať aj bez príkazu súdu.",
      vysvetlenie_nespravne: {
        B: "Miesto nálezu (auto) nebráni zaisteniu.",
        C: "Príkaz súdu nie je podmienkou zaistenia veci."
      }
    },

    {
      typ: "A",
      otazka: "Je notebook použiteľný ako dôkaz?",
      moznosti: [
        { id: "C", text: "Áno – bol zaistený zákonným spôsobom" },
        { id: "A", text: "Nie – bol v súkromnom aute obvineného" },
        { id: "B", text: "Nie – patrí zamestnávateľovi, nie obvinenému" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Ak je zaistenie zákonné, vec je použiteľný dôkaz bez ohľadu na vlastníctvo či miesto nálezu.",
      vysvetlenie_nespravne: {
        A: "Súkromné auto nebráni zákonnému zaisteniu.",
        B: "Práve to, že patrí zamestnávateľovi, je pre spreneveru podstatné."
      }
    },

    {
      typ: "P",
      otazka: "Aký je procesný záver?",
      moznosti: [
        { id: "A", text: "Začať trestné stíhanie pre spreneveru, notebook použiť ako dôkaz" },
        { id: "C", text: "Notebook vylúčiť z dokazovania" },
        { id: "B", text: "Vec posúdiť len ako občianskoprávny spor" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Konanie napĺňa znaky sprenevery, notebook je kľúčový dôkaz.",
      vysvetlenie_nespravne: {
        B: "Nejde len o civilný spor, ale o trestný čin.",
        C: "Nie je dôvod na vylúčenie dôkazu."
      }
    }
  ],

  C: `
Ide o spreneveru podľa § 213 TZ. 
Notebook bol zaistený zákonne a je plne použiteľný ako dôkaz v trestnom konaní.
`,

  tagy: ["MIRAC", "sprenevera", "zaistenie veci", "Paneurópska"]
},
{
  id: "TC96",
  nazov: "Tréningový prípad 96",
  obtiaznost: "ťažká",

  M: `
Poškodený bol prepadnutý na ulici. 
Svedok videl páchateľa utekať a opísal ho polícii. 
Polícia zadržala muža zodpovedajúceho popisu. 
Obvinený poslal kamarátovi správu: „Povedz tomu chalanovi, nech drží hubu.“ 
Rekognícia bola vykonaná medzi 5 osobami.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký čin ide?",
      moznosti: [
        { id: "C", text: "Lúpež (§ 188 TZ)" },
        { id: "A", text: "Krádež" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Použitie násilia pri odňatí veci = lúpež."
    },

    {
      typ: "R",
      otazka: "Bola rekognícia zákonná?",
      moznosti: [
        { id: "A", text: "Áno – bola vykonaná medzi viacerými osobami" },
        { id: "C", text: "Nie – musí byť vždy podľa fotografií" },
        { id: "B", text: "Nie – obvinený musí byť prítomný" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Rekognícia medzi osobami je plne zákonná."
    },

    {
      typ: "A",
      otazka: "Je dôvod na kolúznu väzbu?",
      moznosti: [
        { id: "C", text: "Áno – obvinený sa pokúsil ovplyvniť svedka" },
        { id: "A", text: "Nie – správa nestačí" },
        { id: "B", text: "Nie – svedok už vypovedal" }
      ],
      spravna: "C",
      vysvetlenie_spravne: "Správa je jasný pokus o ovplyvňovanie."
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Navrhnúť kolúznu väzbu" },
        { id: "C", text: "Pustiť obvineného" },
        { id: "B", text: "Uložiť dohľad" }
      ],
      spravna: "A",
      vysvetlenie_spravne: "Kolúzne riziko je vysoké."
    }
  ],

  C: `
Ide o lúpež. Rekognícia bola zákonná, kolúzna väzba je dôvodná.
`,

  tagy: ["MIRAC", "lúpež", "rekognícia", "kolúzna väzba", "Paneurópska"]
},
{
  id: "TC97",
  nazov: "Tréningový prípad 97",
  obtiaznost: "stredná",

  M: `
Obvinený vykonával stavebné práce bez živnostenského oprávnenia. 
Súd vydal príkaz na domovú prehliadku. 
Polícia zaistila účtovné doklady, faktúry a hotovosť.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký čin ide?",
      moznosti: [
        { id: "C", text: "Neoprávnené podnikanie (§ 251 TZ)" },
        { id: "A", text: "Podvod" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C"
    },

    {
      typ: "R",
      otazka: "Bola domová prehliadka zákonná?",
      moznosti: [
        { id: "A", text: "Áno – bola vykonaná na základe príkazu súdu" },
        { id: "C", text: "Nie – pri podnikaní nemožno robiť prehliadku" },
        { id: "B", text: "Nie – treba súhlas obvineného" }
      ],
      spravna: "A"
    },

    {
      typ: "A",
      otazka: "Je zaistenie účtovníctva zákonné?",
      moznosti: [
        { id: "C", text: "Áno – ide o veci dôležité pre trestné konanie" },
        { id: "A", text: "Nie – musia byť menovite uvedené" },
        { id: "B", text: "Nie – účtovníctvo je súkromné" }
      ],
      spravna: "C"
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Použiť zaistené doklady ako dôkaz" },
        { id: "C", text: "Vylúčiť účtovníctvo" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A"
    }
  ],

  C: `
Ide o neoprávnené podnikanie. Domová prehliadka aj zaistenie účtovníctva boli zákonné.
`,

  tagy: ["MIRAC", "podnikanie", "domová prehliadka", "Paneurópska"]
},
{
  id: "TC98",
  nazov: "Tréningový predaj 98",
  obtiaznost: "ťažká",

  M: `
Obvinený sa zúčastnil bitky pred klubom. 
Poškodený utrpel zranenie s liečením 9 dní. 
Polícia odobrala obvinenému vzorku DNA bez jeho súhlasu.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký čin ide?",
      moznosti: [
        { id: "C", text: "Ublíženie na zdraví + výtržníctvo" },
        { id: "A", text: "Len ublíženie" },
        { id: "B", text: "Len výtržníctvo" }
      ],
      spravna: "C"
    },

    {
      typ: "R",
      otazka: "Bol odber DNA zákonný?",
      moznosti: [
        { id: "A", text: "Áno – pri dôvodnom podozrení možno odobrať DNA aj bez súhlasu" },
        { id: "C", text: "Nie – vždy treba súhlas" },
        { id: "B", text: "Nie – treba príkaz súdu" }
      ],
      spravna: "A"
    },

    {
      typ: "A",
      otazka: "Je DNA použiteľná ako dôkaz?",
      moznosti: [
        { id: "C", text: "Áno – odber bol zákonný" },
        { id: "A", text: "Nie – bol proti vôli obvineného" },
        { id: "B", text: "Nie – chýbal príkaz" }
      ],
      spravna: "C"
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Použiť DNA ako dôkaz" },
        { id: "C", text: "Vylúčiť DNA" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A"
    }
  ],

  C: `
Odber DNA bol zákonný, dôkaz je použiteľný.
`,

  tagy: ["MIRAC", "DNA", "výtržníctvo", "ublíženie", "Paneurópska"]
},
{
  id: "TC99",
  nazov: "Tréningový prípad 99",
  obtiaznost: "ťažká",

  M: `
Obvinený prevádzkoval falošný servis elektroniky. 
Polícia mala informáciu, že v garáži skladuje nevrátené zariadenia zákazníkov. 
Bez príkazu vošla do garáže a veci zaistila.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký čin ide?",
      moznosti: [
        { id: "C", text: "Podvod" },
        { id: "A", text: "Krádež" },
        { id: "B", text: "Sprenevera" }
      ],
      spravna: "C"
    },

    {
      typ: "R",
      otazka: "Bola prehliadka garáže zákonná?",
      moznosti: [
        { id: "A", text: "Áno – garáž je iný priestor, kde stačí neodkladnosť" },
        { id: "C", text: "Nie – garáž je obydlie" },
        { id: "B", text: "Nie – treba príkaz súdu vždy" }
      ],
      spravna: "A"
    },

    {
      typ: "A",
      otazka: "Je zaistenie vecí použiteľné?",
      moznosti: [
        { id: "C", text: "Áno – ak bola preukázaná neodkladnosť" },
        { id: "A", text: "Nie – garáž je súkromný priestor" },
        { id: "B", text: "Nie – veci neboli uvedené v príkaze" }
      ],
      spravna: "C"
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Použiť zaistené veci ako dôkaz" },
        { id: "C", text: "Vylúčiť všetko" },
        { id: "B", text: "Vec odložiť" }
      ],
      spravna: "A"
    }
  ],

  C: `
Garáž je iný priestor, nie obydlie. Prehliadka bola zákonná, dôkazy sú použiteľné.
`,

  tagy: ["MIRAC", "podvod", "iné priestory", "Paneurópska"]
},
{
  id: "TC100",
  nazov: "Tréningový prípad  100",
  obtiaznost: "ťažká",

  M: `
Polícia mala podozrenie, že obvinený spáchal lúpež. 
Bez príkazu sudcu získala jeho telefonické záznamy. 
Na základe nich identifikovala komplicov a získala ich výpovede.
`,

  kroky: [
    {
      typ: "I",
      otazka: "O aký čin ide?",
      moznosti: [
        { id: "C", text: "Lúpež" },
        { id: "A", text: "Krádež" },
        { id: "B", text: "Výtržníctvo" }
      ],
      spravna: "C"
    },

    {
      typ: "R",
      otazka: "Bolo odpočúvanie zákonné?",
      moznosti: [
        { id: "B", text: "Nie – chýbal príkaz sudcu" },
        { id: "A", text: "Áno – pri lúpeži netreba príkaz" },
        { id: "C", text: "Áno – ak operátor súhlasil" }
      ],
      spravna: "B"
    },

    {
      typ: "A",
      otazka: "Čo s výpoveďami komplicov získanými na základe nezákonného odpočúvania?",
      moznosti: [
        { id: "C", text: "Sú problematické ako odvodené dôkazy" },
        { id: "A", text: "Sú použiteľné vždy" },
        { id: "B", text: "Stačí ich potvrdiť prokurátorom" }
      ],
      spravna: "C"
    },

    {
      typ: "P",
      otazka: "Procesný záver?",
      moznosti: [
        { id: "A", text: "Vylúčiť odpočúvanie aj odvodené dôkazy" },
        { id: "C", text: "Použiť všetko" },
        { id: "B", text: "Vylúčiť len nahrávky" }
      ],
      spravna: "A"
    }
  ],

  C: `
Odpočúvanie bolo nezákonné. Výpovede komplicov sú odvodené dôkazy a sú nepoužiteľné.
`,

  tagy: ["MIRAC", "lúpež", "odpočúvanie", "nezákonný dôkaz", "Paneurópska"]
}










];


// ===== VEĽKÝ KVÍZ (zatím prázdny) =====
const TRESTNE_QUIZ = [];

// ===== EXPORT DO WINDOW =====
window.TRESTNE_SECTIONS = TRESTNE_SECTIONS;
window.TRESTNE_QUESTIONS = TRESTNE_QUESTIONS;
window.TRESTNE_QUIZ = TRESTNE_QUIZ;
