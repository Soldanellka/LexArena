# LexArena — funkčná diagnostika (výstup od Code)

> **Fáza:** funkčná diagnostika hotová (len čítanie — 5 paralelných auditov + overenie v bežiacej appke, nič sa nemenilo). Nadväzuje na `claude_lexarena-funkcna-diagnostika-zadanie-pre-code.md` a dopĺňa technickú `claude_lexarena-diagnostika-vystup-od-code.md`.
> **Účel:** úplná mapa toho, čo appka reálne vie a aké voľby ponúka — podklad pre redizajn s marketingovým dôrazom.

## TL;DR pre redizajn
Appka má **tri nezávislé svety**, ktoré dnes vyzerajú ako jeden zoznam: (1) **aréna** okolo vybranej dvojice okruhov, (2) **samostatné tréningy** s vlastným výberom oblasti (Bifľovačka, Pavúk, Moduly, Judikatúra), (3) **súťažná/komunitná vrstva**. Najsilnejšia vec, ktorú appka vie — **hlasová štátnicová skúška pred komisiou s LLM hodnotením** — je schovaná ako piate tlačidlo v karte „Hry a prípady". Plus **7 mŕtvych/nefunkčných miest**, ktoré v redizajne netreba prekresľovať, ale odstrániť.

---

## 1. Výber oblasti → režimy (jadro loopu)

**Oblasti** (chipy `#areasList`): 6 chipov z `duelAreas` (`areas.js:13-20`) — Pracovné, Trestné, Rímske, Občianske, Dejiny práva, Európske.

> ⚠️ **ZISTENIE:** dva chipy sú **prázdne**. Overené v bežiacej appke: **Rímske právo = 0 otázok, Dejiny práva = 0 otázok** (`pickOkruhPair` vracia `empty: true`). `data.js:219-258` načítava len 6 dátových oblastí a tie dve medzi nimi nie sú. Klik → „obsah sa ešte pripravuje" + nefunkčné tlačidlo. Reálne funkčné: Pracovné (250), Trestné (150+150), Občianske (200+225), Európske (190).

**Režimy `#okruhModePicker`** (`app.js:49-53`) — presne tri (pozn.: nie „na rozvoj", ale „Na precvičenie"):

| Režim | Čo robí | Kód |
|-------|---------|-----|
| 🎲 Náhodne (default) | Náhodná dvojica z celej oblasti | `duels.js:155` |
| 📗 Preštudované | Len okruhy, kde má hráč z kvízu ≥ 60 % | `duels.js:157-163` |
| 📕 Na precvičenie | Relatívne najslabšie: slabé → nedotknuté → silné | `duels.js:165-177` |

Voľba režimu **prežíva prepnutie oblasti** (`app.js:47`). Ak filtrovaná množina vyjde prázdna, ticho spadne na náhodný výber + vysvetlenie v hinte (`app.js:120-128`).

**Mechanika dvojíc** — `pickOkruhPair` (`duels.js:190`), tri štruktúry (`duels.js:94-107`):
- **pair** (Pracovné, Európske) — susedné dvojice A1+A2, A3+A4 … nepárny posledný sa vynechá (`duels.js:76-82`);
- **dual** (Trestné, Občianske) — potvrdený špeciál: 1 náhodný okruh z hmotného (max 5 otázok) + 1 z procesného (max 5) (`duels.js:240-242`). Platí pre **obe** oblasti, nielen Občianske;
- **flat** (zvyšok) — náhodných 10, dnes len prázdne Rímske/Dejiny.

Výsledok → `window.__selectedOkruhPair` + `__areaQuestionsForGames` / `__areaTilesForGames` / `__areaCasesForGames` (`app.js:207-210`).

**Kto dvojicu konzumuje:** Pojednávanie, Kartičky, Prípady, Štátnicová sieň.
**Kto NIE:** Bifľovačka, Pavúk, Judikatúra, Študijné moduly, Senáty — vlastný výber oblasti alebo úplná nezávislosť.

---

## 2. Herný loop na vybranej dvojici

