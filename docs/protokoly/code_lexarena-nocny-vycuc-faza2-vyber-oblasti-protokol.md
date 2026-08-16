# Protokol — Nočný výcuc, Fáza 2: výber oblasti na karte

**Dátum:** 2026-08-16 · **Vykonal:** Code · **Commit:** `e1d9836` · **Stav: hotové lokálne, NEPUSHNUTÉ (čaká na slovo)**

## Čo sa zmenilo (len `scripts/nightRecap.js`)

- **`AREAS` konfigurácia — jediné miesto pravdy:** slug, zobrazovaný názov, počet okruhov, dataPath pre titulky. Položky: `pracovne` (50) · `obcianske-hmotne` (40) · `obcianske-procesne` (45). Nová oblasť (európske, trestné…) = jedna položka, keď bude mať audio na CDN. Natvrdo `AREA_KEY`/`OKRUH_COUNT` zmizli.
- **Prepínač oblasti** hore na karte (segmentové čipy, vzor `.nr-chip` — žiadne nové CSS). Default = posledná zvolená (`localStorage`), inak Pracovné. Prepnutie zastaví bežiaci prúd (okruhy dvoch oblastí sa nemiešajú), prekreslí stav odomknutia, zoznam okruhov aj cieľ prehrávača.
- **Odomknutia per oblasť:** `users/{nick}/nightRecap/{slug}` + cache `nightRecapUnlock:{slug}` + výber `nightRecapSel:{slug}` — všetko kľúčované slugom, oblasti na sebe nezávislé, 33 § / 24 h každá zvlášť. Ukážka 30 s hrá A1 zvolenej oblasti.
- **Prehrávač:** URL `…/{slug}/vecny/A{n}.mp3`; `playSlug` drží slug bežiaceho prúdu počas reťazenia. Reťazenie, časovač, slučka, Media Session (album = názov oblasti), fade — bez zmeny.
- **Oprava latentnej chyby z 1A:** `loadUnlock` číta cache synchrónne PRED renderom (v inite aj pri prepnutí). Predtým mohol render ukázať stav predošlej oblasti, resp. po reloade zamknutú kartu napriek platnému odomknutiu (ak DB súhlasila s cache, nič neprekreslilo).

Index.html, CSS, ekonomika, mobile-nav — nedotknuté (karta ostáva pod Študijnými modulmi, pred Bifľovačkou, zbaliteľná).

## Overenie (lokálny server, desktop + mobil 375 px)

- 3 čipy oblastí, default Pracovné; texty tlačidiel per oblasť („Odomkni Občianske hmotné na 24 h za 33 §").
- Počty okruhov: **50 / 40 / 45**, „Vybrať všetkých N" podľa oblasti, titulky sa čítajú zo správnych `A{n}.json` priečinkov.
- **Nezávislé odomknutia:** odomknutá len jedna oblasť → ostatné dve ostávajú zamknuté; návrat na odomknutú ju ukáže odomknutú.
- **Prehrávanie naostro z jsDelivr@v1:** hmotné A1 → next → A2 (správny slug, hrá), Media Session album „Občianske hmotné"; pracovné bez regresie (50 okruhov, `pracovne/vecny/A1.mp3` hrá). Ukážka hmotného ťahá `obcianske-hmotne/vecny/A1.mp3`.
- Mobil: karta `m-collapsible` + default zbalená, poradie panelu Moduly → Výcuc → Bifľovačka → Judikatúra, bottom-nav 5 cieľov nedotknutých, 0 zlyhaných zdrojov, konzola čistá.

## Push

Čaká na výslovné slovo Babu. (Protokol o občianskom procesnom bol pushnutý v `94c591e` na predošlé slovo.)
