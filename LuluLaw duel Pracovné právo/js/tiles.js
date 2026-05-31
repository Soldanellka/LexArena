// tiles.js
// Matching tiles game (showTiles)
// Robustná verzia s detailným debugovaním a bezpečnými fallbackmi

function showTiles(topic, body, footer, metrics) {
  return new Promise((resolve) => {
    try {
      console.log('showTiles start', { topicId: topic?.id, tilesLen: Array.isArray(topic?.tiles) ? topic.tiles.length : 'no-tiles-field' });
    } catch (e) { console.warn('showTiles logging failed', e); }

    // Fallbacky pre util funkcie
    if (typeof shuffleArray !== 'function') {
      window.shuffleArray = function (arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      };
      console.warn('shuffleArray fallback installed');
    }
    if (typeof escapeHtml !== 'function') {
      window.escapeHtml = function (s) {
        if (s == null) return '';
        return String(s)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      };
      console.warn('escapeHtml fallback installed');
    }

    // Reset UI
    try { body.innerHTML = ""; } catch (e) { console.warn('Cannot clear body.innerHTML', e); }
    try { footer.innerHTML = `<div>Dlaždice</div>`; } catch (e) {}

    const topicId = topic?.id || "global";
    const rawTiles = Array.isArray(topic?.tiles) ? topic.tiles.slice() : [];
    const maxPairs = 10;

    // Map tile objects to term/def robustne: podporujeme rôzne kľúče
    const pairs = rawTiles.slice(0, maxPairs).map((t, idx) => {
      // Hľadaj najpravdepodobnejšie polia
      const term = t.term ?? t.title ?? t.question ?? t.front ?? t.left ?? t.label ?? `Pojem ${idx + 1}`;
      const def = t.definition ?? t.text ?? t.answer ?? t.back ?? t.right ?? t.explanation ?? "Bez definície.";
      return {
        id: `${topicId}-p${idx}`,
        term: term,
        def: def,
        raw: t
      };
    });

    console.log('showTiles: pairs mapped', pairs);

    metrics.tiles = metrics.tiles || {};
    metrics.tiles.totalPairs = pairs.length;
    metrics.tiles.matched = 0;

    if (pairs.length === 0) {
      console.log(`showTiles: no pairs for topic ${topicId}, skipping tiles step`);
      return resolve();
    }

    // Vytvorenie boardu a stĺpcov
    const board = document.createElement("div");
    board.className = "tiles-board";
    board.style.display = "flex";
    board.style.gap = "12px";

    const leftCol = document.createElement("div");
    leftCol.className = "tiles-column left-col";
    leftCol.style.flex = "1";

    const rightCol = document.createElement("div");
    rightCol.className = "tiles-column right-col";
    rightCol.style.flex = "1";

    // Priprav položky
    const leftItems = pairs.map(p => ({ id: p.id, text: p.term }));
    const rightItems = pairs.map(p => ({ id: p.id, text: p.def }));

    shuffleArray(leftItems);
    shuffleArray(rightItems);

    console.log('showTiles: leftItems count', leftItems.length, 'rightItems count', rightItems.length);

    let firstSelection = null;
    let matchedCount = 0;
    const totalPairs = pairs.length;

    function createTileEl(item, side) {
      const el = document.createElement("div");
      // Použijeme setAttribute pre istotu
      el.setAttribute('class', 'tile-card');
      el.setAttribute('data-pair-id', item.id);
      el.setAttribute('data-side', side);
      el.style.position = "relative";
      el.style.padding = "12px";
      el.style.margin = "8px";
      el.style.borderRadius = "10px";
      el.style.background = "var(--card)";
      el.style.minWidth = "160px";
      el.style.cursor = "pointer";
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");

      const content = document.createElement('div');
      content.innerHTML = escapeHtml(item.text);
      if (side === 'term') content.className = 'term';
      else content.className = 'def';
      el.appendChild(content);

      el.addEventListener("click", () => onTileClick(el));
      el.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          onTileClick(el);
        }
      });
      return el;
    }

    // Append a logni počet pridaných elementov
    let leftAdded = 0, rightAdded = 0;
    leftItems.forEach(it => {
      const el = createTileEl(it, "term");
      leftCol.appendChild(el);
      leftAdded++;
    });
    rightItems.forEach(it => {
      const el = createTileEl(it, "def");
      rightCol.appendChild(el);
      rightAdded++;
    });

    console.log('showTiles: appended left/right', leftAdded, rightAdded);

    board.appendChild(leftCol);
    board.appendChild(rightCol);
    body.appendChild(board);

    // Po pridaní elementov skontrolujeme počet
    console.log('showTiles: total .tile-card after append', document.querySelectorAll('.tile-card').length);

    // Footer s progressom a continue
    footer.innerHTML = `<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
      <div id="tilesProgress">Zostáva párov: <strong>${totalPairs - matchedCount}</strong></div>
      <div style="flex:1"></div>
      <button class="primary-btn btn-continue click-anim" style="display:none">Pokračovať na prípady</button>
    </div>`;

    const progressEl = footer.querySelector("#tilesProgress");
    const continueBtn = footer.querySelector(".btn-continue");
    if (continueBtn) continueBtn.addEventListener("click", () => {
      continueBtn.disabled = true;
      setTimeout(() => resolve(), 120);
    });

    function onTileClick(el) {
      if (el.classList.contains("matched")) return;
      if (el.classList.contains("selected")) return;

      el.classList.add("selected");

      if (!firstSelection) {
        firstSelection = { el, id: el.getAttribute('data-pair-id'), side: el.getAttribute('data-side') };
        return;
      }

      const second = { el, id: el.getAttribute('data-pair-id'), side: el.getAttribute('data-side') };

      if (firstSelection.el === second.el) {
        firstSelection.el.classList.remove("selected");
        firstSelection = null;
        return;
      }

      const isMatch = (firstSelection.id === second.id) && (firstSelection.side !== second.side);

      if (isMatch) {
        const a = firstSelection.el;
        const b = second.el;
        setTimeout(() => {
          a.classList.add("matched");
          b.classList.add("matched");
          a.classList.remove("selected");
          b.classList.remove("selected");
          matchedCount++;
          metrics.tiles.matched = matchedCount;
          if (progressEl) progressEl.innerHTML = `Zostáva párov: <strong>${totalPairs - matchedCount}</strong>`;
          if (matchedCount >= totalPairs) {
            if (continueBtn) continueBtn.style.display = "inline-block";
            const complete = document.createElement("div");
            complete.className = "tiles-complete";
            complete.textContent = "Všetky páry spárované ✓";
            body.appendChild(complete);
            setTimeout(() => resolve(), 300);
          }
        }, 300);
      } else {
        const a = firstSelection.el;
        const b = second.el;
        a.classList.add("shake");
        b.classList.add("shake");
        disableBoard(true);
        setTimeout(() => {
          a.classList.remove("shake");
          b.classList.remove("shake");
          a.classList.remove("selected");
          b.classList.remove("selected");
          disableBoard(false);
        }, 420);
      }

      firstSelection = null;
    }

    function disableBoard(flag) {
      board.style.pointerEvents = flag ? "none" : "";
    }
  });
}