| | Pojednávanie | Kartičky | Prípady | Štátnicová sieň |
|---|---|---|---|---|
| **Účel** | Súťažný kvíz, dá sa poslať súperovi | Spájanie pojem ↔ definícia | Viackrokové scenáre z praxe | Nácvik ústnej štátnice pred komisiou |
| **Vstup** | `#startQuizBtn` (disabled kým nie je oblasť) | `#openMemoryBtn` | `#openCasesBtn` | `#openStatniceBtn` |
| **Podmienky** | oblasť + energia > 0 | oblasť + energia | oblasť + energia | oblasť + nick + 15 § + oblasť v allow-liste |
| **Voľby vnútri** | 💡 nápoveda 50:50 (3 §, raz/otázku), predch./ďalšia, ✕ zrušiť, ⚖️ nahlásiť, 🏅 pečať | 🔀 zamiešať (zadarmo), režim Tréning / Skúška | ← → medzi prípadmi, ⚖️ nahlásiť na krok | persóna skúšajúceho (⚖️ Prísny / 🤝 Podporujúci / 📊 Racionálny), hlas (m/ž/vyp.), reč vs. písanie, 💡 nápoveda (zhoršuje známku) |
| **Rozsah** | 10 otázok (5+5 pri dual) | max 8 párov / 16 kariet | 2–5 krokov na prípad | 2 témy, 5 min príprava, max 2 doplňujúce otázky/tému |
| **Odmena** | výhra +7 §, remíza +3 §, prehra 0 §; energia −5 % | perfektná sada +5 §; energia −2 % | ⚠️ nič (viď nižšie) | známka 1→+25 §, 2→+15 §, 3→+8 §, 4→0 § (mimo denného stropu) |
| **Stavy** | prázdny: disabled + hint; koniec: len toast, žiadna výsledovka | timer, „Páry n/m", úspešnosť % | „Prípad i/n", per-krok ✅/❌ + vysvetlenie | príprava → vyzvanie → počúvanie → hodnotenie → verdikt s rozpisom |
| **Marketingový hák** | súťaž, zdieľateľná výzva | rýchla výhra pre nováčika | najbližšie reálnej praxi | **najsilnejší produkt celej appky** |

> ⚠️ **ZISTENIE — Prípady dnes nič nedávajú.** Odmeny `CASES_SET` (+5 §) a `CASES_PERFECT` (+10 §) aj energia sa strhávajú iba v legacy `submitCase()` (`cases.js:183-199`) nad `window.cases` — to appka nikdy nenaplní (`data.js` plní `window.areaCases`). Živá cesta `loadCasesFromJson` nevolá `econAward`/`econEnergy`. Hráč hrá prípady zadarmo a bez odmeny.

> ⚠️ **ZISTENIE — vstupné 5 § za kvíz sa nikdy neúčtuje.** `quiz.js startQuiz()` (berie `QUIZ_ENTRY` 5 §, dáva `QUIZ_PLAYED` +1 §) nemá v hlavnej appke volajúceho — všetko ide cez `startDuel` (`app.js:224-227`).

> ⚠️ **ZISTENIE — hodnotenie sa dá obísť.** Tlačidlá odpovedí sa „zamykajú" cez `onclick = null`, ale handler bol pripojený `addEventListener` (`quiz.js:298` vs `quiz.js:131`) — dajú sa klikať ďalej a skóre rastie. To isté cez „Predchádzajúca".

---

## 3. „Vlastný svet" — mimo dvojice

**🕸️ Štruktúra otázok (pavúk)** — vlastný výber oblasti, 4 úrovne: oblasti → (mapa klastrov Z1 → okruhy Z2) alebo plochý zoznam → strom okruhu Z3 (centrum → vetvy → listy, klik na list = definícia). Plus „⇄ Súvisí s" (prepojenia z `_map.json`, dá sa nimi skákať).

**Päť hier v pavúku** (`spiderGames.js`) — asi najskrytejší obsah v celej appke:

| Hra | Čo hráč robí | Skóre | Odmena | Odkiaľ |
|-----|--------------|-------|--------|--------|
| 🐦 Kukučka | Nájsť „votrelca" — list z iného okruhu | 5 kôl | 5/5 → 2 §, 4/5 → 1 § | strom Z3 |
| 🧩 Rozpárovanie | Roztriediť pomiešané listy dvoch vetiev | 5 kôl | 5/5 → 3 §, 4/5 → 1 § | strom Z3 |
| 🧭 Kde som? | Podľa vetvy a listov uhádnuť klaster → okruh | 5 kôl, 0–10 b. | 10 → 2 §, 8–9 → 1 § | mapa Z1 |
| 🧠 Recall | Odkrývať vetvy po pamäti, self-scoring; klik/hlas | vetvy ✓/✗ | tréning, 0 § | strom Z3 |
| ⚡ Blesk | To isté + časovaná študijná fáza | vetvy ✓/✗ | tréning, 0 § | strom Z3 |

