# LexArena — plný akcent na trio + Register k pojednávaniu (zadanie pre Code)

> Dve úpravy od Babu po pohľade na produkciu. Pravidlá platia (hooky/ID nepremenúvať, mobilný `order` na množinách, filter rebríčka, bottom-nav, tmavý režim, commit + protokol, push na Babu).

## 1. Trio Pojednávanie · Vyzvi · Štátnica — plný akcent (terajší je prislabý)
Babu čakala pútavé, výrazné hlavné akcie — terajší akcent (prstenec) sa stráca, a v disabled stave (bez vybranej oblasti) trio pôsobí paradoxne **menej** výrazne než bežné tlačidlá.

- **Aktívny stav tria:** sýty gradient (vzor: najvýraznejší existujúci prvok appky — tlačidlo „Môj účet" v lište / `.btn-primary` vzhľad), **výrazne väčšie emoji ikony** (🥊 Spustiť pojednávanie · ⚔️ Vyzvi spolužiaka · 🏛️ Štátnicová sieň), o stupeň väčší font, jemný tieň — nech z mriežky vystupujú. Bežné štyri (Kartičky, Prípady, Progres, Štruktúra) nechať ako sú.
- **Disabled stav tria:** nesmie splynúť do šedi s ostatnými — gradient ostáva, len stlmený (opacity/desaturácia), ikona viditeľná; kurzor + existujúci hint „najprv vyber oblasť". Aj vypnuté musí byť vidno, že sú to hlavné akcie.
- Emoji ikony stačia (obrázkové by vyžadovali grafiku od Babu — ak by ich niekedy dodala, štruktúru tomu nebrániť).
- Obe témy; na mobile over, že väčšie trio pekne zalamuje (pokojne trio v prvom riadku / na plnú šírku, zvyšok mriežkou pod tým).

## 2. Register pojednávaní → späť doľava, k pojednávaniu
`#duelBankCard` (množina Výzvy) presunúť z pravého stĺpca **do ľavého, do množiny Tréning/Hraj** — logicky k pojednávaniu: výzvy sú pojednávania od iných hráčov. Umiestnenie: **pri pojednávaní** (pod spojenou hernou dlaždicou, resp. tak, aby vizuálne susedili — ak je vhodnejšie nad ňou, navrhni a nahlás). „Prijmem výzvu → scroll na kvíz" ostáva a bude ešte prirodzenejší (rovnaký stĺpec).
- Pravý stĺpec potom: Súťaž a komunita → Servis.
- Aktualizovať mobilný `order`, bottom-nav a zbaliteľné sekcie.
- ⚠️ **Balans stĺpcov sa pohne** (ľavý narastie, pravý skráti) — po zmene zmeraj výšky a nahlás; nevyrovnávať svojvoľne, rozhodne Babu naživo.

## Protokol
Commit(y) + `súbor:riadok` · screenshoty/opis akcentu v oboch témach a v disabled stave · nové výšky stĺpcov · čo otestované (mobil, filter rebríčka, bottom-nav, zbaliteľné, scroll pri prijatí výzvy) · otvorené otázky.
