# Protokol — Nočný výcuc: presun karty vyššie v paneli #setStudy

**Dátum:** 2026-08-12 · **Vykonal:** Code · **Commit:** `f08bf0c` · **Stav: hotové lokálne, NEPUSHNUTÉ (čaká na slovo)**

## Čo sa presunulo

Blok `#nightRecapCard` v `index.html` z konca panelu `#setStudy` medzi `#tilesSection` (Študijné moduly) a `#biflovackaCard` (Bifľovačka). Jediná ďalšia zmena je aktualizovaný komentár pri karte (pôvodný vysvetľoval, prečo stála na konci). Karta samotná, ekonomika, prehrávač, dev prepínač — nedotknuté. Žiadne nové `order` pravidlá ani zónové divy.

## Judikatúra (dôvod pôvodnej pozície)

`judikatura.js` mountuje `afterend` za `#biflovackaCard` — kotva ostala Bifľovačka, takže Judikatúra sa po načítaní vkladá za ňu, nie za výcuc. Overené po mounte.

## Overenie

- **Desktop:** DOM poradie panelu: `worldStudy → tilesSection → nightRecapCard → biflovackaCard → judikaturaSection` ✅
- **Mobil (375 px):** `.left/.right` v `display:contents`, panely podľa `order` 1–5 (`setStudy` = 2), karty v paneli prirodzeným DOM poradím — rovnaké poradie ako desktop ✅
- **Zbaliteľnosť:** karta má `m-collapsible`, default `m-collapsed` (hlavička viditeľná, telo skryté) ✅
- **Bottom-nav:** ciele `top / quizCard / biflovackaCard / leaderboardSection / profile` nezmenené; filter rebríčka mimo dosahu ✅
- **Konzola/zdroje:** aktuálny load bez chýb (0 zlyhaných z 250 zdrojov) ✅

## Push

Čaká na výslovné slovo Babu.
