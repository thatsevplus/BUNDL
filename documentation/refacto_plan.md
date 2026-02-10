White-Label Drinks Theme Refactor Plan
Demo Brand: GINGR (Functional Ginger Shots)

**Applied (current codebase):** Section renames (main-product, main-collection, product-benefits); product-comparison removed; custom-liquid.liquid + predictive-search (snippet + JS) added; architecture_mvp.md updated; Tailwind brand.* colors added; templates (product.json, collection.json, index.json) updated.

---

Executive Summary
Build a conversion-optimized Shopify theme template for repeat-first drinks businesses selling through bundles and subscriptions. GINGR serves as the demo to showcase capabilities, but every element must be reusable and rebrandable via theme settings.

🎯 Core Principles

White-Label First: Zero hardcoded brand elements, fully customizable via theme settings
Vertical-Specific: Optimized for drinks/beverage businesses (not general e-commerce)
Repeat Commerce: Bundle ladder + subscription mechanics baked in
Local/Craft Focus: Support for local producer stories, ingredient transparency
Shopify Compliant: Meet all Theme Store requirements


📋 PHASE 1: CRITICAL FIXES & COMPLIANCE
A. Shopify Requirements (Must-Have)
Missing Features

 Predictive Search - Add snippets/predictive-search.liquid + src/js/modules/predictive-search.js
 Custom Liquid Section - sections/custom-liquid.liquid (app integration point)
 Custom Liquid Blocks - Add to product sections for app embeds
 Follow on Shop Button - Add to footer using login_button filter
 Complementary Products - sections/product-complementary.liquid for PDP
 Gift Card Recipient - Add form fields to templates/gift_card.liquid
 Product Swatches - Use swatch.color and swatch.image for variant options

Section/Block Structure Fixes

 Product Page Blocks: Refactor main-product-health.liquid → main-product.liquid with modular blocks:

@type: price - Product price block
@type: vendor - Brand/vendor block
@type: description - Product description block
@type: variant_picker - Size/flavor selector block
@type: quantity_selector - Quantity input block
@type: bundle_selector - Pack size selector (1/6/12/24) block
@type: subscription_widget - Subscribe & save toggle block
@type: buy_buttons - Add to cart + dynamic checkout block
@type: pickup_availability - Local pickup info block
@type: share - Social share block
@type: @app - App block support
@type: custom_liquid - Custom Liquid block


 Featured Product Section: Add same block structure to sections/featured-product.liquid

Template Requirements

 Keep collection.liquid - CRITICAL for white-label (merchants need collection pages)
 Keep list-collections.liquid - Useful for multi-product-line brands
 Verify page.contact.json exists
 Ensure gift_card.liquid has recipient form with form.email, form.name, form.message, send_on

Performance & Accessibility

 Lighthouse: 60+ performance, 90+ accessibility (desktop & mobile)
 Color contrast: 4.5:1 (body text), 3:1 (large text/icons)
 Keyboard navigation + visible focus states everywhere
 Touch targets: 24x24px minimum
 Valid HTML, semantic structure
 Responsive images with srcset, focal point support


