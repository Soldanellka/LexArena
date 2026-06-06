// script.js
// Verzia: pevné pozície v stĺpcoch, vizuálne zvýraznenie, animácie wrong/matched
// Obsahuje kompletné dáta pre Trestné právo hmotné (A1–A30),
// Trestné právo procesné (B1–B30) a Latinské právnické pojmy (C1–C30) zamerané na trestné právo

// Konfigurácia
const ROWS = 5;
const COLS = 3;

// ---------- Dáta (hmotné A1–A30) ----------
const hmotneTriples = [
  { id: 'A1', question: 'Pojem, funkcie a zásady trestného práva hmotného',
    definition: 'Odvetvie práva určujúce, ktoré konania sú trestné a aké sankcie im hrozia; plní preventívnu, represívnu a výchovnú funkciu.',
    example: 'Zákon stanovuje, že úmyselné usmrtenie je trestným činom s konkrétnou trestnou sadzbou.' },
  { id: 'A2', question: 'Trestný čin a jeho druhy, triedenie',
    definition: 'Konkrétne protiprávne konanie definované zákonom; delí sa podľa závažnosti, formy viny, predmetu útoku a iných kritérií.',
    example: 'Rozlíšenie medzi prečinom a zločinom podľa horného limitu trestu.' },
  { id: 'A3', question: 'Skutková podstata – pojem, znaky a triedenie',
    definition: 'Súhrn objektívnych a subjektívnych znakov, ktoré musia byť splnené, aby konanie bolo trestným činom.',
    example: 'Skutková podstata krádeže obsahuje odňatie cudzej veci v úmysle privlastniť si ju.' },
  { id: 'A4', question: 'Objektívne znaky skutkovej podstaty',
    definition: 'Vonkajšie prvky činu: konanie alebo opomenutie, následok, príčinná súvislosť a spôsob spáchania.',
    example: 'Pri ublížení na zdraví je objektívnym znakom spôsobenie ujmy na zdraví.' },
  { id: 'A5', question: 'Páchateľ trestného činu – FO a PO',
    definition: 'Fyzická alebo právnická osoba, ktorá môže niesť trestnoprávnu zodpovednosť podľa zákona.',
    example: 'Spoločnosť môže byť trestne zodpovedná za hospodársky trestný čin spáchaný jej konateľom.' },
  { id: 'A6', question: 'Subjektívna stránka a omyl v trestnom práve',
    definition: 'Vnútorný vzťah páchateľa k činu: úmysel alebo nedbanlivosť; omyl môže vylúčiť alebo zmierniť vinu.',
    example: 'Páchateľ konajúci v omyle o skutočnostiach, ktoré vylučujú trestnosť, môže byť oslobodený.' },
  { id: 'A7', question: 'Okolnosti vylučujúce protiprávnosť',
    definition: 'Situácie, kedy konanie, hoci napĺňa znaky činu, nie je protiprávne (napr. nutná obrana, krajné núdzové opatrenie).',
    example: 'Obrana pred bezprostredným útokom, pri ktorej páchateľ spôsobí ujmu útočníkovi.' },
  { id: 'A8', question: 'Vývinové štádiá trestného činu',
    definition: 'Fázy od prípravy cez pokus až po dokonanie; právne následky sa líšia podľa štádia.',
    example: 'Príprava môže byť trestná len pri niektorých činoch; pokus je často trestnejší.' },
  { id: 'A9', question: 'Trestná súčinnosť a účastníctvo',
    definition: 'Spôsoby zapojenia viacerých osôb: spolupáchateľ, návodca, pomocník; rozdiely v zodpovednosti.',
    example: 'Osoba, ktorá poskytne návod na spáchanie trestného činu, môže byť trestne zodpovedná ako návodca.' },
  { id: 'A10', question: 'Súbeh trestných činov a recidíva',
    definition: 'Súbeh: spáchanie viacerých činov; recidíva: opakované spáchanie po predchádzajúcom odsúdení.',
    example: 'Pri súbehu sa pri ukladaní trestu zohľadňuje súhrn trestov; recidíva môže zvýšiť trest.' },
  { id: 'A11', question: 'Pojem a účel trestu, jednotlivé druhy trestov',
    definition: 'Trest je sankcia za trestný čin; účelom je prevencia, odplata a resocializácia; druhy: väzenie, pokuta, podmienka.',
    example: 'Uloženie odňatia slobody za závažný trestný čin s cieľom ochrany spoločnosti.' },
  { id: 'A12', question: 'Ochranné opatrenia a výchovné opatrenia',
    definition: 'Opatrenia zamerané na ochranu spoločnosti a nápravu páchateľa; líšia sa podľa veku a povahy páchateľa.',
    example: 'Umiestnenie osoby s duševnou poruchou do ústavu ako ochranné opatrenie.' },
  { id: 'A13', question: 'Trestná zodpovednosť a trestanie mladistvých',
    definition: 'Špecifické pravidlá pre mladistvých, dôraz na výchovné a resocializačné opatrenia namiesto represie.',
    example: 'Mladistvý páchateľ môže dostať výchovné opatrenie namiesto väzenia.' },
  { id: 'A14', question: 'Trestná zodpovednosť a trestanie právnických osôb',
    definition: 'Právnické osoby môžu niesť zodpovednosť za trestné činy spáchané v ich prospech; sankcie sú špecifické.',
    example: 'Firma pokutovaná za daňový podvod spáchaný jej zamestnancami.' },
  { id: 'A15', question: 'Dôvody zániku trestnosti a trestu, zahladenie odsúdenia',
    definition: 'Právne dôvody ukončenia trestnosti alebo trestu: premlčanie, amnestia, zahladenie odsúdenia, zánik trestu.',
    example: 'Po uplynutí premlčacej lehoty už nie je možné stíhať za určitý čin.' },
  { id: 'A16', question: 'Vplyv práva Európskej únie na trestné právo hmotné',
    definition: 'Právo EÚ ovplyvňuje národné trestné právo cez smernice a nariadenia, najmä v oblasti hospodárskej trestnej činnosti a spolupráce.',
    example: 'Implementácia smernice EÚ o boji proti praniu špinavých peňazí do vnútroštátneho práva.' },
  { id: 'A17', question: 'Trestné činy proti životu',
    definition: 'Činy, ktoré ohrozujú alebo berú ľudský život: vražda, usmrtenie, zabitie z nedbanlivosti.',
    example: 'Úmyselné usmrtenie s plánovaním je kvalifikované ako vražda.' },
  { id: 'A18', question: 'Trestné činy proti zdraviu a ohrozujúce život alebo zdravie',
    definition: 'Činy spôsobujúce ujmu na zdraví alebo ohrozenie života, vrátane ublíženia na zdraví a nebezpečného vyhrážania.',
    example: 'Fyzické napadnutie, ktoré spôsobí ťažkú ujmu na zdraví.' },
  { id: 'A19', question: 'Trestné činy proti slobode',
    definition: 'Činy zasahujúce do osobnej slobody: únos, neoprávnené obmedzenie slobody, vydieranie.',
    example: 'Zadržanie osoby proti jej vôli s cieľom vynútiť si plnenie požiadaviek.' },
  { id: 'A20', question: 'Trestné činy proti ľudskej dôstojnosti',
    definition: 'Činy narúšajúce dôstojnosť človeka: sexuálne trestné činy, ponižovanie, hanobenie.',
    example: 'Sexuálne obťažovanie na pracovisku, ktoré znižuje dôstojnosť obete.' },
  { id: 'A21', question: 'Trestné činy proti rodine a mládeži',
    definition: 'Činy ohrozujúce rodinné vzťahy a práva detí: zanedbávanie, zneužívanie, obchodovanie s deťmi.',
    example: 'Zanedbávanie starostlivosti o dieťa vedúce k ohrozeniu jeho zdravia.' },
  { id: 'A22', question: 'Trestné činy proti majetku',
    definition: 'Činy zamerané na cudzie majetkové hodnoty: krádež, sprenevera, podvod, poškodzovanie cudzej veci.',
    example: 'Krádež peňazí z peňaženky v obchode.' },
  { id: 'A23', question: 'Trestné činy hospodárske',
    definition: 'Ekonomické trestné činy: podvod, daňové úniky, pranie špinavých peňazí, hospodárska korupcia.',
    example: 'Falošné faktúry vystavené za účelom vyvádzania prostriedkov.' },
  { id: 'A24', question: 'Trestné činy všeobecne nebezpečné a proti životnému prostrediu',
    definition: 'Činy ohrozujúce verejné bezpečie alebo životné prostredie: šírenie nebezpečných látok, požiare.',
    example: 'Neoprávnené vypúšťanie toxických látok do rieky.' },
  { id: 'A25', question: 'Trestné činy proti republike',
    definition: 'Činy ohrozujúce ústavný poriadok štátu: vlastizrady, teroristické útoky, sabotáže.',
    example: 'Plánovanie útoku s cieľom zvrhnúť ústavný poriadok.' },
  { id: 'A26', question: 'Trestné činy proti poriadku vo verejných veciach',
    definition: 'Činy narúšajúce verejný poriadok: výtržníctvo, nelegálne zhromažďovanie, ohrozovanie verejného poriadku.',
    example: 'Organizovanie násilného protestu, ktorý ohrozuje verejnosť.' },
  { id: 'A27', question: 'Korupcia',
    definition: 'Zneužitie verejnej moci alebo postavenia pre súkromný prospech; úplatky, prijímanie výhod, klientelizmus.',
    example: 'Úradník prijme peniaze za udelenie verejnej zákazky.' },
  { id: 'A28', question: 'Trestné činy proti iným právam a slobodám',
    definition: 'Činy zasahujúce do práv a slobôd osôb: porušenie tajomstva komunikácie, neoprávnené nakladanie s údajmi.',
    example: 'Neoprávnené zverejnenie citlivých osobných údajov.' },
  { id: 'A29', question: 'Trestné činy proti brannosti a vojenské trestné činy',
    definition: 'Činy ohrozujúce obranyschopnosť štátu alebo porušenie vojenských povinností; špecifické pre ozbrojené sily.',
    example: 'Dezercia počas vojenského konfliktu.' },
  { id: 'A30', question: 'Trestné činy proti mieru ľudskosti terorizmus extrémizmus a vojnové trestné činy',
    definition: 'Závažné medzinárodné trestné činy: genocída, zločiny proti ľudskosti, terorizmus, vojnové zločiny.',
    example: 'Organizovanie teroristického útoku s cieľom zastrašiť civilné obyvateľstvo.' }
];

