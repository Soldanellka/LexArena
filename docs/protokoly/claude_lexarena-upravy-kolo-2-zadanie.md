# LexArena — úpravy po nasadení, kolo 2 (zadanie pre Code)

> **Kontext:** Babu si prezrela nasadenú prestavbu naživo a žiada kolo layout úprav. Nadväzuje na `claude_lexarena-STAV-PROJEKTU.md`. Väčšina je layout/veľkosť — **vizuálna identita dlaždíc (farby, gradienty, zaoblenie, ružový vzhľad, tmavý režim) sa nemení**, menia sa len veľkosti/usporiadanie tam, kde je to nižšie výslovne uvedené.

## ⛔ Pravidlá (platia ďalej)
- Meniť len to, čo je v zozname. **Nerestylovať** vzhľad dlaždíc nad rámec uvedených zmien (menšie/vedľa seba/zbaliť je OK; prefarbovať nie).
- **Tmavý režim** musí fungovať po každej zmene.
- **Hooky nepremenúvať.** Pozor na mobilné `display:contents` + `order` (`styles.css:1014`) a na filter rebríčka (`leaderboard.js:172` — mapuje chipy cez `previousElementSibling` + text; medzi filter a zoznam nič nevkladať, texty nemeniť).
- Každá položka = samostatný commit + textový protokol. Push na Babu.

---

## Úpravy

### 1. Zbaliť staršie samostatné moduly pod „ďalší obsah"
V Študijných moduloch (`#tilesSection` / `#modulesList`, `renderModules()` z `window.catalog`) nechať **Oblasti** viditeľné, a **staršie samostatné moduly** (Občan – teória a veľký kvíz, TREST Veľký KVÍZ, Trestné – spájačka, Trestné – teória a prípady) skryť pod **jednu zbaliteľnú dlaždicu „ďalší obsah"** (rozbalí zoznam). Rozbaľovač v štýle existujúcich prvkov, žiadny nový vizuálny jazyk. *Ak nie je jednoznačné, ktoré položky katalógu sú „staršie samostatné", potvrď s Babu.*

### 2. Občianske právo — skrátiť názov
Kde sa zobrazuje **„Občianske právo – hmotné a procesné"** (dlaždica v Študijných moduloch), skrátiť na **„Občianske právo"**. **Len popis** — funkčne ostáva dvojica hmotné+procesné (`dual`, `duels.js:240-242`) nedotknutá. *Over, kde všade sa ten dlhý názov zobrazuje.*

### 3. Bifľovačka — menšie dlaždice
Zmenšiť progres-dlaždice v karte Bifľovačka (`#memoryTrainerTiles`, `renderMemoryTiles()`). Len veľkosť/odsadenie, vzhľad (farby, zaoblenie) nechať.

### 4. Rebríček pojednávaní + Senáty vedľa seba
`#leaderboardSection` a `#senatyCard` dať **do jedného riadka vedľa seba** (dnes sú pod sebou, každý 708 px v ľavom stĺpci). Tým sa zúžia.
- ⚠️ **Pozor na `display:contents`:** ak ich dáš do spoločného kontajnera (wrapper/sub-grid), rozbiješ mobilný `order` reťazec `.left`. Rieš to tak, aby na **mobile ostali pod sebou** a poradie/bottom-nav sedeli. Otestuj oba breakpointy.
- ⚠️ **Filter rebríčka** (`previousElementSibling` + texty) sa nesmie rozbiť — štruktúra filter-riadok → zoznam ostáva.

### 5. Rebríček — TOP 3 + skrolovanie
V rebríčku zobraziť **prvé 3 miesta**, zvyšok v **skrolovateľnej oblasti** (`max-height` + `overflow-y` na kontajneri **riadkov**, nie na filtri). Zníži to výšku karty. Platí pre všetky režimy (Jednotlivci/Senáty/Fakulty).

### 6. Prehodiť poradie svetov: Súťaž a komunita NAD Tréningy
V ľavom stĺpci nové poradie: **Súťaž a komunita → Tréningy → Servis** (Aréna ostáva vpravo). Uprav `order` pravidlá príslušných svetov + nadpisov, **mobilný lineárny sled** aj **bottom-nav** ciele. Otestuj desktop aj mobil.

---

## 7. Až potom (nie v tomto kole)
Po bodoch 4–6 posúdiť **vyrovnanie stĺpcov** (aby ľavý nebol výrazne dlhší/kratší než pravý). Pravdepodobne sa čiastočne vyrieši samo (4+5 skrátia ľavý). Ak nie, doladíme samostatne — **nič nerob dopredu**, počkaj na Babin pohľad naživo.

## Čo NErobiť
- Nemeniť vzhľad dlaždíc nad rámec bodov 3–5. Nepremenúvať hooky. Nerozbiť filter rebríčka, bottom-nav ani mobilné poradie.
- Nerobiť zvyšok Stopy C (vlajková loď, lišta, onboarding) — stále čaká.

## Protokol prenosu (po každom bode)
Commit + správa · čo a kde (`súbor:riadok`) · potvrdenie, že vzhľad/tmavý režim sedí · čo si otestoval (desktop + mobil, filter rebríčka, bottom-nav, zbaliteľné sekcie) · otvorené otázky.
