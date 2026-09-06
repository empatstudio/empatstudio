const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('.desktop-nav');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  toggle?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const animatedElements = document.querySelectorAll([
    '.reveal', '.section-heading', '.service-grid article', '.projects article',
    '.timeline li', '.review-grid blockquote', '.knowledge-grid article', '.faq details',
    '.content-section', '.feature-cards article', '.service-detail', '.article-body > *'
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