// ---------- Dáta (procesné B1–B30) ----------
const procesneTriples = [
  { id: 'B1', question: 'Základné zásady trestného konania',
    definition: 'Zásady ako zákonnosť, prezumpcia neviny, právo na obhajobu, verejnosť konania a rýchlosť konania.',
    example: 'Obvinený má právo na obhajcu a súd musí rozhodovať podľa zákona.' },
  { id: 'B2', question: 'Ochrana základných práv a slobôd v trestnom konaní',
    definition: 'Zabezpečenie práv obvineného, poškodeného a svedkov počas konania; proporcionalita zásahov.',
    example: 'Zákaz mučenia, právo na súkromie pri domovej prehliadke s povolením súdu.' },
  { id: 'B3', question: 'Subjekty a strany trestného konania',
    definition: 'Účastníci konania: obvinený, poškodený, obhajoba, prokurátor, súd, orgány činné v trestnom konaní.',
    example: 'Prokurátor podáva obžalobu, obvinený sa bráni prostredníctvom obhajcu.' },
  { id: 'B4', question: 'Súdy, orgány činné v trestnom konaní a pomocné osoby',
    definition: 'Súdna sústava, polícia, prokuratúra a znalci, tlmočníci, lekári ako pomocné osoby v procese.',
    example: 'Polícia vykonáva vyšetrovanie, znalec posudzuje odborné otázky.' },
  { id: 'B5', question: 'Obvinený, postavenie obvineného a výsluch obvineného',
    definition: 'Práva obvineného: informovanie o obvinení, právo mlčať, právo na obhajcu, pravidlá výsluchu.',
    example: 'Obvinenému musí byť oznámené, z čoho je obvinený a má právo nevypovedať.' },
  { id: 'B6', question: 'Obhajca a osoby so samostatnými obhajovacími právami',
    definition: 'Právo na obhajcu, jeho úlohy a prípady, kedy má osoba samostatné obhajovacie práva (napr. právny zástupca).',
    example: 'Obvinený si môže zvoliť obhajcu alebo mu bude pridelený z úradnej moci.' },
  { id: 'B7', question: 'Poškodený, obeť a zúčastnená osoba',
    definition: 'Postavenie poškodeného v konaní, práva na informácie, podanie súkromnej žaloby a náhradu škody.',
    example: 'Poškodený môže byť vypočutý ako svedok a žiadať náhradu škody.' },
  { id: 'B8', question: 'Procesné úkony a poskytovanie informácií v trestnom konaní',
    definition: 'Úkony ako domová prehliadka, zaistenie vecí, výsluchy; povinnosti oznamovať práva účastníkom.',
    example: 'Pri domovej prehliadke musí byť prítomný protokol a účastníci informovaní o dôvode.' },
  { id: 'B9', question: 'Zaistenie osôb na účely trestného konania',
    definition: 'Opatrenia na zaistenie osoby: zadržanie, väzba, eskortovanie; podmienky a lehoty zaistenia.',
    example: 'Osoba môže byť zadržaná pri bezprostrednom spáchaní trestného činu na krátky čas.' },
  { id: 'B10', question: 'Zaistenie vecí pre účely trestného konania',
    definition: 'Zaistenie dôkazov a vecí súvisiacich s trestným činom; pravidlá uskladnenia a vrátenia.',
    example: 'Polícia zaistí počítač ako dôkaz pri vyšetrovaní kybernetického trestného činu.' },
  { id: 'B11', question: 'Informačno-technické prostriedky v trestnom konaní',
    definition: 'Použitie technických prostriedkov pri dokazovaní: záznamy, forenzné analýzy, elektronické dôkazy.',
    example: 'Forenzná analýza telefónu preukáže komunikáciu medzi podozrivými.' },
  { id: 'B12', question: 'Prostriedky operatívno-pátracej činnosti',
    definition: 'Operatívne metódy: odpočúvanie, sledovanie, tajné získavanie informácií za zákonných podmienok.',
    example: 'Súdne povolenie na odpočúvanie pri vyšetrovaní organizovaného zločinu.' },
  { id: 'B13', question: 'Dokazovanie a dôkazné prostriedky',
    definition: 'Pravidlá dokazovania, hodnotenie dôkazov, druhy dôkazných prostriedkov: listiny, svedectvá, znalecké posudky.',
    example: 'Súd posudzuje dôkaznú hodnotu svedectva a znaleckého posudku.' },
  { id: 'B14', question: 'Svedok v trestnom konaní',
    definition: 'Postavenie svedka, práva a povinnosti, ochrana svedkov a pravidlá výsluchu.',
    example: 'Svedok je povinný vypovedať, ale môže mať výnimky (napr. blízka osoba).' },
  { id: 'B15', question: 'Odborná činnosť a znalecká činnosť v trestnom konaní',
    definition: 'Znalecké posudky a odborné stanoviská ako dôkazné prostriedky; výber znalca a jeho úloha.',
    example: 'Znalec z oblasti forenznej medicíny posudzuje príčinu smrti.' },
  { id: 'B16', question: 'Rozhodnutia v trestnom konaní',
    definition: 'Druhy rozhodnutí: rozhodnutia o vznesení obvinenia, obžalobe, rozsudky, rozhodnutia o väzbe a opatreniach.',
    example: 'Súd vydá rozhodnutie o vzatí do väzby alebo prepustení na slobodu.' },
  { id: 'B17', question: 'Časti a štádiá trestného konania',
    definition: 'Fázy konania: predbežné/ predsúdne konanie, prípravné konanie, hlavné pojednávanie, vykonávacie konanie.',
    example: 'Po ukončení prípravného konania prokurátor podá obžalobu na súd.' },
  { id: 'B18', question: 'Predsúdne konanie',
    definition: 'Úkony pred podaním obžaloby: vyšetrovanie, zhromažďovanie dôkazov, rozhodnutia prokurátora o ďalšom postupe.',
    example: 'Prokurátor rozhodne, či podá obžalobu alebo zastaví trestné stíhanie.' },
  { id: 'B19', question: 'Rozhodnutia po skončení prípravného konania',
    definition: 'Možné rozhodnutia: podanie obžaloby, zastavenie konania, podanie návrhu na trestné stíhanie iným spôsobom.',
    example: 'Prokurátor podá obžalobu na súd alebo konanie zastaví pre nedostatok dôkazov.' },
  { id: 'B20', question: 'Dozor a úkony prokurátora v predsúdnom konaní',
    definition: 'Prokurátor vykonáva dozor nad vyšetrovaním, môže dávať pokyny orgánom činným v trestnom konaní.',
    example: 'Prokurátor nariadi doplnenie dokazovania alebo zmenu kvalifikácie činu.' },
  { id: 'B21', question: 'Preskúmanie obžaloby a predbežné prejednanie obžaloby',
    definition: 'Súd preverí formálne náležitosti obžaloby a rozhodne o jej prijatí alebo vrátení prokurátorovi.',
    example: 'Súd v predbežnom konaní posúdi, či obžaloba obsahuje všetky náležitosti.' },
  { id: 'B22', question: 'Hlavné pojednávanie',
    definition: 'Hlavná fáza, kde sú predkladané dôkazy, vypočúvajú sa svedkovia a súd rozhoduje o vine a treste.',
    example: 'Na hlavnom pojednávaní vypovedajú svedkovia a predkladajú sa znalecké posudky.' },
  { id: 'B23', question: 'Meritórne rozhodnutia súdu na hlavnom pojednávaní',
    definition: 'Rozsudok a iné meritórne rozhodnutia, ktoré rozhodujú o vine, treste a náhrade škody.',
    example: 'Súd vynesie rozsudok o vine a uloží trest odňatia slobody.' },
  { id: 'B24', question: 'Verejné a neverejné zasadnutie súdu',
    definition: 'Zásada verejnosti konania s výnimkami pre ochranu súkromia, štátneho tajomstva alebo bezpečnosti.',
    example: 'Súd môže vylúčiť verejnosť pri citlivých prípadoch týkajúcich sa obetí.' },
  { id: 'B25', question: 'Riadne opravné prostriedky',
    definition: 'Odvolanie a iné riadne opravné prostriedky proti rozhodnutiam súdu v zákonom stanovených lehotách.',
    example: 'Obvinený podá odvolanie proti rozsudku prvostupňového súdu.' },
  { id: 'B26', question: 'Mimoriadne opravné prostriedky',
    definition: 'Možnosti ako obnova konania alebo sťažnosť prokurátorovi proti právoplatným rozhodnutiam v osobitých prípadoch.',
    example: 'Obnova konania pri nových dôkazoch, ktoré by mohli zmeniť rozhodnutie.' },
  { id: 'B27', question: 'Osobitné spôsoby konania',
    definition: 'Zjednodušené alebo špeciálne postupy (napr. rýchle konanie, konanie v neprítomnosti) upravené zákonom.',
    example: 'Rýchle konanie pri menej závažných trestných činoch s kratšími lehotami.' },
  { id: 'B28', question: 'Probácia a mediácia v trestnom konaní',
    definition: 'Alternatívne opatrenia zamerané na resocializáciu a zmiernenie následkov: dohody, mediácia, probácia.',
    example: 'Obvinený uzavrie dohodu o vine a treste alebo absolvuje probáciu.' },
  { id: 'B29', question: 'Právny styk s cudzinou',
    definition: 'Medzinárodná spolupráca: vydávanie osôb, právna pomoc, vykonávanie dôkazov v zahraničí.',
    example: 'Žiadosť o medzinárodnú právnu pomoc pri získavaní dôkazov zo zahraničia.' },
  { id: 'B30', question: 'Spolupráca v trestných veciach medzi štátmi Európskej únie',
    definition: 'Mechanizmy spolupráce EÚ: európsky zatykač, výmena informácií, spoločné vyšetrovanie.',
    example: 'Vydanie osoby na základe európskeho zatykača medzi členskými štátmi.' }
];

