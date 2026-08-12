# Protokol — Nočný výcuc, Fáza 1A: karta + ekonomika + prehrávač

**Dátum:** 2026-08-12 · **Vykonal:** Code · **Commit:** `0f0efc0` · **Stav: hotové lokálne, NEPUSHNUTÉ (čaká na slovo)**

## Rozsah

MVP appkovej časti pre pilotnú oblasť **pracovné právo (A1–A50)** podľa zadania Fázy 1. TTS pipeline (1B) a reálne nahrávky nie sú súčasťou — karta je na ne pripravená (doplnenie MP3 = nahranie súborov do `lexarena-audio` + tag, bez zásahu do kódu).

## Čo pribudlo / zmenilo sa

| Súbor | Zmena |
|---|---|
| `scripts/nightRecap.js` | **nový modul** (~420 r.): stav odomknutia, výber okruhov, prehrávač, ukážka |
| `index.html` | karta `#nightRecapCard` na konci `#setStudy` + script tag modulu |
| `styles.css` | blok `.highlight-nightrecap` + `.nr-*` (len vnútro karty, cez existujúce premenné — tmavý režim automaticky) |
| `scripts/economyConfig.js` | `SINKS.NIGHT_RECAP_UNLOCK: 33` |
| `mobile-nav.js` | `COLLAPSIBLE_SECTIONS` + `.highlight-nightrecap` (key `nightrecap`, default zbalené) |
| `init.js` | `fillStaticEconomyValues()` navyše vyplní `data-econ` na karte (mimo `#gamesSection` sa samo nevyplní) |

## Kľúčové vlastnosti

- **Odomknutie:** `econSpend(nick, 33, …)` → `users/{nick}/nightRecap/pracovne = Date.now()`, TTL 24 h, `localStorage` cache pre okamžitý render, DB je pravda (vzor videoRewards). Nová podvetva — **bez zmeny DB pravidiel**. Pri nedostatku § jemná hláška so zostatkom, žiadny tvrdý blok.
- **Výber okruhov:** checkboxy A1–A50 (názvy fetchom z `A{n}.json`, relatívna cesta → funguje lokálne aj v prode; sessionStorage cache), „Vybrať všetkých 50" / „Vyčistiť", výber sa pamätá (`localStorage`). Vlastný výber — `__selectedOkruhPair` nedotknuté.
- **Prehrávač:** reťazenie cez `ended` (overené vo Fáze 0 na iOS pri zamknutej obrazovke), Media Session (titul = názov okruhu), časovač spánku 15/30/60/„celé" cez deadline v `timeupdate` (nie `setTimeout`), slučka, preskok nedostupnej nahrávky s poistkou proti nekonečnej slučke chýb, JS fade len tam, kde `volume` funguje (iOS ho dostane zapečený v MP3 — 1B).
- **Ukážka zdarma:** 30 s z okruhu 1 pred odomknutím.
- **Audio zdroj:** `cdn.jsdelivr.net/gh/<owner>/lexarena-audio@v1/pracovne/vecny/A{n}.mp3` — verzia = git tag. Lokálny test bez zásahu do kódu cez `localStorage`: `nightRecapAudioBase`, `nightRecapAudioExt`, `nightRecapDevUnlock`.

## Overenie (lokálne, statický server + prehliadač)

- Karta: posledná v `#setStudy`, `h3` prvý potomok, `m-collapsible` aktívne, cena „33" doplnená cez `data-econ`. Konzola čistá.
- Odomknutý stav (dev prepínač): 50 checkboxov so skutočnými názvami okruhov.
- Reťazenie na testovacích stopách: A1→A2→A3 s ~100 ms medzerou; zámerne chýbajúca A4 → `error` → čisté zastavenie (posledná v playliste), pri strednej pozícii preskok na ďalšiu.
- Slučka: koniec → znova od prvej. Časovač: chip aktívny, odpočet „💤 14:59" v stavovom riadku.
- Zamknutý stav: klik bez nicku → výzva na prihlásenie; ukážka hrá a končí.
- Platba `econSpend` naostro netestovaná (nešlo sa testovacím nickom do produkčnej Firebase) — cesta je identická so shield/kŕmením, otestuje Babu prvým odomknutím.

## Na vedomie pre Babu

1. `nightRecapDevUnlock` je vývojový prepínač v kóde — kto si ho nastaví, vidí odomknuté UI bez platby. V appke bez auth je celá ekonomika client-side (a MP3 na jsDelivr sú tak či tak verejné), takže je to konzistentné s existujúcim modelom — ale ak vadí, pred ostrým spustením ho viem vyhodiť.
2. Testovacie WAV súbory (`night-test-audio/`) sú netracknuté, do gitu nejdú.
3. Do `lexarena-audio` repa treba pri 1B dodržať štruktúru `pracovne/vecny/A{n}.mp3` a tag `v1` — URL je v kóde ako default.

## Ďalší krok

Fáza 1B (Azure TTS pipeline) — čaká na Azure kľúč + Node. Potom skúšobné 1–2 okruhy naostro.
