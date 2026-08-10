# LexArena — diagnostika `index.html` (výstup od Code)

> **Fáza:** diagnostika hotová (len čítanie, žiadny zápis/commit). Nadväzuje na `claude_lexarena-diagnostika-zadanie-pre-code.md` a slúži ako podklad pre doladenie návrhu 5 zón v `claude_lexarena-ui-upratanie-navrh.md`.
> **Zdroj:** analýza repa — 2 príkazy, 9 prečítaných súborov, prehľadaný kód. August 2026.

## TL;DR
Stránka je jeden **statický HTML skelet** (`index.html`, 1 214 riadkov), do ktorého **~35 JS modulov** dopĺňa obsah takmer výhradne cez `getElementById` na pevné ID a pár tried. Prestavba je **bezpečná**, pokiaľ sa zachovajú ID a triedy zo zoznamu v bode 5 a dá sa pozor na **5 miest, ktoré závisia od pozície v DOM**, nie od ID (bod 8). Bonusový nález: tlačidlá **Obchodu** a celá karta **„Výzvy od spoluhráčov"** sú mŕtve UI bez handlerov — dajú sa pri prestavbe voľne odstrániť či prerobiť.

---

## 1. Súpis sekcií v DOM poradí

`<header class="header">` (riadky 16–102) — detail v bode 3.

### `main.container` → ľavý stĺpec `.left`

| # | Sekcia | ID / trieda | Obsah renderuje | Role-gating |
|---|--------|-------------|-----------------|-------------|
| 1 | Študijné moduly | `#tilesSection`, vnútri `#modulesList` | `renderModules()` (`app.js:11`) z `window.catalog` | nie |
| 2 | 🧠 Bifľovačka | karta bez ID, vnútri `#memoryTrainerTiles` | `renderMemoryTiles()` z `memoryTrainer.js` (inline skript, `index.html:737`) | nie |
| 3 | Rebríček pojednávaní | `#leaderboardSection` | statická kostra (3 mode-chipy + 3 boxy), plní `scripts/leaderboard.js` + `init.js` (`setupLeaderboardModeToggle`, senáty/fakulty full) | nie |
| 4 | ⚖️ Právna nezrovnalosť | bez ID, trieda `.highlight-report` | statická; modály tvorí inline skript v `index.html` (`openReportModal`/`openCourtroomModal`) | tlačidlá vidia všetci; moderovanie vnútri Súdnej siene podľa skutočnej roly |
| 5 | Obchod | bez ID | ⚠️ **mŕtve UI** — `buy20`, `buyPremium`, `openShop` nemajú nikde handler | nie |
| 6 | 📺 Návody & odmeny | bez ID, `.highlight-video` | statické video-karty s inline `onclick="openVideo('v1')"`; odmeny rieši `initVideoSystem()` (`init.js`) | nie |
| 7 | 💬 Tvoj názor | bez ID, `.highlight-feedback` | statický formulár, `initFeedbackSystem()` (`init.js`) | nie |
| 8 | 📋 Nástenka komunity | bez ID, `.highlight-noticeboard`, vnútri `#publishedFeedbackBox` | `renderPublishedFeedback()` (`init.js`) | nie |
| 9 | Admin a garant panel | karta bez ID, vnútri `#adminPanel` | `renderAdminPanel()` (`init.js:1166`) | karta je v DOM **vždy** — gating je len swap `innerHTML` podľa view roly; študent vidí text „Pre zobrazenie prepni rolu na garant" |

### Pravý stĺpec `.right`

