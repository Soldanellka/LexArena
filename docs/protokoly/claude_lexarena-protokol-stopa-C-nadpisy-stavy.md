# LexArena — prestavba: protokol úzkej Stopy C (výstup od Code)

> **Fáza:** schválená úzka časť Stopy C (nadpisy svetov + viditeľné stavy) hotová a overená v svetlom aj tmavom režime. **13 commitov spolu, lokálne, nepushnuté** (push na Babu). Vlajková loď, konsolidácia lišty a onboarding **nezačaté**. Nadväzuje na `claude_lexarena-nadpisy-stavy-zadanie.md`.

## Commit
`5a7cd49` — feat(ui): nadpisy svetov + viditeľné stavy „pripravuje sa" / „čoskoro"

## Čo sa zmenilo
- **Nadpisy svetov** (`index.html`): štyri `<h3 class="world-heading">` ako **súrodenci kariet** (⚔️ Aréna, 📚 Tréningy, 🏛️ Súťaž a komunita, 🧰 Servis). Overené, že `.left`/`.right` nemajú iných priamych detí než karty a nadpisy → mobilné `display:contents` + `order` funguje ďalej. Mobilný `order` sled prepísaný na **1–18** s nadpismi na správnych miestach.
- **Štýl** (`styles.css`, `.world-heading`): len odsadenie, hrúbka 700, `color: var(--text)`. Rodina aj veľkosť ostávajú default `h3` — presne to isté, čo majú nadpisy vnútri kariet. Žiadny nový vizuálny jazyk.
- **Stavy** (`.chip:disabled` — dnes len Rímske právo a Dejiny práva): `opacity 0.5`, `grayscale(1)`, `cursor: not-allowed`, bez tieňa a bez hover nadskočenia. Odsýtenie zvolené zámerne namiesto prepisu pozadia — chip má v svetlej téme ružový gradient a v tmavej úplne iný (s `!important`), takže `grayscale` je jediný zápis, ktorý sedí v oboch režimoch bez duplikovania gradientov. `.card-soon` (Obchod): `opacity 0.6`, téma-agnostické.

## Overené v oboch režimoch

| | Svetlá | Tmavá |
|---|--------|-------|
| Nadpis sveta | rgb(43,43,43) · 18,72 px · 700 | rgb(230,238,246) · 18,72 px · 700 |
| Nadpis karty (porovnanie) | rovnaké | rovnaké |
| Chip „pripravuje sa" | 0,5 · grayscale(1) · not-allowed | rovnako |
| Bežný chip | nedotknutý | nedotknutý |
| Obchod / iné karty | 0,6 / 1,0 | 0,6 / 1,0 |

**Regresia:** mobil 375 px — poradie 1–18 vrátane nadpisov, žiadny prvok bez poradia, bez horizontálneho scrollu. Desktop 1280 px — Aréna vpravo (nadpis + 3 karty), vľavo Tréningy → Súťaž → Servis. Filter rebríčka aj bottom-nav ciele na mieste. Konzola bez chýb.

## Poznámky k overovaniu (nie chyby)
1. **Skrytý panel prehliadača vracia zastarané `getComputedStyle`.** Prvé merania hlásili nezmysly (biela karta v tmavom režime, `opacity: 1` na vypnutom chipe). Po vynútení reflow sa všetko ukázalo správne — artefakt merania, nie chyba v CSS.
2. **Chipy sa označujú so zdržaním až ~52 s, ak je stránka na pozadí.** `waitAreaLoaded` používa `setInterval(100 ms)`, ktorý Chrome v skrytej záložke brzdí na ~1 s. V aktívnej záložke ~5 s a po zviditeľnení dobehne samo. Vlastnosť existujúcej pomocnej funkcie (používajú ju aj iné časti appky) — Code do nej nezasahovala, len hlási.

## Stav
- **13 commitov lokálne** (Stopa A: 8, Stopa B: 3, úzka Stopa C: 1 + tento). **Nič nepushnuté.**
- Nerobené podľa zadania: vlajková loď, konsolidácia lišty, onboarding.
- Šírka presunutých kariet (Senáty 708 px, Judikatúra 708 px) ponechaná — Babu posúdi naživo.