// ---------- Dáta (latinské C1–C30) zamerané na trestné právo ----------
const latinTriples = [
  { id: 'C1', question: 'actus reus',
    definition: 'Objektívna stránka trestného činu; vonkajšie konanie alebo následok.',
    example: 'Odňatie cudzej veci pri krádeži predstavuje actus reus.' },
  { id: 'C2', question: 'mens rea',
    definition: 'Subjektívna stránka; vnútorný postoj páchateľa (úmysel alebo nedbanlivosť).',
    example: 'Plánovanie podvodu ukazuje prítomnosť mens rea.' },
  { id: 'C3', question: 'dolus directus',
    definition: 'Priame úmyselné konanie; páchateľ chce dosiahnuť výsledok.',
    example: 'Páchateľ cielene zastrelí obeť s úmyslom zabiť.' },
  { id: 'C4', question: 'dolus eventualis',
    definition: 'Prípadný úmysel; páchateľ akceptuje možný následok svojho konania.',
    example: 'Vodič ignoruje riziko pri rýchlej jazde a spôsobí smrť.' },
  { id: 'C5', question: 'culpa lata',
    definition: 'Hrubá nedbanlivosť; vysoká miera viny pri konaní bez primeranej starostlivosti.',
    example: 'Lekár zanedbá základné postupy a spôsobí vážne zranenie.' },
  { id: 'C6', question: 'culpa levis',
    definition: 'Ľahká nedbanlivosť; nižšia miera viny pri bežnej nepozornosti.',
    example: 'Drobná nepozornosť vodiča bez vážnych následkov.' },
  { id: 'C7', question: 'nullum crimen sine lege',
    definition: 'Žiadny zločin bez zákona; zákaz retroaktivity trestného práva.',
    example: 'Nemôžete trestať konanie, ktoré v čase spáchania nebolo trestné.' },
  { id: 'C8', question: 'nulla poena sine lege',
    definition: 'Žiadny trest bez zákona; trest musí byť zákonom stanovený.',
    example: 'Súd nemôže uložiť trest, ktorý nie je predpísaný zákonom.' },
  { id: 'C9', question: 'in dubio pro reo',
    definition: 'V pochybnostiach v prospech obvineného; zásada oslobodenia pri nejasnostiach.',
    example: 'Pri nepresvedčivých dôkazoch súd oslobodí obvineného.' },
  { id: 'C10', question: 'ne bis in idem',
    definition: 'Nemožno súdiť dvakrát za tú istú vec; zákaz opätovného trestného stíhania.',
    example: 'Po právoplatnom rozsudku nemožno znovu súdiť za ten istý skutok.' },
  { id: 'C11', question: 'corpus delicti',
    definition: 'Dôkaz, že trestný čin sa stal; jadro skutku (napr. telo pri vražde).',
    example: 'Nájdené telo predstavuje corpus delicti pri vyšetrovaní vraždy.' },
  { id: 'C12', question: 'lex loci delicti',
    definition: 'Zákon miesta spáchania deliktu; aplikácia práva podľa miesta skutku.',
    example: 'Pri delikte spáchanom v zahraničí sa aplikuje lex loci delicti.' },
  { id: 'C13', question: 'lex mitior',
    definition: 'Uplatní sa miernejší zákon, ak sa zákon zmenil po spáchaní činu.',
    example: 'Ak zákon zmiernil trest, použije sa lex mitior.' },
  { id: 'C14', question: 'lex specialis derogat legi generali',
    definition: 'Špeciálny predpis má prednosť pred všeobecným zákonom.',
    example: 'Osobitný trestný predpis sa aplikuje pred všeobecným zákonom.' },
  { id: 'C15', question: 'lex posterior derogat priori',
    definition: 'Novší zákon ruší starší v prípade konfliktu noriem.',
    example: 'Nová právna úprava mení predchádzajúcu úpravu v konflikte.' },
  { id: 'C16', question: 'habeas corpus',
    definition: 'Ochrana osobnej slobody; príkaz na predvedenie osoby pred súd.',
    example: 'Podanie na preverenie zákonnosti zadržania osoby.' },
  { id: 'C17', question: 'res judicata',
    definition: 'Vec právoplatne rozhodnutá; právoplatný rozsudok bráni opätovnému súdeniu.',
    example: 'Právoplatný rozsudok je res judicata.' },
  { id: 'C18', question: 'ratio decidendi',
    definition: 'Právny dôvod rozhodnutia; viažuca časť rozsudku.',
    example: 'Právne odôvodnenie, na ktorom súd založil rozsudok.' },
  { id: 'C19', question: 'obiter dictum',
    definition: 'Poznámka súdu mimo rozhodnutia; nie je viažuca ako precedens.',
    example: 'Komentár súdu, ktorý nie je súčasťou záväzného rozhodnutia.' },
  { id: 'C20', question: 'dolus',
    definition: 'Úmysel; vedomé a zámerné konanie páchateľa.',
    example: 'Preukázanie dolus pri plánovanom podvode.' },
  { id: 'C21', question: 'culpa',
    definition: 'Vina; všeobecný pojem pre nedbanlivosť alebo zanedbanie povinnosti.',
    example: 'Culpa pri spôsobení škody pri dopravnej nehode.' },
  { id: 'C22', question: 'ipso jure',
    definition: 'Podľa práva samotného; právny následok nastáva automaticky.',
    example: 'Vzťah zaniká ipso jure po splnení zákonnej podmienky.' },
  { id: 'C23', question: 'in personam',
    definition: 'Voči osobe; konanie alebo nárok smerovaný proti určitej osobe.',
    example: 'Žaloba in personam na náhradu škody proti páchateľovi.' },
  { id: 'C24', question: 'in rem',
    definition: 'Voči veci; konanie zamerané na právny stav veci (napr. vlastníctvo).',
    example: 'Konanie in rem o vlastníctve nehnuteľnosti súvisiace s trestným konaním.' },
  { id: 'C25', question: 'mens legis',
    definition: 'Zmysel zákona; úmysel zákonodarcu pri výklade normy.',
    example: 'Výklad ustanovenia podľa mens legis pri posudzovaní skutku.' },
  { id: 'C26', question: 'volenti non fit injuria',
    definition: 'Kto súhlasí, nemôže sa sťažovať; súhlas vylučuje nárok na náhradu.',
    example: 'Športovec, ktorý súhlasí s rizikom, nemôže žiadať náhradu za bežné zranenie.' },
  { id: 'C27', question: 'negligentia',
    definition: 'Nedbanlivosť; širší pojem zahŕňajúci culpa levis a culpa lata.',
    example: 'Negligentia pri údržbe zariadenia vedie k úrazu.' },
  { id: 'C28', question: 'actus reus et mens rea',
    definition: 'Kombinácia objektívnej a subjektívnej stránky potrebná pre trestnosť.',
    example: 'Pre trestnosť musí byť preukázaný actus reus et mens rea.' },
  { id: 'C29', question: 'modus operandi',
    definition: 'Spôsob konania páchateľa; charakteristický postup pri trestnej činnosti.',
    example: 'Polícia porovnáva modus operandi pri sérii vlámaní.' },
  { id: 'C30', question: 'pacta sunt servanda',
    definition: 'Zásada, že dohody sa majú dodržiavať; relevantné pri dohode o vine a treste.',
    example: 'Dohoda o vine a treste sa vykonáva podľa princípu pacta sunt servanda.' }
];

