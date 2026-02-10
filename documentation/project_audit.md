# GINGR — Global Project Audit

**Date:** February 2025  
**Purpose:** Baseline before refactoring.  
**Scope:** Repo root, `gingr_theme/`, `src/`, `scripts/`, `documentation/`.

---

## 1. Project overview

- **Product:** White-label Shopify theme (template). The repo name and default demo content use “GINGR” as one possible branding; the theme is intended to be reused and personalized (colors, fonts, copy, logo) per client. Brand identity and source-of-truth for any specific brand will be defined in a separate doc, not in this codebase.
- **Stack:** Liquid (OS 2.0), Tailwind CSS, vanilla JS (esbuild), PostCSS. No React/Tauri in this repo.
- **Deliverable:** `gingr_theme/` is the theme folder; `src/` compiles into `gingr_theme/assets/` (main.css, main.js, critical.css).

---

## 2. Structure & alignment with docs

### 2.1 Directory layout

| Area | Status | Notes |
|------|--------|--------|
| `gingr_theme/` | OK | Standard Shopify theme (assets, config, layout, locales, sections, snippets, templates). |
| `src/css/`, `src/js/` | OK | Single entry points; build outputs to theme assets. |
| `scripts/build.mjs` | OK | CSS via Tailwind CLI, JS via esbuild; watch mode for both. |
| `documentation/` | OK | core_concept, architecture_mvp, commands_and_workflow, settings docs. |

### 2.2 Naming vs architecture

**architecture_mvp.md** uses different section names than the theme:

| Doc (architecture_mvp.md) | Theme (actual files) |
|---------------------------|----------------------|
| `hero-health.liquid` | `hero.liquid` |
| `header-health.liquid` | `header.liquid` |
| `footer-health.liquid` | `footer.liquid` |
| `featured-collection-health.liquid` | Present as `featured-collection-health.liquid` |

**Recommendation:** Either rename theme sections to match the doc (e.g. `header-health`) or update the doc to match the theme. Current mix is confusing.

### 2.3 Missing from architecture

- **Snippets:** Doc lists `a11y-focus-trap.liquid`; it does **not** exist. A11y is handled in JS (`accessibility.js`) only.
- **JS modules:** Doc mentions `qty-breaks.js` and `predictive-search.js`; neither exists. Implemented: cart-drawer, bundle-selector, bundle-drawer, subscription-ui, accessibility, product-carousel, header-scroll, info-tabs, mobile-menu.

---

## 3. Build & assets

### 3.1 Build pipeline

- **CSS:** `src/css/main.css` → Tailwind (content: `gingr_theme/**/*.liquid`, `gingr_theme/**/*.json`, `src/**/*.js`) → `gingr_theme/assets/main.css` (minified).
- **JS:** `src/js/main.js` → esbuild (IIFE, minified, es2020) → `gingr_theme/assets/main.js`.
- **Watch:** `npm run watch` runs Tailwind watch + esbuild watch; `npm run dev` runs watch + `shopify theme dev --path gingr_theme`.

**Issues:**

- No hashing/cache busting on `main.css` / `main.js` (theme.liquid references them by fixed name). Acceptable for theme dev; consider for production if you add versioning later.

**Resolved:** `critical.css` is now built from `src/css/critical.css` (copied in the same build step as Tailwind). No hand-maintained copy in assets; watch mode also watches `critical.css` and copies on change. It remains loaded on every page with `preload: true` for above-the-fold paint.

### 3.2 Tailwind

- **Config:** `tailwind.config.js` — Default palette under `theme.extend.colors.gingr`, `fontFamily.primary` from CSS variable, small `safelist` for dynamic classes.
- **White-label / brand:** Tailwind holds a default palette; `snippets/css-variables.liquid` uses theme settings (`color_primary`, `color_accent`, etc.) so merchants can rebrand without code changes. Source of truth for a given brand will be documented elsewhere (not in this repo).
- **css-variables.liquid:** Overrides certain utility classes with `var(--color-primary)` etc., so the theme editor drives the live look. Some UIs still use Tailwind tokens; for full white-label, consider driving all brand visuals from settings/CSS variables.

---

## 4. Theme implementation

### 4.1 Layout

- **theme.liquid:** Header group → main → footer group → cart drawer (if enabled) → single `main.js` (defer). Clean and minimal.
- **critical.css** (from `src/css/critical.css`) loaded first (preload), then **main.css**. Critical = reset + body + section layout; component CSS lives in `main.css`.

### 4.2 Sections (high level)

