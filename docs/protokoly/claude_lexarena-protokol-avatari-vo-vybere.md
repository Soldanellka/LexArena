# LexArena — ilustrovaní avatari vo výbere (protokol od Code, nasadené)

> **Fáza:** pushnuté (`dd2c60e..c9d26e6`), Vercel nasadí sám. Nadväzuje na `claude_lexarena-avatari-vo-vybere-zadanie.md`.

## Mapovanie ID — overené, nie hádané
Obidva modály zapisujú cez tú istú `selectAvatar()` (`avatar.js:500`), ktorá berie kľúče `AVATAR_CONFIG.AVATARS`. Legacy `student-f`/`student-m` aj 6 základných (`studentka-tmava/medena/blond`, `student-tmavy/medeny/blond`, všetky `unlock:'default'`, `avatar.js:77-82`) sú **v jednom ID priestore** — emoji dlaždice neboli iný systém, len iný výber z toho istého. Presun bez rizika pre `#userAvatar`, energiu aj talár overlay.

## Čo sa zmenilo (`init.js:104`)
- **Základná sada hore** — 6 ilustrovaných dlaždíc v 3 stĺpcoch (`-full-bust.png`, všetkých 6 súborov overených, žiadne 404), bez popisu (6× „Dostupné pre všetkých" = šum).
- **Odomykateľné pod tým** — mačka / sova / pes / prestige **bez zmeny** (2 stĺpce, zámky, `opacity 0.55`, `comingSoon`).
- `student-f`/`student-m` **nezmazané** z configu — hráči, ktorí ich majú vo Firebase, sa vykreslia ďalej; len sa už nedajú novo zvoliť.
- **„🎨 Zmeniť vzhľad" → „🎭 Taláre a doplnky"** — zostáva (overené: `#openAvatarPickerFromSelect` je **jediný živý vstup** do pickera/talár shopu; `#changeAvatarBtn` v markupe neexistuje). Po vytiahnutí sady hore picker duplikoval výber postavy, nový názov hovorí, čo je tam navyše.

## Overené
Obe témy (light desktop, dark mobil 375), bez pretečenia, popisy neorezané, konzola čistá. Klik zámerne nevykonaný (zapisoval by do produkčnej Firebase pod nickom Babu); wiring nezmenený (`card.dataset.id` → `selectAvatar`).

## Babu po nasadení
Klik na avatar v lište → vybrať ilustrovaného avatara → overiť, že sa prejaví v hlavičke aj po reloade, a že taláre fungujú cez „🎭 Taláre a doplnky".
