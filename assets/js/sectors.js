document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.querySelector('.field-dialog');
  if (!dialog) return;
  let trigger;
  document.querySelectorAll('.field-slider').forEach(slider => {
    const slides = [...slider.querySelectorAll('figure')];
    let active = 0;
    window.setInterval(() => {
      if (document.hidden || dialog.open || slider.contains(document.activeElement)) return;
      active = (active + 1) % slides.length;
      slides.forEach((slide, index) => { slide.hidden = index !== active; });
    }, 5000);
  });
  function translatePhotos() {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    document.querySelectorAll('[data-field-alt-fr]').forEach(img => {
      img.alt = img.dataset[lang === 'fr' ? 'fieldAltFr' : 'fieldAltEn'];
    });
    document.querySelectorAll('[data-slider-label-fr]').forEach(slider => {
      slider.setAttribute('aria-label', slider.dataset[lang === 'fr' ? 'sliderLabelFr' : 'sliderLabelEn']);
    });
  }
  document.querySelectorAll('[data-field-photo]').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      const source = button.querySelector('img');
      const image = dialog.querySelector('img');
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
      dialog.querySelector('figcaption').textContent = button.closest('figure').querySelector(`[data-lang="${lang}"]`).textContent;
      dialog.showModal();
      document.body.classList.add('field-photo-visible');
      dialog.querySelector('button').focus();
    });
  });
  dialog.querySelector('.field-dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('field-photo-visible');
    trigger?.focus();
  });
  new MutationObserver(translatePhotos).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  translatePhotos();
});
