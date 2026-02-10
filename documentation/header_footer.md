# Header → Hero → Footer Implementation Guide

## Overview

This document covers the implementation of the modernized header, hero, and footer sections for your white-label drinks theme. These sections have been designed with conversion optimization, modern UX patterns, and mobile-first principles.

---

## 🎨 Design Philosophy

### Visual Hierarchy
```
ANNOUNCEMENT BAR (optional, dismissible)
    ↓
HEADER (minimal, sticky, transparent option)
    ↓
BEST SELLER PROMO (floating conversion driver)
    ↓
HERO (image/video, product-centered)
    ↓
PRODUCT CAROUSEL (seamless flow)
```

### Key Principles
1. **Conversion-First**: Best seller promo card immediately highlights top product
2. **Product-Centered**: Hero showcases product alongside brand message
3. **Mobile-Optimized**: All components responsive and touch-friendly
4. **Performance**: Lazy loading, efficient animations, preloaded critical assets
5. **Accessibility**: Keyboard navigation, ARIA labels, focus management

---

## 📁 File Structure

```
gingr_theme/
├── sections/
│   ├── header.liquid              ← New modern header
│   ├── best-seller-promo.liquid   ← New promo card
│   ├── hero.liquid                ← Enhanced hero
│   └── footer.liquid              ← Enhanced footer
├── snippets/
│   ├── icon.liquid               (required for icons)
│   └── predictive-search.liquid  (required for search)
├── assets/
│   └── header-scroll.js          ← New JS module
└── layout/
    └── theme.liquid              (updated to include new sections)
```

---

## 🔧 Installation Steps

### 1. Update Section Group

Replace your `header-group.json` to include the new sections:

```json
{
  "name": "Header Group",
  "type": "header",
  "sections": {
    "announcement-bar": {
      "type": "announcement-bar"
    },
    "header": {
      "type": "header"
    },
    "best-seller-promo": {
      "type": "best-seller-promo",
      "settings": {
        "enabled": true,
        "floating": true,
        "show_badge": true
      }
    }
  },
  "order": [
    "announcement-bar",
    "header",
    "best-seller-promo"
  ]
}
```

### 2. Update Homepage Template

Your `templates/index.json` should have this section order:

```json
{
  "sections": {
    "hero": {
      "type": "hero",
      "settings": {
        "height": "large",
        "text_position": "left",
        "show_product": true
      }
    },
    "product-carousel": {
      "type": "product-carousel"
    },
    ...
  },
  "order": [
    "hero",
    "product-carousel",
    ...
  ]
}
```

### 3. Import JavaScript Module

In your `src/js/main.js`:

```javascript
import { HeaderScroll, MobileMenu, SearchModal } from './modules/header-scroll.js';

// Components initialize on DOMContentLoaded (already in module)
```

### 4. Add Icon Snippet (if not exists)

Create `snippets/icon.liquid`:

```liquid
{% case icon %}
  {% when 'search' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  {% when 'cart' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  {% when 'account' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  {% when 'close' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  {% when 'chevron-down' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  {% when 'arrow-right' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  {% when 'arrow-up' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  {% when 'star' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  {% when 'instagram' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  {% when 'facebook' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  {% when 'tiktok' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  {% when 'twitter' %}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
{% endcase %}
```

---

## 🎨 Customization Guide

### Header

#### Transparent Header on Homepage
```json
{
  "transparent_header": true,
  "sticky_header": true
}
```
- When enabled, header background is transparent over hero
- Automatically gets opaque background when scrolling
- Text color switches to white over dark hero images

#### Logo Configuration
- Upload logo in section settings
- Adjust width (50-300px)
- Automatically scales proportionally
- Fallback to shop name if no logo

#### Navigation Menu
- Configure in Shopify Admin → Navigation
- Supports 2-level dropdown menus
- Mobile: Collapsible accordion menus

---

### Best Seller Promo Card

#### Positioning
```json
{
  "floating": true,
  "offset_top": 80
}
```
- `floating: true`: Card stays visible when scrolling (sticky)
- `offset_top`: Distance from top (accounts for header height)

#### Content
- **Product**: Select best seller from product picker
- **Badge**: "Best Seller" (customizable text)
- **Tagline**: Short description (e.g., "Wake up fast. Stay sharp.")
- **Bundle Tiers**: Automatically displays pack discounts from theme settings

#### Behavior
- **Dismissible**: Users can close (persists for session)
- **Responsive**: Stacks vertically on mobile
- **Hover Effects**: Image scales, button animates

#### Demo Setup (GINGR)
```json
{
  "product": "gingr-energy",
  "badge_text": "Best Seller",
  "tagline": "Wake up fast. Stay sharp.",
  "show_bundle_tiers": true,
  "button_text": "Shop Now"
}
```

