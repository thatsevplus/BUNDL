# White-Label Theme Guide

This theme is built to be rebranded per merchant. No hardcoded brand; customize via theme settings and content.

## Color system

- **Theme settings** (Theme editor → Theme settings → Colors): `color_primary`, `color_accent`, `background_color`, `text_heading_color`, `text_body_color`, `text_subheading_color`, `button_color`, `button_text_color`.
- **CSS variables** (set in `snippets/css-variables.liquid`):  
  `--color-primary`, `--color-accent`, `--color-background`, `--text-heading`, `--text-body`, `--text-subheading`, `--button-color`, `--button-text`, `--bg-body`.
- **Tailwind**: Use `brand-primary`, `brand-accent`, `brand-background`, `brand-heading`, `brand-body`, `brand-subheading` in classes so colors follow theme settings. The `gingr.*` palette in `tailwind.config.js` is the default demo (GINGR); override with CSS variables where needed.

## Sections (white-label)

| Section | Purpose |
|--------|---------|
| `main-product` | PDP: gallery, bundle selector, subscription slot, CTA |
| `main-collection` | Collection grid, sort, product cards |
| `product-benefits` | Block-based benefits + ingredients; metafield fallback |
| `product-complementary` | Recommendations or manual product list |
| `product-routine` | When to take (routine moments) |
| `product-reviews-slot` | App block for reviews |
| `hero` | Homepage hero |
| `value-props` | USP grid |
| `product-carousel` | Featured products carousel |
| `bundle-highlight` | Pack savings |
| `subscription-highlight` | Subscribe & save |
| `subscription-benefits` | Why subscribe (benefit blocks) |
| `how-it-works` | Process steps |
| `local-producers` | Sourcing (producer blocks) |
| `impact-metrics` | Stats (metric blocks) |
| `routine-builder` | Time slots + product list |
| `brand-story` | About / story blocks |
| `ingredients-spotlight` | Ingredient focus |
| `info-tabs` | Tabbed content |
| `faq` | Accordion FAQ |
| `custom-liquid` | Custom Liquid / app embed |
| `header` / `footer` | Global nav, Follow on Shop, payment icons |

## Snippets

- `bundle-progress`: Tier progress bar (used in cart drawer). Pass `current_quantity`, `next_tier_qty`, `next_tier_percent`, `current_savings`.
- `predictive-search`: Search form + results container; JS fetches `/search/suggest.json`.
- `product-card`, `price`, `badge`, `subscription-slot`, `cart-drawer`, etc.

## Locales

- All UI strings should use `{{ 'key' | t }}`. Keys live in `locales/en.default.json` (e.g. `product.add_to_cart`, `cart.title`, `general.free_shipping`).

## GINGR demo

The default content (index, product template, presets) uses GINGR as the demo brand. Replace copy, logo, colors, and products to rebrand.
