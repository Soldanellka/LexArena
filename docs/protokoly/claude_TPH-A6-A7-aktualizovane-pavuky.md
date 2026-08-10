# TPH — aktualizované pavúky A6 a A7 (z rozšírených summary Babu)

> **Pre Code:** náhrada existujúcich `spider` polí v `Trestné právo hmotné/data/A6.json` a `A7.json` (bohatšie texty od Babu — latinské pojmy, dôsledky omylu, podmienky a zásady, rozdiel v proporcionalite, doplnková vetva). Validovať `isValidSpider()`, obsah nemeniť. **Netýka sa TPP** — medzera TPP A6/A7 ostáva otvorená.

## A6 — Subjektívna stránka, omyl (náhrada)
```json
{
  "center": "Subjektívna stránka – zavinenie × omyl",
  "branches": [
    { "label": "Subjektívna stránka", "leaves": [
      "Podstata – vnútorný psychický vzťah páchateľa k činu, následku a okolnostiam",
      "Zavinenie – obligatórny znak; bez zavinenia nie je trestný čin",
      "Motív a pohnútka – znak len vtedy, keď to skutková podstata vyžaduje"
    ] },
    { "label": "Úmysel (dolus)", "leaves": [
      "Priamy úmysel (dolus directus) – páchateľ chce spôsobiť následok",
      "Nepriamy úmysel (dolus eventualis) – vie, že následok môže vzniknúť, a je s tým uzrozumený"
    ] },
    { "label": "Nedbanlivosť (culpa)", "leaves": [
      "Vedomá – vie, že následok môže vzniknúť, ale bez primeraného dôvodu sa spolieha, že nenastane",
      "Nevedomá – nevedel, hoci vzhľadom na okolnosti vedieť mal a mohol"
    ] },
    { "label": "Skutkový omyl", "leaves": [
      "Podstata – omyl o skutkových okolnostiach (myslí si, že strieľa do zvieraťa, je to človek)",
      "Dôsledok – môže vylúčiť úmysel",
      "Reťazec – posúdenie ako nedbanlivosť; ak nedbanlivosť nie je trestná → bez zodpovednosti"
    ] },
    { "label": "Právny omyl", "leaves": [
      "Podstata – omyl o tom, či je konanie trestné",
      "Nevyhnutný – nemohol vedieť, že konanie je trestné → vylučuje zavinenie",
      "Vyhnuteľný – nevylučuje zavinenie, môže znížiť trest"
    ] },
    { "label": "Význam", "leaves": [
      "Rozhoduje – o vzniku zodpovednosti, forme zavinenia, kvalifikácii a výmere trestu",
      "Delenie TČ – odlíšenie úmyselných a nedbanlivostných trestných činov"
    ] }
  ]
}
```

## A7 — Okolnosti vylučujúce protiprávnosť (náhrada)
```json
{
  "center": "Okolnosti vylučujúce protiprávnosť (§§ 24–25)",
  "branches": [
    { "label": "Pojem", "leaves": [
      "Podstata – konanie formálne napĺňa znaky TČ, ale nie je protiprávne",
      "Dôvod – právo výnimočne dovoľuje konať pre vyšší právny dôvod",
      "Dôsledok – nejde o trestný čin, zodpovednosť nevzniká"
    ] },
    { "label": "Nutná obrana (§ 25)", "leaves": [
      "Podmienky – protiprávny útok, ktorý trvá alebo priamo hrozí",
      "Miera – obrana nesmie byť zjavne neprimeraná útoku",
      "Zásada – môže byť aj intenzívnejšia než útok; obranca nemusí ustupovať",
      "Zviera – obrana možná, ak útok zvieraťa vyvolal človek"
    ] },
    { "label": "Krajná núdza (§ 24)", "leaves": [
      "Podmienky – bezprostredné nebezpečenstvo (nie útok), ktoré nemožno odvrátiť inak",
      "Proporcionalita – následok nesmie byť zjavne závažnejší než hroziaci",
      "Subsidiarita – iba ak sa nebezpečenstvo nedalo odvrátiť inak"
    ] },
    { "label": "Rozdiel obrana × núdza", "leaves": [
      "Proti čomu – obrana proti útoku × núdza proti nebezpečenstvu",
      "Proporcionalita – núdza ju vyžaduje, obrana nie (len nie zjavná neprimeranosť)",
      "Subsidiarita – len pri krajnej núdzi"
    ] },
    { "label": "Ďalšie okolnosti", "leaves": [
      "Súhlas poškodeného – pri záujmoch, o ktorých môže poškodený rozhodovať",
      "Povolené riziko – šport, medicína, vedecké experimenty",
      "Výkon práva alebo povinnosti – napr. policajt pri zásahu",
      "Plnenie príkazu – ak príkaz nie je zjavne nezákonný"
    ] }
  ]
}
```
