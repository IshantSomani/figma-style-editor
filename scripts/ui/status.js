import { store } from "../state/store.js";

export function updateSelectedInfo() {
  const el = document.getElementById("selected-element");
  if (!el) return;

  const count = store.selectedElementIds.length;

  if (count === 0) {
    el.textContent = "No element selected";
  } else if (count === 1) {
    el.textContent = "1 element selected";
  } else {
    el.textContent = `${count} elements selected`;
  }
}

export function updateLayerCount() {
  const el = document.getElementById("layer-count");
  if (!el) return;

  const count = store.elements.length;
  el.textContent = `${count} ${count === 1 ? "item" : "items"}`;
}
