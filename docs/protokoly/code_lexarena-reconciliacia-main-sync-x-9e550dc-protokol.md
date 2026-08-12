# Protokol — reconciliácia main: sync 11. 8. × `9e550dc` (ob. hmotné)

**Dátum:** 2026-08-12 · **Vykonal:** Code · **Stav: HOTOVÉ, pushnuté** (`dbc94aa..2a8b5b8`)

## Východisko

- **origin/main** nieslo 2 commity `LexArena obsah sync 2026-08-11` (`00c2bb7`, `dbc94aa`) — Babu aktualizovala *summary* z Firebase (156 súborov: pracovné, obč. procesné aj hmotné, EU, trestné procesné).
- **Lokálny main** mal nepushnutý `9e550dc` — oživenie *pavúkov a kvízov* zvyšných 18 okruhov obč. hmotného.
- Prekryv: **25 súborov** `ob-pravo-app/data/hmotne/A*.json`. Merge-base `8ece61d`.

## Poistky (ostávajú, nemazať)

| Bod | Ref |
|---|---|
| tag `pre-reconcile-origin` | `dbc94aa` (origin so syncom) |
| tag `pre-reconcile-local` + vetva `keep/9e550dc` | `9e550dc` (lokálny fix) |

## Diff po kľúčoch (Krok 2)

22/25 súborov čisto oddeliteľných: sync menil len `summary`, fix len `spider/quiz/tiles/cases`. Sporné boli tri:

- **A12, A38** — obe strany menili `summary`, znenia rôzne → **rozhodnutie Babu: summary zo syncu** (audit, bohatšie §§, správna terminológia).
- **A23** — sync okrem summary drobne menil aj `quiz/spider/tiles` (odstránenie chybnej citácie „§ 431" pri zvierati) → **vrstvy z fixu**, ktorý tú istú chybu opravuje dôkladnejšie (zvieratá podľa § 420 s prezumovaným zavinením; § 431 OZ = stret prevádzok). Summary A23 menil len sync → zo syncu.

## Zlúčenie (Krok 3) — commit `1ff0c7c`

Pravidlo pre všetkých 25 súborov: **`summary` zo syncu + `spider/quiz/tiles/cases` z `9e550dc`**. Technicky: verzia súboru z `9e550dc` so summary riadkom z origin/main (overené, že sync menil práve tento jeden riadok; top-level `"summary"` je v súbore práve raz). Jeden čistý commit nad `dbc94aa`, žiadny rewrite histórie, žiadny force-push.

**Validácia:** 25/25 kľúč po kľúči proti obom zdrojom (`summary` ≡ origin; `spider/quiz/tiles/cases` ≡ `9e550dc`; ostatné kľúče nezmenené). Main sa od origin/main líšil presne v 25 súboroch. 131 sync-only súborov prevzatých bez dotyku; z `9e550dc` sa nestratilo nič.

## Overenie (Krok 4)

- Konzistencia vrstiev A12/A23/A38: summary ↔ kvíz/pavúk sa nerozchádzajú (A23 učí zvieratá jednotne cez § 420).
- Appka spustená lokálne (statický server, port 8123): načíta sa, konzola bez chýb, všetkých 25 JSON-ov fetch + parse v behu appky OK (A12: 5 otázok/5 vetiev, A23: 5/7, A38: 5/8).

## Dodatočná oprava — commit `2a8b5b8`

A38 `quiz/tiles/cases` používali 7× český termín „schovateľ" → zamenené na **„uschovávateľ"** (terminológia OZ § 747, súlad s audítovaným summary). Čisto textová zámena, JSON validované.

## Push

Na slovo Babu: `git push origin main` → `dbc94aa..2a8b5b8` (fast-forward). Vercel nasadí automaticky.

## Poznámky

- Test vetva `test/nocny-vycuc-audio` (Fáza 0 Nočného výcucu) sa reconciliácie netýka a ostáva nemergnutá.
- Pre budúcnosť: sync z admin panela a práca Code v druhom čete sa nesmú križovať na tých istých súboroch — tentoraz to stálo celú reconciliáciu.
