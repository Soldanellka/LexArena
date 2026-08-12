# OPP procesné — krížová kontrola vrstiev proti opravám summary (A1–A45)

**Fáza:** len čítanie a report · **Zdroj pravdy:** prehľad úprav OPP A1–A45 · **Skratky:** CSP 160/2015, CMP 161/2015, SSP 162/2015, EP 233/1995

## Blok 1 — Inventár

Hodnoty sú naprieč všetkými 45 okruhmi rovnaké, preto zbalené — žiadny okruh sa nevymyká.

| vrstva | stav |
|---|---|
| summary | **45/45**, override existuje všade a **je zhodný s repom** (sync prebehol); dĺžka 2 191–3 939 znakov |
| theory | 0 všade |
| kvíz | **5 otázok všade** |
| tiles | 5 všade |
| cases | 2 všade |
| `spider` | **45/45 prítomný, 45/45 `isValidSpider` = pass** |
| v `_map.json` | **45/45** |

**Chýbajúci pavúk: žiadny.**

**Mapa:** `ob-pravo-app/data/procesne/_map.json` — **10 klastrov, 64 prepojení, pokrytie 45/45**, žiadny okruh navyše ani chýbajúci. **Oblasť sa otvára mapou**, nie núdzovo.

| klaster | okruhy |
|---|---|
| Základy a princípy | 1, 2 |
| Súdna moc a subjekty | 3–9 |
| Priebeh sporového konania | 10–17, 20, 27 |
| Neodkladné a zabezpečovacie opatrenia | 18, 19 |
| Dokazovanie | 21, 22 |
| Rozhodnutia súdu | 23–26 |
| Opravné prostriedky | 28–33 |
| Mimosporové konania (CMP) | 34–38 |
| Exekúcia | 39–42 |
| Mimo civilného sporu | 43, 44, 45 |

⚠️ **Firebase overridy nad rámec summary — riziko ako pri OPH A23:**
- **A15** — override na `spider`
- **A2** — override na `spider` a `quiz_2`

Obidva sú momentálne zhodné s repom, ale pri čítaní vyhrávajú a pri synci sa zapečú späť. **A15 je priamo dotknutá opravou** (§ 142), takže oprava v repe sa bez zásahu v editore neprejaví.

## Blok 2 — Krížová kontrola

### 🔴 Chybná „správna" odpoveď — priorita

| okruh | lokácia | čo je zle |
|---|---|---|
| **A7** | `quiz[2]` **správna: „Dohodou strán určená miestna príslušnosť iného súdu"** + vysvetlenie *„Prorogácia (§ 17 CSP) umožňuje stranám dohodou písomne určiť miestnu príslušnosť…"* | CSP vnútroštátnu prorogáciu **zrušil** |
| **A33** | `quiz[2]` **správna: „…proti právoplatnému rozhodnutiu krajského súdu v správnom súdnictve"** | kasačná sťažnosť smeruje proti rozhodnutiu **správneho súdu** |
| **A45** | `cases[0].steps[1]` **správna: „Podať správnu žalobu na príslušný správny súd (krajský súd)"** | prvostupňové správne súdnictvo robia **správne súdy** (BA, BB, KE) |
| **A34** | `quiz[3]` správna **„Uznesením"** + *„Práve tu je zásadný rozdiel oproti CSP"*; `cases[1].steps[1]` správna **„Uznesením"** | ako všeobecné pravidlo obstojí, ale **chýba statusová výnimka (§ 45 CMP)** — v spojení s A35/A37 mýli |

### 🔴 TIER 1 — vecné chyby v ostatných vrstvách

**A35 — statusové veci uznesením. NÁJDENÁ, 3 miesta, všetky v pavúku.**
`spider.branches[2].leaves[6]` *„Forma rozhodnutia: uznesenie"* (rozvod) · `branches[3].leaves[10]` *„Forma: uznesenie"* (rodičovstvo) · `branches[4].leaves[8]` *„Forma: uznesenie"* (osvojenie). Kvízy, dlaždice aj prípady sú čisté.

**A37 — tri samostatné chyby.**
- forma: `spider.branches[3].leaves[3]` *„rozhoduje uznesením"* (navrátenie spôsobilosti); `branches[5].leaves[0]` *„rozhoduje sa uznesením, v niektorých konaniach rozsudkom"* — vágne, nepomenúva statusové veci
- register: `spider.branches[2].leaves[3]` *„evidencia rozhodnutia v **Centrálnom notárskom registri listín (CNRL)**"*
- terminológia **„svojprávnosť"** na ~13 miestach: `quiz[2].question`, `quiz[3].question`, `tiles[1].term`, `tiles[2].definition`, `tiles[4].term`+`definition`, `cases[0].title`, `cases[0].steps[0].question`, `steps[2].question`+`explanation`, `cases[1].steps[2].options[2]` („nesvojprávnou"), `spider.center`, `branches[1].leaves[5]`, `branches[3].label`+`leaves[0]`

