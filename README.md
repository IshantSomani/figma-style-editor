# 🎨 Figma Style Editor (Vanilla JS)

A **Figma-inspired visual design editor** built using **pure HTML, CSS, and JavaScript** (no frameworks).
This project demonstrates **real editor architecture** including selection, drag/resize/rotate, layers, properties panel, undo/redo, snap-to-grid, persistence, and export.

> ⚡ Built to showcase advanced frontend engineering concepts without React, Canvas, or external libraries.

---

## 🚀 Live Features

### 🧩 Core Editor

* Add **Rectangles** and **Text** elements
* Visual **canvas-based editor**
* Click to select, Shift+Click for **multi-select**
* Drag, resize, rotate elements
* Keyboard support (arrow keys, delete)

### 🗂 Layers Panel

* View all elements as layers
* Select via layers
* Reorder layers (Move Up / Down)
* Multi-select supported
* Live layer count

### 🎛 Properties Panel

* Width & Height
* Background color
* **Border radius** (rectangles)
* Text content (text elements)
* Single-selection safe (industry standard UX)

### ⌨ Keyboard Shortcuts

* `Arrow Keys` → Move selected elements
* `Delete` → Delete selected elements
* `Ctrl + Z` → Undo
* `Ctrl + Y / Ctrl + Shift + Z` → Redo

### 🕘 Undo / Redo System

* Snapshot-based history
* Works for:

  * Drag
  * Resize
  * Rotate
  * Properties change
  * Layer reorder
  * Delete
* Memory-safe capped history

### 💾 Persistence

* Auto-save using `localStorage`
* Restores layout on refresh
* Safe against corrupted data

### 📤 Export

* Export design as **JSON**
* Export design as **standalone HTML**
* No external dependencies in export

### 📱 Responsive UI

* Desktop / Laptop / Tablet / Mobile
* Collapsible panels on mobile
* Touch-friendly controls

---

## 🏗 Project Architecture

```
figma-style-editor/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── app.js
│   ├── canvas/
│   │   ├── canvas.js
│   │   ├── renderer.js
│   │   └── selection.js
│   ├── elements/
│   │   ├── drag.js
│   │   ├── resize.js
│   │   └── rotate.js
│   ├── panels/
│   │   ├── layers.js
│   │   └── properties.js
│   ├── input/
│   │   └── keyboard.js
│   ├── state/
│   │   ├── store.js
│   │   ├── history.js
│   │   └── constants.js
│   ├── utils/
│   │   ├── id.js
│   │   └── snap.js
│   ├── persistence/
│   │   ├── save.js
│   │   └── load.js
│   ├── export/
│   │   ├── exportJSON.js
│   │   └── exportHTML.js
│   └── ui/
│       └── status.js
```

---

## 🧠 Architecture Principles

* **Single Source of Truth**

  * All element data lives in `store.elements`
* **State-Driven Rendering**

  * UI is rebuilt from state
* **No DOM mutation hacks**
* **Undo/Redo via state snapshots**
* **Derived UI (no duplicated state)**
* **Editor-grade event handling**

This mirrors how tools like **Figma, Notion, Photoshop** are architected internally.

---

## 📦 Element Data Model

```js
{
  id: "el_xxx",
  type: "rect" | "text",
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  rotation: Number,
  text?: String,
  styles: {
    background: String,
    color: String,
    borderRadius: Number
  }
}
```

---

## 🛠 How to Run Locally

> ⚠️ Use a local server (ES modules require it)

### Option 1: VS Code Live Server

1. Open folder in VS Code
2. Install **Live Server** extension
3. Right-click `index.html` → *Open with Live Server*

### Option 2: Simple HTTP Server

```bash
npx serve .
```

---

## 📌 Supported Browsers

* Chrome (recommended)
* Edge
* Firefox
* Safari (latest)

Uses:

* ES Modules
* `crypto.randomUUID()`

---

## 🎯 What This Project Demonstrates

* Advanced DOM-based editor logic
* Real-world state management (without frameworks)
* Undo/redo engineering
* Multi-selection math
* Snap-to-grid correctness
* Export pipelines
* Responsive UI design

---

## 🧪 Known Limitations (Intentional)

* No grouping yet (planned)
* No text alignment/font family yet
* No smart guides (snap to other elements)
* No zoom / pan

These are **deliberately left** as extensibility exercises.

---

## 🔮 Planned Enhancements

* Group / Ungroup
* Smart Guides (edge snapping)
* Font size & font family
* Text alignment
* Auto-resize text boxes
* Import JSON
* Zoom & pan
* Mini-map

---

## 🏆 Portfolio Statement (Use This)

> *Built a Figma-style visual editor using vanilla JavaScript. Implemented selection, drag/resize/rotate, layers, undo/redo, snap-to-grid, persistence, and export without using Canvas or frontend frameworks.*

---

## 📄 License

MIT License — free to use, modify, and learn from.

---