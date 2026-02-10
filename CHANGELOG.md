# Changelog

## [Unreleased]

### Added
- **Sections:** `local-producers`, `subscription-benefits`, `impact-metrics`, `routine-builder`, `product-complementary`, `custom-liquid`.
- **Snippets:** `bundle-progress` (tier progress bar), `predictive-search` (form + results).
- **JS:** `predictive-search.js` (fetch suggest.json, render results).
- **Cart drawer:** Bundle tier progress bar via `bundle-progress` snippet.
- **Footer:** Follow on Shop button (`login_button` with action follow).
- **Gift card:** Recipient form (email, name, message, send_on).
- **Product benefits:** Block-based (benefit, ingredient, certification) with metafield fallback.
- **Tailwind:** `brand.*` colors (primary, accent, background, heading, body, subheading) from CSS variables.
- **Docs:** `documentation/white-label-guide.md`.

### Changed
- **Renamed sections:** `main-product-health` → `main-product`, `main-collection-health` → `main-collection`, `product-benefits-ingredients` → `product-benefits`.
- **Removed:** `product-comparison` section.
- **Product template:** Added `product-complementary` section; order: main, benefits, routine, complementary, reviews.
- **Architecture:** `architecture_mvp.md` updated (section names, predictive-search, custom-liquid, no a11y-focus-trap).

### Fixed
- Critical CSS built from `src/css/critical.css` (no hand-maintained duplicate).
