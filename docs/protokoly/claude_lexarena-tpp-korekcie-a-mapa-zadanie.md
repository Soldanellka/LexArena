# LexArena — TPP: doplnenie overených §§ (A9, A27) + mapa klastrov (zadanie pre Code)

> **Kontext:** Babu garantsky overila sporné §§ (oprava_2.txt). Kľúčový nález: **§ 89 TP = predvedenie** (správne); „vydanie veci" je po novele 2026 **§ 89a**. A27 má overený kompletný zoznam §§. A19 summary opravené (zdroj 301/2005 + podmienečné zastavenie) — Babu ho uloží v appke. Pravidlá platia (commit + protokol, push na Babu, `isValidSpider()`).

## 1. A9 — doplniť § 89 k predvedeniu
Vetva „Predvedenie" → label `"Predvedenie (§ 89)"`. Over, že vetva „Zaistenie…" v centre/jadre zodpovedá summary (jadro teraz menuje aj zistenie totožnosti — pavúk ho už má).
⚠️ Zároveň over **A10**: jeho vetva „Vydanie a odňatie (§§ 89, 91)" — vydanie veci je po novele **§ 89a**? Babu píše „A10 používa § 89 správne"… tu je zdanlivý rozpor (89 = predvedenie aj vydanie?). **Over v aktuálnom znení TP na Slov-Lexe a nahlás, čo tam reálne je** — podľa toho uprav A10 label (§ 89a?) alebo nechaj. Nehádaj.

## 2. A27 — doplniť overené §§ do labelov
Samosudca (§§ 314a–314c) · Dohoda o vine a treste (§§ 232–233a) · Mladiství (§§ 345–363) · Právnické osoby (§§ 363a–363h) · Ušlý (§§ 358–364) · Chránený svedok (§§ 136a–136d) · EZR (§§ 403–420) · Uznanie cudzieho rozhodnutia (§§ 521–528).
Poznámka Babu potvrdila podľa Slov-Lexu; pri vkladaní si všimni prekrytia rozsahov (345–363 × 358–364 × § 363 ako mimoriadny prostriedok GP) — ak by aktuálne znenie hovorilo inak, nahlás pred zápisom.

## 3. TPP mapa klastrov — navrhni a priprav na odsúhlasenie
Vypíš **názvy TPP A3, A4, A5, A8** a navrhni `_map.json` pre 30 okruhov podľa vzoru TPH (id kebab-case, label bez emoji, okruhy čísla, links nesmerované). Kostra od Claude (doplň/uprav podľa reálnych názvov A3–A5, A8):
```
zasady-a-subjekty      · Zásady a subjekty konania      · [1, 2, + A3–A8 podľa tém]
zaistenie              · Zaistenie osôb a vecí          · [9, 10]
dokazovanie            · Dokazovanie                    · [11, 12, 13, 14, 15]
rozhodnutia-a-stadia   · Rozhodnutia a štádiá           · [16, 17]
predsudne-konanie      · Predsúdne konanie              · [18, 19, 20]
konanie-pred-sudom     · Konanie pred súdom             · [21, 22, 23, 24]
opravne-prostriedky    · Opravné prostriedky            · [25, 26]
osobitne-a-restorativa · Osobitné konania a restoratíva · [27, 28]
cudzina-a-eu           · Cudzina a EÚ                   · [29, 30]
```
Návrh prepojení (uprav): 9–11 (zásahy do práv pod súdnou kontrolou) · 13–14, 13–15 (dôkazné prostriedky) · 17–18, 19–21 (nadväznosť štádií) · 22–23 (pojednávanie a jeho výstup) · 25–26 (riadne × mimoriadne) · 27–28 · 29–30 · 1–13 (zásady dokazovania) · 20–19 (prokurátor rozhoduje).
**Mapu NEnasadzuj bez odsúhlasenia Babu** — vráť návrh v protokole; po jej „ok" nasadíš (a hry sa pri TPP začnú ponúkať).

## 4. Pripomienky stavu
- Babu ukladá TPP A9–A30 summary do appky (vrátane opravených A9/A19/A27) → potom `CRIMINAL_PROCESNE_COUNT` dvíhaj podľa súvislého pokrytia (cieľ 30).
- **Sync env** zadanie stále čaká (`claude_lexarena-sync-env-zadanie.md`) — ~120 overridov bez zálohy.

## Protokol
Commit + `súbor:riadok` · A9/A10 nález k § 89/89a · A27 §§ · názvy A3–A5, A8 · návrh mapy (na odsúhlasenie) · regresie · otvorené.
