import { store } from "../state/store.js";

const STORAGE_KEY = "figma_editor_layout";

export function saveLayout() {
  const data = JSON.stringify(store.elements);
  localStorage.setItem(STORAGE_KEY, data);
}
