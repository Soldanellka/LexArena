# LexArena — A11 oprava + sync env diagnostika (protokol od Code)

> **Fáza:** commit `6ec28b8` (lokálny — push na Babu). Count čaká na uložené zhrnutia (Babu hlási: aktualizované).

## 1. A11 (ITP) — opravené
Centrum (§§ 113–117) · druhy s §: sledovanie 113 · záznamy 114 · **odpočúvanie 115** (bez rubriky, obsahovo odpočúvanie) · údaje o telekom. prevádzke 116 · agent 117 · „Podmienky použitia (§§ 113–115)" · „Bez súhlasu sudcu" → „Vec, ktorá neznesie odklad" **bez §** · „Záznamy (§ 116)" → „Nakladanie so záznamami" bez § (§ 116 je samostatný druh ITP, nie uchovávanie).
**Obsahové nálezy Code:** § 115 pri veci neznesúcej odklad hovorí o príkaze **prokurátora**, nie o konaní bez súhlasu; **lehoty „1 h / 12 h" sa v § 115 nenašli** — listy odviazané od §, Babu doloží zdroj alebo preformuluje. Predĺženie: § 115 hovorí o predĺžení **o ďalšie 2 mesiace** (nie 6+6). Validácia 30/30, kvízy OK, konzola čistá.

## 2. Sync — presná diagnóza
Hláška z `api/sync-content.js:235`; `ADMIN_SYNC_SECRET` je nastavené správne (inak by padlo 403). Chýba niektorá zo štyroch: **GITHUB_TOKEN** (fine-grained PAT) · **GITHUB_REPO_OWNER** (Soldanellka) · **GITHUB_REPO_NAME** (LexArena) · **FIREBASE_DB_URL**. Neskôr sa kontrolujú: FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY (so `\n`), GITHUB_BRANCH (default main). ANTHROPIC_API_KEY sa syncu netýka.
**Návod pre Babu:** GitHub → Developer settings → Fine-grained token (len repo LexArena, Contents: Read and write, 90 dní, hodnotu skopírovať hneď) · Firebase Console → Service accounts → Generate new private key (client_email + private_key) · Vercel → Settings → Environment Variables (Production) → **Redeploy**.
**Bezpečnosť overená:** žiadne logovanie hodnôt; heslo cez `timingSafeEqual`. ⚠️ Chybové odpovede GitHubu/Googlu sa posielajú do prehliadača (`:349`) — bez tokenov, ale s detailmi o repe; nekopírovať hlášky verejne.
**Postup po nastavení:** Babu spustí 👁️ Náhľad (bez zápisu) → pošle výstup → Code skontroluje (~120 overridov) → ostrý beh spúšťa len Babu.

## Otvorené
Lehoty 1 h / 12 h v A11 (zdroj?) · A9 zistenie totožnosti bez § (uzavreté rozhodnutím) · count → po overení pokrytia zhrnutí · sync env → u Babu · **push `6ec28b8`**.