Spoločný strop: **3 odmenené sedenia/deň**, energia −2 %/sedenie.

> ⚠️ **ZISTENIE — hry existujú len pre 3 zo 6 oblastí.** Vyžadujú autorské pole `spider` v `A*.json` + `_map.json`: majú ho **Pracovné, Občianske hmotné aj procesné**. Trestné (hmotné aj procesné) a Európske nemajú ani jedno → plochý zoznam, núdzový strom z kartičiek, hry sa neponúknu. Navyše hry sa montujú len pri vstupe **z mapy**, nie z plochého zoznamu (`spiderMap.js:552`).

**📊 Môj progres (dashboard)** — 4 záložky oblastí; per okruh percento = nevážený priemer aktivít, ktoré preň existujú (kvíz, kartičky, prípady, štátnica, bifľovačka) (`dashboardStats.js:133-161`). Sekcie: zoznam tém s náladovým avatarom (spí <30 %, unavený 30–80 %, plný elánu >80 %), zbaliteľné „Čo dobrať" (témy <80 % + čo presne chýba), detail okruhu, „⚖️ Skúšky" s históriou známok. Odmeny — jednorazové míľniky: 30 % → +1 §, 50 % → +2 §, 80 % → +5 §, celá oblasť 100 % → +50 § (`economyConfig.js:180-183`).

---

## 4. Bifľovačka

Úplne samostatný svet — vlastná stránka `memory-trainer.html`, **vlastný výber oblasti** (6 dlaždíc), nezávisí od chipu na hlavnej stránke.

**Loop:** definícia → hráč si ju zapamätá → „Zapamätal/a som si ✅" → napíše/nadiktuje (🎤 reč) → dostane %.

**Hodnotenie** (`memoryTrainer.js:190-219`): Levenshtein 0,35 + Jaro-Winkler 0,25 + pokrytie kľúčových slov 0,30 + poradie 0,10. Prah postupu = 50 %, prah odmeny = 80 %.

**Voľby:** 🔊 prečítať nahlas (zadarmo), ▶️ video režim (1. pozretie zadarmo, 2. za 2 §, max 2), 🎬 YouTube (ak priradil admin), 4 žolíky: 🃏 Kostra (3 §), 🔤 Iniciály (2 §), 🔊 Vypočuť (1 §), 🔁 Video znova (2 §). Max 1 textový žolík na definíciu.

**Video režim = skrytý klenot:** talárový avatar-moderátor po strane, text sa odkrýva synchronizovane s hlasom, moderátor postupne unavuje a v 2. pozretí **zaspáva** (hlas stíchne, obrazovka tmavne). Prepínače: pauza, mute, m/ž hlas, písmenkový vs. vetný režim (`biflovackaVideo.js:264-278`).

**Odmeny:** +2 § za kartu ≥ 80 %, +10 § za celú oblasť + odomknutie pečate (🥇 ≥90 % / 🥈 ≥75 % / 🥉) + odznak „🎓 Pripravený na štátnice". Energia −1 %/karta.

**Dáta:** 5 oblastí má ručné súbory (3 definície/okruh: Pracovné 150, Občianske 120+135, Trestné 90+90), Európske sa generuje z kvízov.

> ⚠️ **ZISTENIE — čísla na dlaždici klamú.** Menovateľ = okruhy × 5 (`memoryTrainer.js:414`), ale reálne sú 3 definície/okruh. Pracovné ukazuje na dlaždici x/250, vnútri x/150 — percentá na dashboarde sú systematicky podhodnotené.

**Garant:** „🔍 Režim kontroly" — oprava otázky/odpovede/povinného zdroja → override s pečaťou „🎓 Overené · nick". Export (admin) stiahne JSON opráv.

---

## 5. Študijné moduly

Funkčný rozdiel oproti hrám na hlavnej stránke: modul je **samostatná stránka**, kam appka odnaviguje (to isté okno), **bez energie, bez časovača, neobmedzené opakovanie**, začína **teóriou**, nie otázkou.

| Typ | Moduly | Čo hráč dostane |
|-----|--------|-----------------|
| **Moderné** (spoločný engine) | Pracovné, Trestné, Občianske, Európske | Zoznam okruhov s progresom → teória + zdroj → inline pavúk → kvíz → po dokončení sa odomknú Výsledky / Kartičky / Prípady. Okruh hotový pri kvíze ≥ 60 %. Zapisujú progres späť do appky. |
| **Staršie samostatné** | Občan – teória+veľký kvíz, TREST Veľký KVÍZ, Trestné – spájačka, Trestné – teória a prípady | Izolované mini-appky: prehliadač teórie / dlhý kvíz / spájačka (3 stĺpce: otázka ↔ definícia ↔ príklad). Nepoznajú nick, nezapisujú progres, nedávajú §. |

