# Theme "Mass Health Drinks" — Architecture MVP (Skeleton Theme base)

Base: https://github.com/shopify/skeleton-theme
Objectif MVP: vendre + augmenter AOV via packs + convertir en abonnement + faciliter le réachat (repeat buyers)

---

## 0) Principes produit (MVP)
- Mobile-first (PDP et cart drawer au centre)
- Bundle-first UX (packs 6/12/24 + économies claires)
- Subscription-first UX (toggle "Subscribe & save" + fréquences)
- App-friendly slots (reviews, subscriptions, loyalty) sans casser le design
- Data-driven via metafields (bénéfices, ingrédients, routine) -> pas 200 settings

---

## 1) Arborescence recommandée (Skeleton + build assets)
my-health-theme/
  theme/                       # dossier livré à Shopify
    assets/
      main.css                 # CSS compilé
      main.js                  # JS bundle (cart drawer, bundle UI, etc.)
      critical.css             # optionnel (petit CSS above-the-fold)
    config/
      settings_schema.json
      settings_data.json       # presets (styles)
    layout/
      theme.liquid
      password.liquid
    locales/
      en.default.json
      fr.json
    sections/
      # MVP sections listées plus bas
    snippets/
      # composants Liquid réutilisables
    templates/
      index.json
      product.json
      collection.json
      cart.json
      page.json
      blog.json
      article.json
      search.json
      404.json

  src/                         # source dev (non livré)
    css/main.css               # entrée Tailwind / PostCSS
    js/main.js                 # entrée JS
    js/modules/
      cart-drawer.js
      bundle-selector.js
      subscription-ui.js
      qty-breaks.js
      predictive-search.js
      accessibility.js
    icons/
  scripts/
    build.mjs                  # esbuild + postcss/tailwind
  package.json
  tailwind.config.js
  postcss.config.js
  .theme-check.yml

---

## 2) Templates OS 2.0 (MVP)
### Obligatoires
- templates/product.json
- templates/collection.json
- templates/index.json
- templates/cart.json
- templates/search.json
- templates/page.json
- templates/404.json

### Notes
- Product + Collection = priorité absolue (conversion)
- Cart template minimal (si cart drawer actif, cart page reste simple)

---

## 3) Sections MVP (le strict nécessaire pour vendre)
### Product (PDP) — MUST HAVE
1) sections/main-product-health.liquid
   - Galerie média (images/video)
   - Titre + prix + badges (ex: "Sugar-free", "Vegan")
   - Bundle selector (packs 1/6/12) + économies
   - Subscription UI slot (toggle + fréquence)
   - CTA sticky mobile (Add to cart)
   - Delivery / returns / FAQ micro
   - Trust row (paiement, livraison)

2) sections/product-benefits-ingredients.liquid
   - Bénéfices (metafields)
   - Ingrédients + nutrition (metafields)
   - Allergènes (metafields)

3) sections/product-routine.liquid
   - "How to use" (metafields)
   - Routine (matin/soir, avant sport, etc.)

4) sections/product-reviews-slot.liquid
   - Un conteneur stylé pour app reviews (block app) + fallback simple

### Collection — MUST HAVE
5) sections/main-collection-health.liquid
   - Filtre/tri natif Shopify
   - Cards produits: badges + prix pack visible
   - Quick add (optionnel MVP) OU lien PDP (si variantes complexes)

### Home — MVP
6) sections/hero-health.liquid
7) sections/featured-collection-health.liquid
8) sections/value-props.liquid (USP: livraison, clean ingredients, etc.)
9) sections/bundle-highlight.liquid (mise en avant packs + économie)
10) sections/subscription-highlight.liquid (abonnement expliqué)
11) sections/faq.liquid

### Global
12) sections/header-health.liquid
13) sections/footer-health.liquid
14) sections/announcement-bar.liquid

---

## 4) Snippets (MVP)
- snippets/price.liquid
- snippets/badge.liquid
- snippets/icon.liquid
- snippets/button.liquid
- snippets/product-card.liquid
- snippets/bundle-price.liquid
- snippets/subscription-slot.liquid
- snippets/cart-drawer.liquid
- snippets/a11y-focus-trap.liquid

---

## 5) Assets & JS (MVP)
### main.js modules
- cart-drawer.js
  - add-to-cart AJAX
  - update qty/remove
  - shipping threshold progress (optionnel MVP)
- bundle-selector.js
  - UI pack selection + affichage économies
  - mapping sur variants (pack variants) ou "bundle product"
- subscription-ui.js
  - UI toggle + fréquence
  - "slot" pour app (Recharge/Skio/etc.) sans dépendre d’une API
- accessibility.js
  - focus states, aria expanded, trap drawer, escape close

### CSS
- main.css (Tailwind compilé OU utilities maison)
- critical.css (optionnel) pour header/hero/PDP fold

---

## 6) Données Shopify (MVP)
### Metafields produits (namespace recommandé: health)
- health.benefits (list / rich text)
- health.ingredients (rich text)
- health.nutrition_table (rich text or file)
- health.how_to_use (rich text)
- health.dietary_badges (list)
- health.caffeine_mg (number)
- health.sugar_g (number)
- health.flavor_notes (text)

### Metafields collection (namespace health)
- health.collection_hero (image)
- health.collection_intro (rich text)

---

## 7) Bundles & remises (MVP réaliste)
### Approche recommandée MVP (100% thème + Shopify natif)
- Packs = VARIANTS (ex: 1 / 6 / 12)
- Chaque variant a son prix (remise intégrée)
- Le thème affiche:
  - prix unitaire
  - "You save X%" (comparé au pack 1)

Avantage: simple, robuste, pas besoin d’app ni de scripts checkout.
Limite: pas un "mix & match" multi-produits (ce sera v2).

---

## 8) Abonnement (MVP)
- Le thème fournit une UI propre:
  - toggle subscribe/one-time
  - fréquences
  - microcopy (pause/cancel)
- L’activation réelle est fournie par une app subscription (Shopify n’offre pas nativement un subscription engine complet dans le thème).
- Le thème est "app-friendly":
  - zones dédiées (slots)
  - styles cohérents
  - pas de layout cassé

---

## 9) Accessibility & perf (MVP checklist)
- No console errors
- Navigation clavier: header menu + cart drawer + modals
- Focus visible partout
- Images responsive + lazy loading
- JS minimal, modules chargés au besoin

---

## 10) Presets MVP
- 3 presets:
  1) "Citrus Clean" (clair)
  2) "Gym Energy" (impact)
  3) "Daily Wellness" (soft)
- Les presets changent surtout:
  - palette
  - radius
  - typo
  - density (spacing)
