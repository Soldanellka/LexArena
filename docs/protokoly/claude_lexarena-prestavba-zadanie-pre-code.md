# LexArena — prestavbové zadanie pre Code (v etapách)

> **Cieľ:** upratať hlavnú stránku podľa `claude_lexarena-ui-upratanie-navrh-v2.md` a opraviť funkčné chyby z `claude_lexarena-funkcna-diagnostika-vystup-od-code.md` — **bez akejkoľvek zmeny dizajnu**.
> **Podklady:** technická diagnostika (`claude_lexarena-diagnostika-vystup-od-code.md`), funkčná diagnostika, návrh v2. Všetky ID/triedy/hooky ber odtiaľ.

---

## ⛔ TVRDÉ PRAVIDLÁ (platia pre všetky etapy)

1. **DIZAJN NEMENIŤ.** Pracuješ na existujúcom `styles.css`. **Nemeníš** farby, tiene, zaoblenia, veľkosti, vzhľad dlaždíc, kariet ani lišty. Karty a dlaždice sa presúvajú s **existujúcimi triedami** — musia vyzerať identicky ako teraz (svetlý aj tmavý režim). Ak niečo nemá triedu, priraď mu **existujúcu** triedu rovnakého typu, nevymýšľaj nový vzhľad.
2. **Hooky NEPREMENOVAŤ.** Žiadne ID/`class`/`data-*`/`window.*` zo zoznamu „NEPREMENOVAŤ" v technickej diagnostike sa nemení. Bezmenným kartám sa ID **pridáva**, nie prepisuje; triedy `.highlight-*` ostávajú.
3. **NEOBALOVAŤ karty do nových zónových `div`-ov.** To je najväčšie CSS riziko (mobil `display:contents` + `order` na konkrétnych ID). Zoskupenie do svetov rieš **preradením poradia + vloženými nadpismi ako súrodencami**, nie novým wrapperom. Ak by wrapper bol nevyhnutný, v tom istom commite prepíš aj mobilný `order` blok (`styles.css:1014`) aj `bottom-nav` ciele a otestuj oba breakpointy.
4. **Zviazaný celok Sveta 1 nechať pokope.** Výber oblasti v `#quizCard` (`renderAreas → __selectedOkruhPair → __area*ForGames`) živí `#gamesSection` (Kartičky, Prípady, Štátnica). Nesmie sa rozdeliť ani nahradiť globálnym pickerom.
5. **Etapy = samostatné commity.** Každá etapa vlastný commit s jasnou správou. Po každej otestuj desktop aj mobil. Žiadny `force push`. Výstup po každej etape vráť **ako text** (protokol prenosu, formát dole).
6. **Kde je správanie nejednoznačné, spýtaj sa — nehádaj.**

---

## Poradie etáp

Dve nezávislé stopy. **Stopa A (opravy)** nemení vzhľad vôbec a dá sa nasadiť samostatne. **Stopa B (preusporiadanie)** presúva bez prekresľovania. Ak treba, A a B môžu ísť oddelene.

---

## STOPA A — Opravy funkčnosti (žiadna zmena vzhľadu)

Každá oprava = vlastný commit. Vzhľad sa nedotýka; ide o JS/logiku.

### A1 — Prípady: dopojiť § a energiu
Živá cesta `loadCasesFromJson` neúčtuje odmenu ani energiu — visí v mŕtvej `submitCase()` (`cases.js:183-199`) nad `window.cases`, ktoré sa nikdy nenaplní. Dopoj na živú cestu: udeliť `CASES_SET` (+5 §) / `CASES_PERFECT` (+10 §) cez `econAward` a strhnúť energiu (−4 %) cez `econEnergy`, tak ako to robia Kartičky. (Rozhodnutie Babu: prípady majú byť komplet ako ostatné hry.)

### A2 — Výsledok duelu zobraziť
`duels/{id}.result` sa zapisuje, ale žiadne UI ho nečíta. Doplň výsledkovú obrazovku/toast po dohraní, ktorá prečíta výsledok a ukáže víťaza. (Ak treba dizajnový prvok, použi **existujúce** triedy modálu/toastu.)

### A3 — Register pojednávaní: bezpečnosť
Dnes ukazuje cudzie `pending` výzvy všetkých hráčov a „Odmietnuť" ich **natvrdo maže z DB komukoľvek**. Toto oprav prioritne: minimálne znemožniť mazanie cudzích výziev. Či má register ukazovať „moje uložené" namiesto cudzích — **potvrď s Babu** pred zmenou správania.

### A4 — Moduly: pripísať sľúbený §
Moderné moduly udeľujú § cez `window.opener.econBridgeAward` (`engine.js:142-155`), ale katalóg ich otvára cez `window.location.href` (`data.js:286`) → `window.opener` je `null`. Oprav most odmeny (napr. otvárať tak, aby `opener` existoval, alebo odmenu udeliť inou cestou). Progres sa zapisuje správne — nechať.