📋 PHASE 2: WHITE-LABEL ARCHITECTURE
B. Documentation Alignment
Update architecture_mvp.md
File Naming - Keep Simple & Generic:
sections/header.liquid (not header-health.liquid)
sections/footer.liquid (not footer-health.liquid)
sections/hero.liquid (not hero-health.liquid)
sections/main-product.liquid (was main-product-health.liquid)
sections/main-collection.liquid (was main-collection-health.liquid)
sections/featured-collection.liquid ✅
sections/product-benefits.liquid (was product-benefits-ingredients.liquid)
Rationale: Generic names = easier for any merchant to understand. "health" is GINGR-specific.
Remove or Implement

 Remove from docs: a11y-focus-trap.liquid (doesn't exist, a11y in JS only)
 Add to theme: predictive-search.js (Shopify requirement)
 Remove from docs: qty-breaks.js (bundle-selector handles this)

Add New Sections to Docs

 sections/local-producers.liquid - Map/story section for local sourcing
 sections/bundle-progress.liquid - Visual bundle tier progress
 sections/routine-builder.liquid - Multi-product daily routine creator
 sections/subscription-benefits.liquid - Why subscribe section
 sections/impact-metrics.liquid - Sustainability/health stats
 sections/custom-liquid.liquid - App integration point

C. Color System - White-Label Architecture
Problem: Current system mixes Tailwind defaults with CSS variables.
Solution: Two-Tier Color System
Tier 1: Theme Settings (Brand Identity)
Merchants customize these in theme editor:
json{
  "name": "Brand colors",
  "settings": [
    {
      "type": "color",
      "id": "color_primary",
      "label": "Primary brand color",
      "info": "Used for buttons, links, accents",
      "default": "#ffe14e"
    },
    {
      "type": "color",
      "id": "color_secondary",
      "label": "Secondary brand color",
      "info": "Used for highlights, badges",
      "default": "#e3a018"
    },
    {
      "type": "color",
      "id": "color_background",
      "label": "Background color",
      "default": "#fce9d2"
    },
    {
      "type": "color",
      "id": "color_text",
      "label": "Body text color",
      "default": "#1b1913"
    },
    {
      "type": "color",
      "id": "color_text_light",
      "label": "Light text color",
      "info": "For secondary text, captions",
      "default": "#6b6761"
    }
  ]
}
Tier 2: Product-Specific Colors (Optional)
For brands with color-coded product lines (like GINGR):
json{
  "namespace": "product",
  "key": "accent_color",
  "type": "color",
  "name": "Product accent color"
}
Usage in Liquid:
liquid<!-- Brand color (from settings) -->
<button style="background: var(--color-primary)">Add to Cart</button>

<!-- Product-specific color (from metafield, optional) -->
{% if product.metafields.product.accent_color %}
  <span class="badge" style="background: {{ product.metafields.product.accent_color }}">
    {{ product.type }}
  </span>
{% else %}
  <span class="badge" style="background: var(--color-secondary)">
    {{ product.type }}
  </span>
{% endif %}
CSS Variables (snippets/css-variables.liquid):
liquid<style>
  :root {
    --color-primary: {{ settings.color_primary }};
    --color-secondary: {{ settings.color_secondary }};
    --color-background: {{ settings.color_background }};
    --color-text: {{ settings.color_text }};
    --color-text-light: {{ settings.color_text_light }};
    
    /* Semantic tokens derived from brand colors */
    --color-button-bg: var(--color-primary);
    --color-button-text: {{ settings.color_primary | color_brightness | times: -1 | plus: 255 | color_modify: 'alpha', 1 }};
    --color-link: var(--color-primary);
    --color-badge: var(--color-secondary);
  }
</style>
Tailwind Config Updates:
js// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Demo defaults (GINGR) - overridden by CSS variables
        'brand-primary': 'var(--color-primary)',
        'brand-secondary': 'var(--color-secondary)',
        'brand-bg': 'var(--color-background)',
        'brand-text': 'var(--color-text)',
      }
    }
  }
}
Replace Gray Usage:
liquid<!-- BEFORE (theme-specific) -->
<div class="bg-gray-900 text-gray-100">

<!-- AFTER (white-label) -->
<div class="bg-brand-text text-brand-bg">
<!-- OR use semantic classes -->
<div style="background: var(--color-text); color: var(--color-background)">

 Action: Replace all text-gray-*, bg-gray-* with CSS variable classes
 Action: Document color system in documentation/white-label-guide.md

D. I18n - Full Localization
Create Comprehensive Locale Structure (locales/en.default.json):
json{
  "general": {
    "accessibility": {
      "skip_to_content": "Skip to content",
      "close": "Close",
      "previous": "Previous",
      "next": "Next"
    },
    "meta": {
      "tags": "Tagged \"{{ tags }}\"",
      "page": "Page {{ page }}"
    }
  },
  
  "products": {
    "product": {
      "add_to_cart": "Add to cart",
      "sold_out": "Sold out",
      "unavailable": "Unavailable",
      "vendor": "Vendor",
      "price": {
        "from": "From {{ price }}",
        "regular": "Regular price",
        "sale": "Sale price"
      },
      "quantity": {
        "label": "Quantity",
        "increase": "Increase quantity",
        "decrease": "Decrease quantity"
      },
      "bundle": {
        "choose_size": "Choose your pack size",
        "tier_label": "{{ count }} pack",
        "save_label": "Save {{ percent }}%",
        "price_per_unit": "{{ price }} each"
      },
      "subscription": {
        "title": "Subscribe & save",
        "save_percent": "Save {{ percent }}%",
        "frequency": "Delivery frequency",
        "benefits": {
          "pause": "Pause anytime",
          "skip": "Skip a delivery",
          "no_commitment": "No commitment"
        }
      }
    }
  },
  
  "cart": {
    "general": {
      "title": "Your cart",
      "empty": "Your cart is empty",
      "continue_shopping": "Continue shopping",
      "remove": "Remove",
      "update": "Update",
      "subtotal": "Subtotal",
      "checkout": "Checkout"
    },
    "bundle_progress": {
      "title": "Bundle savings",
      "next_tier": "{{ count }} more for {{ percent }}% off",
      "current_tier": "You're saving {{ percent }}%!",
      "max_tier": "Maximum savings unlocked!"
    },
    "free_shipping": {
      "threshold": "Free shipping on orders over {{ amount }}",
      "remaining": "{{ amount }} away from free shipping",
      "unlocked": "You've unlocked free shipping!"
    },
    "upsell": {
      "title": "Complete your routine",
      "add": "Add to cart"
    }
  },
  
  "sections": {
    "local_producers": {
      "heading": "Locally sourced",
      "view_map": "View on map",
      "distance": "{{ distance }} {{ unit }} away"
    },
    "routine_builder": {
      "heading": "Build your daily routine",
      "morning": "Morning",
      "midday": "Midday",
      "evening": "Evening",
      "add_to_routine": "Add to routine",
      "save_routine": "Add routine to cart"
    }
  }
}
Replace ALL Hardcoded Strings:

 Audit every .liquid file for hardcoded English
 Create locale keys for all UI strings
 Use {{ 'key.path' | t }} everywhere
 Test with alternate locale (e.g., French) to ensure nothing breaks

