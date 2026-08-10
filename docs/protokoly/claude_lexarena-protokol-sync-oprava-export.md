# LexArena — oprava syncu + export TPH (protokol od Code)

> **Fáza:** sync opravený (`459583b`, lokálne spolu s `0105f62`, `5758af9` — push na Babu). Texty A1–A13 exportované z Firebase (len čítanie). **Nič sa nesynchronizovalo** — všetkých 106 overridov stále `committed: false`.

## Oprava syncu · `459583b` (oba spôsoby)
- **(a) Parita s klientom** (`api/sync-content.js:160`): `spider` → `json.spider = {center, branches[]}` (presne pole, ktoré čítajú spider moduly; zapíše sa aj do okruhu bez existujúceho spidera) · `tile_*` → per-index merge do `json.tiles` (vzor `quiz_*`). Prenesená `isValidSpider()` — nevalidný override sa neaplikuje.
- **(b) Poistka:** `applyOverrides` vracia `{result, applied}` a značkuje sa **len to, čo sa reálne zapísalo**; nesadnuté/nepoznané casty ostávajú `committed: false` a objavia sa v ďalšom náhľade. Okruh bez zmien sa preskočí (žiadny prázdny commit).
- `_seal` sa do súborov nepíše (zobrazovacia meta z Firebase). Zápis do Firebase ostáva len `markOverrideCommitted` (PATCH) — nič sa nemaže; zmena môže značkovanie len zúžiť.
- **Testy (dry run, zero writes):** syntetický okruh 7 castov ✅ · `quiz_99` mimo poľa ostane false ✅ · nevalidný spider sa nezapíše ✅ · 4 reálne spider overridy proti repu — všetky by sa zapísali čisto ✅.
- Náhľad odteraz ukazuje **hornú hranicu** (nevie dopredu, ktorý cast sadne); odpoveď vracia `overridesBaked` + `skipped`.

## Export TPH A1–A13
Prečítané z `contentOverrides/tph/{A}/summary/novyObsah/summary` (len `get()`), všetkých 13 existuje. Texty odovzdané na výrobu štátnicových podkladov a pavúka.
Poznámky Code k textom (nemenila): **A10 začína bodom 2** (bod 1 chýba) · **A8, A10, A12, A13 majú v zdrojoch zlepené útržky webových citácií** — pri výrobe podkladov učesať.

## Stav
Sync je bezpečný na prvé spustenie (globálny beh ~106 overridov, s náhľadom) — **spustenie na Babu.** Push troch commitov na Babu.
