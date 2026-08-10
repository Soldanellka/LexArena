# LexArena — prestavba: protokol Stopy A (výstup od Code)

> **Fáza:** Stopa A (opravy funkčnosti) hotová — 5 commitov, **lokálne, nepushnuté** (push je na Babu). Vzhľad nedotknutý. Nadväzuje na `claude_lexarena-prestavba-zadanie-pre-code.md`.
> **Stopa B** nezačatá — čaká na 3 blokujúce rozhodnutia (dole).

## TL;DR
Päť opráv: prípady dostali § + energiu, register už nemaže cudzie výzvy, výsledok duelu sa zobrazí, moduly pripíšu §, mŕtva karta odstránená. Regresia (desktop + mobil 375×812) čistá — zviazaný celok Sveta 1, filter rebríčka, bottom-nav aj zbaliteľné sekcie fungujú.

---

## Protokol prenosu

### A1 — Prípady: dopojiť § a energiu · `516610d`
- **Zmenené:** `cases.js:412-413` (nové `__jsonCaseScores`, `__jsonCaseSetRewarded`), `cases.js:417-459` (nová `maybeAwardCaseSet`), `cases.js:563-572` (napojenie na existujúci strážca zápisu progresu).
- Ekonomika visela výhradne v `submitCase()` nad `window.cases`, ktoré appka nikdy nenaplní. Dopojené na živú cestu: `ENERGY.CASES_SET` (−4 %) + `CASES_SET` (+5 §) za sadu, `CASES_PERFECT` (+10 §) len pri skutočných 100 %, `incrementGamesPlayed()`. Hodnoty v `economyConfig.js` nezmenené.
- Vecný rozdiel oproti legacy: v JSON ceste sa krok uzavrie aj pri chybe, takže `CASES_PERFECT` kontroluje skutočné skóre.
- **Vzhľad:** bez zásahu do DOM aj CSS.
- **Otestované (desktop):** 4 prípady Trestného bez nicku (žiadny zápis do produkčnej Firebase); flag sa prepol až po poslednom prípade; opakovaný re-render neodmenil znova; odpovede po zodpovedaní neklikateľné; konzola čistá.

### A3 — Register: znemožniť mazanie cudzích výziev · `47a2d3b`
- **Zmenené:** `duels.js:531-596` (`lex_dismissed_duels` + filter a prune v `loadDuelBank`), `duels.js:711-723` (vetvenie „Odmietnuť").
- Vlastnú výzvu naďalej maže z DB (legitímne zrušenie), cudziu už len skryje tomuto zariadeniu. Rozlíšené existujúcim `isOwn`. Zoznam skrytých sa pri načítaní čistí od ID, ktoré už nie sú v ponuke.
- **Vzhľad:** popisky, triedy ani markup tlačidiel nezmenené.
- ⚠️ **Neotestované naživo:** v produkčnej DB nie sú čakajúce výzvy, testovací záznam Code zámerne nevytváral. **Overiť ručne:** vytvor výzvu na jednom zariadení a skús ju odmietnuť z druhého — musí zmiznúť len tam.

### A5 — Odstrániť mŕtvu kartu · `26cb3eb`
- **Zmenené:** `index.html:381-389` — odstránená karta „Výzvy od spoluhráčov". Grep potvrdil nulové referencie v JS aj CSS.
- **Vzhľad:** karta bola natrvalo `display:none` — pre hráča sa nemení nič. Obchod ponechaný nedotknutý (rieši B3).

### A2 — Výsledok duelu · `8ed618e`
- **Zmenené:** `duels.js:14` (import `escapeHtml`), `duels.js:460-513` (`showDuelResultModal`), `duels.js:584-591` (volanie na konci `finalizeDuel` vo vlastnom `try/catch`, aby UI nezhodilo už zapísané vyhodnotenie).
- **Vzhľad:** modál používa výhradne existujúce triedy duelového modalu (`.duel-challenge-modal-overlay`, `.duel-challenge-modal`, `.duel-challenge-title`, `.btn-primary` — `styles.css:2768+`). Overené cez computed styles (radius 14 px, tieň, gradient, max-width 380 px); žiadny nový `<style>`.
- ⚠️ **Obmedzenie:** vidí ho hráč, ktorý duel dohral (prijímateľ). **Tvorca výzvy** sa výsledok stále nedozvie — samostatná úloha (notifikácia pri ďalšej návšteve), čaká na rozhodnutie.

### A4 — Moduly: pripísať sľúbený § · `7362cad`
- **Zmenené:** `engine.js:142-165` a `ob-pravo-app/app.js:120-143` — `econBridgeAward` sa importuje priamo; `window.opener` ostáva prvou voľbou pre nové okno.
- Zámer pôvodného komentára ostáva: `econBridgeAward → econAward` je tá istá brána so stropom aj transakčným logom.
- **Vzhľad:** žiadny UI zásah.
- **Otestované:** EÚ aj Občiansky modul lokálne — `window.opener` je naozaj `false` (potvrdenie príčiny), import prejde, bez nicku vracia `null` bez zápisu.

---

## Regresia po celej Stope A

| Kontrola | Výsledok |
|----------|----------|
| Zviazaný celok Sveta 1 | Občianske → A1+A37, 10 otázok, 10 kartičiek + 4 prípady doručené do hier ✅ |
| Filter rebríčka (`previousElementSibling` + texty) | Týždeň / Mesiac / Všetko na správnom mieste ✅ |
| bottom-nav ciele | všetkých 5 existuje ✅ |
| Zbaliteľné sekcie (6× `.highlight-*` + h3) | všetky nájdené ✅ |
| Mobil 375×812 | bottom-nav grid, `.left` `display:contents`, order 1–7 sedí, žiadny horizontálny scroll ✅ |
| Konzola | bez chýb na hlavnej stránke aj v oboch sub-appkách ✅ |

**Nič nepushnuté — commity sú lokálne, push je na Babu.**

---

## Otvorené otázky — blokujú Stopu B
1. **Kam patria Rebríček a Senáty?** (B2) Svet 1 (Aréna) alebo Svet 3 (Súťaž a komunita)? Určuje celé poradie + mobilný `order` + bottom-nav.
2. **Register pojednávaní** (A3): ukazovať naďalej cudzie otvorené výzvy (opravené len proti mazaniu), alebo prerobiť na „moje uložené"?
3. **Chipy Rímske/Dejiny** (B3): v `styles.css` nie je hotový „disabled/pripravuje sa" vzhľad pre `.chip`. Použiť existujúcu `.muted` (stlmený text), alebo odsúhlasiť vzhľad zvlášť?
4. **A6 priorita** (návrh Code): (a) obídenie hodnotenia v kvíze — kazí rebríček aj duely; (b) menovateľ bifľovačky ×5 vs ×3 — podhodnocuje progres; (c) overenie videí/reklám — nechať ako známy dlh.
5. **Tvorca výzvy a výsledok** (A2): dorobiť notifikáciu pri ďalšej návšteve?