> ⚠️ **ZISTENIE — sľúbené „+1 § za dokončenie okruhu" sa nikdy nepripíše.** Moderné moduly udeľujú § cez `window.opener.econBridgeAward` (`engine.js:142-155`), ale katalóg otvára moduly cez `window.location.href` v tom istom okne (`data.js:286`) — `window.opener` je `null`, odmena prepadne. Progres sa zapisuje správne (priamo do Firebase).

---

## 6. Judikatúra NS SR

Kurátorovaný zoznam **8 štátnicových inštitútov** (Ohrozenie pod vplyvom návykovej látky, Podmienečné prepustenie, Bezdôvodné obohatenie, Vydržanie, Neplatnosť právneho úkonu, Neodkladné opatrenie, Skončenie a Okamžité skončenie pracovného pomeru) — `judikaturaConfig.js:30-81`. Klik → cez proxy max 15 reálnych rozhodnutí NS SR (spisová značka, meritum, dátum, kolégium, odkaz na originál).

Nezávislé od vybranej oblasti, **žiadne filtre, žiadne vyhľadávanie, žiadne §, žiadna energia** — čisto študijný nástroj. Jediná voľba: ktorý inštitút rozbaliť.

---

## 7. Súťažná vrstva

**Pojednávanie proti hráčovi:** hráč odohrá 10 otázok → až na konci vznikne záznam vo Firebase → 📤 Poslať vytvorí link `?duel=ID` + text do schránky. Príjemca vidí „⚔️ {nick} ťa vyzýva…", zadá nick, hrá tie isté otázky. Víťaz = viac správnych; remíza pri zhode. Odmeny: +7 / +3 / 0 §; prijatie linkom +7 § (nový hráč) alebo +1 §.

> ⚠️ **ZISTENIE — výsledok duelu sa nikde nezobrazí.** `duels/{id}.result` sa zapíše, ale žiadne UI ho nečíta. Víťaza sa hráč dozvie len z rebríčka.

**Register pojednávaní** — > ⚠️ **ZISTENIE:** ukazuje **cudzie výzvy všetkých hráčov** (globálny pending < 24 h), nie „moje uložené". Tlačidlá Prijať (+1 §) a **Odmietnuť — to výzvu natvrdo zmaže z databázy komukoľvek.**

**Senáty** — tímy 3–5, max 2/hráča. Založenie → link → pri 3 členoch „🟢 Súťažný" (predseda +10 §, člen +5 §, nový cez link +7 §). Spor: predseda vyzve iný senát, všetci do 48 h odohrajú tie isté otázky, počíta sa priemer (nehral = 0), kvórum = polovica. Výhra +3 body a +15 §/člen, remíza +1/+6 §, prehra +2 § útecha.

**Rebríček** — 3 režimy: Jednotlivci (body = správne z dokončených duelov; filtre Týždeň/Mesiac/Všetko), Senáty (body zo sporov), Fakulty (priemer na aktívneho hráča). Odmeny: týždeň 50/30/10 §, mesiac 200/100/50 §, senáty 40/25/10 a 150/80/40 §, víťazná fakulta +20 §/hráč + putovná pečať na mesiac.

---

## 8. Ekonomika a motivácia

**Zdroje §:** duel 7/3/0 · prijatie výzvy 7/1 · kartičky perfektná 5 · bifľovačka 2/karta + 10/oblasť · štátnica 25/15/8 · pavúčie hry 1–3 (max 3×/deň) · dashboard míľniky 1/2/5 a 50/oblasť · streak 1–7/deň + bonusy 10 a 50 · rebríčky 50/30/10 a 200/100/50 · senáty 10/5/7/15/6/2 + rebríčkové · fakulta 20 · náukové videá 3× po 12 § · reklama 3 § (max 3×/deň) · promo kód · test od garanta 15/10/5/2 · schválené nahlásenie 2 §. **Denný strop 60 §**, ale streak, rebríčky, videá, štátnica, senáty, fakulty a dashboard ho obchádzajú.

**Sinky:** kŕmenie avatara 12 § · štátnica 15 § · žolíky 1–3 § · video znova 2 § · nápoveda 50:50 3 § · streak shield 5 § · taláre 200–1000 §.

