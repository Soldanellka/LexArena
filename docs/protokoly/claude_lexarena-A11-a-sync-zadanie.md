# LexArena — A11 ITP oprava + sync env + count (zadanie pre Code)

> Babu odsúhlasila: (1) A11 opraviť, (2) A9 zistenie totožnosti ostáva bez §, (3) summary opraví Babu v appke podľa ťaháka, (4) **ideme sprevádzkovať sync**. Pravidlá platia.

## 1. A11 (ITP) — oprava §§ v pavúku
Podľa rubrík z DOM znenia 20260701: **§ 113 sledovanie osôb a vecí · § 114 vyhotovovanie záznamov · § 116 oznámenie údajov o telekomunikačnej prevádzke · § 117 agent.** Uprav vetvy/listy A11: centrum „(§§ 113–117)", druhy s § pri sledovaní/záznamoch/telekom. údajoch; pri „Podmienky použitia" a „Bez súhlasu sudcu" ponechaj § len ak vieš doložiť z rubrík/odsekov aktuálneho znenia — inak bez čísla. Validácia, kvízy nedotknuté, UI kontrola stromu.

## 2. Sync — „Server nie je nakonfigurovaný (chýbajú env premenné)"
Babu chce sync konečne spustiť; náhľad padá na env. Postup:
1. Vypíš z kódu sync endpointu **presné názvy vyžadovaných env premenných** (GitHub token, repo/owner, branch, admin secret…) — bez hodnôt.
2. Priprav pre Babu **návod krok za krokom**: GitHub → Settings → Developer settings → **Fine-grained personal access token** (prístup len k repu LexAreny, oprávnenie **Contents: Read and write**, rozumná expirácia) → Vercel → projekt → **Settings → Environment Variables** → pridať premenné (Production) → **Redeploy**.
3. Bezpečnosť: hodnoty nikdy do repa/kódu/chatu; over, že logy a chybové hlášky hodnoty neprezrádzajú.
4. Po nastavení Babu: spustí **Náhľad** (bez zápisu) → nahlás počet čakajúcich overridov (~120) a či zoznam vyzerá zdravo → ostrý beh až na výslovné potvrdenie Babu.

## 3. Count — pripravenosť
Keď Babu nahlási uložené summary A9–A30 (opravené podľa ťaháka): over extrakciu per okruh a **dvihni `CRIMINAL_PROCESNE_COUNT` na najvyššie súvislé pokrytie** (cieľ 30). Potom jedna kontrolná skúška Trestného v sieni: pravá dvojica hmotné+procesné z plného rozsahu.

## Protokol
Commit + `súbor:riadok` · A11 pred/po · zoznam env premenných + návod · výsledok náhľadu · count + extrakcie · otvorené.
