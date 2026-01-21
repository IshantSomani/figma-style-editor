import { store } from "./store.js";

const undoStack = [];
const redoStack = [];
const MAX_HISTORY = 50; // prevent memory abuse

export function pushHistory() {
  undoStack.push(clone(store.elements));

  if (undoStack.length > MAX_HISTORY) {
    undoStack.shift();
  }

  redoStack.length = 0; // clear redo on new action
}

export function undo() {
  if (undoStack.length === 0) return;

  redoStack.push(clone(store.elements));
  store.elements = undoStack.pop();
}

export function redo() {
  if (redoStack.length === 0) return;

  undoStack.push(clone(store.elements));
  store.elements = redoStack.pop();
}

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}
