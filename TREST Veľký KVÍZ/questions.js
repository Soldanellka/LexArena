// questions.js
// Globálna premenná QUESTIONS — 30 otázok podľa okruhov Paneurópskej
const QUESTIONS = [
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
  }
];