**A34 — NÁJDENÁ.** `spider.branches[4].leaves[4]` *„vo veci samej sa rozhoduje uznesením, **nie rozsudkom**"* — priamo popiera výnimku. `tiles[3].term` *„Uznesenie vo veci samej"*.

**A26 — NÁJDENÁ, dve veci.**
- zrušený inštitút ako platný: `tiles[3]` *„Zmenkový a šekový platobný rozkaz"* + celá vetva `spider.branches[3]` s tromi listami
- `spider.branches[1].leaves[1]` *„upomínací platobný rozkaz (**EPR** / UPR)"* — zamieňa **európsky** platobný rozkaz (nariadenie 1896/2006) s upomínacím konaním

Kvízy sú čisté — žiadna otázka o zmenkovom PR.

**A7 — okrem prorogácie ešte:**
- `spider.branches[2].leaves[2]` *„**Krajský súd ako prvostupňový súd** vo vybraných veciach: ochrana osobnosti, hospodárska súťaž, priemyselné vlastníctvo"*; `tiles[0].definition` *„okresný, alebo výnimočne krajský súd"*
- `quiz[0].explanation` *„Vecná príslušnosť (**§ 12 – 21** CSP)"* → vecná je § 12, §§ 13–21 je miestna
- `quiz[1].explanation` *„Podľa **§ 12** CSP sa vec koná na súde, v obvode ktorého má žalovaný bydlisko"* → to je miestna príslušnosť
- delegácia **§ 41** na troch miestach (`quiz[3].question`, `tiles[4].term`, `cases[1].steps[1].options[0]`, `spider.branches[9].label`) → **§ 39**

**A29 — NÁJDENÁ, 1 miesto.** `spider.branches[3].leaves[0]` *„**demonštratívny výpočet – nie uzavretý**"*. `quiz[3]` o § 357 je pritom správne („taxatívny výpočet").

**A39 — NÁJDENÁ v pavúku, okruh si protirečí.**
`spider.branches[3].leaves[3]` *„exekučný návrh oprávneného, spravidla elektronicky **cez exekútora**"* · `leaves[5]` *„**exekútor následne žiada súd o poverenie**"* — pred-2017 mechanizmus. Pritom `quiz[3]`, `tiles[3]` aj `cases[0].steps[2]` už správne hovoria, že poverenie udeľuje OS Banská Bystrica. **Náhodný výber exekútora sa nespomína nikde.**

**A3 — NÁJDENÁ, 1 vecná.** `spider.branches[3].leaves[4]` — disciplinárna právomoc NSS SR *„sudcov, prokurátorov, **advokátov** a ďalších profesií"*; podľa opravy tam advokáti nepatria (sudcovia, prokurátori, notári, exekútori). **Súdna mapa 2023** (mestské súdy, správne súdy) sa v žiadnej vrstve nespomína → neúplné, nie chybné.

**A33 — NÁJDENÁ, 6 miest.** Okrem `quiz[2]` vyššie: `tiles[3].definition`, `cases[1].steps[0].question`, `cases[1].steps[1].options[2]`, `spider.branches[3].leaves[2]` *„smeruje proti právoplatnému rozhodnutiu krajského súdu"*, `leaves[17]` *„vec vráti krajskému súdu"*.

**A45 — NÁJDENÁ, 4 miesta.** Okrem `cases[0].steps[1]` vyššie: `spider.center` *„× krajské súdy ×"*, `spider.branches[4].leaves[0]` *„**Krajské súdy**: správne súdy prvej inštancie"*, `leaves[2]` *„proti rozhodnutiam krajských súdov"*.

### 🟠 TIER 2 — čísla §

