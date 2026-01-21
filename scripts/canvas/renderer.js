import { store } from "../state/store.js";
import { canvas } from "./canvas.js";
import { renderLayers } from "../panels/layers.js";
import { saveLayout } from "../persistence/save.js";
import { recordHistory } from "../state/history.js";
import { updateSelectedInfo, updateLayerCount } from "../ui/status.js";

export function render(options = {}) {
  const { recordHistory: shouldRecord = false } = options;

  if (shouldRecord) {
    recordHistory();
  }

  canvas.innerHTML = "";

  store.elements.forEach((el, index) => {
    const div = document.createElement("div");

    div.dataset.id = el.id; // 🔑 critical for selection

    div.style.position = "absolute";
    div.style.left = el.x + "px";
    div.style.top = el.y + "px";
    div.style.width = el.width + "px";
    div.style.height = el.height + "px";
    div.style.transform = `rotate(${el.rotation}deg)`;
    div.style.transformOrigin = "center center";
    div.style.background = el.styles?.background || "transparent";
    div.style.color = el.styles.color;
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.cursor = "pointer";
    div.style.zIndex = index;
    div.style.borderRadius = (el.styles?.borderRadius ?? 0) + "px";
    div.style.color = el.styles?.color || "#000";

    if (el.type === "text") {
      div.textContent = el.text || "";

      div.addEventListener("dblclick", () => {
        e.stopPropagation();
        div.contentEditable = true;
        div.focus();

        const onBlur = () => {
          div.contentEditable = false;
          el.text = div.textContent;
          render({ recordHistory: true });
          div.removeEventListener("blur", onBlur);
        };

        div.addEventListener("blur", onBlur);
      });
    }

    if (store.selectedElementIds.includes(el.id)) {
      div.style.outline = "2px solid #4fc3f7";
      div.style.cursor = "move";

      const handles = ["nw", "ne", "sw", "se"];

      handles.forEach((pos) => {
        const handle = document.createElement("div");
        handle.className = `resize-handle ${pos}`;
        handle.dataset.handle = pos;
        handle.dataset.id = el.id;

        div.appendChild(handle);
      });
    }

    if (el.meta?.note) {
      const badge = document.createElement("div");
      badge.textContent = "🧠";
      badge.title = el.meta.note;

      badge.style.position = "absolute";
      badge.style.top = "-10px";
      badge.style.right = "-10px";
      badge.style.fontSize = "14px";
      badge.style.cursor = "help";

      div.appendChild(badge);
    }

    canvas.appendChild(div);
  });

  updateSelectedInfo();
  updateLayerCount();
  renderLayers();
  saveLayout();
}
