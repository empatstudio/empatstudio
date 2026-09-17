const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('.desktop-nav');
const header = document.querySelector('[data-header]');

const setMenuOpen = (open, returnFocus = false) => {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Uždaryti meniu' : 'Atverti meniu');
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (open) nav.querySelector('a')?.focus();
  else if (returnFocus) toggle.focus();
};

toggle?.addEventListener('click', () => setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true'));

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  setMenuOpen(false);
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenuOpen(false, true);
});

document.addEventListener('click', (event) => {
  if (toggle?.getAttribute('aria-expanded') === 'true' && header && !header.contains(event.target)) setMenuOpen(false);
});

window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
  if (event.matches) setMenuOpen(false);
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reviewCarousel = document.querySelector('[data-review-carousel]');

if (reviewCarousel) {
  const track = reviewCarousel.querySelector('[data-review-track]');
  const slides = [...reviewCarousel.querySelectorAll('[data-review-slide]')];
  const dots = [...reviewCarousel.querySelectorAll('[data-review-dot]')];
  const previousButton = reviewCarousel.querySelector('[data-review-prev]');
  const nextButton = reviewCarousel.querySelector('[data-review-next]');
  const currentLabel = reviewCarousel.querySelector('[data-review-current]');
  let currentIndex = 0;
  let autoplayTimer;

  const showReview = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.inert = !isActive;
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });

    currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
  };

  const stopAutoplay = () => window.clearInterval(autoplayTimer);
  const startAutoplay = () => {
    if (
      reduceMotion
      || slides.length < 2
      || document.hidden
      || reviewCarousel.matches(':hover')
      || reviewCarousel.matches(':focus-within')
    ) return;
    stopAutoplay();
    autoplayTimer = window.setInterval(() => showReview(currentIndex + 1), 18000);
  };
  const changeReview = (index) => {
    showReview(index);
    startAutoplay();
  };

  previousButton?.addEventListener('click', () => changeReview(currentIndex - 1));
  nextButton?.addEventListener('click', () => changeReview(currentIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => changeReview(index)));

  reviewCarousel.addEventListener('mouseenter', stopAutoplay);
  reviewCarousel.addEventListener('mouseleave', startAutoplay);
  reviewCarousel.addEventListener('focusin', stopAutoplay);
  reviewCarousel.addEventListener('focusout', (event) => {
    if (!reviewCarousel.contains(event.relatedTarget)) startAutoplay();
  });
  reviewCarousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') changeReview(currentIndex - 1);
    if (event.key === 'ArrowRight') changeReview(currentIndex + 1);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  showReview(0);
  startAutoplay();
}

if (!reduceMotion) {
  const animatedElements = document.querySelectorAll([
    '.reveal', '.section-heading', '.service-grid article', '.projects article',
    '.timeline li', '.reviews-heading', '.review-viewport', '.knowledge-grid article', '.faq details',
    '.content-section', '.feature-cards article', '.service-detail', '.article-body > *',
    '.case-mockup-heading', '.device-composition', '.case-brief-columns article',
    '.case-step', '.tesora-brand-grid > *', '.innohub-system-grid > *', '.case-gallery-grid > *', '.case-outcome-grid article',
    '.marketing-grid article', '.marketing-flow li', '.dz-persona-grid article',
    '.dz-identity-grid > *', '.dz-gallery-grid > *'
  ].join(','));

  animatedElements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });

  animatedElements.forEach((element) => observer.observe(element));
}
