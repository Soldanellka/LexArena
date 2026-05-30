// lexarena/duelPackages.js

export function saveDuelPackage(pkg) {
  const all = JSON.parse(localStorage.getItem("duelPackages") || "[]");

  // ak už existuje balík s rovnakým ID, prepíšeme ho
  const existingIndex = all.findIndex(p => p.id === pkg.id);
  if (existingIndex !== -1) {
    all[existingIndex] = pkg;
  } else {
    all.push(pkg);
  }

  localStorage.setItem("duelPackages", JSON.stringify(all));
}
