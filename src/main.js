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

const zoomLinks = document.querySelectorAll('[data-image-zoom]');
if (zoomLinks.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'case-lightbox';
  dialog.setAttribute('aria-labelledby', 'case-lightbox-title');
  dialog.innerHTML = '<div class="case-lightbox-bar"><h2 id="case-lightbox-title"></h2><button type="button" data-zoom-toggle aria-pressed="false">Priartinti</button><button type="button" data-zoom-close aria-label="Uždaryti išdidintą vaizdą">Uždaryti ×</button></div><div class="case-lightbox-scroll" tabindex="0" aria-label="Išdidintas projekto vaizdas"><img alt=""><p class="case-lightbox-error" role="status" hidden>Nepavyko įkelti vaizdo. Uždaryk langą ir pabandyk dar kartą.</p></div>';
  document.body.append(dialog);
  const picture = dialog.querySelector('img');
  const title = dialog.querySelector('h2');
  const toggleZoom = dialog.querySelector('[data-zoom-toggle]');
  const scroller = dialog.querySelector('.case-lightbox-scroll');
  const error = dialog.querySelector('.case-lightbox-error');
  let opener;
  zoomLinks.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    title.textContent = link.querySelector('img')?.alt || 'Projekto vaizdas';
    picture.alt = title.textContent;
    error.hidden = true;
    picture.hidden = false;
    picture.src = link.href;
    dialog.classList.remove('is-zoomed');
    toggleZoom.setAttribute('aria-pressed', 'false');
    toggleZoom.textContent = 'Priartinti';
    dialog.showModal();
    document.body.classList.add('case-lightbox-open');
    scroller.scrollTop = 0;
    scroller.scrollLeft = 0;
    dialog.querySelector('[data-zoom-close]').focus();
  }));
  picture.addEventListener('error', () => { error.hidden = false; picture.hidden = true; });
  dialog.querySelector('[data-zoom-close]').addEventListener('click', () => dialog.close());
  toggleZoom.addEventListener('click', () => {
    const zoomed = dialog.classList.toggle('is-zoomed');
    toggleZoom.setAttribute('aria-pressed', String(zoomed));
    toggleZoom.textContent = zoomed ? 'Talpinti lange' : 'Priartinti';
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('case-lightbox-open');
    opener?.focus({ preventScroll: true });
  });
}

const portfolioFilters = document.querySelector('[data-portfolio-filters]');

if (portfolioFilters) {
  const buttons = [...portfolioFilters.querySelectorAll('[data-portfolio-filter]')];
  const cards = [...document.querySelectorAll('[data-portfolio-category]')];
  const results = document.querySelector('[data-portfolio-results]');

  buttons.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.portfolioFilter;
    let visibleCount = 0;

    buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.portfolioCategory !== category;
      if (!card.hidden) visibleCount += 1;
    });

    if (results) results.textContent = visibleCount === 1
      ? 'Rodomas 1 projektas'
      : `Rodomi ${visibleCount} projektai`;
  }));
}

document.querySelectorAll('[data-card-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-card-track]');
  const slides = [...carousel.querySelectorAll('[data-card-slide]')];
  const previous = carousel.querySelector('[data-card-prev]');
  const next = carousel.querySelector('[data-card-next]');
  const status = carousel.querySelector('[data-card-status]');
  const controls = carousel.querySelector('[data-card-controls]');
  if (!track || !slides.length || !previous || !next) return;
  const update = () => {
    const bounds = track.getBoundingClientRect();
    const visible = slides.map((slide, index) => ({ index, rect: slide.getBoundingClientRect() }))
      .filter(({ rect }) => rect.right > bounds.left + 12 && rect.left < bounds.right - 12);
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    if (status && visible.length) {
      const first = visible[0].index + 1;
      const last = visible[visible.length - 1].index + 1;
      const text = `${first === last ? first : `${first}–${last}`} / ${slides.length}`;
      if (status.textContent !== text) status.textContent = text;
    }
  };
  const move = (direction) => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = slides[0].getBoundingClientRect().width + gap;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? 'instant' : 'smooth' });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', (event) => {
    if (event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
  });
  track.addEventListener('scroll', update, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
  else window.addEventListener('resize', update);
  if (controls) controls.hidden = false;
  update();
});

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
    '.section-heading', '.service-grid', '.projects', '.about-visual', '.about-copy',
    '.process-intro', '.timeline', '.reviews-heading', '.review-viewport', '.knowledge-grid', '.faq .accordion',
    '.content-section', '.feature-cards', '.service-detail', '.article-body',
    '.case-mockup-heading', '.device-composition', '.case-brief-columns',
    '.case-process-list', '.tesora-brand-grid', '.innohub-system-grid', '.case-gallery-grid', '.case-outcome-grid',
    '.marketing-grid', '.marketing-flow', '.dz-persona-grid',
    '.dz-identity-grid', '.dz-gallery-grid', '.hosting-offer-copy', '.hosting-offer-visual'
  ].join(','));

  animatedElements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${(index % 2) * 35}ms`);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 12% 0px' });

    animatedElements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 1.08) {
        element.classList.add('is-visible');
        return;
      }
      observer.observe(element);
    });
  } else {
    animatedElements.forEach((element) => element.classList.add('is-visible'));
  }
}
