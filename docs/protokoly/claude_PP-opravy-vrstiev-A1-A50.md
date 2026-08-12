# Pracovné právo — zladenie kvízov, dlaždíc, prípadov a pavúkov s opravenými summary

**Fáza:** aplikované, commit lokálny · **Zdroj pravdy:** `# Pracovné právo — prehľad zmien A1–A50` (garantský prehľad, 7 vecných opráv + kotvy + 5 zastaraní)

Summary A1–A50 opravil garant a sync ich zapiekol do repa (`dbc94aa`). Ostatné vrstvy sa nikdy neauditovali, takže v nich zostali pôvodné tvrdenia — vrátane šiestich prípadov, keď kvíz alebo prípadová štúdia **označovala za správnu odpoveď to, čo summary vyvracia**. Tento commit ich dorovnáva.

## Čo sa zmenilo

### Chybná „správna" odpoveď (priorita)

| okruh | bolo | je | lokácia |
|---|---|---|---|
| **A2** | správna odpoveď **„Zákonník práce"** | **„Zákon č. 2/1991 Zb. o kolektívnom vyjednávaní"** (`correct: 1` → `0`) | `quiz[0]`, `spider.br[0].leaf[1]` |
| **A45** | pri prestoji **100 %** priemerného zárobku | **najmenej 80 %** (§ 142 ods. 1 ZP po novele) | `quiz[1]` (odpoveď aj vysvetlenie), `quiz[3].explanation`, `cases[0].step[2]`+`[3]`, `tiles[0]`, `spider.br[0].leaf[1]` |
| **A8** | „Čo nasleduje, ak sprostredkovanie zlyhá?" → **Rozhodca** | **rozhodca len ak sa strany dohodnú**, inak rovno štrajk/výluka | `cases[1].step[2]`, `spider.br[3]` (prepísané 3 listy + doplnený štvrtý o spore o plnenie záväzkov), `spider.br[5].leaf[2]` |
| **A10** | to isté | to isté | `cases[1].step[2]`, `spider.br[5]` |
| **A4** | správna **„Do 7 dní"** paušálne | **dvojlehota § 47a** — základné údaje do 7 dní, ostatné do 4 týždňov, a len ak nie sú už v zmluve | `quiz[2]` (otázka aj odpovede), `tiles[3]`, `spider.br[5].leaf[0]` + nový list |
| **A39** | *„90 dní = 4×21 dní → krátenie o **4/12**"*, *„za prvých 100 dní sa **nekráti**"* | **1/12** za prvých 100 zameškaných dní, ďalej o 1/12 za každých 21 dní | `cases[0].step[2]`+`[3]`, `cases[1].step[2]`, `spider.br[3].leaf[1]`, `spider.center` |

### Kotvy a zastarania

| okruh | zmena |
|---|---|
| **A10** | rozšírenie KZ vyššieho stupňa: „**rozhodnutie ministerstva**" → **súhlas dotknutého zamestnávateľa** (po náleze ÚS) — `tiles[4]`, `spider.br[6].leaf[0]` |
| **A16** | kotva **§ 12 → § 237** na troch miestach: `tiles[4]`, `cases[0].step[1].explanation`, `spider.br[4].label` |
| **A38** | „Pojem mladistvého (**§ 40 ods. 3**)" → **ods. 4** — `spider.br[0].label` |
| **A35** | rozlíšené podľa obsahu: **nadčas tehotných → § 164 ods. 3** (`quiz[2].explanation`); **nočná práca osamelého rodiča ponechaná na ods. 4** (`quiz[4]`, `cases[1].step[1]`), lebo tam ods. 4 sedí |

### Doplnenia (nič nemýlili, len chýbali)

- **A12** — `spider.br[5]`: **právo na odpojenie (§ 52 ods. 10 ZP)** a úhrada zvýšených nákladov pri práci z domu
- **A18** — `spider.br[5]`: DPČ **520 hodín ročne** popri týždennom limite; odvody dohodárov + odpočítateľná položka pri DBPŠ
- **A50** — `spider.br[?] „Limity dohôd"`: to isté

## Čoho som sa nedotkol

- **A14 (materská/otcovská)** — na pokyn garanta. Kvíz, dlaždica aj pavúk (28/31/37 týždňov, § 166 ods. 1) zostávajú, vrátane `spider.br[3].leaf[0]`. Summary si zosúladí garant sám.
- **A22** — „Podstata zodpovednosti (§ 192–198 ZP)" ponechané ako zastrešujúci rozsah.
- **A32** — § 164 sa v ostatných vrstvách nevyskytuje, nebolo čo opravovať.
- **A42** — `spider.br[2]` už mala „strava **alebo** finančný príspevok" aj 55 %, teda znenie po novele.
- **Summary** — sú garantove a už zapečené; nedotknuté.

## Overenie

- 50/50 pavúkov prejde `isValidSpider`
- kvízy 5/5 vo všetkých okruhoch, prípady 2/2, dlaždice a zhrnutia na mieste
- **všetky indexy `correct` v rozsahu možností** — vrátane tých, kde sa menilo poradie odpovedí
- stromy sa v UI kreslia (A2 5/15, A4 8/21, A8 6/16, A10 7/16, A12 6/24, A16 7/25, A18 7/30, A35 7/18, A38 7/12, A39 7/11, A45 5/14, A50 7/18), konzola čistá
- cielená kontrola potvrdila, že ani jedno z pôvodných tvrdení už v žiadnej vrstve nezostalo

## Poznámka k „OVER" z garantského prehľadu

Opravy som robil podľa prehľadu zmien, **nie proti zneniu Zákonníka práce na Slov-Lexe** — tak, ako sme sa dohodli, že overovanie §§ patrí do fázy výroby. Položky, ktoré si v prehľade sama označila ako „OVER", teda ostávajú na overenie: predovšetkým **§ 142 percentá (A45)**, **§ 109 krátenie (A39)**, **§ 47a lehoty (A4)** a **§ 7 zákona 2/1991 pri rozšírení KZ (A10)** — to sú presne tie štyri, ktoré tento commit premietol do kvízov.
