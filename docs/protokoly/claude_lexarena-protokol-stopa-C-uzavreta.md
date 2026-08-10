# LexArena — šírka stĺpca, videá, lišta + onboarding = Stopa C uzavretá (protokol od Code)

> **Fáza:** pushnuté a živé (`9297bd9..b334189`, potom `b334189..dd2c60e`). **Stopa C je týmto celá uzavretá** (vlajková loď bola hotová skôr, teraz lišta + onboarding).

## Šírka + videá · `b334189`
- **Pravý stĺpec späť na pevných 420 px**, ľavý berie zvyšok (708 px). Rebríček a senáty už nie sú stiesnené. Stĺpce ostali vyrovnané (1 988 vs 2 029 px, 2 %) — užší pravý narástol, ale odkryté prvé video to vyrovnalo.
- **Videá:** prvé vždy viditeľné, dve pod rozbaľovačom „▸ Ďalšie videá (2)". Nováčik vidí, že sa tu dá zarobiť.
- Otestované aj stredný breakpoint 800 px (stĺpce pod sebou).

## A) Konsolidácia lišty · `9f22d2e`
Vpravo v lište z 8 solitérov na 6:
- **§ + Získaj §** = jeden prvok (badge nemal handler; teraz zostatok aj cesta k zárobku jedno miesto, malé ＋ ako náznak; bez nicku vypnutý).
- **Energia** = jedna pilulka namiesto prúžku + percenta (ID zachované, `avatar.js` plní bez zmeny).
- **👋 + ℹ️** = jeden vstup ❓ „Pomoc / O LexArene"; uvítanie sa dá otvoriť z návodu.
- `#earnBtn` a `#welcomeBtn` už v HTML nie sú; väzby v `init.js` ostali null-safe (ikony sa dajú kedykoľvek vrátiť pridaním do markupu).

## B) Onboarding · `dd2c60e`
- **Uvítacie okno = pozvánka:** jednovetový sľub, tri veci (Štátnicová sieň · Pojednávanie · Bifľovačka), CTA **„Začni hrať →"** (zavrie okno, zroluje na výber oblasti so zvýraznením). Testovacia fáza, súkromie, disclaimer zbalené nižšie.
- **Návod 12 → 17 sekcií.** Doplnené: výber oblasti + tri režimy 🎲/📗/📕 (vyberá sa raz, kŕmi pojednávanie/kartičky/prípady/štátnicu), Môj progres, Študijné moduly, Judikatúra, Senáty. Nové čísla cez `data-econ` (z configu, nemôžu sa rozísť).

## Otestované
Desktop + mobil, obe témy: badge s nickom aj bez, energia v riadku, Pomoc → návod → uvítanie, auto-open pri prvej návšteve, CTA nastaví flag + scroll, data-econ 0 prázdnych, konzola čistá.

## Po nasadení pozrieť
Uvítacie okno v **anonymnom okne** (spustí sa ako nováčikovi) a klik na **§ badge**.
