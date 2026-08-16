# Protokol — Nočný výcuc, Fáza 1B, krok 1: pipeline + skúšobné A1/A2

**Dátum:** 2026-08-16 · **Vykonal:** Code · **Stav: A1+A2 NAŽIVO na jsDelivr@v1, čaká sa na vypočutie Babu**

## Čo je hotové

**Repo `Soldanellka/lexarena-audio`, commit `e7c7080`, tag `v1`:**

- `tools/generate.mjs` — TTS generátor: Azure Speech REST (kľúč len z env `AZURE_SPEECH_KEY`, región `eastus`), SSML `rate="-15%"`, pauzy 700 ms medzi vetami a 1 200 ms pred „Ešte raz…"/„Nechaj to tam ležať.", z Azure 24 kHz/96 k → ffmpeg zapečie **fade-out 3,5 s** a finál **64 kbps mono MP3**. Hlas deterministicky z parity: **nepárne = Viktoria, párne = Lukas** (jednoriadková zmena). `--only/--force/--dry-run`; nová oblasť = nový priečinok skriptov, bez zmeny kódu. Retry na 429/5xx + 2 s odstupy (free tier).
- `tools/extract-skripty.mjs` — rozrezal `claude_PP-nocny-vycuc-skripty-A1-A50-KOMPLET.md` na `skripty/pracovne/vecny/A1–A50.txt` (50/50; A1–A5 bajtovo zhodné s textami z pôvodného zadania; texty sa nijako neupravovali).
- `tools/check-audio.mjs` — kontrola trvania + dôkaz fade-outu.
- **`pracovne/vecny/A1.mp3` (Viktoria, 2:33) a `A2.mp3` (Lukas, 2:09)** — fade overený meraním (koniec o ~14 dB tichší než stred).

**Overené naživo:** `cdn.jsdelivr.net/gh/Soldanellka/lexarena-audio@v1/pracovne/vecny/A1.mp3` aj `A2.mp3` → HTTP 200, `audio/mpeg` — presne base URL, ktorú karta už má v kóde. **Appka sa nemenila vôbec.**

## Ako si to Babu vypočuje (proof pred zvyškom)

V appke na iPhone: karta 🌙 Nočný výcuc → odomknúť (alebo ukážka zdarma = začiatok A1) → vybrať okruhy 1 a 2 → ▶︎ Spustiť. Hodnotí sa: hlas (Viktoria vs. Lukas), tempo (−15 %), pauzy, fade-out na konci stopy, reťazenie A1→A2 a Media Session na zamknutej obrazovke. Ostatné okruhy nahrávku zatiaľ nemajú — prehrávač ich preskočí (zámerné, otestované správanie).

## Ďalej (po potvrdení hlasu a tempa)

Krok 2: `node tools/generate.mjs pracovne vecny` (dogeneruje A3–A50 tým istým nastavením, A1/A2 preskočí), commit, **presun tagu `v1`** na nový commit + purge len tých jsDelivr URL, ktoré medzitým vrátili 404. Ak Babu zmení hlas/tempo, `--force` pregeneruje aj A1/A2 — lacné, kým sme na dvoch.

## Poznámky

- Kľúč nie je v žiadnom repe ani logu (env premenná v používateľskom profile; v generátori sa nikde nevypisuje).
- Skripty (texty) sú vo verejnom repe `lexarena-audio` — rovnaký obsah, ako znie z verejných MP3; vedomé rozhodnutie (repo musí byť verejné kvôli jsDelivr).
- V Downloads čaká aj `claude_obcianske-hmotne-nocny-vycuc-skripty-KOMPLET.md` — až po pilote (Fáza 2), pipeline je na to pripravená (`skripty/obcianske/vecny/…`).