// ---------- Pomocné funkcie ----------
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------- Stav hry (pevné pozície) ----------
let allTriples = [];
let visibleTriples = [];        // length <= ROWS
let remainingTriples = [];

let visibleQuestions = [];      // arrays length == ROWS (each slot holds an object or null)
let visibleDefinitions = [];
let visibleExamples = [];

let selected = { question: null, definition: null, example: null }; // {colIndex, groupId}
let correctCount = 0;
let totalTriples = 0;

// ---------- DOM ----------
const colQuestions = document.getElementById('col-questions');
const colDefinitions = document.getElementById('col-definitions');
const colExamples = document.getElementById('col-examples');

const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const progressFill = document.getElementById('progress-fill');
const selectedCountEl = document.getElementById('selected-count');
const correctCountEl = document.getElementById('correct-count');

const subjectSelect = document.getElementById('subject-select');
const restartBtn = document.getElementById('restart-btn');
const hintBtn = document.getElementById('hint-btn');

// If subjectSelect exists, ensure it has the three options
if (subjectSelect) {
  const prev = subjectSelect.value;
  subjectSelect.innerHTML = `
    <option value="hmotne">Trestné právo hmotné</option>
    <option value="procesne">Trestné právo procesné</option>
    <option value="latinske">Latinské právnické pojmy</option>
  `;
  if (prev) subjectSelect.value = prev;
}

