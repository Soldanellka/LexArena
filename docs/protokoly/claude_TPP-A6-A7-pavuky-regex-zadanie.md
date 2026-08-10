# LexArena — TPP A6+A7 pavúky, tolerantný regex jadra, count 2 (zadanie pre Code)

> Tri úlohy z jedného kola s Babu. Pravidlá platia (commit + protokol, push na Babu, `isValidSpider()`, nič cez globálny sync).

## 1. Regex jadra — chytať aj holé „Zapamätaj si"
Babu rozhodla: extrakcia má vyberať zo sekcie **„Zapamätaj si"** bez ohľadu na prívlastok. Uprav vzor v `statnice.js` tak, aby toleroval: „Zapamätaj si", „Zapamätaj si:", „Zapamätaj si (štátnicové jadro)" (veľkosť písmen, dvojbodka, medzery). Sekcia končí pri „Zdroj" alebo konci textu (ako doteraz). Pozor: v TPP A6/A7 existuje aj sekcia **„Zhrnutie (štátnicové jadro)"** na začiatku — tú nechytať (alebo chytať len ako fallback); primárne jadro je „Zapamätaj si" so zoznamom pomlčiek. Regresia: TPH extrakcie sa nesmú zmeniť (majú „Zapamätaj si (štátnicové jadro)" — nový vzor ich pokrýva).

## 2. `CRIMINAL_PROCESNE_COUNT` 0 → 2
Babu potvrdila. TPP A1/A2 majú zhrnutia (uložené v appke so zoznamom pomlčiek). Sieň začne používať procesné okruhy A1–A2, keď ich dvojica vytiahne; vyššie okruhy ďalej doberá z hmotného (hybrid). Over extrakciu na reálnych TPP A1/A2 summary z Firebase. *(Keď dostanú zhrnutia A3–A5, count pôjde na 5/7 — dávkovo.)*

## 3. TPP pavúky A6 a A7 — doplniť medzeru v sade
Do `Trestné právo procesné/data/A6.json` a `A7.json` (cestu over podľa existujúcich TPP pavúkov A1–A5, A8). Formát appky, len vlož + validuj.

### A6 — Obhajca, osoby so samostatnými obhajovacími právami
```json
{
  "center": "Obhajca × osoby so samostatnými obhajovacími právami",
  "branches": [
    { "label": "Obhajca (§ 36 TP)", "leaves": [
      "Kto – len advokát; samostatný subjekt konania, koná v mene obvineného",
      "Zvolený – obvinený si ho vyberá sám",
      "Ustanovený – súd/prokurátor pri povinnej obhajobe alebo nemajetnosti (§§ 39–42)",
      "Náhradný – na zabezpečenie neodkladného úkonu"
    ] },
    { "label": "Práva obhajcu (§ 44 TP)", "leaves": [
      "Účasť – zúčastňovať sa všetkých úkonov",
      "Dôkazy – navrhovať dôkazy, klásť otázky svedkom",
      "Opravné prostriedky – podávať v mene obvineného",
      "Komunikácia – s obvineným bez obmedzenia"
    ] },
    { "label": "Povinnosti obhajcu", "leaves": [
      "Mlčanlivosť – o všetkom z obhajoby; nemôže byť vypočúvaný ako svedok",
      "Záujem obvineného – koná v jeho prospech",
      "Koncipient – zastúpenie pri prečinoch a niektorých zločinoch so súhlasom obvineného"
    ] },
    { "label": "Samostatné obhajovacie práva", "leaves": [
      "Poškodený (§ 46) – nárok na náhradu škody, dôkazy, opravné prostriedky v rozsahu nároku",
      "Zúčastnená osoba (§ 47) – bráni vlastnícke práva pri zaistení/odňatí veci",
      "Osoba so zaisteným majetkom (§ 95a) – samostatná obrana majetku",
      "Dotknuté osoby – preskúmanie zákonnosti zásahu sudcom pre prípravné konanie"
    ] }
  ]
}
```

### A7 — Poškodený, obeť a zúčastnená osoba
```json
{
  "center": "Poškodený × obeť × zúčastnená osoba",
  "branches": [
    { "label": "Poškodený (§ 46 TP)", "leaves": [
      "Kto – osoba so škodou, ujmou na zdraví, nemajetkovou ujmou či ohrozenými právami",
      "Adhézne konanie – nárok na náhradu škody v trestnom konaní",
      "Práva – dôkazy, účasť na úkonoch, opravné prostriedky v rozsahu nároku, informácie",
      "Postavenie – strana konania, ak uplatní nárok"
    ] },
    { "label": "Obeť (zákon č. 274/2017)", "leaves": [
      "Kto – širší pojem než poškodený; aj osoby mimo procesu (napr. pozostalí)",
      "Obzvlášť zraniteľná obeť – dieťa, osoba 75+, zdravotne postihnutá, obete násilia a obchodovania",
      "Práva – informácie, odborná pomoc, ochrana pred sekundárnou viktimizáciou",
      "Odškodnenie – pri násilných trestných činoch"
    ] },
    { "label": "Zúčastnená osoba (§ 47 TP)", "leaves": [
      "Kto – osoba, ktorej vec bola zaistená alebo odňatá",
      "Práva – obrana vlastníctva, opravné prostriedky proti zaisteniu, informácie",
      "Postavenie – nie je stranou konania, má samostatné obhajovacie práva"
    ] },
    { "label": "Rozdiely", "leaves": [
      "Poškodený – procesná strana s nárokom (TP)",
      "Obeť – širší hmotnoprávny pojem (zákon o obetiach)",
      "Zúčastnená osoba – chráni majetok, nie nárok zo škody"
    ] }
  ]
}
```

## Overiť
Regex: TPP A1/A2 extrakcia vracia body zo „Zapamätaj si" · „Zhrnutie (štátnicové jadro)" sa nechytá ako jadro · TPH regresia bez zmeny · count 2: dvojica s procesným A1/A2 dá pravú dvojicu, vyšší procesný doberá z TPH · pavúky 2/2 validné, TPP mapa/strom sa kreslí (ak TPP mapu má; ak nie, fail-soft strom) · konzola čistá.
