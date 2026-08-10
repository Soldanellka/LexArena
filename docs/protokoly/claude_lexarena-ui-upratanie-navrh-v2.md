# LexArena — upratanie UI: NÁVRH v2 (opretý o realitu)

> **Status:** nahrádza `claude_lexarena-ui-upratanie-navrh.md`. Opiera sa o technickú diagnostiku (`claude_lexarena-diagnostika-vystup-od-code.md`), funkčnú diagnostiku (`claude_lexarena-funkcna-diagnostika-vystup-od-code.md`) a tri zamknuté rozhodnutia Babu (august 2026).
> **Cieľ (nezmenený, od Babu):** upratať hlavnú stránku — rozdeliť marketingovo, upozorniť na funkcie, logicky pospájať, zvýšiť prehľadnosť. Netýka sa obsahu (právo), len štruktúry a UI.

---

## Čo sa zmenilo oproti pôvodnému návrhu (a prečo)

1. **5 zón → 3 svety.** Funkčná diagnostika ukázala, že appka nie je 20 rovnocenných sekcií, ale **tri prirodzené svety**, ktoré dnes len vyzerajú ako jeden zoznam. To je pravdivejší a čistejší rámec než umelých 5 zón.
2. **Vlajková loď je istá, nie dohad.** Code nezávisle potvrdil: **Štátnicová sieň** (hlasová skúška pred komisiou s LLM hodnotením) je najsilnejšia a jediná unikátna vec — a je schovaná ako piate tlačidlo v karte „Hry a prípady".
3. **Kľúčový princíp: DÔRAZ, NIE SŤAHOVANIE.** Mandát Babu je „dizajn nechať" — nenútiť hráča učiť sa appku nanovo. Prehľadnosť a marketing preto dosahujeme **zvýraznením, upratanou lištou a onboardingom**, nie prekopaním tela stránky. Pôvodný mockup zlyhal presne tým, že telo prehádzal a presunul výber oblasti.
4. **Oddelené dve kopy:** *redizajn vzhľadu* (ako to vyzerá) vs. *opravy funkčnosti* (čo je rozbité pod kapotou). Nemiešajú sa a idú vlastnými cestami.

---

## Zamknuté rozhodnutia (Babu)

1. **Rímske právo + Dejiny práva** — nechať, ale so štítkom **„pripravuje sa"** (obsah pribudne neskôr). Klik nesmie viesť do slepej uličky.
2. **Obchod** — stlmiť na **„čoskoro"** (predaj § za peniaze pribudne, keď sa appka chytí; zatiaľ nie je záujem). Dormantná nenápadná karta, nie plnohodnotná zóna.
3. **Prípady z praxe** — **dopojiť energiu (−4 %) + § odmenu** (+5 § sada / +10 § perfektná), nech sú komplet ako ostatné hry. → *ide do kopy Opravy funkčnosti.*

---

## Rámec: tri svety (spôsob videnia, nie prestavba)

Toto je **marketingová a vizuálna chrbtica** — ako sekcie zoskupiť a čo zvýrazniť. **Nie** pokyn roztrhať telo na tri nové kontajnery (to by rozbilo mobilný layout — viď Riziká).

**🥊 Svet 1 — Aréna okolo vybranej dvojice okruhov.**
Výber oblasti + tri režimy → napája **Pojednávanie, Kartičky, Prípady, Štátnicovú sieň**. Všetky štyri čítajú tú istú vybranú dvojicu (`__selectedOkruhPair`).
→ **Toto je zviazaný celok — ostáva pokope, s natívnym výberom presne ako teraz.** Žiadny nový globálny picker, žiadne trhanie pojednávania od hier.

**📚 Svet 2 — Samostatné tréningy (vlastný výber / nezávislé).**
Bifľovačka, Štruktúra otázok (pavúk + 5 hier), Študijné moduly, Judikatúra. Plus **Môj progres** (dashboard), ktorý číta naprieč všetkým.

**🏛️ Svet 3 — Súťaž a komunita.**
Senáty + Rebríček, Register pojednávaní, Súdna sieň (nahlásenia + pečate), Tvoj názor, Nástenka, Návody & odmeny.

