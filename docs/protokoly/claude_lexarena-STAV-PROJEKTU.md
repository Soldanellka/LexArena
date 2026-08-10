# LexArena — stav projektu (súhrn k augustu 2026)

> **Načo je tento dokument:** jediný prehľadný súhrn celej prestavby UI — od diagnostiky po nasadenie. Nahrádza potrebu držať v projekte pätnásť čiastkových súborov; s týmto jedným sa dá pokračovať v ktoromkoľvek novom čete. Detailné protokoly ostávajú ako história (zoznam na konci).

---

## 1. Čo je LexArena a čo sme riešili
LexArena (lexarena.sk) je hravá appka na prípravu na štátnice z práva — pojednávania, senáty, rebríček, bifľovačka, štátnicová sieň. Zadanie od Babu: **upratať hlavnú stránku** — rozdeliť marketingovo, upozorniť na funkcie, logicky pospájať, zvýšiť prehľadnosť. **Netýka sa obsahu (právo), len štruktúry a UI.**

Postup, ktorý sme zvolili: najprv diagnostika (technická + funkčná), potom návrh na papieri, potom prestavba v etapách so samostatnými commitmi a textovým protokolom po každom kroku.

---

## 2. Architektúra: tri svety
Appka nie je 20 rovnocenných sekcií, ale **tri prirodzené svety**, ktoré predtým vyzerali ako jeden zoznam:

1. **⚔️ Aréna** — všetko okolo **vybranej dvojice okruhov**: pojednávanie + hry (Kartičky, Prípady, Štátnica) + register uložených výziev.
2. **📚 Tréningy** — samostatné, každý s vlastným výberom: Študijné moduly, Bifľovačka, Štruktúra otázok (pavúk), Judikatúra, Môj progres.
3. **🏛️ Súťaž a komunita** — Rebríček, Senáty, Súdna sieň (nahlásenia + pečate), Tvoj názor, Nástenka, Návody.
+ **🧰 Servis** — Účet a Obchod.

**Kľúčový princíp: DÔRAZ, NIE SŤAHOVANIE.** Telo ostalo v terajšom rozložení a v pôvodnom dizajne (dlaždice, karty, farby, tmavý režim sa nemenili) — upratalo sa poradím, nadpismi svetov a stavmi, nie prekopaním.

**Nedotknuteľný celok Sveta 1:** výber oblasti v pojednávaní (`__selectedOkruhPair → __area*ForGames`) živí Kartičky, Prípady aj Štátnicu. Nerozdeľuje sa, nenahrádza globálnym pickerom.

---

## 3. Zamknuté rozhodnutia
- **Rímske právo + Dejiny práva:** obsah 0 otázok → chipy ostávajú, ale **viditeľne vypnuté so stavom „pripravuje sa"** (obsah pribudne neskôr).
- **Obchod:** mŕtve UI + testovacia fáza zadarmo → stlmený na **„čoskoro"** (predaj § pribudne, keď sa appka chytí).
- **Prípady z praxe:** doplnené **§ + energia** ako ostatné hry (bola to regresia).
- **Register pojednávaní:** **ostáva otvorená burza** — vidno aj cudzie výzvy, aby sa dala prijať výzva od kohokoľvek. Opravené len proti mazaniu cudzích výziev. Vlastnú výzvu vieš poslať linkom.
- **Rebríček + Senáty:** patria do Sveta 3.
- **Dizajn dlaždíc a stránky sa nemení** — jediný povolený úzky zásah boli nadpisy svetov + stlmený vzhľad vypnutých stavov.

---

## 4. Čo je nasadené (živé na lexarena.sk)
Rozsah `4e094aa..5a7cd49`, 13 commitov, overené na produkcii.

**Opravy funkčnosti (Stopa A):**
- Prípady dávajú § a berú energiu (−4 %).
- Výsledok duelu sa zobrazí obom hráčom; tvorca výzvy dostane výsledok pri ďalšej návšteve (max 3 okná naraz, okno 7 dní).
- Register: cudzie výzvy sa už nedajú mazať z DB (len skryť u seba).
- Moduly pripíšu sľúbený § (opravený most `econBridgeAward`).
- Kvíz sa nedá odkliknúť dvakrát (koniec dvojitého skórovania).
- Bifľovačka počíta percentá zo správneho menovateľa (×3 namiesto ×5).