// ---------- Inicializácia ----------
function loadSubject(subjectKey) {
  let triples;
  if (subjectKey === 'hmotne') triples = hmotneTriples;
  else if (subjectKey === 'procesne') triples = procesneTriples;
  else if (subjectKey === 'latinske') triples = latinTriples;
  else triples = hmotneTriples;

  totalTriples = triples.length;
  if (totalEl) totalEl.textContent = totalTriples;
  correctCount = 0;
  if (correctCountEl) correctCountEl.textContent = correctCount;

  // zamiešame všetky trojice a pripravíme frontu
  allTriples = shuffle(triples.map(t => ({ ...t })));
  visibleTriples = allTriples.slice(0, ROWS).map(t => ({ ...t, matched: false, hinted: false }));
  remainingTriples = allTriples.slice(ROWS).map(t => ({ ...t }));

  // vytvoríme pevné poradie v každom stĺpci (zamiešame raz)
  const qArr = shuffle(visibleTriples.map(t => ({ groupId: t.id, text: t.question })));
  const dArr = shuffle(visibleTriples.map(t => ({ groupId: t.id, text: t.definition })));
  const eArr = shuffle(visibleTriples.map(t => ({ groupId: t.id, text: t.example })));

  // ak je menej než ROWS, doplníme nully (bezpečnosť)
  visibleQuestions = Array.from({length: ROWS}, (_,i) => qArr[i] ? { ...qArr[i], matched:false, hinted:false } : null);
  visibleDefinitions = Array.from({length: ROWS}, (_,i) => dArr[i] ? { ...dArr[i], matched:false, hinted:false } : null);
  visibleExamples = Array.from({length: ROWS}, (_,i) => eArr[i] ? { ...eArr[i], matched:false, hinted:false } : null);

  // reset výberu
  selected = { question: null, definition: null, example: null };
  render();
  updateProgress();
}

