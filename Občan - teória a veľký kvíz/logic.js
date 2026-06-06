/* ============================================
   NAČÍTANIE HLAVNÝCH SEKCIÍ (Hmotné / Procesné / Kvíz)
============================================ */

function loadSection(file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById("content-area").innerHTML = html;
        })
        .catch(err => {
            document.getElementById("content-area").innerHTML =
                "<p style='color:red;'>Nepodarilo sa načítať sekciu.</p>";
        });
}


/* ============================================
   NAČÍTANIE OKRUHOV (Hmotné + Procesné)
============================================ */

function loadOkruh(file) {
    const target =
        document.getElementById("okruh-content-area") ||
        document.getElementById("okruh-content-area-procesne");

    if (!target) return;

    fetch(file)
        .then(response => response.text())
        .then(html => {
            target.innerHTML = html;
            target.scrollTop = 0;
        })
        .catch(err => {
            target.innerHTML =
                "<p style='color:red;'>Nepodarilo sa načítať okruh.</p>";
        });
}


/* ============================================
   KVÍZ – ZOZNAM OTÁZOK (100 otázok)
============================================ */

const questions = [
    {
        q: "Čo je právny úkon?",
        options: [
            "Prejav vôle smerujúci k vzniku, zmene alebo zániku práv a povinností",
            "Rozhodnutie súdu",
            "Zákon vydaný parlamentom",
            "Správny akt"
        ],
        correct: 0,
        explain: "Právny úkon je prejav vôle, ostatné sú iné právne skutočnosti."
    },
    {
        q: "Kto je účastníkom civilného konania?",
        options: [
            "Ten, o koho právach alebo povinnostiach sa rozhoduje",
            "Len žalobca",
            "Len žalovaný",
            "Len súd"
        ],
        correct: 0,
        explain: "Účastníkom je osoba, o ktorej právach alebo povinnostiach sa rozhoduje."
    },
    {
        q: "Čo je premlčanie?",
        options: [
            "Zánik vymáhateľnosti práva po uplynutí lehoty",
            "Zánik práva ako takého",
            "Vznik práva",
            "Zmena právnej normy"
        ],
        correct: 0,
        explain: "Premlčanie neruší právo, len jeho vymáhateľnosť."
    },

   {
    q: "Kedy vzniká procesný vzťah?",
    options: [
        "Podaním žaloby",
        "Doručením žaloby súdu",
        "Doručením žaloby žalovanému",
        "Na prvom pojednávaní"
    ],
    correct: 1,
    explain: "Procesný vzťah vzniká doručením žaloby súdu, nie jej podaním."
},
{
    q: "Ktorý princíp je typický pre Civilný sporový poriadok?",
    options: [
        "Vyšetrovací princíp",
        "Materiálna pravda",
        "Prejednací princíp",
        "Oficialita"
    ],
    correct: 2,
    explain: "CSP je sporový proces, preto je založený na prejednacom princípe."
},
{
    q: "Kto môže byť vedľajším účastníkom (intervenientom)?",
    options: [
        "Každý občan",
        "Osoba s právnym záujmom na výsledku konania",
        "Len advokát",
        "Len žalovaný"
    ],
    correct: 1,
    explain: "Intervenient musí mať právny záujem na výsledku sporu."
},
{
    q: "Čo je právna skutočnosť?",
    options: [
        "Len právny úkon",
        "Len rozhodnutie súdu",
        "Okolnosť, s ktorou právo spája právne následky",
        "Len protiprávne konanie"
    ],
    correct: 2,
    explain: "Právna skutočnosť je širší pojem – zahŕňa úkony, udalosti aj rozhodnutia."
},
{
    q: "Ktoré doručovanie je najprísnejšie?",
    options: [
        "Obyčajné doručenie",
        "Doručenie do vlastných rúk",
        "Doručenie e‑mailom",
        "Doručenie krátkou cestou"
    ],
    correct: 1,
    explain: "Doručenie do vlastných rúk má najprísnejšie pravidlá a fikciu doručenia."
},
{
    q: "Čo je petit žaloby?",
    options: [
        "Odôvodnenie žaloby",
        "Návrh na vykonanie dôkazov",
        "To, čo žalobca žiada, aby súd rozhodol",
        "Popis skutkového stavu"
    ],
    correct: 2,
    explain: "Petit je presná formulácia toho, čo má súd uložiť alebo určiť."
},
{
    q: "Ktorý úkon je dispozičný?",
    options: [
        "Výsluch svedka",
        "Zmena žaloby",
        "Vykonanie dôkazu",
        "Poučenie súdu"
    ],
    correct: 1,
    explain: "Dispozičné úkony robia strany – napr. späťvzatie alebo zmena žaloby."
},
{
    q: "Ktorý dôkaz je osobný?",
    options: [
        "Listina",
        "Obhliadka",
        "Svedecká výpoveď",
        "Znalecký posudok"
    ],
    correct: 2,
    explain: "Osobné dôkazy sú výpovede osôb – svedkov, účastníkov, znalcov."
},
{
    q: "Ktorý rozsudok rozhoduje len o základe nároku?",
    options: [
        "Konečný rozsudok",
        "Medzitýmny rozsudok",
        "Čiastočný rozsudok",
        "Kontumačný rozsudok"
    ],
    correct: 1,
    explain: "Medzitýmny rozsudok rieši základ nároku, nie jeho výšku."
},
{
    q: "Čo znamená právoplatnosť rozhodnutia?",
    options: [
        "Rozhodnutie je vykonateľné",
        "Nemožno podať riadny opravný prostriedok",
        "Rozhodnutie je doručené",
        "Rozhodnutie je zverejnené"
    ],
    correct: 1,
    explain: "Právoplatnosť znamená, že rozhodnutie je konečné a nenapadnuteľné riadnym opravným prostriedkom."
},
{
    q: "Ktorý princíp je typický pre Civilný mimosporový poriadok?",
    options: [
        "Prejednací princíp",
        "Dispozičný princíp",
        "Vyšetrovací princíp",
        "Kontradiktórnosť"
    ],
    correct: 2,
    explain: "CMP je založený na vyšetrovacom princípe – súd zisťuje skutkový stav aj bez návrhov strán."
},
{
    q: "Kto je účastníkom v mimosporovom konaní?",
    options: [
        "Len navrhovateľ",
        "Len odporca",
        "Osoba, ktorú za účastníka označí zákon",
        "Každý, kto podá podanie"
    ],
    correct: 2,
    explain: "V CMP účastníkov určuje zákon, nie podanie návrhu."
},
{
    q: "Kto vykonáva dedičské konanie?",
    options: [
        "Sudca okresného súdu",
        "Vyšší súdny úradník",
        "Notár ako súdny komisár",
        "Exekútor"
    ],
    correct: 2,
    explain: "Dedičské konanie vykonáva notár ako súdny komisár v mene súdu."
},
{
    q: "Čo je exekučný titul?",
    options: [
        "Návrh na vykonanie exekúcie",
        "Vykonateľné rozhodnutie alebo iný akt, ktorý možno exekvovať",
        "Žiadosť exekútora",
        "Uznesenie o odklade exekúcie"
    ],
    correct: 1,
    explain: "Exekučný titul je vykonateľné rozhodnutie alebo iný akt, ktorý umožňuje exekúciu."
},
{
    q: "Kto je oprávnený v exekučnom konaní?",
    options: [
        "Ten, kto má povinnosť plniť",
        "Ten, kto žiada vymoženie svojho nároku",
        "Exekútor",
        "Súd"
    ],
    correct: 1,
    explain: "Oprávnený je veriteľ, ktorý žiada vymoženie svojho nároku."
},
{
    q: "Ktorý opravný prostriedok je mimoriadny?",
    options: [
        "Odvolanie",
        "Odpor",
        "Dovolanie",
        "Sťažnosť"
    ],
    correct: 2,
    explain: "Dovolanie je mimoriadny opravný prostriedok smerujúci proti právoplatnému rozhodnutiu."
},
{
    q: "Čo je predmetom správneho súdnictva?",
    options: [
        "Kontrola zákonnosti rozhodnutí orgánov verejnej správy",
        "Rozhodovanie o súkromnoprávnych sporoch",
        "Trestné konanie",
        "Konanie o dedičstve"
    ],
    correct: 0,
    explain: "Správne súdnictvo kontroluje zákonnosť rozhodnutí verejnej správy."
},
{
    q: "Kedy možno vydať platobný rozkaz?",
    options: [
        "Pri peňažnom nároku, ak sú splnené zákonné podmienky",
        "Len pri nepeňažnom nároku",
        "Len ak žalovaný súhlasí",
        "Len v trestnom konaní"
    ],
    correct: 0,
    explain: "Platobný rozkaz možno vydať len pri peňažnom nároku."
},
{
    q: "Ktoré rozhodnutie je procesné?",
    options: [
        "Rozsudok",
        "Uznesenie",
        "Zmier",
        "Platobný rozkaz"
    ],
    correct: 1,
    explain: "Uznesenie je typické procesné rozhodnutie."
},
{
    q: "Čo znamená vykonateľnosť rozhodnutia?",
    options: [
        "Rozhodnutie je právoplatné",
        "Rozhodnutie možno vykonať (exekvovať)",
        "Rozhodnutie je zverejnené",
        "Rozhodnutie je doručené"
    ],
    correct: 1,
    explain: "Vykonateľnosť znamená, že rozhodnutie možno reálne vynútiť."
},
{
    q: "Ktorý opravný prostriedok smeruje proti platobnému rozkazu?",
    options: [
        "Odvolanie",
        "Odpor",
        "Dovolanie",
        "Sťažnosť"
    ],
    correct: 1,
    explain: "Proti platobnému rozkazu sa podáva odpor, nie odvolanie."
},
{
    q: "Kedy súd vydá rozsudok pre zmeškanie?",
    options: [
        "Ak žalovaný nepredloží dôkazy",
        "Ak sa žalovaný bez ospravedlnenia nedostaví na pojednávanie",
        "Ak žalobca zmení žalobu",
        "Ak žalovaný podá odpor"
    ],
    correct: 1,
    explain: "Rozsudok pre zmeškanie sa vydá, ak sa žalovaný bez ospravedlnenia nedostaví."
},
{
    q: "Čo je procesná spôsobilosť?",
    options: [
        "Spôsobilosť mať práva a povinnosti",
        "Spôsobilosť vlastnými úkonmi pred súdom konať",
        "Spôsobilosť byť účastníkom konania",
        "Spôsobilosť podávať opravné prostriedky"
    ],
    correct: 1,
    explain: "Procesná spôsobilosť je schopnosť konať pred súdom vlastnými úkonmi."
},
{
    q: "Kedy vzniká prekážka rei iudicatae?",
    options: [
        "Ak je podaná žaloba",
        "Ak je rozhodnutie právoplatné",
        "Ak je rozhodnutie vykonateľné",
        "Ak je rozhodnutie doručené"
    ],
    correct: 1,
    explain: "Rei iudicata vzniká právoplatnosťou rozhodnutia."
},
{
    q: "Čo je dôkazné bremeno?",
    options: [
        "Povinnosť súdu vykonať dôkazy",
        "Povinnosť účastníka tvrdiť a preukázať skutočnosti",
        "Povinnosť svedka vypovedať",
        "Povinnosť znalca vypracovať posudok"
    ],
    correct: 1,
    explain: "Dôkazné bremeno nesie účastník, ktorý tvrdí rozhodné skutočnosti."
},
{
    q: "Ktorý dôkaz má najvyššiu dôkaznú silu?",
    options: [
        "Notárska zápisnica",
        "Svedecká výpoveď",
        "Listinný dôkaz",
        "Znalecký posudok"
    ],
    correct: 0,
    explain: "Notárska zápisnica má povahu verejnej listiny a má zvýšenú dôkaznú silu."
},
{
    q: "Kedy môže súd odmietnuť vykonať dôkaz?",
    options: [
        "Ak je dôkaz nadbytočný",
        "Ak je dôkaz navrhnutý žalovaným",
        "Ak je dôkaz listinný",
        "Ak je dôkaz navrhnutý po pojednávaní"
    ],
    correct: 0,
    explain: "Súd môže odmietnuť dôkaz, ak je nadbytočný alebo nevhodný."
},
{
    q: "Čo je procesná lehota?",
    options: [
        "Lehota na splnenie povinnosti",
        "Lehota na vykonanie procesného úkonu",
        "Lehota na zaplatenie trov konania",
        "Lehota na vykonanie exekúcie"
    ],
    correct: 1,
    explain: "Procesná lehota je čas určený na vykonanie procesného úkonu."
},
{
    q: "Kto rozhoduje o trovách konania?",
    options: [
        "Svedok",
        "Znalec",
        "Súd",
        "Účastníci konania"
    ],
    correct: 2,
    explain: "O trovách konania rozhoduje vždy súd."
},
{
    q: "Čo je zmier?",
    options: [
        "Rozhodnutie súdu o vine",
        "Dohoda účastníkov schválená súdom",
        "Rozhodnutie o trovách",
        "Dohoda medzi advokátmi"
    ],
    correct: 1,
    explain: "Zmier je dohoda účastníkov, ktorú súd schváli a má účinky rozsudku."
},
{
    q: "Kedy môže súd prerušiť konanie?",
    options: [
        "Ak účastník požiada o odročenie",
        "Ak prebieha iné konanie, ktoré má význam pre rozhodnutie",
        "Ak sa žalovaný nedostaví",
        "Ak žalobca zmení žalobu"
    ],
    correct: 1,
    explain: "Konanie sa prerušuje, ak výsledok iného konania môže ovplyvniť rozhodnutie."
},
{
    q: "Čo je procesné nástupníctvo?",
    options: [
        "Zmena sudcu",
        "Zmena právneho zástupcu",
        "Zmena účastníka konania v dôsledku právnej skutočnosti",
        "Zmena právnej kvalifikácie"
    ],
    correct: 2,
    explain: "Procesné nástupníctvo nastáva, ak účastníka nahradí iný subjekt (napr. pri prevode práva)."
},
{
    q: "Kedy môže súd rozhodnúť bez pojednávania?",
    options: [
        "Nikdy",
        "Len v trestnom konaní",
        "Ak sú splnené podmienky pre rozsudok pre zmeškanie alebo ak to zákon výslovne umožňuje",
        "Ak to navrhne žalovaný"
    ],
    correct: 2,
    explain: "Súd môže rozhodnúť bez pojednávania v zákonom stanovených prípadoch."
},
{
    q: "Čo je koncentrácia konania?",
    options: [
        "Povinnosť účastníkov predniesť všetky tvrdenia a dôkazy v zákonom určenom štádiu",
        "Zlúčenie viacerých konaní",
        "Rozdelenie konania",
        "Zmena sudcu"
    ],
    correct: 0,
    explain: "Koncentrácia znamená, že účastníci musia uviesť všetky tvrdenia a dôkazy včas."
},
{
    q: "Kedy vzniká povinnosť nahradiť trovy konania?",
    options: [
        "Vždy",
        "Len ak to navrhne žalobca",
        "Ak účastník nemal úspech vo veci",
        "Ak účastník zmení žalobu"
    ],
    correct: 2,
    explain: "Trovy znáša ten, kto nemal úspech vo veci (zásada úspechu)."
},
{
    q: "Čo je predbežné opatrenie?",
    options: [
        "Dočasné rozhodnutie súdu na úpravu pomerov účastníkov",
        "Konečný rozsudok",
        "Rozhodnutie o trovách",
        "Dohoda účastníkov"
    ],
    correct: 0,
    explain: "Predbežné opatrenie dočasne upravuje pomery, kým sa nerozhodne vo veci samej."
},
{
    q: "Kto môže podať dovolanie?",
    options: [
        "Každý účastník konania",
        "Len žalobca",
        "Len žalovaný",
        "Účastník, ak sú splnené zákonné podmienky prípustnosti"
    ],
    correct: 3,
    explain: "Dovolanie je prípustné len v zákonom stanovených prípadoch."
},
{
    q: "Kedy môže súd odmietnuť žalobu?",
    options: [
        "Ak žaloba neobsahuje petit alebo rozhodujúce tvrdenia",
        "Ak žalovaný nesúhlasí",
        "Ak žalobca nemá advokáta",
        "Ak žaloba obsahuje viac ako jeden nárok"
    ],
    correct: 0,
    explain: "Súd odmietne žalobu, ak nespĺňa zákonné náležitosti a nedá sa opraviť."
},
{
    q: "Čo je späťvzatie žaloby?",
    options: [
        "Zmena žaloby",
        "Zrušenie žaloby žalobcom",
        "Rozšírenie žaloby",
        "Zmena právnej kvalifikácie"
    ],
    correct: 1,
    explain: "Späťvzatie žaloby je dispozičný úkon žalobcu, ktorým žalobu ruší."
},
{
    q: "Kedy môže súd spojiť konania?",
    options: [
        "Ak sú účastníci rovnakí a skutkový základ je podobný",
        "Ak to navrhne žalovaný",
        "Ak je konanie príliš dlhé",
        "Ak ide o trestné konanie"
    ],
    correct: 0,
    explain: "Konania sa spájajú, ak majú spoločných účastníkov alebo skutkový základ."
},
{
    q: "Čo je nespornosť skutkového tvrdenia?",
    options: [
        "Tvrdenie, ktoré je dokázané",
        "Tvrdenie, ktoré druhá strana výslovne alebo mlčky nepoprela",
        "Tvrdenie, ktoré uviedol žalovaný",
        "Tvrdenie, ktoré uviedol znalec"
    ],
    correct: 1,
    explain: "Nesporné tvrdenie je to, ktoré druhá strana nepoprela."
},
{
    q: "Kedy môže súd rozhodnúť rozsudkom pre uznanie?",
    options: [
        "Ak žalovaný uzná nárok žalobcu",
        "Ak žalobca zmení žalobu",
        "Ak žalovaný nepredloží dôkazy",
        "Ak žalobca nepredloží dôkazy"
    ],
    correct: 0,
    explain: "Rozsudok pre uznanie sa vydá, ak žalovaný nárok výslovne uzná."
},
{
    q: "Čo je procesná podmienka?",
    options: [
        "Podmienka, ktorú musia splniť účastníci, aby súd mohol konať",
        "Podmienka platnosti zmluvy",
        "Podmienka vykonateľnosti",
        "Podmienka právoplatnosti"
    ],
    correct: 0,
    explain: "Procesné podmienky sú predpoklady, bez ktorých súd nemôže konať a rozhodnúť."
},
{
    q: "Kedy je dôkaz neprípustný?",
    options: [
        "Ak bol získaný v rozpore so zákonom",
        "Ak je listinný",
        "Ak je navrhnutý žalovaným",
        "Ak je navrhnutý neskoro"
    ],
    correct: 0,
    explain: "Neprípustný je dôkaz získaný nezákonne alebo v rozpore s právami účastníkov."
},
{
    q: "Čo je právna veta?",
    options: [
        "Zhrnutie skutkového stavu",
        "Zhrnutie právneho záveru rozhodnutia",
        "Názov zákona",
        "Poučenie o opravnom prostriedku"
    ],
    correct: 1,
    explain: "Právna veta vyjadruje právny záver, ktorý vyplýva z rozhodnutia."
},
{
    q: "Kto nesie dôkazné bremeno pri tvrdení o premlčaní?",
    options: [
        "Žalobca",
        "Žalovaný",
        "Súd",
        "Znalec"
    ],
    correct: 1,
    explain: "Premlčanie musí namietať žalovaný, preto nesie dôkazné bremeno."
},
{
    q: "Kedy môže súd uložiť poriadkovú pokutu?",
    options: [
        "Ak účastník alebo iná osoba marí priebeh konania",
        "Ak žalobca prehrá spor",
        "Ak žalovaný nepredloží dôkazy",
        "Ak sa účastník odvolá"
    ],
    correct: 0,
    explain: "Poriadková pokuta sa ukladá za rušenie alebo marenie konania."
},
{
    q: "Kedy môže súd ustanoviť účastníkovi zástupcu?",
    options: [
        "Ak účastník o to požiada a sú splnené zákonné podmienky",
        "Ak účastník prehrá spor",
        "Ak účastník nemá právnické vzdelanie",
        "Ak to navrhne žalovaný"
    ],
    correct: 0,
    explain: "Súd ustanoví zástupcu, ak to vyžaduje ochrana práv účastníka a sú splnené zákonné podmienky."
},
{
    q: "Čo je procesná plná moc?",
    options: [
        "Plná moc na uzatváranie zmlúv",
        "Oprávnenie konať za účastníka v súdnom konaní",
        "Oprávnenie vykonávať exekúciu",
        "Oprávnenie rozhodovať spor"
    ],
    correct: 1,
    explain: "Procesná plná moc oprávňuje zástupcu konať za účastníka pred súdom."
},
{
    q: "Kedy môže súd rozhodnúť čiastočným rozsudkom?",
    options: [
        "Ak rozhoduje o časti nároku alebo o niektorom z viacerých nárokov",
        "Ak žalovaný nepredloží dôkazy",
        "Ak žalobca zmení žalobu",
        "Ak ide o trestné konanie"
    ],
    correct: 0,
    explain: "Čiastočný rozsudok rieši len časť predmetu konania."
},
{
    q: "Čo je právna skutočnosť – udalosť?",
    options: [
        "Prejav vôle",
        "Rozhodnutie súdu",
        "Skutočnosť nezávislá od vôle človeka",
        "Zmluva"
    ],
    correct: 2,
    explain: "Udalosť je právna skutočnosť, ktorá nastáva bez vôle človeka (napr. smrť)."
},
{
    q: "Kedy vzniká povinnosť tvrdenia?",
    options: [
        "Až po vykonaní dôkazov",
        "Po podaní odvolania",
        "V momente, keď účastník chce, aby súd prihliadal na určitú skutočnosť",
        "Po skončení konania"
    ],
    correct: 2,
    explain: "Účastník musí tvrdiť skutočnosti, na ktoré chce, aby súd prihliadal."
},
{
    q: "Čo je znalecký posudok?",
    options: [
        "Vyjadrenie svedka",
        "Vyjadrenie účastníka",
        "Odborné vyjadrenie znalca o skutočnostiach, ktoré vyžadujú odborné vedomosti",
        "Rozhodnutie súdu"
    ],
    correct: 2,
    explain: "Znalecký posudok poskytuje odborné zhodnotenie skutočností."
},
{
    q: "Kedy môže súd uložiť povinnosť zložiť preddavok na dôkaz?",
    options: [
        "Ak je dôkaz finančne náročný",
        "Ak žalovaný prehrá spor",
        "Ak žalobca zmení žalobu",
        "Nikdy"
    ],
    correct: 0,
    explain: "Preddavok sa ukladá najmä pri nákladných dôkazoch, napr. znaleckých."
},
{
    q: "Čo je procesná prekážka litispendencie?",
    options: [
        "Prekážka právoplatne rozhodnutej veci",
        "Prekážka prebiehajúceho konania o tej istej veci",
        "Prekážka vykonateľnosti",
        "Prekážka doručenia"
    ],
    correct: 1,
    explain: "Litispendencia znamená, že o tej istej veci už prebieha iné konanie."
},
{
    q: "Kedy môže súd rozhodnúť bez dokazovania?",
    options: [
        "Ak sú skutkové tvrdenia nesporné",
        "Ak žalovaný nepredloží dôkazy",
        "Ak žalobca zmení žalobu",
        "Nikdy"
    ],
    correct: 0,
    explain: "Ak sú tvrdenia nesporné, dokazovanie nie je potrebné."
},
{
    q: "Čo je procesná sankcia?",
    options: [
        "Trestný postih",
        "Následok porušenia procesnej povinnosti",
        "Zmluvná pokuta",
        "Náhrada škody"
    ],
    correct: 1,
    explain: "Procesná sankcia je následok porušenia procesných povinností (napr. poriadková pokuta)."
},
{
    q: "Kedy môže súd uložiť znalecké dokazovanie?",
    options: [
        "Ak skutkové okolnosti možno zistiť bežným dokazovaním",
        "Ak je potrebné odborné posúdenie skutočností",
        "Ak to navrhne žalovaný",
        "Ak žalobca nepredloží listiny"
    ],
    correct: 1,
    explain: "Znalecké dokazovanie sa vykonáva, ak skutkové okolnosti vyžadujú odborné vedomosti."
},
{
    q: "Čo je procesná legitimácia?",
    options: [
        "Spôsobilosť byť účastníkom konania",
        "Tvrdenie účastníka",
        "Oprávnenie účastníka domáhať sa práva v konaní",
        "Dôkazná povinnosť"
    ],
    correct: 2,
    explain: "Procesná legitimácia znamená, že účastník je subjektom práva, o ktoré sa v konaní jedná."
},
{
    q: "Kedy môže súd uložiť povinnosť zaplatiť trovy konania štátu?",
    options: [
        "Ak účastník prehrá spor",
        "Ak účastník zavinil vznik trov štátu",
        "Ak účastník podá odvolanie",
        "Ak účastník zmení žalobu"
    ],
    correct: 1,
    explain: "Trovy štátu sa ukladajú tomu, kto ich svojím konaním spôsobil."
},
{
    q: "Čo je dôkazný návrh?",
    options: [
        "Rozhodnutie súdu o dôkaze",
        "Návrh účastníka na vykonanie konkrétneho dôkazu",
        "Výpoveď svedka",
        "Znalecký posudok"
    ],
    correct: 1,
    explain: "Dôkazný návrh je procesný úkon účastníka, ktorým navrhuje vykonanie dôkazu."
},
{
    q: "Kedy môže súd vydať uznesenie o zastavení konania?",
    options: [
        "Ak žalobca vezme žalobu späť",
        "Ak žalovaný nepredloží dôkazy",
        "Ak žalobca prehrá spor",
        "Ak súd vykoná všetky dôkazy"
    ],
    correct: 0,
    explain: "Konanie sa zastaví najmä pri späťvzatí žaloby alebo pri nesplnení procesných podmienok."
},
{
    q: "Čo je právna subjektivita?",
    options: [
        "Spôsobilosť mať práva a povinnosti",
        "Spôsobilosť konať pred súdom",
        "Spôsobilosť podávať opravné prostriedky",
        "Spôsobilosť uzatvárať zmluvy"
    ],
    correct: 0,
    explain: "Právna subjektivita je základná spôsobilosť mať práva a povinnosti."
},
{
    q: "Kedy môže súd uložiť neodkladné opatrenie?",
    options: [
        "Ak je potrebné okamžite upraviť pomery účastníkov",
        "Ak žalovaný nepredloží dôkazy",
        "Ak žalobca zmení žalobu",
        "Ak sa účastník nedostaví na pojednávanie"
    ],
    correct: 0,
    explain: "Neodkladné opatrenie sa vydáva, ak je potrebné rýchlo zasiahnuť na ochranu práv."
},
{
    q: "Čo je procesná obrana?",
    options: [
        "Trestné oznámenie",
        "Vyjadrenia a úkony účastníka smerujúce k vyvráteniu tvrdení protistrany",
        "Znalecký posudok",
        "Rozhodnutie súdu"
    ],
    correct: 1,
    explain: "Procesná obrana zahŕňa tvrdenia, dôkazy a námietky účastníka."
},
{
    q: "Kedy môže súd rozhodnúť rozsudkom pre zmeškanie žalobcu?",
    options: [
        "Ak sa žalobca bez ospravedlnenia nedostaví na pojednávanie",
        "Ak žalobca nepredloží dôkazy",
        "Ak žalobca zmení žalobu",
        "Nikdy"
    ],
    correct: 0,
    explain: "Rozsudok pre zmeškanie žalobcu sa vydá, ak sa žalobca nedostaví bez ospravedlnenia."
},
{
    q: "Čo je procesná ekonomia?",
    options: [
        "Zásada rýchleho a hospodárneho konania",
        "Zásada materiálnej pravdy",
        "Zásada kontradiktórnosti",
        "Zásada zákonnosti"
    ],
    correct: 0,
    explain: "Procesná ekonomia znamená, že konanie má byť rýchle, efektívne a bez zbytočných prieťahov."
},
{
    q: "Kedy môže súd uložiť poriadkovú pokutu svedkovi?",
    options: [
        "Ak sa nedostaví bez ospravedlnenia",
        "Ak vypovedá pravdivo",
        "Ak odmietne podpísať zápisnicu",
        "Ak má konflikt záujmov"
    ],
    correct: 0,
    explain: "Svedkovi možno uložiť poriadkovú pokutu, ak sa bez ospravedlnenia nedostaví alebo marí výsluch."
},
{
    q: "Čo je účelom odvolania?",
    options: [
        "Preskúmať zákonnosť a správnosť rozhodnutia súdu prvej inštancie",
        "Zmeniť účastníkov konania",
        "Zastaviť konanie",
        "Zmeniť skutkový stav"
    ],
    correct: 0,
    explain: "Odvolanie slúži na preskúmanie rozhodnutia súdu prvej inštancie."
},
{
    q: "Kedy je rozhodnutie vykonateľné?",
    options: [
        "Akonáhle je právoplatné",
        "Akonáhle uplynie lehota na plnenie",
        "Akonáhle je doručené",
        "Akonáhle ho súd vyhlási"
    ],
    correct: 1,
    explain: "Vykonateľnosť nastáva po uplynutí lehoty na plnenie, ak je rozhodnutie právoplatné."
},
{
    q: "Čo je procesná námietka?",
    options: [
        "Námietka proti dôkazom",
        "Námietka proti procesnému postupu alebo podmienkam konania",
        "Námietka proti právnej kvalifikácii",
        "Námietka proti svedkovi"
    ],
    correct: 1,
    explain: "Procesná námietka smeruje proti procesným podmienkam alebo postupu súdu."
},
{
    q: "Kedy môže súd rozhodnúť bez pojednávania v odvolacom konaní?",
    options: [
        "Ak sú splnené podmienky a vec možno rozhodnúť na základe spisu",
        "Nikdy",
        "Len ak to navrhne žalobca",
        "Len ak to navrhne žalovaný"
    ],
    correct: 0,
    explain: "Odvolací súd môže rozhodnúť bez pojednávania, ak to zákon umožňuje a skutkový stav je jasný."
},
{
    q: "Čo je procesný úkon?",
    options: [
        "Akýkoľvek prejav vôle účastníka alebo súdu smerujúci k postupu v konaní",
        "Len rozhodnutie súdu",
        "Len podanie žaloby",
        "Len výpoveď svedka"
    ],
    correct: 0,
    explain: "Procesný úkon je každý úkon účastníka alebo súdu, ktorý má procesné účinky."
},
{
    q: "Kedy môže súd ustanoviť znalca?",
    options: [
        "Ak je potrebné odborné posúdenie skutočností",
        "Ak žalovaný prehrá spor",
        "Ak žalobca zmení žalobu",
        "Ak účastník odmietne vypovedať"
    ],
    correct: 0,
    explain: "Znalec sa ustanovuje, ak sú potrebné odborné vedomosti."
},
{
    q: "Čo je kontradiktórnosť konania?",
    options: [
        "Povinnosť súdu zisťovať skutkový stav",
        "Právo účastníkov vyjadriť sa k tvrdeniam a dôkazom protistrany",
        "Povinnosť účastníkov uzavrieť zmier",
        "Povinnosť účastníkov mať advokáta"
    ],
    correct: 1,
    explain: "Kontradiktórnosť znamená, že strany majú právo reagovať na tvrdenia a dôkazy protistrany."
},
{
    q: "Kedy môže súd odmietnuť vykonať navrhnutý dôkaz?",
    options: [
        "Ak je nadbytočný alebo nevhodný",
        "Ak je navrhnutý žalovaným",
        "Ak je navrhnutý žalobcom",
        "Ak ide o listinu"
    ],
    correct: 0,
    explain: "Súd môže odmietnuť dôkaz, ak je nadbytočný, nevhodný alebo neúčelný."
},
{
    q: "Čo je právna istota?",
    options: [
        "Stav, keď účastníci poznajú svoje práva a povinnosti a rozhodnutia sú predvídateľné",
        "Stav, keď súd rozhodne rýchlo",
        "Stav, keď účastník vyhrá spor",
        "Stav, keď súd nevykoná dokazovanie"
    ],
    correct: 0,
    explain: "Právna istota znamená predvídateľnosť a stabilitu právnych vzťahov."
},
{
    q: "Kedy môže súd nariadiť pojednávanie v odvolacom konaní?",
    options: [
        "Ak je potrebné zopakovať alebo doplniť dokazovanie",
        "Vždy",
        "Len ak to navrhne žalobca",
        "Len ak to navrhne žalovaný"
    ],
    correct: 0,
    explain: "Odvolací súd nariaďuje pojednávanie, ak je potrebné vykonať dokazovanie."
},
{
    q: "Čo je účelom dovolania?",
    options: [
        "Preskúmať právoplatné rozhodnutie z hľadiska právnych otázok",
        "Preskúmať skutkový stav",
        "Zmeniť účastníkov konania",
        "Zastaviť konanie"
    ],
    correct: 0,
    explain: "Dovolanie je mimoriadny opravný prostriedok zameraný na právne otázky."
},
{
    q: "Kedy môže súd odmietnuť odvolanie?",
    options: [
        "Ak je oneskorené alebo neprípustné",
        "Ak žalovaný prehrá spor",
        "Ak žalobca zmení žalobu",
        "Ak odvolanie obsahuje viac ako jeden dôvod"
    ],
    correct: 0,
    explain: "Odvolanie sa odmieta, ak nespĺňa zákonné podmienky."
},
{
    q: "Čo je právna zásada kontradiktórnosti?",
    options: [
        "Súd zisťuje skutkový stav z úradnej povinnosti",
        "Strany majú právo vyjadriť sa k tvrdeniam a dôkazom protistrany",
        "Súd rozhoduje bez pojednávania",
        "Strany musia uzavrieť zmier"
    ],
    correct: 1,
    explain: "Kontradiktórnosť znamená, že strany môžu reagovať na tvrdenia a dôkazy protistrany."
},
{
    q: "Kedy môže súd rozhodnúť rozsudkom pre uznanie?",
    options: [
        "Ak žalovaný výslovne uzná nárok",
        "Ak žalobca zmení žalobu",
        "Ak žalovaný nepredloží dôkazy",
        "Ak žalobca nepredloží dôkazy"
    ],
    correct: 0,
    explain: "Rozsudok pre uznanie sa vydáva, ak žalovaný nárok výslovne uzná."
},
{
    q: "Čo je dôkazná povinnosť?",
    options: [
        "Povinnosť súdu vykonať dôkazy",
        "Povinnosť účastníka označiť dôkazy na preukázanie svojich tvrdení",
        "Povinnosť svedka vypovedať",
        "Povinnosť znalca vypracovať posudok"
    ],
    correct: 1,
    explain: "Dôkazná povinnosť je povinnosť účastníka označiť dôkazy na podporu tvrdení."
},
{
    q: "Kedy môže súd uložiť poriadkovú pokutu účastníkovi?",
    options: [
        "Ak marí priebeh konania alebo nerešpektuje pokyny súdu",
        "Ak prehrá spor",
        "Ak zmení žalobu",
        "Ak podá odvolanie"
    ],
    correct: 0,
    explain: "Poriadková pokuta sa ukladá za rušenie alebo marenie konania."
},
{
    q: "Čo je právna zásada dispozičnosti?",
    options: [
        "Súd rozhoduje z úradnej povinnosti",
        "Účastníci určujú predmet konania a jeho rozsah",
        "Súd vykonáva dôkazy bez návrhu",
        "Súd zisťuje skutkový stav aj bez tvrdení strán"
    ],
    correct: 1,
    explain: "Dispozičná zásada znamená, že účastníci určujú predmet konania."
},
{
    q: "Kedy môže súd odmietnuť vykonať znalecký dôkaz?",
    options: [
        "Ak nie je potrebný na objasnenie veci",
        "Ak je navrhnutý žalovaným",
        "Ak je navrhnutý žalobcom",
        "Nikdy"
    ],
    correct: 0,
    explain: "Znalecký dôkaz sa nevykoná, ak nie je potrebný alebo je nadbytočný."
},
{
    q: "Čo je právna zásada rovnosti strán?",
    options: [
        "Strany majú rovnaké procesné práva a povinnosti",
        "Strany musia mať rovnakého právneho zástupcu",
        "Strany musia mať rovnaký majetok",
        "Strany musia uzavrieť zmier"
    ],
    correct: 0,
    explain: "Rovnosť strán znamená rovnaké procesné možnosti v konaní."
},
{
    q: "Kedy môže súd rozhodnúť bez nariadenia pojednávania?",
    options: [
        "Ak sú skutkové tvrdenia nesporné alebo ak to zákon výslovne umožňuje",
        "Len ak to navrhne žalobca",
        "Len ak to navrhne žalovaný",
        "Nikdy"
    ],
    correct: 0,
    explain: "Súd môže rozhodnúť bez pojednávania, ak sú splnené zákonné podmienky a skutkový stav je jasný."
},
{
    q: "Čo je účelom predbežného opatrenia?",
    options: [
        "Dočasne upraviť pomery účastníkov alebo zabrániť ohrozeniu výkonu rozhodnutia",
        "Nahradiť konečné rozhodnutie",
        "Zastaviť konanie",
        "Zmeniť účastníkov konania"
    ],
    correct: 0,
    explain: "Predbežné opatrenie má dočasný charakter a chráni práva účastníkov do rozhodnutia vo veci samej."
},
{
    q: "Kedy môže súd uložiť povinnosť nahradiť trovy konania protistrane?",
    options: [
        "Ak účastník nemal úspech vo veci",
        "Ak účastník podá odvolanie",
        "Ak účastník zmení žalobu",
        "Ak účastník nepredloží dôkazy"
    ],
    correct: 0,
    explain: "Trovy konania znáša ten, kto nemal úspech vo veci (zásada úspechu)."
},
{
    q: "Čo je právna zásada zákonnosti?",
    options: [
        "Súd rozhoduje podľa vlastného uváženia",
        "Súd rozhoduje podľa zákona a v jeho medziach",
        "Súd rozhoduje podľa dohody strán",
        "Súd rozhoduje podľa spravodlivosti bez ohľadu na zákon"
    ],
    correct: 1,
    explain: "Zásada zákonnosti znamená, že súd je viazaný zákonom."
},
{
    q: "Kedy môže súd odmietnuť vykonať výsluch svedka?",
    options: [
        "Ak je výsluch nadbytočný alebo irelevantný",
        "Ak svedka navrhne žalovaný",
        "Ak svedka navrhne žalobca",
        "Nikdy"
    ],
    correct: 0,
    explain: "Súd môže odmietnuť dôkaz, ak je nadbytočný, nevhodný alebo neúčelný."
},
{
    q: "Čo je účelom dokazovania?",
    options: [
        "Zistiť skutkový stav veci",
        "Zmeniť účastníkov konania",
        "Zastaviť konanie",
        "Určiť právnu kvalifikáciu"
    ],
    correct: 0,
    explain: "Dokazovanie slúži na zistenie skutkového stavu, ktorý je základom rozhodnutia."
},
{
    q: "Kedy môže súd rozhodnúť rozsudkom pre zmeškanie žalovaného?",
    options: [
        "Ak sa žalovaný bez ospravedlnenia nedostaví na pojednávanie",
        "Ak žalovaný nepredloží dôkazy",
        "Ak žalovaný podá odpor",
        "Ak žalovaný zmení svoje tvrdenia"
    ],
    correct: 0,
    explain: "Rozsudok pre zmeškanie sa vydá, ak sa žalovaný nedostaví bez ospravedlnenia."
},
{
    q: "Čo je právna zásada materiálnej pravdy v mimosporovom konaní?",
    options: [
        "Súd zisťuje skutkový stav aj bez návrhov účastníkov",
        "Súd rozhoduje len podľa tvrdení strán",
        "Súd nevykonáva dokazovanie",
        "Súd rozhoduje podľa dohody účastníkov"
    ],
    correct: 0,
    explain: "V mimosporovom konaní súd zisťuje skutkový stav z úradnej povinnosti."
},
{
    q: "Kedy môže súd uložiť účastníkovi povinnosť predložiť listinu?",
    options: [
        "Ak je listina potrebná na rozhodnutie a účastník ju má k dispozícii",
        "Len ak to navrhne žalobca",
        "Len ak to navrhne žalovaný",
        "Nikdy"
    ],
    correct: 0,
    explain: "Účastník musí predložiť listinu, ak je potrebná na rozhodnutie a má ju vo svojej moci."
},
{
    q: "Čo je účelom civilného procesu?",
    options: [
        "Poskytnúť účinnú súdnu ochranu právam a právom chráneným záujmom",
        "Zabezpečiť rýchle ukončenie sporu bez ohľadu na spravodlivosť",
        "Zmeniť právne normy",
        "Nahradiť činnosť orgánov verejnej správy"
    ],
    correct: 0,
    explain: "Účelom civilného procesu je poskytnúť účinnú a spravodlivú súdnu ochranu."
}







 // 🔥 SEM DOPLNÍM OTÁZKY 4–100
];


