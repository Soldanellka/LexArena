# LexArena — prestavba do množín + ťahúň (protokol od Code)

> **Fáza:** prestavba hlavnej stránky do 5 množín hotová — 3 nové commity (**6 nepushnutých spolu**). Nadväzuje na `claude_lexarena-rozlozenie-mnoziny-zadanie.md` a nákres `...-nakres-rozlozenia-FINAL.html`. Kolo 2 (TOP 3 + scroll, zbalené moduly, menšie dlaždice, Občianske názov, scroll na kvíz) už bolo hotové predtým.

## Commity
- **`c03747f`** — zrušený dvojstĺpec Rebríček + Senáty → **pod sebou na plnú šírku** (nové zadanie).
- **`729b35c`** — prestavba do **5 množín** (rámiky + presuny + výzvy hore).
- **`f1278c4`** — **Štátnica ako ťahúň** s väzbou na výber oblasti.

## Výsledné rozloženie
- **Ľavý stĺpec:** `setTraining` (Štátnica ťahúň → Pojednávanie → Výzvy → Hry) · `setMoreTraining` (Bifľovačka → Judikatúra → Môj progres → Štruktúra otázok) · `setModules`.
- **Pravý stĺpec:** `setCommunity` (Rebríček → Senáty → Súdna sieň → Nástenka → Tvoj názor → Návody) · `setService`.
- `#gamesSection` rozdelený — Kartičky a Prípady ostali (potrebujú oblasť), Štátnica dostala vlastnú dlaždicu `#statniceHeroCard`, Progres a Štruktúra šli do Ďalších tréningov. **Všetky tlačidlá si ponechali pôvodné ID aj triedy** → handlery bez zmeny.
- **Mobilné poradie** sa zjednodušilo na úroveň `.set-panel` (1–5) namiesto 18 pravidiel po kartách — nová karta sa už nemôže „stratiť" medzi množinami.
- **Rámik množiny:** 1px `var(--card-border)`, `var(--radius)`, jemné presvetlenie; žiadna nová farba, tmavá téma má vlastný variant.
- **Štátnica ťahúň:** klik bez oblasti → zroluje na výber v `#quizCard`, zvýrazní + toast; s oblasťou → spustí rovno. Výber oblasti sa nezdvojuje.

## Otestované (desktop 1280 + mobil 375, obe témy)
5 panelov v cieľovom poradí · mobil `display:contents`, panely 1–5 za sebou, bez horizontálneho scrollu · filter rebríčka na mieste · 5/5 bottom-nav cieľov · 6/6 zbaliteľných sekcií · zviazaný celok kŕmi hry (Pracovné → A1+A2, 10 kartičiek, 4 prípady) · Judikatúra v Ďalších tréningoch · oba scrolly fungujú · konzola čistá.

---

## Na rozhodnutie (Code nerobila sama)

### 1. Nepomer stĺpcov (úloha 7)
Zmerané: **ľavý ≈ 2 950 px, pravý ≈ 2 130 px** — ľavý o ~820 px (39 %) dlhší. Nie dramatické, ale viditeľné. Návrh Code: presunúť `setModules` (239 px) doprava pod Servis → rozdiel klesne na ~310 px.

### 2. „Účet a skupiny" v Servise
Taká karta **neexistuje** — účet je tlačidlo v lište (`#loginDeviceBtn`), skupiny sú vnútri avatarového modálu. Vytvoriť novú kartu = nové UI nad rámec „usporiadania", tak to Code nerobila. Doplniť, alebo Servis nechať ako Obchod (+ admin panel)?

### 3. Judikatúra/dvojice v riadku
Nákres ukazoval Bifľovačku/Progres a Štruktúru/Judikatúru ako **dvojice vedľa seba**. Code ich nechala **pod sebou na plnú šírku** (dvojstĺpec vnútri panelu pri zúžených stĺpcoch 564 px → úzke karty). Presné podľa nákresu = jedno CSS pravidlo, ak Babu chce.

**Push na Babu.**
