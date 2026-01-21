import { store } from "../state/store.js";

export function exportHTML() {
  const html = buildHTML();
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  download(url, "design.html");
}

function buildHTML() {
  const elementsHTML = store.elements
    .map(el => {
      const style = `
        position:absolute;
        left:${el.x}px;
        top:${el.y}px;
        width:${el.width}px;
        height:${el.height}px;
        background:${el.styles.background};
        color:${el.styles.color};
        transform:rotate(${el.rotation}deg);
        transform-origin:center center;
        display:flex;
        align-items:center;
        justify-content:center;
      `.replace(/\s+/g, " ");

      const content = el.type === "text" ? el.text || "Text" : "";

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
<body style="margin:0; position:relative;">
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
