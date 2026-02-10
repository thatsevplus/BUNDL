// GINGR — Main JS entry
import { CartDrawer } from './modules/cart-drawer.js';
import { BundleSelector } from './modules/bundle-selector.js';
import { SubscriptionUI } from './modules/subscription-ui.js';
import { Accessibility } from './modules/accessibility.js';
import { ProductCarousel } from './modules/product-carousel.js';
import { HeaderScroll } from './modules/header-scroll.js';
import { InfoTabs } from './modules/info-tabs.js';
import { BundleDrawer } from './modules/bundle-drawer.js';
import { MobileMenu } from './modules/mobile-menu.js';

document.addEventListener('DOMContentLoaded', () => {
  HeaderScroll.init();
  MobileMenu.init();
  CartDrawer.init();
  BundleSelector.init();
  BundleDrawer.init();
  SubscriptionUI.init();
  Accessibility.init();
  ProductCarousel.init();
  InfoTabs.init();
});
