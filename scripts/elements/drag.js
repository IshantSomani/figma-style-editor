import { store } from "../state/store.js";
import { canvas } from "../canvas/canvas.js";
import { render } from "../canvas/renderer.js";
import { snap } from "../utils/snap.js";

let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPositions = [];

export function initDrag() {
  canvas.addEventListener("mousedown", (e) => {
    const target = e.target;
    const id = target.dataset.id;

    // Must click on a selected element
    if (!id || !store.selectedElementIds.includes(id)) return;

    isDragging = true;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    // 🔑 Snapshot ALL selected elements
    startPositions = store.selectedElementIds.map((selectedId) => {
      const el = store.elements.find((e) => e.id === selectedId);
      return {
        id: el.id,
        x: el.x,
        y: el.y,
        width: el.width,
        height: el.height,
      };
    });

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

function onMouseMove(e) {
  if (!isDragging) return;

  const rawDx = e.clientX - startMouseX;
  const rawDy = e.clientY - startMouseY;

  // ✅ SNAP DELTA (not absolute position)
  const snappedDx = snap(rawDx);
  const snappedDy = snap(rawDy);

  const canvasRect = canvas.getBoundingClientRect();

  startPositions.forEach((start) => {
    const el = store.elements.find((e) => e.id === start.id);
    if (!el) return;

    let newX = start.x + snappedDx;
    let newY = start.y + snappedDy;

    // 🔒 Canvas boundaries (per element)
    newX = Math.max(0, Math.min(newX, canvasRect.width - start.width));
    newY = Math.max(0, Math.min(newY, canvasRect.height - start.height));

    el.x = newX;
    el.y = newY;
  });

  render();
}

function onMouseUp() {
  if (!isDragging) return;

  isDragging = false;
  startPositions = [];

  // ✅ ONE history entry
  render({ recordHistory: true });

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}
