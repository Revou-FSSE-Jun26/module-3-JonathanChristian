# Module 3 — Checkpoint 1

Foundational exercises covering semantic HTML/CSS, vanilla JavaScript, TypeScript, and Tailwind CSS. These are the raw building blocks that React and Tailwind sit on top of, built before starting the RevoShop application in Checkpoint 2.

## Repository structure

```
.
├── html-css/            # Semantic profile page with contact form (HTML + CSS)
├── javascript/          # Vanilla JS exercises
│   ├── dom-events/      #   DOM manipulation & event handling (to-do list)
│   └── array-processing/#   forEach / map / filter / reduce over an orders dataset
├── typescript-tailwind/ # Typed, interactive product catalog (TypeScript + Tailwind)
├── package.json         # Dev dependencies (Tailwind, PostCSS, Autoprefixer)
└── tailwind.config.js   # Root Tailwind config
```

---

## html-css/

A semantic personal profile page with an About section, a Projects section, and a Contacts form.

- `profile.html` — semantic HTML5 structure (`header`, `main`, `section`, `footer`), a contact form with labelled inputs (text, email, textarea), and project cards.
- `style.css` — styling with the box model, a CSS Grid layout for the project cards, and a responsive breakpoint at `768px`.

**How to run:** open `html-css/profile.html` directly in any web browser. No build step required. Resize the window (or use browser dev tools device mode) to see the responsive layout switch between mobile and desktop.

---

## javascript/

Two standalone vanilla JavaScript exercises, each in its own folder and runnable directly in the browser.

### dom-events/ — DOM manipulation & event handling

A to-do list demonstrating selecting/updating DOM elements, toggling classes, creating and removing elements, event handlers (`submit`, `click`), and `preventDefault`.

- `dom-events.html` — page structure and target elements.
- `dom-events.css` — styling (white/green theme, responsive).
- `dom-events.js` — all interactivity.

**How to run:** open `javascript/dom-events/dom-events.html` in a browser. Type a task and press Add (or Enter), click a task to mark it complete, delete individual tasks, or clear all completed ones. The "tasks left" count and empty-state message update live.

### array-processing/ — array methods

An orders/sales dashboard demonstrating `forEach`, `map`, `filter`, and `reduce`, rendering results to the page.

- `array-processing.html` — one panel per array method.
- `array-processing.css` — styling (white/green theme, responsive).
- `array-processing.js` — the dataset and all four array-method renderers.

**How to run:** open `javascript/array-processing/array-processing.html` in a browser. The four panels populate on load: all orders (`forEach`), per-order totals (`map`), high-value orders (`filter`), and aggregate figures (`reduce`).

---

## typescript-tailwind/

A fully typed, interactive product catalog styled with Tailwind CSS — the direct predecessor of the React ProductCard built in Checkpoint 2. It renders typed product data into styled cards, supports a live search filter, and tracks an add-to-cart counter.

```
typescript-tailwind/
├── src/
│   ├── index.html   # Markup with Tailwind utility classes
│   ├── input.css    # Tailwind directives (@tailwind base/components/utilities)
│   └── script.ts    # Typed product data + rendering, search, and cart logic
├── dist/
│   ├── output.css   # Compiled Tailwind CSS (generated)
│   └── script.js    # Compiled JavaScript (generated)
├── tailwind.config.js
└── tsconfig.json
```

- **TypeScript:** `interface`s (`Product`, `CartItem`, `Cart`), a type alias with a union type (`BadgeVariant = "success" | "warning" | "error"`), and typed arrays of nested objects (`Product[]`, `CartItem[]`).
- **Tailwind:** utility-first styling, mobile-first responsive breakpoints, and typed data mapped to conditional class strings (`getCardClasses`, `getBadgeClasses`).

### Setup

From the repository root, install dependencies once:

```
npm install
```

### Build

Run these from inside the `typescript-tailwind/` folder:

```
cd typescript-tailwind
```

Compile the TypeScript to `dist/script.js`:

```
tsc
```

Compile the Tailwind CSS to `dist/output.css`:

```
npx tailwindcss -i ./src/input.css -o ./dist/output.css
```

To rebuild the CSS automatically on change, add `--watch`:

```
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### How to run

After building, open `typescript-tailwind/src/index.html` in a browser. The catalog renders from the typed data. Type in the search box to filter products live, and click "Add to Cart" on in-stock items to update the cart summary counter and total.

> Rebuild the CSS after adding any new Tailwind class that wasn't already used in the source, otherwise the new class won't exist in `dist/output.css`.
