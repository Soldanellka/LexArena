# TPH — dávka A18–A21: pavúky + štátnicové podklady + mapa (výroba)

> **Zdroj:** summary A18–A21 od Babu. Pavúky vo **formáte appky** (`label` + `leaves: string[]`).
> ⚠️ **GARANTSKÉ UPOZORNENIE — čísla §§:** viaceré paragrafy v summary nesedia so slovenským TZ (pravdepodobne prevzaté z iného zdroja). Pavúky sú preto **bez čísel §§** (obsah je plnohodnotný aj bez nich); správne čísla podľa TZ 300/2005 (na overenie Babu): ublíženie na zdraví / ťažká ujma **§§ 155–158** · šírenie nebezpečnej nákazlivej ľudskej choroby **§§ 163–164** · neposkytnutie pomoci **§§ 177–178** (v summary 191–192) · pozbavenie / obmedzovanie osobnej slobody **§§ 182–183** · vydieranie **§ 189** · znásilnenie / sexuálne násilie / sexuálne zneužívanie **§§ 199–202** (v summary 213–218) · zanedbanie povinnej výživy **§ 207** (v summary 222) · týranie blízkej a zverenej osoby **§ 208** (v summary 223) · únos **§§ 209–210** · ohrozovanie mravnej výchovy mládeže **§ 211** (v summary 226). Po overení Babu sa §§ doplnia do summary aj pavúkov.

---

## ČASŤ 1 — PAVÚKY

### A18 — TČ proti zdraviu a TČ ohrozujúce život alebo zdravie
```json
{
  "center": "TČ proti zdraviu × ohrozovacie delikty",
  "branches": [
    { "label": "Ublíženie na zdraví", "leaves": [
      "Podstata – porucha zdravia či ochorenie, nie len prechodné a bezvýznamné",
      "Znaky – vyžaduje lekárske ošetrenie, obmedzuje obvyklý spôsob života",
      "Trvanie – spravidla viac ako 7 dní",
      "Zavinenie – úmyselné aj nedbanlivostné formy"
    ] },
    { "label": "Ťažká ujma na zdraví", "leaves": [
      "Podstata – závažné poškodenie zdravia s dlhodobými následkami",
      "Formy – zmrzačenie, ochromenie údu, strata či oslabenie funkcie orgánu",
      "Ďalšie formy – dlhodobá alebo ťažká porucha zdravia, ohrozenie života",
      "Závažnosť – vysoké trestné sadzby"
    ] },
    { "label": "Ohrozovacie delikty", "leaves": [
      "Podstata – vytvorenie reálneho nebezpečenstva smrti či vážnej ujmy, bez následku",
      "Neoprávnený experiment na človeku – zásah do integrity bez povolenia",
      "Šírenie nebezpečnej nákazlivej choroby – úmyselne aj z nedbanlivosti",
      "Ohrozovanie závadnými potravinami a nepovolenými liečivami – ochrana verejného zdravia"
    ] },
    { "label": "Neposkytnutie pomoci", "leaves": [
      "Podstata – neposkytne pomoc osobe v nebezpečenstve smrti či vážnej ujmy",
      "Podmienka – mohol pomôcť bez ohrozenia seba alebo iného",
      "Charakter – typický ohrozovací delikt, povinnosť solidarity"
    ] }
  ]
}
```

### A19 — Trestné činy proti slobode
```json
{
  "center": "TČ proti slobode",
  "branches": [
    { "label": "Chránený záujem", "leaves": [
      "Osobná sloboda – autonómia a voľný pohyb človeka",
      "Slobodné rozhodovanie – vôľa bez protiprávneho nátlaku"
    ] },
    { "label": "Obmedzovanie osobnej slobody", "leaves": [
      "Podstata – protiprávne bránenie vo voľnom pohybe",
      "Formy – zadržiavanie proti vôli, bránenie v odchode, uzavretie v priestore",
      "Prekážky – fyzické aj psychické",
      "Znak – zásah do slobody pohybu bez potreby ďalšieho motívu"
    ] },
    { "label": "Vydieranie", "leaves": [
      "Podstata – nútenie konať, opomenúť alebo znášať",
      "Prostriedky – hrozba násilia, hrozba inej ťažkej ujmy, protiprávny nátlak",
      "Cieľ – prinútiť obeť konať proti svojej vôli",
      "Kontext – často spojené s organizovanou kriminalitou"
    ] },
    { "label": "Únos", "leaves": [
      "Podstata – protiprávne premiestnenie alebo zadržiavanie osoby",
      "Znaky – odňatie z prostredia, premiestnenie, zadržiavanie proti vôli",
      "Kontext – často s nátlakom, vydieraním či násilím",
      "Závažnosť – jeden z najzávažnejších zásahov do slobody"
    ] }
  ]
}
```

