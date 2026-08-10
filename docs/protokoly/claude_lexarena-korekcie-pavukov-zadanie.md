# LexArena — korekcie pavúkov po garantskej kontrole (zadanie pre Code)

> **Kontext:** Babu garantsky overila §§ podľa Slov-Lexu a opravila summary (v appke). Toto zadanie premieta opravy do **pavúkov v repe**. A8 pavúk je už správne (OZZ potvrdené). Summary si Babu opravuje v appke sama — pavúky rob z tohto súboru. Pravidlá platia (commit + protokol, push na Babu, `isValidSpider()` po každej zmene, nič cez globálny sync).

## 1. A9 — doplniť objednávateľa (malá zmena)
Do vetvy **„Formy účastníctva"** doplniť tretí list (poradie: organizátor, návodca, objednávateľ, pomocník):
```
"Objednávateľ – požiadal iného, aby spáchal trestný čin (§ 21 ods. 1 písm. c)"
```
A vo vetve „Rozdiel" uprav list „Účastník" na: `"Účastník – podporuje, riadi, navádza alebo objednáva čin, ktorý vykoná iný"`.

## 2. A16 — opraviť právny základ EZR (jeden list)
Vo vetve „Eurozatykač (EZR)" nahradiť list o zákone 167/2026 týmto:
```
"Vnútroštátna úprava – zákon č. 154/2010 Z. z. o EZR; zákon č. 236/2017 Z. z. (EVP, uznávanie rozsudkov)"
```

## 3. A17 — nový pavúk (kompletná náhrada; pribudlo Zabitie)
```json
{
  "center": "Trestné činy proti životu (§§ 144–149)",
  "branches": [
    { "label": "Úkladná vražda (§ 144)", "leaves": [
      "Podstata – úmyselné usmrtenie s rozmyslom alebo po predchádzajúcej úvahe",
      "Rozmysel – premyslené, plánované konanie, nie afekt",
      "Sadzba – 20 až 25 rokov; kvalifikované formy doživotie",
      "Postavenie – najprísnejšie trestaný TČ proti životu"
    ] },
    { "label": "Vražda (§ 145)", "leaves": [
      "Podstata – úmyselné usmrtenie inej osoby",
      "Zavinenie – priamy úmysel alebo uzrozumenie (nepriamy úmysel)",
      "Sadzba – 15 až 20 rokov; kvalifikované formy 25 rokov alebo doživotie"
    ] },
    { "label": "Zabitie (§§ 147–148)", "leaves": [
      "Podstata – úmyselné usmrtenie za menej závažných okolností",
      "Situácie – silné rozrušenie (afekt), prekročenie nutnej obrany či krajnej núdze",
      "Sadzba – 3 až 8 rokov; kvalifikované formy vyššie",
      "Postavenie – stredná kategória medzi vraždou a usmrtením"
    ] },
    { "label": "Usmrtenie (§ 149)", "leaves": [
      "Podstata – nedbanlivostné spôsobenie smrti",
      "Zavinenie – porušenie povinnosti zo zákona, povolania či situácie",
      "Sadzba – do 3 rokov; kvalifikované formy vyššie (napr. alkohol pri nehode)"
    ] },
    { "label": "Porovnanie", "leaves": [
      "Kľúč – zavinenie: rozmysel × úmysel × afekt × nedbanlivosť",
      "Hierarchia sadzieb – úkladná vražda > vražda > zabitie > usmrtenie",
      "Chránená hodnota – život ako najvyššia hodnota"
    ] }
  ]
}
```

## 4. A18 — nový pavúk (doplnené správne §§)
```json
{
  "center": "TČ proti zdraviu × ohrozovacie delikty (§§ 155–178)",
  "branches": [
    { "label": "Ublíženie na zdraví (§§ 155–156)", "leaves": [
      "Podstata – porucha zdravia či ochorenie, nie len prechodné a bezvýznamné",
      "Znaky – vyžaduje lekárske ošetrenie, obmedzuje obvyklý spôsob života",
      "Trvanie – spravidla viac ako 7 dní",
      "Zavinenie – úmyselné aj nedbanlivostné formy"
    ] },
    { "label": "Ťažká ujma na zdraví (§ 155)", "leaves": [
      "Podstata – závažné poškodenie zdravia s dlhodobými následkami",
      "Formy – zmrzačenie, ochromenie údu, strata či oslabenie funkcie orgánu",
      "Ďalšie formy – dlhodobá alebo ťažká porucha zdravia, ohrozenie života"
    ] },
    { "label": "Ohrozovacie delikty (§§ 161–169)", "leaves": [
      "Podstata – reálne nebezpečenstvo smrti či vážnej ujmy, bez následku",
      "Neoprávnený experiment na človeku (§§ 161–162)",
      "Šírenie nebezpečnej nákazlivej choroby (§§ 163–164) – aj porušenie karantény",
      "Ohrozovanie vírusom HIV (§§ 165–166)",
      "Závadné potraviny a liečivá (§§ 168–169)"
    ] },
    { "label": "Neposkytnutie pomoci (§§ 177–178)", "leaves": [
      "Podstata – nepomôže osobe v nebezpečenstve smrti či vážnej ujmy",
      "Podmienka – mohol pomôcť bez ohrozenia seba alebo iného",
      "Dve SP – všeobecná (§ 177) × vodič (§ 178)",
      "Charakter – ohrozovací delikt, povinnosť solidarity"
    ] }
  ]
}
```

