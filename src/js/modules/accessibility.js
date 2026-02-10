/**
 * GINGR Accessibility
 * Focus trap for drawers/modals, keyboard nav, escape close
 */
export const Accessibility = {
  init() {
    this.setupFocusVisible();
  },

  setupFocusVisible() {
    // Add focus-visible polyfill behavior
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  },

  /**
   * Trap focus within an element (for drawers/modals)
   */
  trapFocus(element) {
    const focusable = element.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handler(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    element.addEventListener('keydown', handler);
    first.focus();

    return () => element.removeEventListener('keydown', handler);
  },
};
