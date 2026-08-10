# LexArena — ekonomika v1 (zadanie pre Code)

> **Kontext:** Babu odsúhlasila `claude_lexarena-ekonomika-navrh.md`. Cieľ: § má mať hodnotu od prvého dňa — mierny prebytok pre aktívneho hráča, atraktívne míňanie, žiadne pay-to-win. Väčšina zmien = `economyConfig.js`; návod sa dotiahne cez `data-econ` sám (over). Pravidlá platia (commit + protokol, push na Babu, tmavý režim pri UI zmenách).

## 1. Denný strop — zúžiť obchádzky
Strop 60 §/deň ostáva. Obchádzať ho smú **len: streak, rebríčkové odmeny (týždeň/mesiac/senáty/fakulty) a Štátnicová sieň**. Do stropu sa po novom počítajú: senátne odmeny za spory/založenie, dashboard míľniky, videá návodov, reklama, testy od garanta, schválené nahlásenia. 
- ⚠️ Over dopad na onboarding: nováčik s 3 videami (36 §) + prvé hry sa v prvý deň zmestí do 60 § — to je v poriadku; nesmie sa ale stať, že mu videá „zožerú" odmenu, ktorú UI sľubuje a nepripíše sa. Ak by kolidovalo (sľúbené vs. nepripísané), radšej videá nechaj mimo stropu a nahlás — UI nesmie klamať.

## 2. Reklama
3×/deň → **2×/deň** (3 § za pozretie ostáva).

## 3. Streak shield
5 § → **15 §**. Over, kde všade sa cena zobrazuje (UI, návod cez `data-econ`).

## 4. Kŕmenie avatara
Cena **12 § ostáva**. Zisti a nahlás: **koľko % energie obnoví jedno kŕmenie** — má obnoviť na 100 %. Ak obnovuje menej/inak, nahlás pred zmenou.

## 5. Kozmetický rebrík (sinky)
- **Prestige avatari:** rad **300 / 600 / 1 000 / 2 000 §**. Zaveď cenové tiery do configu; ak k vyšším tierom zatiaľ nie sú grafické assety, nechaj ich „čoskoro" (assety dodá Babu) — ale ceny nech už v configu sedia.
- **Taláre:** existujúce 200–1000 § nechať; štruktúru pripraviť tak, aby sa dali sezónne pridávať ďalšie položky (bez zásahu do logiky, len dáta).

## 6. Zamknúť zásady (do konfigurácie/komentárov)
- Žiadne pay-to-win: za § nikdy výhoda v súťaži (rebríček, duel) — len kozmetika, poistky, vstupy a nápovedy dostupné každému.
- Vstup do bežných hier (kvíz/kartičky/prípady) sa nespoplatňuje; mŕtve `QUIZ_ENTRY` nechať mŕtve.
- Odmeny za učenie (bifľovačka, dashboard, moduly) sa neznižujú.

## 7. Kontrola konzistencie
Po zmenách over: návod (`data-econ` + `data-seal`) ukazuje nové hodnoty všade · žiadne zadrôtované čísla v UI sa nerozišli s configom · denný strop reálne funguje na novo započítaných zdrojoch (otestuj aspoň jeden, napr. dashboard míľnik po dosiahnutí stropu).

## Protokol
Commit(y) + `súbor:riadok` · tabuľka finálnych hodnôt (zdroj/sink → hodnota → v strope áno/nie) · odpoveď na otázku kŕmenia (bod 4) · výsledok onboarding overenia (bod 1) · čo ostalo „čoskoro" a čaká na assety od Babu.
