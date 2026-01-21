import { store } from "../state/store.js";
import { render } from "../canvas/renderer.js";

const rotateInput = document.getElementById("rotate-input");

export function initRotation() {
  rotateInput.addEventListener("input", () => {
    if (store.selectedElementIds.length !== 1) return;

    const el = store.elements.find(
      (el) => el.id === store.selectedElementIds[0],
    );
    if (!el) return;

    el.rotation = Number(rotateInput.value);

    render();
  });

  rotateInput.addEventListener("change", () => {
    if (store.selectedElementIds.length !== 1) return;
    render({ recordHistory: true });
  });
}
