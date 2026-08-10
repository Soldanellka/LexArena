# LexArena — Trestné v Štátnicovej sieni: cesta A hybridne (protokol od Code)

> **Fáza:** commit `0cd270d`, lokálny — push na Babu. Nadväzuje na rozhodnutie „cesta A hybridne" (`claude_lexarena-protokol-statnica-overridy-regex.md`).

## Implementácia
`statnice.js:64` konštanty · `:99` register · `:455` doplnenie témy · `index.html:399`, `:716` texty

- **AREA_CONFIG:** „Trestné právo" ako **dual-pool** (ako Občianske), ale s countmi podľa reálneho obsahu: **hmotné 13** (toľko okruhov má zhrnutie; A14–A30 majú len krátke `theory` → núdzové vety) · **procesné 0** (žiadne zhrnutia, súbory len quiz/tiles/cases).
- **`buildTopicsFromSharedSelection`** doberie druhú tému z bazénov tej istej oblasti, keď ju zo zdieľanej dvojice nedostane. Dnes: Trestné = dve hmotné témy. **Keď TPP dostane zhrnutia, stačí zdvihnúť count z 0 na 30** a dvojica sa sama vráti na hmotné+procesné — bez zásahu do kódu. (Cesta A dnes, cesta B automaticky.)

## Chyba odhalená testovaním — opravená pravidlom
Prvá verzia dopĺňala len ak sa aspoň jedna téma načítala; Aréna však vie dať hmotný okruh **A22 (mimo skúškového rozsahu A1–A13)** → nič sa nenačítalo → strhnutie a refund 15 §, ktorému sa malo predísť. Oprava rozlíšením príčiny:
- **chýbajúci skúškový obsah** (neznámy bazén, count 0, okruh mimo rozsahu) → doplní sa náhradná téma;
- **zlyhaný fetch platného okruhu** (sieť, rozbitý JSON) → `[]` a refund ako doteraz.

## Testy (izolovane, bez econSpend, bez zápisu do produkcie)
| Scenár | Výsledok |
|---|---|
| Trestné: hmotné A6 + procesné A3 | A6 (6 bodov, 2339 zn.) + doplnené A7 (4 body, 2267 zn.) ✅ |
| Trestné: hmotné A22 (mimo rozsahu) | A7 + A8 doplnené, žiadny refund ✅ |
| Trestné: A13 (hranica rozsahu) | A13 ostane + A6 doplnené ✅ |
| Regresia Pracovné A1+A2 | presne A1+A2, po 7 bodov ✅ |
| Regresia Občianske A9+A2 | popisky Hmotné/Procesné zachované ✅ |
| Simulovaný 404 na platnom okruhu | `[]` → refund ✅ |

Témy pri Trestnom nesú popisok „Hmotné právo" a čerpajú z Firebase zhrnutí Babu (2000–2700 zn.), nie z krátkeho `theory`. Ekonomika siene nedotknutá (15 § vstup, econSpend pred témami, refund funguje). Návod aj odstavec pod mriežkou vysvetľujú, že Trestné sa zatiaľ skúša z dvoch hmotných okruhov. Konzola čistá.

## Otvorené
- Kým nepribudnú zhrnutia TPP, sľub „rovnaká dvojica ako pojednávanie" platí pri Trestnom len sčasti (v návode uvedené).
- Hmotné A14–A30 mimo skúšky — po doplnení zhrnutí **zdvihnúť `CRIMINAL_HMOTNE_COUNT`** (s dávkou A14–A17 → 17).
- Staršie: právna kontrola pavúkov · bod 1 v A10 summary · prvé spustenie syncu.
- **Push na Babu.** Export dávky A14–A17 zadaný (číta sa z Firebase, committed flagy nedotknuté).
