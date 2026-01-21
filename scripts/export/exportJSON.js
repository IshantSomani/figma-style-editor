import { store } from "../state/store.js";

export function exportJSON() {
  const data = JSON.stringify(store.elements, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  download(url, "design.json");
}

function download(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
