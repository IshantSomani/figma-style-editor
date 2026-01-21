import { store } from "../state/store.js";
import { canvas } from "../canvas/canvas.js";
import { render } from "../canvas/renderer.js";
import { snapPosition, snapSize } from "../utils/snap.js";

let isResizing = false;
let resizeHandle = null;
let startMouseX = 0;
let startMouseY = 0;
let startRect = null;
let elementId = null;

const MIN_SIZE = 30;

export function initResize() {
  canvas.addEventListener("mousedown", (e) => {
    const handle = e.target;

    if (!handle.classList.contains("resize-handle")) return;
    
    e.stopPropagation();
    e.preventDefault();

    elementId = handle.dataset.id;
    resizeHandle = handle.dataset.handle;

    const element = store.elements.find(el => el.id === elementId);
    if (!element) return;

    isResizing = true;

    startMouseX = e.clientX;
    startMouseY = e.clientY;

    startRect = {
      x: element.x,
      y: element.y,
      width: element.width,
      height: element.height,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

function onMouseMove(e) {
  if (!isResizing) return;

  const el = store.elements.find(el => el.id === elementId);
  if (!el) return;

  const dx = e.clientX - startMouseX;
  const dy = e.clientY - startMouseY;

  let { x, y, width, height } = startRect;

  if (resizeHandle.includes("e")) {
    width = startRect.width + dx;
  }

  if (resizeHandle.includes("s")) {
    height = startRect.height + dy;
  }

  if (resizeHandle.includes("w")) {
    width = startRect.width - dx;
    x = startRect.x + dx;
  }

  if (resizeHandle.includes("n")) {
    height = startRect.height - dy;
    y = startRect.y + dy;
  }


  width = snapSize(width);
  height = snapSize(height);
  x = snapPosition(x);
  y = snapPosition(y);

  width = Math.max(MIN_SIZE, width);
  height = Math.max(MIN_SIZE, height);

  const canvasRect = canvas.getBoundingClientRect();

  x = Math.max(0, Math.min(x, canvasRect.width - width));
  y = Math.max(0, Math.min(y, canvasRect.height - height));

  el.x = x;
  el.y = y;
  el.width = width;
  el.height = height;

  render();
}

function onMouseUp() {
  if (!isResizing) return;

  isResizing = false;
  resizeHandle = null;
  startRect = null;
  elementId = null;

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);

  render({ recordHistory: true });
}
