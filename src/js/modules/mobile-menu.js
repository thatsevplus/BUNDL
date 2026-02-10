/**
 * GINGR — Mobile Menu
 * Full screen overlay mobile navigation.
 */
export const MobileMenu = {
  init() {
    const toggleBtn = document.querySelector('[data-mobile-menu-toggle]');
    const closeBtn = document.querySelector('[data-mobile-menu-close]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!menu) return;

    const open = () => {
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
      document.body.style.overflow = '';
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    };

    if (toggleBtn) toggleBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);

    // Close on link click
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', close);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        close();
      }
    });
  }
};
