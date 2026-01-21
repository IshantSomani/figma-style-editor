import { store } from "../state/store.js";
import { canvas } from "./canvas.js";
import { render } from "./renderer.js";
import { syncPropertiesPanel } from "../panels/properties.js";
import { updateSelectedInfo, updateLayerCount } from "../ui/status.js";

export function initSelection() {
  canvas.addEventListener("click", (e) => {
    const target = e.target;

    if (target === canvas) {
      store.selectedElementIds = [];
      syncPropertiesPanel();
      updateSelectedInfo();
      syncRotationUI();
      render();
      return;
    }

    const id = target.dataset.id;
    if (!id) return;

    if (e.shiftKey) {
      toggleSelection(id);
    } else {
      store.selectedElementIds = [id];
    }

    syncPropertiesPanel();
    updateSelectedInfo();
    syncRotationUI();
    render();
  });
}

function toggleSelection(id) {
  const index = store.selectedElementIds.indexOf(id);

  if (index === -1) {
    store.selectedElementIds.push(id);
  } else {
    store.selectedElementIds.splice(index, 1);
  }
}

function syncRotationUI() {
  const rotateInput = document.getElementById("rotate-input");

  if (store.selectedElementIds.length === 0) {
    rotateInput.value = 0;
    return;
  }

  const primaryId = store.selectedElementIds.at(-1);
  const el = store.elements.find((e) => e.id === primaryId);

  rotateInput.value = el ? el.rotation : 0;
}
