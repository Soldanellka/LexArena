# LexArena — jednotné tlačidlá, admin doľava, balans stĺpcov (protokol od Code)

> **Fáza:** pushnuté v dvoch dávkach (`9d0b856..15bfee0`, potom `15bfee0..9297bd9`), živé. Nadväzuje na `claude_lexarena-jednotne-tlacidla-admin-zadanie.md`.

## Čo je hotové
- **Jednotné herné tlačidlá** — šesť akcií v mriežke 2×3, Štátnica výraznejšia (prstenec; v tmavej téme správne modrý).
- **Admin panel** presunutý na koniec ľavého stĺpca (`adminCard` posledná vľavo).
- **Bifľovačka skrátená** — 3 oblasti viditeľné + 3 pod rozbaľovačom (vzor „Ďalší obsah"); karta 719 → 298 px. Skryté dlaždice majú progres načítaný.
- **Judikatúra: výlet tam a späť.** Najprv presunutá doprava (`#judikaturaHost`), čo spolu so skrátenou Bifľovačkou **prevrátilo balans** (pravý o 104 % dlhší — Code priznala chybu v odhade: obe zmeny uberali z toho istého stĺpca). Po rozhodnutí Babu vrátená **doľava** do „Uč sa" (kotva za `#biflovackaCard`); podpora hostiteľa v `judikatura.js` ostala pre budúcnosť.
- **Návody & odmeny rozbaľovacie** — zoznam 3 videí pod rozbaľovačom (rovnaký vzor), karta 504 → 165 px. Zoznam ostáva v DOM (len skrytý) → `initVideoSystem` aj obnova odznakov fungujú bez ohľadu na rozbalenie.

## Výsledok — stĺpce vyrovnané
**Ľavý 1 988 px · pravý 1 951 px (rozdiel 2 %).** Vývoj: 2 566/1 424 (80 %) → 1 424/2 908 (104 % opačne) → 1 988/1 951.

## Otestované
Desktop 1280 + mobil 375, obe témy: judikatúra na mieste, admin posledný vľavo, rozbaľovač videí prepína popis aj `aria-expanded`, poradie množín, tri rozbaľovače konzistentné, filter rebríčka, 5/5 bottom-nav, 6/6 zbaliteľných, bez horizontálneho scrollu, konzola čistá.

## Otvorené (na rozhodnutie Babu)
1. **Šírka pravého stĺpca** — po prechode na `flex 2:1` vychádza ~376 px namiesto pôvodných pevných **420 px** → pravý stĺpec je citeľne užší, než býval (Babu si to všimla). Návrh: vrátiť pravému pevných 420 px, ľavý nech berie zvyšok.
2. **Videá v Návodoch** — nie sú schované priveľmi? (3×12 § a nováčik ich bez kliknutia neuvidí.) Návrh Code: prvé video viditeľné + 2 zbalené (vzor Bifľovačka 3+3).
3. Zvyšok Stopy C (lišta, onboarding) — stále nezačatý.
