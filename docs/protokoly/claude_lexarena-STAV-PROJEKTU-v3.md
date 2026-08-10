# LexArena — stav projektu (súhrn v3, po uzavretí Stopy C)

> **Načo je tento dokument:** jediný súhrn celej prestavby UI — **nahrádza `claude_lexarena-STAV-PROJEKTU-v2.md`**. S týmto jedným súborom sa dá pokračovať v ktoromkoľvek novom čete.

---

## 1. Čo je LexArena a čo sa riešilo
LexArena (lexarena.sk) — hravá appka na prípravu na štátnice z práva. Zadanie od Babu: upratať hlavnú stránku (marketingovo rozdeliť, upozorniť na funkcie, logicky pospájať, zvýšiť prehľadnosť); obsah (právo) a dizajn dlaždíc sa nemenia. Postup: diagnostiky → návrh → etapy s commitmi a protokolmi → korekcie podľa Babu naživo. **Pôvodné zadanie „upratať UI" je kompletne hotové — vrátane Stopy C (lišta + onboarding).**

## 2. AKTUÁLNE ROZLOŽENIE (živé)
**Ľavý stĺpec (~708 px):**
1. **Spojená herná dlaždica** (`#quizCard`): výber oblasti (chipy + režimy 🎲/📗/📕) → mriežka 2×3 jednotných tlačidiel: Spustiť pojednávanie · 🏛️ Štátnicová sieň (výraznejšia, prstenec) · Kartičky · Prípady · 📊 Môj progres · 🕸️ Štruktúra otázok. Progres a Štruktúra fungujú aj bez oblasti; Štátnica bez oblasti scrollne na výber + toast; „Spustiť" aj prijatie výzvy scrollnú na kvíz.
2. **Študijné moduly** — Oblasti + zbalený „ďalší obsah".
3. **Bifľovačka** — 3 oblasti + 3 pod rozbaľovačom, menšie dlaždice.
4. **Judikatúra** (kotva za `#biflovackaCard`, fallback `#quizCard`; podpora `#judikaturaHost` v zálohe).
5. **Admin/garant panel** (posledný, rolovo gateovaný).

**Pravý stĺpec (pevných 420 px):**
6. **Register pojednávaní** (hore) — otvorená burza (cudzie výzvy vidno, prijať od kohokoľvek; mazať cudzie nejde, len skryť; vlastná výzva linkom).
7. **Súťaž a komunita** — Rebríček (TOP 3 + scroll) · Senáty · Súdna sieň · Nástenka · Tvoj názor · Návody (1 video viditeľné + 2 zbalené).
8. **Servis** — Obchod („čoskoro").

Stĺpce vyrovnané (~2 %). Mobil: lineárne poradie množín, bottom-nav: top · Hraj · Bifľovačka · Rebríček · profil. Tri rozbaľovače jedného vzoru (moduly / bifľovačka / videá).

## 3. Lišta a onboarding (Stopa C — hotové)
- **Lišta:** § + Získaj § = jeden prvok (klik na § → zárobok; ＋ náznak) · energia = jedna pilulka · 👋+ℹ️ = ❓ „Pomoc / O LexArene" (uvítanie otvoriteľné z návodu). `#earnBtn`/`#welcomeBtn` zrušené z markupu, väzby null-safe.
- **Uvítacie okno = pozvánka:** sľub + 3 veci (Štátnica · Pojednávanie · Bifľovačka) + CTA „Začni hrať →" (scroll na výber oblasti); testovacia fáza/súkromie/disclaimer zbalené.
- **Návod: 17 sekcií** (doplnené: výber oblasti + režimy, Progres, Moduly, Judikatúra, Senáty); čísla cez `data-econ`.
- **Avatari:** vo výbere hore 6 ilustrovaných základných (jeden ID priestor, `selectAvatar()`), odomykateľné nedotknuté; „🎭 Taláre a doplnky" = vstup do talár shopu.

## 4. Zamknuté rozhodnutia
Dizajn dlaždíc sa nemení (povolené boli: rámiky množín, stavy, zvýraznenie Štátnice, jednotné tlačidlá) · zviazaný celok sa nerozdeľuje, Štátnica v dlaždici s výberom (samostatný ťahúň vyskúšaný a zrušený) · Rímske/Dejiny „pripravuje sa" · Obchod „čoskoro" · Občianske krátky názov · Register = otvorená burza · **admin neviditeľný** (čo admin zmení/schváli, vidí len admin — verdikt/odôvodnenie ostáva; garanti s pečaťou a dátumom viditeľní všetkým).

## 5. Model práv obsahu
Študent nahlasuje (Súdna sieň, lajky, pečate za schválené — **prahy zdvihnúť, čísla nedoladené**) · garant mení otázky (pečať + dátum) a schvaľuje (plná atribúcia) · admin schvaľuje/mení neviditeľne (len nick študenta + dátum). **Otvorené:** či Babu upravuje otázky aj priamo a či má byť taká úprava súkromný draft.

## 6. Funkčné opravy v produkcii (staršie kolá)
Prípady dávajú § a berú energiu · výsledok duelu obom + tvorcovi pri návšteve (7 dní, max 3 modaly) · kvíz bez dvojitého skórovania · bifľovačka ×3 · moduly pripíšu § · register bez mazania cudzích · mŕtve UI preč.

## 7. Otvorené (nič nesúrne)
- **Prahy pečatí** — čísla na odsúhlasenie.
- **Súkromný draft admina** — otvorená otázka (bod 5).
- **Štátnicové podklady z A1–A4** (Trestné hmotné) — čaká na summary od Babu.
- **Overiť naživo:** prijatie výzvy z druhého zariadenia (scroll + register), uvítacie okno v anonymnom okne, § badge, výber ilustrovaného avatara.

## 8. Technické mantinely
Dizajn bez výslovného súhlasu nemeniť · hooky nepremenúvať · mobil = `display:contents` + `order` na `.set-panel` · filter rebríčka (chipy podľa textu/pozície) a bottom-nav nerozbíjať · Judikatúra kotví za `#biflovackaCard` · legacy avatari `student-f/m` v configu nechať (uložení hráči) · každá etapa = commit + textový protokol; push robí Babu.

## 9. Protokoly (história)
`...protokol-stopa-A/B.md`, `...-stopa-C-nadpisy-stavy.md`, `...nasadenie-potvrdenie.md`, `...protokol-rozlozenie-mnoziny.md`, `...protokol-korekcia-a-admin.md`, `...protokol-spojena-dlazdica.md`, `...protokol-balans-stlpcov.md`, `...protokol-stopa-C-uzavreta.md`, `...protokol-avatari-vo-vybere.md`. Diagnostiky a zadania — viď staršie verzie súhrnu.
