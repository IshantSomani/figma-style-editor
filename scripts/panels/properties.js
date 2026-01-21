import { store } from "../state/store.js";
import { render } from "../canvas/renderer.js";

const widthInput = document.getElementById("prop-width");
const heightInput = document.getElementById("prop-height");
const bgInput = document.getElementById("prop-bg");
const textInput = document.getElementById("prop-text");
const textPropGroup = document.getElementById("text-prop");
 const borderInput = document.getElementById("prop-border");
 
export function initPropertiesPanel() {
  const panel = document.getElementById("properties-panel");

  panel.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  widthInput.addEventListener("input", () =>
    update("width", Number(widthInput.value)),
  );

  heightInput.addEventListener("input", () =>
    update("height", Number(heightInput.value)),
  );

  bgInput.addEventListener("input", updateBg);

  textInput.addEventListener("input", () => update("text", textInput.value));

  borderInput.addEventListener("input", () =>
    updateStyle("borderRadius", Number(borderInput.value)),
  );
}

export function syncPropertiesPanel() {
  // ✅ Only show properties for SINGLE selection
  if (store.selectedElementIds.length !== 1) {
    clearPanel();
    return;
  }

  const el = store.elements.find((el) => el.id === store.selectedElementIds[0]);

  if (!el) {
    clearPanel();
    return;
  }

  widthInput.value = el.width;
  heightInput.value = el.height;
  bgInput.value = el.styles.background || "#000000";
  borderInput.value = el.styles?.borderRadius ?? 0;

  if (el.type === "rect") {
    borderInput.parentElement.style.display = "block";
  } else {
    borderInput.parentElement.style.display = "none";
  }

  if (el.type === "text") {
    textPropGroup.style.display = "block";
    textInput.value = el.text ?? "";
  }
}

function update(prop, value) {
  if (store.selectedElementIds.length !== 1) return;

  const el = store.elements.find((el) => el.id === store.selectedElementIds[0]);
  if (!el) return;

  console.log("Updating", prop, "to", value);

  if (prop === "text") {
    el.text = value;
  } else {
    el[prop] = value;
  }

  render({ recordHistory: true });
}

function updateBg() {
  if (store.selectedElementIds.length !== 1) return;

  const el = store.elements.find((el) => el.id === store.selectedElementIds[0]);
  if (!el) return;

  el.styles.background = bgInput.value;
  render({ recordHistory: true });
}

function updateStyle(styleProp, value) {
  if (store.selectedElementIds.length !== 1) return;

  const el = store.elements.find((el) => el.id === store.selectedElementIds[0]);
  if (!el) return;

  // Initialize styles if missing (safety)
  el.styles ||= {};

  el.styles[styleProp] = value;
  render({ recordHistory: true });
}

function clearPanel() {
  widthInput.value = "";
  heightInput.value = "";
  bgInput.value = "#000000";
  textInput.value = "";
}
