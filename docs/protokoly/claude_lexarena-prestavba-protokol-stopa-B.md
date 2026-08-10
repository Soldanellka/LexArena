# LexArena — prestavba: protokol dokončenia Stopy A + B (výstup od Code)

> **Fáza:** Stopa A aj Stopa B dokončené — **11 commitov, lokálne, nepushnuté** (push je na Babu). Stopa C nezačatá. Nadväzuje na `claude_lexarena-prestavba-protokol-stopa-A.md` a `claude_lexarena-rozhodnutia-stopa-B.md`.

## TL;DR
Doplnené opravy (A6a, A6b, notifikácia tvorcovi výzvy) + celé preusporiadanie do troch svetov (B1 ID, B3 stavy, B2 zoskupenie). Vzhľad kariet nedotknutý. **Dve veci si vyžadujú rozhodnutie** (dole): širšie presunuté karty a chýbajúce viditeľné nadpisy svetov + stav „pripravuje sa" — appka totiž nemá žiadne CSS pre nadpisy medzi kartami ani pre disabled/muted.

---

## Zvyšok Stopy A

| Etapa | Commit | Čo |
|-------|--------|----|
| A6a | `03b860f` | Kvíz: skutočné odpojenie listenera + poistka proti dvojitému skórovaniu |
| A6b | `7482e40` | Bifľovačka: menovateľ ×5 → ×3 |
| bod 5 | `23b2e34` | Notifikácia výsledku pre tvorcu výzvy |

- **A6a** — príčina bola dvojitá: `onclick = null` nič neodpojilo (handler šiel cez `addEventListener`), a `selectedIndex` sa nuloval len raz pri štarte, takže návrat cez „Predchádzajúca" umožnil odpovedať znova. Opravené oboje. Overené: 1. klik skóroval, ďalšie 3 nič; po návrate sa stav obnovil a ďalšie kliky skóre nezmenili. Obnova používa presne tie isté triedy a ikonku ako `selectOption` — žiadny nový vzhľad.
- **bod 5** — ⚠️ pri implementácii vyšlo najavo: v produkčnej DB je **111 dokončených duelov bez príznaku „videné"**, jeden tvorca ich má **36**. Bez ošetrenia by dostal 36 modalov za sebou. Preto pridané **časové okno 7 dní + strop 3 modaly na návštevu** — najhorší prípad klesol z 36 na 3, staršie sa neukážu a nič sa im nezapisuje.

## Stopa B

| Etapa | Commit | Čo |
|-------|--------|----|
| B1 | `cf5103b` | 7 stabilných ID bezmenným kartám |
| B3 | `e6db9df` | Stavy „pripravuje sa" / „čoskoro" |
| B2 | `8468405` | Zoskupenie do troch svetov |

**Výsledné rozloženie (desktop):** pravý stĺpec = **Svet 1 Aréna** (`quizCard → gamesSection → duelBankCard`); ľavý = **Svet 2 Tréningy** (moduly → bifľovačka → judikatúra) → **Svet 3 Súťaž a komunita** (rebríček → senáty → súdna sieň → názor → nástenka → návody) → **Servis** (obchod → admin). Na mobile lineárne 1–14 v tom istom poradí.

**Otestované:** desktop 1280 px aj mobil 375 px. Filter rebríčka (`previousElementSibling` + texty) na mieste, všetky bottom-nav ciele existujú, 6/6 zbaliteľných sekcií má h3, zviazaný celok kŕmi hry (Trestné → A25+A4, 10 otázok, 15 kartičiek, 4 prípady), žiadny horizontálny scroll, konzola čistá.

---

## Dve veci na rozhodnutie

### 1. Presunuté karty sú širšie
`senatyCard` a `judikaturaSection` prešli z pravého stĺpca (420 px) do ľavého (708 px) — priamy dôsledok rozhodnutia „Senáty → Svet 3"; v dvojstĺpci sa svet inak zoskupiť nedá. Štýl kariet nedotknutý (rovnaké pozadie, radius 12 px aj tieň ako susedná karta). Ak by šírka prekážala, alternatíva je nechať Senáty v Aréne — ale to je proti rozhodnutiu.

### 2. Nadpisy svetov nevložené + stav „pripravuje sa" nie je vidno
V `styles.css` **neexistuje žiadne pravidlo pre `h1/h2/h3`** — nadpis medzi kartami by sa vykreslil prehliadačovým defaultom (nový vizuálny prvok → zakázané). Zoskupenie preto zatiaľ funguje **len poradím**, bez viditeľných nadpisov.

Rovnaký problém má **B3**: `.muted` ani `disabled` nemajú v appke vlastné CSS pravidlo (chip s `.muted` je pixelovo identický s bežným; ani reálne vypnutý `#startQuizBtn` nevyzerá vypnuto). Stav „pripravuje sa" je preto čitateľný **len z textu** chipu.

→ **Rozhodnutie:** pridať malé CSS pravidlo pre nadpisy svetov a pre stlmený/vypnutý chip (to je zmena dizajnu → Stopa C), alebo nechať svety a stavy bez vizuálneho odlíšenia?

**Stopa C nezačatá. Push na Babu.**
