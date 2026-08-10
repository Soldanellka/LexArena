# LexArena — stav projektu (súhrn, aktualizácia po spojenej dlaždici)

> **Načo je tento dokument:** jediný súhrn celej prestavby UI — nahrádza predchádzajúci `claude_lexarena-STAV-PROJEKTU.md`. S týmto jedným súborom sa dá pokračovať v ktoromkoľvek novom čete. Detailné protokoly = história (zoznam na konci).

---

## 1. Čo je LexArena a čo sme riešili
LexArena (lexarena.sk) je hravá appka na prípravu na štátnice z práva. Zadanie od Babu: **upratať hlavnú stránku** — rozdeliť marketingovo, upozorniť na funkcie, logicky pospájať, zvýšiť prehľadnosť. Obsah (právo) sa nemení, dizajn dlaždíc a stránky sa nemení. Postup: diagnostika (technická + funkčná) → návrh → prestavba v etapách (commit + textový protokol) → korekcie podľa Babu naživo.

---

## 2. AKTUÁLNE ROZLOŽENIE (živé na produkcii)

**Ľavý stĺpec (2/3):**
1. **Spojená herná dlaždica** (`#quizCard`) — hore **výber oblasti** (chipy + 3 režimy 🎲/📗/📕), pod ním šesť akcií: **Spustiť pojednávanie · Kartičky · Prípady · 🏛️ Štátnicová sieň (zvýraznená) · 📊 Môj progres · 🕸️ Štruktúra otázok**. Jeden krok: vyberiem oblasť a hrám, čo chcem. Progres a Štruktúra fungujú aj bez oblasti; Štátnica bez oblasti scrollne na výber + toast.
2. **Študijné moduly** — Oblasti + zbalený „ďalší obsah" (staršie moduly).
3. **Bifľovačka** (menšie dlaždice).
4. **Judikatúra** (posledná; kotví za Bifľovačkou).

**Pravý stĺpec (1/3):**
5. **Register pojednávaní** (hore) — otvorená burza: vidno aj cudzie výzvy, prijať možno od kohokoľvek; prijatie → scroll na kvíz; vlastná výzva sa dá poslať linkom; cudzie sa nedajú mazať (len skryť u seba).
6. **Súťaž a komunita** — Rebríček (TOP 3 + scroll) · Senáty · Súdna sieň · Nástenka · Tvoj názor · Návody.
7. **Servis** — Obchod („čoskoro") + admin panel (rolovo skrytý). Karta „Účet" sa nevyrába (účet je v lište, skupiny v avatarovom modáli).

Množiny majú jemné rámiky (`.set-panel`); mobil = lineárne poradie množín; bottom-nav: top · Hraj · Bifľovačka · Rebríček · profil. **Stĺpce prakticky vyrovnané (1 606 vs 1 516 px).**

---

## 3. Zamknuté rozhodnutia
- **Dizajn dlaždíc a stránky sa nemení**; povolené boli len: nadpisy/rámiky množín, stlmené stavy, zvýraznenie Štátnice.
- **Zviazaný celok:** výber oblasti kŕmi Pojednávanie, Kartičky, Prípady aj Štátnicu — nerozdeľuje sa; Štátnica **musí** byť v dlaždici s výberom (samostatný „ťahúň" bol vyskúšaný a zrušený).
- **Rímske + Dejiny:** chipy vypnuté „pripravuje sa" (obsah Babu pripravuje). **Obchod:** „čoskoro" (predaj § keď sa appka chytí). **Občianske právo:** krátky názov (dual mechanika hmotné+procesné nedotknutá).
- **Register:** otvorená burza (zámer), opravený len proti mazaniu cudzích.
- **Admin je neviditeľný:** čo admin zmení/schváli, vidí len admin (verdikt/odôvodnenie ostáva, podpis nie — aj spätne). Garantské podpisy a pečate vidia všetci.

## 4. Model práv obsahu (zavedené pravidlá)
- **Študent** — nemení, nahlasuje → Súdna sieň, lajky; pečate za schválené (prah sa zdvihne — čísla nedoladené).
- **Garant** — mení otázky (pečať + dátum, viditeľné všetkým); schvaľuje → „nick študenta + schválené garantom + nick garanta + pečať".
- **Admin (Babu)** — schvaľuje/mení neviditeľne: verejne len nick študenta (+ dátum). Implementované v Súdnej sieni aj pri pečiatkach úprav.
- **Nedoriešené:** či Babu upravuje otázky aj priamo a či má byť taká úprava súkromný draft (otvorená otázka).

---

## 5. Čo všetko je nasadené (funkčné opravy, staršie kolá)
Prípady dávajú § a berú energiu · výsledok duelu vidia obaja + tvorca pri ďalšej návšteve (okno 7 dní, max 3 modaly) · kvíz sa nedá odkliknúť dvakrát · bifľovačka počíta ×3 · moduly pripíšu § · mŕtve UI odstránené · rebríček TOP 3 + scroll · zbalené staršie moduly · menšie dlaždice bifľovačky · scroll na kvíz.

## 6. Otvorené / nezačaté
- **Zvyšok Stopy C** (po odsúhlasení): konsolidácia lišty (avatar+paleta, § + Získaj §, energia, 👋+ℹ️ → „Pomoc") · onboarding (uvítacie okno ako pozvánka; doplniť do návodu: výber oblasti + režimy, Judikatúra, Moduly, Senáty, dashboard).
- **Pečate** — zdvihnúť prahy (čísla na odsúhlasenie).
- **Súkromný draft admina** — otvorená otázka (bod 4).
- **Štátnicové podklady z A1–A4** (Trestné hmotné) — čaká na summary od Babu.
- **Overiť naživo:** prijatie výzvy z Registra → scroll na kvíz (výzvou z druhého zariadenia).
- **Mobil:** šesť tlačidiel v dlaždici sa zalamuje — ak natlačené, riešiť menšími tlačidlami/mriežkou.

## 7. Technické mantinely (platia stále)
Dizajn sa nemení bez výslovného súhlasu · hooky (ID/triedy/`data-*`/`window.*`) sa nepremenúvajú · mobil = `display:contents` + `order` na množinách `.set-panel` · filter rebríčka (chipy podľa textu/pozície) a bottom-nav nerozbíjať · Judikatúra kotví za `#biflovackaCard` (fallback `#quizCard`) · každá etapa = commit + textový protokol; push robí Babu.

## 8. Zdrojové súbory (história)
Diagnostiky: `...diagnostika-vystup-od-code.md` (technická), `...funkcna-diagnostika-vystup-od-code.md` (funkčná). Návrh: `...ui-upratanie-navrh-v2.md` + nákresy `...nakres-rozlozenia*.html`. Zadania: `...prestavba-zadanie-pre-code.md`, `...rozhodnutia-stopa-B.md`, `...nadpisy-stavy-zadanie.md`, `...upravy-kolo-2-zadanie.md`, `...rozlozenie-mnoziny-zadanie.md`, `...korekcia-rozlozenia-zadanie.md`, `...spojena-dlazdica-zadanie.md`. Protokoly: `...protokol-stopa-A.md`, `...-stopa-B.md`, `...-stopa-C-nadpisy-stavy.md`, `...nasadenie-potvrdenie.md`, `...protokol-rozlozenie-mnoziny.md`, `...protokol-korekcia-a-admin.md`, `...protokol-spojena-dlazdica.md`.