*(Účet/profil a dormantný Obchod stoja bokom ako servisná vrstva.)*

---

## Čo v UI reálne meníme (redizajn — jemná ruka)

### 1. Horná lišta → z ~10 solitérov na 3 bloky
Najčistejšie víťazstvo, Babin vlastný „neporiadok". Grupovanie:
- **vľavo** značka + identita: logo, avatar (**zlúčiť obrázok + paletu 🎨 do 1 tlačidla**; „Zmeniť vzhľad" ide do menu — paleta dnes otvára iný modal, patrí dovnútra), meno;
- **stred** herný HUD ako jeden zhluk: 🔥 streak · **§ + „Získaj §" do jedného chipu** (klik na § → obchod/získaj — `§` badge dnes **nemá handler**, takže je to čistý pridaný kód) · **energia (prúžok + %) do 1 chipu**;
- **vpravo** režim + nastavenia: prepínač roly (z „admin" odznaku zreteľný prepínač), 🌙, **👋 + ℹ️ → jedna „Pomoc / O LexArene"**, Môj účet.
- Zriedka menené (Vyber školu, vzhľad avatara) → do menu účtu.

### 2. Vlajková loď — Štátnicová sieň
Vizuálne povýšiť ako vrchol prípravy (hero spotlight / výraznejšia karta). **Ale spúšťačom ostáva vybraná dvojica** — nie samostatný gombík odtrhnutý od výberu oblasti. Jasná cena (15 §) aj odmena (až 25 §) sú súčasť lákadla.

### 3. Výber oblasti + tri režimy — zviditeľniť a vysvetliť
Necháva sa **natívne** pri pojednávaní (hry pod ním). Čo pridávame: **vysvetlenie**, lebo dnes to nikto nevysvetlí, hoci je to brána do celého loopu. Režimy pomenovať zrozumiteľne — najmä **📕 „Na precvičenie" = „appka mi vyberie, čo mi nejde"** (predajné). Poradie ostáva 🎲 Náhodne · 📗 Preštudované · 📕 Na precvičenie.

### 4. Onboarding — z „súhlasu" spraviť „pozvánku"
- **Uvítacie okno 👋:** jednovetový sľub („Vyskúšaj si štátnicu nanečisto — komisia ťa vypočuje a povie ti známku"), 3 ikonky čo appka ponúka, primárne CTA **„Začni hrať"** namiesto „Rozumiem". Testovaciu fázu, súkromie a disclaimer nechať, len zbaliť nižšie.
- **Návod ℹ️:** diagnostika našla diery — **výber oblasti + 3 režimy, Judikatúra, Študijné moduly, Senáty, dashboard míľniky sa nikde nevysvetľujú.** Doplniť.

### 5. Zviditeľniť skryté klenoty (bez sťahovania)
Video režim bifľovačky (moderátor, čo zaspáva), pavúčie hry (5 hier, dnes 3 kliknutia hlboko), „Čo dobrať" v dashboarde, audit obsahu komunitou + pečate (dôveryhodnosť = predajný argument pri práve). Riešenie: náznak/štítok/„na čo to je" riadok, nie premiestnenie.

### 6. Stlmiť / poslať nižšie
Obchod („čoskoro"), Judikatúra (silná, ale úzka — patrí medzi tréningy, nie na úvod), staršie samostatné moduly (bez progresu a identity — pod „ďalší obsah"), Nástenka a Tvoj názor (dôležité, nie prvý dojem), Register pojednávaní (v dnešnej podobe mätie — viď Opravy).

### 7. Jeden systém kariet
Každá karta = hlavička + 1 riadok „na čo to je" + jeden dominantný CTA; vedľajšie akcie ako textové odkazy. Jednotná súdna metafora (Aréna, Senáty, Pojednávanie, Súdna sieň, Štátnicová sieň) ako marketingová chrbtica.

---

## Čo NEMENÍME (mandát „dizajn nechať")

- **Zviazaný celok Svet 1** (výber oblasti → pojednávanie + 4 hry) ostáva pokope, natívny výber. **Žiadny nový globálny area picker.**
- **Zásadné poradie a umiestnenie kariet v tele sa nerúca.** Pracujeme dôrazom (veľkosť, farba, hlavičky, medzery, štítky), nie sťahovaním sekcií.
- Dvojstĺpec, ružový vzhľad, karty — ostávajú. Hráč sa nič neučí nanovo.

---

## Opravy funkčnosti (samostatná kopa pre Code — NIE vzhľad)

Toto sú chyby pod kapotou, nájdené diagnostikou. V redizajne sa neprekresľujú — riešia sa opravou alebo odstránením.

| # | Čo | Rozhodnutie |
|---|----|-------------|
| 1 | **Prípady** nedávajú § ani neberú energiu (odmena visí v mŕtvej `submitCase()`) | Dopojiť na živú cestu `loadCasesFromJson` → `econAward` + `econEnergy` |
| 2 | **Výsledok duelu** sa zapíše, ale nikde nezobrazí | Doplniť výsledkovú obrazovku (číta `duels/{id}.result`) |
| 3 | **Register pojednávaní** ukazuje cudzie výzvy a „Odmietnuť" ich maže komukoľvek z DB | Premyslieť: buď „moje uložené", alebo aspoň zneškodniť cudzie mazanie |
| 4 | **Moduly** — sľúbený „+1 § za okruh" sa nepripíše (`window.opener` je `null`) | Opraviť most odmeny (progres sa píše správne) |
| 5 | **Rímske / Dejiny chipy** — 0 otázok, slepá ulička | Štítok „pripravuje sa", klik nevedie do prázdna (viď rozhodnutie 1) |
| 6 | **Obchod** — `buy20`/`buyPremium`/`openShop` bez handlera | V rámci karty „čoskoro" (viď rozhodnutie 2) |
| 7 | **Výzvy od spoluhráčov** — karta bez handlerov, natrvalo skrytá | Odstrániť |

**Ďalšie chyby na zaradenie (priorita neskôr):** kvízové hodnotenie sa dá obísť (`onclick=null` vs `addEventListener`); dlaždica bifľovačky počíta ×5 namiesto ×3 (percentá podhodnotené); video/reklama odmeny bez overenia (`setTimeout`).

---

## Riziká z technickej diagnostiky (rešpektovať pri stavbe)

- **Mobilné `display:contents` + `order`** = najväčšie CSS riziko. Keďže návrh v2 **neobaľuje telo do nových zónových divov** (jemná ruka), toto riziko z veľkej časti obchádzame — a to je hlavný dôvod, prečo je jemná ruka aj bezpečnejšia.
- **Výber oblasti je centrálny stav** (`renderAreas → __area*ForGames`). Keďže Svet 1 nesťahujeme, netreba výber zdvojovať ani povyšovať.
- **JS hooky nepremenovať** (zoznam v technickej diagnostike). Bezmenným kartám **dať ID** je bezpečné a žiadúce; triedy `.highlight-*` musia ostať.
- **`init()` je monolit „všetko alebo nič"** — etapy prestavby menia markup, nie poradie skriptov.

---

## Admin / Garant
Ostávajú viazané na svoje režimy (ako teraz). Vnútorné upratanie do pod-panelov (*Skupiny · Obsah · Používatelia · Analytika*) je voliteľné a nezávislé od tohto redizajnu — celý panel je jeden `innerHTML` blob v `init.js`, dá sa preskupiť bezpečne.

---

## Ďalší krok
Z tohto odsúhlaseného návrhu → buď **verný mockup** (tri svety ako vizuálne zvýraznenie a upratanú lištu, telo v terajšom poradí), alebo **etapové zadanie pre Code** (redizajn zvlášť, opravy funkčnosti zvlášť, každá etapa samostatný commit, protokol prenosu ako text).

**Na odsúhlasenie pred stavbou:** sedí ti princíp „dôraz, nie sťahovanie" a rámec troch svetov? Ak áno, poradie a rozsah etáp doladíme na mockupe/zadaní.
