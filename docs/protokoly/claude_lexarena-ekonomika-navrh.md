# LexArena — návrh nastavenia ekonomiky pred spustením (na odsúhlasenie Babu)

> **Cieľ:** nastaviť § tak, aby mal od prvého dňa hodnotu — hráč ho má chcieť, míňať a časom aj zvážiť kúpu. Čísla vychádzajú z funkčnej diagnostiky (aktuálne hodnoty v `ECONOMY_CONFIG`). Toto je návrh na tvoje rozhodnutie; po odsúhlasení pôjde Code zadanie.

## Princípy (o čo sa opieram)
1. **§ má hodnotu len vtedy, keď je čoho sa vzdať.** Dnes aktívny hráč hromadí (ty máš 2 781 §) — príjmy sú štedré a sinky slabé. Cieľ: denný aktívny hráč má **mierny prebytok** (+10 až +20 §/deň čistého), nie záplavu.
2. **Prvý deň = dopamín, nie chudoba.** Nováčik si má v prvej seansе zarobiť ~25–40 § (uvítacie videá, prvé hry), aby ochutnal slučku zárobku a hneď mal na kŕmenie/žolíka.
3. **Nezoškrtávať zábavu, pridať túžbu.** Neuberať odmeny z hier (to zabíja motiváciu) — radšej spomaliť „obchádzky stropu" a pridať atraktívne míňanie (kozmetika = nekonečný sink).

## A. Príjmy — čo nechať a čo pritiahnuť

| Zdroj | Dnes | Návrh | Prečo |
|---|---|---|---|
| Duel (výhra/remíza/prehra) | 7/3/0 | **nechať** | jadro loopu, sedí |
| Prijatie výzvy (nový/existujúci) | 7/1 | **nechať** | viralitný motor, nechať štedrý |
| Kartičky perfektná sada | 5 | **nechať** | |
| Prípady (sada/perfektné) | 5/10 | **nechať** | čerstvo dopojené |
| Bifľovačka (karta/oblasť) | 2/10 | **nechať** | |
| Štátnica (1/2/3/4) | 25/15/8/0 | **nechať** | vstup 15 § ju robí ±neutrálnou pri trojke — dobré |
| Pavúčie hry | 1–3, max 3×/deň | **nechať** | |
| Streak | 1–7/deň, +10 (d7), +50 (d30) | **nechať** | retencia |
| Dashboard míľniky | 1/2/5, 50/oblasť | **nechať** | jednorazové |
| Videá návodov | 3× 12 § | **nechať** | jednorazový onboarding bonus |
| **Reklama** | 3 §, 3×/deň | **znížiť na 2×/deň** alebo nechať | drobné; skôr kozmetická zmena |
| **Denný strop 60 §** | obchádza ho: streak, rebríčky, videá, štátnica, senáty, fakulty, dashboard | **zúžiť obchádzky len na: streak, rebríčky, štátnicu** | dnes je strop skôr formalita; senáty/fakulty/dashboard nech sa doň počítajú |

**Odhad denného príjmu aktívneho hráča po úprave:** ~35–55 § (2 duely + kartičky + bifľovačka + streak) — pod stropom, zdravé.

## B. Sinky — tu je hlavná práca

| Sink | Dnes | Návrh | Prečo |
|---|---|---|---|
| Kŕmenie avatara | 12 § | **nechať 12 §** (over: koľko % energie obnoví — má byť plná) | základný denný „účet za hru": pri hraní −15 až −20 %/deň to vyjde na kŕmenie ~každé 5 dní ≈ 2–3 §/deň priemerne |
| Štátnica vstup | 15 § | **nechať** | zmysluplná stávka |
| Nápoveda 50:50 | 3 § | **nechať** | |
| Žolíky bifľovačky | 1–3 § | **nechať** | |
| Streak shield | 5 § | **zvýšiť na 15 §** | poistka 30-dňového streaku za 5 § je smiešne lacná; pri 15 § je to reálne rozhodnutie |
| Taláre | 200–1000 § | **nechať + doplniť rebrík** | viď C |

## C. Nové sinky (kozmetika = dlhodobá túžba)
1. **Prestige avatari** — už máš „čoskoro od 300 §": spraviť rad **300 / 600 / 1 000 / 2 000 §**. Najdrahší nech je naozaj odznak veterána.
2. **Série talárov / doplnky** (čiapky, pečate na profil, rámiky avatara) — 100–500 §, sezónne pridávať. Toto je nekonečný sink bez vplyvu na fairness.
3. *(voliteľné, neskôr)* „Druhý pokus" v štátnici za 5 § (zopakovať doplňujúcu otázku) — malý, príjemný sink priamo v hre.

## D. Čo NErobiť
- Nespoplatňovať vstup do bežných hier (kvíz/kartičky/prípady) — bariéra pre nováčika. (Mŕtve `QUIZ_ENTRY` 5 § v kóde nechať mŕtve.)
- Neznižovať odmeny za učenie (bifľovačka, dashboard) — appka je primárne študijná pomôcka.
- Nezavádzať pay-to-win: za § nikdy výhodu v súťaži (rebríček, dueli) — len kozmetika, poistky a vstupy/nápovedy, ktoré má každý.

## E. Predaj (keď sa appka chytí — rozhodnutie na neskôr)
Balíčky v configu (1,99–9,99 €) sú pripravené. Odporúčanie: primárne predávať **kozmetiku/PREMIUM**, § len ako doplnok — kupovať bude netrpezlivý nováčik na kozmetiku, nie veterán. Toto netreba riešiť teraz; ekonomika vyššie je navrhnutá tak, aby predaj § dávala zmysel bez toho, aby free hráč trpel.

## Otvorené otázky (treba od Code / z konfigurácie)
1. Koľko % energie obnoví jedno kŕmenie (12 §)? Od toho závisí reálny denný „účet".
2. Je niekde ešte príjem/sink, ktorý diagnostika nezachytila (promo kódy — aké hodnoty)?
3. Súhlasíš so zúžením obchádzok stropu (A) a so shieldom za 15 § (B)?

---
**Ďalší krok:** odsúhlas / uprav čísla → spíšem Code jedno zadanie „ekonomika v1" (všetko sú zmeny v `economyConfig.js` + `data-econ` v návode sa dotiahnu samé).
