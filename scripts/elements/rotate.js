import { store } from "../state/store.js";
import { render } from "../canvas/renderer.js";

export function initRotation() {
  const rotateInput = document.getElementById("rotate-input");

  rotateInput.addEventListener("input", () => {
    const id = store.selectedElementId;
    if (!id) return;

    const element = store.elements.find((el) => el.id === id);
    if (!element) return;

    element.rotation = Number(rotateInput.value);
    render({ recordHistory: true });
  });
}
