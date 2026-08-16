# EÚ právo — podklady dávka 7 (A19–A21), klaster K4 časť 1

**Autor:** Code · **Stav:** nasadené v repe, čaká na push
**Rozsah:** A19 Súdny dvor EÚ · A20 Konanie pred SDEÚ · A21 Prejudiciálne konanie

---

## Čo sa zmenilo

Pri každom okruhu vymenené štyri vrstvy: **kvíz** (5 otázok), **prípadové štúdie** (3 prípady po 2 krokoch), **pavúk** (nový kľúč `spider`) a **koreňová citácia** `zdroj.citation`.

### A19 — Súdny dvor Európskej únie

- Pavúk: stred „Súdny dvor Európskej únie (SDEÚ)", 5 vetiev (právna úprava, zloženie, štruktúra, právomoci, generálny advokát).
- Prípady: Simmenthal (prednosť a povinnosť neaplikovať), štruktúra SDEÚ, rozsah právomocí.
- Citácia: `ECLI:EU:C:1982:335; ECLI:EU:C:1978:49; ECLI:EU:C:1987:452; čl. 19 ZEÚ; čl. 267 ZFEÚ`
  → **`ECLI:EU:C:1978:49; čl. 19 ZEÚ; čl. 251 – 281 ZFEÚ`**
  Odstránené CILFIT a Foto-Frost — v okruhu sa nepoužívajú; doplnené správne články o SDEÚ.

### A20 — Konanie pred Súdnym dvorom EÚ

- Pavúk: stred „Konanie pred Súdnym dvorom EÚ", 6 vetiev (právna úprava, fázy, typy konaní, priebeh veci, rozhodnutia, prípustnosť).
- Prípady: Foglia v Novello (umelý spor), žaloba o neplatnosť podľa čl. 263, postavenie návrhov generálneho advokáta.
- Citácia → **`ECLI:EU:C:1980:73; čl. 19 ZEÚ; čl. 251 – 281 a 263 ZFEÚ; Protokol č. 3`**

### A21 — Prejudiciálne konanie

- Pavúk: stred „Prejudiciálne konanie", 5 vetiev (právna úprava a cieľ, predmet, priebeh, účinky rozsudku, hranice).
- Prípady: Foto-Frost (neplatnosť aktu vysloví len Súdny dvor), predmet prejudiciálnej otázky, účinky rozsudku *ex tunc*.
- Citácia: `ECLI:EU:C:1982:335; ECLI:EU:C:1987:452; ECLI:EU:C:1978:49; čl. 267 ZFEÚ`
  → **`ECLI:EU:C:1987:452; čl. 267 ZFEÚ`**
  Odstránené CILFIT a Simmenthal — v prípadoch ani kvíze sa nepoužívajú (CILFIT ostáva len ako list v pavúku, bez samostatnej citácie).

---

## Strážené prekrytia

Podľa zadania mal každý judikát v tejto dávke padnúť najviac raz:

| Judikát | Použitie v dávke | Stav |
|---|---|---|
| Simmenthal `1978:49` | prípad v A19 | 1× ✔ |
| Foglia v Novello `1980:73` | prípad v A20 | 1× ✔ |
| Foto-Frost `1987:452` | prípad v A21 | 1× ✔ |
| CILFIT `1982:335` | **žiadny prípad** — len pavúk A21 a kvíz | 0× ✔ |

Zvyšné sloty sú článkové scenáre (čl. 19 ZEÚ, čl. 251 – 281 a 263 ZFEÚ, čl. 267 ZFEÚ, Protokol č. 3).

---

## Kontrola celého okruhu (38 súborov)

Overené v prehliadači nad živými dátami — parsovanie JSON, schéma kvízu, prípadov, pavúka, dlaždíc a `zdroj`.

- **Štrukturálne chyby: 0** vo všetkých 22 hotových okruhoch.
- Kvízy: 5 otázok × 4 možnosti, `correct` v rozsahu, `explanation` reťazec.
- Prípady: A1–A8 po 2, A9+ po 3; scenárový krok má `options: []`, otázkový krok má `explanation` ako objekt `{correct, wrong}`; `source` prítomný v každom kroku.
- Pavúky: **22/38** (A1–A21, A25). Zvyšných 16 (A22–A24, A26–A38) čaká na dávky 8+.
- Mapa `_map.json`: 7 klastrov, pokrytie **38/38**, **37 väzieb**, žiadna zlomená väzba.

---

## Opakovanie judikatúry po dávke 7

Počítané cez `source` v prípadových štúdiách (max. 2× podľa pravidla):

| Judikát | Počet | Okruhy | Poznámka |
|---|---|---|---|
| C‑409/13 `2015:217` | **4×** | A4, A5, A8, A10 | **prekročené** — otvorené, hlásené už skôr |
| C‑399/11 `2012:756` | 3× | A6, A13, **A31** | A31 zatiaľ neauditovaný, padne v dávke pre K5 |
| CILFIT `1982:335` | 3× | A16, **A22**, A25 | A22 neauditovaný — dávka 8 ho prepisuje na Köbler + Da Costa |
| Foto-Frost `1987:452` | 2× | A21, **A22** | to isté — po dávke 8 sa dorieši |
| ostatné (Simmenthal, Van Gend, Francovich, Factortame, Cassis, Dassonville, Gebhard…) | 2× | — | v limite ✔ |

Zlepšenie oproti stavu po dávke 6: CILFIT 6× → 3×, Foto-Frost 4× → 2×, Simmenthal 4× → 2×.

---

## Otvorené

1. **C‑409/13 v A4, A5, A8, A10** — štyri už auditované okruhy s takmer identickými scenármi. Oprava si vyžiada nový obsah (dva okruhy prepísať na iný judikát), nie je súčasťou tejto dávky.
2. Zvyšné pavúky: A22–A24 (dávka 8, uzavretie K4), potom K5 (A26–A31), K6 (A32–A35), K7 (A36–A38).
