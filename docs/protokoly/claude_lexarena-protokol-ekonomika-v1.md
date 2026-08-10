# LexArena — ekonomika v1 (protokol od Code)

> **Fáza:** ekonomika v1 hotová · commit `b353edf` (lokálne spolu s `0105f62`, `5758af9`, `459583b` — push na Babu). Nadväzuje na `claude_lexarena-ekonomika-v1-zadanie.md` a odsúhlasený `claude_lexarena-ekonomika-navrh.md`.

## Kde
`scripts/economyConfig.js:36` zásady · `:115` strop · `:150` shield + prestige · `:196` reklama · `:206` taláre · `scripts/economy.js:58` applyDailyCap + allOrNothing · `:178` video · `:248` reklama · `scripts/dashboardRewards.js:64` · `scripts/senaty.js:158` · `index.html:846` návod

## Finálne hodnoty

| Zdroj / sink | Hodnota | V strope? |
|---|---|---|
| Streak (prihlásenie) | 1–7 §/deň + míľniky 10/50 | nie |
| Rebríček týž./mes. | 50/30/10 · 200/100/50 | nie |
| Senátny rebríček | 40/25/10 · 150/80/40 | nie |
| Fakulta – mesiac | 20 § | nie |
| Štátnica – odmena + vrátenie vkladu | 25/15/8/0 § | nie |
| Senátny spor | 15/6/2 § | **áno ← nové** |
| Senát – založenie / nábor / nový hráč | 10 / 5 / 7 § | **áno ← nové** |
| Dashboard míľniky | 1 / 2 / 5 / 50 § | **áno ← nové** |
| Videá návodov | 12 §, jednorazovo × 3 | **áno ← nové** |
| Reklama | 3 §, **2×/deň** (bolo 3×) | **áno ← nové** |
| Testy od garanta | 15/10/5/2 § | áno (už predtým) |
| Schválené nahlásenie | 2 § | áno (už predtým) |
| Duel / kvíz / kartičky / prípady / pavúky | bez zmeny | áno |
| **Denný strop** | **60 §** | — |
| Sink – štít streaku | **15 §** (bolo 5) | — |
| Sink – kŕmenie | 12 § | — |
| Sink – prestige avatari | **300 / 600 / 1000 / 2000 §** | — |
| Sink – taláre | 200 / 500 / 700 / 1000 § (bez zmeny) | — |
| Sink – nápovedy | bez zmeny | — |

**Mimo stropu ostali aj promo kódy a granty od garanta** — administratívne prevody s vlastným rozpočtom (`GARANT_DAILY_GRANT`); keby padli do stropu, garant by minul svoj limit a študentovi by sa nepripísalo nič. **Babu potvrdila: nechať tak** (tretia kategória: administratívne prevody).

## Bod 4 — kŕmenie: obnovuje na 100 %
`avatar.js:363` nastavuje `energy = FEED_TO = 100` — absolútne nastavenie, nie prírastok. Toast „Energia 100%" hovorí pravdu. Bez zmeny.

## Bod 1 — onboarding: kolízia existovala, opravená príčina (nie výnimka)
`econVideoReward` zapisoval príznak „vyzdvihnuté" **pred** pripísaním odmeny → hráč s vyčerpaným stropom by video navždy stratil bez odmeny. Oprava:
1. **Otočené poradie** (vzor dashboard míľnikov): odmena najprv, príznak až po úspechu.
2. **allOrNothing:** jednorazová odmena sa pri nedostatočnom zvyšku stropu neoreže — nedá sa nič a počká.

**Overené naživo** (jednorazové nicky `__captest*__`, po teste zmazané, produkcia nedotknutá):

| Test | Výsledok |
|---|---|
| Video pri prázdnom strope | +12 §, označené ✅ |
| Video pri vyčerpanom strope | 0 §, NEoznačené → vyzdvihne zajtra ✅ |
| Míľnik 5 § pri zvyšku presne 5 | celý prejde ✅ |
| Jednorazovka 12 § pri zvyšku 5 | nedá nič (žiadne orezanie) ✅ |
| Bežná odmena 7 § pri zvyšku 5 | oreže na 5 ✅ |
| Štátnica 25 § pri plnom strope | prejde, strop sa nehne ✅ |

Nováčik s 3 videami (36 §) sa v prvý deň zmestí do 60 § aj s hrami; v akomkoľvek poradí ho tretie video počká — UI neklame.

Rovnaká poistka aj pre **reklamu** (spotrebovaný slot sa vráti) a **nábor do senátu** (claim sa vráti). **Zostatkové riziko (vedomé):** odmena 10 § za dokončenie senátu — „raz" je prechod senátu do `active` (skutočná zmena stavu, nevratná); predseda s plným stropom o ňu príde. Prípad úzky a jednorazový; označené komentárom `senaty.js:186`.

## Bod 7 — konzistencia
Návod prepočítava 54 `data-econ` + 3 `data-seal` ciest, žiadna pomlčka. Štít 15, reklama 2×, video 12, strop 60, pečate 1/10/25. Opravená veta o strope (tvrdila, že videá sa nepočítajú), dva zavádzajúce komentáre a toast pri strope (sľuboval videá). Zadrôtované číslo v UI: žiadne. Konzola čistá.
