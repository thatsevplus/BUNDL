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
