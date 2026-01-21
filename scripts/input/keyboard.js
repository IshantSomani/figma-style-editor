import { store } from "../state/store.js";
import { canvas } from "../canvas/canvas.js";
import { render } from "../canvas/renderer.js";
import { undo, redo } from "../state/history.js";
import { snapPosition } from "../utils/snap.js";

const MOVE_STEP = 5;

export function initKeyboard() {
  document.addEventListener("keydown", (e) => {
    // 🚫 Do not hijack typing
    if (isTyping(e)) return;

    if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
      undo();
      render();
      e.preventDefault();
      return;
    }

    if (
      (e.ctrlKey && e.key === "y") ||
      (e.ctrlKey && e.shiftKey && e.key === "z")
    ) {
      redo();
      render();
      e.preventDefault();
      return;
    }

    if (store.selectedElementIds.length === 0) return;

    switch (e.key) {
      case "Delete":
        store.elements = store.elements.filter(
          (el) => !store.selectedElementIds.includes(el.id),
        );
        store.selectedElementIds = [];
        render({ recordHistory: true });
        e.preventDefault();
        break;

      case "ArrowUp":
        moveAll(0, -MOVE_STEP);
        e.preventDefault();
        break;

      case "ArrowDown":
        moveAll(0, MOVE_STEP);
        e.preventDefault();
        break;

      case "ArrowLeft":
        moveAll(-MOVE_STEP, 0);
        e.preventDefault();
        break;

      case "ArrowRight":
        moveAll(MOVE_STEP, 0);
        e.preventDefault();
        break;
    }
  });
}

function moveAll(dx, dy) {
  const canvasRect = canvas.getBoundingClientRect();

  store.selectedElementIds.forEach((id) => {
    const el = store.elements.find((e) => e.id === id);
    if (!el) return;

    let newX = el.x + dx;
    let newY = el.y + dy;

    newX = Math.max(0, Math.min(newX, canvasRect.width - el.width));
    newY = Math.max(0, Math.min(newY, canvasRect.height - el.height));

    el.x = snapPosition(newX);
    el.y = snapPosition(newY);
  });

  // ✅ single history entry
  render({ recordHistory: true });
}

function isTyping(e) {
  const tag = e.target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA";
}
