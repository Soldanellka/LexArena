/* quiz.js — kompletný súbor pripravený na vloženie */

/* =========================
   DATABÁZA OTÁZOK (QUIZ)
   Pridaj sem ďalšie otázky podľa potreby.
========================= */
const QUIZ = [
  {
    otazka: "Čo je to trestný čin v zmysle trestného práva hmotného?",
    moznosti: [
      { id: "A", text: "Protiprávne konanie, ktoré je spoločensky nebezpečné a zákon ho trestá" },
      { id: "B", text: "Akékoľvek protiprávne konanie bez ohľadu na následok" },
      { id: "C", text: "Len konanie, ktoré spôsobí škodu nad určitú hranicu" },
      { id: "D", text: "Len úmyselné konanie bez ohľadu na následok" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Trestný čin = spoločensky nebezpečné protiprávne konanie, ktoré zákon označuje a trestá; zahŕňa znaky skutkovej podstaty.",
      B: "Nepresné – musí byť spoločensky nebezpečné a definované zákonom.",
      C: "Nesprávne – hranica škody nie je univerzálnym kritériom.",
      D: "Nesprávne – môže byť aj nedbanlivostný trestný čin."
    }
  },

  {
    otazka: "Ktoré tri prvky tvorí objektívna stránka trestného činu?",
    moznosti: [
      { id: "A", text: "Konanie alebo opomenutie; následok; príčinný vzťah" },
      { id: "B", text: "Úmysel; motivácia; následok" },
      { id: "C", text: "Osoba páchateľa; trest; náhrada škody" },
      { id: "D", text: "Dôkaz; svedok; znalecký posudok" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Objektívna stránka = vonkajšia podoba činu: konanie/opomenutie → následok → kauzalita.",
      B: "To sú prvky subjektívnej stránky a motívu, nie objektívnej stránky.",
      C: "Súvisia s následkami, nie s objektívnou stránkou skutku.",
      D: "Sú to procesné prostriedky dokazovania."
    }
  },

  {
    otazka: "Čo je individuálny objekt skutkovej podstaty?",
    moznosti: [
      { id: "A", text: "Konkrétny spoločenský záujem chránený daným ustanovením" },
      { id: "B", text: "Osoba páchateľa" },
      { id: "C", text: "Trest, ktorý hrozí za čin" },
      { id: "D", text: "Procesné pravidlá súdu" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Individuálny objekt odpovedá na otázku „čo toto ustanovenie chráni?“ (napr. zdravie, majetok).",
      B: "To je subjekt, nie objekt.",
      C: "Trest nie je objektom skutkovej podstaty.",
      D: "Procesné pravidlá nie sú individuálnym objektom hmotnoprávnej skutkovej podstaty."
    }
  },

  {
    otazka: "Ktoré z nasledujúcich patria medzi okolnosti vylučujúce protiprávnosť?",
    moznosti: [
      { id: "A", text: "Nutná obrana; krajné núdzové opatrenie; súhlas poškodeného" },
      { id: "B", text: "Len súhlas poškodeného" },
      { id: "C", text: "Len úmysel páchateľa" },
      { id: "D", text: "Len vek páchateľa" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Okolnosti vylučujúce protiprávnosť napr. nutná obrana, krajné núdzové opatrenie, súhlas poškodeného (ak zákon pripúšťa).",
      B: "Súhlas môže byť jednou z okolností, ale nie jedinou.",
      C: "Úmysel je súčasť subjektívnej stránky, nie okolnosť vylučujúca protiprávnosť.",
      D: "Vek môže ovplyvniť trestnú zodpovednosť, nie priamo protiprávnosť."
    }
  },

  {
    otazka: "Čo znamená pojem 'páchateľ trestného činu' v hmotnom práve?",
    moznosti: [
      { id: "A", text: "Osoba, ktorá konala alebo opomenula a spĺňa zákonné znaky páchateľa" },
      { id: "B", text: "Len osoba, ktorá bola odsúdená" },
      { id: "C", text: "Len fyzická osoba, právnické osoby nie sú páchateľmi" },
      { id: "D", text: "Osoba, ktorá podala trestné oznámenie" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Páchateľ = ten, kto spáchal trestný čin a spĺňa znaky páchateľa podľa zákona (fyzická alebo právnická osoba, ak zákon umožňuje).",
      B: "Byť odsúdený nie je definíciou páchateľa.",
      C: "Právnické osoby môžu niesť trestnú zodpovednosť podľa osobitných ustanovení.",
      D: "Podanie oznámenia nie je páchateľstvo."
    }
  },

  {
    otazka: "Ktoré oblasti patria do osobitnej časti trestného práva (druhové členenie)?",
    moznosti: [
      { id: "A", text: "Trestné činy proti životu; proti majetku; hospodárske trestné činy" },
      { id: "B", text: "Len trestné činy proti majetku" },
      { id: "C", text: "Len trestné činy proti životu" },
      { id: "D", text: "Len procesné inštitúty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Osobitná časť obsahuje skupiny trestných činov: proti životu, zdraviu, majetku, hospodárske, korupčné a pod.",
      B: "Neúplné.",
      C: "Neúplné.",
      D: "Procesné inštitúty patria do trestného práva procesného."
    }
  },

  {
    otazka: "Čo je hmotný predmet útoku v skutkovej podstate?",
    moznosti: [
      { id: "A", text: "Vec, zviera alebo človek, na ktorý páchateľ priamo pôsobí" },
      { id: "B", text: "Len majetok páchateľa" },
      { id: "C", text: "Len trest" },
      { id: "D", text: "Len miesto činu" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Hmotný predmet útoku = to, na čo páchateľ cieli (napr. 'cudzia vec' pri krádeži, 'dieťa' pri únose).",
      B: "Môže to byť majetok, ale nie len majetok páchateľa.",
      C: "Trest nie je predmet útoku.",
      D: "Miesto nie je hmotný predmet útoku."
    }
  },

  {
    otazka: "Kedy sa považuje skutok za trestný čin právnickej osoby?",
    moznosti: [
      { id: "A", text: "Ak zákon výslovne upravuje trestnú zodpovednosť právnickej osoby a sú splnené znaky" },
      { id: "B", text: "Vždy, keď koná zamestnanec" },
      { id: "C", text: "Len ak je páchateľom konateľ spoločnosti" },
      { id: "D", text: "Právnické osoby nikdy nemôžu byť trestne zodpovedné" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Právnická osoba môže niesť trestnú zodpovednosť len ak to upravuje zákon a sú splnené podmienky (napr. ziskový cieľ, nedbanlivosť pri dozore).",
      B: "Nie vždy – závisí od zákonnej úpravy a okolností.",
      C: "Nie len konateľ; závisí od konkrétnej úpravy a konania osôb v mene právnickej osoby.",
      D: "Nepravda."
    }
  },

  {
    otazka: "Ktorý princíp patrí medzi základné zásady trestného konania?",
    moznosti: [
      { id: "A", text: "Zásada presumpcie neviny" },
      { id: "B", text: "Zásada automatického trestu" },
      { id: "C", text: "Zásada verejného potrestania bez súdu" },
      { id: "D", text: "Zásada utajenia všetkých procesných úkonov" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Presumpcia neviny je základnou zásadou: obvinený sa považuje za nevinného, kým sa vina nepreukáže.",
      B: "Neexistuje.",
      C: "Protiústavné.",
      D: "Nie všeobecne platné; proces má verejnosť ako princíp s výnimkami."
    }
  },
    {
    otazka: "A1: Aké sú hlavné funkcie trestného práva hmotného?",
    moznosti: [
      { id: "A", text: "Ochrana spoločenských hodnôt, prevencia, represia" },
      { id: "B", text: "Len trestanie páchateľov" },
      { id: "C", text: "Len regulácia občianskych vzťahov" },
      { id: "D", text: "Len administratívne sankcie" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Trestné právo chráni hodnoty, pôsobí preventívne a represívne."
    }
  },
  {
    otazka: "A2: Ako sa delia trestné činy podľa závažnosti?",
    moznosti: [
      { id: "A", text: "Prečiny a zločiny" },
      { id: "B", text: "Len priestupky a trestné činy" },
      { id: "C", text: "Len úmyselné a nedbanlivostné" },
      { id: "D", text: "Len pokračovacie a jednorazové" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Základné delenie podľa závažnosti je na prečiny a zločiny."
    }
  },
  {
    otazka: "A3: Čo je skutková podstata?",
    moznosti: [
      { id: "A", text: "Súhrn znakov, ktoré musia byť splnené, aby čin bol trestný" },
      { id: "B", text: "Len následok činu" },
      { id: "C", text: "Len motív páchateľa" },
      { id: "D", text: "Len trest, ktorý hrozí" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Skutková podstata definuje znaky trestného činu (objektívne a subjektívne)."
    }
  },
  {
    otazka: "A4: Ktoré prvky patria do objektívnej stránky skutkovej podstaty?",
    moznosti: [
      { id: "A", text: "Konanie/opomenutie; následok; príčinný vzťah" },
      { id: "B", text: "Úmysel; vina; motív" },
      { id: "C", text: "Trest; sankcia; výkon trestu" },
      { id: "D", text: "Len miesto činu" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Objektívna stránka = vonkajšia podoba činu: konanie → následok → kauzalita."
    }
  },
  {
    otazka: "A5: Kto môže byť páchateľom trestného činu?",
    moznosti: [
      { id: "A", text: "Fyzická osoba; v osobitných prípadoch aj právnická osoba" },
      { id: "B", text: "Len fyzická osoba" },
      { id: "C", text: "Len právnická osoba" },
      { id: "D", text: "Len štátne orgány" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Základne páchateľom je FO; PO môže byť zodpovedná len ak to zákon upravuje."
    }
  },
  {
    otazka: "A6: Čo zahŕňa subjektívna stránka trestného činu?",
    moznosti: [
      { id: "A", text: "Úmysel alebo nedbanlivosť; motív; cieľ" },
      { id: "B", text: "Len následok" },
      { id: "C", text: "Len miesto činu" },
      { id: "D", text: "Len hmotný predmet útoku" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Subjektívna stránka opisuje psychický vzťah páchateľa k činu."
    }
  },
  {
    otazka: "A7: Ktoré inštitúty vylučujú protiprávnosť konania?",
    moznosti: [
      { id: "A", text: "Nutná obrana, krajné núdzové opatrenie, súhlas poškodeného" },
      { id: "B", text: "Len súhlas poškodeného" },
      { id: "C", text: "Len úmysel páchateľa" },
      { id: "D", text: "Len vek páchateľa" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto okolnosti môžu vylúčiť protiprávnosť konania podľa zákona."
    }
  },
  {
    otazka: "A8: Čo sú vývinové štádiá trestného činu?",
    moznosti: [
      { id: "A", text: "Príprava, pokus, dokonanie" },
      { id: "B", text: "Len príprava a dokonanie" },
      { id: "C", text: "Len pokus a dokonanie" },
      { id: "D", text: "Len následok" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Vývinové štádiá zahŕňajú prípravu, pokus a dokonanie trestného činu."
    }
  },
  {
    otazka: "A9: Čo je účastníctvo na trestnom čine?",
    moznosti: [
      { id: "A", text: "Spoluúčasť, návod, pomoc" },
      { id: "B", text: "Len priame spáchanie" },
      { id: "C", text: "Len právnická osoba" },
      { id: "D", text: "Len súdne rozhodnutie" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Účastníctvo zahŕňa rôzne formy spoluúčasti pri spáchaní činu."
    }
  },
  {
    otazka: "A10: Čo je súbeh trestných činov?",
    moznosti: [
      { id: "A", text: "Spáchanie viacerých trestných činov jedným alebo viacerými konaniami" },
      { id: "B", text: "Len opakovaný trestný čin po odsúdení" },
      { id: "C", text: "Len spojenie dvoch trestov" },
      { id: "D", text: "Len procesný pojem" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Súbeh upravuje posudzovanie viacerých činov a ukladanie trestov."
    }
  },
  {
    otazka: "A11: Aké sú hlavné druhy trestov?",
    moznosti: [
      { id: "A", text: "Odňatie slobody, peňažný trest, zákaz činnosti, podmienečné tresty" },
      { id: "B", text: "Len pokuta" },
      { id: "C", text: "Len verejnoprospešné práce" },
      { id: "D", text: "Len domáce väzenie" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Trestný zákon pozná viacero druhov trestov s rôznymi funkciami."
    }
  },
  {
    otazka: "A12: Čo sú ochranné opatrenia?",
    moznosti: [
      { id: "A", text: "Opatrenia na ochranu spoločnosti (napr. zabezpečovacie liečenie)" },
      { id: "B", text: "Len tresty" },
      { id: "C", text: "Len administratívne sankcie" },
      { id: "D", text: "Len odškodnenie obete" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Ochranné opatrenia majú preventívny charakter a dopĺňajú tresty."
    }
  },
  {
    otazka: "A13: Ako sa posudzuje trestná zodpovednosť mladistvých?",
    moznosti: [
      { id: "A", text: "Podľa osobitných pravidiel, zohľadňuje sa výchovný prístup" },
      { id: "B", text: "Rovnako ako u dospelých" },
      { id: "C", text: "Len pokuty" },
      { id: "D", text: "Len odňatie slobody" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Mladiství majú osobitnú úpravu s dôrazom na výchovu a resocializáciu."
    }
  },
  {
    otazka: "A14: Kedy môže byť právnická osoba trestne zodpovedná?",
    moznosti: [
      { id: "A", text: "Ak to zákon výslovne upravuje a sú splnené podmienky" },
      { id: "B", text: "Vždy, keď zamestnanec koná" },
      { id: "C", text: "Nikdy" },
      { id: "D", text: "Len ak je konateľ odsúdený" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Právnická osoba môže niesť zodpovednosť len podľa zákona a kritérií."
    }
  },
  {
    otazka: "A15: Čo sú dôvody zániku trestnosti?",
    moznosti: [
      { id: "A", text: "Amnestia, premlčanie, zahladenie" },
      { id: "B", text: "Len zánik trestu" },
      { id: "C", text: "Len smrť páchateľa" },
      { id: "D", text: "Len zánik následku" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Dôvody zániku trestnosti sú upravené v zákone (napr. premlčanie)."
    }
  },
  {
    otazka: "A16: Ako vplýva právo EÚ na trestné právo hmotné?",
    moznosti: [
      { id: "A", text: "Implementáciou smerníc a harmonizáciou niektorých inštitútov" },
      { id: "B", text: "Nemá žiadny vplyv" },
      { id: "C", text: "Nahrádza národné právo úplne" },
      { id: "D", text: "Len v oblasti občianskeho práva" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "EÚ ovplyvňuje národné právo najmä cez smernice a nariadenia."
    }
  },
  {
    otazka: "A17: Čo zahŕňajú trestné činy proti životu?",
    moznosti: [
      { id: "A", text: "Vražda, usmrtenie, zabitie v rôznych formách" },
      { id: "B", text: "Len ublíženie na zdraví" },
      { id: "C", text: "Len majetkové trestné činy" },
      { id: "D", text: "Len priestupky" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Trestné činy proti životu chránia najvyššiu hodnotu — život."
    }
  },
  {
    otazka: "A18: Čo sú trestné činy proti zdraviu?",
    moznosti: [
      { id: "A", text: "Ublíženie na zdraví, ohrozenie zdravia, nebezpečné vedenie" },
      { id: "B", text: "Len trestné činy proti majetku" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len administratívne delikty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto činy zasahujú telesnú integritu a zdravie osôb."
    }
  },
  {
    otazka: "A19: Čo sú trestné činy proti slobode?",
    moznosti: [
      { id: "A", text: "Únos, obmedzovanie osobnej slobody, vydieranie" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len tresty" },
      { id: "D", text: "Len priestupky" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto činy zasahujú osobnú slobodu a autonómiu jednotlivca."
    }
  },
  {
    otazka: "A20: Čo sú trestné činy proti ľudskej dôstojnosti?",
    moznosti: [
      { id: "A", text: "Sexuálne trestné činy, znásilnenie, ponižovanie" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len administratívne delikty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto činy zasahujú dôstojnosť a integritu osoby."
    }
  },
  {
    otazka: "A21: Čo sú trestné činy proti rodine a mládeži?",
    moznosti: [
      { id: "A", text: "Týranie, zanedbávanie, zneužívanie mladistvých" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len procesné inštitúty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto inštitúty chránia rodinu a práva detí."
    }
  },
  {
    otazka: "A22: Čo sú trestné činy proti majetku?",
    moznosti: [
      { id: "A", text: "Krádež, sprenevera, podvod, poškodzovanie cudzej veci" },
      { id: "B", text: "Len násilné činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len tresty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Trestné činy proti majetku chránia vlastnícke právo a majetkové vzťahy."
    }
  },
  {
    otazka: "A23: Čo sú hospodárske trestné činy?",
    moznosti: [
      { id: "A", text: "Daňové podvody, falšovanie účtovníctva, sprenevera" },
      { id: "B", text: "Len trestné činy proti životu" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len administratívne delikty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Hospodárske činy poškodzujú ekonomické záujmy a hospodársku súťaž."
    }
  },
  {
    otazka: "A24: Čo sú všeobecne nebezpečné trestné činy?",
    moznosti: [
      { id: "A", text: "Ohrozenie verejného poriadku, environmentálne trestné činy" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len tresty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto činy ohrozujú širšie spoločenské záujmy a bezpečnosť."
    }
  },
  {
    otazka: "A25: Čo sú trestné činy proti republike?",
    moznosti: [
      { id: "A", text: "Vlastizrada, ohrozenie ústavného zriadenia" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len administratívne delikty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Trestné činy proti republike chránia štátny poriadok a bezpečnosť."
    }
  },
  {
    otazka: "A26: Čo sú trestné činy proti poriadku vo verejných veciach?",
    moznosti: [
      { id: "A", text: "Protesty s násilím, výtržníctvo, ohrozenie verejného poriadku" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len tresty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto činy narúšajú verejný poriadok a bezpečnosť."
    }
  },
  {
    otazka: "A27: Čo zahŕňa korupcia v trestnom práve?",
    moznosti: [
      { id: "A", text: "Prijímanie a ponúkanie úplatku, zneužitie právomocí" },
      { id: "B", text: "Len daňové priestupky" },
      { id: "C", text: "Len občianskoprávne delikty" },
      { id: "D", text: "Len priestupky v doprave" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Korupčné činy poškodzujú verejný záujem a dôveru v inštitúcie."
    }
  },
  {
    otazka: "A28: Čo sú trestné činy proti iným právam a slobodám?",
    moznosti: [
      { id: "A", text: "Porušovanie práv na súkromie, diskriminácia, obmedzovanie práv" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len tresty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto činy zasahujú základné práva a slobody jednotlivcov."
    }
  },
  {
    otazka: "A29: Čo sú vojenské a branné trestné činy?",
    moznosti: [
      { id: "A", text: "Dezercia, zneužitie vojenských prostriedkov, vojnové delikty" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len administratívne delikty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Tieto činy sú špecifické pre vojenské prostredie a brannú povinnosť."
    }
  },
  {
    otazka: "A30: Čo sú trestné činy proti mieru a terorizmus?",
    moznosti: [
      { id: "A", text: "Teroristické útoky, vojnové zločiny, extrémistické činy" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len administratívne delikty" }
    ],
    spravna: "A",
    vysvetlenie: {
      A: "Toto sú najzávažnejšie trestné činy s medzinárodným rozmerom."
    }
  },
  {
    otazka: "1) Čo je pokus trestného činu?",
    moznosti: [
      { id: "A", text: "Konanie smerujúce bezprostredne k spáchaniu trestného činu, ktoré nebolo dokonané" },
      { id: "B", text: "Len príprava bez konkrétnych krokov" },
      { id: "C", text: "Len úmysel bez konania" },
      { id: "D", text: "Len následok bez konania" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Pokus = aktívne kroky smerujúce k dokonaniu, ktoré zlyhali alebo boli prerušené." }
  },
  {
    otazka: "2) Čo je príprava trestného činu?",
    moznosti: [
      { id: "A", text: "Plánovanie a opatrenia pred bezprostredným pokusom" },
      { id: "B", text: "Dokonanie trestného činu" },
      { id: "C", text: "Len úmysel bez akýchkoľvek krokov" },
      { id: "D", text: "Len následok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Príprava sú kroky predpokladajúce pokus; nie vždy trestná, závisí od zákona." }
  },
  {
    otazka: "3) Kedy je konanie považované za opomenutie (omisia)?",
    moznosti: [
      { id: "A", text: "Keď zákonná povinnosť konať existuje a osoba nekoná" },
      { id: "B", text: "Keď osoba koná úmyselne" },
      { id: "C", text: "Len pri nehode" },
      { id: "D", text: "Len pri trestných činoch proti majetku" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Omisia je trestná, ak existuje právna povinnosť konať (napr. dohľad nad dieťaťom)." }
  },
  {
    otazka: "4) Čo je kauzalita v trestnom práve?",
    moznosti: [
      { id: "A", text: "Príčinný vzťah medzi konaním a následkom" },
      { id: "B", text: "Len úmysel páchateľa" },
      { id: "C", text: "Len motív" },
      { id: "D", text: "Len miesto činu" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Kauzalita spája konanie páchateľa s následkom, je podmienkou zodpovednosti." }
  },
  {
    otazka: "5) Čo je subjektívna stránka trestného činu?",
    moznosti: [
      { id: "A", text: "Psychický vzťah páchateľa k činu (úmysel alebo nedbanlivosť)" },
      { id: "B", text: "Len následok" },
      { id: "C", text: "Len miesto činu" },
      { id: "D", text: "Len hmotný predmet útoku" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Subjektívna stránka zahŕňa úmysel, nedbanlivosť, motív a cieľ." }
  },
  {
    otazka: "6) Ktoré formy účastníctva poznáme?",
    moznosti: [
      { id: "A", text: "Páchateľ, návodca, pomocník" },
      { id: "B", text: "Len páchateľ" },
      { id: "C", text: "Len obvinený" },
      { id: "D", text: "Len svedok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Účastníctvo zahŕňa priame spáchanie, návod a pomoc." }
  },
  {
    otazka: "7) Čo je návodca?",
    moznosti: [
      { id: "A", text: "Osoba, ktorá podnieti alebo usmerní iného k spáchaniu trestného činu" },
      { id: "B", text: "Osoba, ktorá vykoná čin" },
      { id: "C", text: "Len svedok" },
      { id: "D", text: "Len obhajca" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Návodca vyvoláva alebo usmerňuje páchateľa; trestná zodpovednosť podľa zákona." }
  },
  {
    otazka: "8) Kedy je možné uplatniť okolnosť vylučujúcu protiprávnosť?",
    moznosti: [
      { id: "A", text: "Ak sú splnené zákonné podmienky (napr. nutná obrana)" },
      { id: "B", text: "Len ak páchateľ prizná vinu" },
      { id: "C", text: "Len pri majetkových trestných činoch" },
      { id: "D", text: "Nikdy" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Okolnosti vylučujúce protiprávnosť (nutná obrana, krajné núdzové opatrenie) sú zákonné inštitúty." }
  },
  {
    otazka: "9) Čo je nutná obrana?",
    moznosti: [
      { id: "A", text: "Odpoveď na bezprostredný útok na chránený záujem" },
      { id: "B", text: "Plánované odplatenie" },
      { id: "C", text: "Len súhlas poškodeného" },
      { id: "D", text: "Len konanie po útoku" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Nutná obrana vylučuje protiprávnosť, ak je primeraná a bezprostredná." }
  },
  {
    otazka: "10) Čo je krajné núdzové opatrenie?",
    moznosti: [
      { id: "A", text: "Konanie na odvrátenie bezprostredného nebezpečenstva, ktoré by inak vzniklo" },
      { id: "B", text: "Len trestné konanie po nehode" },
      { id: "C", text: "Len súhlas poškodeného" },
      { id: "D", text: "Len konanie s úmyslom poškodiť" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Krajné núdzové opatrenie vylučuje protiprávnosť pri odvracaní nebezpečenstva." }
  },
  {
    otazka: "11) Čo je nevyhnutná primeranosť pri nutnej obrane?",
    moznosti: [
      { id: "A", text: "Účinok obrany nesmie byť zjavne neprimeraný voči útoku" },
      { id: "B", text: "Obrana musí byť vždy smrteľná" },
      { id: "C", text: "Obrana musí byť pasívna" },
      { id: "D", text: "Obrana musí byť vždy právna" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Primeranosť posudzuje súd podľa okolností; neprimeraná obrana môže byť trestná." }
  },
  {
    otazka: "12) Čo je trestná zodpovednosť právnickej osoby?",
    moznosti: [
      { id: "A", text: "Zodpovednosť PO za trestné činy podľa osobitnej úpravy" },
      { id: "B", text: "Vždy zodpovedá PO za konanie zamestnanca" },
      { id: "C", text: "PO nikdy nemôže byť zodpovedná" },
      { id: "D", text: "Len fyzické osoby môžu byť páchateľmi" }
    ],
    spravna: "A",
    vysvetlenie: { A: "PO môže niesť trestnoprávnu zodpovednosť len ak to zákon upravuje." }
  },
  {
    otazka: "13) Čo je recidíva?",
    moznosti: [
      { id: "A", text: "Opakované spáchanie trestného činu po právoplatnom odsúdení" },
      { id: "B", text: "Prvý trestný čin" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len trest bez následku" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Recidíva môže viesť k prísnejšiemu trestu podľa zákona." }
  },
  {
    otazka: "14) Čo je premlčanie trestného stíhania?",
    moznosti: [
      { id: "A", text: "Uplynutie zákonnej lehoty, po ktorej nemožno stíhať" },
      { id: "B", text: "Len zánik trestu" },
      { id: "C", text: "Len amnestia" },
      { id: "D", text: "Len zánik následku" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Premlčanie bráni trestnému stíhaniu po uplynutí lehoty stanovené zákonom." }
  },
  {
    otazka: "15) Čo je zásada presumpcie neviny?",
    moznosti: [
      { id: "A", text: "Obvinený je považovaný za nevinného, kým sa vina nepreukáže" },
      { id: "B", text: "Obvinený je považovaný za vinného, kým sa nepreukáže nevina" },
      { id: "C", text: "Automatické potrestanie bez súdu" },
      { id: "D", text: "Utajenie procesu" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Presumpcia neviny je základné procesné právo obvineného." }
  },
  {
    otazka: "16) Kto nesie dôkazné bremeno v trestnom konaní?",
    moznosti: [
      { id: "A", text: "Štát (prokuratúra) musí preukázať vinu obvineného" },
      { id: "B", text: "Obvinený musí preukázať svoju nevinu" },
      { id: "C", text: "Svedkovia musia preukázať pravdu" },
      { id: "D", text: "Súd musí preukázať vinu" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Dôkazné bremeno leží na obžalobe; obvinený nemusí dokazovať nevinu." }
  },
  {
    otazka: "17) Čo je zásada zákonnosti trestného práva?",
    moznosti: [
      { id: "A", text: "Žiadny čin nie je trestný bez zákona (nullum crimen sine lege)" },
      { id: "B", text: "Súd môže trestať podľa vlastného uváženia" },
      { id: "C", text: "Len obyčajové právo platí" },
      { id: "D", text: "Len medzinárodné právo platí" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Zásada zákonnosti chráni pred retroaktívnym trestaním." }
  },
  {
    otazka: "18) Čo je nebis in idem (dvojité stíhanie)?",
    moznosti: [
      { id: "A", text: "Zákaz opakovaného stíhania za ten istý skutok" },
      { id: "B", text: "Možnosť opakovaného trestu" },
      { id: "C", text: "Len opakovaný proces" },
      { id: "D", text: "Len odvolanie" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ne bis in idem zabraňuje opätovnému trestnému stíhaniu za ten istý skutok." }
  },
  {
    otazka: "19) Čo je trestný čin korupcie?",
    moznosti: [
      { id: "A", text: "Prijímanie alebo ponúkanie úplatku, zneužitie právomocí" },
      { id: "B", text: "Len daňový priestupok" },
      { id: "C", text: "Len priestupok v doprave" },
      { id: "D", text: "Len občianskoprávny spor" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Korupcia zahŕňa úplatky a zneužitie verejnej moci." }
  },
  {
    otazka: "20) Čo je legalita trestu?",
    moznosti: [
      { id: "A", text: "Trest musí byť stanovený zákonom" },
      { id: "B", text: "Trest môže byť ľubovoľný" },
      { id: "C", text: "Trest je vždy finančný" },
      { id: "D", text: "Trest je len verejný" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Tresty musia byť vymedzené zákonom; súd ich len ukladá v rámci zákona." }
  },
  {
    otazka: "21) Čo je trestný čin prania špinavých peňazí?",
    moznosti: [
      { id: "A", text: "Zlegalizovanie výnosov z trestnej činnosti" },
      { id: "B", text: "Len daňový únik" },
      { id: "C", text: "Len bankový omyl" },
      { id: "D", text: "Len občianskoprávny spor" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Pranie peňazí zahŕňa konverziu alebo skrytie pôvodu trestných výnosov." }
  },
  {
    otazka: "22) Čo je trestný čin sprenevera?",
    moznosti: [
      { id: "A", text: "Protiprávne prisvojenie cudzej veci, ktorá bola zverená" },
      { id: "B", text: "Len krádež" },
      { id: "C", text: "Len podvod" },
      { id: "D", text: "Len poškodzovanie cudzej veci" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Sprenevera = zneužitie zvereného majetku na vlastný prospech." }
  },
  {
    otazka: "23) Čo je podvod?",
    moznosti: [
      { id: "A", text: "Zavádzanie alebo klamstvo s cieľom získať majetkový prospech" },
      { id: "B", text: "Len fyzické násilie" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len administratívny čin" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Podvod zahŕňa klamstvo alebo zamlčanie s cieľom obohatiť sa." }
  },
  {
    otazka: "24) Čo je trestný čin sprenevera v obchodnom styku (hospodársky delikt)?",
    moznosti: [
      { id: "A", text: "Zneužitie majetku spoločnosti alebo klientov v hospodárskej činnosti" },
      { id: "B", text: "Len daňový priestupok" },
      { id: "C", text: "Len priestupok v doprave" },
      { id: "D", text: "Len občianskoprávny spor" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Hospodárske delikty poškodzujú ekonomické záujmy a dôveru v obchodné vzťahy." }
  },
  {
    otazka: "25) Čo je trestný čin falšovania dokumentov?",
    moznosti: [
      { id: "A", text: "Úmyselné pozmeňovanie alebo výroba falošných dokumentov" },
      { id: "B", text: "Len administratívna chyba" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Falšovanie dokumentov ohrozuje právne istoty a dôveryhodnosť listín." }
  },
  {
    otazka: "26) Čo je trestný čin korupcie v súkromnom sektore?",
    moznosti: [
      { id: "A", text: "Prijímanie alebo ponúkanie úplatku medzi súkromnými osobami" },
      { id: "B", text: "Len daňový únik" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len občianskoprávny spor" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Korupcia v súkromnom sektore zahŕňa úplatky a zneužitie dôvery." }
  },
  {
    otazka: "27) Čo je trestný čin zneužitia právomoci verejného činiteľa?",
    moznosti: [
      { id: "A", text: "Vykonanie alebo zneužitie právomoci v rozpore so zákonom" },
      { id: "B", text: "Len administratívna chyba" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Zneužitie právomoci poškodzuje verejný záujem a dôveru v inštitúcie." }
  },
  {
    otazka: "28) Čo je trestný čin ohrozenia pod vplyvom návykovej látky?",
    moznosti: [
      { id: "A", text: "Spôsobenie nebezpečenstva pri riadení vozidla alebo inej činnosti pod vplyvom" },
      { id: "B", text: "Len priestupok" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len administratívna chyba" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ohrozenie pod vplyvom je trestné, ak vzniká riziko pre iných." }
  },
  {
    otazka: "29) Čo je trestný čin ublíženia na zdraví?",
    moznosti: [
      { id: "A", text: "Spôsobenie ujmy na zdraví inej osobe" },
      { id: "B", text: "Len psychická ujma" },
      { id: "C", text: "Len majetková ujma" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ublíženie na zdraví môže byť rôznej závažnosti a je trestné." }
  },
  {
    otazka: "30) Čo je vražda?",
    moznosti: [
      { id: "A", text: "Úmyselné usmrtenie inej osoby" },
      { id: "B", text: "Neúmyselné zabitie" },
      { id: "C", text: "Len ublíženie na zdraví" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Vražda je najzávažnejší trestný čin proti životu." }
  },
  {
    otazka: "31) Čo je zabitie z nedbanlivosti?",
    moznosti: [
      { id: "A", text: "Spôsobenie smrti bez úmyslu, z nedbanlivosti" },
      { id: "B", text: "Úmyselné usmrtenie" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len administratívny čin" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Nedbanlivostné zabitie je trestné, ale odlišné od úmyselného konania." }
  },
  {
    otazka: "32) Čo je trestný čin znásilnenia?",
    moznosti: [
      { id: "A", text: "Sexuálny čin vykonaný bez súhlasu obete" },
      { id: "B", text: "Len nevhodné správanie" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len občianskoprávny spor" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Znásilnenie je závažný trestný čin proti sexuálnej slobode." }
  },
  {
    otazka: "33) Čo je obchodovanie s ľuďmi?",
    moznosti: [
      { id: "A", text: "Nábor, prevoz alebo ubytovanie osôb za účelom vykorisťovania" },
      { id: "B", text: "Len medzinárodný obchod" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Obchodovanie s ľuďmi je závažný trestný čin porušujúci ľudské práva." }
  },
  {
    otazka: "34) Čo je trestný čin ohrozovania verejného poriadku?",
    moznosti: [
      { id: "A", text: "Konanie narušujúce verejný poriadok (výtržníctvo, násilie)" },
      { id: "B", text: "Len majetkové činy" },
      { id: "C", text: "Len priestupky" },
      { id: "D", text: "Len administratívne delikty" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ohrozovanie verejného poriadku zahŕňa rôzne formy násilia a výtržností." }
  },
  {
    otazka: "35) Čo je trestný čin terorizmu?",
    moznosti: [
      { id: "A", text: "Úmyselné spáchanie činov s cieľom zastrašiť verejnosť alebo vládu" },
      { id: "B", text: "Len politický protest" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Terorizmus je medzinárodne a národne trestaný čin s politickým alebo ideologickým cieľom." }
  },
  {
    otazka: "36) Čo je vydieranie?",
    moznosti: [
      { id: "A", text: "Nútenie osoby k určitému konaniu hrozbou" },
      { id: "B", text: "Len obchodná dohoda" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len občianskoprávny spor" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Vydieranie zahŕňa hrozby s cieľom získať prospech." }
  },
  {
    otazka: "37) Čo je korupcia pasívna?",
    moznosti: [
      { id: "A", text: "Prijímanie úplatku" },
      { id: "B", text: "Ponúkanie úplatku" },
      { id: "C", text: "Len daňový únik" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Pasívna korupcia = prijímanie úplatku; aktívna = ponúkanie." }
  },
  {
    otazka: "38) Čo je trestný čin ohovárania a pomluvy?",
    moznosti: [
      { id: "A", text: "Šírenie nepravdivých informácií poškodzujúcich povesť" },
      { id: "B", text: "Len kritika" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ohováranie môže byť trestné, ak sú splnené zákonné znaky." }
  },
  {
    otazka: "39) Čo je prečin a čo je zločin?",
    moznosti: [
      { id: "A", text: "Delenie podľa závažnosti; zločin je závažnejší" },
      { id: "B", text: "Prečin je závažnejší" },
      { id: "C", text: "Sú to synonymá" },
      { id: "D", text: "Len procesné pojmy" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Prečiny a zločiny sa líšia trestnou sadzbou a spoločenskou nebezpečnosťou." }
  },
  {
    otazka: "40) Čo je trestný čin ohrozenia životného prostredia?",
    moznosti: [
      { id: "A", text: "Protiprávne konanie spôsobujúce škodu životnému prostrediu" },
      { id: "B", text: "Len občianskoprávny spor" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len administratívny čin" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Environmentálne delikty sú trestné, ak spôsobia vážnu ujmu." }
  },
  {
    otazka: "41) Čo je trestný čin falšovania peňazí?",
    moznosti: [
      { id: "A", text: "Výroba alebo použitie falošných peňazí" },
      { id: "B", text: "Len daňový únik" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len občianskoprávny spor" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Falšovanie peňazí ohrozuje ekonomiku a je prísne trestané." }
  },
  {
    otazka: "42) Čo je trestný čin ohovárania verejného činiteľa?",
    moznosti: [
      { id: "A", text: "Šírenie nepravdivých informácií o verejnom činiteli s cieľom poškodiť" },
      { id: "B", text: "Len kritika politiky" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ohováranie verejného činiteľa môže mať prísnejšie následky." }
  },
  {
    otazka: "43) Čo je trestný čin porušenia tajomstva listín?",
    moznosti: [
      { id: "A", text: "Neoprávnené zverejnenie alebo zneužitie dôverných informácií" },
      { id: "B", text: "Len administratívna chyba" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Porušenie dôverných informácií môže byť trestné, ak poškodí iných." }
  },
  {
    otazka: "44) Čo je trestný čin porušenia autorských práv?",
    moznosti: [
      { id: "A", text: "Neoprávnené rozmnožovanie alebo šírenie chránených diel" },
      { id: "B", text: "Len občianskoprávny spor" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len administratívny čin" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Porušenie autorských práv môže mať trestnoprávne následky pri závažnom poškodení." }
  },
  {
    otazka: "45) Čo je trestný čin kybernetickej kriminality?",
    moznosti: [
      { id: "A", text: "Neoprávnený prístup, útoky na systémy, podvody online" },
      { id: "B", text: "Len technický problém" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Kybernetické delikty zahŕňajú hacking, phishing a iné online trestné činy." }
  },
  {
    otazka: "46) Čo je trestný čin ohovárania cez sociálne siete?",
    moznosti: [
      { id: "A", text: "Šírenie nepravdivých informácií online s cieľom poškodiť" },
      { id: "B", text: "Len kritika" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Online ohováranie môže byť trestné rovnako ako tradičné formy." }
  },
  {
    otazka: "47) Čo je trestný čin obchodovania s drogami?",
    moznosti: [
      { id: "A", text: "Výroba, distribúcia alebo predaj nelegálnych drog" },
      { id: "B", text: "Len držanie malého množstva" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len administratívny čin" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Obchodovanie s drogami je trestné a často prísne sankcionované." }
  },
  {
    otazka: "48) Čo je trestný čin pašovania?",
    moznosti: [
      { id: "A", text: "Nelegálne prepravovanie tovaru cez hranice" },
      { id: "B", text: "Len legálny dovoz" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Pašovanie obchádza colné a právne predpisy a je trestné." }
  },
  {
    otazka: "49) Čo je trestný čin ohrozenia dopravy?",
    moznosti: [
      { id: "A", text: "Konanie ohrozujúce bezpečnosť dopravy (napr. nebezpečné riadenie)" },
      { id: "B", text: "Len dopravná nehoda bez viny" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len administratívny čin" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ohrozenie dopravy môže viesť k trestnému stíhaniu pri závažnom riziku." }
  },
  {
    otazka: "50) Čo je trestný čin falšovania pečiatok a podpisov?",
    moznosti: [
      { id: "A", text: "Neoprávnené pozmeňovanie alebo výroba pečiatok a podpisov" },
      { id: "B", text: "Len administratívna chyba" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Falšovanie pečiatok a podpisov ohrozuje právnu istotu dokumentov." }
  },
  {
    otazka: "51) Čo je trestný čin nelegálneho ozbrojovania?",
    moznosti: [
      { id: "A", text: "Držanie, výroba alebo obchodovanie so zbraňami bez povolenia" },
      { id: "B", text: "Len legálne vlastníctvo" },
      { id: "C", text: "Len administratívny čin" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Nelegálne ozbrojovanie predstavuje riziko pre verejnú bezpečnosť." }
  },
  {
    otazka: "52) Čo je trestný čin ohrozenia verejného zdravia?",
    moznosti: [
      { id: "A", text: "Konanie, ktoré vážne ohrozuje zdravie verejnosti (napr. šírenie nákaz)" },
      { id: "B", text: "Len osobné ochorenie" },
      { id: "C", text: "Len administratívny čin" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ohrozenie verejného zdravia môže byť trestné pri závažnom riziku." }
  },
  {
    otazka: "53) Čo je trestný čin porušenia obchodného tajomstva?",
    moznosti: [
      { id: "A", text: "Neoprávnené získanie alebo zverejnenie obchodných tajomstiev" },
      { id: "B", text: "Len obchodná chyba" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Porušenie obchodného tajomstva poškodzuje hospodársku súťaž a dôveru." }
  },
  {
    otazka: "54) Čo je trestný čin ohrozenia bezpečnosti štátu?",
    moznosti: [
      { id: "A", text: "Činy ohrozujúce ústavný poriadok alebo štátnu bezpečnosť" },
      { id: "B", text: "Len politický protest" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Ohrozenie bezpečnosti štátu zahŕňa vlastizradu a iné závažné delikty." }
  },
  {
    otazka: "55) Čo je trestný čin nelegálneho sledovania (stalkingu)?",
    moznosti: [
      { id: "A", text: "Opakované obťažovanie alebo sledovanie osoby spôsobujúce strach" },
      { id: "B", text: "Len náhodné stretnutie" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Stalking môže byť trestný, ak spôsobuje obeti vážny strach alebo ujmu." }
  },
  {
    otazka: "56) Čo je trestný čin porušenia domovej slobody?",
    moznosti: [
      { id: "A", text: "Neoprávnené vniknutie do obydlia alebo zadržanie osoby" },
      { id: "B", text: "Len verejné zhromaždenie" },
      { id: "C", text: "Len priestupok" },
      { id: "D", text: "Len administratívny čin" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Porušenie domovej slobody chráni súkromie a bezpečie obydlia." }
  },
  {
    otazka: "57) Čo je trestný čin nelegálneho nakladania s odpadmi?",
    moznosti: [
      { id: "A", text: "Neoprávnené zneškodňovanie alebo uloženie odpadu spôsobujúce škodu" },
      { id: "B", text: "Len legálne nakladanie" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Nelegálne nakladanie s odpadmi ohrozuje životné prostredie a zdravie." }
  },
  {
    otazka: "58) Čo je trestný čin porušenia pracovnoprávnych predpisov s trestnoprávnym následkom?",
    moznosti: [
      { id: "A", text: "Závažné porušenie povinností zamestnávateľa vedúce k ujme" },
      { id: "B", text: "Len administratívna chyba" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Závažné porušenia bezpečnosti práce môžu byť trestné." }
  },
  {
    otazka: "59) Čo je trestný čin porušenia povinnosti pri starostlivosti o dieťa?",
    moznosti: [
      { id: "A", text: "Zanedbanie starostlivosti vedúce k ujme dieťaťa" },
      { id: "B", text: "Len výchovné opatrenie" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Zanedbanie starostlivosti môže viesť k trestnej zodpovednosti." }
  },
  {
    otazka: "60) Čo je trestný čin porušenia povinnosti pri poskytovaní zdravotnej starostlivosti?",
    moznosti: [
      { id: "A", text: "Závažné zanedbanie povinností zdravotníckeho pracovníka vedúce k ujme" },
      { id: "B", text: "Len administratívna chyba" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len priestupok" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Závažné porušenia povinností v zdravotníctve môžu byť trestné." }
  },
  {
    otazka: "61) Čo je trestný čin nelegálneho získavania osobných údajov?",
    moznosti: [
      { id: "A", text: "Neoprávnené zhromažďovanie alebo zverejnenie osobných údajov" },
      { id: "B", text: "Len legálne spracovanie údajov" },
      { id: "C", text: "Len občianskoprávny spor" },
      { id: "D", text: "Len administratívny čin" }
    ],
    spravna: "A",
    vysvetlenie: { A: "Neoprávnené nakladanie s osobnými údajmi môže viesť k trestnému stíhaniu." }
  },
];

/* =========================
   PREMENNÉ A SELECTORY
========================= */
let index = 0;
let score = 0;

const quizBox = document.getElementById("quizBox");
const explanationBox = document.getElementById("explanation");
const resultScreen = document.getElementById("resultScreen");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");
const progressBar = document.getElementById("progressBar");
const scoreLabel = document.getElementById("scoreLabel");

const themeButtons = document.querySelectorAll(".theme-btn");
const darkToggle = document.getElementById("darkToggle");

// currentQuiz bude premiešaná kópia pôvodného QUIZ
let currentQuiz = [];
let totalQuestions = 0;

/* =========================
   SHUFFLE
========================= */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* =========================
   KONFETY (dynamické načítanie + trigger)
   Poznámka: konfety sa spúšťajú LEN v showResult() pri >= 80%
========================= */
function loadConfettiOnce(callback) {
  if (typeof confetti === "function") {
    callback();
    return;
  }
  if (window._confettiLoading) {
    const wait = setInterval(() => {
      if (typeof confetti === "function") {
        clearInterval(wait);
        callback();
      }
    }, 100);
    return;
  }
  window._confettiLoading = true;
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
  s.onload = () => {
    window._confettiLoading = false;
    callback();
  };
  s.onerror = () => {
    window._confettiLoading = false;
    console.warn("Nepodarilo sa načítať canvas-confetti.");
  };
  document.head.appendChild(s);
}

function triggerConfetti() {
  if (typeof confetti !== "function") {
    loadConfettiOnce(() => triggerConfetti());
    return;
  }

  confetti({
    particleCount: 160,
    spread: 70,
    origin: { y: 0.2 }
  });

  confetti({
    particleCount: 70,
    spread: 100,
    origin: { x: 0.2, y: 0.6 },
    scalar: 0.9
  });
  confetti({
    particleCount: 70,
    spread: 100,
    origin: { x: 0.8, y: 0.6 },
    scalar: 0.9
  });
}

/* =========================
   INIT QUIZ (pri štarte a reštarte)
========================= */
function initQuiz() {
  // vytvoríme premiešanú kópiu otázok
  currentQuiz = shuffle(QUIZ);
  totalQuestions = currentQuiz.length;
  index = 0;
  score = 0;
  progressBar.style.width = "0%";
  window._confettiTriggered = false; // reset flag pri štarte
  updateScoreBar();
  renderQuestion();
}

/* =========================
   PROGRESS BAR
========================= */
function updateProgress() {
  const percent = totalQuestions > 0 ? Math.round((index / totalQuestions) * 100) : 0;
  progressBar.style.width = percent + "%";
}

/* =========================
   SCORE BAR
========================= */
function updateScoreBar() {
  scoreLabel.textContent = `${score} správnych z ${totalQuestions}`;
}

/* =========================
   RENDER OTÁZKY
========================= */
function renderQuestion() {
  explanationBox.classList.add("hidden");
  resultScreen.classList.add("hidden");

  const q = currentQuiz[index];
  const shuffled = shuffle(q.moznosti);

  quizBox.innerHTML = `
    <div class="flip-card">
      <div id="flipInner" class="flip-inner flip-start">
        <div class="flip-front">
          <h2>${q.otazka}</h2>

          ${shuffled.map(opt => `
            <button class="answer" data-id="${opt.id}">${opt.text}</button>
          `).join("")}

          <button id="nextBtn" class="next-btn hidden">Ďalej</button>
        </div>
      </div>
    </div>
  `;

  // FLIP + BOUNCE
  setTimeout(() => {
    const inner = document.getElementById("flipInner");
    if (inner) {
      inner.classList.remove("flip-start");
      inner.classList.add("flip-end");

      inner.classList.add("bounce");
      setTimeout(() => inner.classList.remove("bounce"), 500);
    }
  }, 50);

  // EVENTY NA ODPOVEDE
  document.querySelectorAll(".answer").forEach(btn => {
    btn.addEventListener("click", () => handleAnswer(q, btn));
  });

  updateProgress();
  updateScoreBar();
}

/* =========================
   VYHODNOTENIE ODPOVEDE
========================= */
function handleAnswer(q, btn) {
  const chosen = btn.dataset.id;
  const correctId = q.spravna;

  const correctOption = q.moznosti.find(m => m.id === correctId) || { text: "" };
  const chosenOption = q.moznosti.find(m => m.id === chosen) || { text: "" };
  const correctText = correctOption.text;
  const chosenText = chosenOption.text;
  const correctExplain = (q.vysvetlenie && q.vysvetlenie[correctId]) || "Vysvetlenie nie je dostupné.";

  // Zablokujeme ostatné odpovede
  document.querySelectorAll(".answer").forEach(b => {
    b.style.pointerEvents = "none";
  });

  // SPRÁVNA ODPOVEĎ
  if (chosen === correctId) {
    btn.classList.add("correct", "blink-correct");
    score++;

    explanationBox.innerHTML = `
      <div class="correct-title">
        ✔ Správne!
      </div>
      <div class="correct-box">
        ${correctExplain}
      </div>
    `;
  }

  // NESPRÁVNA ODPOVEĎ
  else {
    btn.classList.add("wrong");

    // zvýrazníme správnu odpoveď v zozname tlačidiel
    document.querySelectorAll(".answer").forEach(b => {
      if (b.dataset.id === correctId) {
        b.classList.add("correct", "blink-correct");
        setTimeout(() => {
          b.classList.remove("blink-correct");
        }, 700);
      }
    });

    explanationBox.innerHTML = `
      <div class="wrong-title">
        ✘ Nesprávne.
      </div>

      <div class="correct-box">
        <b>Správna odpoveď:</b><br>
        <b>${correctId}) ${correctText}</b><br>
        <span>${correctExplain}</span>
      </div>

      <div class="wrong-box">
        <b>Tvoja odpoveď:</b><br>
        ${chosen}) ${chosenText}<br>
        <span>${(q.vysvetlenie && q.vysvetlenie[chosen]) || ""}</span>
      </div>
    `;
  }

  // SLIDE-IN ANIMÁCIA VYSVETLENIA
  explanationBox.classList.remove("hidden");
  explanationBox.classList.remove("slide-in");
  void explanationBox.offsetWidth;
  explanationBox.classList.add("slide-in");

  updateScoreBar();

  // Zobrazíme tlačidlo Ďalej
  const nextBtn = document.getElementById("nextBtn");
  if (nextBtn) {
    nextBtn.classList.remove("hidden");

    // POP ANIMÁCIA NEXT BUTTON
    nextBtn.classList.remove("next-animate");
    void nextBtn.offsetWidth;
    nextBtn.classList.add("next-animate");

    nextBtn.onclick = () => {
      index++;
      if (index < totalQuestions) {
        renderQuestion();
      } else {
        showResult();
      }
    };
  }
}

/* =========================
   VÝSLEDOK (konfety LEN tu pri >= 80%)
========================= */
function showResult() {
  quizBox.innerHTML = "";
  resultScreen.classList.remove("hidden");

  scoreText.textContent = `Získal si ${score} z ${totalQuestions} bodov.`;

  if (!totalQuestions || totalQuestions === 0) {
    console.warn("totalQuestions je 0 alebo nedefinované");
    return;
  }

  const percent = Math.round((score / totalQuestions) * 100);

  // konfety pri >= 80% (iba raz)
  if (percent >= 80 && !window._confettiTriggered) {
    window._confettiTriggered = true;
    loadConfettiOnce(() => triggerConfetti());
  }
}

/* =========================
   REŠTART
========================= */
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    // pri reštarte premiešame otázky znova
    currentQuiz = shuffle(QUIZ);
    totalQuestions = currentQuiz.length;
    index = 0;
    score = 0;
    progressBar.style.width = "0%";
    window._confettiTriggered = false;
    updateScoreBar();
    renderQuestion();
  });
}

/* =========================
   TÉMY
========================= */
if (themeButtons && themeButtons.length) {
  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      themeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const theme = btn.dataset.theme;
      document.body.classList.remove("theme-blue", "theme-purple", "theme-green");
      if (theme) document.body.classList.add(`theme-${theme}`);
    });
  });
  document.body.classList.add("theme-blue");
}

/* =========================
   DARK MODE
========================= */
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  });
}

/* =========================
   ŠTART
========================= */
initQuiz();

/* =========================
   TIPY na rozšírenie
   - Ak chceš pridať viac otázok, pridaj ich do poľa QUIZ.
   - Pre import z CSV/JSON môžem pripraviť skript na parsovanie.
   - Ak chceš náročnejšie štátnicové otázky, napíš ktoré kapitoly (napr. subjektívna stránka, tresty, okolnosti vylučujúce protiprávnosť) a vygenerujem 20 otázok.
========================= */