### A20 — Trestné činy proti ľudskej dôstojnosti
```json
{
  "center": "TČ proti ľudskej dôstojnosti",
  "branches": [
    { "label": "Chránený záujem", "leaves": [
      "Sexuálna sloboda – právo rozhodovať o sexuálnom živote",
      "Integrita a autonómia – telesná a psychická nedotknuteľnosť",
      "Súhlas – absencia súhlasu ako základný prvok (redefinícia znásilnenia)"
    ] },
    { "label": "Sexuálne násilie", "leaves": [
      "Podstata – donútenie k sexuálnemu konaniu násilím alebo hrozbou",
      "Rozsah – aj bez fyzického odporu pri hrozbe či zneužití bezbrannosti",
      "Zásah – do sexuálnej slobody a telesnej integrity"
    ] },
    { "label": "Sexuálne zneužívanie", "leaves": [
      "Podstata – konanie voči osobe neschopnej dať platný súhlas",
      "Chránení – najmä deti do 15 rokov a osoby s duševnou poruchou",
      "Znak – zneužitie moci, autority alebo dôvery",
      "Európsky rámec – smernica 2011/93/EÚ o ochrane detí"
    ] },
    { "label": "Sexuálne obťažovanie", "leaves": [
      "Podstata – nežiaduce správanie sexuálnej povahy narúšajúce dôstojnosť",
      "Prostredie – ponižujúce, zastrašujúce alebo nepriateľské",
      "Právne zaradenie – nie samostatná skutková podstata; napĺňa znaky iných TČ"
    ] }
  ]
}
```

### A21 — Trestné činy proti rodine a mládeži
```json
{
  "center": "TČ proti rodine a mládeži",
  "branches": [
    { "label": "Chránený záujem", "leaves": [
      "Rodina – rodinné vzťahy a rodičovské povinnosti",
      "Deti a mládež – fyzická a psychická integrita, zdravý mravný vývin"
    ] },
    { "label": "Zanedbanie povinnej výživy", "leaves": [
      "Podstata – neplnenie zákonnej vyživovacej povinnosti",
      "Trestnosť – dlhodobé neplnenie, úmyselné vyhýbanie sa plateniu",
      "Znak – neplnenie napriek schopnosti platiť",
      "Výskyt – jeden z najčastejších TČ proti rodine"
    ] },
    { "label": "Týranie blízkej a zverenej osoby", "leaves": [
      "Podstata – dlhodobé či opakované fyzické alebo psychické ubližovanie",
      "Formy – násilie, ponižovanie, izolácia, kontrola, zanedbávanie",
      "Znak – zneužitie moci alebo závislosti obete",
      "Kontext – typicky domáce násilie"
    ] },
    { "label": "Ohrozovanie mravnej výchovy mládeže", "leaves": [
      "Podstata – konanie negatívne ovplyvňujúce vývoj maloletého",
      "Formy – umožnenie alkoholu, drog, hazardu, vedenie k nemravnému životu",
      "Ďalšie – umožnenie prostitúcie či kriminality, zanedbávanie výchovy",
      "Chránená osoba – maloletý do 18 rokov"
    ] }
  ]
}
```

---

## ČASŤ 2 — AKTUALIZÁCIA MAPY

```
zmena clusters:
  osobitna-cast · Osobitná časť · [17, 18, 19, 20, 21]   ← +18, 19, 20, 21

nové links (nesmerované):
  18–17 „susedné hodnoty: život a zdravie"
  18–4  „poruchový × ohrozovací následok v praxi"
  19–20 „sloboda a dôstojnosť – príbuzné chránené záujmy"
  20–16 „smernica 2011/93/EÚ – európsky rámec ochrany detí"
  21–13 „ochrana detí: obete (A21) × páchatelia (A13)"
```

---

## ČASŤ 3 — ŠTÁTNICOVÉ PODKLADY

### A18 — TČ proti zdraviu a ohrozujúce život/zdravie
**Kľúčové body:** ublíženie na zdraví (porucha zdravia, lekárske ošetrenie, obmedzenie života, ~7+ dní; úmysel aj nedbanlivosť) · ťažká ujma (zmrzačenie, ochromenie, strata funkcie orgánu, dlhodobá porucha, ohrozenie života) · ohrozovacie delikty — nebezpečenstvo stačí, následok netreba (experiment, šírenie nákazlivej choroby, závadné potraviny, liečivá) · neposkytnutie pomoci (mohol bez rizika, nepomohol). §§: 155–158, 163–164, 177–178 (**over**).
**Doplňujúce otázky (over):** 1. Ako sa v praxi odlišuje ublíženie od ťažkej ujmy (7 dní × 42 dní?) 2. Prečo pri ohrozovacích deliktoch netreba následok — väzba na A4? 3. Neposkytnutie pomoci vodičom — prísnejší režim? 4. Šírenie nákazy z nedbanlivosti — príklad (porušenie karantény). 5. Súbeh ublíženia s inými TČ (výtržníctvo).
**Časté chyby:** „ublíženie = akékoľvek zranenie" (potrebná intenzita) · ohrozovací delikt „nie je trestný, kým sa nič nestalo" · zabudnutá nedbanlivostná forma · miešanie ťažkej ujmy so smrťou.
**Vodítko:** 1 = obe poruchové SP + logika ohrozovacích + neposkytnutie s podmienkou; 2 = SP správne, ohrozovacie hrubo; 3 = len ublíženie/ťažká ujma; 4 = nechápe ohrozovací princíp.

