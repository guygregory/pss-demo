# AGENTS.md – Browser Game (HTML + CSS + JavaScript)

This repository contains a **simple, fully client-side game** built with vanilla HTML, CSS, and JavaScript, designed to be hosted on **Azure Static Web Apps**.

This file defines how AI/code agents should work with the project: goals, constraints, responsibilities, and collaboration patterns.

---

## 1. Project Overview

**Goal:**  
Create a lightweight, browser-based game that:

- Runs entirely in the browser (no backend required).
- Is child-friendly and accessible.
- Works well on desktop and mobile.
- Can be deployed as-is to Azure Static Web Apps.


## 2. Technology Stack & Constraints

**Stack:**

- **HTML5** – single-page app (SPA-style, but without a framework).
- **CSS3** – layout, theme, responsive design, animations.
- **JavaScript (ES6+)** – game logic and DOM/canvas interactions.

**Constraints:**

1. **No frontend frameworks**  
   - No React, Vue, Angular, Svelte etc.
   - No heavy UI libraries. Plain DOM or `<canvas>` only.

2. **No build step required to run**  
   - Game must run by opening `index.html` directly in a browser.
   - A simple bundler or minifier may be used for production, but is optional.

3. **Static hosting only**  
   - Must be deployable as static files (HTML, CSS, JS, images, audio) to Azure Static Web Apps.
   - No server-side rendering.

4. **Offline-friendly where reasonable**  
   - Attempt to minimize external dependencies (fonts/CDNs).
   - Prefer local assets stored in `/assets`.

5. **Accessibility & inclusivity**  
   - Use semantic HTML where possible.
   - Provide text alternatives for key visuals.
   - Avoid rapid flashing / intense visual effects.

---

## 3. Target File Structure

Agents should converge on a clean, simple structure:

```text
/
├─ index.html
├─ src/
│  ├─ main.js          # Entry point, bootstraps game
│  ├─ game.js          # Core game loop and state
│  ├─ ui.js            # DOM helpers & UI updates
│  ├─ input.js         # Event handlers (keyboard/mouse/touch)
│  └─ utils.js         # Generic helpers (random, timers, etc.)
├─ styles/
│  └─ style.css        # Main styling + Christmas theme
├─ assets/
│  ├─ images/
│  │  ├─ background.png
│  │  ├─ sprite-sheet.png
│  │  └─ icons/*.svg
│  └─ audio/
│     ├─ jingle.mp3
│     └─ click.wav
└─ docs/
   ├─ AGENTS.md        # This file
   └─ DESIGN.md        # Optional: gameplay & UX notes