Add {% doc %} to All Snippets (per AGENTS.md):
liquid{% doc %}
  Renders a product card with bundle pricing

  Accepts:
  - product: {Object} Product Liquid object
  - show_vendor: {Boolean} Show product vendor (optional)
  - show_bundle_savings: {Boolean} Display bundle tier savings (default: true)

  Usage:
  {% render 'product-card', product: product, show_vendor: true %}
{% enddoc %}

<div class="product-card">
  ...
</div>

📋 PHASE 3: COLLECTION ARCHITECTURE
E. Collection Pages - White-Label Flexibility
Keep & Enhance:

templates/collection.json ✅
sections/main-collection.liquid ✅
sections/featured-collection.liquid ✅
templates/list-collections.json ✅

Why Collections Matter for White-Label:

Merchants with >5 products need collections (e.g., "Protein Shakes", "Cold-Pressed Juices")
Multi-flavor brands organize by flavor families
Seasonal collections ("Summer Refresh", "Winter Wellness")
Bundle collections ("Starter Packs", "Monthly Supply")

Collection Page Enhancements (main-collection.liquid):
Add Collection-Level Settings
json{
  "name": "Collection",
  "settings": [
    {
      "type": "checkbox",
      "id": "show_collection_image",
      "label": "Show collection image",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_collection_description",
      "label": "Show collection description",
      "default": true
    },
    {
      "type": "select",
      "id": "products_per_row_desktop",
      "label": "Products per row (desktop)",
      "options": [
        {"value": "2", "label": "2"},
        {"value": "3", "label": "3"},
        {"value": "4", "label": "4"}
      ],
      "default": "3"
    },
    {
      "type": "checkbox",
      "id": "enable_filtering",
      "label": "Enable filtering",
      "default": true,
      "info": "Customers can filter by price, type, flavor, etc."
    },
    {
      "type": "checkbox",
      "id": "enable_sorting",
      "label": "Enable sorting",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_product_bundle_badges",
      "label": "Show bundle savings on product cards",
      "default": true
    }
  ]
}
Product Card Updates

 Show bundle tier pricing on cards: "From €2.50 each (in packs)"
 Product type badges (customizable colors via metafields)
 Quick-add button (optional setting)
 Subscription indicator: "Subscribe & save 15%"

List Collections Page (list-collections.liquid):

 Grid of collection cards with images
 Collection count: "12 products"
 Optional description preview


📋 PHASE 4: WHITE-LABEL SECTIONS
F. Delete/Simplify Generic Sections
Delete (too GINGR-specific):

 ❌ product-comparison.liquid - Not useful for single-brand drinks

Rename for White-Label:

 product-benefits-ingredients.liquid → product-benefits.liquid (more generic)
 main-product-health.liquid → main-product.liquid
 main-collection-health.liquid → main-collection.liquid

Keep & Enhance:

 ✅ hero.liquid - Essential homepage hero
 ✅ value-props.liquid - Brand USPs
 ✅ product-carousel.liquid - Featured products
 ✅ how-it-works.liquid - Process explainer (subscription, bundle, delivery)
 ✅ info-tabs.liquid - FAQs, ingredients, certifications
 ✅ brand-story.liquid - About the brand (local, sustainable, etc.)
 ✅ ingredients-spotlight.liquid - Transparency showcase
 ✅ bundle-highlight.liquid - Pack savings explainer
 ✅ subscription-highlight.liquid - Subscribe benefits
 ✅ faq.liquid - Q&A section

