/**
 * GINGR — Header scroll behavior
 * Adds translucent bg when user scrolls down.
 */
export const HeaderScroll = {
  init() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    const threshold = 50;
    let ticking = false;

    const update = () => {
      if (window.scrollY > threshold) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    update();
  }
};

/**
 * Best seller promo — dismissible via sessionStorage
 */
export const BestSellerPromo = {
  init() {
    const container = document.querySelector('[data-best-seller-promo]');
    if (!container) return;
    const key = container.getAttribute('data-dismissed-key');
    if (sessionStorage.getItem(key)) {
      container.style.display = 'none';
      return;
    }
    const btn = container.querySelector('[data-promo-dismiss]');
    if (btn) {
      btn.addEventListener('click', () => {
        try { sessionStorage.setItem(key, '1'); } catch (_) {}
        container.style.display = 'none';
      });
    }
  }
};

/**
 * Back to top — show after scroll, smooth scroll on click
 */
export const BackToTop = {
  init() {
    const btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;
    const threshold = 500;
    let ticking = false;
    const update = () => {
      const visible = window.scrollY > threshold;
      btn.style.opacity = visible ? '1' : '0';
      btn.style.pointerEvents = visible ? 'auto' : 'none';
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};
