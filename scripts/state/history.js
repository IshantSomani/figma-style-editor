import { store } from "./store.js";

const MAX_HISTORY = 50;

let undoStack = [];
let redoStack = [];

function snapshot() {
  return {
    elements: JSON.parse(JSON.stringify(store.elements)),
    selectedElementIds: [...store.selectedElementIds],
  };
}

export function recordHistory() {
  undoStack.push(snapshot());

  if (undoStack.length > MAX_HISTORY) {
    undoStack.shift();
  }

  redoStack.length = 0;
}

export function undo() {
  if (undoStack.length === 0) return;

  redoStack.push(snapshot());

  const prev = undoStack.pop();

  store.elements = JSON.parse(JSON.stringify(prev.elements));
  store.selectedElementIds = [...prev.selectedElementIds];
}

export function redo() {
  if (redoStack.length === 0) return;

  undoStack.push(snapshot());

  const next = redoStack.pop();

  store.elements = JSON.parse(JSON.stringify(next.elements));
  store.selectedElementIds = [...next.selectedElementIds];
}
