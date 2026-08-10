# LexArena — funkčná diagnostika: zadanie pre Code (len čítanie)

> **Cieľ:** pred redizajnom vzhľadu zmapovať, **čo každá funkcia LexAreny reálne robí a aké voľby/režimy ponúka** — z pohľadu hráča, nie kódu. Až na tomto podklade vieme nastaviť nový vzhľad s dôrazom na to, čo je marketingovo zaujímavé.
> **Prísne pravidlo:** IBA ČÍTANIE. Žiadny zápis, žiadny `git add/commit/push`, žiadne premenovania ani úpravy. Výstup vráť **ako text** v odpovedi.
> **Nadväznosť:** dopĺňa `claude_lexarena-diagnostika-vystup-od-code.md` (tá bola technická — DOM, JS hooky, riziká). Táto je **funkčná** — správanie, možnosti, toky, odmeny.

---

## Prečo to potrebujem (a čím sa to líši od prvej diagnostiky)

Prvá diagnostika zmapovala **kostru** (čo je v DOM, na čom visí JS, čo sa nesmie premenovať). Nepovedala však, **čo funkcie robia a aké voľby dávajú hráčovi**. Konkrétny príklad diery: po výbere oblasti existuje dynamický `#okruhModePicker` — technická diagnostika ho spomenula ako holý kontajner, ale nikde nie je, že hráčovi ponúka režimy typu **preštudované / náhodné / na rozvoj** (over presné názvy a úplný zoznam). Presne túto vrstvu potrebujem celú: pri každej funkcii jej **možnosti, režimy a parametre**, ktoré vidí a volí používateľ.

Pre marketingový redizajn potrebujem vedieť, čo vyzdvihnúť — a to sa nedá, kým nemám úplný súpis toho, čo appka vie a aké voľby v sebe skrýva.

---

## Jednotná schéma (vyplň pre KAŽDÚ funkciu nižšie)

Kde sa dá, použi tabuľku alebo takýto blok na funkciu:

- **Funkcia / názov:**
- **Užívateľský účel (1 veta):** načo to hráčovi je
- **Vstup do funkcie (entry):** odkiaľ sa tam dostane (tlačidlo, karta, modál…)
- **Podmienky / prerekvizity:** čo musí byť splnené predtým (napr. vybraná oblasť, prihlásenie, § zostatok)
- **Voľby / režimy / parametre:** ⭐ **úplný zoznam** všetkého, čo hráč volí — režimy (preštudované/náhodné/na rozvoj/…), počty, ťažkosti, filtre, prepínače. Nič nevynechaj.
- **Výstup / odmena:** čo za to hráč dostane (§, body, pečať, progres, odomknutie)
- **Stavy:** prázdny / rozbehnutý / dokončený / zamknutý — čo hráč vidí v každom
- **Závislosti:** od čoho funkcia závisí a čo od nej závisí (napr. zdieľaná dvojica okruhov)
- **Marketingový uhol:** čo je na tom „hák"/predajné, alebo naopak zbytočne schované

Ak niečo nevieš jednoznačne určiť z kódu, **napíš to explicitne ako otvorenú otázku, nehádaj.** Pri odkazoch na kód uveď `súbor:riadok`.

---

## Čo od teba potrebujem (12 blokov)

### 1. Výber oblasti → režimy (jadro celého loopu)
- Aké oblasti existujú a ako sa vyberajú (chipy `#areasList`).
- Po výbere: **čo presne ponúka `#okruhModePicker`** — úplný zoznam režimov (preštudované / náhodné / na rozvoj / … over názvy a či je ich viac) a **čo každý režim robí** (ktoré otázky/okruhy vyberá a podľa akého kritéria).
- Mechanika **dvojíc okruhov:** ako sa tvoria (A1+A2, A3+A4 … A49+A50), kde v kóde (`applyOkruhPairSelection`, `__selectedOkruhPair`).
- **Občianske právo — špeciál:** potvrď, že dvojicu tvorí 1 otázka z hmotného + 1 z procesného; ako je to v kóde riešené a či majú podobný špeciál aj iné oblasti.
- Ktoré hry/časti **konzumujú** vybranú dvojicu (`__area*ForGames`) a ktoré nie.

### 2. Herný loop na vybranej dvojici — 4 funkcie
Pre každú samostatne (schéma vyššie): **Pojednávanie**, **Kartičky (Memory)**, **Prípady z praxe**, **Štátnicová sieň**.
- Čo hráč reálne robí, koľko otázok/kôl, aké voľby vnútri, ako sa vyhodnocuje, aká odmena.
- Ako každá číta vybranú dvojicu.

### 3. „Vlastný svet" — mimo dvojice
- **Štruktúra otázok** (pavúk / spider) — čo zobrazuje, čo sa v nej dá robiť, aké režimy (mapa/browser/…), od čoho závisí.
- **Môj progres** (dashboard) — aké štatistiky/pohľady ukazuje, na akej úrovni (oblasť, okruh, hra), čo z toho hráč získa.

