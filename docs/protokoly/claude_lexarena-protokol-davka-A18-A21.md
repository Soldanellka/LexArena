# LexArena — nasadenie dávky A18–A21 (protokol od Code)

> **Fáza:** commit `c03a24a`, **pushnuté** (`9ab25a7..c03a24a`). TPH: 21 pavúkov, mapa 9 klastrov / 20 prepojení. ⚠️ `CRIMINAL_HMOTNE_COUNT` ostal na 13 — zdvihnutie rieši zadanie dávky A22–A24 (rovno na 24).

## Pavúky
Dodané vo formáte appky → len validácia + vloženie; obsah nedotknutý.
| Okruh | Vetiev | Listov | isValidSpider |
|---|---|---|---|
| A18 | 4 | 15 | ✅ |
| A19 | 4 | 14 | ✅ |
| A20 | 4 | 13 | ✅ |
| A21 | 4 | 14 | ✅ |
21/21 okruhov validných; theory + kvízy zachované.

## Mapa
`osobitna-cast` → [17, 18, 19, 20, 21]; prepojenia 15 → 20 (nové 18–17, 18–4, 19–20, 20–16, 21–13). Integrita: okruhy 1–21 práve raz, links v rozsahu.

## Overené v UI
Osobitná časť: 5 okruhov s odznakmi ⇄ 3/2/1/2/1 (sedí s links) · strom A20: 4 vetvy ▸(3)(3)(4)(3) · „Súvisí s (2)" na A16 a A19 s poznámkami · konzola čistá.

## Čísla §§ — zámerne bez nich
Pavúky bez §§ (v summary sporné čísla — pravdepodobne z českého TZ). Zoznam nezrovnalostí na garantskú kontrolu Babu: neposkytnutie pomoci 177–178 (nie 191–192) · sexuálne TČ 199–202 (nie 213–218) · výživné 207 (nie 222) · týranie 208 (nie 223) · mravná výchova 211 (nie 226) · pozbavenie/obmedzovanie slobody 182–183 · vydieranie 189 · únos 209–210 · ublíženie/ťažká ujma 155–158 · šírenie nákazy 163–164. Po overení triviálna oprava summary + pavúkov.
Otvorené aj: A20 — účinnosť súhlasového princípu (redefinícia znásilnenia); A19 — doplniť §§ podľa rozsahu okruhu.
