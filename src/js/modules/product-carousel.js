// GINGR — Product Carousel (horizontal snap scroll with arrows + dots)
export const ProductCarousel = {
  init() {
    document.querySelectorAll('[data-product-carousel]').forEach((el) => {
      this.setup(el);
    });
  },

  setup(container) {
    const track = container.querySelector('[data-carousel-track]');
    const slides = container.querySelectorAll('.carousel-slide');
    const prevBtn = container.querySelector('[data-carousel-prev]');
    const nextBtn = container.querySelector('[data-carousel-next]');
    const dots = container.querySelectorAll('[data-carousel-dot]');
    let current = 0;

    if (!track || slides.length === 0) return;

    const scrollTo = (index) => {
      const slideWidth = slides[0].offsetWidth + 24; // gap-6 = 24px
      track.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
    };

    const updateDots = () => {
      dots.forEach((dot, i) => {
        if (i === current) {
          dot.classList.add('bg-gingr-navy', 'w-6');
          dot.classList.remove('bg-gingr-navy/20', 'w-2');
        } else {
          dot.classList.remove('bg-gingr-navy', 'w-6');
          dot.classList.add('bg-gingr-navy/20', 'w-2');
        }
      });
    };

    // Arrow nav
    prevBtn?.addEventListener('click', () => {
      current = Math.max(0, current - 1);
      scrollTo(current);
      updateDots();
    });

    nextBtn?.addEventListener('click', () => {
      current = Math.min(slides.length - 1, current + 1);
      scrollTo(current);
      updateDots();
    });

    // Dot nav
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        current = parseInt(dot.dataset.carouselDot, 10);
        scrollTo(current);
        updateDots();
      });
    });

    // Sync dots on manual scroll / swipe
    let scrollTimer = null;
    track.addEventListener(
      'scroll',
      () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          const slideWidth = slides[0].offsetWidth + 24;
          const idx = Math.round(track.scrollLeft / slideWidth);
          if (idx !== current) {
            current = idx;
            updateDots();
          }
        }, 100);
      },
      { passive: true }
    );
  },
};