function restart() {
  loadSubject(subjectSelect ? subjectSelect.value : 'hmotne');
}

// ---------- Render (nezamieša poradie) ----------
function render() {
  if (colQuestions) colQuestions.innerHTML = '';
  if (colDefinitions) colDefinitions.innerHTML = '';
  if (colExamples) colExamples.innerHTML = '';

  // Questions column (pevné pozície 0..ROWS-1)
  visibleQuestions.forEach((card, idx) => {
    const tile = createTile(card, idx, 'question');
    if (colQuestions) colQuestions.appendChild(tile);
  });

  visibleDefinitions.forEach((card, idx) => {
    const tile = createTile(card, idx, 'definition');
    if (colDefinitions) colDefinitions.appendChild(tile);
  });

  visibleExamples.forEach((card, idx) => {
    const tile = createTile(card, idx, 'example');
    if (colExamples) colExamples.appendChild(tile);
  });

  // aktualizácie UI
  const selCount = [selected.question, selected.definition, selected.example].filter(Boolean).length;
  if (selectedCountEl) selectedCountEl.textContent = selCount;
  if (scoreEl) scoreEl.textContent = correctCount;
  if (correctCountEl) correctCountEl.textContent = correctCount;
}

function createTile(card, indexInColumn, columnType) {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.dataset.column = columnType;
  tile.dataset.index = indexInColumn;

  if (!card) {
    tile.classList.add('empty');
    tile.innerHTML = '';
    return tile;
  }

  // apply flags
  if (card.hinted) tile.classList.add('hinted');
  if (card.matched) tile.classList.add('matched');

  // selected state: compare with selected object
  const sel = selected[columnType];
  if (sel && sel.colIndex === indexInColumn && sel.groupId === card.groupId) {
    tile.classList.add('selected');
  }

  const meta = document.createElement('div');
  meta.className = 'meta';

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = card.text;
  // add full text as tooltip for desktop users
  title.title = card.text;

  const sub = document.createElement('div');
  sub.className = 'sub';
  // HTML so we can style group-id separately: "A11.question" (group-id is hidden by CSS)
  sub.innerHTML = `<span class="group-id">${card.groupId}</span>.<span class="type">${columnType}</span>`;

  meta.appendChild(title);
  meta.appendChild(sub);

  const chip = document.createElement('span');
  chip.className = 'chip';
  if (columnType === 'question') { chip.classList.add('q'); chip.textContent = 'Otázka'; }
  if (columnType === 'definition') { chip.classList.add('d'); chip.textContent = 'Definícia'; }
  if (columnType === 'example') { chip.classList.add('e'); chip.textContent = 'Príklad'; }

  tile.appendChild(chip);
  tile.appendChild(meta);

  tile.addEventListener('click', () => onTileClick(indexInColumn, columnType));
  return tile;
}

