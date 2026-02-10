/**
 * GINGR — Info Tabs
 * Animated tab switching with fade + slide transitions.
 * Tab colors are read from data attributes (per-section settings).
 */
export const InfoTabs = {
  init() {
    document.querySelectorAll('[data-info-tabs]').forEach((container) => {
      const triggers = container.querySelectorAll('[data-tab-trigger]');
      const panels = container.querySelectorAll('[data-tab-panel]');
      if (!triggers.length || !panels.length) return;

      let activeIndex = 0;

      const setActive = (btn) => {
        btn.style.backgroundColor = btn.dataset.tabActiveBg;
        btn.style.color = btn.dataset.tabActiveText;
      };

      const setInactive = (btn) => {
        btn.style.backgroundColor = btn.dataset.tabInactiveBg;
        btn.style.color = btn.dataset.tabInactiveText;
      };

      const switchTab = (newIndex) => {
        if (newIndex === activeIndex) return;

        // Deactivate current
        setInactive(triggers[activeIndex]);
        triggers[activeIndex].setAttribute('aria-selected', 'false');

        const currentPanel = panels[activeIndex];
        currentPanel.classList.add('hidden');
        currentPanel.classList.remove('block', 'opacity-100', 'translate-y-0');

        // Activate new
        setActive(triggers[newIndex]);
        triggers[newIndex].setAttribute('aria-selected', 'true');

        const newPanel = panels[newIndex];
        newPanel.classList.remove('hidden');
        newPanel.classList.add('opacity-0', 'translate-y-4');

        // Trigger animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            newPanel.classList.remove('opacity-0', 'translate-y-4');
            newPanel.classList.add('opacity-100', 'translate-y-0');
          });
        });

        activeIndex = newIndex;
      };

      triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const idx = parseInt(trigger.getAttribute('data-tab-trigger'), 10);
          switchTab(idx);
        });
      });
    });
  }
};