| # | Sekcia | ID | Obsah renderuje |
|---|--------|----|-----------------|
| 1 | Register pojednávaní | `#duelBankCard`, vnútri `#duelBank` (default skrytý) | `renderDuelBank()` + `watchDuelBankBadge()` (`scripts/duels.js`) |
| 2 | ⚖️ Senáty + TOP 3 | `#senatyCard` | `initSenaty()` / `renderSenatyCard()` (`init.js`) |
| 3 | Pojednávanie | `#quizCard` = `#quizIntro` (chipy oblastí `#areasList` ← `renderAreas()`, dynamický `#okruhModePicker`, `#startQuizBtn`) + `#quizArea` (herné UI, prepína quiz engine) | `app.js` + `quiz.js` + `scripts/duels.js` |
| 4 | Hry a prípady | `#gamesSection` — 5 tlačidiel (Kartičky, Prípady, Štátnicová sieň, Môj progres, Štruktúra otázok) + `#gamesAreaHint` | handlery v `attachEvents()` (`init.js`), Štátnica a pavúk lazy-import |
| 5 | Judikatúra NS SR | `#judikaturaSection` — **v HTML vôbec nie je**; `scripts/judikatura.js:220` ju vkladá `insertAdjacentElement('afterend')` za `#gamesSection` | `judikatura.js` |
| 6 | Výzvy od spoluhráčov | `#incomingChallengeCard` (`display:none`) | ⚠️ **mŕtve UI** — `acceptAnyChallenge` / `ignoreAllChallenges` nemajú handler; reálne výzvy chodia cez `?duel=ID` link → `duelChallengeModal` |

Za `</main>`: statické modály (bod 4), konfiguračný skript, moduly, `.bottom-nav` (mobil).

---

## 2. Mechanizmus roly a prepínania

Dvojvrstvový systém (`init.js:1110`, `init.js:2977`):

- **Skutočná rola** — Firebase `users/{nick}/role` (fallback `leaderboard/{nick}/role`) → cache v `localStorage.playerFirebaseRole`. Rozhoduje o právach (schvaľovanie v Súdnej sieni číta **vždy čerstvo** z Firebase cez `getRealRole()` — inline skript v `index.html`).
- **View rola** — `localStorage.playerRole`. Len náhľad: klik na `#roleBadge` → `openRoleSwitcher()` → dynamický `#roleSwitchModal` (admin vidí admin/garant/študent, garant garant/študent, študent nič). Prepnutie prepíše `playerRole`, prekreslí badge a zavolá `initRoleSystem()`, ktorý podľa view roly renderuje/vyprázdni `#adminPanel`.

**Vnútro admin/garant panela** (generuje `renderAdminPanel`, `init.js:1166–1680`): Moje skupiny (obaja) · a len pre admina: nastaviť/odobrať garanta, zoznam hráčov, pripomienky, Promo kódy, Export opráv bifľovačky, Videá k definíciám, Poslať § (`#grantSendBtn`), Analytika (`#analyticsLoadBtn`), GitHub sync (`#syncPreviewBtn` / `#syncConfirmBtn`). Celé je to **jeden dlhý `innerHTML` blob** — vnútorné pod-panely sa dajú preskupiť voľne, sú v jednom súbore.

**Legacy vrstva (pozor pri upratovaní):** `admin.js` má **druhý** `renderAdminPanel` importovaný v `app.js:334`, gated na `#toggleRoleBtn`, ktorý v HTML neexistuje → mŕtva vetva. Podobne `state.js` (`role`, `setRole`), `core.js` `loginWithPin` / `transferAccount` (demo) a duplicitné `theme.js` v roote aj v `scripts/`. **Živý kód rolí je len v `init.js`.**

---

## 3. Inventár hornej lišty (id → handler)

