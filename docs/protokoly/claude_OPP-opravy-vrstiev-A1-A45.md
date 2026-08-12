# OPP procesné — zladenie kvízov, dlaždíc, prípadov a pavúkov s opravenými summary

**Fáza:** aplikované, commit lokálny · **Nadväzuje na:** `claude_OPP-krizova-kontrola-vrstiev.md` · **Skratky:** CSP 160/2015, CMP 161/2015, SSP 162/2015, EP 233/1995

Summary A1–A45 opravil garant a sync ich zapiekol. Ostatné vrstvy sa neauditovali — z krížovej kontroly vyšlo 20 miest, kde niesli pôvodné tvrdenie, z toho štyri ako „správna" odpoveď v kvíze alebo prípade. Tento commit ich dorovnáva.

## Tier 1 — chybná „správna" odpoveď

| okruh | bolo | je |
|---|---|---|
| **A7** `quiz[2]` | otázka „Čo je prorogácia?" so správnou odpoveďou **„Dohodou strán určená miestna príslušnosť"** a vysvetlením o § 17 CSP | otázka preformulovaná na „Možno si dohodou určiť miestne príslušný súd?"; správna odpoveď **„…prorogácia nie je v CSP prípustná"**, dohoda strán ostala distraktorom. Vysvetlenie dopĺňa, že dohoda o príslušnosti prichádza do úvahy len cezhranične podľa Brusel Ia |
| **A33** `quiz[2]` | kasačná sťažnosť proti rozhodnutiu **krajského** súdu | proti rozhodnutiu **správneho** súdu |
| **A45** `cases[0].steps[1]` | „Podať správnu žalobu na príslušný správny súd **(krajský súd)**" | „…**(Bratislava, Banská Bystrica alebo Košice)**" |
| **A34** `quiz[3]` + `cases[1].steps[1]` | „Uznesením" bez výnimky | odpoveď ostáva, vysvetlenia dopĺňajú: **v statusových veciach rozsudkom (§ 45 CMP)** — rozvod, rodičovstvo, osvojenie, spôsobilosť |

## Tier 2 — statusová trojica (forma = rozsudok)

- **A35** — `spider.branches[2].leaves[6]`, `branches[3].leaves[10]`, `branches[4].leaves[8]`: „Forma: uznesenie" → **„Forma: rozsudok (statusová vec, § 45 CMP)"**
- **A37** — tri veci naraz:
  - forma: vetva „Obmedzenie spôsobilosti" dostala list o rozsudku; „Navrátenie" malo *„rozhoduje uznesením"* → **rozsudkom**; vágne *„rozhoduje sa uznesením, v niektorých konaniach rozsudkom"* → presné rozlíšenie (spôsobilosť rozsudkom, vyhlásenie za mŕtveho a dôkaz smrti uznesením)
  - register: *„Centrálnom notárskom registri listín (CNRL)"* → **notárskom centrálnom registri**
  - terminológia: **18 výskytov** českej „svojprávnosti" → **spôsobilosť na právne úkony** (naprieč kvízmi, dlaždicami, prípadmi aj pavúkom); pri tom opravená aj gramatika v `cases[1].steps[2].options[2]`
- **A34** — `spider.branches[4].leaves[4]`: *„uznesením, **nie rozsudkom**"* → „spravidla uznesením; v statusových veciach rozsudkom (§ 45 CMP)"; `tiles[3].term` dostal tú istú výnimku

## Tier 3 — súdna mapa 2023

