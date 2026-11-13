document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.hero-slideshow');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let timer;

  function translate() {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    carousel.setAttribute('aria-label', lang === 'fr' ? 'Équipements que nous entretenons' : 'Equipment we service');
    carousel.querySelectorAll('[data-alt-fr]').forEach(img => { img.alt = img.dataset[lang === 'fr' ? 'altFr' : 'altEn']; });
  }

  function show(index) {
    current = index;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
      slide.setAttribute('aria-hidden', String(i !== index));
    });
  }

  function schedule() {
    clearInterval(timer);
    if (!motion.matches && !document.hidden) timer = setInterval(() => show((current + 1) % slides.length), 3000);
  }

  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', schedule);
  new MutationObserver(translate).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  show(0);
  translate();
  schedule();
});