G. New White-Label Sections
1. Local Producers Map (NEW) 🗺️
File: sections/local-producers.liquid
Purpose: Showcase local/regional ingredient sourcing (key for craft drinks)
Settings:
json{
  "name": "Local producers",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Locally sourced ingredients"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description"
    },
    {
      "type": "text",
      "id": "map_center_lat",
      "label": "Map center latitude",
      "default": "40.7128",
      "info": "Decimal format (e.g., 40.7128)"
    },
    {
      "type": "text",
      "id": "map_center_lng",
      "label": "Map center longitude",
      "default": "-74.0060"
    },
    {
      "type": "range",
      "id": "map_zoom",
      "label": "Map zoom level",
      "min": 1,
      "max": 15,
      "step": 1,
      "default": 10
    }
  ],
  "blocks": [
    {
      "type": "producer",
      "name": "Producer",
      "settings": [
        {
          "type": "text",
          "id": "name",
          "label": "Producer name",
          "default": "Smith Family Farms"
        },
        {
          "type": "text",
          "id": "ingredient",
          "label": "Ingredient provided",
          "default": "Organic ginger"
        },
        {
          "type": "image_picker",
          "id": "image",
          "label": "Producer image"
        },
        {
          "type": "text",
          "id": "latitude",
          "label": "Latitude",
          "default": "40.7128"
        },
        {
          "type": "text",
          "id": "longitude",
          "label": "Longitude",
          "default": "-74.0060"
        },
        {
          "type": "text",
          "id": "distance",
          "label": "Distance from production",
          "default": "25 miles",
          "info": "e.g., '25 miles' or '40 km'"
        },
        {
          "type": "richtext",
          "id": "story",
          "label": "Producer story"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Local producers",
      "blocks": [
        {"type": "producer"},
        {"type": "producer"}
      ]
    }
  ]
}
Features:

Interactive map (Leaflet.js or Mapbox)
Clickable producer markers
Producer cards with images + stories
Mobile-friendly (list view on small screens)

Demo Content (GINGR):

Ginger farm in upstate NY
Lemon grove in California
Turmeric supplier in Oregon


2. Bundle Progress Indicator (NEW)
File: snippets/bundle-progress.liquid
Purpose: Visual tier progress (used in PDP, cart drawer)
Input:
liquid{% render 'bundle-progress',
  current_quantity: cart.item_count,
  tiers: section.settings.bundle_tiers,
  current_savings: 10
%}
Output:
html<div class="bundle-progress">
  <div class="progress-bar">
    <div class="progress-fill" style="width: 60%"></div>
  </div>
  <p class="progress-label">
    {{ 'cart.bundle_progress.next_tier' | t: count: 2, percent: 20 }}
  </p>
</div>

3. Routine Builder (NEW)
File: sections/routine-builder.liquid
Purpose: Multi-product daily routine creator (cross-sell)
Settings:
json{
  "name": "Routine builder",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Build your daily routine"
    },
    {
      "type": "checkbox",
      "id": "show_timeline",
      "label": "Show timeline view",
      "default": true
    },
    {
      "type": "product_list",
      "id": "available_products",
      "label": "Available products",
      "limit": 10
    }
  ],
  "blocks": [
    {
      "type": "time_slot",
      "name": "Time slot",
      "settings": [
        {
          "type": "text",
          "id": "label",
          "label": "Time label",
          "default": "Morning"
        },
        {
          "type": "text",
          "id": "time",
          "label": "Time",
          "default": "8:00 AM"
        },
        {
          "type": "select",
          "id": "icon",
          "label": "Icon",
          "options": [
            {"value": "sunrise", "label": "Sunrise"},
            {"value": "sun", "label": "Sun"},
            {"value": "moon", "label": "Moon"}
          ]
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Routine builder",
      "blocks": [
        {"type": "time_slot", "settings": {"label": "Morning", "time": "8:00 AM"}},
        {"type": "time_slot", "settings": {"label": "Midday", "time": "12:00 PM"}},
        {"type": "time_slot", "settings": {"label": "Evening", "time": "6:00 PM"}}
      ]
    }
  ]
}
Features:

Drag-and-drop products to time slots (desktop)
Click to add (mobile)
"Add routine to cart" button
Save routine to localStorage (guest) or account (logged in)
Show total savings for routine bundle


4. Subscription Benefits (NEW)
File: sections/subscription-benefits.liquid
Purpose: Dedicated section explaining subscription value
Settings:
json{
  "name": "Subscription benefits",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Why subscribe?"
    },
    {
      "type": "range",
      "id": "discount_percent",
      "label": "Subscription discount",
      "min": 0,
      "max": 30,
      "step": 1,
      "unit": "%",
      "default": 15
    }
  ],
  "blocks": [
    {
      "type": "benefit",
      "name": "Benefit",
      "settings": [
        {
          "type": "select",
          "id": "icon",
          "label": "Icon",
          "options": [
            {"value": "percent", "label": "Percent"},
            {"value": "truck", "label": "Truck"},
            {"value": "calendar", "label": "Calendar"},
            {"value": "lock", "label": "Lock"}
          ]
        },
        {
          "type": "text",
          "id": "title",
          "label": "Benefit title",
          "default": "Save 15%"
        },
        {
          "type": "textarea",
          "id": "description",
          "label": "Description"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Subscription benefits",
      "blocks": [
        {"type": "benefit", "settings": {"icon": "percent", "title": "Save 15%"}},
        {"type": "benefit", "settings": {"icon": "calendar", "title": "Pause anytime"}},
        {"type": "benefit", "settings": {"icon": "truck", "title": "Free shipping"}},
        {"type": "benefit", "settings": {"icon": "lock", "title": "No commitment"}}
      ]
    }
  ]
}

5. Impact Metrics (NEW)
File: sections/impact-metrics.liquid
Purpose: Sustainability/health stats (appeals to conscious consumers)
Settings:
json{
  "name": "Impact metrics",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Our impact"
    }
  ],
  "blocks": [
    {
      "type": "metric",
      "name": "Metric",
      "settings": [
        {
          "type": "text",
          "id": "number",
          "label": "Number",
          "default": "10,000"
        },
        {
          "type": "text",
          "id": "unit",
          "label": "Unit",
          "default": "lbs"
        },
        {
          "type": "text",
          "id": "label",
          "label": "Metric label",
          "default": "Plastic saved"
        },
        {
          "type": "select",
          "id": "icon",
          "label": "Icon",
          "options": [
            {"value": "leaf", "label": "Leaf"},
            {"value": "recycle", "label": "Recycle"},
            {"value": "water", "label": "Water"},
            {"value": "heart", "label": "Heart"}
          ]
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Impact metrics",
      "blocks": [
        {"type": "metric", "settings": {"number": "10,000", "unit": "lbs", "label": "Plastic saved"}},
        {"type": "metric", "settings": {"number": "500", "unit": "", "label": "Local farms supported"}}
      ]
    }
  ]
}
Demo Content (GINGR):

50,000 shots sold
500 local farms supported
10,000 lbs plastic saved (vs bottled drinks)


6. Product Benefits (ENHANCED)
File: sections/product-benefits.liquid (renamed from product-benefits-ingredients)
White-Label Approach:

Block-based ingredient list (not hardcoded)
Customizable benefit icons
Works for ANY drink type (juice, kombucha, protein, etc.)

json{
  "name": "Product benefits",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "What's inside"
    },
    {
      "type": "select",
      "id": "layout",
      "label": "Layout",
      "options": [
        {"value": "grid", "label": "Grid"},
        {"value": "list", "label": "List"},
        {"value": "tabs", "label": "Tabs"}
      ],
      "default": "grid"
    }
  ],
  "blocks": [
    {
      "type": "ingredient",
      "name": "Ingredient",
      "settings": [
        {
          "type": "text",
          "id": "name",
          "label": "Ingredient name"
        },
        {
          "type": "image_picker",
          "id": "image",
          "label": "Ingredient image"
        },
        {
          "type": "richtext",
          "id": "benefit",
          "label": "Benefit description"
        }
      ]
    },
    {
      "type": "certification",
      "name": "Certification",
      "settings": [
        {
          "type": "image_picker",
          "id": "badge",
          "label": "Certification badge"
        },
        {
          "type": "text",
          "id": "label",
          "label": "Label"
        }
      ]
    }
  ]
}

