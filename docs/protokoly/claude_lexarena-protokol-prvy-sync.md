# LexArena — PRVÝ GITHUB SYNC ÚSPEŠNÝ (protokol, 10. 8. 2026)

> **Míľnik:** commit `7ed2886` „LexArena obsah sync 2026-08-10" na `main` — prvý ostrý beh synchronizácie obsahu z Firebase do repa. Vercel automaticky nasadil (bez zmeny pre hráčov — zapísané texty sú tie, ktoré appka už čítala z overridov).

## Cesta k spusteniu (pre históriu)
1. Hláška „Server nie je nakonfigurovaný" → diagnóza Code (`api/sync-content.js:235`): chýbali `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`, `FIREBASE_DB_URL` (token a admin secret už boli).
2. Babu pridala tri premenné vo Verceli + redeploy → nová chyba `error:1E08010C:DECODER routines::unsupported` → zle vložený `FIREBASE_PRIVATE_KEY`; po čistom prekopírovaní z JSON servisného účtu (s `\n`) a redeployi náhľad naskočil.
3. **Náhľad: 157 zmien v 147 okruhoch** — ob. hmotné A1–A40, ob. procesné A1–A45, TPH A1–A30, TPP A1–A30, LuluLaw Pracovné A1–A2. Zoznam skontrolovaný (žiadne cesty mimo `data/`, počty sedia s históriou úprav). Ostrý beh potvrdený.

## Stav po synce
- Všetky summary/overridy zálohované a verzované v repe; ďalšie behy = rutina (admin panel → Náhľad → potvrdiť po dávke úprav).
- Poznámka: GITHUB_TOKEN zo 14. 7. — pri 90-dňovej platnosti vyprší ~polovica októbra 2026; vtedy vygenerovať nový a vymeniť hodnotu vo Verceli.

## Zostávajúce otvorené (mimo syncu)
- `CRIMINAL_PROCESNE_COUNT` — Babu hlási zhrnutia uložené → Code overí extrakciu a dvihne (cieľ 30).
- Push `6ec28b8` ak ešte visí lokálne (A11 pavúk) — over.
- Štátnicové podklady TPP (Claude, dávky od A1–A8) · lehoty 1 h/12 h v A11 (doložiť/preformulované už v novom summary).
