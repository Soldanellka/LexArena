# Občianske právo – LexArena

Interaktívna študijná appka pre Občianske právo (hmotné aj procesné).

## Štruktúra

```
ob-pravo-app/
  index.html       ← hlavná stránka
  style.css        ← dizajn
  app.js           ← logika
  data/
    hmotne/        ← JSON okruhy pre hmotné právo
      A1.json
      A2.json
      ...
    procesne/      ← JSON okruhy pre procesné právo
      A1.json
      A2.json
      ...
```

## Formát JSON súboru

```json
{
  "id": "1. A",
  "title": "Názov okruhu",
  "schemaVersion": "1.1",
  "tags": ["občianske právo", "..."],
  "summary": "Zhrnutie okruhu pre študentov...",
  "quiz": [
    {
      "question": "Text otázky?",
      "options": ["A", "B", "C", "D"],
      "correct": 1,
      "explanation": {
        "correct": "Správne. Vysvetlenie prečo je táto odpoveď správna...",
        "wrong": "Nesprávne. Vysvetlenie správnej odpovede..."
      }
    }
  ]
}
```

## Konfigurácia

V `app.js` zmeň `CONFIG.hmotne.count` a `CONFIG.procesne.count` 
podľa počtu JSON súborov ktoré máš.

## Napojenie na LexArena

Appka automaticky prideľuje +1§ za každý dokončený okruh (≥60% správnych)
ak je otvorená v rámci LexArena (cez iframe alebo popup).
