import { store } from "../state/store.js";

export function exportHTML() {
  const html = buildHTML();
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  download(url, "design.html");
}

function buildHTML() {
  const elementsHTML = store.elements
    .map((el) => {
      const styles = el.styles || {};

      const style = `
        position:absolute;
        left:${el.x}px;
        top:${el.y}px;
        width:${el.width}px;
        height:${el.height}px;
        background:${styles.background || "transparent"};
        color:${styles.color || "#000"};
        border-radius:${styles.borderRadius ?? 0}px;
        transform:rotate(${el.rotation || 0}deg);
        transform-origin:center center;
        display:flex;
        align-items:center;
        justify-content:center;
        box-sizing:border-box;
      `
        .replace(/\s+/g, " ")
        .trim();

      const content = el.type === "text" ? el.text || "" : "";

      return `<div style="${style}">${content}</div>`;
    })
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Exported Design</title>
</head>
<body style="margin:0; position:relative; min-height:100vh;">
  ${elementsHTML}
</body>
</html>
`;
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