- **A33** (6 miest) — „krajský súd" → **správny súd** v `quiz[2]`, `tiles[3]`, `cases[1].steps[0]`+`[1]`, `spider.branches[3].leaves[2]`+`[17]`. Distraktor „Na krajský súd" pri dovolaní GP ostal, tam je namieste
- **A45** (4 miesta) — `cases[0].steps[1]`, `spider.center`, `branches[4].leaves[0]` (→ „Správne súdy (BA, BB, KE): prvá a jediná inštancia od 1. 6. 2023"), `leaves[2]`
- **A3** — `spider.branches[3].leaves[4]`: z disciplinárnej právomoci NSS SR odstránení **advokáti**, doplnení notári a exekútori

## Tier 4 — exekučný balík

- **A39** — `spider.branches[3].leaves[3]`+`[5]`: predreformné *„elektronicky cez exekútora"* a *„exekútor následne žiada súd o poverenie"* → **„návrh sa podáva výlučne elektronicky na OS Banská Bystrica"** a **„súd náhodným výberom pridelí exekútora a vydá mu poverenie (novela 2017, zákon č. 2/2017 Z. z.)"**. Pavúk je tým zladený s kvízmi a prípadmi, ktoré to už mali správne
- **A42** (5 miest) — `tiles[0]`, `tiles[1]`, `spider.center`, `branches[0].label`, `branches[3].label`: § 56 → **§ 61h a nasl.**, § 57 → **§ 61k (súdom) / § 61n (exekútorom)**

## Tier 5 — číselné posuny a zrušené inštitúty

| okruh | zmena | miest |
|---|---|---|
| **A23** | medzitýmny § 216 → **§ 214**, čiastočný § 217 → **§ 215** | 6 |
| **A9** | procesný opatrovník § 78 → **§§ 68–72** | 2 |
| **A14** | zmena žaloby § 142 → **§ 139** | 3 |
| **A15** | to isté | 1 ⚠️ |
| **A16** | začatie konania § 143 → **§ 156** | 2 |
| **A26** | dlaždica aj vetva „Zmenkový a šekový platobný rozkaz" → **Európsky platobný rozkaz (nariadenie 1896/2006)**, s výslovnou poznámkou, že zmenkový PR CSP nepozná; v „Skrátených rozhodnutiach" oddelený **UPR (307/2016, OS BB)** od **EPR** | 3 |
| **A29** | „demonštratívny výpočet – nie uzavretý" → **taxatívny (§ 365 CSP)** | 1 |
| **A25** | dve vysvetlenia popierali sťažnosť → doplnené, že **CSP ju pozná** (§ 239 a nasl., rozhoduje sudca podľa § 248, proti uzneseniam VSÚ). Zladené s vlastným pavúkom | 2 |
| **A38** | odstránené *„pozastavenie výplaty sociálnych dávok"* | 1 |
| **A27** | „odborová organizácia **(ROH)**" → odborová organizácia | 1 |
| **A44** | *fidei publica* → **fides publica** | 1 |

## ⚠️ A15 — repo oprava sa neprejaví

**A15 má Firebase override na `spider`** a je to jediný taký prípad medzi dotknutými okruhmi (overil som všetkých 18 po aplikácii). Override sa navrství nad repo súbor pri čítaní a pri ďalšom synci sa zapečie späť. Oprava „§ 142 → § 139" v `spider.branches[2].label` je preto v repe pripravená, ale **v appke sa ukáže až keď garant override prepíše alebo zmaže v editore** — rovnako ako pri OPH hmotné A23.

Vedľajší nález na A15, mimo zadania: `spider.branches[3].label` uvádza *„Uznanie nároku žalovaným (§ 133 CSP)"*, pričom oprava summary vedie uznanie k **rozsudku pre uznanie (§ 282)**. Neoveroval som, či § 133 sedí na samotný úkon uznania — nechávam na rozhodnutie garanta.

## Overenie

- **45/45 pavúkov** prejde `isValidSpider`, kvízy 5/5, prípady 2/2, dlaždice a zhrnutia na mieste
- **všetky indexy `correct` v rozsahu možností** — vrátane A7, kde sa menili otázka aj poradie odpovedí
- stromy sa v UI kreslia (A3 6/36, A7 10/32, A9 7/28, A14 6/32, A15 6/22, A23 5/21, A25 6/25, A26 7/36, A29 5/18, A33 4/33, A34 6/26, A35 7/52, A37 6/28, A38 6/31, A39 6/29, A42 6/22, A44 7/27, A45 7/35), konzola čistá
- cielená kontrola 27 pôvodných formulácií: **žiadna už v dátach nie je**
- summary nedotknuté

## Čo ostáva neúplné (nie chybné)

Z krížovej kontroly: A20 nespomína prostriedky útoku a obrany § 149 · A24 nemá § 232 ods. 3 ani „3 dni" · A19 neuvádza §§ 360–369 CMP · A38 neuvádza §§ 370 a nasl. CMP ani vyhlášku 207/2016 · A41 nespomína náhodný výber exekútora · A3 nespomína súdnu mapu 2023 (mestské a správne súdy). Nič z toho nemýli, len chýba — doplnenie na samostatné slovo.