- **Count:** 29 section `.liquid` files + 2 section groups (header-group.json, footer-group.json).
- **MVP-critical (from doc):** main-product-health, product-benefits-ingredients, product-routine, product-reviews-slot, main-collection-health, hero, featured-collection-health, value-props, bundle-highlight, subscription-highlight, faq, header, footer, announcement-bar — all present.
- **Heavy sections:** `main-product-health.liquid` has many `render` calls (price, badge, subscription-slot, etc.); structure is clear but could be split into more snippets for reuse and testability.

### 4.3 Section detail (for build & refactor)

All sections live in `gingr_theme/sections/`. Section groups are JSON; the rest are Liquid with a `{% schema %}`.

| Section file | Schema name | Block types | Used in |
|--------------|-------------|-------------|---------|
| **Layout / global** | | | |
| `header-group.json` | (group) | — | layout: `{% sections 'header-group' %}` |
| `header.liquid` | Header | — | header-group |
| `announcement-bar.liquid` | Announcement bar | — | header-group |
| `footer-group.json` | (group) | — | layout: `{% sections 'footer-group' %}` |
| `footer.liquid` | Footer | — | footer-group |
| `pages-grid.liquid` | Pages grid | `page_card` | footer-group |
| **Home (index)** | | | |
| `hero.liquid` | Hero | `avatar` (Icon) | index.json |
| `value-props.liquid` | Value propositions | `prop` | index.json |
| `product-carousel.liquid` | Product carousel | `product_slide` | index.json |
| `how-it-works.liquid` | How it works | `step` | index.json |
| `info-tabs.liquid` | Info tabs | `tab` | index.json |
| `product-comparison.liquid` | Product comparison | `product_col` | index.json |
| `brand-story.liquid` | Brand story | `story`, `trust_point` | index.json |
| `ingredients-spotlight.liquid` | Ingredients spotlight | `ingredient` | index.json |
| `bundle-highlight.liquid` | Bundle highlight | `product` | index.json |
| `subscription-highlight.liquid` | Subscription | `frequency`, `trust` | index.json |
| `social-proof.liquid` | Social proof | `photo` | index.json |
| `faq.liquid` | FAQ | `faq` (Question) | index.json |
| **Product (PDP)** | | | |
| `main-product.liquid` | Product Main | — | product.json |
| `product-benefits.liquid` | Product Benefits | — | product.json |
| `product-routine.liquid` | Product Routine | `routine_moment` | product.json |
| `product-reviews-slot.liquid` | Product Reviews | — | product.json |
| **Collection & catalog** | | | |
| `main-collection.liquid` | Collection Main | — | collection.json |
| `featured-collection-health.liquid` | Featured collection | — | (optional; not in default index) |
| **App / custom** | | | |
| `custom-liquid.liquid` | Custom Liquid | — | (any template) |
| `collections.liquid` | Collections list | — | list-collections.json |
| **Other templates** | | | |
| `cart.liquid` | Cart | — | cart.json |
| `search.liquid` | Search | — | search.json |
| `page.liquid` | Page | — | page.json |
| `blog.liquid` | Blog | — | blog.json |
| `article.liquid` | Article | — | article.json |
| `404.liquid` | 404 | — | 404.json |
| `password.liquid` | Password | — | password.json |

**Notes:**

- **Header group order:** announcement-bar → header.
- **Footer group order:** pages-grid → footer.
- **Product template order:** main-product → product-benefits → product-routine → product-reviews-slot.
- **Index order (default):** hero, value-props, product-carousel, how-it-works, info-tabs, brand-story, ingredients-spotlight, bundle-highlight, subscription-highlight, social-proof, faq (product-comparison removed).
- Sections with **no blocks** are settings-only (e.g. header, footer, main-product-health, cart, search, page, blog, article, 404, password, main-collection-health, product-benefits-ingredients, product-reviews-slot, featured-collection-health).
- **JS-coupled sections:** product-carousel (ProductCarousel), info-tabs (InfoTabs), header (HeaderScroll, MobileMenu, PredictiveSearch), cart drawer (snippet + CartDrawer). main-product uses BundleSelector, SubscriptionUI.

### 4.4 Snippets

- **Present:** badge, bundle-price, button, cart-drawer, css-variables, icon, image, meta-tags, price, product-card, subscription-slot.
- **Doc but missing:** a11y-focus-trap (see 2.3).
- **AGENTS.md:** Requires `{% doc %}` on snippets; most snippets were not checked for `{% doc %}` — worth a pass if you enforce that rule.

### 4.5 Duplication & consistency

- **Cart icon + count:** Implemented twice in `header.liquid` (desktop nav + mobile). Same markup; good candidate for a small snippet (e.g. `cart-icon.liquid`) to avoid drift.
- **Color usage:** Some sections use `text-gray-*` / `bg-gray-*` (e.g. main-product-health, main-collection-health, product-benefits-ingredients). Theme is dark (navy background); gray can clash or look inconsistent. Recommend standardising on theme tokens or CSS variables for text/background.
- **Hardcoded copy:** Various sections use inline English (“Your cart”, “Choose your pack”, “Add to cart”). Doc and AGENTS.md expect translations via `locales` and `{{ 'key' | t }}`; many strings are not using that. Refactor should move copy to locale keys.

