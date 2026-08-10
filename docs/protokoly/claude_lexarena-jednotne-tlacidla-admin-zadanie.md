# LexArena — jednotné herné tlačidlá + presun admin panelu (zadanie pre Code)

> **Kontext:** Babu si pozrela nasadenú spojenú dlaždicu. Dve úpravy. Pravidlá platia ďalej (hooky nepremenúvať, ID zachovať, mobilný `order` na množinách, tmavý režim, commit + protokol, push na Babu).

## 1. „Čo chceš hrať" — dizajnovo jednotné tlačidlá
Dnes má šesť akcií štyri rôzne vzhľady: Spustiť pojednávanie + Kartičky = plné ružové pilulky · Prípady z praxe = holý text · Štátnicová sieň = žltý rám (`.statnice-cta-btn`) · Môj progres + Štruktúra otázok = text s ikonkou.

**Cieľ:** všetkých šesť v **jednotnom štýle existujúcich pilulkových tlačidiel appky** (vzor: Kartičky) — rovnaká výška, tvar, typografia. Ikony v texte môžu ostať (🏛️ 📊 🕸️).
- **Štátnicová sieň = výraznejšia**, ale v rámci toho istého tvaru: použiť existujúci akcentný vzhľad (napr. výraznejší/gradientný variant, aký má primárne tlačidlo appky) + ikona 🏛️. Žiadny nový vizuálny jazyk — sýtejší variant toho istého pilulkového štýlu. Terajší žltý rám nahradiť týmto.
- Sekundárne akcie (Zrušiť, ℹ️) ostávajú textové odkazy pod tým — tie sa nezjednocujú.
- **ID tlačidiel sa nemenia** (`#startQuizBtn`, `#openMemoryBtn`, `#openCasesBtn`, `#openStatniceBtn`, `#openDashboardBtn`, `#openSpiderBtn`).
- Overiť zalamovanie na mobile (6 rovnakých pilúl sa zalomí do 2–3 riadkov — nech to vyzerá upratane; prípadne mriežka 2×3 pod 640 px, ak to bude krajšie).
- Disabled stav (bez vybranej oblasti) musí byť na jednotných tlačidlách stále čitateľný; Progres a Štruktúra ostávajú aktívne aj bez oblasti.

## 2. Admin a garant panel → ľavý stĺpec, na koniec
Presunúť kartu s `#adminPanel` zo Servisu (pravý stĺpec) **na koniec ľavého stĺpca** (pod Judikatúru). Pravý stĺpec tak ostane čisto hráčsky (Register → Súťaž → Obchod).
- ⚠️ **Judikatúra kotví za `#biflovackaCard`** (`afterend`) — admin karta nesmie skončiť medzi Bifľovačkou a Judikatúrou; umiestni ju **za** miesto, kam sa Judikatúra mountuje (t. j. admin panel bude v DOM za kotvou, aby po mounte Judikatúry vyšiel naozaj posledný). Over poradie po načítaní.
- Gating nezmenený (obsah renderuje `renderAdminPanel` podľa view roly; pre študenta text „prepni rolu").
- Aktualizuj mobilný `order` (admin karta na koniec lineárneho sledu) a over zbaliteľné sekcie.

## Otestovať
Desktop + mobil, obe témy: 6 jednotných tlačidiel (Štátnica výraznejšia) · disabled stav čitateľný · Progres/Štruktúra aktívne bez oblasti · zalamovanie na mobile OK · admin panel posledný vľavo aj po mounte Judikatúry · pravý stĺpec = Register → Súťaž → Obchod · filter rebríčka, bottom-nav, zbaliteľné sekcie, zviazaný celok · konzola čistá · nové výšky stĺpcov (admin karta zmení balans — zmerať, nahlásiť).