### A19 — TČ proti slobode
**Kľúčové body:** chránený záujem: osobná sloboda, voľný pohyb, slobodné rozhodovanie · obmedzovanie osobnej slobody (bránenie v pohybe — zadržanie, uzavretie; bez potreby motívu) · vydieranie (nútenie hrozbou násilia/ťažkej ujmy) · únos (premiestnenie/zadržiavanie osoby). §§: 182–183, 189, 209–210 (**over** — aj systematické zaradenie únosu).
**Doplňujúce otázky (over):** 1. Rozdiel pozbavenia a obmedzovania osobnej slobody (trvalosť/intenzita). 2. Vydieranie × hrubý nátlak × nátlak — odstupňovanie. 3. Vydieranie × lúpež (násilie k veci hneď × hrozba do budúcna). 4. Branie rukojemníka — čím sa líši od únosu? 5. Zavlečenie do cudziny.
**Časté chyby:** vydieranie zamenené s lúpežou — klasika! · „únos len detí" · obmedzovanie slobody vyžaduje dlhé trvanie (nie) · zabudnutý psychický nátlak.
**Vodítko:** 1 = tri SP + odlíšenie od lúpeže/nátlaku; 2 = tri SP bez odlíšení; 3 = definície hrubé; 4 = mieša vydieranie s lúpežou.

### A20 — TČ proti ľudskej dôstojnosti
**Kľúčové body:** chránené: sexuálna sloboda, integrita, autonómia; **absencia súhlasu** ako základný prvok (redefinícia znásilnenia) · sexuálne násilie (donútenie násilím/hrozbou; aj bez fyzického odporu pri bezbrannosti) · sexuálne zneužívanie (osoba neschopná súhlasu — deti do 15, duševná porucha; zneužitie moci/dôvery; smernica 2011/93/EÚ) · sexuálne obťažovanie (nie samostatná SP — napĺňa znaky iných TČ). §§: 199–203 (**over**; v summary 213–218 nesedí).
**Doplňujúce otázky (over):** 1. Čo mení redefinícia znásilnenia (súhlas namiesto odporu)? 2. Hranica 15 rokov — väzba na vek páchateľa z A5. 3. Zneužitie závislosti/dôvery — príklad (učiteľ, tréner). 4. Prečo obťažovanie nemá vlastnú SP a kadiaľ sa postihuje? 5. Súlož medzi príbuznými — samostatná SP?
**Časté chyby:** znásilnenie „len s fyzickým odporom obete" · vek ochrany 18 namiesto 15 (a naopak pri mravnej výchove) · obťažovanie ako samostatný TČ · zabudnuté osoby s duševnou poruchou.
**Vodítko:** 1 = súhlasový princíp + tri kategórie + smernica; 2 = kategórie bez súhlasového princípu; 3 = len násilie/zneužívanie hrubo; 4 = mieša kategórie.

### A21 — TČ proti rodine a mládeži
**Kľúčové body:** chránené: rodina, rodičovské povinnosti, vývin detí · zanedbanie povinnej výživy (dlhodobé neplnenie napriek schopnosti; najčastejší TČ proti rodine) · týranie blízkej a zverenej osoby (dlhodobé/opakované fyzické či psychické ubližovanie; domáce násilie) · ohrozovanie mravnej výchovy mládeže (alkohol, drogy, hazard, nemravný život; maloletý do 18). §§: 207, 208, 211 (**over**; v summary 222/223/226 nesedí).
**Doplňujúce otázky (over):** 1. Kedy sa zanedbanie výživy stáva trestným (koľko mesiacov?) a účinná ľútosť pri ňom (väzba A15!). 2. Týranie — jednorazový útok stačí? (nie — sústavnosť). 3. „Zverená osoba" — kto všetko? 4. Ohrozovanie mravnej výchovy × podanie alkoholu — vzťah. 5. Deti ako obete (A21) × ako páchatelia (A13).
**Časté chyby:** výživné trestné „hneď po prvom nezaplatení" · týranie len fyzické · hranica 15 namiesto 18 pri mravnej výchove · zabudnutá účinná ľútosť pri výživnom.
**Vodítko:** 1 = tri SP + sústavnosť týrania + účinná ľútosť; 2 = tri SP bez väzieb; 3 = definície hrubé; 4 = mieša hranice veku.

---

## Poznámky pre Babu (garantská kontrola)
1. **Čísla §§ vo všetkých štyroch summary** — viď upozornenie hore; po tvojom overení doplníme do summary aj pavúkov (triviálna oprava).
2. **A20:** zdroj cituje dôvodovú správu k redefinícii znásilnenia — over, či nová úprava (súhlasový princíp) už je účinná, nech summary neopisuje návrh ako platný stav.
3. **A19:** summary neuvádza §§ vôbec — pri kontrole doplň podľa TZ (§ 182–186, 189–192, 209–210 — over rozsah okruhu).