/* ============================================
   KVÍZ – GENEROVANIE OTÁZOK DO HTML
============================================ */

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("quiz-questions");
    if (!container) return;

    let html = "";

    questions.forEach((q, index) => {
        html += `<h3 class="quiz-question">${index + 1}. ${q.q}</h3>`;

        q.options.forEach((opt, i) => {
            html += `
                <div class="quiz-option"
                     onclick="check(this, ${i === q.correct}, ${index})">
                     ${opt}
                </div>`;
        });
    });

    container.innerHTML = html;

    shuffleAnswers();
});


/* ============================================
   KVÍZ – PREMIEŠANIE ODPOVEDÍ
============================================ */

function shuffleAnswers() {
    const sections = document.querySelectorAll(".quiz-section");

    sections.forEach(section => {
        const questions = section.querySelectorAll(".quiz-question");

        questions.forEach(question => {
            let btns = [];
            let next = question.nextElementSibling;

            while (next && next.classList.contains("quiz-option")) {
                btns.push(next);
                next = next.nextElementSibling;
            }

            for (let i = btns.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [btns[i], btns[j]] = [btns[j], btns[i]];
            }

            btns.forEach(btn => {
                question.parentNode.insertBefore(btn, next);
            });
        });
    });
}


/* ============================================
   KVÍZ – LOGIKA ODPOVEDÍ
============================================ */

