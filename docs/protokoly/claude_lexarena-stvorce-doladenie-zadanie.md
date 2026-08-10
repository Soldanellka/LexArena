# LexArena — doladenie troch štvorcov (zadanie pre Code)

> Babu videla štvorce naživo: **super, ale doladiť.** Tri veci. Pravidlá platia (obe témy, mobil, commit + protokol, push na Babu).

## 1. Menšie
Štvorce sú príliš veľké (na screenshote ~290 px vysoké s veľkým prázdnom). Zmenšiť tak, aby ostali dominantné, ale kompaktné — orientačne **~160–190 px výška**, ikona ~34–40 px, menší vnútorný padding. Trojica nech stále sedí vedľa seba v riadku; rad menších akcií pod nimi bez zmeny.

## 2. Občasný jemný pulz
Decentná pútacia animácia, **nie trvalé blikanie**: jemné zväčšenie/tieň (scale ~1.02 alebo glow) raz za dlhší interval (napr. každých 6–10 s krátky pulz), pokojne so stopnutím po prvej interakcii. **Rešpektovať `prefers-reduced-motion`** (vtedy bez animácie). Nech to nepôsobí ako reklama — cieľ je „živá stránka", nie kolotoč.

## 3. Viac gradientu
Sýtejší/viditeľnejší gradient výplne (dnes pôsobia dosť ploché — hlavne prvý štvorec). Držať paletu appky; v tmavej téme rovnaká pozornosť kaskáde ako pri `01f891a`. Disabled stav (bez oblasti) ostáva gradientový-stlmený, štvorec Výzvy vždy aktívny.

## Protokol
Commit + `súbor:riadok` · rozmery pred/po · parametre pulzu (interval, trvanie, reduced-motion) · gradienty v oboch témach · mobil · konzola.
