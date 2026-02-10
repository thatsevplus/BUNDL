/**
 * GINGR — Bundle Select
 * Per-product dropdown for bundle pack selection.
 * Tiers come from global settings, rendered as dropdown options.
 */
export const BundleDrawer = {
  init() {
    document.querySelectorAll('[data-bundle-select]').forEach((select) => {
      const toggle = select.querySelector('[data-bundle-select-toggle]');
      const dropdown = select.querySelector('[data-bundle-select-dropdown]');
      const chevron = select.querySelector('[data-bundle-select-chevron]');
      const label = select.querySelector('[data-bundle-select-label]');
      const options = select.querySelectorAll('[data-bundle-option]');
      if (!toggle || !dropdown) return;

      // Toggle dropdown
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !dropdown.classList.contains('hidden');

        // Close all other dropdowns and reset z-index
        document.querySelectorAll('[data-bundle-product]').forEach((card) => {
          card.style.zIndex = '';
        });
        document.querySelectorAll('[data-bundle-select-dropdown]').forEach((d) => {
          d.classList.add('hidden');
        });
        document.querySelectorAll('[data-bundle-select-chevron]').forEach((c) => {
          c.style.transform = '';
        });

        if (!isOpen) {
          // Raise the parent card above siblings
          const card = select.closest('[data-bundle-product]');
          if (card) card.style.zIndex = '40';
          dropdown.classList.remove('hidden');
          if (chevron) chevron.style.transform = 'rotate(180deg)';
          toggle.setAttribute('aria-expanded', 'true');
        } else {
          toggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Select option
      options.forEach((option) => {
        option.addEventListener('click', () => {
          const amount = option.getAttribute('data-amount');
          if (label) label.textContent = 'Pack ' + amount;
          dropdown.classList.add('hidden');
          if (chevron) chevron.style.transform = '';
          toggle.setAttribute('aria-expanded', 'false');

          // Highlight selected
          options.forEach((o) => o.classList.remove('bg-white/10'));
          option.classList.add('bg-white/10');
        });
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', () => {
      document.querySelectorAll('[data-bundle-product]').forEach((card) => {
        card.style.zIndex = '';
      });
      document.querySelectorAll('[data-bundle-select-dropdown]').forEach((d) => {
        d.classList.add('hidden');
      });
      document.querySelectorAll('[data-bundle-select-chevron]').forEach((c) => {
        c.style.transform = '';
      });
    });
  }
};