let score = 0;
let answered = Array(questions.length).fill(false);

function check(btn, correct, index) {
    if (answered[index]) return;

    answered[index] = true;

    if (correct) {
        btn.classList.add("correct");
        score++;
    } else {
        btn.classList.add("wrong");
    }

    const explanation = document.createElement("div");
    explanation.className = "explanation";
    explanation.innerHTML = questions[index].explain;
    btn.parentNode.insertBefore(explanation, btn.nextSibling);
}


/* ============================================
   KVÍZ – VÝSLEDOK
============================================ */

function finishQuiz() {
    const total = questions.length;
    const percent = Math.round((score / total) * 100);

    let level = "";
    if (percent <= 40) level = "Začiatočník";
    else if (percent <= 70) level = "Pokročilý";
    else level = "Expert";

    document.getElementById("quiz-result").innerHTML = `
        <div style="
            background:#FCEFF1;
            padding:20px;
            border-radius:16px;
            margin-top:20px;
            box-shadow:0 4px 12px rgba(160,76,97,0.15);
            font-size:1.1em;
            color:#A04C61;
            text-align:center;
        ">
            <strong>Výsledok:</strong> ${score} / ${total} (${percent}%)
            <br><br>
            <strong>Úroveň:</strong> ${level}
        </div>
    `;
}


/* ============================================
   KVÍZ – RESET
============================================ */

function resetQuiz() {
    score = 0;
    answered = Array(questions.length).fill(false);

    document.querySelectorAll(".quiz-option").forEach(opt => {
        opt.classList.remove("correct", "wrong", "answered");
    });

    document.querySelectorAll(".explanation").forEach(e => e.remove());

    document.getElementById("quiz-result").innerHTML = "";

    shuffleAnswers();

    window.scrollTo({ top: 0, behavior: "smooth" });
}
