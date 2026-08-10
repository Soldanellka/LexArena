# LexArena — nasadenie dávky A22–A24 + count 24 (zadanie pre Code)

> **Zdroj:** `claude_TPH-davka-A22-A24.md`. Pravidlá platia (commit + protokol, push na Babu, nič cez globálny sync).

## Úlohy
1. **Pavúky do repa:** `spider` do `A22–A24.json` (formát appky, vlož + `isValidSpider()` 3/3). Čísla §§ v tejto dávke SÚ v pavúkoch (Babu ich overila podľa Slov-Lex).
2. **Mapa:** dva nové klastre — `majetok-a-hospodarstvo` · Majetok a hospodárstvo · [22, 23] a `vseobecna-bezpecnost-a-prostredie` · Všeobecná bezpečnosť a prostredie · [24]; `osobitna-cast` ostáva [17–21]. Doplň 4 nové links z podkladu. Integrita + UI kontrola (11 klastrov, stromy, ⇄ odznaky).
3. **Štátnica — konečne zdvihnúť count:** `CRIMINAL_HMOTNE_COUNT` → **24** (Babu potvrdila už zdvihnutie na 21 pri minulej dávke — toto ho zahŕňa). Predtým over, že **A14–A24 majú zhrnutia vo Firebase** a extrakcia kľúčových bodov funguje (A14–A17 potvrdené skôr; A18–A24 over teraz). Ak niektorému okruhu zhrnutie chýba, count nastav na najvyššie súvislé pokrytie a nahlás.
4. **Regresia:** A1–A21 pavúky a mapa nedotknuté; sieň Pracovné/Občianske bez zmeny.

## Protokol
Commit + `súbor:riadok` · validácia 3/3 · mapa 11 klastrov · sieň: count + overenie zhrnutí per okruh · regresie · otvorené otázky.
