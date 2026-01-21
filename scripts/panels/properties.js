import { store } from "../state/store.js";
import { render } from "../canvas/renderer.js";

const widthInput = document.getElementById("prop-width");
const heightInput = document.getElementById("prop-height");
const bgInput = document.getElementById("prop-bg");
const textInput = document.getElementById("prop-text");
const textPropGroup = document.getElementById("text-prop");
const borderInput = document.getElementById("prop-border");
const textColorInput = document.getElementById("prop-text-color");
const removeBgBtn = document.getElementById("remove-bg");

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

  removeBgBtn.addEventListener("click", () => {
    const el = store.elements.find((el) =>
      store.selectedElementIds.includes(el.id),
    );

    if (!el) return;

    // 🔑 Remove background safely
    el.styles.background = "transparent";

    render({ recordHistory: true });
  });

  textInput.addEventListener("input", () => update("text", textInput.value));
  textColorInput.addEventListener("input", () => {
    const el = store.elements.find((el) =>
      store.selectedElementIds.includes(el.id),
    );

    if (!el || el.type !== "text") return;

    // 🎨 Apply text color
    el.styles.color = textColorInput.value;

    // 🔑 FORCE transparent background for text
    el.styles.background = "transparent";

    render({ recordHistory: true });
  });

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
  bgInput.value =
    el.styles?.background && el.styles.background !== "transparent"
      ? el.styles.background
      : "#ffffff";
  borderInput.value = el.styles?.borderRadius ?? 0;

  if (el.type === "rect") {
    borderInput.parentElement.style.display = "block";
  } else {
    borderInput.parentElement.style.display = "none";
  }

  if (el.type === "text") {
    textPropGroup.style.display = "block";

    textInput.value = el.text ?? "";
    textColorInput.value = el.styles?.color || "#000000";
  }
}

function update(prop, value) {
  if (store.selectedElementIds.length !== 1) return;

  const el = store.elements.find((el) => el.id === store.selectedElementIds[0]);
  if (!el) return;

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
  textColorInput.value = "#000000";
  textInput.value = "";
}
