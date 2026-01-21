import { store } from "../state/store.js";
import { canvas } from "../canvas/canvas.js";
import { render } from "../canvas/renderer.js";
import { snapPosition, snapSize } from "../utils/snap.js";

let isResizing = false;
let handleType = null;
let startMouseX = 0;
let startMouseY = 0;
let startRect = null;

const MIN_SIZE = 30;

export function initResize() {
  canvas.addEventListener("mousedown", (e) => {
    const handle = e.target;

    if (!handle.classList.contains("resize-handle")) return;

    const id = handle.dataset.id;
    if (store.selectedElementId !== id) return;

    const element = store.elements.find((el) => el.id === id);
    if (!element) return;

    isResizing = true;
    handleType = handle.dataset.handle;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    startRect = { ...element };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    e.stopPropagation(); // ⛔ prevent drag
  });
}

function onMouseMove(e) {
  if (!isResizing) return;

  const el = store.elements.find((el) => el.id === store.selectedElementId);
  if (!el) return;

  const dx = e.clientX - startMouseX;
  const dy = e.clientY - startMouseY;

  let { x, y, width, height } = startRect;

  switch (handleType) {
    case "se":
      width += dx;
      height += dy;
      break;

    case "sw":
      width -= dx;
      height += dy;
      x += dx;
      break;

    case "ne":
      width += dx;
      height -= dy;
      y += dy;
      break;

    case "nw":
      width -= dx;
      height -= dy;
      x += dx;
      y += dy;
      break;
  }

  // 🔒 Minimum size
  width = Math.max(MIN_SIZE, width);
  height = Math.max(MIN_SIZE, height);

  // 🔒 Canvas boundaries
  const canvasRect = canvas.getBoundingClientRect();

  x = Math.max(0, Math.min(x, canvasRect.width - width));
  y = Math.max(0, Math.min(y, canvasRect.height - height));

  el.x = snapPosition(x);
  el.y = snapPosition(y);
  el.width = snapSize(width);
  el.height = snapSize(height);

  render({ recordHistory: true });
}

function onMouseUp() {
  isResizing = false;
  handleType = null;
  startRect = null;

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}
