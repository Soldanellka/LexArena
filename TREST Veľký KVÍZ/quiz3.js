const NEW_QUESTIONS = [
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
  }
];