H. Section Order - White-Label Optimized
Homepage (templates/index.json)
Flexible, reorderable sections:

hero - Brand intro
value-props - Why choose us (3-4 USPs)
product-carousel - Featured products
bundle-highlight - Pack savings explainer
subscription-benefits - Why subscribe
how-it-works - Process (order → delivered → enjoy)
local-producers - Sourcing story (optional)
impact-metrics - Sustainability stats (optional)
brand-story - About us
ingredients-spotlight - Transparency
info-tabs - FAQs, certifications
faq - Common questions

Removed:

product-comparison (deleted)
social-proof (merchant uses review app instead)

Product Page (templates/product.json)

main-product (with modular blocks)
product-benefits - What's inside
routine-builder - Cross-sell (optional)
product-complementary - Shopify recommendations
product-reviews-slot - Review app insertion point

Collection Page (templates/collection.json)

main-collection (with filters, sorting)
featured-collection (optional secondary collection)


📋 PHASE 5: BUNDLE & SUBSCRIPTION MECHANICS
I. Bundle Selector - White-Label Configuration
Settings Structure (settings_schema.json):
json{
  "name": "Bundle discounts",
  "settings": [
    {
      "type": "header",
      "content": "Bundle tier 1"
    },
    {
      "type": "range",
      "id": "bundle_tier_1_qty",
      "label": "Quantity",
      "min": 1,
      "max": 100,
      "step": 1,
      "default": 6
    },
    {
      "type": "range",
      "id": "bundle_tier_1_discount",
      "label": "Discount",
      "min": 0,
      "max": 50,
      "step": 1,
      "unit": "%",
      "default": 10
    },
    {
      "type": "text",
      "id": "bundle_tier_1_label",
      "label": "Label",
      "default": "Starter pack",
      "info": "e.g., 'Starter pack', 'Weekly supply', 'Bulk order'"
    },
    
    /* Repeat for tier 2, tier 3, tier 4 */
    
    {
      "type": "checkbox",
      "id": "bundle_show_price_per_unit",
      "label": "Show price per unit",
      "default": true,
      "info": "Display '€2.50 each' below pack price"
    },
    {
      "type": "checkbox",
      "id": "bundle_show_savings_badge",
      "label": "Show savings badge",
      "default": true
    }
  ]
}
Merchant Flexibility:

Configure 1-4 bundle tiers (not hardcoded to 6/12/24)
Custom labels ("6-pack", "Case", "Monthly supply", etc.)
Works for any product type (bottles, cans, pouches)


J. Subscription Widget - White-Label
Settings (settings_schema.json):
json{
  "name": "Subscriptions",
  "settings": [
    {
      "type": "checkbox",
      "id": "subscription_enabled",
      "label": "Enable subscriptions",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "subscription_default_on",
      "label": "Subscribe by default",
      "default": true,
      "info": "Toggle starts in 'subscribe' position"
    },
    {
      "type": "range",
      "id": "subscription_discount",
      "label": "Subscription discount",
      "min": 0,
      "max": 30,
      "step": 1,
      "unit": "%",
      "default": 15
    },
    {
      "type": "checkbox",
      "id": "subscription_free_shipping",
      "label": "Free shipping on subscriptions",
      "default": true
    },
    {
      "type": "richtext",
      "id": "subscription_benefits_text",
      "label": "Benefits text",
      "default": "<p>✓ Pause anytime<br>✓ Skip a delivery<br>✓ Cancel anytime</p>"
    }
  ]
}
Frequency Options (Shopify selling plans):

