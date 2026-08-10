# LexArena — nasadenie: TPH A22–A30 + TPP A1–A5 + county (zadanie pre Code)

> **Zdroje:** `claude_TPH-davka-A22-A30.md` a `claude_TPP-davka-A1-A5.md`. Pravidlá platia (commit + protokol, push na Babu, nič cez globálny sync).

## 1. TPH A22–A30 — pavúky + mapa
- `spider` do `Trestné právo hmotné/data/A22–A30.json` (formát appky; `isValidSpider()` 9/9; obsah nemeniť).
- Mapa: `osobitna-cast` → label „Osobitná časť – osoba a rodina", okruhy [17–21, 28]; nové klastre `majetok-a-hospodarstvo` [22, 23] · `vseobecne-nebezpecne` [24] · `stat-a-verejna-moc` [25, 26, 27, 29] · `mier-a-ludskost` [30]; 8 nových links z podkladu. Integrita: 1–30 každý práve raz. UI kontrola mapy (13 klastrov).

## 2. TPP A1–A5 — pavúky
- **Najprv over, či pavúčí systém podporuje TPP** (AREA_PATHS v `spider.js`/`spiderMap.js`, katalóg oblastí). Ak áno: `spider` do `Trestné právo procesné/data/A1–A5.json` (5/5 validácia); `_map.json` pre TPP zatiaľ NErobiť (fail-soft strom stačí, mapa príde s ďalšími dávkami). Ak TPP v pavúkovi nie je podporované, **nahlás, čo treba doplniť** (nerozhoduj sám o pridaní oblasti do UI).

## 3. Regex jadra — tretí vzor
TPP summary používajú nadpis **„Zhrnutie (štátnicové jadro)"** — rozšír `extractKeyPoints` o tento vzor (tolerantne, ako pri druhom). Texty Babu nemeniť. Over extrakciu na reálnych TPP A1–A5 z Firebase.

## 4. County štátnice
- `CRIMINAL_HMOTNE_COUNT` → **30**, ALE najprv over, že A22–A30 majú summary vo Firebase (Babu ich písala v appke). Ak niektorý chýba, nastav count na najvyšší súvislý rozsah so summary a nahlás.
- `CRIMINAL_PROCESNE_COUNT` → **5** (TPP A1–A5 majú summary) — hybrid tým začne pri Trestnom vracať pravé dvojice hmotné+procesné, keď procesný okruh padne do A1–A5; inak doberie náhradu. Over oba scenáre (procesný v rozsahu / mimo rozsahu) izolovane ako minule.

## 5. Regresia
A1–A21 pavúky a mapa TPH nedotknuté · Pracovné/Občianske v pavúkovi aj sieni bez zmeny · extrakcia starých vzorov funguje.

## Protokol
Commit(y) + `súbor:riadok` · validácie 9/9 a 5/5 · mapa 13 klastrov · TPP podpora (áno/čo chýba) · extrakcia TPP (2–3 body) · county + oba scenáre dvojice · regresie · otvorené otázky.
