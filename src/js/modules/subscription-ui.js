/**
 * GINGR — Subscription UI v2
 * Handles purchase type toggle + frequency selection.
 */
export const SubscriptionUI = {
  init() {
    document.querySelectorAll('[data-sub-builder]').forEach((builder) => {
      const onetimeBtn = builder.querySelector('[data-purchase-type="onetime"]');
      const subscribeBtn = builder.querySelector('[data-purchase-type="subscribe"]');
      const frequencyPanel = builder.querySelector('[data-frequency-panel]');
      const frequencyOptions = builder.querySelectorAll('[data-frequency-option]');

      if (!onetimeBtn || !subscribeBtn) return;

      const setActive = (type) => {
        if (type === 'subscribe') {
          subscribeBtn.classList.add('border-gingr-yellow', 'bg-gingr-yellow/10', 'text-gingr-yellow');
          subscribeBtn.classList.remove('border-white/10', 'text-white/50');
          onetimeBtn.classList.remove('border-gingr-yellow', 'bg-gingr-yellow/10', 'text-gingr-yellow');
          onetimeBtn.classList.add('border-white/10', 'text-white/50');
          if (frequencyPanel) frequencyPanel.style.display = '';
        } else {
          onetimeBtn.classList.add('border-gingr-yellow', 'bg-gingr-yellow/10', 'text-gingr-yellow');
          onetimeBtn.classList.remove('border-white/10', 'text-white/50');
          subscribeBtn.classList.remove('border-gingr-yellow', 'bg-gingr-yellow/10', 'text-gingr-yellow');
          subscribeBtn.classList.add('border-white/10', 'text-white/50');
          if (frequencyPanel) frequencyPanel.style.display = 'none';
        }
      };

      onetimeBtn.addEventListener('click', () => setActive('onetime'));
      subscribeBtn.addEventListener('click', () => setActive('subscribe'));

      // Frequency option selection
      frequencyOptions.forEach((option) => {
        option.addEventListener('click', () => {
          // Reset all
          frequencyOptions.forEach((o) => {
            o.classList.remove('border-gingr-yellow', 'bg-gingr-yellow/5');
            o.classList.add('border-white/10');
            const radio = o.querySelector('[data-frequency-radio]');
            if (radio) {
              radio.classList.remove('border-gingr-yellow');
              radio.classList.add('border-white/20');
              radio.innerHTML = '';
            }
          });

          // Activate selected
          option.classList.add('border-gingr-yellow', 'bg-gingr-yellow/5');
          option.classList.remove('border-white/10');
          const radio = option.querySelector('[data-frequency-radio]');
          if (radio) {
            radio.classList.add('border-gingr-yellow');
            radio.classList.remove('border-white/20');
            radio.innerHTML = '<div class="w-2 h-2 rounded-full bg-gingr-yellow"></div>';
          }
        });
      });
    });
  }
};
