# LexArena — TPH kompletné (30/30), TPP štart, county naostro (protokol od Code)

> **Fáza:** commity `274e8a6` (dáta) + `ce54454` (kód), lokálne — push na Babu. Nadväzuje na `claude_lexarena-davka-A22-A30-TPP-nasadenie-zadanie.md` + dávku A6–A7.

## 1. TPH A22–A30 + mapa — TPH KOMPLETNÉ
Validácia **30/30** ✅ (nové: A22 4v/15l · A23 4v/13l · A24 4v/13l · A25 4v/11l · A26 4v/13l · A27 4v/13l · A28 3v/11l · A29 4v/10l · A30 5v/14l). Kvízy zachované. Mapa: **13 klastrov, 28 prepojení**; integrita 1–30 každý práve raz. UI: „Štát a verejná moc" A25/26/27/29 s ⇄ 2/1/2/1; strom A27 ▸(4)(4)(2)(3); „Súvisí s (2)" → A14, A26.

## 2. TPP A1–A5 — podpora existovala
`AREA_PATHS` TPP už obsahovali, picker ponúka. Validácia **5/5** ✅. `_map.json` zámerne nerobený → okruhový zoznam + fail-soft strom (overené na A3); jediný 404 je tá zámerne chýbajúca mapa. **Hry sa zatiaľ neponúkajú — idú výlučne z mapy** (príde s ďalšími dávkami TPP).

## 3. Tretí vzor jadra — nález zmenil riešenie
„Zhrnutie (štátnicové jadro)" stojí v TPP **hore** (hutný odstavec za úvodom), nie na konci ako odrážky — prvá verzia vzoru brala všetko po „Zdroj" (TPP A1 → 30 „bodov"). **Zúžené na prvý prázdny riadok.** Extrakcia po oprave: A1→1 · A2→1 · A3→6 · A4→4 · A5→5 · A6→5 · A7→4.
⚠️ **A1/A2 vracajú len 1 bod** (jadro je jediná ~360-znaková veta) — skúška funguje, ale hodnotí hrubšie. Riešenie: Babu rozbije jadro na odrážky (ako A3–A8), alebo parser rozdelí vetu po čiarkach.

## 4. County — dve odchýlky, obe kvôli dátam
| | Zadanie | Nastavené | Prečo |
|---|---|---|---|
| `CRIMINAL_HMOTNE_COUNT` | 30 | **30** ✅ | všetkých 30 má zhrnutie, extrakcia 4–7 bodov |
| `CRIMINAL_PROCESNE_COUNT` | 5 | **7** | zhrnutia má A1–A8; **A8 vyradené** — jeho zhrnutie obsahovo patrí k A7 (overená zhoda názov ↔ zhrnutie pri všetkých ôsmich). Po oprave A8 → 8. |

## Scenáre dvojice + regresie
Procesný v rozsahu: A6+A3 **pravá dvojica** ✅ · procesný mimo (A15): A6 + doplnené A24 ✅ · hmotný A30 (nová hranica) + A7: obe zo zdieľanej dvojice ✅ · Pracovné A1+A2: 7/7 bez doplnenia ✅ · Občianske A9+A2: popisky OK ✅ · extrakcia starých vzorov nezmenená (Pracovné 7/7/7, EÚ 6/6, TPH 4/5/5) ✅ · pavúky/mapa A1–A21 nedotknuté, 30/30 validných ✅ · návod zosúladený (Trestné už neuvádza „dve z hmotného").

## Otvorené
- **A17 §§** (144/145/147–148/149 vs 159/160/164 v pavúku) — oprava triviálna, čaká na potvrdenie Babu.
- **A30 §§** (12. hlava = 417+) a **A28 §§** diskriminačných SP — summary na opravu.
- **TPP A8** — zhrnutie patrí k A7; po oprave count → 8.
- **TPP A1/A2** — jadro rozbiť na odrážky.
- **Prvý GitHub sync** (~115 overridov).