| okruh | verdikt | lokácia |
|---|---|---|
| **A23** | **NÁJDENÁ, 6 miest** | `quiz[1].question` „(§ 216)", `quiz[2].question` „(§ 217)", `tiles[1].term`, `tiles[2].term`, `spider.branches[1].leaves[1]`+`[2]` → **§ 214 / § 215** |
| **A9** | **NÁJDENÁ, 2 miesta** | `tiles[2].definition` „(§ 78 CSP)", `spider.branches[4].label` „Procesný opatrovník (§ 78 CSP)" → **§§ 68–72** |
| **A42** | **NÁJDENÁ, 5 miest** | `tiles[0].term` „(§ 56 EP)", `tiles[1].term` „(§ 57 EP)", `spider.center`, `branches[0].label`, `branches[3].label` → **§ 61h / § 61k / § 61n** |
| **A14** | **NÁJDENÁ, 3 miesta** | `quiz[3].explanation`, `tiles[4].term` „(§ 142 CSP)", `cases[1].steps[1].explanation` → **§ 139** |
| **A15** | **NÁJDENÁ, 1 miesto — a je pod Firebase overridom** | `spider.branches[2].label` „Zmena žaloby (§ 142 CSP)" → **§ 139** |
| **A25** | **NÁJDENÁ, 2 miesta** | `quiz[0].explanation` *„…opravným prostriedkom je aj proti uzneseniu odvolanie, **nie samostatná sťažnosť**"*, `cases[0].steps[1].explanation.wrong` *„Sťažnosť už súčasný CSP…"*. Pritom `spider.branches[4]` sťažnosť **správne** opisuje (proti uzneseniam VSÚ, nedevolutívna) — okruh si protirečí. §§ 239/248 nikde |
| **A38** | **NÁJDENÁ, 1 miesto** | `spider.branches[3].leaves[3]` *„**pozastavenie výplaty sociálnych dávok**"* — presne to, čo si zo summary odstránila ako neoverené |
| **A16** | **NEJASNÉ** | `quiz[0].explanation` *„Konanie je začaté dňom, keď žaloba dôjde… (**§ 143** CSP)"*. Netýka sa rozsudkov pre uznanie/zmeškanie, ale začatia konania — a summary A5 preň uvádza **§ 156**. Posúď, ktoré platí |
| **A4** | **NENÁJDENÁ** | layers uvádzajú „§ 49 CSP" a „§ 49 a nasl.", chybný rozsah 49–55 nikde |
| **A11** | **NENÁJDENÁ** | len „Doručovanie žaloby (§ 116 CSP)" — správne; rozsah 105–121 nikde |
| **A12 / A20** | **NENÁJDENÁ** | A20 má **§ 153 sudcovská / § 154 zákonná** správne na štyroch miestach; § 132 nikde. Prostriedky útoku/obrany § 149 sa nespomínajú → neúplné |
| **A24** | **NENÁJDENÁ** | `spider.branches[4].leaves[3]` už hovorí *„plynie spravidla od právoplatnosti"*. Chýba § 232 ods. 3 aj „3 dni" → neúplné |
| **A33 §§** | **NENÁJDENÁ** | `spider.branches[0].label` má len „(§ 458 CSP)", chybný horný limit 470 nikde |
| **A18** | **NENÁJDENÁ** | § 325 aj § 343 správne na štyroch miestach |
| **A19** | **NENÁJDENÁ** | vecne sedí (oficialita, CMP nepozná záložné právo); §§ 360–369 sa neuvádzajú → neúplné |
| **A41** | **NENÁJDENÁ** | pavúk hovorí *„rozhoduje o poverení exekútora"*, *„na základe poverenia súdu"*. Náhodný výber sa nespomína → neúplné |

### 🟠 TIER 3 — terminológia

- **A27 — NÁJDENÁ.** `spider.branches[2].leaves[1]` *„odborová organizácia **(ROH)**"*
- **A44 — NÁJDENÁ.** `spider.branches[0].leaves[2]` *„nositeľ **fidei publica** (verejnej viery)"* → **fides publica**

### Navyše (mimo tvojho zoznamu)

**A15** — `spider.branches[3].label` *„Uznanie nároku žalovaným (**§ 133** CSP)"*. Podľa opravy summary vedie uznanie k **rozsudku pre uznanie (§ 282)**. Neoveroval som, či § 133 sedí na samotný úkon uznania — nechávam na tvoje rozhodnutie.

## Blok 3 — Poradie opráv

1. **A7, A33, A45, A34** — štyri okruhy, kde kvíz alebo prípad odmeňuje nesprávnu odpoveď. A7 je najhorší: prorogácia je zrušený inštitút prezentovaný ako správna odpoveď.
2. **Statusová trojica A34 + A35 + A37** naraz — inak zostane appka vnútorne rozporná. A37 je najrozsiahlejšia (forma + CNRL + ~13× „svojprávnosť").
3. **Súdna mapa: A3, A33, A45** — spoločný vzorec „krajský súd" tam, kde dnes konajú správne súdy.
4. **Exekučný balík A39 + A42** — starý mechanizmus v pavúku A39 (kvízy sú už správne) a §§ 56/57 → 61h/61k/61n v A42.
5. **Číselné posuny** A23 (+2), A9, A14, A15 — mechanické, jednoriadkové.
6. **A26, A29, A25, A38** — zrušený zmenkový PR, „demonštratívne", popretie sťažnosti, sociálne dávky.
7. **Drobnosti A27 (ROH), A44 (fidei → fides)** — na koniec.

## Upozornenie pred opravnou dávkou

**A15 má Firebase override na `spider`.** Oprava „§ 142 → § 139" v repe sa v appke neprejaví a **ďalší sync ju prepíše späť**, presne ako pri OPH A23. Buď override v editore prepíšeš, alebo ho zmažeš — inak tú jednu opravu robiť nemá zmysel. A2 má overridy tiež (`spider`, `quiz_2`), ale žiadna z nájdených chýb sa jej netýka.
