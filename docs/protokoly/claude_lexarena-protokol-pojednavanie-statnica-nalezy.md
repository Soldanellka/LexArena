# LexArena — „Pojednávanie" + medzery; nález: z čoho skúša Štátnica (protokol od Code)

> **Fáza:** pushnuté (`6e19e4d..1d164b0`). Dlaždice hotové; k podkladom A2–A13 dva zásadné nálezy o tom, z čoho Štátnicová sieň reálne skúša.

## Dlaždice · `1d164b0`
`index.html:369` názov · `styles.css:281` medzera
- „Spustiť pojednávanie" (2 riadky) → **„Pojednávanie"** (1 riadok); všetky tri názvy jednoriadkové.
- Medzera 12 → **18 px** — nie odhad: odmeraná šírka dvoch písmen v reálnom fonte (700 14,5 px, „aa" = 16,1 px). Šírka dlaždice 203 px pri 1280. Mobil bez zmeny. Konzola čistá.

## Nálezy k podkladom a Štátnicovej sieni
1. **Appka nemá kam uložiť doplňujúce otázky, časté chyby ani vodítka.** Sieň berie kľúčové body **výhradne zo summary** — zo sekcie „Kľúčové slová (štátnicové):" (`statnice.js:320`). Z podkladov A1–A13 sa dnes dá nasadiť len časť „kľúčové body" (doplnením takej sekcie do summary); zvyšok je zatiaľ garantský materiál — dostať ho do siene = samostatná úloha (nová štruktúra + zobrazenie).
   - Navyše TPH summary majú sekciu **„Zapamätaj si (štátnicové jadro)"** — regex ju nechytí, `extractKeyPoints` spadne na núdzové delenie na vety.
2. **Štátnica nečíta Firebase úpravy.** `fetchOkruh` (`statnice.js:359`) fetchuje `A{n}.json` priamo, bez `applyContentOverrides` — sieň skúša zo **starého obsahu v repe** (~300 znakov theory), nie z vyeditovaných ~2000-znakových summary. Platí pre všetky tri podporované oblasti (Pracovné, Občianske, Európske; **TPH v sieni zatiaľ nie je**). Sync teda nie je kozmetika — je podmienkou, aby sieň skúšala z textov Babu (kým sa nedoplní čítanie overridov).

## Rozhodnutia Babu (zaznamenané)
- **Rozšíriť regex** v `statnice.js`, aby chytal aj „Zapamätaj si (štátnicové jadro)" — bezpečnejšia cesta, nemení texty.
- **Doplniť `applyContentOverrides`** do štátnice — sieň bude čítať Firebase úpravy aj bez syncu, konzistentne so zvyškom appky.