### 4. Bifľovačka
- Ako funguje (karty s progresom), aké režimy/typy, ako sa počíta % a „X/Y".
- Väzba na oblasti/okruhy (závisí od výberu, alebo má vlastnú sadu?).
- Opravy garanta / export — čo to z pohľadu obsahu je.

### 5. Študijné moduly
- Rozdiel medzi **Oblasťami** a **Veľkými kvízmi a špeciálmi** (Občan teória+kvíz, TREST veľký kvíz, spájačka, teória a prípady…).
- Čo je „modul" vs. „kvíz" funkčne — čo hráč v každom robí a čím sa líšia od hier v bode 2.

### 6. Judikatúra NS SR
- Čo ponúka (zoznam rozhodnutí?), aké filtre/kategórie, väzba na oblasti, čo hráč získa (§/nič/študijné).

### 7. Súťažná vrstva
- **Pojednávanie proti inému hráčovi:** ako vzniká výzva (`?duel=ID` link, `duelChallengeModal`), ako sa hrá, ako sa vyhodnotí, čo sa počíta.
- **Register pojednávaní / uložené výzvy** — čo to je, čo sa doň ukladá, čo s tým hráč robí.
- **Senáty** — ako vzniká/pripája sa, aké má súťaž pravidlá (V/R/P, body), TOP senáty.
- **Rebríček** — režimy (Jednotlivci / Senáty / Fakulty / Týždeň-Mesiac-Všetko), čo sa do nich počíta a za čo sa lezie hore.

### 8. Ekonomika a motivácia (celý loop)
- **Paragrafy (§):** za čo sa **získavajú** (vymenuj všetky zdroje) a za čo sa **míňajú** (vymenuj všetky sinky). Kde je reálny sink teraz, keď je Obchod mŕtvy.
- **Energia:** čo robí, ako klesá/stúpa, väzba na kŕmenie avatara za §.
- **Streak** 🔥 — ako sa počíta, čo dáva.
- **Získaj §** (`openEarnModal`: reklama + promo) — čo presne ponúka.
- **Video-odmeny** (Návody, +12§) — ako a koľkokrát sa dá vyzbierať.
- **Obchod** — potvrď, že tlačidlá (`buy20`, `buyPremium`, `openShop`) sú bez handlera (mŕtve), a čo mali podľa všetkého robiť.

### 9. Súdna sieň a komunita
- **Právna nezrovnalosť / Nahlásiť otázku** — celý tok: hráč nahlási → čo sa deje → moderovanie garantom → výsledok (verdikt). Čo hráč získa.
- **Pečate** — aké typy existujú, za čo sa dávajú, načo sú.
- **Tvoj názor** (Nápad/Chyba/Pochvala) a **Nástenka** — čo sa deje s príspevkom, kde sa zobrazí.

### 10. Role z pohľadu funkcií (nie kódu)
- Čo môže/vidí **študent** vs **garant** vs **admin** — user-facing rozdiely (nie mechanizmus rolí, ten už mám).
- Ktoré funkcie sú pre bežného hráča neviditeľné a patria len garantovi/adminovi.

### 11. Onboarding
- Čo presne hovorí **uvítacie okno** 👋 a **návod** ℹ️ (obsahové sekcie).
- Čo sa nováčik z nich dozvie a **čo mu chýba** (ktoré funkcie nikde nevysvetľujeme).

### 12. Marketingový sumár + návrhy priorít (tvoj úsudok na záver)
Tu **návrhy vítané** — okrem faktov môžeš pridať aj odporúčania. Jasne ich odlíš (napr. „ZISTENIE" vs „NÁVRH"), nech vieme, čo je z kódu a čo je tvoj názor.
- Ktoré funkcie sú **jadro loopu** (hrá sa denne) a ktoré **periférne**.
- **Skryté klenoty** — silné funkcie, ktoré sú vizuálne schované alebo nevysvetlené.
- **Hluché miesta** — čo vyzerá dôležito, ale nič nerobí / nemá odmenu / je mŕtve.
- Pre nováčika: čo by ho podľa teba chytilo, keby to bolo lepšie vidieť.
- **Návrh priorít:** ktoré 3–5 funkcií by si marketingovo vypichol a prečo; čo by si naopak stlmil alebo skryl. Stačí zdôvodnenie a poradie dôležitosti — **nie hotový vizuál ani layout**.

---

## Formát výstupu
- **Text v odpovedi**, členené podľa blokov 1–12.
- Kde sa dá, tabuľka podľa jednotnej schémy (funkcia | účel | vstup | podmienky | voľby/režimy | výstup | stavy | závislosti | marketing).
- Pri odkazoch na kód `súbor:riadok`.
- Neisté veci označ ako otvorené otázky — **nehádaj**.

## Čo NErobiť
- Nič neupravuj, nepremenúvaj, nevytváraj súbory, necommituj.
- **Návrhy priorít a čo vypichnúť sú vítané** (blok 12) — ale ešte **nestavaj ani neprekresľuj samotný vzhľad**: žiadny nový layout, HTML mockup či usporiadanie stránky. Teraz úplná funkčná mapa + tvoje odporúčania priorít; konkrétny vzhľad prichádza až v ďalšom kroku.