---

## 5. JavaScript

### 5.1 Entry and modules

- **main.js** imports and initialises: CartDrawer, BundleSelector, SubscriptionUI, Accessibility, ProductCarousel, HeaderScroll, InfoTabs, BundleDrawer, MobileMenu. All run on `DOMContentLoaded`. No code-splitting; one bundle for the theme.
- **Pattern:** Class-based modules with `.init()`; no shared “app” or event bus observed in the audit.

### 5.2 Gaps vs architecture

- **qty-breaks.js:** Not present (quantity break UI could live in bundle-selector or a dedicated module if needed).
- **predictive-search.js:** Not present. Search page exists; predictive search is optional for MVP.

---

## 6. Configuration & settings

### 6.1 settings_schema.json

- **Groups:** theme_info, typography, layout, colors, text, buttons, cart (drawer, free shipping, bundle tiers, upsell), social. Coherent for an MVP.
- **Cart:** Free shipping threshold (€), 3 bundle discount tiers (qty + %), upsell product + copy. Aligned with doc.
- **Currency:** Free shipping in “€” (range label); not multi-currency aware in copy.

### 6.2 settings_data.json

- Not fully audited; typically stores current theme customizer values. Ensure default theme preset matches `core_concept.md` (e.g. colors, fonts).

### 6.3 Locales

- **en.default.json / en.default.schema.json** present. Schema labels in config use `t:...` (e.g. `t:general.typography`). Many section/snippet strings still hardcoded; i18n incomplete.

---

## 7. Documentation

- **core_concept.md:** Brand, product line, packs, subscriptions, visual identity, UX goals. In French; rest of audit assumes English for refactor.
- **architecture_mvp.md:** Skeleton theme, sections list, snippets, JS/CSS, metafields, bundles, subscription, a11y, presets. Section/snippet naming and JS list need sync with code (see 2.2, 2.3).
- **commands_and_workflow.md:** Setup, build, watch, dev, push/pull, theme check, store. Accurate and useful.
- **AGENTS.md:** Theme architecture, Liquid, schema, CSS/JS tags, LiquidDoc, translations. Very detailed; actual code does not fully follow (e.g. `{% doc %}`, `{{ 'key' | t }}` everywhere).

---

## 8. Quality & tooling

- **theme-check:** `.theme-check.yml` extends `theme-check:recommended`; disables ParserBlockingScriptTag and OrphanedSnippet. No custom rules.
- **Linting:** No ESLint/Prettier config in repo for `src/js` or `scripts/`. Consider adding for refactor.
- **Tests:** No automated tests (Liquid or JS) observed.

---

## 9. Risks & quick wins

| Risk | Severity | Suggestion |
|------|----------|------------|
| Doc vs code naming (hero vs hero-health, etc.) | Low | Align architecture_mvp.md with real filenames or rename files. |
| Two color systems (Tailwind + CSS variables) | Medium | For white-label: document when to use which; drive brand from theme settings/CSS variables where possible. |
| ~~critical.css maintained by hand~~ | — | **Fixed:** built from `src/css/critical.css`. |
| No a11y Liquid snippet | Low | Keep a11y in JS only and remove from doc, or add minimal focus-trap snippet if needed. |
| Missing qty-breaks / predictive-search | Low | Add only if product roadmap needs them; else remove from architecture. |
| Hardcoded strings | Medium | Plan a pass: move UI strings to locales and use `t`. |
| Gray vs theme colors in sections | Low | Replace ad‑hoc gray with theme tokens/variables. |
| Cart icon duplicated in header | Low | Extract to snippet. |

---

## 10. Refactor checklist (for later)

- [ ] Align architecture_mvp.md with actual section/snippet/JS names and list.
- [ ] For white-label: decide one source of truth for brand colors (Tailwind defaults vs theme settings/CSS variables) and document in brand/settings doc.
- [ ] Add missing snippet: a11y-focus-trap (if desired) or update doc.
- [ ] Extract cart icon (and optional cart count) to a snippet; use in header twice.
- [ ] Replace hardcoded UI strings with locale keys and `{{ 'key' | t }}`.
- [ ] Standardise section/snippet text and background classes (theme tokens, no raw gray where it conflicts with dark theme).
- [ ] Optional: ESLint + Prettier for `src/js` and `scripts/`.
- [ ] Optional: theme-check run in CI; fix any new warnings after refactor.

---

*End of audit.*
