# Protokol — Nočný výcuc: občianske hmotné (audio) + odstránenie dev prepínača

**Dátum:** 2026-08-16 · **Vykonal:** Code

## Časť A — Občianske hmotné ✅ (nasadené v `lexarena-audio`)

- Vstup `claude_obcianske-hmotne-nocny-vycuc-skripty-KOMPLET.md`: **40 okruhov**, formát čistý (40× úvod aj záver). Rozrezané do `skripty/obcianske-hmotne/vecny/A1–A40.txt` — texty nedotknuté.
- **Kontrola slugu v karte:** `scripts/nightRecap.js` je zatiaľ **jednooblastný** (`AREA_KEY = 'pracovne'` natvrdo) — pre občianske žiadny slug nemá, appka teda zdroj pravdy neponúka. Použitý slug **`obcianske-hmotne`** presne podľa výstupnej cesty v zadaní; Fáza 2 (pridanie oblasti do karty) ho musí prevziať.
- Generovanie tým istým nastavením ako pracovné (parita hlasov, −15 %, pauzy 700/1200 ms, fade 3,5 s, 64 kbps mono). Trvania ~1:43–2:30, 36 MB.
- **Kontrola 40/40 fade OK** (tri stopy hlásili falošný poplach meracieho okna — A13/A21/A38 končia úplným tichom −91 dB, širšie okno potvrdilo reč v norme a fade v poriadku).
- Nasadené: commit `aed4aaf`, push, **tag `v1` presunutý** (`5b00ec0 → aed4aaf`), purge 40/40, **jsDelivr servíruje 40/40 HTTP 200**; kontrola, že pracovné po presune tagu ďalej beží (A1/A25/A50 = 200). Prehrateľnosť overená v prehliadači (A1 140 s, A2 108 s, hrajú).
- ⚠️ **V karte sa občianske zatiaľ neprehrá** — karta oblasť nepozná (single-area). Audio je pripravené; sprístupnenie = Fáza 2 zmena v appke (výber oblasti na karte), samostatné zadanie.

## Časť B — Občianske procesné ⛔ (nezačaté, podľa zadania)

`claude_obcianske-procesne-nocny-vycuc-skripty-KOMPLET.md` v Downloads **neexistuje** — negenerovalo sa nič, čaká sa na KOMPLET súbor.

## Časť C — Dev prepínač `nightRecapDevUnlock` odstránený ✅ (commit `4a7d402`, NEPUSHNUTÉ)

- Odstránená celá vetva (`devUnlocked()`, obídenie `isUnlocked`, „DEV režim" v labeli) — odomknutie ide výhradne cez `econSpend` + TTL. Prepínače zdroja zvuku (`nightRecapAudioBase/Ext`) ostávajú — platbu neobchádzajú, slúžia len na lokálny test zvuku.
- Overené v prehliadači: nastavený dev flag sa ignoruje (karta zamknutá), ukážka 30 s zdarma funguje (ťahá reálne A1.mp3 z `@v1`), odomknutie vyžaduje prihlásenie/platbu, konzola čistá (0 zlyhaných z 250 zdrojov).
- **STOP pred pushom — push commitu `4a7d402` (+ tento protokol) na slovo Babu.**
