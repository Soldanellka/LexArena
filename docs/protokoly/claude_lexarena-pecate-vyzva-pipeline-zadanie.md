# LexArena — pečate, Vyzvi spolužiaka, kontrola content pipeline (zadanie pre Code)

> Tri úlohy od Babu. Pravidlá platia (hooky nepremenúvať, dizajn dlaždíc nemeniť nad rámec uvedeného, tmavý režim, commit + protokol, push na Babu).

## 1. Prahy pečatí: 1 / 10 / 25
Zmeniť prahy pečatí za schválené nahlásenia: 🥉 **bronzová za 1** · 🥈 **strieborná za 10** · 🥇 **zlatá za 25** (dnes 1/5/15). Preveriť, kde všade sa prahy čítajú (config, zobrazovanie pečatí, návod cez `data-econ` ak tam sú), nech sa čísla nerozídu. Hráčom, ktorí už majú pečať podľa starých prahov, pečať **neodoberať** — nové prahy platia od teraz (ak by implementácia pečate prepočítavala spätne, ozvi sa pred zmenou).

## 2. „⚔️ Vyzvi spolužiaka" do mriežky + zvýraznené trio
- Do mriežky „Čo chceš hrať" pridať tlačidlo **⚔️ Vyzvi spolužiaka**: spustí normálne pojednávanie z vybranej oblasti v „challenge" režime a **po dohraní automaticky ponúkne zdieľanie linku** (`?duel=ID` — tá istá mechanika ako dnešné 📤 v registri, len sa share krok ukáže sám namiesto hľadania). Bez vybranej oblasti sa správa ako ostatné hry (disabled/scroll na výber).
- **Zvýrazniť trio:** Spustiť pojednávanie · ⚔️ Vyzvi spolužiaka · 🏛️ Štátnicová sieň — všetky tri akcentným variantom (ako má dnes Štátnica), zvyšok (Kartičky, Prípady, Progres, Štruktúra) bežný. Mriežka sa rozšíri na 7 položiek — over zalamovanie na mobile.
- ID nových prvkov pridávať, existujúce nemeniť.

## 3. Content pipeline — overiť cestu summary z appky do repa
Babu upravuje summary Trestného práva hmotného **cez appku** (garant/admin úpravy). Over a popíš v protokole:
- kam sa jej úpravy summary ukladajú (Firebase overrides?),
- či ich **GitHub sync** v admin paneli prenáša do repa a do ktorých súborov (`A*.json`?),
- ako z repa vytiahnuť **čisté texty summary A1–A13 pre TPH** (na odovzdanie na spracovanie štátnicových podkladov a pavúka).
Nič nemeniť — len zmapovať a potvrdiť, že cesta funguje; ak nejaké úpravy v repe nie sú (sync nebol spustený / nepokrýva summary), napíš presne, čo chýba.

## Protokol
Commit(y) + správa · kde (`súbor:riadok`) · potvrdenie prahov v UI aj návode · challenge flow otestovaný (vytvorenie linku bez zápisu do produkcie, ak sa dá) · mobil + obe témy · výstup bodu 3 (mapa pipeline).
