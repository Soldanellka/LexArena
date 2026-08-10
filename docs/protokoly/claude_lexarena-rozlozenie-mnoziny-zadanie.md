# LexArena — rozloženie do množín + ťahúň: zadanie pre Code

> **Kontext:** Babu odsúhlasila nové rozloženie hlavnej stránky (nákres `claude_lexarena-nakres-rozlozenia-FINAL.html`). Toto nahrádza kolo 2 (`claude_lexarena-upravy-kolo-2-zadanie.md`) — časti sa prekrývajú, riaď sa týmto. Nadväzuje na `claude_lexarena-STAV-PROJEKTU.md`.

## ⛔ Pravidlá
- **Vizuálna identita sa nemení** (farby, gradienty, zaoblenie, ružový vzhľad, tmavý režim). Menia sa usporiadanie, veľkosti a pridávajú sa **jemné rámiky množín** (nižšie) — nič viac.
- **Hooky nepremenúvať.** Pozor na mobilné `display:contents` + `order` (`styles.css:1014`), filter rebríčka (`leaderboard.js:172` — chipy podľa `previousElementSibling` + text), `bottom-nav` ciele, `mobile-nav.js` zbaliteľné sekcie (`.highlight-*` + h3).
- **Zviazaný celok** (výber oblasti → pojednávanie/kartičky/prípady/štátnica) nerozbiť.
- Každá etapa = commit + textový protokol. Push na Babu. Tmavý režim overiť po každom kroku.

## Cieľové rozloženie (desktop)

**Ľavý stĺpec — „uč sa a trénuj" (tri množiny):**
1. **🥊 Tréning** (kŕmi ho výber oblasti): **Štátnicová sieň (ťahúň, hore)** → Pojednávanie (kvíz) → Výzvy/Register → Hry a prípady (Kartičky, Prípady).
2. **📚 Ďalšie tréningy** (vlastný výber): Bifľovačka · Môj progres · Štruktúra otázok · **Judikatúra** (presun sem).
3. **📁 Študijné moduly**: Oblasti + zbalené „ďalší obsah".

**Pravý stĺpec — „súťaž a komunita":**
4. **🏛️ Súťaž a komunita**: Rebríček (TOP 3 + scroll) · Senáty · Súdna sieň · Nástenka · Tvoj názor · Návody.
5. **🧰 Servis**: Účet · Obchod („čoskoro").

Na mobile lineárne v poradí 1→5.

## Úlohy (každá vlastný commit)

### 1. Jemné rámiky množín („podlaždice")
Každá z 5 množín dostane jemný vizuálny rámik/panel, aby držala pokope. ⚠️ **Toto je zoskupenie do kontajnerov — najväčšie riziko voči mobilnému `display:contents` + `order`.** Buď rieš rámik bez rozbitia reťaze (napr. štýl na existujúcich súrodencoch / pseudo-obal, ktorý nezasahuje do `order`), alebo ak obalíš, **prepíš mobilný `order` blok aj bottom-nav** a otestuj oba breakpointy. Rámik nenápadný, v štýle appky, funkčný v svetlej aj tmavej téme.

### 2. Presuny do množín
Prehádž karty do cieľového poradia hore. **Štátnicová sieň** von z `#gamesSection` a **hore do Tréningu** ako samostatná výrazná dlaždica so **zvýraznenou ikonou 🏛️**. **Judikatúra** (`#judikaturaSection`, dnes mount `afterend` za `#gamesSection`) presunúť do „Ďalšie tréningy". Aktualizuj mobilný `order`, bottom-nav aj zbaliteľné sekcie.

### 3. Štátnicová sieň — ťahúň (puto na oblasť zachovať)
Štátnica potrebuje vybranú dvojicu (`__area*ForGames`). Ako ťahúň hore: klik → ak oblasť nie je vybraná, pošli používateľa vybrať (scroll/označenie výberu v pojednávaní), potom spusti; ak vybraná je, spusti rovno. **Nezdvojovať výber oblasti, neodpájať od zviazaného celku.**

### 4. Scroll na kvíz
- „Spustiť pojednávanie" → po otvorení `#quizArea` naň **scrollIntoView** (plynulo), nech ho používateľ nehľadá.
- Prijatie výzvy z Registra → tiež scroll na kvíz.

### 5. Výzvy/Register hore v Tréningu
Register (`#duelBankCard`) umiestniť v množine Tréning **nad** hry (poradie: Štátnica → Pojednávanie → Výzvy → Hry), aby výzvy boli navrchu a prijatie viedlo na kvíz hneď pod nimi.

### 6. Skracovacie úpravy
- **Rebríček TOP 3 + scroll:** zobraziť 3 miesta, zvyšok `max-height` + `overflow-y` na kontajneri **riadkov** (nie na filtri!). Platí pre všetky režimy.
- **Rebríček + Senáty pod sebou** na plnú šírku (NIE vedľa seba).
- **Staršie samostatné moduly** (Občan teória+kvíz, TREST veľký kvíz, spájačka, teória a prípady) zbaliť pod jednu dlaždicu **„ďalší obsah"**.
- **Bifľovačka** — menšie dlaždice (`#memoryTrainerTiles`).
- **Občianske právo** — skrátiť názov „Občianske právo – hmotné a procesné" → **„Občianske právo"** (len popis; `dual` mechanika nedotknutá).

### 7. Vyrovnanie stĺpcov (až nakoniec)
Po 1–6 posúď dĺžku stĺpcov. Ľavý má tri množiny, pravý dve → môže byť dlhší. Neriešiť dopredu; ak bude výrazný nepomer, **nahlás Babu** (presun jednej množiny doprava je jej rozhodnutie), nerob sám.

## Čo NErobiť
- Nemeniť vizuál nad rámec uvedeného. Nepremenúvať hooky. Nerozbiť filter rebríčka, bottom-nav, mobilné poradie ani zviazaný celok.
- Zvyšok Stopy C (konsolidácia lišty, onboarding) sa stále **nerobí** bez ďalšieho odsúhlasenia. (Vlajková loď = Štátnicová sieň je súčasťou tohto zadania.)

## Protokol prenosu (po každej úlohe)
Commit + správa · čo a kde (`súbor:riadok`) · potvrdenie vzhľadu + tmavého režimu · čo si otestoval (desktop + mobil, filter rebríčka, bottom-nav, zbaliteľné sekcie, zviazaný celok kŕmi hry, oba scrolly) · otvorené otázky.
