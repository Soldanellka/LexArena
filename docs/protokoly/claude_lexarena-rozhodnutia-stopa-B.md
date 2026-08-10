# LexArena — rozhodnutia pre Stopu B + A6 (od Babu)

> Odpovede na 5 otvorených otázok z protokolu Stopy A (`claude_lexarena-prestavba-protokol-stopa-A.md`). Tvrdé pravidlá zo zadania (`claude_lexarena-prestavba-zadanie-pre-code.md`) platia ďalej: **dizajn nemeniť**, hooky nepremenúvať, karty neobaľovať do nových wrapperov, zviazaný celok Sveta 1 nechať, každá etapa = commit + textový protokol.

## Rozhodnutia

1. **Rebríček + Senáty → Svet 3 (Súťaž a komunita).** Nezávisia od vybranej oblasti, takže do Arény nepatria. **Register uložených výziev (`#duelBankCard`) ostáva vizuálne vo Svete 1, pri pojednávaní** — je to jeho priame predĺženie. Podľa toho nastav poradie, mobilný `order` blok (`styles.css:1014`) aj `bottom-nav` ciele.

2. **Register → nechať súčasné správanie (žiadny prepis).** Má naďalej zobrazovať **aj cudzie otvorené výzvy**, aby hráč mohol **prijať výzvu od kohokoľvek** — to je zámer a je to dobre nastavené. **Neprerábať na „len moje uložené".** Jediná zmena oproti pôvodnému stavu ostáva už hotová oprava A3 (cudziu výzvu sa nedá zmazať, len skryť tomuto zariadeniu; vlastnú áno). Schopnosť poslať vlastnú výzvu súperovi **linkom** (📤 `?duel=ID`) ostáva ako je. Žiadna ďalšia zmena zdroja dát ani správania.

3. **Chipy Rímske právo / Dejiny práva → existujúca `.muted` + zablokovať klik + text „pripravuje sa".** Žiadny nový vzhľad. (Obsah pribudne neskôr — chipy nezahadzovať.)

4. **A6 → sprav (a) aj (b), (c) nechať ako dlh.** Do Stopy A, každá vlastný commit:
   - (a) **Obídenie hodnotenia v kvíze** (`quiz.js:298`/`131`, `onclick=null` vs `addEventListener`) — po zvolení odpovede reálne odpojiť listener. Priorita: kazí rebríček aj duely.
   - (b) **Menovateľ bifľovačky ×5 → ×3** (`memoryTrainer.js:414`) — reálne sú 3 definície na okruh; percentá sú dnes podhodnotené.
   - (c) Overenie videí/reklám (`setTimeout`) — **nechať ako známy dlh**, nie teraz.

5. **Tvorca výzvy a výsledok (A2) → dorobiť.** Notifikácia pri ďalšej návšteve: pre hráča prečítať výsledok jeho odoslaných výziev a ukázať víťaza. Vlastný commit, existujúce triedy modálu/toastu.

## Poradie práce
Najprv dokončiť **Stopu A** (A6 a + b, notifikácia z bodu 5), potom **Stopu B** (B1 ID → B2 zoskupenie do svetov podľa bodu 1 → B3 stavy „pripravuje sa"/„čoskoro"). **Stopa C sa stále nerobí** bez ďalšieho odsúhlasenia Babu.
