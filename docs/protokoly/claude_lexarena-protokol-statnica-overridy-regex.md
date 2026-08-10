# LexArena — Štátnica: overridy + regex hotové, TPH zablokované (protokol od Code)

> **Fáza:** commit `738ef23` (body 1+2), pushnuté na pokyn Babu. Bod 3 (TPH v sieni) **zablokovaný nálezom** — rozhodnuté: cesta A s hybridnou poistkou. Nadväzuje na `claude_lexarena-statnica-overridy-tph-zadanie.md`.

## 1. Sieň číta Firebase overridy · `statnice.js:359`
`fetchOkruh` prepúšťa `A*.json` cez `applyOverridesForOkruh` — tá istá klientská cesta ako `data.js` a `memoryDefinitions.js`. Mapovanie `basePath → oblasť` odvodené z `AREA_CONFIG` (nová oblasť nevyžaduje ďalšiu tabuľku). Fallback bez vlastnej vetvy — pri chýbajúcom override/Firebase sa vracia pôvodný json. Overené: Pracovné A1/A2 override áno, A5 tichý fallback. Výkon: 2 čítania navyše, súbežne pri štarte, nie počas odpovedania.

## 2. Regex kľúčových bodov · `statnice.js:321`
Druhý vzor pre „Zapamätaj si (štátnicové jadro)" (bez dvojbodky, sekcia končí pri „Zdroj" — nešlo rozšírením prvého vzoru). Pôvodný vzor sa skúša prvý → existujúce oblasti bez zmeny. Strhávajú sa aj en/em-pomlčkové odrážky. Texty Babu nemenené.
**Extrakcia na reálnych TPH summary — skutočné body:** A1 (4), A6 (6), A11 (4) — napr. „Formy zavinenia: úmysel priamy × nepriamy, nedbanlivosť vedomá × nevedomá". Regresia Pracovného: A1/A5/A20 po 7 bodov cez pôvodnú vetvu.

## 3. TPH v sieni — zablokované (nález)
- Aréna nemá chip „TPH" — len **„Trestné právo" = dual**: 1 okruh hmotné + 1 procesné (`duels.js:101`).
- **Trestné právo procesné nemá žiadny text**: A1/A2/A15 bez `summary`/`theory` (0 znakov), vo Firebase pre `tpp` ani jeden override. Možnosť (b) „starý obsah" teda neexistuje.
- Bez zásahu: `fetchOkruh` → null → `topics.length < 2` → **strhne 15 § → vráti → „Komisia nie je dostupná"** pri každom pokuse (econSpend beží pred zostavením tém, `statnice.js:1235`).
- Možnosť (a) nie je len allow-list — z dvojice je hmotný len jeden a skúška chce dva. Cesty:

| | Ako | Cena |
|---|---|---|
| **A** | Z dvojice brať hmotný okruh, druhú tému dobrať z bazéna TPH (A1–A13) | zmena `buildTopicsFromSharedSelection`; skúška pri Trestnom nekopíruje presne dvojicu |
| **B** | Počkať na zhrnutia TPP a flipnúť ako dual-pool | žiadny kód, ale ~30 okruhov TPP obsahu |

## Rozhodnutie Babu (zaznamenané)
**Cesta A s hybridnou poistkou:** logiku napísať všeobecne — „ak okruh z dvojice nemá obsah, dober tému z bazéna oblasti, ktorá obsah má". Sieň funguje pre Trestné hneď (z TPH); keď TPP časom dostane zhrnutia, dual sa **sám** vráti k pravej dvojici bez ďalšej zmeny kódu.

## A14 (nové od Babu)
Babu upravila v appke **A14 (TPH)**. Code: exportuj `contentOverrides/tph/A14/summary` (len čítanie, ako A1–A13) a odovzdaj text — Claude vyrobí pavúka + štátnicový podklad. Zároveň over, či `A14.json` v repe existuje (kvíz/tiles), a priprav miesto pre pavúka + zaradenie A14 do klastra mapy (podľa témy okruhu).