// ---------- Interakcia ----------
function onTileClick(indexInColumn, columnType) {
  // získať referenciu na kartu v príslušnom poli
  let columnArray = columnType === 'question' ? visibleQuestions : columnType === 'definition' ? visibleDefinitions : visibleExamples;
  const card = columnArray[indexInColumn];
  if (!card || card.matched) return;

  // toggle selection v danej kolóne (max 1 na kolónu)
  const current = selected[columnType];
  if (current && current.colIndex === indexInColumn && current.groupId === card.groupId) {
    // odznačiť
    selected[columnType] = null;
    render();
    return;
  }

  // nahradiť výber v tejto kolóne
  selected[columnType] = { colIndex: indexInColumn, groupId: card.groupId };
  render();

  // ak sú vybrané všetky tri, skontrolujeme
  if (selected.question && selected.definition && selected.example) {
    checkMatch();
  }
}

function checkMatch() {
  const q = selected.question.groupId;
  const d = selected.definition.groupId;
  const e = selected.example.groupId;

  // DOM prvky pre vybrané dlaždice
  const qTile = getTileElement('question', selected.question.colIndex);
  const dTile = getTileElement('definition', selected.definition.colIndex);
  const eTile = getTileElement('example', selected.example.colIndex);

  if (q === d && d === e) {
    // správna trojica -> animácia matched, potom nahradiť
    if (qTile) qTile.classList.add('matched-anim');
    if (dTile) dTile.classList.add('matched-anim');
    if (eTile) eTile.classList.add('matched-anim');

    // krátke oneskorenie, aby animácia prebehla
    setTimeout(() => {
      // odstránime trojicu z viditeľných pozícií (nahradíme novými z remainingTriples)
      replaceMatchedSlots(q);
      correctCount++;
      updateProgress();
      selected = { question: null, definition: null, example: null };
      render();
    }, 420);
  } else {
    // nesprávna trojica -> animácia wrong a vrátenie do pôvodného stavu
    if (qTile) qTile.classList.add('wrong');
    if (dTile) dTile.classList.add('wrong');
    if (eTile) eTile.classList.add('wrong');

    setTimeout(() => {
      if (qTile) qTile.classList.remove('wrong');
      if (dTile) dTile.classList.remove('wrong');
      if (eTile) eTile.classList.remove('wrong');
      selected = { question: null, definition: null, example: null };
      render();
    }, 600);
  }
}

