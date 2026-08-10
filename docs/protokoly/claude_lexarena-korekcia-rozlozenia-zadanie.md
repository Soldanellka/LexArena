# LexArena — korekcia rozloženia (zadanie pre Code)

> **Kontext:** korekcia k prestavbe do množín (`claude_lexarena-protokol-rozlozenie-mnoziny.md`). Babu upravila tri veci po pohľade na nákres. Pravidlá zostávajú (hooky nepremenúvať, `display:contents`/`order` na `.set-panel`, filter rebríčka, bottom-nav, zviazaný celok, tmavý režim, commity + protokol).

## Zmeny

### 1. Štátnicová sieň späť do zviazaného celku (zrušiť samostatný ťahúň)
Štátnica **potrebuje vybranú oblasť**, preto sa vracia **do dlaždice s výberom oblasti**, k **Pojednávaniu, Kartičkám a Prípadom** — hrateľná až po výbere oblasti. Zruš samostatnú dlaždicu `#statniceHeroCard` (z commitu `f1278c4`/`729b35c`) a vráť Štátnicu medzi hry viazané na oblasť (pôvodne tlačidlo `#openStatniceBtn` v `#gamesSection`).
- Môže ostať **vizuálne mierne zvýraznená** (napr. výrazná ikona 🏛️), ale **nie odtrhnutá** od výberu oblasti.
- Väzba „bez oblasti sa nespustí" ostáva; scroll/označenie výberu (z `f1278c4`) môžeš ponechať ako správanie tlačidla, alebo sa vráť k pôvodnému stavu — hlavne nech je štátnica opäť súčasť množiny s výberom oblasti.

### 2. Register pojednávaní → vpravo hore
`#duelBankCard` presunúť z ľavého Tréningu **na vrch pravého stĺpca** (nad Súťaž a komunitu). „Prijmem výzvu → scroll na kvíz" ostáva (kvíz je v ľavom stĺpci — cross-column scroll je v poriadku).

### 3. Stĺpce späť na 2/3 : 1/3
Vráť pôvodný pomer — **ľavý širší (~2/3), pravý užší (~1/3)** (nie 50/50, ktoré zaviedol `729b35c`). Pravý stĺpec pri ~1/3 (~370 px) unesie Register + Súťaž + Servis pod sebou na plnú šírku (Rebríček v ňom je čitateľný — nie je to dvojstĺpec).

### 4. Ďalšie tréningy → dvojice vedľa seba
Keďže ľavý stĺpec je teraz široký, **Bifľovačka/Progres a Štruktúra/Judikatúra vedľa seba** (dvojice) — je tam miesta dosť a skráti to množinu. Ak by **Judikatúra** vyzerala stiesnene (dlhé spisové značky), nechaj **len ju** na plnú šírku.

### 5. Servis = Obchod (+ admin panel)
**Nevytváraj** kartu „Účet a skupiny" (účet je v lište `#loginDeviceBtn`, skupiny v avatarovom modáli — bolo by to nové UI). Servis ostáva Obchod („čoskoro") + rolovo skrytý admin panel.

## Cieľové rozloženie
- **Ľavý (2/3):** Tréning (výber oblasti + Pojednávanie · Kartičky · Prípady · **Štátnica**) → Ďalšie tréningy (dvojice) → Študijné moduly.
- **Pravý (1/3):** **Register (hore)** → Súťaž a komunita (Rebríček TOP 3+scroll · Senáty · Súdna sieň · Nástenka · Tvoj názor · Návody) → Servis (Obchod, admin).

### 6. Nepomer stĺpcov — posúdiť naživo
Po týchto zmenách sa balans posunie (dvojice skrátia ľavý, Register + Súťaž zvýšia pravý). **Nepredoptimalizovať** — ak vyjde výrazný nepomer, nahlás Babu, nerob sám.

## Protokol prenosu
Commit + správa · čo a kde (`súbor:riadok`) · vzhľad + tmavý režim OK · otestované (desktop + mobil, filter rebríčka, bottom-nav, zbaliteľné sekcie, zviazaný celok kŕmi hry vrátane Štátnice, oba scrolly) · nové výšky stĺpcov · otvorené otázky.
