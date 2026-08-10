# LexArena — korekcia rozloženia + neviditeľný admin (protokol od Code)

> **Fáza:** korekcia rozloženia hotová (`b5195ed`), potom Babu schválila push a zadala pravidlo atribúcie: **čo zmenil/schválil admin, vidí len admin; ostatné zmeny vidia všetci.** Code na tom pracuje (Súdna sieň + pečiatky úprav hotové, overovanie prebieha). Nadväzuje na `claude_lexarena-korekcia-rozlozenia-zadanie.md`.

## Korekcia rozloženia · `b5195ed`

| # | Zmena | Kde |
|---|-------|-----|
| 1 | Štátnica späť do zviazaného celku | `#statniceHeroCard` zrušený, `#openStatniceBtn` opäť v `#gamesSection`; zvýraznenie (🏛️ + `.statnice-cta-btn`) a väzba „bez oblasti sa nespustí" vrátane scrollu ostali |
| 2 | Register vpravo hore | nová množina `#setRegister` na vrchu `.right` |
| 3 | Stĺpce 2:1 | `.left { flex: 2 }`, `.right { flex: 1 }` → 752 / 376 px |
| 4 | Dvojice v Ďalších tréningoch | grid na `#setMoreTraining` nad 900 px + kotva Judikatúry |
| 5 | Servis bez karty „Účet" | bez zmeny — Obchod + admin panel |

### ⚠️ Odchýlka od nákresu — dvojice párované podľa výšok
Nákres: Bifľovačka|Progres a Štruktúra|Judikatúra → v 1. riadku 604 px prázdna (riadok gridu = výška vyššej karty). Code prehodila na **Bifľovačka|Judikatúra** (750+566) a **Progres|Štruktúra** (150+150): prázdno 604→184 px, množina 1413→981 px. Judikatúra pri 354 px netrpí (presah 0 px). Návrat na párovanie podľa nákresu = zmena jednej kotvy.

### Otestované
Desktop 1280: 6 panelov, štátnica v `#gamesSection`, dvojice v mriežke. Mobil 375: poradie 1–6, dvojice pod sebou, bez horizontálneho scrollu. Filter rebríčka, 5/5 bottom-nav, 6/6 zbaliteľných. Zviazaný celok kŕmi hry vrátane štátnice. Scroll na kvíz funguje (1813→181). Tmavý režim OK, konzola čistá.

### Výšky stĺpcov
Ľavý 2 003 px · pravý 2 390 px — rozdiel ~390 px (19 %), obrátený a výrazne vyrovnanejší než predtým (39 %). Code: netreba riešiť, posúdiť naživo.

## Neviditeľný admin (rozpracované)
Pravidlo od Babu: **skrýva sa identita admina, nie verdikt/zmena.** Code zistila, že admin sa podpisoval na **dvoch miestach**: verdikty v Súdnej sieni (aj 4 historické záznamy) a pečiatky úprav obsahu („✏️ Upravené … – {autor}"). Obe ošetrené: študent vidí verdikt/úpravu **bez podpisu admina** (odôvodnenie ostáva), **admin svoj podpis vidí**. Historické záznamy skryté spätne. Garantské podpisy a pečate ostávajú viditeľné všetkým. Finálne overenie druhej vetvy prebiehalo pri odovzdaní protokolu.
