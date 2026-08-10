# LexArena — doladenie štvorcov + poznámky k TPH pavúkom (protokol od Code)

> **Fáza:** pushnuté (`1e1be4f..07c600d`). Nadväzuje na `claude_lexarena-stvorce-doladenie-zadanie.md`. TPH pavúky **nenasadené** — čakajú na odsúhlasenie klastrov + premapovanie schémy (dole).

## Doladenie štvorcov · `07c600d`
`styles.css:57`, `:81` premenné · `:281` rozmery a gradient · `:335` pulz · `:369` vypnutý stav · `:1290` mobil · `init.js:3812` vypnutie pulzu

### 1. Menšie
| | Pred | Po |
|---|---|---|
| Výška | 190 px | **168 px** |
| Ikona | 40 px | 36 px |
| Padding | 14/12 | 12/10 |
| Názov/popis | 15/11,5 | 14,5/11 |

„~290 px" na snímke bola mierka obrázka (~1,5×) — reálne 190 CSS px. `aspect-ratio + max-height` nahradené **pevnou výškou** (v mriežke sa správali nespoľahlivo — dlaždica vedela prerásť strop pri širokom stĺpci). Trojica vedľa seba (3 × 207 px pri okne 1911).

### 2. Pulz
| Parameter | Hodnota |
|---|---|
| Cyklus | 9 s; pulz ~0,7 s (88→96 % cyklu), zvyšok pokoj |
| Efekt | `scale(1.025)` — bez zmeny farby, bez blikania |
| Odstup | 0 / 0,25 / 0,5 s — vlna, nie naraz |
| Vypnutá dlaždica | nepulzuje (lákala by na mŕtvy klik) |
| Hover | prebíja pulz (inak by sa bili o transform) |
| Po prvej interakcii | vypnutý natrvalo (`pointerdown`, `{once:true}` → `tiles-interacted`) |
| `prefers-reduced-motion` | animácia úplne vypnutá (`!important`) |

### 3. Viac gradientu
Trojzastávkový prechod 135° + jemný svetelný nádych vľavo hore (`::after` pod obsahom, neblokuje klik):
- Svetlá: `#ff9db4 → #ff5c85 (52 %) → #c22a58` · Tmavá: `#5cb0ee → #2f7cbb (52 %) → #17456b`
- Dlaždice sú `<button>` mimo `.btn` → dark-mode pravidlá pre `.btn` sa ich netýkajú (problém z `01f891a` tu nevzniká).
- Prvý štvorec pôsobil najploskejšie, lebo bol **vypnutý**: `saturate(0.5)` zlial prechod. Zmenené na 0.7 + opacity 0.78 — stlmený, ale gradient vidno. Výzvy aktívne vždy.

### Mobil a konzola
375 px: 3 × 295×74 (vodorovný tvar) pod sebou, menšie akcie 2×2, bez orezania/pretečenia. Konzola čistá.

## TPH pavúky — poznámky Code (nič nenasadené)
1. **Schéma:** dodaný balík používa `name` pre vetvy a `{name, def}` pre listy; appka žiada **`label` + `leaves: string[]`** — `isValidSpider()` by odmietla všetkých 13. Premapovanie mechanické (`name → label`, list → `"Pojem – definícia"`), Code dodá naraz po odsúhlasení klastrov.
2. **`_map.json`** (overené podľa Pracovného): `{ area, clusters:[{ id (kebab-case slug), label, okruhy:[čísla] }], links:[{from,to,note}] }` — klastre potrebujú `id`, okruhy sú **čísla** (nie „A1"), **emoji v label vynechať** (Pracovné ich nepoužíva, vykresľuje sa čistý text). `links[]` je nesmerované — prepojenia stačí raz.
3. `Trestné právo hmotné/data/_map.json` zatiaľ neexistuje — dovtedy sa TPH otvára stromom (fail-soft v `spiderMap.js`).

## Babu po nasadení
Či 168 px sedí (na užšom okne užšie, výška ostáva) a či pulz nie je otravný — interval 9 s je jedno číslo v `styles.css`.
