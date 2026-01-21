import { store } from "./state/store.js";
import { generateId } from "./utils/id.js";
import { initSelection } from "./canvas/selection.js";
import { render } from "./canvas/renderer.js";
import { initDrag } from "./elements/drag.js";
import { initResize } from "./elements/resize.js";
import { initRotation } from "./elements/rotate.js";
import { initLayersPanel } from "./panels/layers.js";
import { initPropertiesPanel } from "./panels/properties.js";
import { initKeyboard } from "./input/keyboard.js";
import { loadLayout } from "./persistence/load.js";
import { exportJSON } from "./export/exportJSON.js";
import { exportHTML } from "./export/exportHTML.js";
import { undo, redo } from "./state/history.js";

document.getElementById("undo-btn").onclick = () => {
  undo();
  render();
};

document.getElementById("redo-btn").onclick = () => {
  redo();
  render();
};

document.getElementById("export-json").addEventListener("click", exportJSON);
document.getElementById("export-html").addEventListener("click", exportHTML);

const addRectBtn = document.getElementById("add-rect");
const addTextBtn = document.getElementById("add-text");

addRectBtn.addEventListener("click", () => {
  createElement("rect");
});

addTextBtn.addEventListener("click", () => {
  createElement("text");
});

function createElement(type) {
  const element = {
    id: generateId(),
    type,
    x: 50,
    y: 50,
    width: type === "text" ? 120 : 100,
    height: 40,
    rotation: 0,
    text: type === "text" ? "Text" : undefined, // 🔑 FIX
    styles: {
      background: type === "text" ? "transparent" : "#4caf50",
      color: "#100000",
      borderRadius: 0,
    },
  };

  store.elements.push(element);
  render({ recordHistory: true });
}

// Initialize selection system
loadLayout();

initSelection();
initDrag();
initResize();
initRotation();
initLayersPanel();
initPropertiesPanel();
initKeyboard();

render({ recordHistory: true });
