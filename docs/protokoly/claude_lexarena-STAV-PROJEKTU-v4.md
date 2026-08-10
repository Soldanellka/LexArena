# LexArena — STAV PROJEKTU v4 (k 10. 8. 2026, po dokončení Trestného)

> **Načo:** jediný súhrn na pokračovanie v akomkoľvek novom čete (nahraď ním starší súhrn v project knowledge). Detaily v `docs/protokoly/` v repe (79 súborov, commit `a5aa49b`).

## Čo je LexArena a roly
lexarena.sk — hravá príprava na štátnice z práva (pojednávania/duely, senáty, rebríček, bifľovačka, Štátnicová sieň s LLM komisiou, pavúčie mapy a hry, moduly). **Babu** = autorka, admin, garantka obsahu (edituje summary v appke → Firebase overridy). **Code** = agent v repe (nasadzuje commitmi, push len na slovo Babu, každá etapa = commit + textový protokol). **Claude (tento projekt)** = projektový mozog: zadania pre Code, archív protokolov, výroba obsahu (pavúky, štátnicové podklady, mapy klastrov). Babu posiela výstupy Code ako čistý text (prílohy-dokumenty chodia prázdne; uploady s file_path fungujú).

## Stav obsahu
- **TPH (Trestné hmotné): KOMPLET.** 30/30 pavúkov + summary, mapa 13 klastrov / 28 prepojení, §§ garantsky overené (veľké opravy: A17 vražda §§ 144–149 vrátane zabitia; A16 EZR 154/2010+236/2017; A9 objednávateľ ako 4. forma § 21).
- **TPP (Trestné procesné): KOMPLET.** 30/30 pavúkov + summary, mapa 10 klastrov / 18 prepojení. §§ overované z DOM časovej verzie TP 20260701 (kľúčové nálezy: § 89 = vec dôležitá pre TK, § 89a vydanie, § 90 odňatie, § 91 počítačové údaje; predvedenie §§ 120/128; ITP §§ 113–117 vrátane odpočúvania § 115; EZR = zákon 154/2010; uznanie cudzieho rozhodnutia §§ 518–521). Zásada: **radšej bez čísla než s nesprávnym**.
- **Štátnicová sieň:** číta Firebase overridy s fallbackom na súbory (funguje aj bez Firebase); regex jadra tolerantný („Zapamätaj si" v akomkoľvek tvare, sekcia „Zhrnutie" len záloha); Trestné = dual-pool hybrid: `CRIMINAL_HMOTNE_COUNT = 30`, `CRIMINAL_PROCESNE_COUNT = 30` → **pravé dvojice hmotné+procesné**; ak okruh nemá obsah → doberá z bazéna; zlyhaný fetch → refund 15 §. **Prvá ostrá skúška z Trestného prešla OK (10. 8.).**
- **Štátnicové podklady (garantský materiál mimo appky):** TPH A1–A24 hotové (A25–A30 nevyrobené); **TPP A1–A8 v `claude_TPP-statnicove-podklady-A1-A8.md`** (A9–A30 v ďalších dávkach). Budúca možnosť: prikrmiť nimi prompt komisie.
- Ostatné oblasti: Občianske (h. 40 + p. 45 summary), Pracovné (+ Lulu overridy), Európske; Rímske+Dejiny „pripravuje sa"; Obchod „čoskoro".

## Infra a UI (stabilné)
- **GitHub sync FUNGUJE** — prvý beh 10. 8. (`7ed2886`, 157 zmien/147 okruhov), všetky overridy `committed`. Rutina: admin panel → Náhľad → potvrdiť. Env na Verceli komplet (GITHUB_TOKEN/OWNER/NAME, FIREBASE_DB_URL/CLIENT_EMAIL/PRIVATE_KEY, ADMIN_SYNC_SECRET). ⚠️ Token expiruje ~pol. októbra 2026.
- UI: tri kompaktné horizontálne dlaždice (Pojednávanie · Štátnicová sieň · Výzvy→register) s gradientom a pulzom; register v ľavom stĺpci pri pojednávaní; ekonomika v1 (strop 60 §/deň, výnimky streak/rebríčky/štátnica; shield 15 §; kŕmenie 12 §); pečate 1/10/25; admin neviditeľný (verdikt áno, podpis nie).
- Mantinely: hooky/ID nepremenúvať; mobil `display:contents`+`order`; filter rebríčka a bottom-nav krehké; zviazaný celok výberu oblasti (`__selectedOkruhPair`) sa nerozdeľuje; dizajn sa nemení bez súhlasu; push len na slovo Babu.

## Otvorené
1. Claude: podklady TPP A9–A30 (dávky po ~5) · voliteľne TPH A25–A30.
2. Babu: TPP A13 — doplniť jadro „Zapamätaj si" (text má od Claude) · priebežná právna kontrola.
3. Grafika: prestige avatari PNG (300/600/1000/2000 §), sezónne taláre.
4. Október: nový GitHub token.
5. Nápady na neskôr: prikrmiť prompt komisie podkladmi; balans stĺpcov 120 % (nechané); TPH A25–A30 podklady.