### A5 — Odstrániť mŕtve UI
- Karta **„Výzvy od spoluhráčov"** (`#incomingChallengeCard`, bez handlerov) — odstrániť.
- **Obchod** tlačidlá (`buy20`/`buyPremium`/`openShop`, bez handlerov) — riešia sa v B (stav „čoskoro"); logiku nechať vypnutú, kým sa Obchod nespustí.

### A6 — (voliteľné, potvrdiť prioritu) ďalšie chyby
- Kvíz: hodnotenie sa dá obísť (`onclick=null` vs `addEventListener`, `quiz.js:298`/`131`) — po zvolení odpovede reálne odpojiť listener.
- Bifľovačka dlaždica: menovateľ ×5 namiesto ×3 (`memoryTrainer.js:414`) — percentá podhodnotené.
- Video/reklama odmeny bez overenia (`setTimeout`) — nechať ako známy dlh, ak nie je priorita.

---

## STOPA B — Preusporiadanie do troch svetov (bez zmeny dizajnu)

### B1 — Pridať ID bezmenným kartám (neviditeľné, bezpečné)
Šesť–sedem kariet nemá ID (Bifľovačka, Obchod, Právna nezrovnalosť, Návody, Tvoj názor, Nástenka, Admin) — dnes sa selektujú cez `.highlight-*`. Pridaj im stabilné ID (napr. `#biflovackaCard`, `#reportCard`, `#videoCard`, `#feedbackCard`, `#noticeboardCard`, `#shopCard`). **Triedy `.highlight-*` ostávajú** (visia na nich mobilné zbaliteľné sekcie). Žiadna vizuálna zmena.

### B2 — Zoskupiť karty do troch svetov (preradením, nie wrapperom)
Cieľové poradie (marketingová chrbtica z návrhu v2), dosiahnuté **preradením poradia kariet a vložením nadpisov sekcií ako súrodencov** (nie obalov):

- **Svet 1 — Aréna:** `#quizCard` (výber oblasti + pojednávanie) → `#gamesSection` (hry) → `#duelBankCard` (register) → `#senatyCard`/`#leaderboardSection` ako súťažná časť *alebo* presunúť do Sveta 3 — **potvrď s Babu**, kam patrí rebríček/senáty.
- **Svet 2 — Tréningy:** `#tilesSection` (moduly) · Bifľovačka · `#judikaturaSection` (mountuje sa `afterend` za `#gamesSection` — pozor, pri presune Hier sa hýbe aj ona).
- **Svet 3 — Súťaž a komunita:** rebríček/senáty (ak sem) · `.highlight-report` (Súdna sieň) · Tvoj názor · Nástenka · Návody.
- **Servis:** Účet · Obchod.

Nadpisy svetov použijú **existujúci** typografický štýl nadpisov (žiadny nový vizuál). Po preradení **aktualizuj**:
- mobilný `order` blok (`styles.css:1014`) — poradie na mobile musí zodpovedať novému zoskupeniu;
- `bottom-nav` ciele (`data-target` na `#quizCard`/`#gamesSection`/`#leaderboardSection`);
- zoznam zbaliteľných sekcií v `mobile-nav.js` (triedy `.highlight-*` + prvý `h3`).
Otestuj oba breakpointy. **Filter rebríčka** (`leaderboard.js:172`, hľadá chipy cez `previousElementSibling` a mapuje podľa textu) sa nesmie rozbiť — medzi filter a zoznam nič nevkladať, texty tlačidiel nemeniť.

### B3 — Stavy „pripravuje sa" / „čoskoro" (drobné, existujúci štýl)
- Chipy **Rímske právo** a **Dejiny práva** (`areas.js:13-20`, 0 otázok): pridať vizuálny príznak „pripravuje sa" a **zablokovať klik do slepej uličky**. Použiť existujúci „muted/disabled" vzhľad, ak v `styles.css` je; ak nie je, **spýtaj sa** — nevymýšľaj nový štýl. (Obsah pribudne neskôr — chipy nezahadzovať.)
- **Obchod** (`#shopCard`): stav **„čoskoro"**, karta ostáva nenápadná, tlačidlá vypnuté. (Predaj § pribudne, keď sa appka chytí.)

---

## STOPA C — Dotýka sa vzhľadu (LEN po výslovnom odsúhlasení Babu)

Tieto tri veci menia vzhľad, preto **nerob ich, kým ich Babu bod po bode neschváli.** Uveď ich len ako návrh:
- **Lišta — konsolidácia** (avatar+paleta do 1, § + „Získaj §" k sebe, energia jeden prvok, 👋+ℹ️ do „Pomoci"). `§` badge (`#parCount`, `.par-badge`) nemá handler → klik na § → obchod je čistý pridaný kód.
- **Vlajková loď** — vizuálne povýšiť Štátnicovú sieň (dnes 5. tlačidlo v `#gamesSection`); spúšťač ostáva vybraná dvojica.
- **Onboarding** — uvítacie okno `#welcomeModal` z „súhlasu" na „pozvánku"; do návodu `#guideModal` doplniť chýbajúce sekcie (výber oblasti + 3 režimy, Judikatúra, Moduly, Senáty, dashboard).

---

## Čo NErobiť
- Nemeniť dizajn (farby, tiene, zaoblenia, vzhľad dlaždíc/kariet/lišty) — ani „pri príležitosti".
- Nepremenúvať hooky. Neobaľovať karty do nových wrapperov bez prepisu mobilných pravidiel.
- Nerozdeľovať zviazaný celok Sveta 1. Nerobiť Stopu C bez odsúhlasenia.
- Nemeniť poradie načítania skriptov (`init()` je monolit „všetko alebo nič") — meniť markup, nie poradie skriptov.

## Protokol prenosu (vráť ako text po každej etape)
- **Etapa a commit:** názov, hash/správa.
- **Čo sa zmenilo:** súbory a riadky (`súbor:riadok`), stručne čo a prečo.
- **Vzhľad:** potvrdenie, že sa nezmenil (a čím to je zaručené — použité existujúce triedy).
- **Otestované:** desktop + mobil, ktoré breakpointy, čo si overil (napr. filter rebríčka, bottom-nav, zbaliteľné sekcie, coupled cluster kŕmi hry).
- **Otvorené otázky:** čo treba od Babu potvrdiť pred ďalšou etapou.