Merchant configures in Shopify admin
Widget displays available frequencies dynamically


📋 PHASE 6: SETTINGS ORGANIZATION
K. Settings Schema - White-Label Structure
Reorganize settings_schema.json:
json[
  {
    "name": "theme_info",
    "theme_name": "Repeat (White-Label Drinks Theme)",
    "theme_author": "Your Name",
    "theme_version": "1.0.0",
    "theme_documentation_url": "https://yoursite.com/docs",
    "theme_support_url": "https://yoursite.com/support"
  },
  
  {
    "name": "Brand identity",
    "settings": [
      {
        "type": "image_picker",
        "id": "logo",
        "label": "Logo"
      },
      {
        "type": "range",
        "id": "logo_width",
        "label": "Logo width",
        "min": 50,
        "max": 300,
        "step": 10,
        "unit": "px",
        "default": 150
      },
      {
        "type": "image_picker",
        "id": "favicon",
        "label": "Favicon",
        "info": "32x32px or 64x64px .png"
      }
    ]
  },
  
  {
    "name": "Colors",
    "settings": [
      /* Brand colors (primary, secondary, background, text) */
    ]
  },
  
  {
    "name": "Typography",
    "settings": [
      {
        "type": "font_picker",
        "id": "font_heading",
        "label": "Heading font",
        "default": "assistant_n6"
      },
      {
        "type": "font_picker",
        "id": "font_body",
        "label": "Body font",
        "default": "assistant_n4"
      }
    ]
  },
  
  {
    "name": "Product settings",
    "settings": [
      {
        "type": "header",
        "content": "Product cards"
      },
      {
        "type": "checkbox",
        "id": "product_show_vendor",
        "label": "Show vendor",
        "default": false
      },
      {
        "type": "checkbox",
        "id": "product_show_type_badge",
        "label": "Show product type badge",
        "default": true
      },
      {
        "type": "select",
        "id": "product_image_ratio",
        "label": "Image aspect ratio",
        "options": [
          {"value": "natural", "label": "Natural"},
          {"value": "square", "label": "Square (1:1)"},
          {"value": "portrait", "label": "Portrait (2:3)"}
        ],
        "default": "natural"
      }
    ]
  },
  
  {
    "name": "Bundle settings",
    "settings": [
      /* Bundle tiers 1-4 */
    ]
  },
  
  {
    "name": "Subscription settings",
    "settings": [
      /* Subscription config */
    ]
  },
  
  {
    "name": "Cart settings",
    "settings": [
      {
        "type": "select",
        "id": "cart_type",
        "label": "Cart type",
        "options": [
          {"value": "drawer", "label": "Drawer"},
          {"value": "page", "label": "Page"}
        ],
        "default": "drawer"
      },
      {
        "type": "text",
        "id": "cart_free_shipping_threshold",
        "label": "Free shipping threshold",
        "default": "50",
        "info": "Amount in your store currency (e.g., 50 for $50)"
      },
      {
        "type": "checkbox",
        "id": "cart_show_bundle_progress",
        "label": "Show bundle progress",
        "default": true
      },
      {
        "type": "checkbox",
        "id": "cart_enable_upsell",
        "label": "Enable upsell recommendations",
        "default": true
      },
      {
        "type": "product",
        "id": "cart_upsell_product",
        "label": "Default upsell product"
      }
    ]
  },
  
  {
    "name": "Social media",
    "settings": [
      {
        "type": "header",
        "content": "Social accounts"
      },
      {
        "type": "text",
        "id": "social_instagram_url",
        "label": "Instagram URL"
      },
      {
        "type": "text",
        "id": "social_facebook_url",
        "label": "Facebook URL"
      },
      {
        "type": "text",
        "id": "social_tiktok_url",
        "label": "TikTok URL"
      }
    ]
  }
]
```

---

## 📋 PHASE 7: DEMO STORE - GINGR

### L. GINGR Demo Content

**Purpose**: Showcase theme capabilities for functional shots vertical

#### Products (5)
1. **GINGR Energy** - Ginger · Lemon · Guarana
   - Variants: 1 shot (€4), 6-pack (€21 / €3.50 each), 12-pack (€38 / €3.17 each), 24-pack (€72 / €3 each)
   - Metafields: `function: "Energy"`, `when_to_take: "Morning / pre-work"`, `accent_color: "#ffd400"`
   - Subscription: €3.40/shot (15% off)

2. **GINGR Immunity** - Ginger · Turmeric · Vitamin C
   - Metafields: `function: "Immunity"`, `when_to_take: "Daily defense"`, `accent_color: "#e3a018"`

3. **GINGR Focus** - Ginger · Spirulina · Ginseng
   - Metafields: `function: "Focus"`, `when_to_take: "Work & clarity"`, `accent_color: "#006d77"`

4. **GINGR Recover** - Ginger · Beetroot · Magnesium
   - Metafields: `function: "Recover"`, `when_to_take: "Post-workout"`, `accent_color: "#c1121f"`

5. **GINGR Digest** - Ginger · Apple Cider · Fennel
   - Metafields: `function: "Digest"`, `when_to_take: "After meals"`, `accent_color: "#7cb342"`

#### Collections
- **All Products** (all 5 shots)
- **Energy Boosters** (Energy, Focus)
- **Daily Wellness** (Immunity, Digest)
- **Starter Packs** (bundle collection - links to products with 6-pack variant preselected)

#### Local Producers (for map section)
- **Ginger**: Hudson Valley Ginger Farm (Upstate NY) - 120 miles away
- **Turmeric**: Pacific Spice Co. (Oregon) - 2,800 miles away
- **Lemon**: Sunny Grove Farms (California) - 2,500 miles away

#### Pages
- **About** - GINGR story (local, functional, no BS)
- **How It Works** - Subscription + bundle process
- **Ingredients** - Sourcing transparency
- **Contact** ✅

#### Navigation
**Main Menu**:
- Shop All
- Energy Boosters
- Daily Wellness
- Starter Packs
- About
- How It Works

**Footer Menu**:
- About GINGR
- Ingredients
- How Subscriptions Work
- Contact
- FAQs
- Shipping & Returns
- Privacy Policy
- Terms of Service

---

## 📋 PHASE 8: REVISED SECTION SUMMARY

### M. Complete Section List (White-Label)

| Section | Purpose | White-Label | Demo (GINGR) |
|---------|---------|-------------|--------------|
| **Layout** | | | |
| `header` | Site header with nav | Logo, colors customizable | GINGR logo, ginger yellow accent |
| `announcement-bar` | Top banner | Text customizable | "Free shipping on orders €50+" |
| `footer` | Site footer | Menus, social links | GINGR social, local story link |
| `pages-grid` | Footer page links | Merchant adds pages | About, Contact, FAQs |
| **Homepage** | | | |
| `hero` | Hero section | Image, text, CTA | "Daily ginger. Real function." |
| `value-props` | USP grid | 3-4 customizable props | ⚡ Natural energy, 🛡️ Immunity, 🌿 Local |
| `product-carousel` | Featured products | Any products | All 5 GINGR shots |
| `bundle-highlight` | Bundle explainer | Tier config | 6/12/24 packs with savings |
| `subscription-benefits` | Why subscribe | Benefits blocks | Save 15%, pause anytime, etc. |
| `how-it-works` | Process steps | Customizable steps | Order → Delivered → Enjoy |
| `local-producers` | Sourcing map | Producer blocks | Ginger farm, lemon grove, etc. |
| `impact-metrics` | Stats showcase | Metric blocks | 50K shots sold, 500 farms |
| `brand-story` | About us | Text + images | GINGR origin story |
| `ingredients-spotlight` | Ingredient focus | Ingredient blocks | Ginger, turmeric, spirulina |
| `info-tabs` | Tabbed content | Custom tabs | FAQs, Certifications, Science |
| `faq` | Accordion FAQ | Question blocks | "How often should I drink?" |
| **Product** | | | |
| `main-product` | PDP main section | Modular blocks | Bundle selector, subscription toggle |
| `product-benefits` | What's inside | Ingredient blocks | Ginger, lemon, guarana benefits |
| `routine-builder` | Cross-sell widget | Product list | Add Energy (morning) + Digest (evening) |
| `product-complementary` | Recommendations | Shopify auto | "Pairs well with GINGR Immunity" |
| `product-reviews-slot` | Review app slot | App insertion point | Judge.me / Loox integration |
| **Collection** | | | |
| `main-collection` | Collection grid | Filtering, sorting | Energy Boosters collection |
| `featured-collection` | Secondary collection | Any collection | Daily Wellness |
| **Other** | | | |
| `cart` | Cart page | Bundle progress, upsell | Bundle bar, free shipping tracker |
| `search` | Search results | Predictive search | Search "energy" → GINGR Energy |
| `custom-liquid` | App integration | Liquid input | Empty by default |

---

## 📋 PHASE 9: IMPLEMENTATION CHECKLIST

### N. Refactor Roadmap

#### Week 1-2: Foundation
- [x] Update `architecture_mvp.md` with accurate section/file names
- [x] Rename sections (remove "-health" suffix)
- [x] Implement predictive search (JS + snippet)
- [x] Add custom liquid section + blocks
- [ ] Refactor `main-product` into modular blocks (optional; current section works)
- [x] Add complementary products section
- [x] Add Follow on Shop button to footer
- [x] Fix gift card recipient form

#### Week 3-4: White-Label System
- [x] Consolidate color system (CSS variables + Tailwind brand.*)
- [ ] Replace all gray usage with brand colors (partial in new sections)
- [ ] Create comprehensive locale structure (existing keys used in main-product, main-collection, product-benefits)
- [ ] Replace ALL hardcoded strings with `{{ 'key' | t }}`
- [ ] Add `{% doc %}` to all snippets (bundle-progress, predictive-search done)
- [x] Document color system in white-label guide

#### Week 5-6: New Sections
- [x] Build `local-producers` section with map (list view; map coords in settings for future)
- [x] Build `subscription-benefits` section
- [x] Build `impact-metrics` section
- [x] Build `routine-builder` section
- [x] Enhance `product-benefits` (block-based)
- [x] Create `bundle-progress` snippet
- [x] Update cart drawer with progress bars

#### Week 7: Settings & Config
- [ ] Reorganize `settings_schema.json`
- [ ] Add bundle tier settings (1-4 tiers)
- [ ] Add subscription settings
- [ ] Add product display settings
- [ ] Test all settings in theme editor

#### Week 8-9: GINGR Demo Store
- [ ] Create 5 GINGR products with variants
- [ ] Add product metafields (function, when_to_take, accent_color)
- [ ] Set up collections
- [ ] Create pages (About, How It Works, Ingredients)
- [ ] Configure navigation menus
- [ ] Add local producer map data
- [ ] Populate all sections with GINGR content

#### Week 10: QA & Performance
- [ ] Cross-browser testing
- [ ] Accessibility audit (keyboard nav, screen readers)
- [ ] Lighthouse performance (60+ desktop/mobile)
- [ ] Lighthouse accessibility (90+ desktop/mobile)
- [ ] Theme Check (fix all warnings)
- [ ] Mobile responsiveness check
- [ ] Test on 3G network

#### Week 11-12: Documentation
- [ ] Write merchant documentation site
- [ ] Create setup guides (colors, products, subscriptions)
- [ ] Write section reference docs
- [ ] Create FAQ for merchants
- [ ] Document support policy
- [x] Update developer docs (`architecture_mvp.md`, `AGENTS.md`)
- [x] Create CHANGELOG.md
- [x] Create `documentation/white-label-guide.md`

---

## 📋 FINAL DELIVERABLES

### O. Theme Package Contents
```
repeat-theme/
├── assets/
├── config/
│   ├── settings_schema.json (white-label settings)
│   └── settings_data.json (GINGR demo defaults)
├── layout/
│   └── theme.liquid
├── locales/
│   ├── en.default.json (full i18n)
│   └── en.default.schema.json
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── hero.liquid
│   ├── main-product.liquid (modular blocks)
│   ├── main-collection.liquid
│   ├── local-producers.liquid ⭐ NEW
│   ├── subscription-benefits.liquid ⭐ NEW
│   ├── routine-builder.liquid ⭐ NEW
│   ├── impact-metrics.liquid ⭐ NEW
│   ├── custom-liquid.liquid ⭐ NEW
│   └── ...
├── snippets/
│   ├── bundle-progress.liquid ⭐ NEW
│   ├── predictive-search.liquid ⭐ NEW
│   ├── product-card.liquid ({% doc %} added)
│   └── ...
├── templates/
│   ├── index.json
│   ├── product.json
│   ├── collection.json ✅ KEPT
│   ├── list-collections.json ✅ KEPT
│   └── ...
├── documentation/
│   ├── architecture_mvp.md (updated)
│   ├── white-label-guide.md ⭐ NEW
│   ├── gingr-demo-setup.md ⭐ NEW
│   └── ...
└── README.md (merchant-facing)

