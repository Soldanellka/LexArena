# LexArena — pečate 1/10/25, Vyzvi spolužiaka, content pipeline (protokol od Code)

> **Fáza:** body 1 a 2 hotové (commity `0105f62`, `5758af9`, lokálne — push na Babu). Bod 3 zmapovaný — **sync nikdy nebežal** a má **chybu, ktorú treba opraviť pred prvým spustením**.

## 1. Pečate 1 / 10 / 25 · `0105f62`
- Prahy boli zadrôtované na 2 miestach (logika v `index.html`, tabuľka v návode) → presunuté do **`scripts/seals.js` ako jediný zdroj**; návod sa vypĺňa za behu cez `data-seal` (vzor `data-econ`).
- 🥉 1 (bez zmeny) · 🥈 5 → **10** · 🥇 15 → **25**. Spätne sa nič neprepočítava (`getSealType()` beží len pri schválení); udelené pečate vo Firebase nedotknuté.
- Bifľovačkine bronze/silver/gold podľa presnosti — iná sada, nedotknutá.
- Bonus: veta v návode „odôvodnenie vidí celá komunita" opravená (po neviditeľnom adminovi už neplatí bezvýhradne).

## 2. ⚔️ Vyzvi spolužiaka + trio · `5758af9`
- `#challengeFriendBtn` spúšťa to isté pojednávanie ako `#startQuizBtn` + príznak, ktorý **po dohraní sám otvorí zdieľanie**. Kľúčové zistenie: výzva vznikala pri každom pojednávaní aj doteraz (`saveDuel`) — mení sa len UI po hre, nie mechanika/ekonomika.
- Zdieľanie vytiahnuté do exportovanej **`shareDuelInvite()`** — register aj auto-share používajú jeden kód. Príznak sa nuluje aj pri `cancelQuiz` a tichom odmietnutí — neprepadne do ďalšej hry. Spiaci avatar blokuje obe duelové tlačidlá.
- **Trio zvýraznené** (Pojednávanie · Vyzvi · Štátnica) cez generickú `.game-cta-btn`; `.statnice-cta-btn` ostáva ako hook.
- Testy: 7 položiek v mriežke, disabled bez oblasti, link `?duel=TEST-ID-123` vytvorený **bez zápisu do produkcie**, mobil 4 riadky OK, obe témy, konzola čistá. Jediný neodskúšaný skok naživo: `saveDuel → shareDuelInvite` (vyžadoval by reálny záznam).

## 3. Content pipeline — zmapované; SYNC NIKDY NEBEŽAL
- **Úpravy Babu žijú len vo Firebase:** `contentOverrides/tph/{okruh}/summary` (autor Babu, 4. 8. 2026, 1 485–2 684 znakov, všetkých 13 `committed: false`). V appke sa navrstvujú nad JSON pri načítaní.
- **GitHub sync existuje** (`api/sync-content.js` → zapečie do `Trestné právo hmotné/data/A*.json`, pole `summary`), spúšťa sa len ručne z admin panelu — **zatiaľ ani raz nebežal** (žiadny commit, repo má len staré krátke `theory[]`).
- **Ako vytiahnuť texty A1–A13:** (a) spustiť sync a čítať z repa, alebo (b) **priamo z Firebase export** `contentOverrides/tph/{A1..A13}/summary/novyObsah/summary` — rýchlejšie, nič sa nemení.

### ⚠️ Chyba na opravu PRED prvým syncom
Sync je **globálny** (zapečie naraz všetkých ~106 overridov: TPH 13, ob_hmotne 40, ob_procesne 45, pracovné 2) a **nepokrýva `spider` ani `tile_*`** — serverová `applyOverrides` rieši len `summary`, `quiz_*`, `case_*` — ale po commite označí za `committed` **všetky** casty okruhu. Dôsledok: **4 existujúce spider overridy (autor Lulu) by sa označili za vybavené bez zapísania a už by sa nikdy nesynchronizovali.** TPH summary sa to netýka, ale opraviť treba pred spustením syncu. (Mimo zadania — Code neriešila.)
- Vedľajší efekt syncu: `theory[]` v súboroch ostane ako neaktuálny duplikát (appka správne preferuje `summary`).

## Na rozhodnutie / ďalej
1. Push `0105f62` + `5758af9`.
2. Opraviť sync (spider/tile_*) pred prvým spustením — samostatné zadanie.
3. Texty A1–A13 na podklady vytiahnuť cestou (b) z Firebase — netreba čakať na sync.
