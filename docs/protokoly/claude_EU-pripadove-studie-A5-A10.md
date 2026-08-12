# Európske právo — prípadové štúdie: opravy A5–A7, nové A8–A10

**Fáza:** nasadené, commit lokálny · Podľa schémy `cases[]` z A5.json

## Časť A — opravy

| okruh | čo sa zmenilo |
|---|---|
| **A5, Prípad 1** | Celý objekt nahradený. `C‑409/13` prestal vystupovať ako „Parlament v. Rada" — je to **Rada v Komisia** (stiahnutie návrhu Komisiou). Prepísaný scenár aj otázka, `source` v oboch krokoch. ECLI `2015:217` ostáva správne, root `zdroj.citation` A5 bez zmeny |
| **A6, Prípad 2** | Gauweiler von, **Pringle** dnu — zjednodušená revízia čl. 136 ZFEÚ podľa čl. 48 ods. 6 ZEÚ. Prípad 1 ponechaný |
| **A6, root citácia** | `ECLI:EU:C:2015:400` (Gauweiler) odstránené → ostáva `ECLI:EU:C:2012:756; čl. 15 ZEÚ` |
| **A7, Prípad 1** | `C‑424/99` von. Nový prípad na **čl. 258 ZFEÚ** — netransponovaná smernica a postup Komisie (výzva → odôvodnené stanovisko → žaloba, pri nesplnení rozsudku čl. 260). `source` je článok, nie judikát |
| **A7, Prípad 2** | Len parentéza v `source` v oboch krokoch: `(C‑427/12 Komisia v. Belgicko)` → **`(C‑427/12 Komisia v Parlament a Rada)`** |
| **A7, root citácia** | `ECLI:EU:C:2001:134` odstránené, doplnené `čl. 258 ZFEÚ` → `ECLI:EU:C:2014:231; čl. 17 ZEÚ; čl. 244 – 250 ZFEÚ; čl. 258 ZFEÚ` |

## Časť B — nové prípady

| okruh | prípady | zdroje v krokoch |
|---|---|---|
| **A8** Rada EÚ | 2 — stiahnutie návrhu (C‑409/13), voľba právneho základu (C‑81/13) | `ECLI:EU:C:2015:217`, `ECLI:EU:C:2014:2449` |
| **A9** Dvor audítorov, ECB, orgány | 3 — OLAF a nezávislosť ECB (C‑11/00), OMT (Gauweiler), ESMA a Meroni (C‑270/12) | `C‑11/00`, `ECLI:EU:C:2015:400`, `C‑270/12` |
| **A10** Postupy prijímania aktov | 3 — stiahnutie návrhu (C‑409/13), hranice vykonávacích aktov (C‑65/13 EURES), SZBP bez legislatívneho postupu (čl. 24 ZEÚ) | `ECLI:EU:C:2015:217`, `C‑65/13`, `čl. 24 ZEÚ` |

Root citácie prepísané podľa zadania. **A8** dostal `ECLI:EU:C:2014:2449` namiesto pôvodného `ECLI:EU:C:2014:244` — to bol iný, nesúvisiaci ECLI pri tom istom čísle veci C‑81/13. V **A9** odišli `ECLI:EU:C:2003:479` a `ECLI:EU:C:2014:18`, v **A10** `ECLI:EU:C:2015:742` a `ECLI:EU:C:2014:18`; `ECLI:EU:C:2014:18` bol v oboch okruhoch pripísaný veci C‑270/12, ktorá s A10 nemá nič spoločné.

## Overenie

Prešiel som **všetkých 38 okruhov EÚ** proti schéme, nielen dotknuté:

- počty prípadov sedia s konvenciou — **2 pri A1–A8, 3 pri A9–A38**
- každý prípad má `title`, aspoň jeden krok a aspoň jednu otázku
- každý krok má `question` aj `source`
- pri otázkových krokoch je `correct` **v rozsahu `options`** a `explanation` je **objekt `{correct, wrong}`**, nie string
- scenárové kroky (`options: []`) majú `correct` ako číslo
- **žiadna chyba naprieč všetkými 38 okruhmi**

Živý render cez `loadCasesFromJson()` overený na A9 a A10: počítadlo „Prípad 1 / 3", nadpis, scenár aj otázka sa vykreslia; konzola čistá.

## Čo ostáva

1. **Tri ECLI na doplnenie** v citačnom priechode — `C‑11/00`, `C‑270/12`, `C‑65/13`. Zatiaľ je v `source` len číslo veci a strany, čo je platná citácia, takže nič nie je rozbité.
2. **A7 Prípad 2 – obsah nesedí so `source`.** Krok hovorí *„Členský štát odmietol implementovať smernicu"*, ale judikát je C‑427/12 Biocídy, teda spor o hranicu medzi delegovanými a vykonávacími aktmi. Zadanie žiadalo len opravu parentézy, tak som text nechal — ale teraz A7 rieši netransponovanú smernicu **dvakrát** (Prípad 1 aj Prípad 2), pričom druhý raz pod nesúvisiacim judikátom. Návrh: prepísať Prípad 2 na skutočný obsah Biocídov (čl. 290 vs. čl. 291).
3. **A6 Prípad 1** sa volá „Pringle: právomoci Európskej rady pri stabilizačných mechanizmoch" a Prípad 2 je teraz tiež Pringle. Nie je to chyba — sú to dve rôzne otázky z toho istého rozsudku — ale ak chceš v A6 dva rôzne judikáty, Prípad 1 je kandidát na výmenu.
4. Otvorené z predchádzajúcich dávok: kvízová sada **A1–A3** doplnená na 5 otázok, hrany pre **A13** v mape.