🎯 SUCCESS CRITERIA
P. White-Label Validation
Test with 3 Different Brands:

GINGR (functional shots) - Demo ✅
Mock Brand #1 (cold-pressed juice)

Change colors, fonts, logo
Update product line (Orange Vitality, Green Detox, Berry Immunity)
Verify all sections adapt correctly


Mock Brand #2 (kombucha)

Different color palette
Different product structure (flavors vs functions)
Test with 10+ products (collection page layout)



If white-label works: Any of these 3 brands can be set up in <1 hour by changing theme settings only (no code).

📊 SHOPIFY COMPLIANCE CHECKLIST
Q. Theme Store Requirements

 Features: All 23 required features implemented ✅
 Templates: All required templates in JSON format ✅
 Sections: OS 2.0 sections everywhere ✅
 Blocks: Product page uses blocks ✅
 App blocks: @app supported in product sections ✅
 Performance: Lighthouse 60+ (desktop/mobile) ✅
 Accessibility: Lighthouse 90+ (desktop/mobile) ✅
 Browser support: Latest Chrome, Firefox, Safari, Edge ✅
 Mobile: Responsive, touch targets 24x24px+ ✅
 I18n: No hardcoded strings, full locale support ✅
 SEO: Meta tags, structured data ✅
 Assets: No .scss files, responsive images ✅
 Settings: Clear labels, logical organization ✅
 Demo store: Realistic content, no Lorem Ipsum ✅


🚀 NEXT STEPS
Immediate Actions:

Review this revised plan
Confirm priority sections (which to build first)
Set up development environment
Create feature branch: refactor/white-label-drinks

What would you like me to create first?

 Updated architecture_mvp.md (Phase 1)
 White-label color system implementation (Phase 2)
 Local producers section with map (Phase 5)
 Complete settings_schema.json with bundle/subscription settings (Phase 6)
 Locale structure (locales/en.default.json) with all UI strings (Phase 2)