**Prestavba (Stopa B + úzka C):**
- Tri svety s nadpismi. Desktop: Aréna vpravo, vľavo Tréningy → Súťaž a komunita → Servis. Mobil: lineárne v tom istom poradí.
- Rímske/Dejiny vypnuté, Obchod „čoskoro" — funguje vo svetlom aj tmavom režime (vypnutý chip cez `grayscale`, aby sedel v oboch témach).
- Odstránená mŕtva karta „Výzvy od spoluhráčov".

---

## 5. Model práv obsahu (rozpracované — NIE je ešte postavené)
Cieľ: kto smie meniť obsah otázok a ako sa to označuje.

- **Študent** — otázky nemení, len **nahlasuje** → nahlásenie ide do **Súdnej siene**, zbiera lajky 👍. Za schválené nahlásenia zbiera **pečate** (strieborná za schválené; prah sa zdvihne, čísla doladiť).
- **Garant** — **mení otázky**; každá zmena s **pečaťou + dátumom**, viditeľná všetkým. Schvaľuje nahlásenia → zobrazí sa **nick študenta + „schválené garantom" + nick garanta + pečať**.
- **Admin (Babu)** — schvaľuje **neviditeľne**: verejne sa ukáže **len nick študenta** (+ dátum), žiadny podpis admina. Ani vlastné schválenie sa nepodpisuje.

**Otvorená otázka (blokuje spísanie zadania):** upravuje Babu otázky **aj priamo** (ako garant), alebo len schvaľuje? Ak priamo upravuje — má byť tá zmena **súkromný draft, ktorý potom zverejní**, alebo **navždy len jej**? Väčšina mechaniky (nahlásenie → hlasovanie → schválenie → pečať) už v appke existuje; ide o doladenie atribúcie a súkromnej vrstvy.

---

## 6. Otvorené / nezačaté (čaká na Babu, nič súrne)
- **Šírka Senátov a Judikatúry** — po presune do Sveta 3 sú v ľavom stĺpci širšie (708 px namiesto 420). Posúdiť naživo; vrátiť sa dá lacno.
- **Zvyšok Stopy C** (dotýka sa vzhľadu, len po odsúhlasení): **vlajková loď** (povýšiť Štátnicovú sieň), **konsolidácia lišty** (avatar+paleta, § + Získaj §, energia, 👋+ℹ️ do „Pomoci"), **onboarding** (uvítacie okno ako pozvánka; doplniť chýbajúce sekcie návodu).
- **Model práv obsahu** — po zodpovedaní otázky z bodu 5 → zadanie pre Code.
- **Štátnicové podklady z A1–A4** (Trestné hmotné) — Babu dodá summary (sem alebo cez Code z repa), z nich sa spravia štátnicové podklady (téma, kľúčové body, doplňujúce otázky, časté chyby).

---

## 7. Čo sledovať prvé dni po nasadení
- Hráči s dokončenými výzvami z posledných 7 dní dostanú pri otvorení výsledkové okno (max 3 naraz). Zámer; zúženie je jednoriadková zmena.
- Prípady po novom strhávajú energiu → u aktívnych hráčov mierne stúpne spotreba.

---

## 8. Technické mantinely (platia pre každú ďalšiu zmenu)
- Dizajn (dlaždice, karty, farby, tiene, tmavý režim) sa nemení bez výslovného súhlasu.
- JS hooky (ID/triedy/`data-*`/`window.*`) sa nepremenúvajú; bezmenným kartám sa ID pridáva.
- Karty sa neobaľujú do nových zónových divov (mobil `display:contents` + `order`); zoskupenie sa rieši poradím + nadpismi ako súrodencami.
- Nedotýkať sa filtra rebríčka (`leaderboard.js` mapuje chipy podľa textu a pozície) ani `bottom-nav` cieľov bez aktualizácie.
- Každá etapa = samostatný commit + textový protokol.

---

## 9. Zdrojové súbory (detail, ak treba dohľadať)
Diagnostiky: `claude_lexarena-diagnostika-vystup-od-code.md` (technická), `claude_lexarena-funkcna-diagnostika-vystup-od-code.md` (funkčná — úplná mapa, čo appka vie).
Návrh: `claude_lexarena-ui-upratanie-navrh-v2.md`.
Zadania: `claude_lexarena-prestavba-zadanie-pre-code.md`, `claude_lexarena-rozhodnutia-stopa-B.md`, `claude_lexarena-nadpisy-stavy-zadanie.md`.
Protokoly: `...-protokol-stopa-A.md`, `...-stopa-B.md`, `...-stopa-C-nadpisy-stavy.md`, `...-nasadenie-potvrdenie.md`.
Náhľady (mockupy): `claude_lexarena-nahlad-povodny-dizajn.html` a staršie verzie.