> ⚠️ **ZISTENIE — reálny sink je dnes hlavne kŕmenie avatara a štátnica.** Taláre sú jediná veľká kúpa, ale kupujú sa v **profilovom modáli, nie v „Obchode"**. Obchod je mŕtvy: `buy20`, `buyPremium`, `openShop` bez handlera (potvrdené grepom) — podľa názvov mali predávať +20 § a PREMIUM za skutočné peniaze (`PACKS` v configu existuje, komentár „pripraviť, NEZOBRAZOVAŤ v UI").

**Energia:** 0–100 %, klesá hraním (duel −5, kartičky −2, prípady −4 (neúčtuje sa), bifľovačka −1/karta, pavúčie hry −2). Pri 0 % avatar zaspí, hrať sa nedá kým nenakŕmiš (12 §). Avatar mení výzor podľa energie.

**Streak:** +1 až +7 §/deň (deň 8+ = 7 §/deň), míľniky deň 7 → +10 §, deň 30 → +50 §. Vynechaný deň resetuje, ak nemáš štít (5 §).

> ⚠️ **ZISTENIE — sledovanie videí a reklám nikto neoveruje.** Odmena sa odomkne obyčajným `setTimeout` (5 s návody, 20 s reklama), YouTube iframe neposiela potvrdenie.

---

## 9. Súdna sieň a komunita

**Tok nahlásenia:** chyba (tlačidlo pri otázke v kvíze, pri krokoch prípadov aj v bifľovačke) → oblasť, číslo otázky, typ (nesprávna odpoveď / zastaraná info / nejasné znenie / iné), právna argumentácia min. 50 znakov + povinný zdroj → do Súdnej siene, kde ostatní hlasujú 👍/👎 a komentujú → garant/admin vydá verdikt s odôvodnením pre celú komunitu → autor +2 §.

