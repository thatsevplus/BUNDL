# GINGR theme — Commands & workflow

How to run, preview, and test the Shopify theme from this repo.

**Store:** [https://gingr-2.myshopify.com/](https://gingr-2.myshopify.com/) (password-protected until you go live)

---

## Prerequisites

- **Node.js** (v18+) — [nodejs.org](https://nodejs.org)
- **Shopify CLI** — [Install](https://shopify.dev/docs/api/shopify-cli#installation)
  ```bash
  npm install -g @shopify/cli @shopify/theme
  ```
- A **Shopify store** (partner dev store or real store) to connect to.

---

## First-time setup

From the **project root** (where `package.json` and `gingr_theme/` live):

```bash
npm install
```

No need to install inside `gingr_theme/` — all dependencies are at the root.

---

## Build (CSS & JS)

Compile Tailwind and JS once. Output goes to `gingr_theme/assets/main.css` and `gingr_theme/assets/main.js`.

```bash
npm run build
```

Run this before pushing the theme or if you only changed Liquid and want to refresh assets.

---

## Watch (CSS & JS only)

Rebuild assets automatically when you change files in `src/` or `gingr_theme/**/*.liquid`.

```bash
npm run watch
```

Use this in a **separate terminal** if you run `shopify theme dev` alone (see below).

---

## Preview & test with real products (recommended)

Starts both asset watcher and Shopify theme dev. You get a **live preview URL** (tunnel to your store) with real products, cart, and checkout.

```bash
npm run dev
```

1. First run: you’ll be prompted to log in and pick a store (or create a dev store).
2. A URL opens (e.g. `https://your-store.myshopify.com?preview_theme_id=...`) — that’s your “localhost” for the theme.
3. Edit Liquid/CSS/JS; the preview reloads. Products, collections, and cart are **real** store data.

**To test actual products:**  
Open that preview URL, then go to a product or collection page. Add to cart, test bundle selector, subscription UI, and cart drawer. Changes in code (after save) refresh in the browser.

**Without `concurrently`:** run in two terminals:
- Terminal 1: `npm run watch`
- Terminal 2: `shopify theme dev --path gingr_theme --store gingr-2.myshopify.com`

---

## Push theme to Shopify (recommended when dev doesn't work)

When `npm run dev` fails (e.g. Google login, password-protected store), push to see changes:

```bash
# From project root (C:\...\gingr)
npm run build
shopify theme push --path gingr_theme --store gingr-2.myshopify.com
```

1. Build compiles Tailwind + JS into `gingr_theme/assets/`
2. Push uploads to your store. You'll be prompted to pick which theme (live, draft, or create new)
3. Open your store URL or the theme editor to preview

Push as **unpublished** to avoid affecting the live theme:

```bash
shopify theme push --path gingr_theme --store gingr-2.myshopify.com --unpublished
```

---

## Pull theme from Shopify

Download the current theme from the store (e.g. after editing in the Theme Editor). **Warning:** this overwrites local files in `gingr_theme/`.

```bash
shopify theme pull --path gingr_theme
```

To pull a specific theme by ID:

```bash
shopify theme pull --path gingr_theme --theme <THEME_ID>
```

---

## Theme check (lint)

Run theme-check on the Liquid theme (errors and best-practice warnings):

```bash
shopify theme check --path gingr_theme
```

Or use the **Shopify Liquid** VS Code extension; it runs theme-check in the background and shows issues in the Problems panel.

---

## Login / store selection

Log in (CLI will open the browser; pick or enter **gingr-2.myshopify.com** when prompted):

```bash
shopify auth login
```

To link this project to your store so all theme commands use it by default:

```bash
cd gingr_theme
shopify theme dev
```
When prompted, choose your store or enter `gingr-2.myshopify.com`. Then `theme push` / `theme pull` from the project root with `--path gingr_theme` will use that store.

List themes on the connected store:

```bash
shopify theme list --path gingr_theme
```

---

## Quick reference

| Goal | Command |
|------|--------|
| Install deps | `npm install` |
| Build assets once | `npm run build` |
| Watch assets | `npm run watch` |
| Preview with real store + live reload | `npm run dev` |
| Push theme (after build) | `npm run build` then `shopify theme push --path gingr_theme --store gingr-2.myshopify.com` |
| Push as unpublished theme | `shopify theme push --path gingr_theme --unpublished` |
| Pull theme from store | `shopify theme pull --path gingr_theme` |
| Lint theme | `shopify theme check --path gingr_theme` |
| List themes | `shopify theme list` |
| Login | `shopify auth login` (then pick **gingr-2.myshopify.com**) |

All commands are meant to be run from the **project root** (the folder that contains `package.json` and `gingr_theme/`).
