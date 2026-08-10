# LexArena — schválené: nadpisy svetov + viditeľné stavy (úzka časť Stopy C)

> Babu schválila **jediný úzky zásah do dizajnu**: nadpisy troch svetov + vizuálne odlíšenie „pripravuje sa" / „čoskoro". **Nič iné z dizajnu sa nemení.** Nadväzuje na `claude_lexarena-prestavba-protokol-stopa-B.md`.

## Rozsah (presne toto, nič viac)

1. **Nadpisy svetov** — pridať viditeľné nadpisy: **Aréna** (Svet 1), **Tréningy** (Svet 2), **Súťaž a komunita** (Svet 3); Servis voliteľne.
   - **Štýl odvoď z existujúceho vzhľadu nadpisov kariet** (rovnaká rodina, hrúbka, farba) — nech pôsobia natívne, nie ako nový vizuálny jazyk.
   - **Umiestnenie ako súrodenci** pred prvou kartou svetu — **žiadne nové wrappery** (pravidlo o mobilnom `display:contents` + `order` platí). Doplň nadpisy do mobilného `order` sledu, nech sedia na správnom mieste v lineárnom poradí.

2. **Viditeľné stavy** — minimálne pravidlo, aby prvok vyzeral **neaktívne**:
   - Chipy **Rímske právo / Dejiny práva** = „pripravuje sa": stlmený vzhľad + kurzor `not-allowed`.
   - Karta **Obchod** = „čoskoro": nenápadný stlmený stav.
   - Odvoď zo súčasných farieb (znížená sýtosť / opacity). **Nerestyluj bežné chipy ani karty.**

## Tvrdé hranice (ostávajú v platnosti)
- **Nič iné z dizajnu sa nemení** — dlaždice, karty, farby, tiene, zaoblenia, lišta zostávajú. Len tieto dve pridané pravidlá.
- **Tmavý režim:** nové pravidlá musia fungovať aj v `html[data-theme="dark"]` — dolaď dark-variant (appka má dark overridy duplikované per sekcia, over oba režimy).
- Hooky nepremenúvať; zviazaný celok Sveta 1 nechať; filter rebríčka a bottom-nav nerozbiť; každý krok = commit + textový protokol; push na Babu.
- Toto je **jediná** schválená časť Stopy C. **Vlajkovú loď, konsolidáciu lišty a onboarding NEROBIŤ** bez ďalšieho odsúhlasenia Babu.

## Šírka presunutých kariet (Senáty / Judikatúra)
Babu sa rozhodne **až keď to uvidí naživo**. Zatiaľ **nechať tak** (Svet 3, širšie karty) — nemeniť, počkať na jej pohľad po pushnutí / lokálnom spustení.
