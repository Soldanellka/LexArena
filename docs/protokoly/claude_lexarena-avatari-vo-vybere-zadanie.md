# LexArena — ilustrovaní avatari hore vo výbere (zadanie pre Code)

> **Kontext:** v modáli „Vyber avatar" (`avatarSelectModal`, otvára klik na avatar v lište) sú hore dve **generické emoji dlaždice** „Študentka práva / Študent práva", a **ilustrovaní avatari** (Študentka tmavé/medené/blond vlasy, Študent…) sú schovaní až za odkazom „🎨 Zmeniť vzhľad" (druhý modál `avatarPickerModal`). Babu chce ilustrovaných avatarov **rovno hore vo výbere namiesto emoji dlaždíc**.

## Úloha
1. V mriežke „Vyber avatar" nahradiť dve emoji dlaždice (Študentka/Študent práva) **ilustrovanými základnými avatarmi** z pickera (všetky voľné varianty — 3 študentky + 3 študenti, resp. koľko ich základná sada má). Zobraziť ich s obrázkami, ako ich pozná picker.
2. **Odomykateľné dlaždice ostávajú** (Právnická mačka za 3000 §, Sova za 100 nahlásení, Pes vernosti za 30 dní streaku, Prestige „čoskoro") — nedotknuté, vrátane zámkov a podmienok.
3. Odkaz „🎨 Zmeniť vzhľad" — posúď: ak po vytiahnutí základnej sady hore stráca zmysel (duplicita), môže viesť už len na taláre/doplnky, alebo zmiznúť. **Ak by mal zmiznúť, over, že talár shop má iný vstup — inak ho nechaj.**
4. ⚠️ **Mapovanie ID avatarov over, nehádaj:** emoji dlaždice a picker môžu používať rôzne identifikátory. Výber z novej mriežky musí zapisovať to isté, čo dnes zapisuje picker (hlavička `#userAvatar`, energia, talár overlay cez `scripts/avatar.js` musia fungovať bez zmeny). Ak sú ID priestory rôzne, zmapuj ich explicitne a popíš v protokole.

## Pravidlá
Vzhľad dlaždíc modálu nechať (rovnaké karty, len iný obsah) · hooky/ID nepremenúvať · fakulta, skupiny a testy v modáli nedotknuté · tmavý režim · commit + protokol · push na Babu.

## Otestovať
Výber ilustrovaného avatara z hornej mriežky → prejaví sa v hlavičke aj po reloade · energia a talár fungujú · odomykateľné dlaždice sa správajú ako doteraz (zámky, podmienky, kúpa) · „Zmeniť vzhľad" podľa rozhodnutia z bodu 3 · obe témy, mobil · konzola čistá.
