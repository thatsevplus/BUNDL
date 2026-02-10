/**
 * GINGR Bundle Selector
 * Handles pack selection UI (1 / 6 / 12) mapped to product variants
 */
export const BundleSelector = {
  init() {
    document.querySelectorAll('[data-bundle-selector]').forEach((selector) => {
      this.setup(selector);
    });
  },

  setup(container) {
    const buttons = container.querySelectorAll('[data-bundle-option]');
    const variantInput = container.closest('form')?.querySelector('select[name="id"], input[name="id"]');
    const priceDisplay = document.querySelector('[data-bundle-price]');
    const savingsDisplay = document.querySelector('[data-bundle-savings]');
    const unitPriceDisplay = document.querySelector('[data-bundle-unit-price]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Update active state
        buttons.forEach((b) => {
          b.classList.remove('bg-gingr-navy', 'text-white', 'ring-2', 'ring-gingr-navy');
          b.classList.add('bg-white', 'text-gingr-navy');
        });
        btn.classList.add('bg-gingr-navy', 'text-white', 'ring-2', 'ring-gingr-navy');
        btn.classList.remove('bg-white', 'text-gingr-navy');

        // Update hidden variant select
        const variantId = btn.dataset.variantId;
        if (variantInput) {
          if (variantInput.tagName === 'SELECT') {
            variantInput.value = variantId;
          } else {
            variantInput.value = variantId;
          }
          variantInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Update price display
        if (priceDisplay) priceDisplay.textContent = btn.dataset.price;
        if (savingsDisplay) {
          const savings = btn.dataset.savings;
          savingsDisplay.textContent = savings && savings !== '0' ? `Save ${savings}%` : '';
          savingsDisplay.classList.toggle('hidden', !savings || savings === '0');
        }
        if (unitPriceDisplay && btn.dataset.unitPrice) {
          unitPriceDisplay.textContent = btn.dataset.unitPrice;
        }
      });
    });
  },
};