## 5. A20 — nový pavúk (znásilnenie doplnené ako vlajková SP)
```json
{
  "center": "TČ proti ľudskej dôstojnosti (§§ 199–203)",
  "branches": [
    { "label": "Znásilnenie (§ 199)", "leaves": [
      "Podstata – donútenie k súloži či inému sexuálnemu styku násilím, hrozbou alebo zneužitím bezbrannosti",
      "Súhlas – absencia slobodného súhlasu je jadrom skutkovej podstaty",
      "Odpor – fyzický odpor nie je podmienkou",
      "Bezbrannosť – spánok, intoxikácia, zdravotný stav rovnocenné násiliu"
    ] },
    { "label": "Sexuálne násilie (§ 200)", "leaves": [
      "Podstata – donútenie k inému sexuálnemu konaniu než súlož",
      "Prostriedky – násilie, hrozba bezprostredného násilia, zneužitie bezbrannosti",
      "Rozsah – širší okruh sexuálnych prejavov zasahujúcich sexuálnu slobodu"
    ] },
    { "label": "Pohlavné zneužívanie (§ 201)", "leaves": [
      "Podstata – konanie voči osobe neschopnej dať platný súhlas",
      "Chránení – najmä deti do 15 rokov a osoby s duševnou poruchou",
      "Znak – zneužitie autority, dôvery, závislosti či bezbrannosti",
      "Európsky rámec – smernica 2011/93/EÚ o ochrane detí"
    ] },
    { "label": "Súlož medzi príbuznými (§ 203)", "leaves": [
      "Podstata – sexuálny styk medzi príbuznými, právne neprípustný",
      "Chráni – rodinné vzťahy, vývin detí, zákaz zneužitia autority v rodine"
    ] },
    { "label": "Sexuálne obťažovanie", "leaves": [
      "Podstata – nežiaduce správanie sexuálnej povahy narúšajúce dôstojnosť",
      "Formy – verbálne, neverbálne, fyzické",
      "Právne zaradenie – bez samostatnej SP; môže napĺňať § 199, § 200, § 192, § 189, § 183"
    ] }
  ]
}
```

## 6. A21 — doplniť §§ (tri listy + zaradenie)
Do listov doplniť §§: zanedbanie výživy **§ 207**, týranie **§ 208**, mravná výchova **§ 211** (napr. „Podstata…" listy rozšíriť o paragraf v labeli vetvy: „Zanedbanie povinnej výživy (§ 207)" atď.). Vetvu „Chránený záujem" doplniť o list: `"Zaradenie – Tretia hlava osobitnej časti (§§ 204–211)"`.

## 7. A10 — doplniť §§ do pavúka (malé)
Vetva „Súbeh": list „Úhrnný / súhrnný trest" → `"Úhrnný (§ 41) × súhrnný (§ 42) trest – podľa existencie skoršieho rozsudku"`. Vetva „Recidíva": list o § 47 už existuje — over znenie.

## Overiť po zmenách
`isValidSpider()` pre všetkých 7 dotknutých okruhov · mapa a links nedotknuté · UI: stromy A9, A16, A17, A18, A20, A21, A10 sa kreslia s novými textami · konzola čistá.

## Pripomienky (mimo tohto zadania)
- Babu opravené summary ukladá v appke → po tomto kole je ideálny čas na **prvý GitHub sync** (zálohuje summary aj označí overridy).
- Zadanie dávky **A22–A24** (`claude_lexarena-davka-A22-A24-nasadenie-zadanie.md`) vrátane `CRIMINAL_HMOTNE_COUNT → 24` — ak ešte nebolo odovzdané, ide hneď po korekciách.
