/**
 * GINGR Cart Drawer
 * AJAX add-to-cart, qty update, remove, drawer open/close.
 * Handles upsell add-to-cart inside the drawer.
 */
export const CartDrawer = {
  drawer: null,
  overlay: null,

  init() {
    this.drawer = document.getElementById('cart-drawer');
    this.overlay = document.getElementById('cart-drawer-overlay');
    if (!this.drawer) return;

    // Open triggers
    document.querySelectorAll('[data-cart-toggle]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close triggers
    this.overlay?.addEventListener('click', () => this.close());
    this.drawer.querySelector('[data-cart-close]')?.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) this.close();
    });

    // AJAX add-to-cart intercept (global — catches product forms + upsell)
    document.addEventListener('submit', (e) => {
      const form = e.target.closest('form[action*="/cart/add"]');
      if (!form) return;
      e.preventDefault();
      this.addToCart(form);
    });

    // Qty / remove inside drawer (delegated)
    this.drawer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-cart-qty]');
      if (btn) {
        e.preventDefault();
        const key = btn.dataset.lineKey;
        const action = btn.dataset.cartQty;
        const input = this.drawer.querySelector(`[data-qty-input="${key}"]`);
        let qty = parseInt(input?.value || '1', 10);
        if (action === 'plus') qty++;
        if (action === 'minus') qty = Math.max(0, qty - 1);
        this.updateLine(key, qty);
      }
    });
  },

  isOpen() {
    return this.drawer?.classList.contains('translate-x-0');
  },

  open() {
    this.drawer.classList.remove('translate-x-full');
    this.drawer.classList.add('translate-x-0');
    this.overlay.classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden';
    this.drawer.querySelector('[data-cart-close]')?.focus();
  },

  close() {
    this.drawer.classList.add('translate-x-full');
    this.drawer.classList.remove('translate-x-0');
    this.overlay.classList.add('hidden');
    document.documentElement.style.overflow = '';
  },

  async addToCart(form) {
    const formData = new FormData(form);
    // Disable button during request
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Adding…';
    }

    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Add to cart failed');
      await this.refreshDrawer();
      this.open();
    } catch (err) {
      console.error('[GINGR Cart]', err);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Add';
      }
    }
  },

  async updateLine(key, qty) {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: key, quantity: qty }),
      });
      if (!res.ok) throw new Error('Update failed');
      await this.refreshDrawer();
    } catch (err) {
      console.error('[GINGR Cart]', err);
    }
  },

  async refreshDrawer() {
    try {
      const res = await fetch('/?section_id=cart-drawer');
      const html = await res.text();
      const tmp = new DOMParser().parseFromString(html, 'text/html');

      // Refresh drawer content
      const newContent = tmp.querySelector('#cart-drawer-content');
      if (newContent) {
        this.drawer.querySelector('#cart-drawer-content').innerHTML = newContent.innerHTML;
      }

      // Refresh drawer footer (discount totals change)
      const newFooter = tmp.querySelector('#cart-drawer .border-t.border-white\\/10');
      const oldFooter = this.drawer.querySelector('.border-t.border-white\\/10:last-child');
      if (newFooter && oldFooter) {
        oldFooter.innerHTML = newFooter.innerHTML;
      }

      // Update header badge(s)
      const badges = tmp.querySelectorAll('[data-cart-count]');
      badges.forEach((badge) => {
        const text = badge.textContent.trim();
        document.querySelectorAll('[data-cart-count]').forEach((el) => {
          el.textContent = text;
          el.classList.toggle('hidden', text === '' || text === '0');
        });
      });
    } catch (err) {
      console.error('[GINGR Cart refresh]', err);
    }
  },
};
