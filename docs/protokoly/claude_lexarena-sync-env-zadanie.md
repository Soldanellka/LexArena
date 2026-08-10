# LexArena — sync hlási „Server nie je nakonfigurovaný (chýbajú env premenné)" (zadanie pre Code)

> **Kontext:** Babu spustila prvý GitHub sync z admin panelu presne podľa postupu (admin → Admin panel → Synchronizácia obsahu do GitHubu → heslo → Zobraziť náhľad) a dostala chybu: **„Server nie je nakonfigurovaný (chýbajú env premenné)."** Screenshot existuje. Sync je teda zablokovaný na konfigurácii produkčného prostredia, nie na kóde.

## Úloha
1. **Zisti presne, ktoré env premenné endpoint syncu vyžaduje** (názvy premenných v serverovom kóde syncu — GitHub token, repo, branch, prípadne heslo/secret admin operácií) a ktoré z nich na produkcii (Vercel) chýbajú.
2. **Priprav pre Babu presný návod** (krok za krokom, bez žargónu): kde ich nastaviť — Vercel → projekt → Settings → Environment Variables — čo presne vyplniť do Name/Value, pre ktoré prostredie (Production), a že po uložení treba redeploy.
3. **GitHub token:** popíš, ako si ho Babu vytvorí (GitHub → Settings → Developer settings → Fine-grained personal access token), s **minimálnymi oprávneniami** (len tento repozitár, len Contents: Read and write; nič viac) a rozumnou expiráciou.
4. **Bezpečnosť:** token ani hodnoty premenných sa NIKDY necommitujú do repa ani nevkladajú do kódu — len do Vercel env. Over, že chybová hláška ani logy hodnoty neprezrádzajú.
5. Po nastavení od Babu: over, že **Náhľad** vráti zoznam čakajúcich overridov (~115+) bez zápisu, a až potom nech Babu potvrdí ostrý beh.

## Protokol
Zoznam vyžadovaných premenných (bez hodnôt!) · návod pre Babu · výsledok náhľadu po konfigurácii · otvorené otázky.
