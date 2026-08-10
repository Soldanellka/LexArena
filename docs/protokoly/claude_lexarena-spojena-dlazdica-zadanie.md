# LexArena — spojená herná dlaždica + nové poradie ľavého stĺpca (zadanie pre Code)

> **Kontext:** korekcia po `b5195ed`. Babu chce zlúčiť dlaždicu Pojednávania a dlaždicu Hier do **jednej**, aby bolo jasné: *vyberiem oblasť a hrám, čo chcem*. K tomu nové poradie ľavého stĺpca. Pravidlá platia ďalej (hooky nepremenúvať, `display:contents`/`order` na množinách, zviazaný celok, filter rebríčka, bottom-nav, tmavý režim, commit + protokol, push na Babu).

## 1. Jedna spojená dlaždica „hraj z vybranej oblasti"
Zlúčiť `#quizCard` (výber oblasti + Spustiť pojednávanie) a `#gamesSection` (Kartičky, Prípady, Štátnica) do **jednej karty**, a pridať do nej aj **Môj progres** a **Štruktúru otázok**. Vnútorná logika:
- hore **výber oblasti** (chipy + režimy — nedotknuté),
- pod tým akcie: **Spustiť pojednávanie · Kartičky · Prípady z praxe · Štátnicová sieň (so zvýraznením 🏛️) · Môj progres · Štruktúra otázok**.
- **Zlúčenie rob markupovo konzervatívne:** `#quizCard`, `#quizIntro`, `#quizArea`, `#areasList`, `#startQuizBtn`, `#gamesSection` a všetky tlačidlá si musia ponechať ID (JS na nich visí). Ideálne presuň obsah `#gamesSection` (a tlačidlá Progres/Štruktúra) **dovnútra** `#quizCard` ako sekciu — nie nanovo stavať.
- ⚠️ **Judikatúra sa mountuje kotvou** (`afterend`) — po presune tlačidiel jej kotvu aktualizuj podľa nového umiestnenia (ide na koniec stĺpca, viď poradie).
- Pozn.: Progres a Štruktúra **nevyžadujú** vybranú oblasť — ich tlačidlá ostávajú funkčné aj bez výberu (nedisablovať s ostatnými).

## 2. Nové poradie ľavého stĺpca
1. **Spojená herná dlaždica** (bod 1)
2. **Študijné moduly** (hneď pod ňou)
3. **Bifľovačka**
4. **Judikatúra** (nakoniec)

Množina „Ďalšie tréningy" týmto **zaniká** (Progres a Štruktúra šli do hernej dlaždice, Bifľovačka a Judikatúra stoja samostatne). Zruš/uprav rámiky množín podľa nového členenia, prepíš mobilný `order` aj bottom-nav ciele a zbaliteľné sekcie.

## 3. Pravý stĺpec — bez zmeny
Register hore → Súťaž a komunita → Servis. Stĺpce ostávajú 2:1.

## Otestovať
Desktop + mobil, obe témy: výber oblasti kŕmi všetky 4 hry v spojenej dlaždici · Progres a Štruktúra fungujú aj bez oblasti · scroll na kvíz (Spustiť aj prijatie výzvy) · Judikatúra sa vyrenderuje na novom mieste · filter rebríčka · bottom-nav · zbaliteľné sekcie · konzola čistá. Zmeraj nové výšky stĺpcov.
