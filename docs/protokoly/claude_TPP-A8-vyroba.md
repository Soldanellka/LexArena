# TPP A8 — Procesné úkony, poskytovanie informácií (výroba, oprava duplikátu)

> **Zdroj:** nové summary A8 od Babu (nahrádza duplikát A7 vo Firebase). Jadro má 6 odrážok → extrakcia bude sedieť.

## PAVÚK (formát appky)
```json
{
  "center": "Procesné úkony × poskytovanie informácií",
  "branches": [
    { "label": "Podanie (§ 62)", "leaves": [
      "Formy – písomne, ústne do zápisnice, elektronicky (KEP alebo úradná schránka)",
      "Podľa obsahu – posudzuje sa obsah, nie označenie („sťažnosť" môže byť odvolanie)"
    ] },
    { "label": "Zápisnica (§§ 58–61)", "leaves": [
      "Kedy – o každom úkone s významom pre konanie",
      "Náležitosti – orgán, miesto, čas, účel, prítomní, priebeh, vyhlásenia, podpisy",
      "Námietky (§ 59) – proti zneniu; orgán rozhodne a dôvodnú opraví"
    ] },
    { "label": "Doručovanie (§§ 65–68)", "leaves": [
      "Spôsoby – do vlastných rúk, bežné, elektronické (schránka)",
      "Fikcia doručenia (§ 66) – nevyzdvihnutá zásielka sa považuje za doručenú posledným dňom lehoty",
      "Výnimka – fikcia neplatí pri doručovaní obvinenému do vlastných rúk",
      "Elektronicky – doručené okamihom uloženia do aktivovanej schránky"
    ] },
    { "label": "Lehoty (§§ 63–64)", "leaves": [
      "Počítanie – dni od nasledujúceho dňa; týždne/mesiace koncom zhodného dňa",
      "Víkend a sviatok – koniec lehoty sa posúva na najbližší pracovný deň",
      "Navrátenie lehoty (§ 64) – vážne dôvody; žiadosť do 3 dní + súčasne vykonať úkon"
    ] },
    { "label": "Nazeranie do spisu (§ 69)", "leaves": [
      "Kto – obvinený, obhajca, poškodený, zúčastnená osoba, zástupcovia, probačný úradník…",
      "Obmedzenie – v prípravnom konaní možno odmietnuť pre ohrozenie účelu stíhania",
      "Výpisky a kópie – dovolené, ak neohrozia konanie"
    ] },
    { "label": "Poskytovanie informácií (§ 6)", "leaves": [
      "Chránené – prezumpcia neviny, súkromie, údaje maloletých a obetí, tajomstvá",
      "Neposkytnú sa – ak by ohrozili vyšetrovanie či účel konania",
      "Verejnosť – poznámky a nákresy účastníkom nemožno zakázať, ak nerušia priebeh"
    ] }
  ]
}
```

## ŠTÁTNICOVÝ PODKLAD
**Kľúčové body:** podanie § 62 (formy; podľa obsahu, nie názvu) · zápisnica §§ 58–61 (náležitosti, námietky) · doručovanie §§ 65–68 (do vlastných rúk, fikcia § 66 + výnimka pri obvinenom, elektronické) · lehoty §§ 63–64 (počítanie, víkend posúva, navrátenie: 3 dni + úkon) · nazeranie § 69 (kto, obmedzenie v prípravnom, kópie) · informácie § 6 (prezumpcia neviny, súkromie, kedy nie).
**Otázky (over):** 1. Podanie označené zle — čo s ním? 2. Prečo fikcia doručenia neplatí pri obvinenom do vlastných rúk? 3. Lehota 7 dní doručená v piatok — kedy končí? (praktický príklad). 4. Kedy možno odoprieť obhajcovi nazretie do spisu a dá sa proti tomu brániť? 5. Ako sa pri informovaní médií chráni prezumpcia neviny?
**Chyby:** lehota „od dňa doručenia" (od nasledujúceho!) · fikcia aplikovaná na obvineného · „nazeranie až po podaní obžaloby" · podanie odmietnuté pre zlý názov.
**Vodítko:** 1 = všetkých 6 inštitútov s detailmi (fikcia + výnimka, navrátenie, obmedzenie nazerania); 2 = inštitúty bez výnimiek; 3 = polovica inštitútov; 4 = mieša lehoty a doručovanie.

## Pre Code (malé zadanie)
1. Over vo Firebase, že summary A8 je už nahradené novým textom (procesné úkony) — až potom: `spider` do `Trestné právo procesné/data/A8.json` (validácia), a `CRIMINAL_PROCESNE_COUNT` **7 → 8**. Over extrakciu jadra A8 (6 odrážok).
2. Ak summary vo Firebase ešte obsahuje starý duplikát A7, počkaj na Babu (musí ho prepísať v appke) a nahlás.
