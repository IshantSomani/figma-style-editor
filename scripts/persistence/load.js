import { store } from "../state/store.js";

const STORAGE_KEY = "figma_editor_layout";

export function loadLayout() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const elements = JSON.parse(raw);
    if (!Array.isArray(elements)) return;

    store.elements = elements;
  } catch (e) {
    console.error("Failed to load layout", e);
  }
}
