# LexArena — tri štvorce (Pojednávanie · Štátnica · Výzvy) namiesto tria (zadanie pre Code)

> **Kontext:** Babu videla akcent tria naživo — nepáči sa jej (pilulkový vzhľad) a „Vyzvi spolužiaka" jej otvorilo nečakane kvíz. Chce **tri veľké štvorcové dlaždice** vedľa seba (dizajn ako kartové dlaždice z návrhov — `game-tile` štýl: veľká ikona hore, názov, krátky popis) a čistejšiu logiku výziev. Pravidlá platia (ID/hooky, mobilný `order`, tmavý režim, commit + protokol, push na Babu).

## Cieľová logika (od Babu, doslovne)
1. **🥊 Spustiť pojednávanie** — spustí kvíz z vybranej oblasti. Odohraný kvíz sa uloží do banky výziev (ako doteraz, `saveDuel`).
2. **🏛️ Štátnicová sieň** — spustí štátnicu z vybranej oblasti.
3. **⚔️ Výzvy** — otvorí **register pojednávaní**; tam hráč buď (a) klikne na svoj odohraný kvíz a **pošle link** (`shareDuelInvite`), alebo (b) **prijme výzvu** od iného hráča → otvorí sa kvíz, ktorý odohral súper → výsledok sa zapíše do rebríčka.

## Úpravy
### 1. Tri veľké štvorce
- Namiesto pilulkového tria: **tri štvorcové/kartové dlaždice vedľa seba** — veľká ikona (🥊 / 🏛️ / ⚔️), názov, 1 riadok popisu („Kvíz z vybranej oblasti" · „Ústna skúška pred komisiou · 15 §" · „Prijmi alebo pošli výzvu"). Vizuál: existujúci kartový jazyk appky (biela karta/`game-tile` + akcent — sýty gradient alebo výrazný rám; drž sa toho, čo už appka má, vrátane tmavej témy s opravenou kaskádou z `01f891a`).
- Disabled logika: štvorce 1 a 2 bez vybranej oblasti stlmené (gradientový disabled vzor z `01f891a`) + hint; **štvorec 3 (Výzvy) je aktívny vždy** — register nezávisí od výberu oblasti.
- Menšie akcie (Kartičky · Prípady · Môj progres · Štruktúra otázok) ostávajú ako rad menších tlačidiel pod štvorcami.
- Mobil: štvorce 1×3 pod sebou alebo iné čisté zalomenie — over, nahláš.

### 2. „Vyzvi spolužiaka" zaniká ako samostatné hranie
- Tlačidlo `#challengeFriendBtn` odstrániť z mriežky; **challenge režim (auto-share po dohraní) zrušiť/deaktivovať** — posielanie výzvy je akcia v registri nad vlastným uloženým kvízom (`shareDuelInvite` tam už je).
- Over, že v registri je akcia „📤 Poslať" na vlastných výzvach jasne viditeľná (bez zmeny dizajnu registra nad rámec potreby).

### 3. Štvorec Výzvy → register
- Klik na ⚔️ Výzvy: otvorí/rozbalí register (`#duelBankCard` je v tej istej množine — scroll + rozbaliť `#duelBank`, ak je zbalený). Prijatie výzvy ďalej vedie na kvíz so scrollom; výsledok do rebríčka (existujúca mechanika, nič nemeniť).

## Nedotknúť
`saveDuel` mechanika (ukladanie odohraného kvízu do banky) · ekonomika · rebríček · `shareDuelInvite` · ID existujúcich tlačidiel (`#startQuizBtn`, `#openStatniceBtn` ostávajú, len v novom šate).

## Protokol
Commit + `súbor:riadok` · vzhľad štvorcov v oboch témach (namerané hodnoty stačia) · disabled stavy · tok: Výzvy → register → poslať link / prijať → kvíz → rebríček (otestované bez zápisu do produkcie, kde sa dá) · mobil · výšky stĺpcov ak sa pohli · otvorené otázky.
