# LexArena — plný akcent tria + Register doľava (protokol od Code)

> **Fáza:** hotové · commit `01f891a`, lokálne — push na Babu. Nadväzuje na `claude_lexarena-trio-akcent-register-zadanie.md`. **Otvorené: balans stĺpcov (121 %) — rozhodne Babu naživo.**

## 1. Trio — plný akcent
`styles.css:264` štýl · `:52` a `:78` premenné · `index.html:363` markup

- **Aktívny stav:** vlastný sýty gradient 135° (nie `.btn-primary`). Ikona 26 px, font 15,5 px/700 (bežné 13,3 px/600), padding 13×18, tieň `0 8px 22px`, výška 52 px vs 48 px; hover dvíha o 2 px.

| Téma | CTA gradient | Bežné tlačidlá |
|---|---|---|
| Svetlá | `#ff6f91 → #d93b66` (sýtejšia ružová, tmavší koniec) | `#f08aa6 → #ff6f91` |
| Tmavá | `#3b8fd0 → #1f4f7a` (svetlejší koniec palety) | sivé `#2a2b2e → #1b1c1f` |

V tmavej téme podstatné: `.btn-primary` tam ide do tmavých modrých, ktoré splývajú — CTA berie svetlejší koniec palety, aby vystúpilo rovnako ako v svetlej.
- **Vypnutý stav:** gradient ostáva, len `opacity 0.72` + `saturate(0.55)`; ikone sa sýtosť vracia (`saturate(1.9)` na `::before`) — plne čitateľná. Kurzor `not-allowed`, hint bez zmeny. **Zámerne nepadá pod `.btn:disabled`** (opacity 0.45 + grayscale) — presne to spôsobovalo, že trio vyzeralo bledšie než bežné akcie.
- **Ikony v `data-icon`, kreslí `::before`** — 🥊 Pojednávanie · ⚔️ Vyzvi · 🏛️ Štátnica. Nie kozmetika: `app.js` po výbere oblasti prepisuje `startQuizBtn.textContent`, čo by emoji v texte zmazalo; overené, že ikona po prepise zostáva. Budúca obrázková grafika: stačí `::before` → `background-image`.
- **Nájdená a opravená chyba:** prvé tmavé pravidlo malo špecificitu (0,3,0) ako `:root[data-theme="dark"] .btn` nižšie v súbore — vyhralo by ono a trio by bolo v tmavej sivé. Pridané `.btn` do selektora (0,4,0); overené na kaskáde, nie odhadom.

## 2. Register pojednávaní doľava
`index.html:432` nová pozícia · `:121` miesto po ňom · `styles.css:1244` mobilné poradie

- `#duelBankCard` v množine **🥊 Hraj, za hernou dlaždicou** (pod ňou, nie nad: hlavný tok „vyber oblasť → hraj" ostáva prvý; register je to, čo si hráč pozrie potom). Množina `setRegister` (+ nadpis „⚔️ Výzvy") zanikla.
- Pravý stĺpec: Súťaž a komunita → Servis ✅ · Mobil prečíslovaný: Hraj (1) → Uč sa (2) → Súťaž (3) → Servis (4) → Správa (5); register ide s množinou ✅ · Bottom-nav bez zmeny (na register nikdy neukazoval) ✅

### ⚠️ Nové výšky stĺpcov — nevyrovnávané
| | Predtým | Teraz |
|---|---|---|
| Ľavý (obsah) | ~1 988 px | **2 184 px** |
| Pravý (obsah) | ~1 951 px | **1 810 px** |
| Pomer | ~102 % | **121 % (+374 px)** |

Merané ako obsah, nie box (flex `stretch` by výšku boxov vyrovnal a meranie by klamalo). Z rozdielu ~280 px presun registra + ~95 px vyššie trio. **Rozhodnutie na Babu naživo.**

## Testy
Obe témy × zapnuté/vypnuté trio: gradient vyhráva kaskádu vo všetkých 4 kombináciách ✅ · ikona po prepise `textContent` zostáva ✅ · mobil 375: trio 3× plná šírka (295×52), zvyšné 4 v 2×2 (144×48), bez pretečenia ✅ · filter rebríčka ✅ · bottom-nav 4/4 ✅ · zbaliteľné 6/6 vrátane `.highlight-bank` ✅ · scroll pri prijatí výzvy: `#quizArea` v rovnakom stĺpci ✅ · konzola čistá ✅

## Otvorené / dovetok
- **Snímky sa nepodarili** (panel prehliadača nezobrazený → stránka nekompozituje) — nahradené nameranými hodnotami (gradienty, rozmery, víťazi kaskády).
- **Mobilné pravidlo pre osamotenú poslednú dlaždicu** prepnuté z `nth-child(odd)` na `(even)` — trio zaberá celé riadky, posunula sa parita zvyšku. Dnes (7 akcií) orphan nevzniká; pri 8 by sa posledná roztiahla, ako má.
- **PUSHNUTÉ:** `b353edf..01f891a` na `origin/main`, Vercel nasadí sám. Babu po nasadení: trio v tmavej téme (modrý gradient je iná situácia než ružový) + balans stĺpcov (ľavý +374 px).
