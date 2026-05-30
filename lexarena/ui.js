// lexarena/ui.js

import { aktualizovatParagrafyUI } from "./arena.js";

// inicializácia UI po načítaní stránky
export function inicializovatUI() {
  document.addEventListener("DOMContentLoaded", () => {
    aktualizovatParagrafyUI();
  });
}
