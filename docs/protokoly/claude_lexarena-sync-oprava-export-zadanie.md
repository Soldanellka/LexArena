# LexArena — oprava syncu + export TPH textov (zadanie pre Code)

> Nadväzuje na nález z `claude_lexarena-protokol-pecate-vyzva-pipeline.md`. Dve úlohy — oprava chyby pred prvým spustením syncu a export textov na štátnicové podklady.

## 1. Opraviť sync PRED prvým spustením
Serverová `applyOverrides` (`api/sync-content.js:139`) rieši len `summary`, `quiz_*`, `case_*`, ale po commite označí za `committed` **všetky** casty okruhu — takže `spider` a `tile_*` overridy (dnes 4 od Lulu: ob_hmotne/A9, ob_procesne/A2, pracovné/A1, A2) by sa **označili za vybavené bez zapísania** a navždy stratili zo syncu.

Oprav jedným z dvoch spôsobov (vyber bezpečnejší podľa kódu, popíš v protokole):
- **(a)** doplniť do serverovej `applyOverrides` podporu `spider` a `tile_*` (paritne s klientskou verziou), alebo
- **(b)** označovať `committed: true` **len casty, ktoré sync reálne zapísal** — nepokryté nechať `false`.
Ideálne oboje: (b) ako poistka + (a) ak je zápis spider/tile_* do JSON priamočiary. Nič nesynchronizovať — len opraviť kód; spustenie syncu je na Babu (globálny beh, ~106 overridov, s náhľadom).

## 2. Export textov TPH A1–A13 z Firebase (len čítanie)
Vytiahni `contentOverrides/tph/{A1..A13}/summary/novyObsah/summary` a vráť **ako čistý text v odpovedi** (A1 … A13, každý s hlavičkou okruhu). Nič nemeniť, žiadne `committed` flagy nedotýkať. Texty pôjdu na výrobu štátnicových podkladov a pavúka.

## Protokol
Commit + správa · čo presne oprava robí a prečo je bezpečná pre existujúce overridy · potvrdenie, že sa nič nesynchronizovalo · exportované texty A1–A13.
