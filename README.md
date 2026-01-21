# 🎨 Figma-Style Design Editor (Web)

A lightweight, browser-based **Figma-style design editor** built with **vanilla JavaScript, HTML, and CSS**.
It focuses on **clarity, intent, and real-world usability**, not just drawing shapes.

This project is ideal for:

* Designers experimenting with layout ideas
* Developers visualizing UI before implementation
* Learning how professional design tools work internally

---

## ✨ Features

### 🧱 Core Editor

* Add **Rectangles** and **Text**
* Drag, resize, rotate elements
* Multi-select (Shift + Click)
* Snap-to-grid movement
* Keyboard controls (move, delete)

### 🎛 Properties Panel

* Width & height control
* Background color
* **Remove background** (transparent)
* Border radius
* Text content (multi-line textarea)
* Text color
* Live updates with undo/redo support

### ✍️ Inline Text Editing

* Double-click text on canvas to edit directly
* Escape / blur to save
* Editor shortcuts disabled while typing (safe UX)

### 🧠 Design Intent Notes (Unique Feature)

Attach **intent notes** to any element explaining *why* it exists.

Examples:

* “Brand color – don’t change”
* “Temporary placeholder”
* “Must align with hero section”

Notes:

* Stored per element
* Undo / redo safe
* Visible via small 🧠 badge
* Exported in JSON

> This feature is rarely found in lightweight editors and is designed for real team collaboration.

### 🗂 Layers Panel

* Tree-style visual layout
* Active layer highlighting
* Text layers display actual text content
* Layer reordering (move up / down)

### ♻ History System

* Undo / Redo (Ctrl+Z / Ctrl+Y)
* Clean history snapshots (no corruption)
* Records only meaningful actions

### 📤 Export

* Export **HTML** (with inline styles)
* Export **JSON** (full design data)
* Preserves:

  * Position
  * Size
  * Rotation
  * Border radius
  * Text color
  * Background transparency

---

## 🧩 Tech Stack

* **HTML5**
* **CSS3** (modern responsive layout)
* **Vanilla JavaScript (ES Modules)**
  No frameworks. No build tools. No dependencies.

---

## 📁 Project Structure

```text
.
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   ├── app.js
│   ├── canvas/
│   │   ├── canvas.js
│   │   ├── renderer.js
│   │   ├── selection.js
│   │   ├── drag.js
│   │   ├── resize.js
│   │   └── rotation.js
│   ├── panels/
│   │   ├── properties.js
│   │   └── layers.js
│   ├── state/
│   │   ├── store.js
│   │   ├── history.js
│   │   └── constants.js
│   ├── export/
│   │   ├── exportHTML.js
│   │   └── exportJSON.js
│   └── utils/
│       └── snap.js
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone or Download

```bash
git clone https://github.com/IshantSomani/figma-style-editor.git
```

or download as ZIP.

---

### 2️⃣ Run Locally (IMPORTANT)

Because this project uses **ES modules**, you must run it via a local server.

#### Option A: VS Code Live Server (recommended)

* Install **Live Server** extension
* Right-click `index.html`
* Click **Open with Live Server**

#### Option B: Simple HTTP server

```bash
# Node
npx serve

# or Python
python -m http.server
```

Then open:

```
http://localhost:3000
```

❌ **Do NOT open via file://**
CORS will break module imports.

---

## ⌨️ Keyboard Shortcuts

| Action           | Shortcut                    |
| ---------------- | --------------------------- |
| Undo             | Ctrl + Z                    |
| Redo             | Ctrl + Y / Ctrl + Shift + Z |
| Delete element   | Delete                      |
| Move selected    | Arrow Keys                  |
| Multi-select     | Shift + Click               |
| Inline text edit | Double-click text           |

---

## ♿ Accessibility

* Screen-reader friendly toolbar
* Icon-only UI with hidden accessible labels
* No keyboard hijacking while typing
* Clean focus behavior

---

## 📦 Export Details

### HTML Export

* Fully standalone HTML file
* Inline styles
* Preserves visual fidelity

### JSON Export

* Complete design state
* Includes design intent notes
* Can be reloaded later

---

## 💡 Unique Philosophy

Unlike many editors, this tool focuses on:

* **Why design decisions are made**
* Not just how things look
* Making design understandable for developers

That’s why **Design Intent Notes** exist.

---

## 🔮 Future Enhancements (Planned)

* Grouping & nested layers
* Accessibility heatmap
* Time-travel playback
* Constraint-based resizing
* Auto-layout
* Developer handoff tokens (CSS variables)

---

## 📄 License

MIT License — free to use, modify, and distribute.