---

### Hero Section

#### Media Types

**1. Image (Default)**
```json
{
  "image": "hero-image.jpg",
  "image_mobile": "hero-mobile.jpg"  // Optional separate mobile image
}
```

**2. Uploaded Video**
```json
{
  "video": "hero-video.mp4",
  "image": "fallback.jpg"  // Fallback for unsupported browsers
}
```

**3. External Video (YouTube/Vimeo)**
```json
{
  "video_url": "https://www.youtube.com/watch?v=..."
}
```

#### Layout Options

**Text Position**
- `left`: Text left, product right (default)
- `center`: Text centered, product below
- `right`: Text right, product left

**Height**
- `small`: 400px
- `medium`: 600px
- `large`: 90vh (default)
- `fullscreen`: 100vh

**Overlay**
- Darkens background for text readability
- Adjustable opacity: 0-100%

#### Product Showcase
```json
{
  "show_product": true,
  "featured_product": "gingr-energy"
}
```
- Floating product card with image, price, CTA
- Hover animation (lifts card, scales image)
- Auto-links to product page

#### Call-to-Actions
- **Primary Button**: Main CTA (e.g., "Shop Now")
- **Secondary Button**: Alt CTA (e.g., "Learn More")
- Both support custom text + URL

#### Demo Setup (GINGR)
```json
{
  "height": "large",
  "text_position": "left",
  "image": "gingr-hero.jpg",
  "overlay_opacity": 40,
  "text_color": "#ffffff",
  "eyebrow": "New Launch",
  "heading": "Daily ginger. Real function.",
  "subheading": "Functional health shots that actually work. Ginger-first, science-backed, locally sourced.",
  "button_primary_text": "Shop Now",
  "button_primary_link": "/collections/all",
  "button_secondary_text": "Our Story",
  "button_secondary_link": "/pages/about",
  "show_product": true,
  "featured_product": "gingr-energy",
  "show_scroll_indicator": true
}
```

---

### Footer

#### Layout
- **Grid Structure**: Brand column + menu columns
- **Responsive**: Stacks on mobile
- **Hover Effects**: Links slide right, social icons pop

#### Social Links
- Configure URLs in `theme settings → Social media`
- Icons automatically show if URLs present
- Hover: Icon backgrounds scale with primary color

#### Newsletter Block
```json
{
  "type": "newsletter",
  "heading": "Stay fresh",
  "text": "Get the latest on new products, recipes, and special offers."
}
```
- Inline submit button
- Success/error messaging
- Email validation

#### Menu Blocks
```json
{
  "type": "menu",
  "heading": "Shop",
  "menu": "main-menu"
}
```
- Add unlimited menu columns
- Each menu has custom heading
- Links animate on hover

#### Back to Top Button
- Appears after scrolling 500px
- Smooth scroll animation
- Fixed position (bottom right)

#### Demo Setup (GINGR)
```json
{
  "blocks": [
    {
      "type": "menu",
      "settings": {
        "heading": "Shop",
        "menu": "main-menu"
      }
    },
    {
      "type": "menu",
      "settings": {
        "heading": "About",
        "menu": "footer"
      }
    },
    {
      "type": "newsletter",
      "settings": {
        "heading": "Stay fresh",
        "text": "Get the latest on new products and special offers."
      }
    }
  ]
}
```

---

## 🎯 GINGR Demo Configuration

### Color Scheme
```css
--color-primary: #ffe14e        /* Ginger Yellow */
--color-secondary: #e3a018      /* Turmeric Gold */
--color-background: #fce9d2     /* Warm Cream */
--color-text: #1b1913           /* Dark Brown */
```

### Product Setup
**Best Seller Promo**: GINGR Energy
- Image: 60ml shot bottle with lemon yellow label
- Tagline: "Wake up fast. Stay sharp."
- Price: €4 (single) / €3.50 (6-pack)
- Bundle tiers: 6× (-10%), 12× (-20%), 24× (-25%)

**Hero Product**: GINGR Energy (same product)
- Showcases consistency across header → hero flow

### Content
**Hero**:
- Eyebrow: "New Launch"
- Heading: "Daily ginger. Real function."
- Subheading: "Functional health shots that actually work. Ginger-first, science-backed, locally sourced."

**Footer**:
- Tagline: "Functional health shots. Ginger-first, science-backed, locally sourced."
- Social links: Instagram, TikTok, Facebook

---

## 📱 Mobile Optimization

### Header
- Hamburger menu (right side)
- Slide-in drawer from right
- Collapsible submenus
- Touch-friendly targets (44x44px)