**Pečate:** 🥉 za 1 schválené nahlásenie, 🥈 za 5, 🥇 za 15, 🎓 akademická (garant automaticky), 🏛️ putovná fakultná. Pečať sa zobrazí aj pri auditovanej otázke („Auditované · nick") — signál dôveryhodnosti obsahu.

**Tvoj názor** (Nápad / Chyba / Pochvala, max 500 znakov) → `feedback` → admin môže zverejniť → **Nástenka komunity** aj s odpoveďou admina.

---

## 10. Role z pohľadu funkcií

| | Študent | Garant | Admin |
|---|---|---|---|
| Hry, bifľovačka, moduly, senáty | ✅ | ✅ | ✅ (všetko zadarmo, bez stropu) |
| Nahlasovať chyby, hlasovať | ✅ | ✅ | ✅ |
| Vydávať verdikty v Súdnej sieni | ❌ | ✅ (nie na vlastné) | ✅ |
| Opravovať obsah (otázky, definície, pavúk) | ❌ | ✅ + pečať | ✅ |
| Skupiny a testy | vidí len svoje členstvo a skóre | ✅ | ✅ |
| Rozdávať § | ❌ | ✅ max 50 §/deň | ✅ neobmedzene |
| Promo kódy, návštevnosť, GitHub sync, videá k definíciám, export opráv, nastavovanie garantov | ❌ | ❌ | ✅ |

**Neviditeľné pre bežného hráča:** celý admin/garant panel, editor pavúka, režim kontroly v bifľovačke, výsledky testov skupiny.

---

## 11. Onboarding

**👋 Uvítacie okno** (auto pri 1. návšteve): 5 odstavcov — čo LexArena je, testovacia fáza a §, poďakovanie, súkromie/prezývka, disclaimer. Tlačidlá: Otvoriť nástenku + Rozumiem.

**ℹ️ Návod** — 12 rozklikávacích sekcií: Čo je LexArena · Pojednávanie · Kartičky a Prípady · Štátnicová sieň · Bifľovačka · Pavúkové hry · Energia a avatar · Denný streak · Rebríčky · Súdna sieň a pečate · Ako získať § · Roly. Čísla sa ťahajú živo z configu.

**Čo nováčik z toho nedostane:**
- ⚠️ nikde sa nevysvetľuje **výber oblasti a tri režimy** 🎲/📗/📕 — pritom je to vstupná brána do celého loopu;
- **Judikatúra** nie je v návode vôbec;
- **Študijné moduly** nie sú v návode vôbec (a sú prvá karta na stránke);
- **Senáty, skupiny/testy, dashboard míľniky** chýbajú;
- uvítacie okno nepovie, **čo tu hráč môže robiť** — je to súhlas s podmienkami, nie pozvánka.

---

## 12. Marketingový sumár

### ZISTENIA — jadro vs. periféria
- **Denný loop** (opakovane): výber oblasti → Pojednávanie → Kartičky/Prípady · Bifľovačka · streak a energia · rebríček.
- **Míľnikové** (občas, silné): Štátnicová sieň · dashboard · senátny spor.
- **Periférne:** Judikatúra · staršie samostatné moduly · Nástenka.

### ZISTENIA — skryté klenoty
- **Štátnicová sieň** — hlasová skúška pred trojčlennou komisiou, tri persóny, LLM hodnotenie s rozpisom „čo si pokryl / čo chýba / čo vecne zle", známka 1–4. Jediná vec, ktorú konkurencia nemá — a je to piate tlačidlo v karte „Hry a prípady".
- **Video režim bifľovačky** — talárový moderátor, ktorý pri 2. pozretí zaspáva. Nikde nespomenutý.
- **Pavúčie hry** — päť hier, tri kliknutia hlboko, len pre 3 oblasti.
- **„Čo dobrať" v dashboarde** — appka presne povie, ktorá téma je slabá a čo v nej chýba. Zbalené, pod modálom.
- **Audit obsahu komunitou + pečate** — dôveryhodnosť obsahu je pri práve predajný argument; dnes len malá karta „Právna nezrovnalosť".

### ZISTENIA — hluché miesta (neprekresľovať, ale riešiť)

| Čo | Stav |
|----|------|
| Chipy Rímske právo a Dejiny práva | 0 otázok — klik do slepej uličky |
| Obchod (3 tlačidlá) | bez handlerov, nič nerobia |
| Výzvy od spoluhráčov (karta) | bez handlerov, natrvalo skrytá |
| Prípady z praxe | žiadne § ani energia |
| +1 § za okruh v moduloch | nikdy sa nepripíše |
| Výsledok duelu | zapíše sa, nikde sa nezobrazí |
| Register pojednávaní | ukazuje cudzie výzvy, ktokoľvek ich vie zmazať |

### NÁVRH — čo by nováčika chytilo
Nie zoznam nástrojov, ale jeden konkrétny sľub: **„Vyskúšaj si štátnicu nanečisto — komisia ťa vypočuje a povie ti známku."** Emocionálne aj funkčne najsilnejšie, čo appka vie, a presne to, čoho sa študent práva najviac bojí. Druhý v poradí: **súboj so spolužiakom cez link** — nulová bariéra, príjemca nič neinštaluje.

### NÁVRH — poradie priorít pre redizajn
1. **Štátnicová sieň** — vypichnúť ako vlajkovú loď, nie tlačidlo medzi hrami. Unikátna, emocionálne najsilnejšia, jasná cena (15 §) aj odmena (až 25 §), hotová pre 3 oblasti.
2. **Pojednávanie + zdieľateľná výzva** — jadro denného loopu a jediný viralitný kanál (pozvánka od kamaráta, nie z reklamy). Chýba mu len výsledková obrazovka.
3. **Výber oblasti + tri režimy** — povýšiť z „chipov v karte kvízu" na vedomý prvý krok. Riadi štyri funkcie naraz a dnes ho nikto nevysvetlí; 📕 Na precvičenie = „appka mi vyberie, čo mi nejde" — predajné.
4. **Bifľovačka** — najlepší denný návyk (krátke dávky, hlas, funguje aj cestou). Jediná funkcia použiteľná bez rúk a plnej pozornosti.
5. **Môj progres** — dôkaz, že to funguje, + prirodzený ťah späť („ešte 3 témy do 100 % a máš +50 §").

**Čo stlmiť/skryť:** Obchod (kým nefunguje), Judikatúru (silná, ale úzka — do študovne, nie na úvod), staršie samostatné moduly (bez progresu a identity — pod „ďalší obsah"), Nástenku a Tvoj názor (dôležité, nie prvý dojem), Register pojednávaní (v dnešnej podobe skôr mätie).

---

## Otvorené otázky (Code nevie rozhodnúť z kódu — pre Babu)
1. Majú **Rímske právo a Dejiny práva** pribudnúť obsahovo, alebo sa chipy majú odstrániť?
2. Mal **Obchod** predávať § za peniaze (v configu balíčky 1,99–9,99 €), alebo to bol len placeholder?
3. Sú **prípady bez odmeny** zámer, alebo regresia po prechode na JSON dáta?