| Element | ID | Handler / plnenie |
|---------|----|-------------------|
| Avatar (obrázok) | `#avatarWrap`, `#userAvatar`, `#avatarTalar`, `#avatarPet` | klik → `openAvatarSelectModal()` — **profilový hub**: výber avatara + fakulta (`#facultySelect`) + skupiny (`#joinGroupCodeInput`, `#myGroupsList`) + moje testy (`#myAssignmentsList`); obrázok/energiu riadi `scripts/avatar.js` |
| Energia | `#avatarEnergyBar`, `#avatarEnergyText`, `#feedAvatarBtn` | `scripts/avatar.js` (kŕmenie za §) |
| Paleta 🎨 | `#changeAvatarBtn` | `openAvatarPickerModal(false)` — **iný modal** než avatarWrap! (základná sada + talár shop) |
| Nick box | `.nick-box`, `#nickname`, `#saveNick` | `app.js` `claimNick()`; po prihlásení skrytý (`updateNickUI`), meno v `#playerNickDisplay` |
| „Vyber školu" | `#facultyBadge` | text plní `updateFacultyBadge()`; klik → **tiež** `openAvatarSelectModal()` |
| § zostatok | `.par-badge`, `#parCount` | plní `scripts/avatar.js` z Firebase; **badge nemá klik handler** (návrhové zlúčenie s „Získaj §" je teda voľné pole) |
| Získaj § | `#earnBtn` | `openEarnModal()` (dynamický `#earnModal`: reklama + promo kód); viditeľný len s nickom |
| Streak | `#loginStreakDisplay` | `scripts/avatar.js` |
| Rola | `#roleBadge`, `#roleLabel` | `initRoleBadge()` → `openRoleSwitcher()` |
| 👋 | `#welcomeBtn`, `#welcomeHintDot` | `initWelcomeSystem()`; auto-open pri prvej návšteve (flag `LEX_WELCOME…SEEN` v localStorage; „Rozumiem" je jediné, čo flag nastaví) |
| ℹ️ | `#infoBtn`, `#infoHintDot` | `initGuideSystem()` → `#guideModal`; čísla odmien plní `fillGuideEconomyValues()` cez `data-econ` atribúty |
| 🌙 | `#themeToggleBtn`, `#themeIcon` | `applyTheme()` (`attachEvents`) |
| Môj účet | `#loginDeviceBtn` | `openLoginCodeModal()` → `#loginCodeModal` (obsah generuje `init.js`: PIN setup/entry + odhlásenie) |

---

## 4. Modály

**Statické v HTML (7):** `#loginCodeModal`, `#videoModal`, `#memoryModal`, `#casesModal`, `#dashboardModal`, `#welcomeModal`, `#guideModal`.

**Dynamicky vytvárané JS-om (~20):** `reportModalNew`, `courtroomModalNew`, `verdictModal` (inline skript v `index.html`); `avatarSelectModal`, `avatarPickerModal`, `earnModal`, `roleSwitchModal`, `foundSenatModal`, invite/`senatDetailModal`, `challengeSenatModal`, `groupTestsModal`, `testBuilderModal`, `testResultsModal`, `takeAssignmentModal`, `duelChallengeModal` (`init.js`); `okruhDetailModal` (`dashboardUI.js`); `spiderModal` / `spiderMapModal` / `spiderBrowserModal` (`spider*.js`); štátnicová sieň (`statnice.js`); bifľovačka-video (`biflovackaVideo.js`).

Tie sú **od layoutu stránky nezávislé** — prestavba plochy sa ich nedotkne.

---

## 5. JS hooky — NEPREMENOVAŤ

**ID zo statického HTML, na ktoré sa JS viaže** (všetky ID z tabuliek vyššie, plus):

`modulesList`, `memoryTrainerTiles`, `leaderboardTitle`, `leaderboardSubtitle`, `individualLeaderboardBox`, `duelLeaderboard`, `senatLeaderboardBox`, `senatLeaderboard`, `facultyFullLeaderboardBox`, `facultyFullLeaderboard`, `reportIssueBtn`, `openCourtroomBtn`, `sealDisplay`, `sealBadges`, `videoList`, `reward-v1..v3`, `openGuideLink`, `feedbackText`, `feedbackCharCount`, `sendFeedbackBtn`, `feedbackForm`, `feedbackSuccess`, `feedbackAgainBtn`, `publishedFeedbackBox`, `adminPanel`, `duelBankCard`, `toggleDuelBankBtn`, `duelBank`, `senatyCard`, `senatyNoneBox`, `senatyMineBox`, `foundSenatBtn`, `haveInviteBtn`, `senatyMiniLeaderboard`, `quizCard`, `quizIntro`, `quizTitle`, `areasInQuiz`, `areasList`, `startQuizBtn`, `quizArea`, `areaTitle`, `qIndex`, `qText`, `options`, `correctCount`, `wrongCount`, `prevBtn`, `nextBtn`, `progBar`, `gamesSection`, `openMemoryBtn`, `openCasesBtn`, `openStatniceBtn`, `openDashboardBtn`, `openSpiderBtn`, `gamesAreaHint`, `closeMemory`, `restartMemory`, `closeCases`, `closeDashboard`, `closeGuide`, `closeVideoModal`, `closeLoginModal`, `welcomeUnderstoodBtn`, `welcomeNoticeboardBtn`, `memoryBoard`, `caseContainer`, `dashboardAreaTabs`, `dashboardBody`, `dashboardStatniceList`, `videoModalTitle`, `videoPlayer`, `claimVideoRewardBtn`, `videoAlreadyClaimed`, `videoRewardInfo`.

**Triedy a atribúty:** `.area-chip`, `.mode-chip`, `.chip-active`, `.lb-mode-chip` + `data-lb-mode`, `.feedback-type-btn` + `data-type`, `.video-item` + `data-video-id`, `.nick-box`, `.bottom-nav` + `data-target`, `data-econ` (cesty do `ECONOMY_CONFIG` — v `guideModal` je na to aj výslovný komentár **NEMENIŤ**), `.highlight-noticeboard` / `-feedback` / `-video` / `-bank` / `-senaty` (mobile-nav zbaliteľné sekcie), `data-theme` na `<html>`, `data-role` na `roleBadge`.

**Globály `window.*`, ktoré musia ostať:** `catalog`, `areas`, `areasLoaded`, `areaTiles`, `areaCases`, `db`, `__selectedAreaName`, `__selectedOkruhPair`, `__areaQuestionsForGames`, `__areaTilesForGames`, `__areaCasesForGames`, `openReportModal`, `openCourtroomModal`, `openVideo`, `openAdVideoModal`, `cancelQuiz`, `renderDuelBank`, `buildMemory*`, `loadCasesFrom*`, `econAward`, `ECONOMY_CONFIG`, `openAvatarPickerModal`, `LEX_QUESTION_RANGES`.

---

## 6. CSS architektúra

- **Jediný `styles.css`** (3 094 riadkov) + 2-riadkový inline `<style>` v hlave.
- **Organizácia:** sekčné bloky s banner-komentármi, CSS premenné (púdrovo-ružová + tmavá téma cez `html[data-theme="dark"]` — dark-mode overridy sú **duplikované per sekcia**, nie centrálne). Veľa štýlov je aj inline v HTML a v JS `innerHTML` šablónach (najmä dynamické modály).
- **Layout:** `.container` flex; `.left` `flex:1`, `.right` pevných **420 px**.
- **Breakpointy:** 900 px (stĺpce pod seba), 640 px (mobil: bottom-nav, zbaliteľné karty, a hlavne `display:contents` + `order` remap — viď riziko č. 4), 480 px drobnosti.
- `duel.css` **nie je na indexe linkovaný**.

---

## 7. Init poradie

**Poradie skriptov v HTML:** `data.js` + `firebase.js` → core moduly (`core`, `state`, `ui`, `theme`, `audio`, `avatars`, `areas`, `admin`, `reports`, `memory`, `cases`, `app`) → inline bifľovačka-tiles → inline reports/súdna sieň → `scripts/duels.js`, `leaderboard.js`, `dashboardUI.js`, `judikatura.js` → `quiz.js` → `init.js` (posledný) → inline PIN → `mobile-nav.js`.

**`init.js:3634`:** `DOMContentLoaded` → `init()` → `waitForAllData()` — polling (100 ms, max 8 s) na `window.areas` + `window.catalog` → potom sekvencia (`init.js:376`):
earnBtn visibility → analytics → téma → `renderHeaderAvatar` → `renderAreas` → `renderModules` → reporty → leaderboard + mode toggle → `initRoleSystem` → pečať garanta → `attachEvents` (všetky click handlery) → duel bank badge → `?duel=` / `?report=` linky → senáty → fakulty → avatar systém → seal cache → settle rebríčkov → video → feedback + nástenka.

`mobile-nav.js` sa inicializuje **samostatne** (vlastný `DOMContentLoaded`) — nezávisí od `waitForAllData`.

**Dôsledok pre prestavbu:** HTML sa dá preskupovať ľubovoľne — takmer nič sa neviaže na pozíciu, všetko beží po `DOMContentLoaded` cez ID. Výnimky sú v bode 8.

---

## 8. Rizikové miesta prestavby

1. **Filter „Týždeň/Mesiac/Všetko"** — `scripts/leaderboard.js:172` hľadá chipy cez `box.previousElementSibling` od `#duelLeaderboard` a mapuje ich **podľa textu tlačidla** („Týždeň"…). Vloženie čohokoľvek medzi filter-riadok a zoznam, alebo zmena textov, to potichu rozbije.
2. **Judikatúra sa mountuje `afterend` za `#gamesSection`** — presunom Hier sa presunie aj ona; ak by `#gamesSection` zanikol, judikatúra sa vôbec nevyrenderuje.
3. **Zbaliteľné sekcie na mobile** (`mobile-nav.js:72`) sú viazané na triedy `.highlight-*` + prvý `h3` v karte; klik na hlavičku = toggle. Nové zóny/karty treba do zoznamu doplniť, a hero hlavičky nesmú omylom dostať tieto triedy.
4. **Mobilné poradie kariet** (`styles.css:1014`): `.left` / `.right` sú na mobile `display:contents` a poradie určujú `order` pravidlá na konkrétnych ID. Každá nová zóna/obal (napr. „Aréna" wrapper div!) **rozbije `display:contents` reťaz** — **najväčšie CSS riziko** celej prestavby: obaliť karty do nových zónových kontajnerov znamená prepísať aj tento blok a bottom-nav ciele.
5. **Bottom-nav** skáče na `quizCard` / `gamesSection` / `leaderboardSection` (`data-target` + `IntersectionObserver`) — pri premenovaní/preskupení zón aktualizovať.
6. **Výber oblasti je centrálny stav:** chipy v `#quizCard` (`renderAreas` → `applyOkruhPairSelection`) plnia `window.__area*ForGames`, od ktorých závisia Kartičky, Prípady aj Štátnicová sieň v `#gamesSection`. Ak návrh presúva „vyber oblasť" do zóny Aréna a hry do Študovne, treba **zachovať tento dátový tok** (alebo výber oblasti zdvojiť/povýšiť) — inak hry stratia obsah.
7. **Inline `onclick` v HTML** (`openVideo`, `openReportModal`, `cancelQuiz`) sú zdvojené s `addEventListener` — pri kopírovaní markupu ich nezhodiť; `window.` funkcie musia ostať globálne.
8. **Šesť kariet nemá ID** (Bifľovačka, Obchod, Právna nezrovnalosť, Návody, Tvoj názor, Nástenka, Admin) — selektujú sa cez `.highlight-*`; pri prestavbe im dať ID je **bezpečné a žiadúce**, ale triedy musia ostať.
9. **Duplicitné/mŕtve vrstvy** — pri upratovaní nepomýliť živé s legacy: živý admin panel je v `init.js` (nie `admin.js`), živá téma v `attachEvents` + `theme.js`, mŕtve sú `#toggleRoleBtn` vetva, Obchod tlačidlá, `#incomingChallengeCard`, `core.js` PIN demo (skutočný PIN je `scripts/pinAuth.js`).
10. **`waitForAllData` timeout 8 s** — ak by sa prestavbou rozdelil HTML na viac súborov/lazy častí, celé `init()` je stále jeden monolit „všetko alebo nič"; etapy prestavby by mali **meniť markup, nie poradie skriptov**.

### Odporúčaná etapizácia (nadväzuje na schválený návrh)
- **E1** — dať ID bezmenným kartám + obaliť zóny bez zmeny mobilných pravidiel.
- **E2** — presuny kariet do zón + úprava `order` / bottom-nav / collapsible zoznamu.
- **E3** — lišta (zlúčenia chipov — `§` badge je bez handlera, takže klik na § → obchod je čistý pridaný kód).
- **E4** — hero / uvítacie okno.
- **E5** — odstránenie mŕtveho UI (Obchod tlačidlá riešiť v rámci zóny Obchod, `#incomingChallengeCard` zmazať).

Každá etapa = samostatný commit.

---

## Poznámka k vedľajšiemu nálezu
Testovací záznam `__claude_verify_delete_me__` v leaderboarde nebolo treba riešiť v kóde — je to **dátový záznam vo Firebase**, zmaže sa pri najbližšom upratovaní databázy.
