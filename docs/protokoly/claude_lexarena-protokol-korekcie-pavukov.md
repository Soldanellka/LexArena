# LexArena — korekcie pavúkov po garantskej kontrole (protokol od Code)

> **Fáza:** pushnuté — `ce54454..d4c77c1` (TPP A8, čakalo z minula) a `d4c77c1..3d6204b` (korekcie). Nadväzuje na `claude_lexarena-korekcie-pavukov-zadanie.md` a garantské opravy Babu (oprava.txt + potvrdenia).

## Zmeny (`3d6204b`)
| Okruh | Zmena |
|---|---|
| A9 | + objednávateľ (§ 21 ods. 1 písm. c); poradie organizátor → návodca → objednávateľ → pomocník; „Účastník" prepísaný |
| A10 | „Úhrnný (§ 41) × súhrnný (§ 42)"; § 47 v Recidíve overený, správny |
| A16 | EZR: 167/2026 → **154/2010 + 236/2017 (EVP, uznávanie rozsudkov)** |
| A17 | **kompletná náhrada** — 5 vetiev / 17 listov; pribudlo Zabitie (§§ 147–148), hierarchia sadzieb. Pôvodné §§ 159/160/164 = neoprávnené odoberanie orgánov — pavúk ukazoval vraždu pod paragrafmi o transplantáciách |
| A18 | kompletná náhrada — 4 vetvy / 16 listov; §§ 161–169, HIV 165–166, neposkytnutie: všeobecná § 177 × vodič § 178 |
| A20 | kompletná náhrada — 5 vetiev / 16 listov; znásilnenie (§ 199) vlajková SP, súlož medzi príbuznými (§ 203); 213–218 → 199–203 |
| A21 | §§ 207/208/211 v labeloch; zaradenie Tretia hlava (§§ 204–211) |

## Overenie
`isValidSpider` **30/30** · kvízy + theory zachované vo všetkých 30 súboroch · mapa nedotknutá — **13 klastrov, 28 prepojení, okruhy 1–30** · UI: 7 stromov s novými textami · konzola čistá.

## Stav (aktualizácia obrazu projektu)
- **TPH je kompletné: A1–A30** nasadené (A22–A30 od `274e8a6`), `CRIMINAL_HMOTNE_COUNT = 30`. Zadanie „dávka A22–A24 + count 24" je prekonané.
- **TPP sa rozbehlo:** A8 pavúk pushnutý; sada má A1–A5 + A8 (medzera A6, A7).

## Otvorené
1. **Prvý GitHub sync** (~115 overridov) — najlepší čas teraz; zálohuje aj opravené zhrnutia. Spúšťa Babu z admin panelu.
2. **TPP A6, A7** — bez pavúka (medzera v sade).
3. **TPP A1/A2** — štátnicové jadro ako jedna veta namiesto zoznamu (extrakcia potom vracia 1 bod).