### Best Seller Promo
- Stacks vertically on mobile
- Image centered
- Full-width CTA button
- Dismissible

### Hero
- Text stacks above product card
- Buttons full-width
- Video optimization: Separate mobile video option
- Reduced font sizes (responsive clamp)

### Footer
- Single column layout
- Expanded social icons
- Newsletter input full-width
- Back to top always visible

---

## ⚡ Performance

### Critical Optimizations
1. **Hero image/video**: `loading="eager"`, `fetchpriority="high"`
2. **Responsive images**: `srcset` with multiple sizes
3. **Lazy loading**: All non-critical images
4. **CSS**: Scoped styles in section files (no external CSS needed)
5. **JS**: Module-based, event delegation, passive listeners

### Lighthouse Targets
- **Performance**: 85+ (hero image/video impacts this)
- **Accessibility**: 95+ (ARIA labels, keyboard nav, focus management)
- **Best Practices**: 95+
- **SEO**: 100

---

## ♿ Accessibility

### Keyboard Navigation
- **Tab**: Navigate through all interactive elements
- **Enter**: Activate buttons/links
- **Escape**: Close mobile menu, search modal
- **Arrow keys**: Navigate menu items (planned enhancement)

### Screen Readers
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels on icon-only buttons
- `aria-expanded` on menu toggles
- `aria-current="page"` on active links
- Focus management in modals

### Focus Indicators
- Visible focus rings on all interactive elements
- Custom focus styles (matches brand color)
- No `outline: none` without replacement

---

## 🔌 Integration Points

### Cart Drawer
Best seller promo → Cart drawer:
```javascript
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-add-to-cart]')) {
    // Handle add to cart
    // Open cart drawer
    document.querySelector('[data-cart-toggle]')?.click();
  }
});
```

### Product Carousel
Hero → Product carousel seamless flow:
- Use matching background colors
- Consistent spacing (no gap)
- Product cards match hero product card style

### Announcement Bar
Place above header in header-group:
```json
{
  "sections": {
    "announcement-bar": {
      "type": "announcement-bar",
      "settings": {
        "text": "Free shipping on orders over €50"
      }
    },
    "header": { "type": "header" },
    ...
  }
}
```

---

## 🐛 Troubleshooting

### Header Not Sticky
**Issue**: Header doesn't stick when scrolling
**Solution**: Check `sticky_header` setting is enabled

### Transparent Header Not Working
**Issue**: Header has background color on homepage
**Solution**: 
1. Enable `transparent_header` in header settings
2. Ensure hero is first section after header-group
3. Check CSS variable `--color-background` is defined

### Mobile Menu Not Opening
**Issue**: Clicking hamburger does nothing
**Solution**:
1. Verify JS module is imported in main.js
2. Check browser console for errors
3. Ensure `data-mobile-menu-toggle` attribute present

### Best Seller Promo Not Floating
**Issue**: Promo card scrolls away
**Solution**:
1. Enable `floating` setting
2. Adjust `offset_top` to match header height
3. Check if dismissed (clear session storage)

### Video Not Autoplaying
**Issue**: Hero video doesn't play
**Solution**:
1. Verify video format is MP4
2. Check autoplay attributes (muted, playsinline)
3. Test in different browsers (iOS requires specific attributes)

---

## 📚 Next Steps

1. **Test on staging**: Deploy to development store
2. **Cross-browser test**: Chrome, Firefox, Safari, Edge
3. **Mobile test**: iOS Safari, Chrome Mobile
4. **Lighthouse audit**: Run performance checks
5. **Accessibility audit**: Test with screen reader
6. **A/B test variations**: Try different hero layouts, promo positions

---

## 💡 Advanced Customizations

### Add Countdown Timer to Promo
```liquid
<!-- In best-seller-promo.liquid -->
<div class="promo__countdown" data-countdown="{{ section.settings.end_date }}">
  <span class="countdown__hours">00</span>:
  <span class="countdown__minutes">00</span>:
  <span class="countdown__seconds">00</span>
</div>
```

### Add Video Sound Toggle
```liquid
<!-- In hero.liquid -->
<button 
  type="button" 
  class="hero__sound-toggle"
  data-sound-toggle
>
  {% render 'icon', icon: 'volume' %}
</button>
```

### Multi-Product Promo Carousel
Replace single product with carousel of best sellers:
```liquid
<!-- Modify best-seller-promo.liquid -->
<div class="promo__carousel" data-promo-carousel>
  {% for product in section.settings.products %}
    <!-- Product card -->
  {% endfor %}
</div>
```

---

**Questions?** Check the main documentation or contact support.