import { store } from "../state/store.js";
import { render } from "../canvas/renderer.js";

const listEl = document.getElementById("layers-list");
const upBtn = document.getElementById("layer-up");
const downBtn = document.getElementById("layer-down");

export function initLayersPanel() {
  renderLayers();

  listEl.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    // Shift + click → toggle
    if (e.shiftKey) {
      toggleSelection(id);
    } else {
      store.selectedElementIds = [id];
    }

    render();
    renderLayers();
  });

  upBtn.addEventListener("click", () => moveLayers(-1));
  downBtn.addEventListener("click", () => moveLayers(1));
}

export function renderLayers() {
  listEl.innerHTML = "";

  store.elements.forEach((el, index) => {
    const li = document.createElement("li");
    const textValue = el.text?.trim() || "Text";

    const MAX_LEN = 24;
    li.textContent =
      el.type === "text"
        ? textValue.length > MAX_LEN
          ? textValue.slice(0, MAX_LEN).trim() + "…"
          : textValue
        : `${el.type.toUpperCase()} ${index + 1}`;

    li.dataset.id = el.id;

    if (store.selectedElementIds.includes(el.id)) {
      li.classList.add("active");
    }

    listEl.appendChild(li);
  });
}

function toggleSelection(id) {
  const i = store.selectedElementIds.indexOf(id);

  if (i === -1) {
    store.selectedElementIds.push(id);
  } else {
    store.selectedElementIds.splice(i, 1);
  }
}

function moveLayers(direction) {
  if (store.selectedElementIds.length === 0) return;

  // Work on indices, not IDs
  const indices = store.selectedElementIds
    .map((id) => store.elements.findIndex((el) => el.id === id))
    .sort((a, b) => a - b);

  // Prevent moving out of bounds
  if (
    (direction === -1 && indices[0] === 0) ||
    (direction === 1 &&
      indices[indices.length - 1] === store.elements.length - 1)
  ) {
    return;
  }

  // Move order depends on direction
  const ordered = direction === -1 ? indices : [...indices].reverse();

  ordered.forEach((index) => {
    const temp = store.elements[index];
    store.elements[index] = store.elements[index + direction];
    store.elements[index + direction] = temp;
  });

  render({ recordHistory: true });
  renderLayers();
}