// ---------- Pomocné: získať DOM element dlaždice podľa column a index ----------
function getTileElement(columnType, indexInColumn) {
  const col = columnType === 'question' ? colQuestions : columnType === 'definition' ? colDefinitions : colExamples;
  return col ? col.children[indexInColumn] || null : null;
}

// ---------- Nahradenie matched slotov novými trojicami ----------
function replaceMatchedSlots(groupId) {
  // nájdeme indexy v každom stĺpci, kde sa nachádza groupId
  const qIdx = visibleQuestions.findIndex(c => c && c.groupId === groupId);
  const dIdx = visibleDefinitions.findIndex(c => c && c.groupId === groupId);
  const eIdx = visibleExamples.findIndex(c => c && c.groupId === groupId);

  // odstránime z visibleTriples túto trojicu
  visibleTriples = visibleTriples.filter(t => t.id !== groupId);

  // získame ďalšiu trojicu z fronty (ak existuje)
  const next = remainingTriples.shift(); // môže byť undefined
  if (next) {
    // pridáme next do visibleTriples a vytvoríme jeho položky
    visibleTriples.push({ ...next, matched:false, hinted:false });

    // vytvoríme nové položky pre stĺpce (ponecháme pozície rovnaké)
    if (qIdx !== -1) visibleQuestions[qIdx] = { groupId: next.id, text: next.question, matched:false, hinted:false };
    if (dIdx !== -1) visibleDefinitions[dIdx] = { groupId: next.id, text: next.definition, matched:false, hinted:false };
    if (eIdx !== -1) visibleExamples[eIdx] = { groupId: next.id, text: next.example, matched:false, hinted:false };
  } else {
    // ak už nemáme ďalšie trojice, len vyprázdnime tie sloty
    if (qIdx !== -1) visibleQuestions[qIdx] = null;
    if (dIdx !== -1) visibleDefinitions[dIdx] = null;
    if (eIdx !== -1) visibleExamples[eIdx] = null;
  }
}

// ---------- Nápoveda (penalizácia) ----------
function useHint() {
  // preferuj vybranú otázku, inak náhodnú viditeľnú trojicu
  let target = null;
  if (selected.question) target = selected.question.groupId;
  if (!target) {
    const visibleIds = visibleTriples.map(t => t.id);
    if (visibleIds.length === 0) return;
    target = visibleIds[Math.floor(Math.random() * visibleIds.length)];
  }

  // označíme hinted v príslučných položkách (ak sú na obrazovke)
  visibleQuestions.forEach(c => { if (c && c.groupId === target) c.hinted = true; });
  visibleDefinitions.forEach(c => { if (c && c.groupId === target) c.hinted = true; });
  visibleExamples.forEach(c => { if (c && c.groupId === target) c.hinted = true; });
  render();

  // penalizácia
  if (correctCount > 0) {
    correctCount = Math.max(0, correctCount - 1);
    updateProgress();
  }

  setTimeout(() => {
    visibleQuestions.forEach(c => { if (c) c.hinted = false; });
    visibleDefinitions.forEach(c => { if (c) c.hinted = false; });
    visibleExamples.forEach(c => { if (c) c.hinted = false; });
    render();
  }, 1200);
}

// ---------- Progress ----------
function updateProgress() {
  const pct = totalTriples === 0 ? 0 : Math.round((correctCount / totalTriples) * 100);
  if (progressFill) progressFill.style.width = pct + '%';
  if (scoreEl) scoreEl.textContent = correctCount;
  if (correctCountEl) correctCountEl.textContent = correctCount;
}

// ---------- Eventy ----------
if (subjectSelect) subjectSelect.addEventListener('change', () => loadSubject(subjectSelect.value));
if (restartBtn) restartBtn.addEventListener('click', restart);
if (hintBtn) hintBtn.addEventListener('click', useHint);

// ---------- Theme toggle (dark / light powder-pink) ----------
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
    if (themeToggleBtn) themeToggleBtn.setAttribute('aria-pressed', 'true');
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeLabel) themeLabel.textContent = 'Denný';
  } else {
    document.body.classList.remove('light');
    if (themeToggleBtn) themeToggleBtn.setAttribute('aria-pressed', 'false');
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeLabel) themeLabel.textContent = 'Tmavý';
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light');
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('tp_theme', next); } catch (e) { /* ignore */ }
}

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem('tp_theme'); } catch (e) { saved = null; }
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
    return;
  }
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');
}

if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
initTheme();

// ---------- Štart hry ----------
loadSubject(subjectSelect ? subjectSelect.value : 'hmotne');
