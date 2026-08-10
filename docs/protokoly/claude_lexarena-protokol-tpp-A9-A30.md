# LexArena — TPP pavúky A9–A30 nasadené (protokol od Code)

> **Fáza:** commit `5693e3b`, **pushnuté** (`24dacc5..5693e3b`). Nadväzuje na `claude_lexarena-tpp-A9-A30-nasadenie-zadanie.md` a `claude_TPP-pavuky-A9-A30.md`.

## Nasadenie
22 blokov vo formáte appky → validácia + preformátovanie do štýlu repa (jedna vetva na riadok), **obsah nemenený**. Cesta `Trestné právo procesné/data/`, pole za `zdroj` — ako existujúce.
- **Validácia 30/30** `isValidSpider` ✅ · vetiev 4–6 na okruh · **378 listov spolu**
- Diff: **207 riadkov pridaných, 0 odstránených** — kvízy, dlaždice, prípady, zdroj nedotknuté.
- Falošný poplach pri kontrole: TPP má **10 dlaždíc** na okruh (TPH 5) — tak to bolo aj predtým; test len predpokladal štruktúru TPH.
- UI preklikané: A11, A22, A26, A30 — stromy so správnymi vetvami; konzola čistá.
- Sporné §§ zámerne vynechané (A9 predvedenie, A22 verejnosť, A27 osobitné konania) podľa podkladu.

## Stav Trestného
| | Pavúky | Mapa | V štátnici |
|---|---|---|---|
| Hmotné | 30/30 | 13 klastrov / 28 prepojení | A1–A30 |
| Procesné | 30/30 | žiadna — fail-soft strom | A1–A8 |

## Otvorené
1. **TPP mapa klastrov** — bez nej sa pri procesnom neponúkajú pavúčie hry (idú len z mapy). Claude navrhne po vypísaní názvov TPP A1–A8 (A1, A2, A6, A7 už pozná z textov; chýbajú **A3, A4, A5, A8**).
2. **`CRIMINAL_PROCESNE_COUNT` = 8** — zhrnutia vo Firebase má len A1–A8. **Texty A9–A30 existujú (Babu ich napísala) — treba ich uložiť do appky**, potom count na 30 a sieň skúša pravé dvojice v celom rozsahu.
3. Garantská kontrola §§: A9 predvedenie · A19 preklep zdroja (300/2005 → 301/2005) · A22 verejnosť · A27 osobitné konania.
4. **Prvý GitHub sync — zablokovaný chýbajúcimi env premennými na serveri** (zadanie `claude_lexarena-sync-env-zadanie.md`); overridov ~120.
