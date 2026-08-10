# LexArena — spojená herná dlaždica (protokol od Code, nasadené)

> **Fáza:** zlúčenie hotové a **živé na lexarena.sk** (`faeaeef..9d0b856`, nasadenie overené na produkcii). Nadväzuje na `claude_lexarena-spojena-dlazdica-zadanie.md`.

## Čo sa zmenilo (`9d0b856`)
- **Spojená dlaždica:** `#gamesSection` presunutý **dovnútra** `#quizIntro` ako sekcia (nie karta v karte — zdvojilo by pozadie/tieň), oddelený linkou ako iné vnútorné sekcie (vzor: TOP 3 v `#senatyCard`). `.highlight-games` odstránená (nemala žiadne CSS). Poradie akcií: Spustiť pojednávanie · Kartičky · Prípady · 🏛️ Štátnica · 📊 Môj progres · 🕸️ Štruktúra otázok; Zrušiť a ℹ️ v riadku pod nimi. **Všetky ID zachované** (`#quizCard`, `#quizIntro`, `#quizArea`, `#areasList`, `#startQuizBtn`, `#gamesSection` + 8 tlačidiel) — obsah presúvaný, nie stavaný nanovo.
- **Ľavý stĺpec:** spojená dlaždica → Študijné moduly → Bifľovačka → Judikatúra. `setMoreTraining` a `setModules` zanikli → jedna `#setStudy` („📚 Uč sa"). `#progressCard` a `#spiderCard` zrušené (tlačidlá sú v dlaždici).
- **Judikatúra:** kotví za `#biflovackaCard` (vychádza posledná); fallback zmenený z `#gamesSection` na `#quizCard`.
- **Bottom-nav:** cieľ „🎮 Hry" (viedol na `#gamesSection` = teraz to isté miesto ako dlaždica) nahradený „🧠 Bifľovačka"; `sectionIds` v `mobile-nav.js` zodpovedajúco.

## Otestované (desktop 1280 + mobil 375, obe témy)
Bez oblasti: štart disabled, **Progres aj Štruktúra funkčné** (oblasť nepotrebujú) · po výbere: Pracovné → A35+A36, 10 kartičiek, 4 prípady, štart aktívny · scroll na kvíz (3709→2899) · Judikatúra posledná · filter rebríčka · 5/5 bottom-nav · 6/6 zbaliteľných · mobil poradie 1–5 bez horizontálneho scrollu · tmavý režim OK · konzola čistá.

**Neoverené naživo:** prijatie výzvy z Registra → scroll na kvíz (v DB neboli čakajúce výzvy; ide cez tú istú funkciu `startDuelQuiz` ako overené „Spustiť"). Babu môže potvrdiť výzvou z druhého zariadenia.

## Výšky stĺpcov — vyriešené samo
**Ľavý 1 606 px · pravý 1 516 px — rozdiel ~90 px (6 %).** Zlúčenie ľavý stĺpec výrazne skrátilo (z 2 003 px). Bod „vyrovnanie stĺpcov" netreba riešiť.

## Overené na produkcii
Množiny `setTraining`, `setStudy` (vľavo) · `setRegister`, `setCommunity`, `setService` (vpravo) · `#gamesSection` už nie je karta · `progressCard`/`spiderCard` 0 výskytov · tlačidlá v dlaždici prítomné · bottom-nav `top · quizCard · biflovackaCard · leaderboardSection · profile` · mobilné poradie správne · Judikatúra kotví správne.

## Po nasadení si pozrieť
1. Spojenú dlaždicu **bez vybranej oblasti** (Progres a Štruktúra klikateľné, zvyšok čaká).
2. **Mobil** — šesť tlačidiel sa zalamuje; ak natlačené, dá sa riešiť menšími tlačidlami/mriežkou.
3. **Spodná lišta** — druhá položka je 🧠 Bifľovačka namiesto 🎮 Hry.

## Stále nezačaté
Zvyšok Stopy C: **konsolidácia lišty** (§ chip, energia, 👋+ℹ️ „Pomoc") a **onboarding** (uvítacie okno ako pozvánka + doplniť návod). Čaká na odsúhlasenie Babu.
